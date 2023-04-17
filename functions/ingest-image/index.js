import functions from '@google-cloud/functions-framework';
import { Storage } from '@google-cloud/storage';
import crypto from 'crypto';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as path from 'path';
import getExif from './getExif.js';

const storage = new Storage();
initializeApp();
const db = getFirestore();

const ingestionBucketName = 'photo-app-ingest-west-224466';
const publicBucketName = 'photo-app-public-224466';
const ingestionBucket = storage.bucket(ingestionBucketName);
const publicBucket = storage.bucket(publicBucketName);

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

// Blurs uploaded images that are flagged as Adult or Violence.
functions.cloudEvent('ingestImage', async (cloudEvent) => {
  // This event represents the triggering Cloud Storage object.
  const { bucket } = cloudEvent.data;
  const { name } = cloudEvent.data;
  const file = storage.bucket(bucket).file(name);
  const tempLocalPath = `/tmp/${path.parse(file.name).base}`;

  // Download file from bucket.
  await file.download({ destination: tempLocalPath });

  const imageData = await getExif(tempLocalPath);
  console.log('imageData', imageData);
  const captureFileName = imageData.rawFileName.split('.')[0];
  const uniqueID = crypto.createHash('md5').update(captureFileName + imageData.createDate).digest('hex');
  const extension = path.parse(file.name).ext;
  const uniqueName = `${uniqueID}${extension}`;
  const publicURL = `https://storage.googleapis.com/${publicBucketName}/${uniqueName}`;

  const uploadAndDelete = new Promise((resolve, reject) => {
    publicBucket.upload(tempLocalPath, {
      destination: uniqueName,
    }, (err) => {
      if (err) {
        reject(err);
      }

      // delete the file from the ingestion bucket
      ingestionBucket.file(file.name).delete().then(() => {
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  });
  await uploadAndDelete;

  let existingData = {
    tags: [],
  };
  const photoData = {
    uniqueID,
    path: publicURL,
    tags: imageData.tags,
    exposureDate: imageData.createDate,
    editDate: imageData.modifyDate,
  };

  // create a document in the firestore database
  const docRef = db.collection('photos').doc(uniqueID);
  const doc = await docRef.get();
  if (doc.exists) {
    existingData = doc.data();
  }
  const mergedData = {
    ...existingData,
    ...photoData,
  };
  mergedData.tags = [...existingData.tags, ...photoData.tags].filter(onlyUnique);
  // console.log(mergedData);
  // console.log(tags);

  await docRef.set(mergedData);
});

import exifr from 'exifr';

async function getExif(filePath) {
  const imageData = {
    tags: [],
  };

  await exifr.parse(filePath, true)
    .then((output) => {
      const {
        CreateDate,
        ModifyDate,
        DateTimeOriginal,
        ISO,
        FNumber,
        ExposureTime,
        ShutterSpeedValue,
        RawFileName,
        subject,
      } = output;

      if (subject !== undefined) {
        if (Array.isArray(subject)) {
          for (let i = 0; i < subject.length; i++) {
            imageData.tags.push(subject[i]);
          }
        } else {
          imageData.tags.push(subject);
        }
      }

      imageData.createDate = CreateDate;
      imageData.modifyDate = ModifyDate;
      imageData.dateTimeOriginal = DateTimeOriginal;
      imageData.ISO = `${ISO}`;
      imageData.fStop = `${FNumber}`;
      imageData.exposureTime = ExposureTime;
      imageData.shutterSpeedValue = ShutterSpeedValue;
      imageData.rawFileName = RawFileName;
    });

  return imageData;
}

export default getExif;

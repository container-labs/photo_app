#! /bin/bash

set +ex

gcloud functions deploy nodejs-ingest-function \
  --gen2 \
  --runtime=nodejs18 \
  --region=us-west2 \
  --memory=256MB \
  --max-instances=10 \
  --source=. \
  --entry-point=ingestImage \
  --trigger-bucket=photo-app-ingest-west-224466 \
  --set-env-vars=BLURRED_BUCKET_NAME=YOUR_OUTPUT_BUCKET_NAME

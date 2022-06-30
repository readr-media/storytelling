const gcsBucketBaseUrl = process.env.GCS_BUCKET_URL
  ? process.env.GCS_BUCKET_URL
  : `https://editools-gcs-dev.readr.tw`

const liveblogPath = `/files/liveblogs/`

console.log(
  JSON.stringify({
    severity: 'DEBUG',
    message: `process.env.GCS_BUCKET_URL ${process.env.GCS_BUCKET_URL}`,
  })
)

export const getLiveblogFetchUrl = (liveblogFileName) => {
  return gcsBucketBaseUrl + liveblogPath + liveblogFileName
}

export const getLiveblogImageUrl = (imageFilePath) => {
  return gcsBucketBaseUrl + imageFilePath
}

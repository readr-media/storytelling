const gcsBucketBaseUrl = process.env.GCS_BUCKET_URL
  ? process.env.GCS_BUCKET_URL
  : `https://storage.googleapis.com/statics-editools-dev`

const liveblogPath = `/files/liveblogs/`

export const getLiveblogFetchUrl = (liveblogFileName) => {
  return gcsBucketBaseUrl + liveblogPath + liveblogFileName
}

export const getLiveblogImageUrl = (imageFilePath) => {
  return gcsBucketBaseUrl + imageFilePath
}

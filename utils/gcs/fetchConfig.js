const gcsBucketBaseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://storage.googleapis.com/statics-editools-prod'
    : `https://storage.googleapis.com/statics-editools-dev`

const liveblogPath = `/files/liveblogs/`

export const getLiveblogFetchUrl = (liveblogFileName) => {
  return gcsBucketBaseUrl + liveblogPath + liveblogFileName
}

export const getLiveblogImageUrl = (imageFilePath) => {
  return gcsBucketBaseUrl + imageFilePath
}

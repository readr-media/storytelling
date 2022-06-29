const gcsBucketBaseUrl =
  process.env.NODE_ENV === 'production'
    ? '/to/be/added'
    : `https://storage.googleapis.com/statics-editools-dev`

const liveblogPath = `/files/liveblogs/`

export const getLiveblogFetchUrl = (liveblogFileName) => {
  return gcsBucketBaseUrl + liveblogPath + liveblogFileName
}

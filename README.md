# storytelling
The tools for the news project, more possibility for the story telling

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn dev
```

## Liveblog

Since this project will contain multiple independent page, check [http://localhost:3000/liveblog](http://localhost:3000) for the Liveblog page.

Steps to setup the liveblog:
**Liveblog source - Editools CMS**
- Liveblog and liveblogItem will be created inside editools cms.
- After the CRUD of liveblog and liveblogItem, the k6 hooks (afterOperation) will create/update the corresponding json file to gcs buck through gcsfuse.
- ENV.variable: `GCS_BUCKET` / `LIVEBLOG_FILES_STORAGE_PATH`

**Liveblog json storage - GCS Bucket**
-  Check if {liveblog}.json is created/updated after k6 liveblog/liveblogItem edited
-  Setup file cache control (file level)
    command to set cache control
    ```
    gsutil -m setmeta -r -h "Cache-control:public, max-age=30" gs://{bucket_name}/files/liveblogs
    ```
    command to check cache control (meta)
    ```
    gsutil stat gs://statics-editools-dev/files/liveblogs
    ```
    Since cache control setting is file level and only can be set to the existing file,
    for now we need to create {liveblog}.json first and finish.
    [on-going]: A pub/sub job will be created to set created file cache control.
-  Setup cors configuration (bucket level)
    command to set cors
    ```
    gsutil cors set cors-json-file gs://<bucket_name>...
    ```
    command to get cors
    ```
    gsutil cors get gs://<bucket_name>
    ```

**Liveblog renderer - Storytelling**
- There will be two condition to show liveblog
    1. View liveblog directly from storytelling
        [pelosi liveblog](https://storytelling.readr.tw/liveblog?liveblog=2022_pelosi)
    2. View liveblog from other website with iframe of storytelling
        ```
        <iframe  style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 600" src="https://storytelling.readr.tw/liveblog?liveblog=2022_pelosi" title="Liveblog"></iframe>
        ```
        [to-do]: add script to create iframe in editools cms (need storytelling env.variable)
- Url Params: `liveblog={name-of-liveblog.json}`
- ENV.variable: `GCS_BUCKET_URL` 

## API Endpoint Configuration

There are some enviroment variables for API Endpoint customization.

* `PROJECT_ID` : Google Cloud Project ID
* `PUBSUB_COVID19_QUERY_NAME` : PubSub Topic Name
* `KEYSTONE_API_URL` : Keystone GraphQL API URL
* `FEEDBACK_FORM_NAME` : form name used for user feedback
* `FEEDBACK_FIELD_NAME` : field name in form for user feedback
* `LIKE_FORM_NAME` : form name used for like and dislike
* `LIKE_FIELD_NAME` : field name in form for like and dislike
* `RECAPTCHA_SITE_KEY` : reCAPTCHA Enterprise site key
* `RECAPTCHA_SCORE_BOUNDARY` : reCAPTCHA score assessment boundary, 0.1, 0.3, 0.7 and 0.9
* `CORS_ORIGINS` : CORS allow origin setting.  A string represent of a collection of URLs.  Each URL is seperated by comman(,), e.g., `"http://localhost,http://www.google.com"`.
* `LEGAL_IMAGE_DOMAINS` : NEXT config to white list the legal image domains

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

## API Endpoint Configuration

There are some enviroment variables for API Endpoint customization.

* `PROJECT_ID` : Google Cloud Project ID
* `PUBSUB_COVID19_QUERY_NAME` : PubSub Topic Name
* `KEYSTONE_API_URL` : Keystone GraphQL API URL
* `FEEDBACK_FORM_NAME` : form name used for user feedback
* `FEEDBACK_FIELD_NAME` : field name in form for user feedback
* `RECAPTCHA_SITE_KEY` : reCAPTCHA Enterprise site key
* `RECAPTCHA_SCORE_BOUNDARY` : reCAPTCHA score assessment boundary, 0.1, 0.3, 0.7 and 0.9

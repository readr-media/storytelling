import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

import { JumbotronContainer } from '../../containers/jumbotron'
import LiveBlogContainr from '../../containers/live-blog'
import { createGlobalStyle } from 'styled-components'
import {
  getLiveblogFetchUrl,
  getLiveblogImageUrl,
} from '../../utils/gcs/fetchConfig'

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #fff1db;
  }
`

export default function LiveBlog() {
  const [liveblog, setLiveblog] = useState()
  const intervalIdRef = useRef()
  const router = useRouter()
  const targetLiveblog = router.query.liveblog

  useEffect(() => {
    const fetchLiveblog = async (url) => {
      try {
        const response = await axios.get(url)
        console.log(response)
        if (response?.data) {
          setLiveblog(response.data)
        }
      } catch (error) {
        console.log(JSON.stringify({ severity: 'ERROR', message: error.stack }))
      }
    }

    console.log('targetLiveblog', targetLiveblog)

    if (targetLiveblog) {
      const liveblogFileName = targetLiveblog + '.json'
      const fetchUrl = getLiveblogFetchUrl(liveblogFileName)

      fetchLiveblog(fetchUrl)
      intervalIdRef.current = setInterval(() => {
        fetchLiveblog(fetchUrl)
      }, 60000)
    }

    return () => {
      clearInterval(intervalIdRef.current)
    }
  }, [targetLiveblog])

  return (
    <>
      <div id="light-box-root" />
      <GlobalStyles />
      {liveblog?.heroImage && (
        <JumbotronContainer
          image={{
            name: liveblog.heroImage.name,
            url: getLiveblogImageUrl(liveblog.heroImage.imageFile.url),
          }}
        />
      )}
      <LiveBlogContainr liveblog={liveblog} />
    </>
  )
}

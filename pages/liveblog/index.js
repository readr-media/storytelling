import { JumbotronContainer } from '../../containers/jumbotron'
import LiveBlogContainr from '../../containers/live-blog'
import { createGlobalStyle } from 'styled-components'
import Head from 'next/head'

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #fff1db;
  }
`

export default function LiveBlog() {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div id="light-box-root" />
      <GlobalStyles />
      <JumbotronContainer />
      <LiveBlogContainr />
    </>
  )
}

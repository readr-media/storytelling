import React, { useState, useEffect, useRef } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { liveblogItemId } from '../utils/anchor-scroll-helper'
import LiveBlogBottomActions from './LiveBlogBottomActions'
import LiveBlogItemContent from './LiveBlogItemContent'
import LiveBlogItemHeader from './LiveBlogItemHeader'
import LiveBlogToast from './LiveBlogToast'
import LiveBlogTopActions from './LiveBlogTopActions'

const GlobalStyles = createGlobalStyle`
  body {
    overflow: hidden;
  }
`

const Wrapper = styled.div`
  position: relative;
  ${({ showAsLightbox }) => {
    if (showAsLightbox) {
      return `
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      overflow-y: scroll;
      z-index: 10;
      background: rgba(0, 0, 0, 0.75);
      `
    }
  }}
`

const LiveBlogItemWrapper = styled.div`
  position: relative;
  background-color: ${(props) => (props.pined ? '#fdf6ec' : '#fff')};
  margin-top: 40px;

  @media (max-width: 768px) {
    margin-top: 28px;
  }
  ${({ showAsLightbox }) => {
    if (showAsLightbox) {
      return `
      width: 640px;
      margin: 212px auto 40px auto !important;
    
      @media (max-width: 768px) {
        width: unset;
        margin: 157px 16px 40px 16px !important;
      }    
      `
    }
  }}
`

const LiveBlogWrapper = styled.div`
  border: 1px solid #000;
  padding: 20px 12px 56px 12px;

  @media (max-width: 768px) {
    padding: 28px 12px 56px 12px;
  }
`

const LiveBlog = styled.div`
  overflow: hidden;
  height: 100%;
`

let pageWasScrolled = false

export default function LiveBlogItem({ pined, article, fetchImageBaseUrl }) {
  const [expanded, setExpanded] = useState(false)
  const [showAsLightbox, setShowAsLightbox] = useState(false)
  const [hideExpandButton, setHideExpandButton] = useState(false)
  const [toast, setToast] = useState({ show: false, message: '' })
  const wrapperRef = useRef()

  useEffect(() => {
    if (showAsLightbox) {
      setExpanded(true)
    }
  }, [showAsLightbox])

  useEffect(() => {
    if (
      document.location.hash &&
      `#${wrapperRef.current.id}` === document.location.hash &&
      !pageWasScrolled
    ) {
      wrapperRef.current.scrollIntoView()
      pageWasScrolled = true
    }
  }, [])

  const expandClickedHandler = (e) => {
    e.stopPropagation()
    setExpanded((expanded) => !expanded)
  }

  const showLightboxClickedHandler = () => {
    setShowAsLightbox((showLightbox) => !showLightbox)
  }

  const closeLighboxClickedHandler = () => {
    setShowAsLightbox(false)
  }

  const copyLiveblogItemUrl = () => {
    const hostingUrlObject = new URL(
      new URLSearchParams(window.location.search).get('url') ||
        document.location.href
    )
    // replace old hash on url with clicking one
    hostingUrlObject.hash = liveblogItemId(article.id)
    navigator.clipboard.writeText(hostingUrlObject.toString())
  }

  const copyUrlHandler = () => {
    copyLiveblogItemUrl()
    setToast({ show: true, message: '已複製連結' })
    setTimeout(() => {
      setToast({ show: false, mesrsage: '' })
    }, 500)
  }

  const LiveBlogItem = (
    <LiveBlogItemWrapper
      pined={pined}
      showAsLightbox={showAsLightbox}
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      {toast.show && <LiveBlogToast message={toast.message} />}
      <LiveBlogTopActions
        pined={pined}
        copyUrlHandler={copyUrlHandler}
        showLightbox={showLightboxClickedHandler}
        showAsLightbox={showAsLightbox}
        id={article.id}
        type={article.type}
      />
      <LiveBlogWrapper>
        <LiveBlog>
          <LiveBlogItemHeader article={article} />
          <LiveBlogItemContent
            article={article}
            expanded={expanded}
            fetchImageBaseUrl={fetchImageBaseUrl}
            contentTooShort={setHideExpandButton}
          />
        </LiveBlog>
      </LiveBlogWrapper>
      {!hideExpandButton && !showAsLightbox && (
        <LiveBlogBottomActions
          onClick={expandClickedHandler}
          expanded={expanded}
        />
      )}
    </LiveBlogItemWrapper>
  )

  return (
    <Wrapper
      id={`${liveblogItemId(article.id)}`}
      showAsLightbox={showAsLightbox}
      onClick={closeLighboxClickedHandler}
      ref={wrapperRef}
    >
      {showAsLightbox && <GlobalStyles />}
      {LiveBlogItem}
    </Wrapper>
  )
}

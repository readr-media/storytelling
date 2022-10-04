import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { liveblogItemId } from '../utils/anchor-scroll-helper'
import LiveBlogBottomActions from './LiveBlogBottomActions'
import LiveBlogItemContent from './LiveBlogItemContent'
import LiveBlogItemHeader from './LiveBlogItemHeader'
import LiveBlogTopActions from './LiveBlogTopActions'

const Wrapper = styled.div`
  cursor: pointer;
`

const LiveBlogItemWrapper = styled.div`
  position: relative;
  background-color: ${(props) => (props.pined ? '#fdf6ec' : '#fff')};
  margin-top: 40px;
  &:hover,
  &:focus {
    background-color: #f0f0f0;
  }

  @media (max-width: 768px) {
    margin-top: 28px;
  }
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

export default function LiveBlogItemExternal({
  pined,
  article,
  fetchImageBaseUrl,
}) {
  const [expanded, setExpanded] = useState(false)
  const [hideExpandButton, setHideExpandButton] = useState(false)
  const wrapperRef = useRef()

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

  const openExternalLinkHandler = () => {
    window.open(article.external, '_blank')
  }

  return (
    <Wrapper id={`${liveblogItemId(article.id)}`} ref={wrapperRef}>
      <LiveBlogItemWrapper
        pined={pined}
        onClick={(e) => {
          e.stopPropagation()
          openExternalLinkHandler()
        }}
      >
        <LiveBlogTopActions pined={pined} id={article.id} type={article.type} />
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
        {!hideExpandButton && (
          <LiveBlogBottomActions
            onClick={expandClickedHandler}
            expanded={expanded}
          />
        )}
      </LiveBlogItemWrapper>
    </Wrapper>
  )
}

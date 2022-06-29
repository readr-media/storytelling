import { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import DraftRenderer from './DraftRenderer'

import { getLiveblogImageUrl } from '../utils/gcs/fetchConfig'

const Wrapper = styled.div`
  margin-top: 16px;

  @media (max-width: 768px) {
    margin-top: 8px;
  }
`

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  line-height: 34.75px;

  @media (max-width: 768px) {
    font-size: 18px;
    line-height: 26px;
  }
`

const HeroImageWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  position: relative;

  img {
    width: 100%;
    display: block;
  }
`

const HeroImageCaption = styled.div`
  position: relative;
  margin-top: 4px;
  width: 133%;
  left: -16.65%;
  font-size: 12px;
  font-weight: 400;
  transform: scale(calc(9 / 12));
  line-height: 13px;
  color: #999;
`

const DraftEditorWrapper = styled.div`
  margin-top: 20px;
  overflow: hidden;
  height: ${({ expanded, height }) => (expanded ? 'unset' : `${height}px`)};
  min-height: ${({ expanded, height }) => (expanded ? `${height}px` : 'unset')};
`

// 5 lines of normal text
const defaultContentHeight = 87.5

export default function LiveBlogItemContent({ article, expanded }) {
  const targetRef = useRef()
  const [contentHeight, setContentHeight] = useState(defaultContentHeight)

  let heroImage = {}
  if (article?.heroImage) {
    heroImage = {
      name: article.heroImage.name,
      url: getLiveblogImageUrl(article.heroImage.imageFile.url),
    }
  }
  const caption = null

  useEffect(() => {
    // delay to calculate in order to get the real DOM height
    setTimeout(() => {
      if (targetRef.current) {
        /*
        accumulate the height of contentBlocks to render the wrapper with height closest to the spec (5 lines)
        and prevent words got cut vertically
        */
        const contentBlocks = [
          ...targetRef.current.querySelectorAll('[data-block="true"]'),
        ]

        let accumulationHeight = 0
        let lastMarginBottom = 0

        contentBlocks.every((contentBlock) => {
          let height = contentBlock.clientHeight
          const style = getComputedStyle(contentBlock)
          let marginTop = parseInt(style.marginTop)
          if (lastMarginBottom) {
            // prevent double counting margin since margin collapses
            marginTop =
              lastMarginBottom > marginTop ? 0 : lastMarginBottom - marginTop
          }
          let marginBottom = parseInt(style.marginBottom)
          lastMarginBottom = marginBottom

          height += marginTop
          height += marginBottom
          accumulationHeight += height
          return accumulationHeight > defaultContentHeight ? false : true
        })
        setContentHeight(accumulationHeight)
      }
    }, 100)
  }, [])

  return (
    <Wrapper>
      <Title>{article.title}</Title>
      <HeroImageWrapper>
        <img src={heroImage.url} alt={heroImage.name} />
        {caption && <HeroImageCaption>{caption}</HeroImageCaption>}
      </HeroImageWrapper>
      <DraftEditorWrapper
        expanded={expanded}
        ref={targetRef}
        height={contentHeight}
      >
        <DraftRenderer rawContentBlock={article.name} />
      </DraftEditorWrapper>
    </Wrapper>
  )
}

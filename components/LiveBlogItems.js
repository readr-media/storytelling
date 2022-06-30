import styled from 'styled-components'
import LiveBlogItem from './LiveBlogItem'

const Wrapper = styled.div`
  margin-top: 29px;

  @media (max-width: 768px) {
    margin-top: 18px;

    > div:first-child > div {
      margin-top: unset;
    }
  }
`

export default function LiveBlogItems({
  pinedArticles,
  articles,
  fetchImageBaseUrl,
}) {
  return (
    <Wrapper>
      {pinedArticles.map((article) => (
        <LiveBlogItem
          key={article.id}
          pined
          article={article}
          fetchImageBaseUrl={fetchImageBaseUrl}
        />
      ))}
      {articles.map((article) => (
        <LiveBlogItem
          key={article.id}
          article={article}
          fetchImageBaseUrl={fetchImageBaseUrl}
        />
      ))}
    </Wrapper>
  )
}

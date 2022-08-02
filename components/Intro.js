import styled from 'styled-components'
import moment from 'moment'

const Wrapper = styled.div`
  padding-bottom: 40px;

  @media (max-width: 768px) {
    padding-bottom: 20px;
  }
`

const Title = styled.div`
  font-size: 28px;
  font-weight: 900;
  line-height: 41px;

  @media (max-width: 768px) {
    font-size: 18px;
    line-height: 26px;
  }
`

const Description = styled.p`
  margin-top: 20px;
  font-size: 12px;
  line-height: 17px;
  text-align: justify;
`

const UpdateTime = styled.p`
  margin-top: 28px;
  text-align: center;
  font-weight: 900;
  font-size: 12px;
  transform: scale(calc(10 / 12));
  line-height: 14px;
`

export default function Intro({ intro }) {
  const { title, description, time } = intro

  return (
    <Wrapper>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <UpdateTime>
        最後更新時間：
        {moment(time).locale('zh_tw').format('YYYY年MM月DD日 dddd HH:mm')}
      </UpdateTime>
    </Wrapper>
  )
}

import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;  
  }
  html, body {
    font-family: 'Noto Sans TC', sans-serif;
    font-size: 12px;
  }
  a {
    color: inherit;
    text-decoration: none;
  }  
`

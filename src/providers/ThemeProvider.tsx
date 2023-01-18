import React from 'react';
import {
  createGlobalStyle,
  defaultTheme,
  Preflight,
  ThemeProvider as XThemeProvider,
} from '@xstyled/emotion';

interface ThemeProviderProps {
  children?: React.ReactNode;
}

const theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    ['primary-main']: '#343541',
    ['primary-main-dark']: '#40414f',
  },
};

const GlobalStyle = createGlobalStyle`
    @import url("https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@100;300;400;500;700;800;900&display=swap");

    *, html, body{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Alegreya Sans", sans-serif;
    }

    body {
        background: #343541;
        color: white;
    }


    #chat-container,
    .message{
        -ms-overflow-style: none;
        scrollbar-width: none;
    }

    #chat-container{
        scroll-behavior: smooth;
    }

    #chat-container::webkit-scollbar
    .message::webkit-scollbar{
        display:none;
    }
`;

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => (
  <XThemeProvider theme={theme}>
    <GlobalStyle />
    <Preflight />
    {children}
  </XThemeProvider>
);

export default ThemeProvider;

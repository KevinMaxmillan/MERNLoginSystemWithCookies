import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Arial', sans-serif;
  }

  body {
    background-color: #121212;
    color: #ffffff;
  }

  a {
    color: #BB86FC;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  button {
    background-color: #BB86FC;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
    &:hover {
      background-color: #9a67ea;
    }
  }

  input {
    background: #1E1E1E;
    border: 1px solid #333;
    padding: 10px;
    border-radius: 5px;
    color: white;
    &:focus {
      outline: none;
      border-color: #BB86FC;
    }
  }

  .container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    background: #1E1E1E;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
  }
`;

export default GlobalStyles;

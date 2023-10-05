import styled from "styled-components";

const Container = styled.div`
  background-color: #8c11be;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  padding-top: 159px;

  h1 {
    font-family: "Saira Stencil One", cursive;
    font-size: 32px;
    color: #ffffff;
  }

  p {
    font-family: "Raleway", sans-serif;
    font-size: 15px;
    color: #ffffff;
    font-weight: 700;
    margin-top: 36px;
  }
`;

const Form = styled.form`
  padding-top: 24px;
  width: 87%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 13px;

  input {
    width: 100%;
    text-align: left;
    font-size: 20px;
    line-height: 23px;
    color: #000000;
    border: none;
    border-radius: 5px;
    font-family: "Raleway", sans-serif;
    padding: 18px 0 17px 15px;
  }

  input::placeholder {
    color: #000000;
    opacity: 1;
  }

  button {
    width: 100%;
    background-color: #a328d6;
    height: 46px;
    border: none;
    border-radius: 5px;
    font-size: 20px;
    color: #ffffff;
    font-weight: 700;
    font-family: "Raleway", sans-serif;
  }
`;

export { Container, Form };

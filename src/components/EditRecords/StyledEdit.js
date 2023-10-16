import styled from "styled-components";

const Container = styled.div`
  background-color: #8c11be;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  width: 87%;
  height: 78px;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-family: "Raleway", sans-serif;
    font-size: 26px;
    color: #ffffff;
    font-weight: 700;
  }
`;

const Form = styled.form`
  width: 87%;
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 13px;

  p {
    font-family: "Raleway", sans-serif;
    font-size: 20px;
    color: #ffffff;
    font-weight: 400;
    left: 0;
    position: relative;
  }

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
`;

const Button = styled.button`
  width: 100%;
  background-color: #a328d6;
  height: 46px;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  color: #ffffff;
  font-weight: 700;
  font-family: "Raleway", sans-serif;
  cursor: pointer;
`;

export { Container, Header, Form, Button };

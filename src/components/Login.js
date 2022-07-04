import { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts.js/UserContext";

export default function Login() {
  const [userData, setUserData] = useState({
    name: "",
    password: "",
  });
  const { setToken } = useContext(UserContext);
  const navigate = useNavigate();

  async function submitLogin(e) {
    e.preventDefault();
    const regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    if (regEmail.test(userData.email) && userData.password !== "") {
      const promise = axios.post(
        "https://my-wallet-yugosk.herokuapp.com/login",
        userData
      );
      promise.then((res) => {
        setToken(res.data);
        setTimeout(() => navigate("/home"), 3000);
      });
      promise.catch((err) => alert(err));
    } else {
      alert("Prencha os campos corretamente!");
    }
  }

  return (
    <LoginContainer>
      <h1>MyWallet</h1>
      <LoginForm onSubmit={submitLogin}>
        <input
          type="text"
          id="email"
          value={userData.email}
          placeholder="E-mail"
          required
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <input
          type="password"
          id="password"
          value={userData.password}
          placeholder="Senha"
          required
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
        <button>Entrar</button>
      </LoginForm>
      <Link to="/signup" style={{ textDecoration: "none" }}>
        <p>Primeira vez? Cadastre-se!</p>
      </Link>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 159px;

  h1 {
    font-family: "Saira Stencil One", cursive;
    font-size: 32px;
    text-align: center;
    font-weight: 400;
    color: #ffffff;
    margin-bottom: 24px;
  }

  p {
    font-size: 15px;
    font-weight: 700;
    text-align: center;
    color: #ffffff;
  }
`;

const LoginForm = styled.form`
  height: 188px;
  width: 87%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 36px;

  input {
    width: 100%;
    text-align: left;
    font-size: 20px;
    line-height: 23px;
    padding: 18px 0 17px 15px;
    color: #000000;
    border: none;
    border-radius: 5px;
    margin-bottom: 13px;
  }

  input::placeholder {
    color: #000000;
    opacity: 1;
  }

  button {
    width: 100%;
    height: 46px;
    border: none;
    border-radius: 5px;
    background-color: #a328d6;
    font-size: 20px;
    text-align: center;
    color: #ffffff;
    font-weight: 700;
  }
`;

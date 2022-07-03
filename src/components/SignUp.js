import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [userData, setUserData] = useState({
    name: null,
    email: null,
    password: null,
    confirmPassword: null,
  });

  return (
    <SignUpContainer>
      <h1>MyWallet</h1>
      <SignUpForm>
        <input
          type="text"
          id="name"
          value={userData.name}
          placeholder="Nome"
          required
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
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
        <input
          type="password"
          id="confirmPassword"
          value={userData.confirmPassword}
          placeholder="Confirme a senha"
          required
          onChange={(e) =>
            setUserData({ ...userData, confirmPassword: e.target.value })
          }
        />
        <button>Cadastrar</button>
      </SignUpForm>
      <Link to="/" style={{ textDecoration: "none" }}>
        <p>Já tem uma conta? Entre agora!</p>
      </Link>
    </SignUpContainer>
  );
}

const SignUpContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 95px;

  h1 {
    font-family: "Saira Stencil One", cursive;
    font-size: 32px;
    text-align: center;
    font-weight: 400;
    color: #ffffff;
    margin-bottom: 28px;
  }

  p {
    font-size: 15px;
    font-weight: 700;
    text-align: center;
    color: #ffffff;
  }
`;

const SignUpForm = styled.form`
  height: 330px;
  width: 87%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;

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

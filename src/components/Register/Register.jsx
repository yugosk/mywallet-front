import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form } from "./StyledRegister";
import { useState } from "react";

export default function Register() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  async function submitRegister(e) {
    e.preventDefault();
    console.log(JSON.stringify(userData));
    const regEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (
      regEmail.test(userData.email) &&
      userData.password !== "" &&
      userData.name !== "" &&
      userData.confirmPassword === userData.password
    ) {
      const promise = axios.post("http://localhost:4000/register", userData);
      promise
        .then((res) => {
          alert("New user registered succesfully");
          navigate("/");
        })
        .catch((err) => alert(err.response.data));
    } else {
      alert("Something went wrong, check your inputs");
    }
  }
  return (
    <Container>
      <h1>MyWallet</h1>
      <Form onSubmit={submitRegister}>
        <input
          type="text"
          id="name"
          placeholder="Nome"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          required
        />
        <input
          type="text"
          id="email"
          placeholder="E-mail"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          required
        />
        <input
          type="password"
          id="password"
          placeholder="Senha"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          required
        />
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirme a senha"
          value={userData.confirmPassword}
          onChange={(e) =>
            setUserData({ ...userData, confirmPassword: e.target.value })
          }
          required
        />
        <button>Cadastrar</button>
      </Form>
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <p>Já tem uma conta? Entre agora!</p>
      </Link>
    </Container>
  );
}

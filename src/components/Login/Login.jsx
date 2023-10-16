import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form } from "./StyledLogin.js";
import { useState, useContext } from "react";
import UserContext from "../../contexts/UserContext.js";

export default function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  async function submitLogin(e) {
    e.preventDefault();
    const regEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regEmail.test(userData.email) && userData.password !== "") {
      const promise = axios.post("http://localhost:4000/login", userData);
      promise
        .then((res) => {
          setUserInfo({ token: res.data.token, name: res.data.name });
          navigate("/home");
        })
        .catch((err) => alert(err));
    } else {
      alert("Preencha os campos corretamente");
    }
  }

  return (
    <Container>
      <h1>MyWallet</h1>
      <Form onSubmit={submitLogin}>
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

        <button>Entrar</button>
      </Form>
      <Link to={"/register"} style={{ textDecoration: "none" }}>
        <p>Primeira vez? Cadastre-se!</p>
      </Link>
    </Container>
  );
}

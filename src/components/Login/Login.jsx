import { Link } from "react-router-dom";
import { Container, Form } from "./StyledLogin.js";

export default function Login() {
  return (
    <Container>
      <h1>MyWallet</h1>
      <Form>
        <input type="text" id="email" placeholder="E-mail" required />

        <input type="password" id="password" placeholder="Senha" required />

        <button>Entrar</button>
      </Form>
      <Link to={"/register"} style={{ textDecoration: "none" }}>
        <p>Primeira vez? Cadastre-se!</p>
      </Link>
    </Container>
  );
}

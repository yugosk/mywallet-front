import { Link } from "react-router-dom";
import { Container, Form } from "./StyledRegister";

export default function Register() {
  return (
    <Container>
      <h1>MyWallet</h1>
      <Form>
        <input type="text" id="name" placeholder="Nome" required />
        <input type="text" id="email" placeholder="E-mail" required />
        <input type="password" id="password" placeholder="Senha" required />
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirme a senha"
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

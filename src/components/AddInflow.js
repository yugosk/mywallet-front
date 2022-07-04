import { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import UserContext from "../contexts.js/UserContext";
import { useNavigate } from "react-router-dom";

export default function AddInflow() {
  const { token } = useContext(UserContext);
  const [inflowInfo, setInflowInfo] = useState({
    value: "",
    description: "",
    type: "inflow",
  });
  const navigate = useNavigate();

  async function submitInflow(e) {
    e.preventDefault();
    if (
      inflowInfo.value !== 0 &&
      inflowInfo.value !== "" &&
      inflowInfo.description !== ""
    ) {
      const promise = axios.post(
        "https://my-wallet-yugosk.herokuapp.com/transactions",
        inflowInfo,
        { headers: { Authentication: `Bearer ${token.token}` } }
      );
      promise.then((res) => {
        alert("Nova entrada adicionada com sucesso!");
        setTimeout(() => navigate("/home"), 3000);
      });
    } else {
      alert("Preencha os campos adequadamente!");
    }
  }

  return (
    <InflowContainer>
      <h1>Nova entrada</h1>
      <InflowForm onSubmit={submitInflow}>
        <input
          type="number"
          id="value"
          value={inflowInfo.value}
          placeholder="Valor"
          required
          onChange={(e) =>
            setInflowInfo({ ...inflowInfo, value: e.target.value })
          }
        />
        <input
          type="text"
          id="description"
          value={inflowInfo.description}
          placeholder="Descrição"
          required
          onChange={(e) =>
            setInflowInfo({ ...inflowInfo, description: e.target.value })
          }
        />
        <button>Salvar entrada</button>
      </InflowForm>
    </InflowContainer>
  );
}

const InflowContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  padding-top: 25px;

  h1 {
    color: #ffffff;
    font-size: 26px;
    font-weight: 700;
    margin-bottom: 40px;
    text-align: left;
    width: 87%;
  }
`;

const InflowForm = styled.form`
  height: 188px;
  width: 87%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

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

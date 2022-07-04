import { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import UserContext from "../contexts.js/UserContext";
import { useNavigate } from "react-router-dom";

export default function AddOutflow() {
  const { token } = useContext(UserContext);
  const [ouflowInfo, setouflowInfo] = useState({
    value: "",
    description: "",
    type: "outflow",
  });
  const navigate = useNavigate();

  async function submitOutflow(e) {
    e.preventDefault();
    if (
      ouflowInfo.value !== 0 &&
      ouflowInfo.value !== "" &&
      ouflowInfo.description !== ""
    ) {
      const promise = axios.post(
        "https://my-wallet-yugosk.herokuapp.com/transactions",
        ouflowInfo,
        { headers: { Authentication: `Bearer ${token.token}` } }
      );
      promise.then((res) => {
        alert("Nova saída adicionada com sucesso!");
        setTimeout(() => navigate("/home"), 3000);
      });
    } else {
      alert("Preencha os campos adequadamente!");
    }
  }

  return (
    <OutflowContainer>
      <h1>Nova saída</h1>
      <OutflowForm onSubmit={submitOutflow}>
        <input
          type="number"
          id="value"
          value={ouflowInfo.value}
          placeholder="Valor"
          required
          onChange={(e) =>
            setouflowInfo({ ...ouflowInfo, value: e.target.value })
          }
        />
        <input
          type="text"
          id="description"
          value={ouflowInfo.description}
          placeholder="Descrição"
          required
          onChange={(e) =>
            setouflowInfo({ ...ouflowInfo, description: e.target.value })
          }
        />
        <button>Salvar saída</button>
      </OutflowForm>
    </OutflowContainer>
  );
}

const OutflowContainer = styled.div`
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

const OutflowForm = styled.form`
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

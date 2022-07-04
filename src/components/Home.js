import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts.js/UserContext";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

export default function Home() {
  const { token, setToken } = useContext(UserContext);
  const [cashFlow, setCashFlow] = useState([]);
  const navigate = useNavigate();

  function exitSession() {
    setToken({});
    navigate("/");
  }

  function getTransactions() {
    const promise = axios.get(
      "https://my-wallet-yugosk.herokuapp.com/transactions",
      {
        headers: { Authentication: `Bearer ${token.token}` },
      }
    );
    promise.then((res) => setCashFlow(res.data));
    promise.catch((err) => alert("Erro status: " + err.response.status));
  }

  function calculateSum(list) {
    let sum = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i].type === "inflow") {
        sum += list[i].value;
      } else {
        sum -= list[i].value;
      }
    }
    return sum.toFixed(2);
  }

  useEffect(() => getTransactions(), []);

  return (
    <HomeContainer>
      <HomeHeader>
        <h1>Olá, {token.name}</h1>
        <RiLogoutBoxRLine color="#ffffff" size={"24px"} onClick={exitSession} />
      </HomeHeader>
      <CashFlowListing list={cashFlow} sum={calculateSum(cashFlow)} />
      <HomeButtons>
        <button>
          <AiOutlinePlusCircle color="#ffffff" size={"25px"} />
          <br />
          Nova entrada
        </button>
        <button>
          <AiOutlineMinusCircle color="#ffffff" size={"25px"} />
          <br />
          Nova saída
        </button>
      </HomeButtons>
    </HomeContainer>
  );
}

function CashFlowListing({ list, sum }) {
  if (list.length === 0) {
    return (
      <HomeMain empty={true}>
        <p>Não há registros de entrada ou saída</p>
      </HomeMain>
    );
  } else {
    return (
      <HomeMain empty={false}>
        <StyledIncome>
          {list.map((item, index) => {
            <IncomeAndExpenditure
              key={index}
              description={item.description}
              date={item.date}
              value={item.value}
              status={item.type}
            />;
          })}
        </StyledIncome>
        <TotalSum sum={sum}>
          <em>Saldo</em>
          <p>{sum}</p>
        </TotalSum>
      </HomeMain>
    );
  }
}

function IncomeAndExpenditure({ description, date, value, status }) {
  return (
    <IncomeLine status={status}>
      <DateAndDescription>
        <p>{date}</p>
        <em>{description}</em>
      </DateAndDescription>
      <p>{value.toFixed(2)}</p>
    </IncomeLine>
  );
}

const StyledIncome = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #ffffff;
`;

const TotalSum = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  em {
    font-size: 17px;
    line-heigth: 20px;
    font-weigth: 700;
    color: #000000;
  }

  p {
    font-size: 17px;
    line-heigth: 20px;
    font-weigth: 400;
    color: ${(props) => (props.sum >= 0 ? "#03ac00" : "#c70000")};
  }
`;

const IncomeLine = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weigth: 400;

  p {
    color: ${(props) => (props.status === "inflow" ? "#03ac00" : "#c70000")};
  }
`;

const DateAndDescription = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  p {
    color: #c6c6c6;
  }

  em {
    color: #000000;
  }
`;

const HomeContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const HomeHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 87%;
  height: 78px;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-size: 26px;
    text-align: left;
    font-weight: 700;
    color: #ffffff;
  }
`;

const HomeMain = styled.div`
  width: 87%;
  height: 67%;
  background-color: #ffffff;
  border-radius: 5px;
  flex-direction: column;
  align-items: center;
  justify-content: ${(props) => (props.empty ? "center" : "flex-start")};
  margin-bottom: 13px;
  text-align: center;
  padding-top: ${(props) => (props.empty ? "50%" : "23px")};
  padding-left: ${(props) => (props.empty ? "50px" : "12px")};
  padding-right: ${(props) => (props.empty ? "50px" : "12px")};

  p {
    font-size: 20px;
    color: #868686;
    font-weight: 400;
    text-align: center;
  }
`;

const HomeButtons = styled.div`
  heigth: 17%;
  width: 87%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  button {
    width: 47%;
    heigth: 100%;
    border-radius: 5px;
    border: none;
    background-color: #a328d6;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    font-size: 17px;
    font-weigth: 700;
    color: #ffffff;
    padding: 9px 0 9px 10px;
  }
`;

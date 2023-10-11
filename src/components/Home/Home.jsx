import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { RiLoginBoxLine } from "react-icons/ri";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import axios from "axios";
import dayjs from "dayjs";
import {
  Container,
  Header,
  Main,
  Buttons,
  RecordLine,
  StyledDate,
  StyledLabel,
  StyledValue,
  StyledBalance,
  RecordsDiv,
} from "./StyledHome";

export default function Home() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getTransactions = async () => {
      const promise = axios.get("http://localhost:4000/transactions", {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      promise
        .then((res) => {
          setTransactions(res.data);
        })
        .catch((err) => console.log(err));
    };

    getTransactions();
  }, []);

  function logout() {
    setUserInfo({});
    navigate("/");
  }

  return (
    <Container>
      <Header>
        <h1>Olá, {userInfo.name}</h1>
        <RiLoginBoxLine
          color="#ffffff"
          size={"24px"}
          cursor={"pointer"}
          onClick={() => logout()}
        />
      </Header>

      <RecordsList list={transactions} />
      <Buttons>
        <button onClick={() => navigate("/addin")}>
          <AiOutlinePlusCircle color="#ffffff" size={"25px"} />
          Nova <br /> entrada
        </button>
        <button onClick={() => navigate("/addout")}>
          <AiOutlineMinusCircle color="#ffffff" size={"25px"} />
          Nova <br /> saída
        </button>
      </Buttons>
    </Container>
  );
}

function RecordsList({ list }) {
  function formatDate(timestamp) {
    const date = dayjs(timestamp);
    const formattedDate = date.format("DD/MM");
    return formattedDate;
  }

  function mapRecords(list) {
    const records = list.map((item) => (
      <RecordLine key={item.id}>
        <StyledDate>{formatDate(item.date)}</StyledDate>
        <StyledLabel>{item.description}</StyledLabel>
        <StyledValue type={item.type}>{item.amount}</StyledValue>
      </RecordLine>
    ));
    return records;
  }

  if (list.length === 0) {
    return (
      <Main empty={""}>
        <p>
          Não há registros de <br /> entrada ou saída
        </p>
      </Main>
    );
  } else {
    const { color, sum } = calculateBalance(list);
    return (
      <Main empty={"empty"}>
        <RecordsDiv>{mapRecords(list)}</RecordsDiv>
        <StyledBalance>
          <p>SALDO</p> <em style={{ color: color }}>{sum}</em>
        </StyledBalance>
      </Main>
    );
  }
}

function calculateBalance(array) {
  let sum = 0;
  for (let item of array) {
    const value = parseFloat(item.amount);
    if (item.type === "in") {
      sum += value;
    } else {
      sum -= value;
    }
  }
  sum = sum.toFixed(2);
  let color = "";
  if (sum > 0) color = "#03ac00";
  else if (sum < 0) color = "#c70000";
  else color = "#000000";
  return { color, sum };
}

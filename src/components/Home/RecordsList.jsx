import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import UserContext from "../../contexts/UserContext";
import EditContext from "../../contexts/EditContext";
import { useNavigate } from "react-router-dom";
import {
  Main,
  RecordLine,
  StyledDate,
  StyledLabel,
  StyledValue,
  StyledBalance,
  RecordsDiv,
  IconBox,
} from "./StyledHome";

export default function RecordsList({ list }) {
  const [newList, setNewList] = useState(list);

  useEffect(() => {
    setNewList(list);
  }, [list]);

  function mapRecords(list) {
    const records = list.map((item) => (
      <Record
        key={item.id}
        id={item.id}
        date={item.date}
        description={item.description}
        amount={item.amount}
        type={item.type}
        newList={newList}
        setNewList={setNewList}
      />
    ));
    return records;
  }

  if (newList.length === 0) {
    return (
      <Main empty={"empty"}>
        <p>
          Não há registros de <br /> entrada ou saída
        </p>
      </Main>
    );
  } else {
    const { color, sum } = calculateBalance(newList);
    return (
      <Main empty={"not empty"}>
        <RecordsDiv>{mapRecords(newList)}</RecordsDiv>
        <StyledBalance>
          <p>SALDO</p> <em style={{ color: color }}>{sum}</em>
        </StyledBalance>
      </Main>
    );
  }
}

function Record({ id, date, description, type, amount, newList, setNewList }) {
  const [hovered, setHovered] = useState(false);
  const { userInfo } = useContext(UserContext);
  const { setEditInfo } = useContext(EditContext);
  const { token } = userInfo;
  const navigate = useNavigate();

  async function deleteRecord(id) {
    const userConfirm = window.confirm(
      "Tem certeza que deseja apagar esse registro?"
    );
    if (userConfirm) {
      const promise = axios.delete(
        `http://localhost:4000/transactions?id=${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      promise
        .then((res) => {
          alert("Registro apagado com sucesso!");
          const updatedList = newList.filter((item) => item.id !== id);
          setNewList(updatedList);
        })
        .catch((err) => console.log(err));
    }
  }

  function editRecord(id, type, date, description, amount) {
    setEditInfo({ id, type, date, description, amount });
    navigate("/edit");
  }

  if (!hovered) {
    return (
      <RecordLine onMouseEnter={() => setHovered(true)}>
        <StyledDate>{formatDate(date)}</StyledDate>
        <StyledLabel>{description}</StyledLabel>
        <StyledValue type={type}>{amount}</StyledValue>
      </RecordLine>
    );
  } else {
    return (
      <RecordLine onMouseLeave={() => setHovered(false)}>
        <StyledDate>{formatDate(date)}</StyledDate>
        <StyledLabel>{description}</StyledLabel>
        <IconBox>
          <BiEdit
            size={"16px"}
            cursor={"pointer"}
            onClick={() => editRecord(id, type, date, description, amount)}
          />
          <AiOutlineDelete
            size={"16px"}
            cursor={"pointer"}
            onClick={() => deleteRecord(id)}
          />
        </IconBox>
      </RecordLine>
    );
  }
}

function formatDate(timestamp) {
  const date = dayjs(timestamp);
  const formattedDate = date.format("DD/MM");
  return formattedDate;
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

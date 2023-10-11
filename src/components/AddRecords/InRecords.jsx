import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { Container, Form, Header, Button } from "./StyledRecords";
import axios from "axios";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pt from "date-fns/locale/pt";
import { useNavigate } from "react-router-dom";

registerLocale("pt", pt);
setDefaultLocale("pt");

export default function InRecords() {
  const { userInfo } = useContext(UserContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [recordData, setRecordData] = useState({
    value: "",
    description: "",
  });
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    if (
      selectedDate !== null &&
      recordData.value !== 0 &&
      recordData.value !== "" &&
      recordData.description !== ""
    ) {
      const data = {
        type: "in",
        amount: recordData.value,
        description: recordData.description,
        date: selectedDate,
      };
      const promise = axios.post("http://localhost:4000/transactions", data, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      promise
        .then((res) => alert("Nova entrada criada com sucesso"))
        .catch((err) =>
          alert(
            "Ocorreu um erro ao inserir a nova entrada, tente novamente mais tarde"
          )
        )
        .finally(navigate("/home"));
    } else {
      alert("Preencha todos os campos corretamente!");
    }
  }

  return (
    <Container>
      <Header>
        <h1>Nova entrada</h1>
      </Header>

      <Form>
        <input
          type="number"
          id="value"
          value={recordData.value}
          required
          placeholder="Valor"
          onChange={(e) =>
            setRecordData({ ...recordData, value: e.target.value })
          }
        />
        <input
          type="text"
          id="description"
          value={recordData.description}
          required
          placeholder="Descrição"
          onChange={(e) =>
            setRecordData({ ...recordData, description: e.target.value })
          }
        />
        <p>Selecione uma data</p>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat={"dd/MM"}
        />
        <Button onClick={submit}>Salvar entrada</Button>
      </Form>
    </Container>
  );
}

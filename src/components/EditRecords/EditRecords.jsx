import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { Container, Form, Header, Button } from "./StyledEdit";
import axios from "axios";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pt from "date-fns/locale/pt";
import { useNavigate } from "react-router-dom";
import EditContext from "../../contexts/EditContext";

registerLocale("pt", pt);
setDefaultLocale("pt");

export default function EditRecords() {
  const { userInfo } = useContext(UserContext);
  const { editInfo, setEditInfo } = useContext(EditContext);
  const date = new Date(editInfo.date);
  const [selectedDate, setSelectedDate] = useState(date);
  const [recordData, setRecordData] = useState({
    value: editInfo.amount,
    description: editInfo.description,
  });
  console.log(editInfo);
  const navigate = useNavigate();

  let headerText = "";
  if (editInfo.type === "out") {
    headerText = "Editar saída";
  } else {
    headerText = "Editar entrada";
  }

  async function submit(e) {
    e.preventDefault();
    if (
      selectedDate !== null &&
      recordData.value !== 0 &&
      recordData.description !== ""
    ) {
      const data = {
        amount: recordData.value,
        date: selectedDate,
        description: recordData.description,
      };
      const promise = axios.put(
        `http://localhost:4000/transactions?id=${editInfo.id}`,
        data,
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      promise
        .then((res) => alert("Registro alterado com sucesso"))
        .catch((err) =>
          alert(
            "Ocorreu um erro ao tentar editar o registro, tente novamente mais tarde!"
          )
        )
        .finally(() => {
          setEditInfo({});
          setTimeout(() => navigate("/home"), 1000);
        });
    } else {
      alert("Preencha os campos corretamente!");
    }
  }

  return (
    <Container>
      <Header>
        <h1>{headerText}</h1>
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
        <Button onClick={submit}>Salvar alterações</Button>
      </Form>
    </Container>
  );
}

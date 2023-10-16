import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { RiLoginBoxLine } from "react-icons/ri";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import axios from "axios";
import { Container, Header, Buttons } from "./StyledHome";
import RecordsList from "./RecordsList";

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

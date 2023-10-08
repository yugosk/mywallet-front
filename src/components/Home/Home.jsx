import { useContext } from "react";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import { RiLoginBoxLine } from "react-icons/ri";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

export default function Home() {
  const { userInfo } = useContext(UserContext);
  return (
    <Container>
      <Header>
        <h1>Olá, {userInfo.name}</h1>
        <RiLoginBoxLine color="#ffffff" size={"24px"} cursor={"pointer"} />
      </Header>

      <Main empty={false}>
        <StyledBalance></StyledBalance>
      </Main>
      <Buttons>
        <button>
          <AiOutlinePlusCircle color="#ffffff" size={"25px"} />
          Nova <br /> entrada
        </button>
        <button>
          <AiOutlineMinusCircle color="#ffffff" size={"25px"} />
          Nova <br /> saída
        </button>
      </Buttons>
    </Container>
  );
}

const Container = styled.div`
  background-color: #8c11be;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  width: 87%;
  height: 78px;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-family: "Raleway", sans-serif;
    font-size: 26px;
    color: #ffffff;
    font-weight: 700;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.empty ? "center" : "flex-start")};
  align-items: center;
  background-color: #ffffff;
  border-radius: 5px;
  height: 67%;
  width: 87%;
  padding-top: 23px;

  p {
    text-align: center;
    font-family: "Raleway", sans-serif;
    font-size: 20px;
    font-weight: 400;
    color: #868686;
  }
`;

const Buttons = styled.div`
  width: 87%;
  height: calc(33vh - 78px);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  button {
    width: 45%;
    height: 80%;
    background-color: #a328d6;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: left;
    color: #ffffff;
    font-size: 17px;
    font-family: "Raleway", sans-serif;
    font-weight: 700;
    text-align: left;
    gap: 27%;
    padding: 9px 0 9px 10px;
  }
`;

const RecordLine = styled.div`
  width: 93%;
  height: 19px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 5px;
`;

const StyledDate = styled.div`
  width: 15%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: left;
  font-family: "Raleway", sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #c6c6c6;
`;

const StyledLabel = styled.div`
  width: 59%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  text-align: left;
  font-family: "Raleway", sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #000000;
`;

const StyledValue = styled.div`
  width: 19%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: right;
  font-family: "Raleway", sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: ${(props) => (props.inflow ? "#03ac00" : "#c70000")};
`;

const StyledBalance = styled.div`
  width: 80%;
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  bottom: calc(33vh - 68px);
  position: fixed;

  p {
    font-family: "Raleway", sans-serif;
    font-size: 17px;
    font-weight: 700;
    color: #000000;
    text-align: left;
  }

  em {
    font-family: "Raleway", sans-serif;
    font-size: 17px;
    font-weight: 400;
    color: ${(props) => (props.positive ? "03ac00" : "c70000")};
    text-align: right;
  }
`;

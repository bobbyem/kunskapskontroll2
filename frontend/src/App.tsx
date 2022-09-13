import UserForm from "./components/UserForm";
import "rsuite/dist/rsuite.min.css";
import {
  Footer,
  CustomProvider,
  Button,
  Container,
  Header,
  Navbar,
  Content,
  Nav,
} from "rsuite";
import { useState } from "react";
function App() {
  const [state, setState] = useState<string | null>("SIGNUP");

  //Function to toggle between signup/login
  const toggleState = (): void => {
    if (state === "SIGNUP") {
      setState("LOGIN");
      return;
    }
    setState("SIGNUP");
  };

  return (
    <CustomProvider theme="dark">
      <Container style={{ height: "100vh" }}>
        <Header>
          <Navbar appearance="inverse">
            <h2>Interester</h2>
          </Navbar>
        </Header>
        <Content>
          <UserForm state={state} toggleState={toggleState} />
        </Content>
        <Footer>🦶</Footer>
      </Container>
    </CustomProvider>
  );
}

export default App;

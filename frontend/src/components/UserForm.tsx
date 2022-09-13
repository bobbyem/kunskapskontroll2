import { SyntheticEvent, useEffect, useState } from "react";
import { Badge, Button, Divider, Form, Notification, useToaster } from "rsuite";
import FormGroup from "rsuite/esm/FormGroup";

function UserForm(props: { state: string | null; toggleState?: () => void }) {
  const { state, toggleState } = props;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [request, setRequest] = useState<Request | null>(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const toaster = useToaster();

  //Handle message toaster
  useEffect(() => {
    if (message) {
      toaster.push(toast);
    }
  }, [message]);

  //Create toast element
  const toast = (
    <Notification
      type="info"
      header={messageType}
      closable
      onClose={() => {
        setMessage("");
      }}
    >
      {message}
    </Notification>
  );

  //Clear inputs
  const clearInputs = (): void => {
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async () => {
    if (state === "SIGNUP") {
      try {
        const response = await fetch("/accounts/signup", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        })
          .then((resp) => resp.json())
          .then((data) => {
            setMessage(data);
            if (data === "User added") {
              clearInputs();
              if (toggleState) {
                toggleState();
              }
            }
          });
      } catch (error) {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
      }
      return;
    }
    //If login
    try {
      const response = await fetch("/accounts/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((resp) => resp.json())
        .then((data) => {
          setMessage(data);
          if (data === "Login success") {
            clearInputs();
            if (toggleState) {
              toggleState();
            }
          }
        });
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  };

  //Signup elements
  if (state) {
    return (
      <Form style={{ marginLeft: "4%", marginRight: "4%", marginTop: "2%" }}>
        <h1>{state}</h1>
        {state === "SIGNUP" ? (
          <FormGroup>
            <Form.ControlLabel>Username*</Form.ControlLabel>
            <Form.Control
              name="name"
              value={username}
              onChange={(username: string, event: SyntheticEvent) => {
                const target = event.target as HTMLInputElement;
                setUsername(target.value);
              }}
            />
          </FormGroup>
        ) : null}
        <FormGroup>
          <Form.ControlLabel>Email*</Form.ControlLabel>
          <Form.Control
            name="email"
            type="email"
            value={email}
            onChange={(email: string, event: SyntheticEvent) => {
              const target = event.target as HTMLInputElement;
              setEmail(target.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Form.ControlLabel>Password*</Form.ControlLabel>
          <Form.Control
            name="password"
            type="password"
            value={password}
            onChange={(password: string, event: SyntheticEvent) => {
              const target = event.target as HTMLInputElement;
              setPassword(target.value);
            }}
          />
          <Form.HelpText>* = Required</Form.HelpText>
        </FormGroup>
        <Badge content={!email || !password ? false : "👍"}>
          <Button
            appearance="primary"
            disabled={!email || !password ? true : false}
            onClick={handleSubmit}
          >
            {state === "SIGNUP" ? "🖋 Signup" : "🔑 Login"}
          </Button>
        </Badge>
        <Button
          appearance="subtle"
          onClick={() => {
            //Change the state to login/signup
            if (toggleState) {
              toggleState();
            }
            clearInputs();
          }}
          style={{ marginLeft: "2rem" }}
        >
          {state === "LOGIN" ? "🖋 Signup" : "🔑 Login"}
        </Button>
        <Divider />
      </Form>
    );
  }

  return null;
}

export default UserForm;

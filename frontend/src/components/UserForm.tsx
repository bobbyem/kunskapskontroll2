import { SyntheticEvent, useEffect, useState } from "react";
import { Badge, Button, Divider, Form, Notification, useToaster } from "rsuite";
import FormGroup from "rsuite/esm/FormGroup";

export type AuthUser = {
  username: string;
  email: string;
  password: string;
};

type Message = {
  title: string;
  prompt: string;
  send: boolean;
};

const defaultAuthUser: AuthUser = {
  username: "",
  email: "",
  password: "",
};

// type Aaa = "email" | "password" // union

//type AuthLoginRequirements = Pick<AuthUser, "email" | "password">;

// const signUpAuthUser = async ({
//   username,
//   email,
//   password,
// }: AuthUser): Promise<AuthUser | undefined> => {
//   try {
//     await fetch("/accounts/signup", {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify({ username, email, password }),
//     })
//       .then((resp) => resp.json())
//       .then((data) => {
//         return data as AuthUser;
//       });

//   } catch (error) {
//     console.log("====================================");
//     console.log(error);
//     console.log("====================================");
//   }

//   return undefined;
// };

function useSignUpUser() {
  // const { uploadProfileImage, coverImage } = useUploadImage()

  // const [data, setData] = useState("");

  // const getAllData = () => {
  //   //loggar något
  //   setData("data satt")
  // }

  const signUpAuthUser = async ({
    username,
    email,
    password,
  }: AuthUser): Promise<AuthUser | undefined> => {
    try {
      await fetch("/accounts/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      })
        .then((resp) => resp.json())
        .then((data) => {
          // uploadProfileImage("bit64")
          return data as AuthUser;
        });
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }

    return undefined;
  };

  const promptUserSignUpSuccess = () => {
    //loggar något
  };

  return {
    // data,
    // getAllData,
    signUpAuthUser, //Här är en funktion
    promptUserSignUpSuccess, //Här är en annan funktion
  };
}

function UserForm(props: { state: string | null; toggleState?: () => void }) {
  const { state, toggleState } = props;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUpAuthUser, promptUserSignUpSuccess } = useSignUpUser();

  const [inputs, setInputs] = useState<AuthUser>(defaultAuthUser);

  const [request, setRequest] = useState<Request | null>(null);
  const [message, setMessage] = useState<Message>({
    title: "",
    prompt: "",
    send: false,
  });

  const [messageType, setMessageType] = useState("info");
  const toaster = useToaster();

  //Handle message toaster
  useEffect(() => {
    if (message.send) {
      toaster.push(toast);
      // setMessage({
      //   ...message,
      //   send: true,
      // })
    }
  }, [message]);

  //Create toast element
  const toast = (
    <Notification
      type="info"
      header={messageType}
      closable
      onClose={() => {
        setMessage({
          title: "",
          prompt: "",
          send: false,
        });
      }}
    >
      {message.title}
      {message.prompt}
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
      //const hämtanågot = async med return => Promise<AuthUser | undefined)
      // if(hämtanågot){ ...gör saker med AuthUser } annars prompta blev fel text
      signUpAuthUser(inputs).then((data) => {
        if (data) {
          setMessage({
            title: "Hej, välkommen!",
            prompt: `${data.email}`,
            send: true,
          });

          // if (data === "Login success") {
          clearInputs();
          if (toggleState) {
            toggleState();
          }
          // }
        } else {
          //toast error
        }
      });

      // try {
      //   const response = await fetch("/accounts/signup", {
      //     method: "POST",
      //     headers: {
      //       "Content-type": "application/json",
      //     },
      //     body: JSON.stringify({ username, email, password }),
      //   })
      //     .then((resp) => resp.json())
      //     .then((data) => {
      //       const { email } = data as AuthUser;

      //       setMessage({
      //         title: "Hej, välkommen!",
      //         prompt: `${email}`,
      //         send: true,
      //       });

      //       if (data === "User added") {
      //         clearInputs();
      //         if (toggleState) {
      //           toggleState();
      //         }
      //       }
      //     });
      // } catch (error) {
      //   console.log("====================================");
      //   console.log(error);
      //   console.log("====================================");
      // }
      // return;
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
            value={email} //state
            onChange={(email: string, event: SyntheticEvent) => {
              const target = event.target as HTMLInputElement;
              setEmail(target.value);
              // (property) onChange?:
              //(((value: any, event: SyntheticEvent<Element, Event>) => void) & PrependParameters<React.ChangeEventHandler<HTMLInputElement>, [value: ...]>) | undefined
            }}
          />
        </FormGroup>
        {/* <input
          onChange={(e) => {e.target.value}}
        >
        (property) React.ChangeEvent<HTMLInputElement>.target: EventTarget & HTMLInputElement
        Expected an assignment or function call and instead saw an expression.eslint
        </input> */}

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
            onClick={() => {
              signUpAuthUser(inputs);
            }}
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

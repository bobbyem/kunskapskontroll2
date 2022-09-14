import { LoginData, Message } from "../../types/types";

export default function useLogin() {
  //Set Default message
  const message: Message = {
    title: "",
    prompt: "",
    send: false,
  };

  async function login(loginData: LoginData): Promise<Message | undefined> {
    try {
      await fetch("/accounts/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      })
        .then((resp) => resp.json())
        .then((data) => {
          message.title = data.title;
          message.prompt = data.prompt;
          message.send = true;
        });
    } catch (error) {
      message.title = "Error";
      message.prompt = "Something went wrong";
      message.send = true;
    }

    return message;
  }

  return { login, message };
}

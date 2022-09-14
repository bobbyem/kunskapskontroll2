import { Message, SignupData } from "../../types/types";

export default function useSignup() {
  //Set Default message
  const message: Message = {
    title: "",
    prompt: "",
    send: false,
  };

  async function signup(signupData: SignupData): Promise<Message | undefined> {
    try {
      await fetch("/accounts/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
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

  return { signup, message };
}

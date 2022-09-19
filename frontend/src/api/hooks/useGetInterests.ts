import { useState } from "react";
import { defaultMessage, InterestsData, Message } from "../../types/types";

export default function useGetInterests() {
  const [data, setData] = useState<InterestsData | []>([]);
  const [message, setMessage] = useState<Message>(defaultMessage);

  async function getInterests(): Promise<InterestsData | undefined> {
    //Fetch the interests
    await fetch("/interests", {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((d) => {
        //If there is a message
        if (d.title) {
          setMessage({
            title: d.title,
            prompt: d.prompt,
            send: true,
          });
          return;
        }
        //Reset Message
        setMessage(defaultMessage);
        //Set the data
        setData(d);
      });
    return;
  }

  return { data, message, getInterests };
}

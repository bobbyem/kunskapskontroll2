import { useState } from "react";
import useLogin from "../api/hooks/useLogin";
import { LoginData } from "../types/types";

function Login() {
  const [input, setInput] = useState<LoginData>({
    email: "",
    password: "",
  });
  const { message, login } = useLogin();

  return (
    <div>
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={input.email}
            autoComplete="off"
            onChange={(e) => {
              setInput({ ...input, email: e.target.value });
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={input.password}
            autoComplete="off"
            onChange={(e) => {
              setInput({ ...input, password: e.target.value });
            }}
          />
        </div>
        <div>
          <button
            disabled={!input.email || !input.password ? true : false}
            onClick={(e) => {
              e.preventDefault();
              login(input).then((message) => console.log(message));
            }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;

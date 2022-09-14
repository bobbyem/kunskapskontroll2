import { useState } from "react";
import useSignup from "../api/hooks/useSignup";
import { SignupData } from "../types/types";

function Signup() {
  const [input, setInput] = useState<SignupData>({
    username: "",
    email: "",
    password: "",
  });
  const { message, signup } = useSignup();

  return (
    <div>
      <form>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={input.username}
            autoComplete="off"
            onChange={(e) => {
              setInput({ ...input, username: e.target.value });
            }}
          />
        </div>
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
            disabled={
              !input.username || !input.email || !input.password ? true : false
            }
            onClick={(e) => {
              e.preventDefault();
              signup(input).then((message) => console.log(message));
            }}
          >
            Signup
          </button>
          <button>Login</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;

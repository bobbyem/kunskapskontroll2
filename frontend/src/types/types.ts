//Default user type
export type User = {
  username: string;
  email: string;
  password: string;
};

//Signupdata - Same as User
export type SignupData = User;
//LoginData - User - "username"
export type LoginData = Pick<User, "email" | "password">;

//Message type
export type Message = {
  title: string;
  prompt: string;
  send: boolean;
};

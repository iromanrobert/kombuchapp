import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginService from "../api/login";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ email, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={({ target }) => {
            setEmail(target.value);
          }}
        />

        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </>
  );
}

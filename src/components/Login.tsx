"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

interface LoginProps {
  onLogin?: () => void; // Optional callback after successful login
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/",
    });

    if (result?.ok) {
      onLogin?.();
    } else {
      console.error(result?.error);
      setErrorMessage(result?.error || "Login failed");
    }
  };

  const handleOAuthSignIn = (provider: string) => {
    signIn(provider, { callbackUrl: "/" });
  };

  return (
    <div>
      <h2>Login Screen</h2>
      <div>
        <button type="button" onClick={() => handleOAuthSignIn("github")}>
          Login with GitHub
        </button>
        <button type="button" onClick={() => handleOAuthSignIn("google")}>
          Login with Google
        </button>
      </div>
      <h3>Or use your email</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Login button</button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Login;

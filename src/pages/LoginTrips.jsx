import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginTrips({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (email.trim() === "josevalentin@gmail.com" && password === "1234") {
      const loggedUser = {
        email: email.trim(),
        name: "User",
      };

      setUser(loggedUser);
      localStorage.setItem("user", JSON.stringify(loggedUser));
      navigate("/");
      return;
    }

    setError("Wrong credentials");
  };

  return (
    <section className="login-page">
      <div className="login-card">
        <h1 className="Tittle-Log">Log in</h1>

        <form onSubmit={handleSubmit}>
          <label className="email-imput">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />
          </label>

          <label className="password-imput">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
          </label>

          <button type="submit" className="Log-Button">
            Log in
          </button>
        </form>

        {error && <p>{error}</p>}
      </div>
    </section>
  );
}

export default LoginTrips;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function Login({ onAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) return alert(data.error);

    localStorage.setItem("token", data.token);
    onAuth();
    navigate("/");
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="bg-icons">
     <span>🔗</span>
     <span>📊</span>
     <span>⚡</span>
     <span>🔒</span>
     </div>
      <div className="card p-4 shadow-sm" style={{ width: "380px" }}>
        <h3 className="mb-2">Sign in</h3>
        <p className="text-muted mb-4">Welcome back to BitZip</p>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              className="form-control"
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn btn-primary w-100">
            Sign in
          </button>
        </form>

        <p className="text-center mt-3">
          Don’t have an account?{" "}
          <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

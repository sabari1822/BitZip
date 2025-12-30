import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function Signup({ onAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API}/auth/signup`, {
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
        <h3 className="mb-2">Create account</h3>
        <p className="text-muted mb-4">
          Start shortening links with BitZip
        </p>

        <form onSubmit={handleSignup}>
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
            Create account
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

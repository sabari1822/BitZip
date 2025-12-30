import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ isAuth, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          BitZip
        </Link>

        <div className="ms-auto d-flex gap-2">
          {!isAuth ? (
            <>
              <Link to="/login" className="btn btn-outline-light">
                Login
              </Link>
              <Link to="/signup" className="btn btn-light text-primary">
                Sign Up
              </Link>
            </>
          ) : (
            <button
              className="btn btn-outline-light"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

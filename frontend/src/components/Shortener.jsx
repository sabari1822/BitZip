import { useState } from "react";
import { toast } from "sonner";

const API = import.meta.env.VITE_API_URL;

export default function Shortener({ isAuth, onCreated }) {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShorten = async () => {
    if (!url.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    if (!isAuth) {
      toast.warning("Please login to shorten URLs");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch(`${API}/url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          url,
          customAlias: alias || undefined,
        }),
      });

      if (!res.ok) throw new Error();

      toast.success("Short link created");
      setUrl("");
      setAlias("");
      onCreated();
    } catch {
      toast.error("Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="hero-section">
      <div className="bg-icons">
     <span>🔗</span>
     <span>📊</span>
     <span>⚡</span>
     <span>🔒</span>
     </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card hero-card shadow-sm">
              <h3 className="fw-bold text-center mb-4">
                Shorten your link
              </h3>

              <input
                className="form-control mb-3"
                placeholder="Paste a long URL here"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />

              <input
                className="form-control mb-4"
                placeholder="Custom alias (optional)"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
              />

              <button
                className="btn btn-primary w-100"
                onClick={handleShorten}
                disabled={loading}
              >
                {loading ? "Shortening..." : "Shorten URL"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

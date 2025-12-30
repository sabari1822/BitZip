import { useState } from "react";
import Shortener from "../components/Shortener";
import Dashboard from "../components/Dashboard";


import {
  BarChart3,
  Link2,
  ShieldCheck,
  Zap,
  Database,
  Lock,
} from "lucide-react";

export default function Home() {
  const [refresh, setRefresh] = useState(0);
  const isAuth = !!localStorage.getItem("token");

  return (
    <>
      
      <section className="hero-section">
        <div className="container">
          <div className="hero-card text-center">
            <h1 className="mb-3 fw-bold">Shorten your links</h1>
            <p className="text-muted mb-4">
              Simple, fast and secure URL shortening.
            </p>

            <Shortener onCreated={() => setRefresh((v) => v + 1)} />
          </div>
        </div>
      </section>

      
      <section className="features-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Powerful features</h2>
            <p className="text-muted">
              Everything you need in a modern URL shortener
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-card">
                <BarChart3 />
                <h5>Track Clicks</h5>
                <p>See how many times your links are visited.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card">
                <Link2 />
                <h5>Custom Aliases</h5>
                <p>Create short links that are easy to remember.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card">
                <ShieldCheck />
                <h5>Secure</h5>
                <p>JWT authentication keeps your links protected.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card">
                <Zap />
                <h5>Fast Redirects</h5>
                <p>Instant redirection with low latency.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card">
                <Database />
                <h5>Reliable Storage</h5>
                <p>MongoDB-backed, production-ready storage.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card">
                <Lock />
                <h5>Private</h5>
                <p>Your links are visible only to your account.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

     
      {isAuth && (
        <section className="section-spacing">
          <Dashboard key={refresh} />
        </section>
      )}
    </>
  );
}

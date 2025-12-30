export default function HomeExtras({ isAuth }) {
  if (isAuth) return null;

  return (
    <>
      
      <section className="features-section">
        <div className="container">
          <div className="row g-4 text-center">

            <div className="col-md-4">
              <div className="feature-card">
                <h5 className="fw-bold">Track Clicks</h5>
                <p className="text-muted">
                  Real-time analytics for every shortened link.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card">
                <h5 className="fw-bold">Custom Aliases</h5>
                <p className="text-muted">
                  Create branded and memorable short URLs.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card">
                <h5 className="fw-bold">Secure</h5>
                <p className="text-muted">
                  JWT authentication keeps your links private.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card">
                <h5 className="fw-bold">Fast Redirects</h5>
                <p className="text-muted">
                  Optimized redirects with minimal latency.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card">
                <h5 className="fw-bold">Scalable</h5>
                <p className="text-muted">
                  MongoDB-backed architecture for growth.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card">
                <h5 className="fw-bold">User Dashboard</h5>
                <p className="text-muted">
                  Manage, delete, and analyze all your links.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      
      <section className="cta-section text-center">
        <div className="container">
          <h3 className="fw-bold mb-3">
            Start shortening links with BitZip
          </h3>
          <p className="text-muted mb-4">
            Create an account to unlock analytics, custom aliases, and more.
          </p>

          <a href="/signup" className="btn btn-primary btn-lg px-5">
            Create free account
          </a>
        </div>
      </section>
    </>
  );
}

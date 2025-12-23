import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BarChart3, ExternalLink, X } from "lucide-react";

const API = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const [urls, setUrls] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetch(`${API}/url/all`)
      .then(res => res.json())
      .then(setUrls);
  }, []);

  const loadAnalytics = async (shortId) => {
    const res = await fetch(`${API}/url/analytics/${shortId}`);
    const data = await res.json();
    setAnalytics({ shortId, ...data });
  };

  return (
    <section className="py-24">
      <div className="container max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-10 text-center gradient-text">
          Analytics Dashboard
        </h2>

        <div className="glass-card rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-4 text-left">Short URL</th>
                <th className="p-4 text-left">Original</th>
                <th className="p-4 text-center">Clicks</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {urls.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-10 text-center text-white/60">
                    <BarChart3 className="mx-auto mb-3 opacity-40" />
                    No links yet. Create one above.
                  </td>
                </tr>
              )}

              {urls.map(u => (
                <tr key={u._id} className="border-b border-white/5">
                  <td className="p-4">
                    <a
                      href={`${API}/${u.shortId}`}
                      target="_blank"
                      className="text-cyan-400 inline-flex items-center gap-2"
                    >
                      {u.shortId} <ExternalLink size={14} />
                    </a>
                  </td>
                  <td className="p-4 truncate max-w-xs">{u.redirectUrl}</td>
                  <td className="p-4 text-center">{u.visitHistory.length}</td>
                  <td className="p-4 text-right">
                    <Button size="sm" onClick={() => loadAnalytics(u.shortId)}>
                      Analytics
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {analytics && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="glass-card p-8 rounded-2xl w-full max-w-lg">
              <div className="flex justify-between mb-4">
                <h3 className="font-bold">
                  Analytics for {analytics.shortId}
                </h3>
                <Button variant="ghost" onClick={() => setAnalytics(null)}>
                  <X />
                </Button>
              </div>

              <p className="text-3xl font-bold mb-4 gradient-text">
                {analytics.totalClicks} clicks
              </p>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {analytics.analytics.map((a, i) => (
                  <div key={i} className="bg-black/40 p-3 rounded">
                    {new Date(a.timestamp).toLocaleString()}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

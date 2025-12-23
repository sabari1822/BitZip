import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Check, Zap } from "lucide-react";
import { toast } from "sonner";

const API = import.meta.env.VITE_API_URL;

export default function Shortener() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShorten = async () => {
    if (!url) return;

    try {
      setLoading(true);

      const res = await fetch(`${API}/url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) throw new Error("Failed to shorten URL");

      const data = await res.json();
      setShortUrl(`${API}/${data.id}`);
      toast.success("Short URL created 🎉");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative py-32">
      
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10 blur-3xl" />

      <div className="container max-w-4xl mx-auto px-6 relative">
        
        <div className="glass-card rounded-3xl px-10 pb-10 pt-20 text-center space-y-10">
          
          <h1 className="text-5xl font-bold">
            Shorten Your Links
          </h1>

          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Paste your URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="h-14 flex-1"
            />

            <Button
              onClick={handleShorten}
              disabled={loading}
              className="h-14 px-8 text-lg transition-all duration-200 hover:scale-[1.03] active:scale-95"
            >
              <Zap className="mr-2" />
              {loading ? "Shortening..." : "Shorten"}
            </Button>
          </div>

          {shortUrl && (
            <div className="relative">
              {/* reward glow */}
              <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-xl" />

              <div className="relative flex justify-between items-center bg-black/40 rounded-xl p-4">
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 truncate"
                >
                  {shortUrl}
                </a>

                <Button variant="ghost" onClick={copyLink}>
                  {copied ? <Check /> : <Copy />}
                </Button>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}

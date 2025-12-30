import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

const API = import.meta.env.VITE_API_URL;

export default function Dashboard({ refreshKey }) {
  const [urls, setUrls] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const token = localStorage.getItem("token");

  const fetchUrls = async () => {
    const res = await fetch(`${API}/url/all?page=${page}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setUrls(data.urls);
    setTotalPages(data.totalPages);
  };

  useEffect(() => {
    fetchUrls();
  }, [page, refreshKey]); 

  const deleteUrl = async (id) => {
    await fetch(`${API}/url/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchUrls();
  };

  const chartData = {
    labels: urls.map((u) => u.shortId),
    datasets: [
      {
        label: "Clicks",
        data: urls.map((u) => u.visitHistory.length),
        backgroundColor: "#0d6efd",
      },
    ],
  };

  return (
    <div className="container mt-5">
      <div className="card p-3 shadow-sm mb-4">
        <h5>Your Links</h5>

        <table className="table">
          <thead>
            <tr>
              <th>Short</th>
              <th>Original</th>
              <th>Clicks</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {urls.map((u) => (
              <tr key={u._id}>
                <td>
                  <a href={`${API}/${u.shortId}`} target="_blank">
                    {u.shortId}
                  </a>
                </td>
                <td className="text-truncate" style={{ maxWidth: 300 }}>
                  {u.redirectUrl}
                </td>
                <td>{u.visitHistory.length}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteUrl(u._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="d-flex justify-content-between">
          <button
            className="btn btn-outline-secondary btn-sm"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>
          <button
            className="btn btn-outline-secondary btn-sm"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {urls.length > 0 && (
        <div className="card p-3 shadow-sm">
          <h5>Clicks Overview</h5>
          <Bar data={chartData} />
        </div>
      )}
    </div>
  );
}

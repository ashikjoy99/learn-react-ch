import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export function Detail() {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserDetail = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        setUser(response.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUser([]);
      } finally {
        setLoading(false);
      }
    };
    getUserDetail();
  }, [id]);

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Header: title left, actions right */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            User Details
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/users"
            className="px-4 py-2 bg-white border border-gray-200 rounded-md shadow-sm text-gray-700 hover:bg-gray-50 transition"
            aria-label="Back to users"
          >
            Back to Users
          </Link>

          <Link
            to="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition flex items-center gap-2"
            aria-label="Home"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M3 11.5L12 4l9 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 21V11h14v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Home
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto">
        {/* Loading / empty */}
        {loading ? (
          <div className="rounded-lg border border-gray-100 bg-white p-8 shadow-sm">
            <div className="animate-pulse space-y-4">
              <div className="h-6 w-3/5 bg-gray-200 rounded" />
              <div className="h-40 bg-gray-200 rounded" />
              <div className="h-4 w-2/5 bg-gray-200 rounded" />
            </div>
          </div>
        ) : (
          <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
            {/* Top section with avatar + main info */}
            <div className="p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="flex-shrink-0">
                {/* Decorative avatar placeholder (jsonplaceholder has no avatar) */}
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 flex items-center justify-center text-white font-bold text-xl">
                  {user.name ? user.name.split(" ").map(n => n[0]).slice(0,2).join("") : "U"}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-semibold text-gray-900 truncate">{user.name || "—"}</h2>
                <p className="text-sm text-gray-500 mt-1">{user.company?.name || ""}</p>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="rounded-md bg-gray-50 p-3 border">
                    <p className="text-xs text-gray-400">Email</p>
                    <p className="text-gray-700 break-words">{user.email || "—"}</p>
                  </div>

                  <div className="rounded-md bg-gray-50 p-3 border">
                    <p className="text-xs text-gray-400">Phone</p>
                    <p className="text-gray-700">{user.phone || "—"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t" />

            {/* Details section */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400">Username</p>
                  <p className="text-gray-800">{user.username || "—"}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Website</p>
                  <p className="text-gray-800">
                    {user.website ? (
                      <a
                        href={`http://${user.website}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {user.website}
                      </a>
                    ) : "—"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400">Company</p>
                  <p className="text-gray-800">{user.company?.name || "—"}</p>
                  {user.company?.catchPhrase && (
                    <p className="text-sm text-gray-500 mt-1">“{user.company.catchPhrase}”</p>
                  )}
                </div>

                <div>
                  <p className="text-xs text-gray-400">Address</p>
                  <p className="text-gray-800">
                    {user.address
                      ? `${user.address.suite}, ${user.address.street}, ${user.address.city} — ${user.address.zipcode}`
                      : "—"}
                  </p>
                </div>
              </div>

              {/* Raw JSON toggle / small footer */}
              <div className="pt-4 border-t flex items-center justify-between">
                <div className="text-right">
                  <Link
                    to="/users"
                    className="text-sm px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full border hover:bg-indigo-100 transition"
                  >
                    View All Users
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../components/ui/ToastProvider";

const LoginPage = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const toast = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailOrUsername || !password) return;

    setLoading(true);
    try {
      await auth.login({ username: emailOrUsername, email: emailOrUsername, password });
      toast.addToast("Login successful", "success");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.addToast(err.response?.data?.message || "Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-semibold text-red-900 mb-4">Admin Login</h1>
        <p className="text-sm text-gray-500 mb-6">Only authorized admin can access private dashboard features.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            placeholder="Email or username"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-red-100"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-red-100"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-red-800 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-70"
          >
            {loading ? "Please wait..." : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ErrorMessage from "../components/ErrorMessage";
import { Sparkles, Mail, Lock, ArrowRight } from "lucide-react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [statusCode, setStatusCode] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const useDemoCredentials = () => {
    setEmail("test@gmail.com");
    setPassword("test123");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setStatusCode(null);

    if (!email || !password) {
      setError("Email and password are required.");
      setStatusCode(400);
      return;
    }

    setSubmitting(true);
    try {
      await login({ email, password });
      navigate("/notes");
    } catch (err) {
      console.error("Login failed:", err);
      const status = err.response?.status;
      setStatusCode(status || 500);
      if (status === 401) {
        setError("Invalid email or password.");
      } else if (status === 400) {
        setError("Email and password are required.");
      } else {
        setError(err.response?.data?.message || err.message || "Failed to login. Please check server.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md glass-panel p-8 rounded-3xl border border-slate-700/60 shadow-2xl z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl gradient-btn flex items-center justify-center mx-auto mb-3 shadow-lg glow-purple">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight gradient-text">Welcome Back</h1>
          <p className="text-xs text-slate-400 mt-1">
            Sign in to access your AI-powered notes dashboard
          </p>
        </div>

        <div className="mb-6 border border-pink-200 bg-pink-50 p-4 rounded-xl">
          <div className="flex items-center justify-between gap-3 mb-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-700">Demo account</p>
            <button
              type="button"
              onClick={useDemoCredentials}
              disabled={submitting}
              className="text-xs font-semibold text-pink-700 hover:text-pink-900 underline underline-offset-4 cursor-pointer disabled:opacity-50"
            >
              Use credentials
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs text-slate-600">
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-slate-400">Email</span>
              <span className="font-medium">test@gmail.com</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-slate-400">Password</span>
              <span className="font-medium">test123</span>
            </div>
          </div>
        </div>

        {/* Error Banner */}
        {error && <ErrorMessage message={error} statusCode={statusCode} onDismiss={() => setError(null)} />}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="test@test.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={submitting}
                className="w-full text-sm py-3 px-4 pl-10 rounded-xl glass-input text-slate-100 placeholder-slate-500"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={submitting}
                className="w-full text-sm py-3 px-4 pl-10 rounded-xl glass-input text-slate-100 placeholder-slate-500"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl gradient-btn text-white text-sm font-semibold shadow-xl hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
          >
            <span>{submitting ? "Signing in..." : "Sign In"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Registration Link */}
        <div className="mt-8 pt-6 border-t border-slate-700/50 text-center text-xs text-slate-400">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-purple-400 hover:text-purple-300 underline underline-offset-4">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

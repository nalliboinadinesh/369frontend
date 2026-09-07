import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ErrorMessage from "../components/ErrorMessage";
import { Sparkles, User, Mail, Lock, UserPlus, ArrowRight } from "lucide-react";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [statusCode, setStatusCode] = useState(null);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setStatusCode(null);

    if (!name.trim()) {
      setError("Name is required.");
      setStatusCode(400);
      return;
    }
    if (!email.trim()) {
      setError("Email is required.");
      setStatusCode(400);
      return;
    }
    if (!password) {
      setError("Password is required.");
      setStatusCode(400);
      return;
    }

    setSubmitting(true);
    try {
      await register({ name, email, password });
      navigate("/notes");
    } catch (err) {
      console.error("Registration failed:", err);
      const status = err.response?.status;
      setStatusCode(status || 500);
      if (status === 409) {
        setError("Email is already in use. Please try logging in or use another email.");
      } else if (status === 400) {
        setError(err.response?.data?.message || "Invalid input parameters.");
      } else {
        setError(err.response?.data?.message || err.message || "Failed to create account. Please check server.");
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
          <h1 className="text-2xl font-extrabold tracking-tight gradient-text">Create Account</h1>
          <p className="text-xs text-slate-400 mt-1">
            Join AI Notes Manager to manage smart notes efficiently
          </p>
        </div>

        {/* Error Banner */}
        {error && <ErrorMessage message={error} statusCode={statusCode} onDismiss={() => setError(null)} />}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Test User"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={submitting}
                className="w-full text-sm py-3 px-4 pl-10 rounded-xl glass-input text-slate-100 placeholder-slate-500"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

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
            <span>{submitting ? "Creating account..." : "Register Now"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-8 pt-6 border-t border-slate-700/50 text-center text-xs text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-purple-400 hover:text-purple-300 underline underline-offset-4">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

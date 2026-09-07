import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Search, Plus, LogOut, User } from "lucide-react";

export const Navbar = ({ searchQuery, setSearchQuery }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-40 w-full glass-panel border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[76px]">
          {/* Logo Brand */}
          <Link to="/notes" className="flex items-center gap-2 group">
            <span className="text-2xl font-semibold tracking-[-0.08em] text-slate-100">NOTES</span>
            <span className="w-2 h-2 rounded-full bg-pink-400" />
          </Link>

          {/* Navigation Items */}
          {isAuthenticated && (
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-7 mr-5 text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase">
                <Link to="/notes" className={location.pathname === "/notes" ? "text-slate-100" : "hover:text-slate-100"}>Collection</Link>
                <Link to="/notes/new" className={location.pathname.includes("/new") ? "text-slate-100" : "hover:text-slate-100"}>Create</Link>
              </div>
              {/* Search input if on notes list */}
              {location.pathname === "/notes" && setSearchQuery && (
                <div className="hidden sm:block relative w-64">
                  <input
                    type="text"
                    placeholder="Search notes..."
                    value={searchQuery || ""}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-1.5 px-3 pl-9 text-xs rounded-xl glass-input text-slate-100 placeholder-slate-400"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                </div>
              )}

              {/* Action Buttons */}
              <Link
                to="/notes/new"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl gradient-btn text-white text-xs font-semibold shadow-md hover:opacity-95 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>New Note</span>
              </Link>

              {/* User Profile Info & Logout */}
              <div className="flex items-center gap-3 pl-2 border-l border-slate-700/60">
                <div className="hidden md:flex items-center gap-2 bg-slate-800/60 px-3 py-1 rounded-xl border border-slate-700/40">
                  <div className="w-6 h-6 rounded-full bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs text-slate-300 font-medium truncate max-w-[140px]">
                    {user?.name || user?.email || "User"}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 rounded-xl transition-all cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React from "react";
import { Loader2 } from "lucide-react";

export const Loading = ({ message = "Loading...", fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center z-50">
        <div className="p-8 rounded-2xl glass-panel flex flex-col items-center gap-4 glow-purple">
          <Loader2 className="w-10 h-10 text-purple-400 animate-spin" />
          <p className="text-slate-200 text-sm font-medium tracking-wide">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12 gap-3 text-purple-400">
      <Loader2 className="w-6 h-6 animate-spin" />
      <span className="text-slate-300 text-sm font-medium">{message}</span>
    </div>
  );
};

export default Loading;

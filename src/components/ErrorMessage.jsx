import React from "react";
import { AlertCircle, XCircle } from "lucide-react";

export const ErrorMessage = ({ message, onDismiss, statusCode }) => {
  if (!message) return null;

  let title = "Error";
  if (statusCode === 400) title = "Invalid Input";
  else if (statusCode === 401) title = "Authentication Required";
  else if (statusCode === 404) title = "Not Found";
  else if (statusCode === 409) title = "Conflict Error";
  else if (statusCode === 500) title = "Server Error";

  return (
    <div className="my-4 p-4 rounded-xl glass-panel bg-red-950/40 border border-red-500/30 text-red-200 flex items-start justify-between gap-3 shadow-lg animate-in fade-in duration-200">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-semibold text-red-300">{title}</h4>
          <p className="text-sm text-red-200/90 mt-0.5">{message}</p>
        </div>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-red-400 hover:text-red-200 p-1 rounded-lg transition-colors cursor-pointer"
          title="Dismiss"
        >
          <XCircle className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;

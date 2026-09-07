import React, { useState } from "react";
import { generateAIContent } from "../api/aiApi";
import { Sparkles, Loader2, Wand2, Check, RefreshCw } from "lucide-react";

const PROMPT_PRESETS = [
  {
    id: "improve",
    label: "Improve Clarity & Grammar",
    prompt: "Improve this note by making it more professional, clear, and grammatically correct. Return only the improved text.",
  },
  {
    id: "summarize",
    label: "Summarize Note",
    prompt: "Provide a concise summary of the key takeaways from this note.",
  },
  {
    id: "professional",
    label: "Make Professional",
    prompt: "Rewrite this note in a formal business tone with structured bullet points.",
  },
  {
    id: "expand",
    label: "Expand Key Ideas",
    prompt: "Elaborate on the key points in this note with helpful details and actionable suggestions.",
  },
];

export const AIAction = ({ content, onContentGenerated }) => {
  const [selectedPromptId, setSelectedPromptId] = useState(PROMPT_PRESETS[0].id);
  const [selectedPrompt, setSelectedPrompt] = useState(PROMPT_PRESETS[0].prompt);
  const [customPrompt, setCustomPrompt] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [lastGenerated, setLastGenerated] = useState(null);
  const [pendingAiContent, setPendingAiContent] = useState(null);

  const getPromptToSend = () => {
    if (showCustom && customPrompt.trim()) {
      return customPrompt.trim();
    }

    const activePreset = PROMPT_PRESETS.find((preset) => preset.id === selectedPromptId);
    return activePreset ? activePreset.prompt : selectedPrompt;
  };

  const handleGenerate = async () => {
    if (!content || !content.trim()) {
      setAiError("Please enter note content before running AI improvement.");
      return;
    }

    setAiError("");
    setAiLoading(true);

    const activePrompt = getPromptToSend();

    try {
      const response = await generateAIContent({
        system_prompt: activePrompt,
        content,
      });

      if (response && response.content) {
        const finalAiText = String(response.content).trim();
        setPendingAiContent(finalAiText);
        setAiError("");
      } else {
        setAiError("AI service returned empty content.");
      }
    } catch (err) {
      console.error("AI Generation error:", err);
      setAiError(err.response?.data?.message || err.message || "Failed to process AI request.");
    } finally {
      setAiLoading(false);
    }
  };

  const confirmReplace = () => {
    if (!pendingAiContent) return;

    setLastGenerated(pendingAiContent);
    onContentGenerated(pendingAiContent);
    setPendingAiContent(null);
  };

  const cancelReplacement = () => {
    setPendingAiContent(null);
  };

  return (
    <div className="p-4 rounded-2xl glass-panel bg-white border border-slate-700/40 my-4 shadow-xl relative">
      {pendingAiContent && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/90 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl rounded-xl border border-slate-700/40 bg-white p-5 shadow-2xl">
            <h4 className="text-sm font-bold text-slate-100 mb-3">AI Improved Content</h4>
            <div className="max-h-64 overflow-y-auto rounded-lg border border-slate-700/40 bg-slate-50 p-3 text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
              {pendingAiContent}
            </div>
            <div className="mt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={cancelReplacement}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-100 hover:bg-slate-100 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmReplace}
                className="px-5 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold shadow-lg hover:bg-slate-700 transition-all cursor-pointer"
              >
                Replace
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-pink-50 text-pink-700">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">AI Integration</h4>
            <p className="text-[11px] text-slate-400">Transform note content using FastAPI AI Service</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGenerate}
          disabled={aiLoading}
          className="px-4 py-2 rounded-xl ai-gradient-btn text-white text-xs font-semibold shadow-lg hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {aiLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              <span>Improve with AI</span>
            </>
          )}
        </button>
      </div>

      {/* Preset Selector */}
      <div className="flex flex-wrap gap-2 mb-2">
        {PROMPT_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => {
              setSelectedPromptId(preset.id);
              setSelectedPrompt(preset.prompt);
              setShowCustom(false);
            }}
            className={`px-2.5 py-1 text-[11px] rounded-lg border transition-all cursor-pointer ${
              !showCustom && selectedPromptId === preset.id
                ? "bg-pink-50 text-pink-700 border-pink-200 font-semibold"
                  : "bg-slate-50 text-slate-400 border-slate-700/50 hover:text-slate-100"
            }`}
          >
            {preset.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            setShowCustom(!showCustom);
            if (!showCustom) {
              setSelectedPromptId("custom");
            }
          }}
          className={`px-2.5 py-1 text-[11px] rounded-lg border transition-all cursor-pointer ${
            showCustom
              ? "bg-pink-50 text-pink-700 border-pink-200 font-semibold"
              : "bg-slate-50 text-slate-400 border-slate-700/50 hover:text-slate-100"
          }`}
        >
          Custom Prompt
        </button>
      </div>

      {/* Custom Prompt Input */}
      {showCustom && (
        <div className="mt-2">
          <input
            type="text"
            placeholder="e.g. Translate to Spanish or convert to checklist..."
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            className="w-full text-xs py-2 px-3 rounded-xl glass-input placeholder-slate-500"
          />
        </div>
      )}

      {/* AI Error Display */}
      {aiError && (
        <p className="mt-2 text-xs text-red-700 bg-red-50 p-2 rounded-lg border border-red-200">
          {aiError}
        </p>
      )}

      {/* Success Notification */}
      {lastGenerated && !aiError && !aiLoading && (
        <div className="mt-2 p-2 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-700">
          <span className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            Content updated with AI generated output!
          </span>
        </div>
      )}
    </div>
  );
};

export default AIAction;

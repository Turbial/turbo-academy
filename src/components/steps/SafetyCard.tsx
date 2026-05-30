"use client";

import { useState, useId } from "react";
import { getBrand } from "@/config";

/**
 * SafetyCard — Safety rule acknowledgment card
 *
 * Hierarchical design:
 * 1. Warning icon + safety rule header
 * 2. Safety message body
 * 3. "I understand" tap-to-continue button
 *
 * Variants:
 * - interactive (default): Requires user tap-to-acknowledge before proceeding
 * - info: Non-interactive display-only card with single action
 *
 * Usage:
 * ```
 * <SafetyCard
 *   rules="Keep your API keys secure. Never commit them to public repos."
 *   onAcknowledge={() => markStepComplete()}
 * />
 * ```
 */

export interface SafetyCardProps {
  /** Safety rule text to display */
  rules: string;
  /** Warning title (default: "Safety Check") */
  title?: string;
  /** Card variant */
  variant?: "interactive" | "info";
  /** Button label (default: "I understand") */
  buttonLabel?: string;
  /** Called when user acknowledges / taps action */
  onAcknowledge?: () => void;
  /** Additional className overrides */
  className?: string;
  /** Optional read-only content below the rules (e.g. code blocks, extra notes) */
  children?: React.ReactNode;
}

export default function SafetyCard({
  rules,
  title = "Safety Check",
  variant = "interactive",
  buttonLabel = "I understand",
  onAcknowledge,
  className = "",
  children,
}: SafetyCardProps) {
  const brand = getBrand();
  const id = useId();
  const [acknowledged, setAcknowledged] = useState(false);
  const isInteractive = variant === "interactive";
  const isDone = isInteractive && acknowledged;

  const handleAction = () => {
    if (!isInteractive) {
      onAcknowledge?.();
      return;
    }
    setAcknowledged(true);
    onAcknowledge?.();
  };

  return (
    <div
      role="region"
      aria-label={title}
      aria-live={isInteractive ? "polite" : "off"}
      className={[
        "rounded-xl border p-5 transition-all duration-300",
        isDone
          ? "border-emerald-500/30 bg-emerald-500/5"
          : "border-amber-500/30 bg-amber-500/5",
        className,
      ].join(" ")}
      style={
        !isDone
          ? { borderColor: `${brand.accentHex}30`, backgroundColor: `${brand.accentHex}05` }
          : undefined
      }
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        {/* Warning icon */}
        <span
          className={[
            "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm",
            isDone ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400",
          ].join(" ")}
          aria-hidden="true"
        >
          {isDone ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          )}
        </span>

        {/* Title */}
        <div className="flex-1 min-w-0">
          <h3
            className={[
              "text-sm font-semibold",
              isDone ? "text-emerald-300" : "text-amber-300",
            ].join(" ")}
            id={`safety-title-${id}`}
          >
            {isDone ? "Acknowledged ✓" : title}
          </h3>
        </div>

        {/* Status badge */}
        {isInteractive && (
          <span
            className={[
              "text-xs font-medium px-2 py-0.5 rounded-full border",
              isDone
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                : "bg-amber-500/10 text-amber-400 border-amber-500/20",
            ].join(" ")}
          >
            {isDone ? "Done" : "Required"}
          </span>
        )}
      </div>

      {/* Rule text */}
      <div className="ml-11">
        <div
          className={[
            "text-sm leading-relaxed",
            isDone ? "text-zinc-400" : "text-zinc-300",
          ].join(" ")}
        >
          {rules}
        </div>

        {/* Optional children (code blocks, extra notes, etc.) */}
        {children && (
          <div className="mt-3">{children}</div>
        )}

        {/* Action button */}
        {!isDone && (
          <button
            onClick={handleAction}
            className={[
              "mt-4 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              "hover:opacity-90 active:scale-[0.98]",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900",
            ].join(" ")}
            style={{
              backgroundColor: brand.accentHex,
              color: "#000",
              ...(isInteractive ? {} : { backgroundColor: brand.accentHex + "20", color: brand.accentHex, border: `1px solid ${brand.accentHex}40` }),
            }}
            aria-describedby={`safety-title-${id}`}
          >
            {isInteractive ? buttonLabel : buttonLabel}
          </button>
        )}

        {/* Acknowledged state message */}
        {isDone && (
          <p className="mt-3 text-xs text-emerald-500/70 flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Acknowledged. You can proceed safely.
          </p>
        )}
      </div>
    </div>
  );
}

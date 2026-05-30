"use client";

import { useId } from "react";
import { getBrand } from "@/config";

/**
 * KnowledgeMeter — Circular gauge showing % correct on MC/TF/scenario questions.
 *
 * Displayed on lesson completion screen as an arc-based SVG gauge.
 * Supports configurable thresholds, labels, and animation.
 *
 * Variants:
 * - percentage: Standard 0-100% radial gauge with center label (default)
 * - score: Shows X/Y correct with percentage (e.g. "4/5 — 80%")
 * - minimal: Just the arc + percentage, no labels
 *
 * Usage:
 * ```
 * <KnowledgeMeter
 *   correct={4}
 *   total={5}
 *   label="Quiz Results"
 * />
 * ```
 */

export interface KnowledgeMeterProps {
  /** Number of correct answers */
  correct: number;
  /** Total number of questions */
  total: number;
  /** Optional title/label displayed below the gauge */
  label?: string;
  /** Optional subtitle with more context */
  subtitle?: string;
  /** Display variant */
  variant?: "percentage" | "score" | "minimal";
  /** Custom size in pixels (default: 160) */
  size?: number;
  /** Stroke width in pixels (default: 10) */
  strokeWidth?: number;
  /** Animation duration in ms (default: 800, 0 = no animation) */
  animateMs?: number;
  /** Additional class names */
  className?: string;
}

/**
 * Theme-aware color thresholds.
 * Returns stroke/strokeBg hex pairs for a given percentage.
 */
function getThresholdColors(pct: number, accentHex: string): { stroke: string; strokeBg: string } {
  if (pct >= 80) return { stroke: "#10b981", strokeBg: "#10b98120" }; // green — excellent
  if (pct >= 60) return { stroke: "#f59e0b", strokeBg: "#f59e0b20" }; // amber — good
  if (pct >= 40) return { stroke: "#f97316", strokeBg: "#f9731620" }; // orange — moderate
  return { stroke: "#ef4444", strokeBg: "#ef444420" }; // red — needs work
}

/**
 * Human-friendly label for the user's performance range.
 */
function getPerformanceLabel(pct: number): string {
  if (pct >= 90) return "Excellent";
  if (pct >= 80) return "Great";
  if (pct >= 70) return "Good";
  if (pct >= 60) return "Fair";
  if (pct >= 40) return "Needs Work";
  return "Keep Practicing";
}

/**
 * Get an emoji that corresponds to the performance level.
 */
function getPerformanceEmoji(pct: number): string {
  if (pct >= 90) return "🏆";
  if (pct >= 80) return "🌟";
  if (pct >= 70) return "👍";
  if (pct >= 60) return "💪";
  if (pct >= 40) return "📚";
  return "🔄";
}

export default function KnowledgeMeter({
  correct,
  total,
  label,
  subtitle,
  variant = "percentage",
  size = 160,
  strokeWidth = 10,
  animateMs = 800,
  className = "",
}: KnowledgeMeterProps) {
  const brand = getBrand();
  const id = useId();
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  // SVG arc calculations
  // We use a circle with cx/cy at center, r based on size minus stroke
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const filledLength = (percentage / 100) * circumference;
  const emptyLength = circumference - filledLength;

  // Gap at bottom (12 o'clock = -90deg, we want a gap so arc starts at ~8 o'clock)
  const rotation = -90 - 45; // start at 8 o'clock position
  const gap = 90; // 90° gap at bottom

  const { stroke, strokeBg } = getThresholdColors(percentage, brand.accentHex);
  const perfLabel = getPerformanceLabel(percentage);
  const emoji = getPerformanceEmoji(percentage);

  // Stroke-dasharray: filled + gap + empty
  // We adjust circumference to account for gap
  const gapLength = (gap / 360) * circumference;
  const adjustedCircum = circumference - gapLength;
  const dashFilled = (percentage / 100) * adjustedCircum;
  const dashGap = gapLength;
  const dashEmpty = adjustedCircum - dashFilled;

  return (
    <div
      className={["flex flex-col items-center", className].join(" ")}
      role="meter"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label || `Score: ${correct}/${total}`}
    >
      {/* SVG Gauge */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90"
          style={{ filter: "drop-shadow(0 0 6px rgba(16, 185, 129, 0.15))" }}
        >
          {/* Background track (with gap) */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={strokeBg}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${adjustedCircum} ${gapLength}`}
            strokeDashoffset={0}
          />

          {/* Filled track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${dashFilled} ${dashEmpty + dashGap}`}
            strokeDashoffset={0}
            style={{
              transition: animateMs > 0
                ? `stroke-dasharray ${animateMs}ms ease-out`
                : undefined,
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {variant === "percentage" && (
            <>
              <span className="text-xs text-zinc-500 mb-0.5">{emoji}</span>
              <span
                className="text-2xl font-bold font-mono tabular-nums"
                style={{ color: stroke }}
              >
                {percentage}%
              </span>
            </>
          )}
          {variant === "score" && (
            <>
              <span className="text-xs text-zinc-500 mb-0.5">{emoji}</span>
              <span
                className="text-xl font-bold font-mono tabular-nums"
                style={{ color: stroke }}
              >
                {correct}/{total}
              </span>
              <span
                className="text-xs font-mono tabular-nums mt-0.5"
                style={{ color: stroke, opacity: 0.7 }}
              >
                {percentage}%
              </span>
            </>
          )}
          {variant === "minimal" && (
            <span
              className="text-2xl font-bold font-mono tabular-nums"
              style={{ color: stroke }}
            >
              {percentage}%
            </span>
          )}
        </div>
      </div>

      {/* Labels below gauge */}
      {label && (
        <p className="mt-3 text-sm font-medium text-zinc-300 text-center">
          {emoji} {label}
        </p>
      )}

      {subtitle && (
        <p className="mt-1 text-xs text-zinc-500 text-center">{subtitle}</p>
      )}

      {/* Performance indicator text */}
      {correct > 0 && total > 0 && variant !== "minimal" && (
        <div className="mt-2 flex items-center gap-2">
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: `${stroke}20`,
              color: stroke,
              border: `1px solid ${stroke}30`,
            }}
          >
            {perfLabel}
          </span>
        </div>
      )}
    </div>
  );
}

/**
 * KnowledgeMeterRow — Horizontal bar-based variant for compact display.
 * Useful in dashboards, leaderboards, or summary screens.
 */
export function KnowledgeMeterRow({
  correct,
  total,
  label,
  showEmoji = true,
}: {
  correct: number;
  total: number;
  label?: string;
  showEmoji?: boolean;
}) {
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  const { stroke, strokeBg } = getThresholdColors(percentage, "#10b981");
  const emoji = getPerformanceEmoji(percentage);

  return (
    <div className="flex items-center gap-3 w-full" role="meter" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100} aria-label={label || `Score: ${correct}/${total}`}>
      {showEmoji && <span className="text-base flex-shrink-0">{emoji}</span>}
      {label && <span className="text-sm text-zinc-300 min-w-0 truncate">{label}</span>}
      <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${percentage}%`, backgroundColor: stroke }}
        />
      </div>
      <span className="text-xs font-mono tabular-nums text-zinc-400 flex-shrink-0 min-w-[3rem] text-right">
        {correct}/{total}
      </span>
    </div>
  );
}

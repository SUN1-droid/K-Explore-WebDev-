"use client";

/**
 * Pure SVG chart components — no external library dependencies.
 *
 * These render directly to SVG with explicit dimensions, making them
 * fully compatible with proxied / iframe environments where recharts'
 * ResizeObserver-based sizing breaks.
 *
 * Available components:
 *   SvgBarChart      — vertical grouped bar chart
 *   SvgLineChart     — line chart (set area={true} for filled area)
 *   SvgPieChart      — pie / donut chart
 *   SvgChartWrapper  — responsive auto-sizing div
 *
 * All charts accept the same ChartConfig format used by shadcn/ui chart.tsx.
 *
 * Usage example:
 *   import { SvgChartWrapper, SvgBarChart, type SvgChartConfig } from "@/components/ui/svg-charts";
 *
 *   const config: SvgChartConfig = {
 *     revenue: { label: "Revenue", color: "var(--chart-1)" },
 *     expenses: { label: "Expenses", color: "var(--chart-2)" },
 *   };
 *
 *   <SvgChartWrapper height={300}>
 *     {(width) => (
 *       <SvgBarChart
 *         data={data}
 *         xKey="month"
 *         dataKeys={["revenue", "expenses"]}
 *         config={config}
 *         width={width}
 *         height={300}
 *       />
 *     )}
 *   </SvgChartWrapper>
 */

import * as React from "react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Shared types
// ─────────────────────────────────────────────────────────────────────────────

export type SvgChartConfig = {
  [k: string]: {
    label?: string;
    color?: string;
  };
};

type DataPoint = Record<string, string | number>;

type TooltipState = {
  clientX: number;
  clientY: number;
  label: string;
  items: { key: string; value: number; color: string; label: string }[];
} | null;

// ─────────────────────────────────────────────────────────────────────────────
// Math utilities
// ─────────────────────────────────────────────────────────────────────────────

function linearScale(
  domain: [number, number],
  range: [number, number]
): (v: number) => number {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  if (d1 === d0) return () => r0;
  return (v) => r0 + ((v - d0) / (d1 - d0)) * (r1 - r0);
}

/** Return evenly-spaced, round-number Y-axis tick values. */
function niceYTicks(min: number, max: number, count = 5): number[] {
  if (min === max) return [min];
  const raw = (max - min) / count;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const step = Math.ceil(raw / mag) * mag;
  const ticks: number[] = [];
  let v = Math.floor(min / step) * step;
  while (v <= max + step * 0.01) {
    ticks.push(v);
    v = parseFloat((v + step).toPrecision(12));
  }
  return ticks;
}

function colorFor(config: SvgChartConfig, key: string, idx: number): string {
  return config[key]?.color ?? `var(--chart-${(idx % 5) + 1})`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Tooltip
// ─────────────────────────────────────────────────────────────────────────────

function Tooltip({
  state,
  formatY,
}: {
  state: TooltipState;
  formatY?: (v: number) => string;
}) {
  if (!state) return null;
  return (
    <div
      className="pointer-events-none fixed z-50 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl"
      style={{ left: state.clientX + 14, top: state.clientY - 8 }}
    >
      <div className="mb-1 font-medium">{state.label}</div>
      <div className="grid gap-1.5">
        {state.items.map((item) => (
          <div key={item.key} className="flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 shrink-0 rounded-[2px]"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-muted-foreground">{item.label}</span>
            <span className="ml-auto pl-4 font-mono font-medium tabular-nums">
              {formatY ? formatY(item.value) : item.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Legend
// ─────────────────────────────────────────────────────────────────────────────

function Legend({
  keys,
  config,
}: {
  keys: string[];
  config: SvgChartConfig;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 pt-2">
      {keys.map((key, i) => (
        <div key={key} className="flex items-center gap-1.5">
          <span
            className="inline-block h-2 w-2 shrink-0 rounded-[2px]"
            style={{ backgroundColor: colorFor(config, key, i) }}
          />
          <span className="text-xs text-muted-foreground">
            {config[key]?.label ?? key}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SvgChartWrapper — responsive auto-sizing container
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Wraps a chart in a div that measures its own width and passes it down
 * via a render prop. Always use this wrapper — it makes charts fill their
 * parent Card instead of overflowing at a fixed pixel width.
 *
 * Example:
 *   <SvgChartWrapper height={300}>
 *     {(width) => (
 *       <SvgBarChart data={data} xKey="month" dataKeys={["v"]} config={cfg} width={width} height={300} />
 *     )}
 *   </SvgChartWrapper>
 */
export function SvgChartWrapper({
  height = 300,
  className,
  style,
  children,
}: {
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  children: (width: number) => React.ReactNode;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(600);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = (source: string) => {
      const w = el.getBoundingClientRect().width || el.offsetWidth;
      if (w > 0) {
        console.log(`[SvgChartWrapper] ${source} → width=${Math.round(w)}px height=${height}px`);
        setWidth(w);
      }
    };

    measure("mount");

    // Fallback polling — ResizeObserver can silently fail in proxied/iframe
    // environments (same root cause as the recharts ban). Polling ensures
    // charts are always sized correctly even if the observer fires late.
    const interval = setInterval(() => measure("poll"), 500);
    const t = setTimeout(() => measure("timeout-50ms"), 50);
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => measure("raf"))
    );

    let obs: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      obs = new ResizeObserver(() => measure("ResizeObserver"));
      obs.observe(el);
    } else {
      console.warn("[SvgChartWrapper] ResizeObserver not available — polling only");
    }

    return () => {
      clearInterval(interval);
      clearTimeout(t);
      cancelAnimationFrame(raf);
      obs?.disconnect();
    };
  }, [height]);

  return (
    <div
      ref={ref}
      className={cn("w-full", className)}
      style={{ height, ...style }}
    >
      {children(width)}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SvgBarChart
// ─────────────────────────────────────────────────────────────────────────────

export interface SvgBarChartProps {
  /** Row data array. Each object has one xKey value + one numeric value per series. */
  data: DataPoint[];
  /** Key in each data object to use for the X-axis labels. */
  xKey: string;
  /** Keys to plot as separate bar series. */
  dataKeys: string[];
  /** Label + color config, keyed to dataKeys. */
  config: SvgChartConfig;
  width?: number;
  height?: number;
  className?: string;
  /** Format Y-axis tick labels and tooltip values. */
  formatY?: (v: number) => string;
  showGridLines?: boolean;
  showLegend?: boolean;
}

const M = { top: 10, right: 20, bottom: 38, left: 54 }; // shared margins

export function SvgBarChart({
  data,
  xKey,
  dataKeys,
  config,
  width = 600,
  height = 300,
  className,
  formatY,
  showGridLines = true,
  showLegend = true,
}: SvgBarChartProps) {
  const [tooltip, setTooltip] = React.useState<TooltipState>(null);

  const plotW = width - M.left - M.right;
  const plotH = height - M.top - M.bottom;

  const allVals = data.flatMap((d) => dataKeys.map((k) => Number(d[k]) || 0));
  const rawMax = Math.max(0, ...allVals);
  const rawMin = Math.min(0, ...allVals);
  const ticks = niceYTicks(rawMin, rawMax);
  const yMax = Math.max(rawMax, ticks[ticks.length - 1] ?? rawMax);
  const yMin = Math.min(rawMin, ticks[0] ?? 0);
  const yScale = linearScale([yMin, yMax === yMin ? yMax + 1 : yMax], [plotH, 0]);
  const zeroY = yScale(0);

  const groupW = plotW / Math.max(data.length, 1);
  const barPad = groupW * 0.25;
  const barW = (groupW - barPad) / Math.max(dataKeys.length, 1);

  return (
    <div className={cn("relative select-none", className)}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height={height}
        // preserveAspectRatio="none" ensures the SVG fills the full width×height
        // box exactly, with no letterboxing. Without this, the browser uses
        // "xMidYMid meet" which shrinks the content to preserve the viewBox ratio
        // and adds empty padding — this shifts hit areas away from visual elements
        // and breaks hover.
        preserveAspectRatio="none"
        style={{ display: "block" }}
        onMouseMove={(e) =>
          setTooltip((prev) =>
            prev ? { ...prev, clientX: e.clientX, clientY: e.clientY } : null
          )
        }
        onMouseLeave={() => setTooltip(null)}
      >
        <g transform={`translate(${M.left},${M.top})`}>
          {/* Grid + Y ticks */}
          {ticks.map((t) => {
            const y = yScale(t);
            return (
              <g key={t}>
                {showGridLines && (
                  <line
                    x1={0}
                    x2={plotW}
                    y1={y}
                    y2={y}
                    stroke="currentColor"
                    strokeOpacity={0.12}
                    strokeWidth={1}
                  />
                )}
                <text
                  x={-8}
                  y={y}
                  textAnchor="end"
                  dominantBaseline="middle"
                  fontSize={11}
                  fill="var(--muted-foreground)"
                >
                  {formatY ? formatY(t) : t.toLocaleString()}
                </text>
              </g>
            );
          })}

          {/* Bars */}
          {data.map((d, i) => {
            const gx = i * groupW + barPad / 2;
            return (
              <g key={i}>
                {dataKeys.map((key, j) => {
                  const val = Number(d[key]) || 0;
                  const bh = Math.abs(yScale(val) - zeroY);
                  const by = val >= 0 ? yScale(val) : zeroY;
                  const color = colorFor(config, key, j);
                  return (
                    <rect
                      key={key}
                      x={gx + j * barW}
                      y={by}
                      width={Math.max(1, barW - 2)}
                      height={Math.max(0, bh)}
                      fill={color}
                      rx={2}
                      onMouseEnter={(e) =>
                        setTooltip({
                          clientX: e.clientX,
                          clientY: e.clientY,
                          label: String(d[xKey]),
                          items: dataKeys.map((k, idx) => ({
                            key: k,
                            value: Number(d[k]) || 0,
                            color: colorFor(config, k, idx),
                            label: config[k]?.label ?? k,
                          })),
                        })
                      }
                    />
                  );
                })}
              </g>
            );
          })}

          {/* Zero baseline */}
          <line
            x1={0}
            x2={plotW}
            y1={zeroY}
            y2={zeroY}
            stroke="currentColor"
            strokeOpacity={0.25}
            strokeWidth={1}
          />

          {/* X labels */}
          {data.map((d, i) => (
            <text
              key={i}
              x={i * groupW + groupW / 2}
              y={plotH + 16}
              textAnchor="middle"
              fontSize={11}
              fill="var(--muted-foreground)"
            >
              {String(d[xKey])}
            </text>
          ))}
        </g>
      </svg>

      {showLegend && dataKeys.length > 1 && (
        <Legend keys={dataKeys} config={config} />
      )}

      <Tooltip state={tooltip} formatY={formatY} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SvgLineChart  (set area={true} to get a filled area chart)
// ─────────────────────────────────────────────────────────────────────────────

export interface SvgLineChartProps {
  data: DataPoint[];
  xKey: string;
  dataKeys: string[];
  config: SvgChartConfig;
  width?: number;
  height?: number;
  className?: string;
  formatY?: (v: number) => string;
  /** Fill the area under each line. Default false. */
  area?: boolean;
  showGridLines?: boolean;
  showDots?: boolean;
  showLegend?: boolean;
}

export function SvgLineChart({
  data,
  xKey,
  dataKeys,
  config,
  width = 600,
  height = 300,
  className,
  formatY,
  area = false,
  showGridLines = true,
  showDots = false,
  showLegend = true,
}: SvgLineChartProps) {
  const [tooltip, setTooltip] = React.useState<TooltipState>(null);
  const [hoverIdx, setHoverIdx] = React.useState<number | null>(null);

  const plotW = width - M.left - M.right;
  const plotH = height - M.top - M.bottom;

  const allVals = data.flatMap((d) => dataKeys.map((k) => Number(d[k]) || 0));
  const rawMax = Math.max(0, ...allVals);
  const rawMin = Math.min(0, ...allVals);
  const ticks = niceYTicks(rawMin, rawMax);
  const yMax = Math.max(rawMax, ticks[ticks.length - 1] ?? rawMax);
  const yMin = Math.min(rawMin, ticks[0] ?? 0);
  const yScale = linearScale([yMin, yMax === yMin ? yMax + 1 : yMax], [plotH, 0]);

  const xStep = data.length > 1 ? plotW / (data.length - 1) : plotW / 2;

  const pointsFor = (key: string) =>
    data.map((d, i) => ({
      x: i * xStep,
      y: yScale(Number(d[key]) || 0),
    }));

  const polyline = (pts: { x: number; y: number }[]) =>
    pts.map((p) => `${p.x},${p.y}`).join(" ");

  const areaPath = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return "";
    const baseline = yScale(0);
    return (
      `M${pts[0].x},${baseline} ` +
      pts.map((p) => `L${p.x},${p.y}`).join(" ") +
      ` L${pts[pts.length - 1].x},${baseline} Z`
    );
  };

  return (
    <div className={cn("relative select-none", className)}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height={height}
        preserveAspectRatio="none"
        style={{ display: "block" }}
        onMouseMove={(e) =>
          setTooltip((prev) =>
            prev ? { ...prev, clientX: e.clientX, clientY: e.clientY } : null
          )
        }
        onMouseLeave={() => {
          setTooltip(null);
          setHoverIdx(null);
        }}
      >
        <g transform={`translate(${M.left},${M.top})`}>
          {/* Grid + Y ticks */}
          {ticks.map((t) => {
            const y = yScale(t);
            return (
              <g key={t}>
                {showGridLines && (
                  <line
                    x1={0}
                    x2={plotW}
                    y1={y}
                    y2={y}
                    stroke="currentColor"
                    strokeOpacity={0.12}
                    strokeWidth={1}
                  />
                )}
                <text
                  x={-8}
                  y={y}
                  textAnchor="end"
                  dominantBaseline="middle"
                  fontSize={11}
                  fill="var(--muted-foreground)"
                >
                  {formatY ? formatY(t) : t.toLocaleString()}
                </text>
              </g>
            );
          })}

          {/* Area fills (painted first so lines sit on top) */}
          {area &&
            dataKeys.map((key, j) => {
              const pts = pointsFor(key);
              const color = colorFor(config, key, j);
              return (
                <path
                  key={key}
                  d={areaPath(pts)}
                  fill={color}
                  fillOpacity={0.15}
                  stroke="none"
                />
              );
            })}

          {/* Lines */}
          {dataKeys.map((key, j) => {
            const pts = pointsFor(key);
            const color = colorFor(config, key, j);
            return (
              <polyline
                key={key}
                points={polyline(pts)}
                fill="none"
                stroke={color}
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            );
          })}

          {/* Dots */}
          {showDots &&
            dataKeys.map((key, j) => {
              const pts = pointsFor(key);
              const color = colorFor(config, key, j);
              return pts.map((p, i) => (
                <circle
                  key={`${key}-${i}`}
                  cx={p.x}
                  cy={p.y}
                  r={3}
                  fill={color}
                  stroke="var(--background)"
                  strokeWidth={1.5}
                />
              ));
            })}

          {/* Hover crosshair */}
          {hoverIdx !== null && (
            <line
              x1={hoverIdx * xStep}
              x2={hoverIdx * xStep}
              y1={0}
              y2={plotH}
              stroke="var(--border)"
              strokeWidth={1}
              strokeDasharray="4 2"
              pointerEvents="none"
            />
          )}

          {/* Invisible full-height hit columns — one per data point.
              These fire onMouseEnter to pin the tooltip to the right column.
              The SVG-level onMouseMove then keeps the tooltip following the cursor. */}
          {data.map((d, i) => (
            <rect
              key={i}
              x={i === 0 ? 0 : i * xStep - xStep / 2}
              y={0}
              width={
                i === 0 || i === data.length - 1
                  ? xStep / 2
                  : xStep
              }
              height={plotH}
              fill="transparent"
              onMouseEnter={(e) => {
                setHoverIdx(i);
                setTooltip({
                  clientX: e.clientX,
                  clientY: e.clientY,
                  label: String(d[xKey]),
                  items: dataKeys.map((k, idx) => ({
                    key: k,
                    value: Number(d[k]) || 0,
                    color: colorFor(config, k, idx),
                    label: config[k]?.label ?? k,
                  })),
                });
              }}
            />
          ))}

          {/* X labels */}
          {data.map((d, i) => (
            <text
              key={i}
              x={i * xStep}
              y={plotH + 16}
              textAnchor="middle"
              fontSize={11}
              fill="var(--muted-foreground)"
            >
              {String(d[xKey])}
            </text>
          ))}
        </g>
      </svg>

      {showLegend && dataKeys.length > 1 && (
        <Legend keys={dataKeys} config={config} />
      )}

      <Tooltip state={tooltip} formatY={formatY} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SvgPieChart  (set innerRadius to get a donut chart)
// ─────────────────────────────────────────────────────────────────────────────

export interface SvgPieChartProps {
  /** Array of { name, value }, where name maps into config. */
  data: { name: string; value: number }[];
  config: SvgChartConfig;
  width?: number;
  height?: number;
  className?: string;
  /** 0 = solid pie, > 0 = donut hole radius in px. Default 60. */
  innerRadius?: number;
  showLegend?: boolean;
  formatValue?: (v: number) => string;
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
  innerR: number
): string {
  const toRad = (a: number) => (a - 90) * (Math.PI / 180);
  const x1 = cx + r * Math.cos(toRad(startAngle));
  const y1 = cy + r * Math.sin(toRad(startAngle));
  const x2 = cx + r * Math.cos(toRad(endAngle));
  const y2 = cy + r * Math.sin(toRad(endAngle));
  const ix1 = cx + innerR * Math.cos(toRad(startAngle));
  const iy1 = cy + innerR * Math.sin(toRad(startAngle));
  const ix2 = cx + innerR * Math.cos(toRad(endAngle));
  const iy2 = cy + innerR * Math.sin(toRad(endAngle));
  const large = endAngle - startAngle > 180 ? 1 : 0;

  if (innerR === 0) {
    return [
      `M ${cx} ${cy}`,
      `L ${x1} ${y1}`,
      `A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`,
      "Z",
    ].join(" ");
  }
  return [
    `M ${x1} ${y1}`,
    `A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`,
    `L ${ix2} ${iy2}`,
    `A ${innerR} ${innerR} 0 ${large} 0 ${ix1} ${iy1}`,
    "Z",
  ].join(" ");
}

export function SvgPieChart({
  data,
  config,
  width = 400,
  height = 300,
  className,
  innerRadius = 60,
  showLegend = true,
  formatValue,
}: SvgPieChartProps) {
  const [hovered, setHovered] = React.useState<string | null>(null);
  const [tooltip, setTooltip] = React.useState<TooltipState>(null);

  const cx = width / 2;
  const cy = height / 2;
  const outerR = Math.min(cx, cy) - 20;
  const innerR = Math.min(innerRadius, outerR - 10);

  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  let cursor = 0;
  const slices = data.map((d, i) => {
    const deg = (d.value / total) * 360;
    const start = cursor;
    cursor += deg;
    return {
      name: d.name,
      value: d.value,
      start,
      end: cursor,
      color: colorFor(config, d.name, i),
    };
  });

  return (
    <div className={cn("relative select-none", className)}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height={height}
        preserveAspectRatio="none"
        style={{ display: "block" }}
        onMouseLeave={() => {
          setHovered(null);
          setTooltip(null);
        }}
      >
        {slices.map((s) => {
          const isHovered = hovered === s.name;
          const scale = isHovered ? 1.04 : 1;
          return (
            <path
              key={s.name}
              d={describeArc(cx, cy, outerR, s.start, s.end, innerR)}
              fill={s.color}
              stroke="var(--background)"
              strokeWidth={2}
              transform={
                isHovered
                  ? `translate(${cx * (1 - scale)}, ${cy * (1 - scale)}) scale(${scale})`
                  : undefined
              }
              style={{ transition: "transform 0.15s ease" }}
              onMouseEnter={(e) => {
                setHovered(s.name);
                setTooltip({
                  clientX: e.clientX,
                  clientY: e.clientY,
                  label: config[s.name]?.label ?? s.name,
                  items: [
                    {
                      key: s.name,
                      value: s.value,
                      color: s.color,
                      label: config[s.name]?.label ?? s.name,
                    },
                  ],
                });
              }}
              onMouseMove={(e) =>
                setTooltip((prev) =>
                  prev
                    ? { ...prev, clientX: e.clientX, clientY: e.clientY }
                    : null
                )
              }
            />
          );
        })}

        {/* Center label for donut */}
        {innerR > 20 && (
          <>
            <text
              x={cx}
              y={cy - 6}
              textAnchor="middle"
              fontSize={22}
              fontWeight={600}
              fill="currentColor"
            >
              {hovered
                ? (
                    ((slices.find((s) => s.name === hovered)?.value ?? 0) /
                      total) *
                    100
                  ).toFixed(0) + "%"
                : formatValue
                  ? formatValue(total)
                  : total.toLocaleString()}
            </text>
            <text
              x={cx}
              y={cy + 14}
              textAnchor="middle"
              fontSize={12}
              fill="var(--muted-foreground)"
            >
              {hovered ? config[hovered]?.label ?? hovered : "Total"}
            </text>
          </>
        )}
      </svg>

      {showLegend && (
        <Legend keys={data.map((d) => d.name)} config={config} />
      )}

      <Tooltip
        state={tooltip}
        formatY={formatValue ?? ((v) => v.toLocaleString())}
      />
    </div>
  );
}

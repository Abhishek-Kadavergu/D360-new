import { useMemo } from "react";

interface ArchitectureSVGProps {
  progress: number;
  ignited: boolean;
}

const ArchitectureSVG = ({ progress, ignited }: ArchitectureSVGProps) => {
  const p = Math.min(progress, 1);

  const elements = useMemo(() => {
    const els: JSX.Element[] = [];
    const cx = 500;
    const blue = "#3b9eff";
    const cyan = "#22d3ee";
    const amber = "#fbbf24";
    const dimBlue = "#1e4a7a";
    const gridColor = "#1e3a5a";

    // ========== PERSPECTIVE GRID ==========
    const gridOp = Math.min(p * 2.5, 0.35);
    for (let i = -14; i <= 14; i++) {
      els.push(
        <line key={`gv-${i}`} x1={cx + i * 55} y1={830} x2={cx + i * 12} y2={180}
          stroke={gridColor} strokeWidth={0.5} opacity={gridOp * 0.6} />
      );
    }
    for (let i = 0; i < 16; i++) {
      const y = 830 - i * 42;
      const s = 1 - i * 0.035;
      els.push(
        <line key={`gh-${i}`} x1={cx - 420 * s} y1={y} x2={cx + 420 * s} y2={y}
          stroke={gridColor} strokeWidth={0.4} opacity={gridOp * 0.5 * (1 - i * 0.05)} />
      );
    }

    // ========== ZONE 1: DATA INPUT (bottom) ==========
    const z1 = Math.min(p * 3, 1);
    if (z1 > 0) {
      // Glowing input hopper
      els.push(
        <g key="hopper" opacity={z1}>
          <path d="M 250 785 L 170 725 L 170 695 L 250 730 Z" fill={blue} opacity={0.12} stroke={blue} strokeWidth={1} />
          <path d="M 250 785 L 750 785 L 830 725 L 170 725 Z" fill={blue} opacity={0.08} stroke={blue} strokeWidth={0.6} />
          <path d="M 750 785 L 830 725 L 830 695 L 750 730 Z" fill={blue} opacity={0.15} stroke={blue} strokeWidth={1} />
          <path d="M 250 730 L 750 730 L 830 695 L 170 695 Z" fill={blue} opacity={0.06} stroke={blue} strokeWidth={0.6} />
          <text x={cx} y={762} textAnchor="middle" fill={cyan} fontSize="12" fontFamily="monospace" fontWeight="700" opacity={0.8}>
            ◆ RAW DATA INPUT ◆
          </text>
        </g>
      );

      // Data type icons
      const types = [
        { icon: "📄", label: "DOC", x: 140 }, { icon: "🎤", label: "VOICE", x: 230 },
        { icon: "🖼️", label: "IMG", x: 320 }, { icon: "📊", label: "DATA", x: 680 },
        { icon: "💬", label: "TEXT", x: 770 }, { icon: "🌐", label: "API", x: 860 },
      ];
      types.forEach((d, i) => {
        const bob = Math.sin(p * 8 + i * 1.5) * 4;
        els.push(
          <g key={`dt-${i}`} opacity={z1 * 0.9}>
            <text x={d.x} y={770 + bob} textAnchor="middle" fontSize="20">{d.icon}</text>
            <text x={d.x} y={790} textAnchor="middle" fill={cyan} fontSize="7" fontFamily="monospace" opacity={0.7}>{d.label}</text>
          </g>
        );
      });

      // Flowing particles into hopper
      for (let i = 0; i < 25; i++) {
        const angle = (i / 25) * Math.PI;
        const fromX = cx + Math.cos(angle) * 400;
        const t = ((p * 4 + i * 0.13) % 1);
        const px = fromX + (cx - fromX) * t;
        const py = 800 + (700 - 800) * t;
        els.push(
          <circle key={`dp-${i}`} cx={px} cy={py} r={1.5 + Math.random()}
            fill={cyan} opacity={z1 * 0.5 * (1 - t)}>
            <animate attributeName="opacity" values="0.6;0.15;0.6" dur={`${0.6 + i * 0.08}s`} repeatCount="indefinite" />
          </circle>
        );
      }

      // Convergence arrow
      els.push(
        <g key="in-arrow" opacity={z1 * 0.6}>
          <polygon points={`${cx},678 ${cx - 8},698 ${cx + 8},698`} fill={cyan} opacity={0.7} />
        </g>
      );
    }

    // ========== TOKENIZER CONDUIT ==========
    const z2 = Math.max(0, Math.min((p - 0.12) * 3.5, 1));
    if (z2 > 0) {
      els.push(
        <g key="conduit" opacity={z2}>
          <rect x={cx - 70} y={635} width={140} height={50} rx={6} fill={blue} opacity={0.07} stroke={blue} strokeWidth={1.2} />
          <path d={`M ${cx - 70} 635 L ${cx - 58} 623 L ${cx + 82} 623 L ${cx + 70} 635 Z`} fill={blue} opacity={0.12} stroke={blue} strokeWidth={0.6} />
          <path d={`M ${cx + 70} 635 L ${cx + 82} 623 L ${cx + 82} 673 L ${cx + 70} 685 Z`} fill={blue} opacity={0.15} stroke={blue} strokeWidth={0.6} />
          {Array.from({ length: 8 }).map((_, i) => {
            const bx = cx - 58 + ((p * 250 + i * 18) % 116);
            return (
              <rect key={`cd-${i}`} x={bx} y={645} width={3} height={30} rx={1}
                fill={cyan} opacity={z2 * 0.4}>
                <animate attributeName="opacity" values="0.5;0.15;0.5" dur={`${0.4 + i * 0.08}s`} repeatCount="indefinite" />
              </rect>
            );
          })}
          <text x={cx} y={665} textAnchor="middle" fill={cyan} fontSize="9" fontFamily="monospace" fontWeight="bold" opacity={0.7}>
            TOKENIZER + EMBED
          </text>
        </g>
      );
    }

    // ========== ZONE 2: TRANSFORMER CORE ==========
    const z3 = Math.max(0, Math.min((p - 0.22) * 2.2, 1));
    if (z3 > 0) {
      const bL = cx - 170, bR = cx + 170, bT = 300, bB = 620, dep = 45;
      els.push(
        <g key="tbox" opacity={z3 * 0.95}>
          <rect x={bL} y={bT} width={bR - bL} height={bB - bT} rx={4}
            fill={blue} opacity={0.05} stroke={blue} strokeWidth={1.5} />
          <path d={`M ${bL} ${bT} L ${bL + dep} ${bT - dep} L ${bR + dep} ${bT - dep} L ${bR} ${bT} Z`}
            fill={blue} opacity={0.1} stroke={blue} strokeWidth={1} />
          <path d={`M ${bR} ${bT} L ${bR + dep} ${bT - dep} L ${bR + dep} ${bB - dep} L ${bR} ${bB} Z`}
            fill={blue} opacity={0.13} stroke={blue} strokeWidth={1} />
          <text x={cx + 22} y={bT - dep / 2 + 6} textAnchor="middle" fill={cyan} fontSize="15"
            fontFamily="monospace" fontWeight="bold" opacity={0.85}
            transform={`rotate(-2, ${cx + 22}, ${bT - dep / 2 + 6})`}>
            🧠 TRANSFORMER ENGINE
          </text>
        </g>
      );

      // Transformer layers
      const layers = [
        { label: "MULTI-HEAD ATTENTION", y: 340, n: 8, c: blue },
        { label: "LAYER NORM + RESIDUAL", y: 395, n: 6, c: "#5db8fe" },
        { label: "SELF-ATTENTION ×12", y: 450, n: 12, c: blue },
        { label: "CROSS-ATTENTION", y: 505, n: 10, c: cyan },
        { label: "FEED-FORWARD NET", y: 560, n: 8, c: "#2b8af0" },
      ];

      const built = Math.floor(z3 * layers.length);
      const partial = (z3 * layers.length) % 1;

      layers.forEach((layer, i) => {
        const lop = i < built ? 1 : (i === built ? partial : 0);
        if (lop <= 0) return;

        const w = 270, startX = cx - w / 2, spacing = w / (layer.n - 1);

        // Connections
        if (i > 0 && i <= built) {
          const prev = layers[i - 1];
          const pw = 270, ps = cx - pw / 2, psp = pw / (prev.n - 1);
          for (let j = 0; j < Math.min(layer.n, 5); j++) {
            const nj = Math.floor(j * layer.n / 5);
            const pj = Math.floor(j * prev.n / 5);
            els.push(
              <line key={`tc-${i}-${j}`}
                x1={ps + pj * psp} y1={prev.y} x2={startX + nj * spacing} y2={layer.y}
                stroke={layer.c} strokeWidth={ignited ? 1.5 : 0.8} opacity={lop * (ignited ? 0.4 : 0.2)} />
            );
          }
        }

        // Nodes
        for (let j = 0; j < layer.n; j++) {
          const nx = startX + j * spacing;
          els.push(
            <g key={`tn-${i}-${j}`} opacity={lop}>
              {ignited && (
                <circle cx={nx} cy={layer.y} r={12} fill={layer.c} opacity={0.1}>
                  <animate attributeName="r" values="8;14;8" dur={`${1.8 + j * 0.15}s`} repeatCount="indefinite" />
                </circle>
              )}
              <circle cx={nx} cy={layer.y} r={4.5} fill={layer.c} opacity={ignited ? 0.85 : 0.5} />
              <circle cx={nx} cy={layer.y} r={1.8} fill="#fff" opacity={ignited ? 0.9 : 0.4} />
            </g>
          );
        }

        // Label + bracket
        els.push(
          <g key={`tl-${i}`} opacity={lop * 0.7}>
            <line x1={bR + 8} y1={layer.y - 8} x2={bR + 8} y2={layer.y + 8} stroke={dimBlue} strokeWidth={0.8} />
            <line x1={bR + 8} y1={layer.y} x2={bR + 48} y2={layer.y} stroke={dimBlue} strokeWidth={0.8} />
            <text x={bR + 54} y={layer.y + 4} fill="#8cb4d8" fontSize="8" fontFamily="monospace">{layer.label}</text>
          </g>
        );
      });

      // Data particles rising through transformer
      if (z3 > 0.25) {
        for (let i = 0; i < 15; i++) {
          const px = cx - 110 + (i % 6) * 44 + Math.sin(p * 6 + i) * 12;
          els.push(
            <circle key={`tf-${i}`} cx={px} cy={550} r={1.8} fill={cyan} opacity={z3 * 0.5}>
              <animate attributeName="cy" values="590;310" dur={`${2.5 + i * 0.25}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0.1;0.5" dur={`${2.5 + i * 0.25}s`} repeatCount="indefinite" />
            </circle>
          );
        }
      }

      // Gears
      if (z3 > 0.15) {
        const gearPath = (gcx: number, gcy: number, r: number, teeth: number) => {
          let d = "";
          for (let i = 0; i < teeth; i++) {
            const a1 = (i / teeth) * Math.PI * 2;
            const a2 = ((i + 0.25) / teeth) * Math.PI * 2;
            const a3 = ((i + 0.5) / teeth) * Math.PI * 2;
            const a4 = ((i + 0.75) / teeth) * Math.PI * 2;
            d += `${i === 0 ? "M" : "L"}${gcx + Math.cos(a1) * r * 0.65},${gcy + Math.sin(a1) * r * 0.65} `;
            d += `L${gcx + Math.cos(a2) * r},${gcy + Math.sin(a2) * r} `;
            d += `L${gcx + Math.cos(a3) * r},${gcy + Math.sin(a3) * r} `;
            d += `L${gcx + Math.cos(a4) * r * 0.65},${gcy + Math.sin(a4) * r * 0.65} `;
          }
          return d + "Z";
        };
        const rot = ignited ? 360 : p * 300;
        // Left gear
        els.push(
          <g key="gear-l" opacity={z3 * 0.35}
            style={{ transform: `rotate(${rot}deg)`, transformOrigin: `${bL - 40}px 460px`, transition: "transform 1s linear" }}>
            <path d={gearPath(bL - 40, 460, 28, 10)} fill="none" stroke={blue} strokeWidth={1.5} />
            <circle cx={bL - 40} cy={460} r={7} fill="none" stroke={blue} strokeWidth={1} />
          </g>
        );
        // Right gear
        els.push(
          <g key="gear-r" opacity={z3 * 0.3}
            style={{ transform: `rotate(${-rot}deg)`, transformOrigin: `${bR + 80}px 490px`, transition: "transform 1s linear" }}>
            <path d={gearPath(bR + 80, 490, 24, 9)} fill="none" stroke={blue} strokeWidth={1.5} />
            <circle cx={bR + 80} cy={490} r={6} fill="none" stroke={blue} strokeWidth={1} />
          </g>
        );
      }

      // Build spark
      if (built < layers.length && partial > 0.15) {
        const active = layers[built];
        if (active) {
          els.push(
            <g key="spark" opacity={0.9}>
              <circle cx={cx} cy={active.y} r={5} fill={amber}>
                <animate attributeName="opacity" values="1;0.4;1" dur="0.25s" repeatCount="indefinite" />
              </circle>
              <circle cx={cx} cy={active.y} r={18} fill={amber} opacity={0.12}>
                <animate attributeName="r" values="12;22;12" dur="0.5s" repeatCount="indefinite" />
              </circle>
              {[0, 72, 144, 216, 288].map((a) => {
                const rad = (a * Math.PI) / 180;
                return (
                  <line key={`sp-${a}`}
                    x1={cx + Math.cos(rad) * 6} y1={active.y + Math.sin(rad) * 6}
                    x2={cx + Math.cos(rad) * 14} y2={active.y + Math.sin(rad) * 14}
                    stroke={amber} strokeWidth={1} opacity={0.6}>
                    <animate attributeName="opacity" values="0.7;0;0.7" dur="0.2s" begin={`${a * 0.005}s`} repeatCount="indefinite" />
                  </line>
                );
              })}
            </g>
          );
        }
      }
    }

    // ========== ZONE 3: AI OUTPUT (top) ==========
    const z4 = Math.max(0, Math.min((p - 0.62) * 3.2, 1));
    if (z4 > 0) {
      // Output projection funnel
      els.push(
        <g key="out-funnel" opacity={z4}>
          <path d={`M ${cx - 55} 295 L ${cx - 130} 190 L ${cx + 130} 190 L ${cx + 55} 295 Z`}
            fill={blue} opacity={0.07} stroke={blue} strokeWidth={1.2} />
          <path d={`M ${cx + 55} 295 L ${cx + 130} 190 L ${cx + 150} 200 L ${cx + 75} 300 Z`}
            fill={blue} opacity={0.12} stroke={blue} strokeWidth={0.6} />
          <text x={cx} y={250} textAnchor="middle" fill={cyan} fontSize="10" fontFamily="monospace" fontWeight="bold" opacity={0.7}>
            OUTPUT PROJECTION
          </text>
        </g>
      );

      // Output streams
      const outputs = [
        { label: "DOCUMENTS", icon: "📄", x: cx - 210, y: 115 },
        { label: "AGENTS", icon: "🤖", x: cx - 105, y: 95 },
        { label: "INSIGHTS", icon: "💡", x: cx, y: 80 },
        { label: "WORKFLOWS", icon: "⚡", x: cx + 105, y: 95 },
        { label: "ACTIONS", icon: "🎯", x: cx + 210, y: 115 },
      ];

      outputs.forEach((out, i) => {
        const oOp = Math.min(z4 * 1.5, 1);
        els.push(
          <g key={`out-${i}`} opacity={oOp}>
            <line x1={cx} y1={200} x2={out.x} y2={out.y + 22}
              stroke={blue} strokeWidth={ignited ? 2 : 1} opacity={0.35}
              strokeDasharray={ignited ? "none" : "5 3"} />
            <circle cx={out.x} cy={out.y + 22} r={ignited ? 24 : 20} fill={blue} opacity={ignited ? 0.12 : 0.06}
              stroke={cyan} strokeWidth={0.8} />
            <text x={out.x} y={out.y + 17} textAnchor="middle" fontSize="20">{out.icon}</text>
            <text x={out.x} y={out.y + 40} textAnchor="middle" fill={cyan} fontSize="7" fontFamily="monospace" fontWeight="600" opacity={0.8}>
              {out.label}
            </text>
            {ignited && (
              <circle cx={out.x} cy={out.y + 22} r={2} fill={cyan} opacity={0.6}>
                <animate attributeName="cy" values={`${out.y + 22};${out.y - 10}`} dur={`${1.2 + i * 0.25}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0;0.6" dur={`${1.2 + i * 0.25}s`} repeatCount="indefinite" />
              </circle>
            )}
          </g>
        );
      });

      // AI badge
      if (z4 > 0.4) {
        els.push(
          <g key="ai-badge" opacity={z4}>
            <circle cx={cx} cy={48} r={32} fill={blue} opacity={ignited ? 0.15 : 0.08} stroke={cyan} strokeWidth={1.2} />
            <text x={cx} y={56} textAnchor="middle" fill="#fff" fontSize="24" fontFamily="monospace" fontWeight="bold" opacity={0.9}>
              AI
            </text>
            {ignited && (
              <circle cx={cx} cy={48} r={38} fill="none" stroke={cyan} strokeWidth={0.6} opacity={0.3}>
                <animate attributeName="r" values="32;42;32" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0.08;0.3" dur="2.5s" repeatCount="indefinite" />
              </circle>
            )}
          </g>
        );
      }
    }

    // ========== FLOW ARROWS ==========
    const aOp = Math.min(p * 2.5, 0.5);
    if (p > 0.08) {
      els.push(
        <g key="fa1" opacity={aOp}>
          <line x1={cx} y1={695} x2={cx} y2={637} stroke={cyan} strokeWidth={1.2} strokeDasharray="6 3">
            <animate attributeName="strokeDashoffset" values="0;-18" dur="0.8s" repeatCount="indefinite" />
          </line>
          <polygon points={`${cx},635 ${cx - 5},647 ${cx + 5},647`} fill={cyan} opacity={0.6} />
        </g>
      );
    }
    if (p > 0.55) {
      els.push(
        <g key="fa2" opacity={aOp}>
          <line x1={cx} y1={300} x2={cx} y2={296} stroke={cyan} strokeWidth={1.2} strokeDasharray="6 3">
            <animate attributeName="strokeDashoffset" values="0;-18" dur="0.8s" repeatCount="indefinite" />
          </line>
          <polygon points={`${cx},293 ${cx - 5},305 ${cx + 5},305`} fill={cyan} opacity={0.6} />
        </g>
      );
    }

    // ========== IGNITED ENERGY STREAMS ==========
    if (ignited) {
      for (let i = 0; i < 6; i++) {
        const px = cx - 60 + (i % 4) * 40;
        els.push(
          <circle key={`en-${i}`} cx={px} cy={700} r={2.5} fill={cyan} opacity={0.45}>
            <animate attributeName="cy" values="700;80" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0.1;0.5" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
          </circle>
        );
      }
    }

    // Title block
    els.push(
      <g key="tblock" opacity={p > 0 ? 0.3 : 0.1}>
        <rect x={700} y={795} width={280} height={38} fill="none" stroke={dimBlue} strokeWidth={0.8} />
        <line x1={820} y1={795} x2={820} y2={833} stroke={dimBlue} strokeWidth={0.5} />
        <text x={715} y={811} fill="#5a8ab5" fontSize="7" fontFamily="monospace">PROJECT</text>
        <text x={715} y={825} fill="#8cb4d8" fontSize="9" fontFamily="monospace" fontWeight="600">D360 AI PIPELINE</text>
        <text x={835} y={811} fill="#5a8ab5" fontSize="7" fontFamily="monospace">STATUS</text>
        <text x={835} y={825} fill="#8cb4d8" fontSize="9" fontFamily="monospace" fontWeight="600">
          {ignited ? "● ONLINE" : `BUILD ${Math.round(p * 100)}%`}
        </text>
      </g>
    );

    return els;
  }, [p, ignited]);

  return (
    <svg viewBox="50 20 900 810" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="core-glow" cx="50%" cy="55%" r="45%">
          <stop offset="0%" stopColor="#1a65c7" stopOpacity={ignited ? 0.15 : 0.05} />
          <stop offset="70%" stopColor="#0a1628" stopOpacity={0} />
        </radialGradient>
      </defs>

      {/* Deep dark background */}
      <rect width="1000" height="840" fill="#0a1628" />
      
      {/* Core glow */}
      <ellipse cx={500} cy={460} rx={380} ry={320} fill="url(#core-glow)" />

      {elements}

      {ignited && (
        <text x={500} y={838} textAnchor="middle" fill="#5a8ab5" fontSize="8" fontFamily="monospace" letterSpacing="3" opacity={0.4}>
          D360 MULTIMODAL INTELLIGENCE ENGINE
        </text>
      )}
    </svg>
  );
};

export default ArchitectureSVG;

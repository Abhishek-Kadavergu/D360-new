import { useMemo } from "react";

interface ArchitectureSVGProps {
  progress: number;
  ignited: boolean;
  /** When true, scale to fit entire diagram in container (meet); when false, fill and crop (slice). */
  fitContain?: boolean;
}

const ArchitectureSVG = ({
  progress,
  ignited,
  fitContain = false,
}: ArchitectureSVGProps) => {
  const p = Math.min(progress, 1);

  const elements = useMemo(() => {
    const els: JSX.Element[] = [];
    const cx = 500;
    const blue = "#1E90FF"; // Vibrant strong blue
    const cyan = "#0ea5e9"; // Darker vivid cyan
    const amber = "#fbbf24";
    const dimBlue = "#64748b"; // slate
    const gridColor = "#cbd5e1"; // light slate
    const textMain = "#0B2039"; // VERY dark navy for max readability
    const textSub = "#122A4A"; // dark slack blue for sub-labels
    const shapeStroke = "#1D4ED8"; // Darker, bold blue for structural shapes
    const shapeFill = "#3B82F6"; // Slightly richer fill blue

    // ========== PERSPECTIVE GRID ==========
    const gridOp = Math.min(p * 2.5, 0.45);
    for (let i = -14; i <= 14; i++) {
      els.push(
        <line
          key={`gv-${i}`}
          x1={cx + i * 55}
          y1={830}
          x2={cx + i * 12}
          y2={180}
          stroke={gridColor}
          strokeWidth={1}
          opacity={gridOp * 0.8}
        />,
      );
    }
    for (let i = 0; i < 16; i++) {
      const y = 830 - i * 42;
      const s = 1 - i * 0.035;
      els.push(
        <line
          key={`gh-${i}`}
          x1={cx - 420 * s}
          y1={y}
          x2={cx + 420 * s}
          y2={y}
          stroke={gridColor}
          strokeWidth={0.8}
          opacity={gridOp * 0.7 * (1 - i * 0.05)}
        />,
      );
    }

    // ========== ZONE 1: DATA INPUT (bottom) ==========
    const z1 = Math.min(p * 3, 1);
    if (z1 > 0) {
      // Glowing input hopper - intensified borders and shapes
      els.push(
        <g key="hopper" opacity={z1}>
          <path
            d="M 250 785 L 170 725 L 170 695 L 250 730 Z"
            fill={shapeFill}
            opacity={0.25}
            stroke={shapeStroke}
            strokeWidth={2}
          />
          <path
            d="M 250 785 L 750 785 L 830 725 L 170 725 Z"
            fill={shapeFill}
            opacity={0.15}
            stroke={shapeStroke}
            strokeWidth={1.5}
          />
          <path
            d="M 750 785 L 830 725 L 830 695 L 750 730 Z"
            fill={shapeFill}
            opacity={0.3}
            stroke={shapeStroke}
            strokeWidth={2}
          />
          <path
            d="M 250 730 L 750 730 L 830 695 L 170 695 Z"
            fill={shapeFill}
            opacity={0.12}
            stroke={shapeStroke}
            strokeWidth={1.5}
          />
          <text
            x={cx}
            y={762}
            textAnchor="middle"
            fill={textMain}
            fontSize="17"
            fontFamily="monospace"
            fontWeight="900"
            opacity={0.95}
          >
            ◆ RAW DATA INPUT ◆
          </text>
        </g>,
      );

      // Data type icons
      const types = [
        { icon: "📄", label: "DOC", x: 140 },
        { icon: "🎤", label: "VOICE", x: 230 },
        { icon: "🖼️", label: "IMG", x: 320 },
        { icon: "📊", label: "DATA", x: 680 },
        { icon: "💬", label: "TEXT", x: 770 },
        { icon: "🌐", label: "API", x: 860 },
      ];
      types.forEach((d, i) => {
        const bob = Math.sin(p * 8 + i * 1.5) * 4;
        els.push(
          <g key={`dt-${i}`} opacity={z1 * 0.9}>
            <text x={d.x} y={770 + bob} textAnchor="middle" fontSize="24">
              {d.icon}
            </text>
            <text
              x={d.x}
              y={794}
              textAnchor="middle"
              fill={textMain}
              fontSize="13"
              fontFamily="monospace"
              fontWeight="800"
              opacity={0.95}
            >
              {d.label}
            </text>
          </g>,
        );
      });

      // Flowing particles into hopper
      for (let i = 0; i < 25; i++) {
        const angle = (i / 25) * Math.PI;
        const fromX = cx + Math.cos(angle) * 400;
        const t = (p * 4 + i * 0.13) % 1;
        const px = fromX + (cx - fromX) * t;
        const py = 800 + (700 - 800) * t;
        els.push(
          <circle
            key={`dp-${i}`}
            cx={px}
            cy={py}
            r={2 + Math.random()}
            fill={shapeStroke}
            opacity={z1 * 0.65 * (1 - t)}
          >
            <animate
              attributeName="opacity"
              values="0.8;0.3;0.8"
              dur={`${0.6 + i * 0.08}s`}
              repeatCount="indefinite"
            />
          </circle>,
        );
      }

      // Convergence arrow
      els.push(
        <g key="in-arrow" opacity={z1 * 0.8}>
          <polygon
            points={`${cx},678 ${cx - 8},698 ${cx + 8},698`}
            fill={shapeStroke}
            opacity={0.85}
          />
        </g>,
      );
    }

    // ========== TOKENIZER CONDUIT ==========
    const z2 = Math.max(0, Math.min((p - 0.12) * 3.5, 1));
    if (z2 > 0) {
      els.push(
        <g key="conduit" opacity={z2}>
          <rect
            x={cx - 70}
            y={635}
            width={140}
            height={50}
            rx={6}
            fill={shapeFill}
            opacity={0.25}
            stroke={shapeStroke}
            strokeWidth={2.5}
          />
          <path
            d={`M ${cx - 70} 635 L ${cx - 58} 623 L ${cx + 82} 623 L ${cx + 70} 635 Z`}
            fill={shapeFill}
            opacity={0.3}
            stroke={shapeStroke}
            strokeWidth={2}
          />
          <path
            d={`M ${cx + 70} 635 L ${cx + 82} 623 L ${cx + 82} 673 L ${cx + 70} 685 Z`}
            fill={shapeFill}
            opacity={0.35}
            stroke={shapeStroke}
            strokeWidth={2}
          />
          {Array.from({ length: 8 }).map((_, i) => {
            const bx = cx - 58 + ((p * 250 + i * 18) % 116);
            return (
              <rect
                key={`cd-${i}`}
                x={bx}
                y={645}
                width={3}
                height={30}
                rx={1}
                fill={shapeStroke}
                opacity={z2 * 0.8}
              >
                <animate
                  attributeName="opacity"
                  values="0.9;0.3;0.9"
                  dur={`${0.4 + i * 0.08}s`}
                  repeatCount="indefinite"
                />
              </rect>
            );
          })}
          <text
            x={cx}
            y={665}
            textAnchor="middle"
            fill={textMain}
            fontSize="14"
            fontFamily="monospace"
            fontWeight="900"
            opacity={0.95}
          >
            TOKENIZER + EMBED
          </text>
        </g>,
      );
    }

    // ========== ZONE 2: TRANSFORMER CORE ==========
    const z3 = Math.max(0, Math.min((p - 0.22) * 2.2, 1));
    if (z3 > 0) {
      const bL = cx - 170,
        bR = cx + 170,
        bT = 300,
        bB = 620,
        dep = 45;
      els.push(
        <g key="tbox" opacity={z3 * 0.95}>
          <rect
            x={bL}
            y={bT}
            width={bR - bL}
            height={bB - bT}
            rx={4}
            fill={shapeFill}
            opacity={0.15}
            stroke={shapeStroke}
            strokeWidth={3}
          />
          <path
            d={`M ${bL} ${bT} L ${bL + dep} ${bT - dep} L ${bR + dep} ${bT - dep} L ${bR} ${bT} Z`}
            fill={shapeFill}
            opacity={0.25}
            stroke={shapeStroke}
            strokeWidth={2}
          />
          <path
            d={`M ${bR} ${bT} L ${bR + dep} ${bT - dep} L ${bR + dep} ${bB - dep} L ${bR} ${bB} Z`}
            fill={shapeFill}
            opacity={0.3}
            stroke={shapeStroke}
            strokeWidth={2}
          />
          <text
            x={cx + 22}
            y={bT - dep / 2 + 6}
            textAnchor="middle"
            fill={textMain}
            fontSize="21"
            fontFamily="monospace"
            fontWeight="900"
            opacity={0.95}
            transform={`rotate(-2, ${cx + 22}, ${bT - dep / 2 + 6})`}
          >
            🧠 TRANSFORMER ENGINE
          </text>
        </g>,
      );

      // Transformer layers
      const layers = [
        { label: "MULTI-HEAD ATTENTION", y: 340, n: 8, c: blue },
        { label: "LAYER NORM + RESIDUAL", y: 395, n: 6, c: "#1d4ed8" }, // darker blues for contrast
        { label: "SELF-ATTENTION ×12", y: 450, n: 12, c: blue },
        { label: "CROSS-ATTENTION", y: 505, n: 10, c: cyan },
        { label: "FEED-FORWARD NET", y: 560, n: 8, c: "#2563eb" },
      ];

      const built = Math.floor(z3 * layers.length);
      const partial = (z3 * layers.length) % 1;

      layers.forEach((layer, i) => {
        const lop = i < built ? 1 : i === built ? partial : 0;
        if (lop <= 0) return;

        const w = 270,
          startX = cx - w / 2,
          spacing = w / (layer.n - 1);

        // Connections
        if (i > 0 && i <= built) {
          const prev = layers[i - 1];
          const pw = 270,
            ps = cx - pw / 2,
            psp = pw / (prev.n - 1);
          for (let j = 0; j < Math.min(layer.n, 5); j++) {
            const nj = Math.floor((j * layer.n) / 5);
            const pj = Math.floor((j * prev.n) / 5);
            els.push(
              <line
                key={`tc-${i}-${j}`}
                x1={ps + pj * psp}
                y1={prev.y}
                x2={startX + nj * spacing}
                y2={layer.y}
                stroke={layer.c}
                strokeWidth={ignited ? 2 : 1.2}
                opacity={lop * (ignited ? 0.6 : 0.35)}
              />,
            );
          }
        }

        // Nodes
        for (let j = 0; j < layer.n; j++) {
          const nx = startX + j * spacing;
          els.push(
            <g key={`tn-${i}-${j}`} opacity={lop}>
              {ignited && (
                <circle
                  cx={nx}
                  cy={layer.y}
                  r={12}
                  fill={layer.c}
                  opacity={0.25}
                >
                  <animate
                    attributeName="r"
                    values="8;14;8"
                    dur={`${1.8 + j * 0.15}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              )}
              <circle
                cx={nx}
                cy={layer.y}
                r={4.5}
                fill={layer.c}
                opacity={ignited ? 0.9 : 0.6}
              />
              <circle
                cx={nx}
                cy={layer.y}
                r={1.8}
                fill="#fff"
                opacity={ignited ? 1 : 0.6}
              />
            </g>,
          );
        }

        // Label + bracket
        els.push(
          <g key={`tl-${i}`} opacity={lop * 1}>
            <line
              x1={bR + 8}
              y1={layer.y - 8}
              x2={bR + 8}
              y2={layer.y + 8}
              stroke={dimBlue}
              strokeWidth={1.5}
            />
            <line
              x1={bR + 8}
              y1={layer.y}
              x2={bR + 48}
              y2={layer.y}
              stroke={dimBlue}
              strokeWidth={1.5}
            />
            <text
              x={bR + 56}
              y={layer.y + 4}
              fill={textSub}
              fontSize="14"
              fontWeight="800"
              fontFamily="monospace"
            >
              {layer.label}
            </text>
          </g>,
        );
      });

      // Data particles rising through transformer
      if (z3 > 0.25) {
        for (let i = 0; i < 15; i++) {
          const px = cx - 110 + (i % 6) * 44 + Math.sin(p * 6 + i) * 12;
          els.push(
            <circle
              key={`tf-${i}`}
              cx={px}
              cy={550}
              r={2.5}
              fill={shapeStroke}
              opacity={z3 * 0.8}
            >
              <animate
                attributeName="cy"
                values="590;310"
                dur={`${2.5 + i * 0.25}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.8;0.2;0.8"
                dur={`${2.5 + i * 0.25}s`}
                repeatCount="indefinite"
              />
            </circle>,
          );
        }
      }

      // Gears
      if (z3 > 0.15) {
        const gearPath = (
          gcx: number,
          gcy: number,
          r: number,
          teeth: number,
        ) => {
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
          <g
            key="gear-l"
            opacity={z3 * 0.6}
            style={{
              transform: `rotate(${rot}deg)`,
              transformOrigin: `${bL - 40}px 460px`,
              transition: "transform 1s linear",
            }}
          >
            <path
              d={gearPath(bL - 40, 460, 28, 10)}
              fill="none"
              stroke={shapeStroke}
              strokeWidth={2.5}
            />
            <circle
              cx={bL - 40}
              cy={460}
              r={7}
              fill="none"
              stroke={shapeStroke}
              strokeWidth={2}
            />
          </g>,
        );
        // Right gear
        // els.push(
        //   <g
        //     key="gear-r"
        //     opacity={z3 * 0.6}
        //     style={{
        //       transform: `rotate(${-rot}deg)`,
        //       transformOrigin: `${bR + 80}px 490px`,
        //       transition: "transform 1s linear",
        //     }}
        //   >
        //     <path
        //       d={gearPath(bR + 80, 490, 24, 9)}
        //       fill="none"
        //       stroke={shapeStroke}
        //       strokeWidth={2.5}
        //     />
        //     <circle
        //       cx={bR + 80}
        //       cy={490}
        //       r={6}
        //       fill="none"
        //       stroke={shapeStroke}
        //       strokeWidth={2}
        //     />
        //   </g>,
        // );
      }

      // Build spark
      if (built < layers.length && partial > 0.15) {
        const active = layers[built];
        if (active) {
          els.push(
            <g key="spark" opacity={0.9}>
              <circle cx={cx} cy={active.y} r={6} fill={amber}>
                <animate
                  attributeName="opacity"
                  values="1;0.6;1"
                  dur="0.25s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={cx} cy={active.y} r={22} fill={amber} opacity={0.35}>
                <animate
                  attributeName="r"
                  values="12;26;12"
                  dur="0.5s"
                  repeatCount="indefinite"
                />
              </circle>
              {[0, 72, 144, 216, 288].map((a) => {
                const rad = (a * Math.PI) / 180;
                return (
                  <line
                    key={`sp-${a}`}
                    x1={cx + Math.cos(rad) * 6}
                    y1={active.y + Math.sin(rad) * 6}
                    x2={cx + Math.cos(rad) * 16}
                    y2={active.y + Math.sin(rad) * 16}
                    stroke={amber}
                    strokeWidth={2}
                    opacity={0.8}
                  >
                    <animate
                      attributeName="opacity"
                      values="0.9;0;0.9"
                      dur="0.2s"
                      begin={`${a * 0.005}s`}
                      repeatCount="indefinite"
                    />
                  </line>
                );
              })}
            </g>,
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
          <path
            d={`M ${cx - 55} 295 L ${cx - 130} 190 L ${cx + 130} 190 L ${cx + 55} 295 Z`}
            fill={shapeFill}
            opacity={0.2}
            stroke={shapeStroke}
            strokeWidth={2.5}
          />
          <path
            d={`M ${cx + 55} 295 L ${cx + 130} 190 L ${cx + 150} 200 L ${cx + 75} 300 Z`}
            fill={shapeFill}
            opacity={0.3}
            stroke={shapeStroke}
            strokeWidth={2}
          />
          <text
            x={cx}
            y={250}
            textAnchor="middle"
            fill={textMain}
            fontSize="17"
            fontFamily="monospace"
            fontWeight="900"
            opacity={0.95}
          >
            OUTPUT PROJECTION
          </text>
        </g>,
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
            <line
              x1={cx}
              y1={200}
              x2={out.x}
              y2={out.y + 22}
              stroke={shapeStroke}
              strokeWidth={ignited ? 3 : 2}
              opacity={0.6}
              strokeDasharray={ignited ? "none" : "5 3"}
            />
            <circle
              cx={out.x}
              cy={out.y + 22}
              r={ignited ? 26 : 22}
              fill="none"
              stroke={shapeStroke}
              strokeWidth={1.5}
              opacity={ignited ? 0.7 : 0.5}
            />
            <circle
              cx={out.x}
              cy={out.y + 22}
              r={ignited ? 28 : 24}
              fill="none"
              stroke={shapeStroke}
              strokeWidth={3}
              opacity={ignited ? 0.25 : 0.12}
            />
            <text
              x={out.x}
              y={out.y + 17}
              textAnchor="middle"
              fontSize="24"
              opacity={0.95}
            >
              {out.icon}
            </text>
            <text
              x={out.x}
              y={out.y + 44}
              textAnchor="middle"
              fill={textMain}
              fontSize="13"
              fontFamily="monospace"
              fontWeight="800"
              opacity={0.95}
            >
              {out.label}
            </text>
            {ignited && (
              <circle
                cx={out.x}
                cy={out.y + 22}
                r={4}
                fill={shapeStroke}
                opacity={0.8}
              >
                <animate
                  attributeName="cy"
                  values={`${out.y + 22};${out.y - 10}`}
                  dur={`${1.2 + i * 0.25}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.8;0;0.8"
                  dur={`${1.2 + i * 0.25}s`}
                  repeatCount="indefinite"
                />
              </circle>
            )}
          </g>,
        );
      });

      // AI badge
      if (z4 > 0.4) {
        els.push(
          <g key="ai-badge" opacity={z4}>
            <circle
              cx={cx}
              cy={48}
              r={36}
              fill={shapeFill}
              opacity={ignited ? 0.35 : 0.2}
              stroke={shapeStroke}
              strokeWidth={3}
            />
            <text
              x={cx}
              y={58}
              textAnchor="middle"
              fill={textMain}
              fontSize="32"
              fontFamily="monospace"
              fontWeight="900"
              opacity={0.95}
            >
              AI
            </text>
            {ignited && (
              <circle
                cx={cx}
                cy={48}
                r={42}
                fill="none"
                stroke={shapeStroke}
                strokeWidth={2}
                opacity={0.6}
              >
                <animate
                  attributeName="r"
                  values="36;46;36"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.6;0.2;0.6"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </circle>
            )}
          </g>,
        );
      }
    }

    // ========== FLOW ARROWS ==========
    const aOp = Math.min(p * 2.5, 0.7);
    if (p > 0.08) {
      els.push(
        <g key="fa1" opacity={aOp}>
          <line
            x1={cx}
            y1={695}
            x2={cx}
            y2={637}
            stroke={shapeStroke}
            strokeWidth={2.5}
            strokeDasharray="6 3"
          >
            <animate
              attributeName="strokeDashoffset"
              values="0;-18"
              dur="0.8s"
              repeatCount="indefinite"
            />
          </line>
          <polygon
            points={`${cx},635 ${cx - 6},649 ${cx + 6},649`}
            fill={shapeStroke}
            opacity={0.9}
          />
        </g>,
      );
    }
    if (p > 0.55) {
      els.push(
        <g key="fa2" opacity={aOp}>
          <line
            x1={cx}
            y1={300}
            x2={cx}
            y2={296}
            stroke={shapeStroke}
            strokeWidth={2.5}
            strokeDasharray="6 3"
          >
            <animate
              attributeName="strokeDashoffset"
              values="0;-18"
              dur="0.8s"
              repeatCount="indefinite"
            />
          </line>
          <polygon
            points={`${cx},293 ${cx - 6},307 ${cx + 6},307`}
            fill={shapeStroke}
            opacity={0.9}
          />
        </g>,
      );
    }

    // ========== IGNITED ENERGY STREAMS ==========
    if (ignited) {
      for (let i = 0; i < 6; i++) {
        const px = cx - 60 + (i % 4) * 40;
        els.push(
          <circle
            key={`en-${i}`}
            cx={px}
            cy={700}
            r={3}
            fill={shapeStroke}
            opacity={0.75}
          >
            <animate
              attributeName="cy"
              values="700;80"
              dur={`${3 + i * 0.5}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.75;0.1;0.75"
              dur={`${3 + i * 0.5}s`}
              repeatCount="indefinite"
            />
          </circle>,
        );
      }
    }

    // Title block
    els
      .push
      // <g key="tblock" opacity={p > 0 ? 0.8 : 0.4}>
      //   <rect x={700} y={795} width={280} height={38} fill="none" stroke={dimBlue} strokeWidth={1} />
      //   <line x1={820} y1={795} x2={820} y2={833} stroke={dimBlue} strokeWidth={1} />
      //   <text x={715} y={811} fill={textSub} fontSize="13" fontFamily="monospace" fontWeight="800">PROJECT</text>
      //   <text x={715} y={825} fill={textMain} fontSize="16" fontFamily="monospace" fontWeight="900">D360 AI PIPELINE</text>
      //   <text x={835} y={811} fill={textSub} fontSize="13" fontFamily="monospace" fontWeight="800">STATUS</text>
      //   <text x={835} y={825} fill={textMain} fontSize="16" fontFamily="monospace" fontWeight="900">
      //     {ignited ? "● ONLINE" : `BUILD ${Math.round(p * 100)}%`}
      //   </text>
      // </g>
      ();

    return els;
  }, [p, ignited]);

  return (
    <svg
      viewBox="50 20 900 810"
      className="w-full h-full"
      preserveAspectRatio={fitContain ? "xMidYMid meet" : "xMidYMid slice"}
    >
      <defs>
        <radialGradient id="core-glow" cx="50%" cy="55%" r="45%">
          <stop
            offset="0%"
            stopColor="#87cefa"
            stopOpacity={ignited ? 0.45 : 0.15}
          />
          <stop offset="70%" stopColor="#ffffff" stopOpacity={0} />
        </radialGradient>
      </defs>

      {/* No solid background — diagram floats on page; no outer box shade */}

      {/* Core glow */}
      <ellipse cx={500} cy={460} rx={380} ry={320} fill="url(#core-glow)" />

      {elements}

      {ignited && (
        <text
          x={500}
          y={838}
          textAnchor="middle"
          fill="#0B2039"
          fontSize="14"
          fontFamily="monospace"
          fontWeight="800"
          letterSpacing="3"
          opacity={0.9}
        >
          D360 MULTIMODAL INTELLIGENCE ENGINE
        </text>
      )}
    </svg>
  );
};

export default ArchitectureSVG;

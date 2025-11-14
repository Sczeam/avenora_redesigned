// components/services/design-service-section.tsx (only SVG part changed)

type DesignMockCardSvgProps = {
  svgRef: React.RefObject<SVGSVGElement | null>;
};

export default function DesignMockCardSvg({ svgRef }: DesignMockCardSvgProps) {
  return (
    <svg
      ref={svgRef}
      className="w-full h-auto"
      viewBox="0 0 960 420"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer card */}
      <rect
        id="card-border"
        className="sv-card-border"
        x="16"
        y="16"
        width="928"
        height="388"
        rx="4"
        fill="none"
        stroke="#E8E0D8"
        strokeWidth="2"
      />

      {/* Left big placeholder (image) */}
      {/* Bottom now aligned exactly with the separator line at y = 310 */}
      <rect
        id="card-main"
        className="sv-card-main"
        x="64"
        y="64"
        width="470"
        height="236" // 64 + 236 = 300
        rx="2"
        fill="#FFF5EE"
        stroke="#E8E0D8"
        strokeWidth="2"
      />

      {/* Right big pill */}
      <rect
        id="card-pill"
        className="sv-card-pill"
        x="570"
        y="70"
        width="330"
        height="60"
        rx="30"
        fill="#D9D3CC"
      />

      {/* Right text lines */}
      <rect
        id="card-line-1"
        className="sv-card-line"
        x="580"
        y="150"
        width="320"
        height="14"
        rx="7"
        fill="#E0D9D1"
      />
      <rect
        id="card-line-2"
        className="sv-card-line"
        x="580"
        y="176"
        width="295"
        height="14"
        rx="7"
        fill="#E0D9D1"
      />
      <rect
        id="card-line-3"
        className="sv-card-line"
        x="580"
        y="202"
        width="270"
        height="14"
        rx="7"
        fill="#E0D9D1"
      />
      <rect
        id="card-line-4"
        className="sv-card-line"
        x="580"
        y="228"
        width="245"
        height="14"
        rx="7"
        fill="#E0D9D1"
      />
      <rect
        id="card-line-5"
        className="sv-card-line"
        x="580"
        y="254"
        width="220"
        height="14"
        rx="7"
        fill="#E0D9D1"
      />

      {/* Palette separation line (only top edge, no box) */}
      <line
        id="card-palette-separator"
        x1="16"
        y1="310"
        x2="944"
        y2="310"
        stroke="#E8E0D8"
        strokeWidth="1"
      />

      {/* Color swatches (stay in the lower area) */}
      {[
        "#312B27",
        "#3A332F",
        "#433B35",
        "#4C433C",
        "#554C43",
        "#5F564D",
        "#978D81",
        "#D9D3CC",
        "#F5F3F0",
      ].map((color, i) => (
        <rect
          key={color}
          id={`card-swatch-${i}`}
          className="sv-card-swatch"
          x={64 + i * 96}
          y="326"
          width="80"
          height="62"
          fill={color}
          stroke={color === "#F5F3F0" ? "#E8E0D8" : "none"}
        />
      ))}
    </svg>
  );
}

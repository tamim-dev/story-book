import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type WheelEvent,
  type PointerEvent,
} from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "neutral",
  fontFamily: "inherit",
});

let counter = 0;

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.15;

const btnStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 32,
  height: 32,
  border: "1px solid #d1d5db",
  borderRadius: 6,
  background: "#fff",
  cursor: "pointer",
  fontSize: 16,
  fontWeight: 600,
  color: "#374151",
  lineHeight: 1,
  userSelect: "none",
};

export function Mermaid({ chart }: { chart: string }) {
  const svgRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const dragOrigin = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const id = `mermaid-${counter++}`;
    mermaid.render(id, chart.trim()).then(({ svg }) => {
      el.innerHTML = svg;
      const svgEl = el.querySelector("svg");
      if (svgEl) {
        svgEl.style.maxWidth = "none";
        svgEl.style.width = "100%";
        svgEl.style.height = "auto";
      }
    });
  }, [chart]);

  const clampScale = (v: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, v));

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    setScale((s) => clampScale(s - Math.sign(e.deltaY) * ZOOM_STEP));
  }, []);

  const handlePointerDown = useCallback(
    (e: PointerEvent) => {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      dragOrigin.current = { x: e.clientX, y: e.clientY, tx: translate.x, ty: translate.y };
    },
    [translate],
  );

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!dragOrigin.current) return;
    setTranslate({
      x: dragOrigin.current.tx + (e.clientX - dragOrigin.current.x),
      y: dragOrigin.current.ty + (e.clientY - dragOrigin.current.y),
    });
  }, []);

  const handlePointerUp = useCallback(() => {
    dragOrigin.current = null;
  }, []);

  const zoomIn = () => setScale((s) => clampScale(s + ZOOM_STEP));
  const zoomOut = () => setScale((s) => clampScale(s - ZOOM_STEP));
  const resetView = () => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 10,
          display: "flex",
          gap: 4,
          alignItems: "center",
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(4px)",
          borderRadius: 8,
          padding: 4,
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <button onClick={zoomOut} style={btnStyle} title="Zoom out">
          −
        </button>
        <span
          style={{
            fontSize: 12,
            fontVariantNumeric: "tabular-nums",
            width: 42,
            textAlign: "center",
            color: "#6b7280",
          }}
        >
          {Math.round(scale * 100)}%
        </span>
        <button onClick={zoomIn} style={btnStyle} title="Zoom in">
          +
        </button>
        <button onClick={resetView} style={{ ...btnStyle, fontSize: 12, width: "auto", padding: "0 8px" }} title="Reset zoom and position">
          Reset
        </button>
      </div>

      <div
        ref={viewportRef}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          overflow: "hidden",
          border: "1px solid #e5e7eb",
          borderRadius: 8,
          cursor: dragOrigin.current ? "grabbing" : "grab",
          touchAction: "none",
          minHeight: 400,
        }}
      >
        <div
          ref={svgRef}
          style={{
            transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
            transformOrigin: "center top",
            transition: dragOrigin.current ? "none" : "transform 0.15s ease",
            padding: 24,
          }}
        />
      </div>
    </div>
  );
}

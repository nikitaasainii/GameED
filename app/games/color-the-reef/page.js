"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";

// ─── COLOURING PAGES ─────────────────────────────────────────────────────────
// Add your downloaded colouring pages to public/images/coloring/
// Name them: page1.png, page2.png, page3.png, page4.png
const PAGES = [
  { id: 1, src: "/images/page1.png", title: "Ocean Friends"   },
  { id: 2, src: "/images/page2.png", title: "Jungle Animals"  },
  { id: 3, src: "/images/page3.png", title: "Garden Flowers"  },
  { id: 4, src: "/images/page4.png", title: "Farm Friends"    },
];

// ─── COLOUR PALETTE ───────────────────────────────────────────────────────────
const PALETTE = [
  "#ff6b4a", "#ff8c6b", "#ffd93d", "#ffb347",
  "#f4a460", "#f4a0b4", "#ff6b9d", "#e84040",
  "#c03020", "#6040a0", "#b8a0b8", "#4a90ff",
  "#00c9b1", "#208040", "#c96bff", "#8b4513",
  "#ffffff", "#e8e8e8", "#a0a0a0", "#1a1a2e",
];

const TOLERANCE = 20; // flood fill colour tolerance

// ─── FLOOD FILL ALGORITHM ────────────────────────────────────────────────────
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function colourMatch(data, idx, target, tolerance) {
  return (
    Math.abs(data[idx]     - target[0]) <= tolerance &&
    Math.abs(data[idx + 1] - target[1]) <= tolerance &&
    Math.abs(data[idx + 2] - target[2]) <= tolerance
  );
}

function floodFill(imageData, startX, startY, fillColour, tolerance) {
  const { data, width, height } = imageData;
  const [fr, fg, fb] = hexToRgb(fillColour);

  const startIdx = (startY * width + startX) * 4;
  const targetR  = data[startIdx];
  const targetG  = data[startIdx + 1];
  const targetB  = data[startIdx + 2];

  // Don't fill black outlines
  if (targetR < 80 && targetG < 80 && targetB < 80) return imageData;

  // Don't fill if already that colour
  if (
    Math.abs(targetR - fr) <= 2 &&
    Math.abs(targetG - fg) <= 2 &&
    Math.abs(targetB - fb) <= 2
  ) return imageData;

  const stack   = [[startX, startY]];
  const visited = new Uint8Array(width * height);

  while (stack.length > 0) {
    const [x, y] = stack.pop();
    if (x < 0 || x >= width || y < 0 || y >= height) continue;

    const idx = (y * width + x) * 4;
    if (visited[y * width + x]) continue;
    if (!colourMatch(data, idx, [targetR, targetG, targetB], tolerance)) continue;

    visited[y * width + x] = 1;

    data[idx]     = fr;
    data[idx + 1] = fg;
    data[idx + 2] = fb;
    data[idx + 3] = 255;

    stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
  }

  return imageData;
}

// ─── DONNA ────────────────────────────────────────────────────────────────────
function Donna({ state }) {
  const happy = state === "happy" || state === "celebrate";
  return (
    <svg
      width="100%" height="100%"
      viewBox="0 0 220 220"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="dG5" cx="42%" cy="38%" r="62%">
          <stop offset="0%"   stopColor="#fde87a"/>
          <stop offset="35%"  stopColor="#f9c13a"/>
          <stop offset="70%"  stopColor="#f0920e"/>
          <stop offset="100%" stopColor="#d4720a"/>
        </radialGradient>
        <radialGradient id="bG5" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#f07040" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#f07040" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <path d="M110 12 C116 30 120 48 126 60 C140 56 158 50 174 60 C180 66 170 80 160 90 C168 100 178 114 172 128 C166 140 150 134 138 128 C134 144 128 164 118 172 C108 178 102 160 110 146 C98 160 92 178 82 172 C72 166 66 146 62 128 C50 134 34 140 28 128 C22 114 32 100 40 90 C30 80 20 66 26 60 C42 50 60 56 74 60 C80 48 104 30 110 12Z"
        fill="#c86808" opacity="0.12" transform="translate(3,5)"/>
      <path d="M110 12 C116 30 120 48 126 60 C140 56 158 50 174 60 C180 66 170 80 160 90 C168 100 178 114 172 128 C166 140 150 134 138 128 C134 144 128 164 118 172 C108 178 102 160 110 146 C98 160 92 178 82 172 C72 166 66 146 62 128 C50 134 34 140 28 128 C22 114 32 100 40 90 C30 80 20 66 26 60 C42 50 60 56 74 60 C80 48 104 30 110 12Z"
        fill="url(#dG5)" stroke="#c86808" strokeWidth="2.5"/>
      <ellipse cx="106" cy="88" rx="32" ry="28" fill="#fef0a0" opacity="0.2"/>
      <ellipse cx="110" cy="34" rx="4"   ry="11" fill="white" opacity="0.28"/>
      <ellipse cx="110" cy="34" rx="3.5" ry="9"  fill="white" opacity="0.22" transform="rotate(72 110 110)"/>
      <ellipse cx="110" cy="34" rx="3.5" ry="9"  fill="white" opacity="0.22" transform="rotate(144 110 110)"/>
      <ellipse cx="110" cy="34" rx="3.5" ry="9"  fill="white" opacity="0.22" transform="rotate(216 110 110)"/>
      <ellipse cx="110" cy="34" rx="4"   ry="10" fill="white" opacity="0.25" transform="rotate(288 110 110)"/>
      <ellipse cx="88"  cy="112" rx="12" ry="8" fill="url(#bG5)"/>
      <ellipse cx="132" cy="112" rx="12" ry="8" fill="url(#bG5)"/>
      {happy ? (
        <>
          <path d="M91 92 Q99 84 107 92"  stroke="#3a2010" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
          <path d="M113 92 Q121 84 129 92" stroke="#3a2010" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
          <path d="M96 108 Q110 124 124 108" stroke="#3a2010" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
        </>
      ) : (
        <>
          <path d="M91 96 Q99 88 107 96"  stroke="#3a2010" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
          <path d="M113 96 Q121 88 129 96" stroke="#3a2010" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
          <path d="M100 110 Q110 120 120 110" stroke="#3a2010" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
        </>
      )}
    </svg>
  );
}

// ─── MAIN GAME ────────────────────────────────────────────────────────────────
export default function ColorSplash() {
  const [phase, setPhase]               = useState("intro");
  const [pageIndex, setPageIndex]       = useState(0);
  const [selectedColor, setSelectedColor] = useState(PALETTE[0]);
  const [donnaState, setDonnaState]     = useState("idle");
  const [donnaMsg, setDonnaMsg]         = useState("Pick a colour and start painting!");
  const [isProcessing, setIsProcessing] = useState(false);
  const [imageLoaded, setImageLoaded]   = useState(false);
  const [score, setScore]               = useState(0);

  const canvasRef   = useRef(null);
  const originalRef = useRef(null); // stores original image data for reset

  const currentPage = PAGES[pageIndex];

  // ─── LOAD IMAGE ONTO CANVAS ─────────────────────────────────────────────────
  const loadImageToCanvas = useCallback((src) => {
    setImageLoaded(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      // Set canvas to image dimensions
      canvas.width  = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);

      // Store original for reset
      originalRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setImageLoaded(true);
    };
    img.onerror = () => {
      // Draw placeholder if image not found
      canvas.width  = 800;
      canvas.height = 600;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 800, 600);
      ctx.strokeStyle = "#cccccc";
      ctx.lineWidth = 2;
      // Draw a simple placeholder scene
      ctx.strokeRect(50, 50, 700, 500);
      ctx.strokeStyle = "#aaaaaa";
      // Sun
      ctx.beginPath(); ctx.arc(650, 100, 60, 0, Math.PI * 2); ctx.stroke();
      // Cloud
      ctx.beginPath(); ctx.arc(200, 120, 40, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(240, 100, 50, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(280, 120, 40, 0, Math.PI * 2); ctx.stroke();
      // Tree trunk
      ctx.strokeRect(360, 350, 40, 120);
      // Tree top
      ctx.beginPath(); ctx.arc(380, 300, 80, 0, Math.PI * 2); ctx.stroke();
      // Grass
      ctx.beginPath(); ctx.moveTo(50, 470); ctx.lineTo(750, 470); ctx.stroke();
      // Flowers
      for (let i = 0; i < 5; i++) {
        ctx.beginPath(); ctx.arc(100 + i * 120, 490, 15, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(100 + i * 120, 510, 10, 0, Math.PI * 2); ctx.stroke();
      }
      ctx.fillStyle = "#999999";
      ctx.font = "bold 24px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`Add: ${src}`, 400, 540);

      originalRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setImageLoaded(true);
    };
    img.src = src;
  }, []);

  useEffect(() => {
    if (phase === "playing") {
      loadImageToCanvas(currentPage.src);
    }
  }, [phase, pageIndex, loadImageToCanvas, currentPage.src]);

  // ─── HANDLE CANVAS CLICK ────────────────────────────────────────────────────
  function handleCanvasClick(e) {
    if (!imageLoaded || isProcessing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect    = canvas.getBoundingClientRect();
    const scaleX  = canvas.width  / rect.width;
    const scaleY  = canvas.height / rect.height;
    const x       = Math.floor((e.clientX - rect.left) * scaleX);
    const y       = Math.floor((e.clientY - rect.top)  * scaleY);

    if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) return;

    setIsProcessing(true);

    // Use setTimeout to allow UI to update before heavy computation
    setTimeout(() => {
      const ctx       = canvas.getContext("2d", { willReadFrequently: true });
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const filled    = floodFill(imageData, x, y, selectedColor, TOLERANCE);
      ctx.putImageData(filled, 0, 0);
      setIsProcessing(false);

      // Donna reacts
      const msgs = [
        "Beautiful!", "Amazing colours!", "So pretty!",
        "You're an artist!", "Love it!", "Keep going!",
      ];
      setDonnaMsg(msgs[Math.floor(Math.random() * msgs.length)]);
      setDonnaState("happy");
      setTimeout(() => {
        setDonnaState("idle");
        setDonnaMsg("Pick a colour and tap to paint!");
      }, 1500);
    }, 10);
  }

  // ─── RESET CANVAS ───────────────────────────────────────────────────────────
  function resetCanvas() {
    const canvas = canvasRef.current;
    if (!canvas || !originalRef.current) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.putImageData(originalRef.current, 0, 0);
  }

  // ─── NEXT PAGE ──────────────────────────────────────────────────────────────
  function nextPage() {
    setScore(s => s + 1);
    if (pageIndex + 1 >= PAGES.length) {
      setPhase("result");
    } else {
      setPageIndex(i => i + 1);
      setDonnaMsg("Pick a colour and start painting!");
      setDonnaState("idle");
    }
  }

  // ─── INTRO ──────────────────────────────────────────────────────────────────
  if (phase === "intro") return (
    <main className="relative min-h-screen w-full bg-[#0d2b5e] overflow-hidden flex flex-col items-center justify-center p-6">
      <style>{`@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}`}</style>
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-[#c96bff]/8 blur-[120px] pointer-events-none"/>
      <Link href="/map" className="absolute top-8 left-8 text-white/40 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest">← Back</Link>

      <div className="flex flex-col items-center text-center z-10 max-w-md">
        <div className="w-32 h-32 mb-4" style={{ animation:"bob 3s ease-in-out infinite" }}>
          <Donna state="happy"/>
        </div>
        <div className="inline-flex items-center gap-2 bg-[#c96bff]/20 border border-[#c96bff]/30 rounded-full px-4 py-2 mb-4">
          <span className="text-[10px] font-black text-[#e0a0ff] uppercase tracking-widest">Art Grotto</span>
        </div>
        <h1 className="text-5xl text-white font-bold mb-3" style={{ fontFamily:"var(--font-fredoka)" }}>
          Color <span className="text-[#ff8c6b]">Splash!</span>
        </h1>
        <p className="text-white/50 text-sm font-medium mb-8 leading-relaxed">
          Pick a colour from the palette and tap anywhere on the picture to fill it with colour!
        </p>
        <div className="flex flex-col gap-3 w-full mb-10">
          {[
            { icon:"🎨", text:"Pick any colour from the palette" },
            { icon:"👆", text:"Tap anywhere on the picture to fill it" },
            { icon:"🖼️", text:"Colour 4 beautiful pictures!" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-left">
              <span className="text-2xl">{item.icon}</span>
              <span className="text-white/60 text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </div>
        <button
          onClick={() => setPhase("playing")}
          className="w-full py-5 bg-[#ff6b4a] text-white font-black text-xl rounded-[2rem] shadow-xl shadow-[#ff6b4a]/20 hover:bg-[#ff5a36] hover:-translate-y-1 transition-all active:scale-[0.98]"
          style={{ fontFamily:"var(--font-fredoka)" }}
        >
          Start Painting!
        </button>
      </div>
    </main>
  );

  // ─── RESULT ─────────────────────────────────────────────────────────────────
  if (phase === "result") return (
    <main className="relative min-h-screen w-full bg-[#0d2b5e] overflow-hidden flex flex-col items-center justify-center p-6">
      <style>{`@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}`}</style>
      <div className="flex flex-col items-center text-center z-10 max-w-md">
        <div className="w-32 h-32 mb-4" style={{ animation:"bob 2s ease-in-out infinite" }}>
          <Donna state="celebrate"/>
        </div>
        <h1 className="text-5xl text-white font-bold mt-2 mb-2" style={{ fontFamily:"var(--font-fredoka)" }}>
          Amazing Artist!
        </h1>
        <p className="text-white/50 text-sm mb-8">You coloured all {PAGES.length} pictures!</p>
        <div className="flex items-center gap-3 bg-white/5 border border-[#ff8c6b]/20 rounded-2xl px-8 py-5 mb-10">
          <span className="text-4xl">🐚</span>
          <div className="text-left">
            <div className="text-white/40 text-[10px] font-black uppercase tracking-widest">Shells Earned</div>
            <div className="text-3xl text-[#ff8c6b] font-black" style={{ fontFamily:"var(--font-fredoka)" }}>+{score}</div>
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={() => { setPhase("playing"); setPageIndex(0); setScore(0); }}
            className="w-full py-5 bg-[#ff6b4a] text-white font-black text-xl rounded-[2rem] shadow-xl hover:bg-[#ff5a36] hover:-translate-y-1 transition-all"
            style={{ fontFamily:"var(--font-fredoka)" }}
          >
            Play Again
          </button>
          <Link href="/map">
            <button className="w-full py-4 text-white/30 hover:text-white text-sm font-bold transition-all">
              Back to Ocean Map
            </button>
          </Link>
        </div>
      </div>
    </main>
  );

  // ─── PLAYING ────────────────────────────────────────────────────────────────
  return (
    <main className="relative h-screen w-full bg-[#0d2b5e] overflow-hidden flex flex-col">
      <style>{`
        @keyframes bob       { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes wiggle    { 0%,100%{transform:rotate(-8deg)} 50%{transform:rotate(8deg)} }
        @keyframes fadeIn    { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes processing{ 0%,100%{opacity:0.6} 50%{opacity:1} }
      `}</style>

      <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-[#c96bff]/6 blur-[100px] pointer-events-none"/>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#ff8c6b]/4 blur-[80px] rounded-full pointer-events-none"/>

      {/* ── TOP BAR ── */}
      <div className="relative z-20 flex items-center justify-between px-5 pt-4 pb-2 flex-shrink-0">
        <Link href="/map" className="text-white/30 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all">← Back</Link>

        {/* Page progress */}
        <div className="flex items-center gap-2">
          {PAGES.map((_, i) => (
            <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all ${
              i < pageIndex ? "bg-[#ff6b4a]" : i === pageIndex ? "bg-white scale-125" : "bg-white/20"
            }`}/>
          ))}
        </div>

        <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
          <span className="text-sm">🐚</span>
          <span className="text-white font-black text-sm">{score}</span>
        </div>
      </div>

      {/* ── MAIN AREA ── */}
      <div className="relative z-10 flex flex-1 gap-3 px-4 pb-2 overflow-hidden">

        {/* ── LEFT SIDEBAR: DONNA + PALETTE ── */}
        <div className="flex flex-col items-center gap-3 w-[110px] flex-shrink-0">

          {/* Donna */}
          <div style={{
            width: "80px", height: "80px", flexShrink: 0,
            animation: donnaState === "happy" ? "wiggle 0.4s ease-in-out 3" : "bob 3s ease-in-out infinite",
            filter: "drop-shadow(0 4px 12px rgba(220,140,60,0.4))",
          }}>
            <Donna state={donnaState}/>
          </div>

          {/* Speech bubble */}
          <div style={{
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "10px", padding: "6px 8px",
            animation: "fadeIn 0.3s ease forwards",
          }}>
            <p style={{
              fontSize: "9px", fontWeight: 700,
              color: donnaState === "happy" ? "#ff8c6b" : "rgba(255,255,255,0.6)",
              textAlign: "center", lineHeight: 1.4,
              fontFamily: "var(--font-nunito)",
            }}>
              {donnaMsg}
            </p>
          </div>

          {/* Page title */}
          <div style={{
            fontSize: "9px", fontWeight: 800,
            color: "rgba(255,255,255,0.3)",
            textTransform: "uppercase", letterSpacing: "1px",
            textAlign: "center", fontFamily: "var(--font-nunito)",
          }}>
            {currentPage.title}
          </div>

          {/* Colour palette */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "5px", width: "100%",
          }}>
            {PALETTE.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                style={{
                  width: "100%", aspectRatio: "1",
                  borderRadius: "8px",
                  background: color,
                  border: selectedColor === color
                    ? "2.5px solid white"
                    : "2px solid transparent",
                  boxShadow: selectedColor === color
                    ? `0 0 8px ${color}80, 0 0 0 1px ${color}40`
                    : "none",
                  transform: selectedColor === color ? "scale(1.15)" : "scale(1)",
                  transition: "all 0.15s ease",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>

          {/* Reset button */}
          <button
            onClick={resetCanvas}
            style={{
              width: "100%", padding: "6px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "10px", cursor: "pointer",
              fontSize: "9px", fontWeight: 800,
              color: "rgba(255,255,255,0.4)",
              textTransform: "uppercase", letterSpacing: "1px",
              fontFamily: "var(--font-nunito)",
            }}
          >
            Reset
          </button>
        </div>

        {/* ── RIGHT: CANVAS ── */}
        <div className="flex-1 flex flex-col gap-2 overflow-hidden">

          {/* Canvas container */}
          <div style={{
            flex: 1,
            background: "#ffffff",
            borderRadius: "20px",
            overflow: "hidden",
            border: "2px solid rgba(255,255,255,0.1)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
            position: "relative",
            cursor: isProcessing ? "wait" : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='10' fill='${encodeURIComponent(selectedColor)}' stroke='white' stroke-width='2'/%3E%3C/svg%3E") 16 16, crosshair`,
          }}>
            {/* Loading overlay */}
            {!imageLoaded && (
              <div style={{
                position: "absolute", inset: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "#f5f5f5", zIndex: 2,
              }}>
                <p style={{ color: "#aaa", fontFamily: "var(--font-nunito)", fontSize: "14px", fontWeight: 700 }}>
                  Loading picture...
                </p>
              </div>
            )}

            {/* Processing overlay */}
            {isProcessing && (
              <div style={{
                position: "absolute", inset: 0, zIndex: 3,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(255,255,255,0.3)",
                animation: "processing 0.5s ease-in-out infinite",
              }}>
                <div style={{
                  width: "40px", height: "40px", borderRadius: "50%",
                  background: selectedColor,
                  border: "3px solid white",
                  boxShadow: `0 0 20px ${selectedColor}`,
                }}/>
              </div>
            )}

            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              style={{
                width: "100%", height: "100%",
                objectFit: "contain", display: "block",
                imageRendering: "pixelated",
              }}
            />
          </div>

          {/* Next button */}
          <button
            onClick={nextPage}
            style={{
              width: "100%", padding: "14px",
              background: "#ff6b4a", color: "white",
              fontFamily: "var(--font-fredoka)", fontSize: "18px", fontWeight: 900,
              border: "none", borderRadius: "16px", cursor: "pointer",
              boxShadow: "0 6px 20px rgba(255,107,74,0.4)",
              flexShrink: 0,
            }}
          >
            {pageIndex + 1 >= PAGES.length ? "Finish!" : "Next Picture!"}
          </button>
        </div>
      </div>
    </main>
  );
}
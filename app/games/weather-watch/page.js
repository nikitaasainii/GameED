"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { playClick } from "@/lib/sound"; 

const SEASONS = [
  { id: "summer", name: "Summer", color: "#ff8c00", glowColor: "rgba(255,140,0,0.3)", borderColor: "#ffb347", cards: [
    { id: "season", title: "Season", image: "/images/summer-weather.gif", fact: "Summer is hot and sunny!", bgColor: "#ff8c00" },
    { id: "clothes", title: "Clothes", image: "/images/summer-clothes.png", fact: "Wear light clothes!", bgColor: "#ffad33" },
    { id: "food", title: "Food", image: "/images/summer-food.gif", fact: "Eat cold watermelon!", bgColor: "#ff6b4a" },
    { id: "sound", title: "Sound", image: "/images/summer-sound.gif", fact: "Hear the cicadas!", bgColor: "#e86820", isSound: true, soundFile: "/sound/summer.mp3", soundLabel: "Cicadas" },
  ]},
  { id: "autumn", name: "Autumn", color: "#c84800", glowColor: "rgba(200,72,0,0.3)", borderColor: "#e86820", cards: [
    { id: "season", title: "Season", image: "/images/autumn-weather.gif", fact: "Leaves turn orange!", bgColor: "#c84800" },
    { id: "clothes", title: "Clothes", image: "/images/autumn-clothes.png", fact: "Wear light sweaters!", bgColor: "#d45800" },
    { id: "food", title: "Food", image: "/images/autumn-food.gif", fact: "Yummy pumpkin soup!", bgColor: "#e06020" },
    { id: "sound", title: "Sound", image: "/images/weather/autumn-sound.png", fact: "Rustling leaves!", bgColor: "#b84000", isSound: true, soundFile: "/sound/autumn.mp3", soundLabel: "Rustling" },
  ]},
  { id: "winter", name: "Winter", color: "#1a6aaa", glowColor: "rgba(26,106,170,0.3)", borderColor: "#4a90d0", cards: [
    { id: "season", title: "Season", image: "/images/winter-weather.mp4", fact: "It is cold and snowy!", bgColor: "#1a6aaa" },
    { id: "clothes", title: "Clothes", image: "/images/winter-clothes.png", fact: "Wear thick coats!", bgColor: "#2a7abb" },
    { id: "food", title: "Food", image: "/images/winter-food.gif", fact: "Hot chocolate time!", bgColor: "#3a8acc" },
    { id: "sound", title: "Sound", image: "/images/winter-sound.gif", fact: "Winter wind blows!", bgColor: "#0a5a9a", isSound: true, soundFile: "/sound/winter.mp3", soundLabel: "Wind" },
  ]},
  { id: "spring", name: "Spring", color: "#208040", glowColor: "rgba(32,128,64,0.3)", borderColor: "#50c870", cards: [
    { id: "season", title: "Season", image: "/images/spring-season.gif", fact: "Flowers are blooming!", bgColor: "#208040" },
    { id: "clothes", title: "Clothes", image: "/images/spring-clothes.png", fact: "Wear light jackets!", bgColor: "#309050" },
    { id: "food", title: "Food", image: "/images/spring-food.png", fact: "Fresh fruit salads!", bgColor: "#40a060" },
    { id: "sound", title: "Sound", image: "/images/weather/spring-sound.png", fact: "Birds are singing!", bgColor: "#107030", isSound: true, soundFile: "/sound/spring.mp3", soundLabel: "Birds" },
  ]},
  { id: "rainy", name: "Rainy", color: "#304888", glowColor: "rgba(48,72,136,0.3)", borderColor: "#5878b8", cards: [
    { id: "season", title: "Season", image: "/images/rainy-season.gif", fact: "Lots of rain falls!", bgColor: "#304888" },
    { id: "clothes", title: "Clothes", image: "/images/rainy-clothes.png", fact: "Carry an umbrella!", bgColor: "#405898" },
    { id: "food", title: "Food", image: "/images/rainy-food.gif", fact: "Hot tea and snacks!", bgColor: "#5068a8" },
    { id: "sound", title: "Sound", image: "/images/weather/rainy-sound.png", fact: "Pitter patter rain!", bgColor: "#203878", isSound: true, soundFile: "/sound/rainy.mp3", soundLabel: "Rain" },
  ]},
];

function Donna({ state }) {
  const happy = state === "happy" || state === "celebrate";
  return (
    <svg width="100%" height="100%" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 6px 16px rgba(220,140,60,0.4))" }}>
      <defs>
        <radialGradient id="dG4" cx="42%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#fde87a"/><stop offset="35%" stopColor="#f9c13a"/>
          <stop offset="70%" stopColor="#f0920e"/><stop offset="100%" stopColor="#d4720a"/>
        </radialGradient>
      </defs>
      <path d="M110 12 C116 30 120 48 126 60 C140 56 158 50 174 60 C180 66 170 80 160 90 C168 100 178 114 172 128 C166 140 150 134 138 128 C134 144 128 164 118 172 C108 178 102 160 110 146 C98 160 92 178 82 172 C72 166 66 146 62 128 C50 134 34 140 28 128 C22 114 32 100 40 90 C30 80 20 66 26 60 C42 50 60 56 74 60 C80 48 104 30 110 12Z" fill="url(#dG4)" stroke="#c86808" strokeWidth="2.5"/>
      {happy ? (
        <>
          <path d="M91 92 Q99 84 107 92" stroke="#3a2010" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
          <path d="M113 92 Q121 84 129 92" stroke="#3a2010" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
          <path d="M96 108 Q110 124 124 108" stroke="#3a2010" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
        </>
      ) : (
        <>
          <path d="M91 96 Q99 88 107 96" stroke="#3a2010" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
          <path d="M113 96 Q121 88 129 96" stroke="#3a2010" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
          <path d="M100 110 Q110 120 120 110" stroke="#3a2010" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
        </>
      )}
    </svg>
  );
}

function FlipCard({ card, seasonColor, seasonGlow, isFlipped, onFlip, soundPlaying }) {
  return (
    <div onClick={onFlip} style={{ perspective: "1000px", cursor: "pointer", width: "100%", aspectRatio: "1" }}>
      <div style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d", transition: "transform 0.6s", transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}>
        <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", borderRadius: "20px", background: "linear-gradient(135deg, rgba(0,80,120,0.6), rgba(0,40,80,0.8))", border: "2px solid rgba(100,200,255,0.2)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: "32px", marginBottom: "8px" }}>{card.id === "season" ? "🌊" : card.id === "clothes" ? "🐚" : card.id === "food" ? "🪸" : "🔊"}</div>
          <div style={{ fontSize: "12px", fontWeight: 800, color: "white", textTransform: "uppercase" }}>{card.title}</div>
        </div>
        <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)", borderRadius: "20px", background: card.bgColor, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "8px" }}>
          <div style={{ fontSize: "10px", fontWeight: 800, color: "white" }}>{card.title}</div>
          {/* IMAGE SIZE INCREASED TO 95% */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", width: "100%", overflow: "hidden" }}>
            {card.isSound ? <span style={{ fontSize: "32px" }}>{soundPlaying ? "🔊" : "▶"}</span> : <img src={card.image} style={{ width: "95%", height: "95%", objectFit: "contain" }} />}
          </div>
          <div style={{ fontSize: "9px", color: "white", textAlign: "center", lineHeight: 1.1 }}>{card.fact}</div>
        </div>
      </div>
    </div>
  );
}

export default function WeatherWatch() {
  const [phase, setPhase] = useState("intro");
  const [sIndex, setSIndex] = useState(0);
  const [flipped, setFlipped] = useState({});
  const [donnaState, setDonnaState] = useState("idle");
  const [donnaMessage, setDonnaMessage] = useState("");
  const [soundPlaying, setSoundPlaying] = useState(false);
  const audioRef = useRef(null);

  const currentSeason = SEASONS[sIndex];
  const allFlipped = Object.values(flipped).filter(Boolean).length === 4;

  function startGame() {
    playClick(); 
    setSIndex(0);
    setFlipped({});
    setPhase("playing");
  }

  function handleCardFlip(cardId, card) {
    if (flipped[cardId]) return;
    setFlipped(prev => ({ ...prev, [cardId]: true }));
    if (card.isSound) playSound(card.soundFile);
    setDonnaState("happy");
    const messages = { season: `It's ${currentSeason.name}!`, clothes: "Cool clothes!", food: "Yum!", sound: "Listen!" };
    setDonnaMessage(messages[cardId] || "");
  }

  function playSound(soundFile) {
    // Stop any existing audio before playing new
    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    }
    const audio = new Audio(soundFile);
    audioRef.current = audio;
    setSoundPlaying(true);
    audio.play().catch(() => setSoundPlaying(false));
    audio.onended = () => setSoundPlaying(false);
  }

  function nextSeason() {
    playClick(); 
    
    // STOP ACTIVE AUDIO WHEN CHANGING SEASONS
    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    }
    setSoundPlaying(false);

    if (sIndex + 1 >= SEASONS.length) setPhase("result");
    else {
      setSIndex(i => i + 1);
      setFlipped({});
      setDonnaState("idle");
      setDonnaMessage("");
    }
  }

  if (phase === "intro") return (
    <main className="relative min-h-screen w-full bg-[#0d2b5e] overflow-hidden flex flex-col items-center justify-center p-6">
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"/>
      <Link href="/map" onClick={() => playClick()} className="absolute top-8 left-8 text-white/40 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest">← Back</Link>
      <div className="flex flex-col items-center text-center z-10 max-w-md">
        <div className="mb-6 w-24 h-24"><Donna state="idle"/></div>
        <div className="inline-flex items-center gap-2 bg-[#4a90ff]/20 border border-[#4a90ff]/30 rounded-full px-4 py-2 mb-4">
          <span className="text-[10px] font-black text-[#8eb9ff] uppercase tracking-widest">GK Shipwreck</span>
        </div>
        <h1 className="text-5xl text-white font-bold mb-3" style={{ fontFamily:"var(--font-fredoka)" }}>Weather <span className="text-[#ff8c6b]">Watch!</span></h1>
        <p className="text-white/50 text-sm font-medium mb-8 leading-relaxed">Learn about all 5 seasons! Watch the board closely to discover hidden items and sounds.</p>
        <div className="flex flex-col gap-3 w-full mb-10">
          {[
            { icon:"🌦️", text:"Explore Summer, Winter, and more" },
            { icon:"👆", text:"Tap cards to reveal surprises" },
            { icon:"🔊", text:"Listen to real sounds of nature" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-left">
              <span className="text-2xl">{item.icon}</span>
              <span className="text-white/60 text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </div>
        <button onClick={startGame} className="w-full py-5 bg-[#ff6b4a] text-white font-black text-xl rounded-[2rem] shadow-xl shadow-[#ff6b4a]/20 hover:bg-[#ff5a36] hover:-translate-y-1 transition-all active:scale-[0.98]" style={{ fontFamily: "var(--font-fredoka)" }}>
          Start Exploring!
        </button>
      </div>
    </main>
  );

  if (phase === "result") return (
    <main className="min-h-screen bg-[#0d2b5e] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-32 h-32 mb-4"><Donna state="celebrate"/></div>
      <h1 className="text-5xl text-white font-bold mb-8" style={{ fontFamily:"var(--font-fredoka)" }}>Weather Expert!</h1>
      <button onClick={startGame} className="px-12 py-5 bg-[#ff6b4a] text-white font-black text-2xl rounded-full shadow-lg" style={{ fontFamily:"var(--font-fredoka)" }}>Play Again</button>
      <Link href="/map" onClick={() => playClick()} className="mt-6 text-white/30 text-sm font-bold uppercase tracking-widest">Back to Map</Link>
    </main>
  );

  return (
    <main className="h-screen w-full bg-[#0d2b5e] overflow-hidden flex flex-col p-6">
      <div className="flex justify-between items-center mb-4">
        <Link href="/map" onClick={() => playClick()} className="text-white/40 text-xs font-black tracking-widest uppercase">← BACK</Link>
        <div className="text-white font-bold text-xl uppercase tracking-widest" style={{ fontFamily:"var(--font-fredoka)" }}>{currentSeason.name}</div>
      </div>

      <div className="flex-1 flex items-center justify-center gap-12">
        <div className="w-36 flex flex-col items-center gap-4">
          <Donna state={donnaState}/>
          <div className="bg-white/10 border border-white/20 text-[10px] font-black p-3 rounded-2xl text-white text-center leading-snug">
            {donnaMessage || `Find all about ${currentSeason.name}!`}
          </div>
        </div>

        <div className="max-w-[480px] w-full bg-white/5 border border-white/20 rounded-[2.5rem] p-6 shadow-2xl backdrop-blur-sm">
          <div className="grid grid-cols-2 gap-4">
            {currentSeason.cards.map((card) => (
              <FlipCard key={card.id} card={card} seasonColor={currentSeason.color} isFlipped={!!flipped[card.id]} onFlip={() => handleCardFlip(card.id, card)} soundPlaying={soundPlaying && card.isSound}/>
            ))}
          </div>
          {allFlipped && (
            <button onClick={nextSeason} className="mt-6 w-full py-5 bg-[#ff6b4a] text-white font-black rounded-2xl text-lg shadow-xl animate-bounce">
              {sIndex + 1 >= SEASONS.length ? "Finish Adventure!" : "Next Season →"}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
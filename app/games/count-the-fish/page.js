"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { saveGameProgress } from "@/lib/progress"; // Added progress import

const TOTAL_QUESTIONS    = 5;
const FISH_SPEED         = 3200;
const FISH_INTERVAL      = 900;
const SHOW_OPTIONS_DELAY = 1000;

const FISH_COLORS = [
  "#ff6b4a","#ff8c6b","#4a90ff","#00c9b1",
  "#c96bff","#ffd93d","#ff6b9d","#6bffb8",
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateOptions(correct) {
  const s = new Set([correct]);
  while (s.size < 4) s.add(getRandomInt(1, 10));
  return [...s].sort(() => Math.random() - 0.5);
}

function buildRound() {
  return Array.from({ length: TOTAL_QUESTIONS }, () => {
    const count = getRandomInt(1, 10);
    return { count, options: generateOptions(count), fishColors: Array.from({ length: count }, (_, i) => FISH_COLORS[i % FISH_COLORS.length]) };
  });
}

function FishSVG({ color }) {
  return (
    <svg width="70" height="50" viewBox="0 0 70 50" xmlns="http://www.w3.org/2000/svg">
      <polygon points="0,10 0,40 18,25" fill={color} opacity="0.85"/>
      <ellipse cx="38" cy="25" rx="28" ry="18" fill={color}/>
      <ellipse cx="38" cy="28" rx="20" ry="10" fill="white" opacity="0.2"/>
      <circle cx="54" cy="20" r="5" fill="white"/>
      <circle cx="55" cy="20" r="3" fill="#1a1a2e"/>
      <circle cx="56" cy="19" r="1" fill="white"/>
      <path d="M30 8 Q38 2 46 10" fill={color} stroke="white" strokeWidth="1" strokeOpacity="0.3"/>
      <path d="M58 26 Q62 30 58 32" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
    </svg>
  );
}

function Donna({ state }) {
  const happy = state === "happy" || state === "celebrate";
  const wrong = state === "wrong";
  return (
    <svg width="90" height="90" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg"
      style={{ animation: "bob 3s ease-in-out infinite", filter: "drop-shadow(0 6px 16px rgba(220,140,60,0.4))" }}>
      <style>{`@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}`}</style>
      <defs>
        <radialGradient id="dG" cx="42%" cy="38%" r="62%">
          <stop offset="0%"   stopColor="#fde87a"/>
          <stop offset="35%"  stopColor="#f9c13a"/>
          <stop offset="70%"  stopColor="#f0920e"/>
          <stop offset="100%" stopColor="#d4720a"/>
        </radialGradient>
        <radialGradient id="bG" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#f07040" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#f07040" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <path d="M110 12 C116 30 120 48 126 60 C140 56 158 50 174 60 C180 66 170 80 160 90 C168 100 178 114 172 128 C166 140 150 134 138 128 C134 144 128 164 118 172 C108 178 102 160 110 146 C98 160 92 178 82 172 C72 166 66 146 62 128 C50 134 34 140 28 128 C22 114 32 100 40 90 C30 80 20 66 26 60 C42 50 60 56 74 60 C80 48 104 30 110 12Z"
        fill="#c86808" opacity="0.12" transform="translate(3,5)"/>
      <path d="M110 12 C116 30 120 48 126 60 C140 56 158 50 174 60 C180 66 170 80 160 90 C168 100 178 114 172 128 C166 140 150 134 138 128 C134 144 128 164 118 172 C108 178 102 160 110 146 C98 160 92 178 82 172 C72 166 66 146 62 128 C50 134 34 140 28 128 C22 114 32 100 40 90 C30 80 20 66 26 60 C42 50 60 56 74 60 C80 48 104 30 110 12Z"
        fill="url(#dG)" stroke="#c86808" strokeWidth="2.5"/>
      <ellipse cx="106" cy="88" rx="32" ry="28" fill="#fef0a0" opacity="0.2"/>
      <ellipse cx="110" cy="34" rx="4"   ry="11" fill="white" opacity="0.28"/>
      <ellipse cx="110" cy="34" rx="3.5" ry="9"  fill="white" opacity="0.22" transform="rotate(72 110 110)"/>
      <ellipse cx="110" cy="34" rx="3.5" ry="9"  fill="white" opacity="0.22" transform="rotate(144 110 110)"/>
      <ellipse cx="110" cy="34" rx="3.5" ry="9"  fill="white" opacity="0.22" transform="rotate(216 110 110)"/>
      <ellipse cx="110" cy="34" rx="4"   ry="10" fill="white" opacity="0.25" transform="rotate(288 110 110)"/>
      <ellipse cx="88"  cy="112" rx="12" ry="8" fill="url(#bG)"/>
      <ellipse cx="132" cy="112" rx="12" ry="8" fill="url(#bG)"/>
      {/* Left eye */}
      {happy ? <path d="M91 92 Q96 84 104 92" stroke="#3a2010" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
             : wrong ? <path d="M91 100 Q99 108 107 100" stroke="#3a2010" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
             : <path d="M91 96 Q99 88 107 96" stroke="#3a2010" strokeWidth="3.5" fill="none" strokeLinecap="round"/>}
      {/* Right eye */}
      {happy ? <path d="M113 92 Q121 84 129 92" stroke="#3a2010" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
             : wrong ? <path d="M113 100 Q121 108 129 100" stroke="#3a2010" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
             : <path d="M113 96 Q121 88 129 96" stroke="#3a2010" strokeWidth="3.5" fill="none" strokeLinecap="round"/>}
      {/* Mouth */}
      {happy ? <path d="M96 108 Q110 124 124 108" stroke="#3a2010" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
             : wrong ? <path d="M100 118 Q110 108 120 118" stroke="#3a2010" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
             : <path d="M100 110 Q110 120 120 110" stroke="#3a2010" strokeWidth="2.8" fill="none" strokeLinecap="round"/>}
    </svg>
  );
}

export default function CountTheFish() {
  const [phase, setPhase]             = useState("intro");
  const [round, setRound]             = useState([]);
  const [qIndex, setQIndex]           = useState(0);
  const [visibleFish, setVisibleFish] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [selected, setSelected]       = useState(null);
  const [isCorrect, setIsCorrect]     = useState(null);
  const [score, setScore]             = useState(0);
  const [donnaState, setDonnaState]   = useState("idle");
  const [feedback, setFeedback]       = useState(null);
  const [fishCount, setFishCount]     = useState(0);

  const currentQ = round[qIndex];

  function startGame() {
    setRound(buildRound());
    setQIndex(0);
    setScore(0);
    setPhase("playing");
  }

  useEffect(() => {
    if (phase !== "playing" || !currentQ) return;
    setVisibleFish([]); setShowOptions(false); setSelected(null);
    setIsCorrect(null); setFishCount(0); setDonnaState("idle"); setFeedback(null);

    let fishShown = 0;
    const total = currentQ.count;

    const interval = setInterval(() => {
      if (fishShown >= total) {
        clearInterval(interval);
        setTimeout(() => { setVisibleFish([]); setShowOptions(true); }, SHOW_OPTIONS_DELAY);
        return;
      }
      const fishId = Date.now() + fishShown;
      const color  = currentQ.fishColors[fishShown];
      const yPos   = 20 + Math.random() * 50;
      setVisibleFish(prev => [...prev, { id: fishId, color, yPos }]);
      setFishCount(prev => prev + 1);
      fishShown++;
      setTimeout(() => setVisibleFish(prev => prev.filter(f => f.id !== fishId)), FISH_SPEED + 300);
    }, FISH_INTERVAL);

    return () => clearInterval(interval);
  }, [qIndex, phase]);

  // Integrated saveGameProgress here
  async function handleAnswer(option) {
    if (selected !== null) return;
    setSelected(option);
    const correct = option === currentQ.count;
    setIsCorrect(correct);
    
    // We calculate the final potential score immediately for the backend call
    const updatedScore = correct ? score + 1 : score;
    
    if (correct) { 
      setScore(s => s + 1); 
      setDonnaState("happy"); 
      setFeedback("Great job!"); 
    }
    else { 
      setDonnaState("wrong"); 
      setFeedback(`It was ${currentQ.count}!`); 
    }

    setTimeout(async () => {
      if (qIndex + 1 >= TOTAL_QUESTIONS) {
        setPhase("result");
        // Save to DB when game completes
        await saveGameProgress("Math Lagoon", updatedScore);
      }
      else setQIndex(i => i + 1);
    }, 1800);
  }

  if (phase === "intro") return (
    <main className="relative min-h-screen w-full bg-[#0d2b5e] overflow-hidden flex flex-col items-center justify-center p-6">
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"/>
      <Link href="/map" className="absolute top-8 left-8 text-white/40 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest">← Back</Link>
      <div className="flex flex-col items-center text-center z-10 max-w-md">
        <div className="mb-6"><Donna state="idle"/></div>
        <div className="inline-flex items-center gap-2 bg-[#4a90ff]/20 border border-[#4a90ff]/30 rounded-full px-4 py-2 mb-4">
          <span className="text-[10px] font-black text-[#8eb9ff] uppercase tracking-widest">Math Lagoon</span>
        </div>
        <h1 className="text-5xl text-white font-bold mb-3" style={{ fontFamily: "var(--font-fredoka)" }}>Count the <span className="text-[#ff8c6b]">Fish!</span></h1>
        <p className="text-white/50 text-sm font-medium mb-8 leading-relaxed">Watch the fish swim by and count them carefully. Then pick the right number!</p>
        <div className="flex flex-col gap-3 w-full mb-10">
          {[{ icon:"🐟", text:"Fish will swim across the screen" },{ icon:"🔢", text:"Count every fish carefully" },{ icon:"👆", text:"Tap the correct number" }].map((item, i) => (
            <div key={i} className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-left">
              <span className="text-2xl">{item.icon}</span>
              <span className="text-white/60 text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </div>
        <button onClick={startGame} className="w-full py-5 bg-[#ff6b4a] text-white font-black text-xl rounded-[2rem] shadow-xl shadow-[#ff6b4a]/20 hover:bg-[#ff5a36] hover:-translate-y-1 transition-all active:scale-[0.98]" style={{ fontFamily: "var(--font-fredoka)" }}>Start Counting!</button>
      </div>
    </main>
  );

  if (phase === "result") {
    const perfect = score === TOTAL_QUESTIONS;
    return (
      <main className="relative min-h-screen w-full bg-[#0d2b5e] overflow-hidden flex flex-col items-center justify-center p-6">
        <div className="flex flex-col items-center text-center z-10 max-w-md">
          <Donna state={perfect ? "celebrate" : "happy"}/>
          <h1 className="text-5xl text-white font-bold mt-6 mb-2" style={{ fontFamily: "var(--font-fredoka)" }}>{perfect ? "Perfect!" : "Well Done!"}</h1>
          <p className="text-white/50 text-sm mb-8">{perfect ? "You counted every fish correctly!" : `You got ${score} out of ${TOTAL_QUESTIONS} right!`}</p>
          <div className="flex items-center gap-3 bg-white/5 border border-[#ff8c6b]/20 rounded-2xl px-8 py-5 mb-10">
            <span className="text-4xl">🐚</span>
            <div className="text-left">
              <div className="text-white/40 text-[10px] font-black uppercase tracking-widest">Shells Earned</div>
              <div className="text-3xl text-[#ff8c6b] font-black" style={{ fontFamily: "var(--font-fredoka)" }}>+{score}</div>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <button onClick={startGame} className="w-full py-5 bg-[#ff6b4a] text-white font-black text-xl rounded-[2rem] shadow-xl hover:bg-[#ff5a36] hover:-translate-y-1 transition-all" style={{ fontFamily: "var(--font-fredoka)" }}>Play Again</button>
            <Link href="/map"><button className="w-full py-4 text-white/30 hover:text-white text-sm font-bold transition-all">Back to Ocean Map</button></Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative h-screen w-full bg-[#0d2b5e] overflow-hidden flex flex-col">
      <style>{`
        @keyframes swimAcross { 0%{left:-80px;opacity:0} 8%{opacity:1} 92%{opacity:1} 100%{left:calc(100vw + 80px);opacity:0} }
        @keyframes bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes popIn { 0%{transform:scale(0.5);opacity:0} 70%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"/>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#4a90ff]/5 blur-[100px] rounded-full pointer-events-none"/>

      {/* TOP BAR */}
      <div className="relative z-20 flex items-center justify-between px-6 pt-6 pb-2">
        <Link href="/map" className="text-white/30 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all">← Back</Link>
        <div className="flex items-center gap-2">
          {Array.from({ length: TOTAL_QUESTIONS }).map((_, i) => (
            <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all ${i < qIndex ? "bg-[#ff6b4a]" : i === qIndex ? "bg-white scale-125" : "bg-white/20"}`}/>
          ))}
        </div>
        <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
          <span className="text-sm">🐚</span>
          <span className="text-white font-black text-sm">{score}</span>
        </div>
      </div>

      {/* DONNA + INSTRUCTION */}
      <div className="relative z-10 flex items-center justify-center gap-4 px-6 py-2">
        <Donna state={donnaState}/>
        <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3 backdrop-blur-sm max-w-xs">
          <p className={`text-sm font-black ${feedback && isCorrect ? "text-[#ff8c6b]" : feedback ? "text-white/60" : "text-white/70"}`}>
            {feedback || (showOptions ? "How many fish did you count?" : "Count the fish swimming by!")}
          </p>
        </div>
      </div>

      {/* OCEAN STAGE */}
      <div className="relative flex-1 mx-4 rounded-3xl overflow-hidden border border-white/5"
        style={{ background:"linear-gradient(180deg,#0a1f40 0%,#061430 60%,#040e22 100%)", minHeight:"180px", maxHeight:"220px" }}>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#0a0e1a] to-transparent"/>
        {!showOptions && (
          <div className="absolute top-3 right-4 bg-white/10 border border-white/20 rounded-full px-3 py-1 backdrop-blur-sm z-10">
            <span className="text-white font-black text-sm">{fishCount}</span>
          </div>
        )}
        {visibleFish.map((fish) => (
          <div key={fish.id} style={{ position:"absolute", top:`${fish.yPos}%`, animation:`swimAcross ${FISH_SPEED}ms linear forwards` }}>
            <FishSVG color={fish.color}/>
          </div>
        ))}
        {visibleFish.length === 0 && !showOptions && fishCount === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white/20 text-sm font-bold">Get ready...</p>
          </div>
        )}
      </div>

      {/* NUMBER OPTIONS */}
      <div className="relative z-10 px-6 py-5">
        {showOptions && currentQ ? (
          <div className="grid grid-cols-4 gap-3" style={{ animation:"fadeSlideUp 0.4s ease forwards" }}>
            {currentQ.options.map((option) => {
              let cls = "bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-[#ff8c6b]/50";
              if (selected !== null) {
                if (option === currentQ.count)     cls = "bg-[#ff6b4a]/30 border-[#ff6b4a] text-[#ff8c6b]";
                else if (option === selected)       cls = "bg-red-500/20 border-red-500/50 text-red-300";
                else                               cls = "bg-white/5 border-white/5 text-white/30";
              }
              return (
                <button key={option} onClick={() => handleAnswer(option)} disabled={selected !== null}
                  className={`border-2 rounded-2xl py-5 font-black text-3xl transition-all active:scale-95 ${cls}`}
                  style={{ fontFamily:"var(--font-fredoka)", animation:"popIn 0.3s ease forwards" }}>
                  {option}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-3 opacity-0 pointer-events-none">
            {[1,2,3,4].map(n => <div key={n} className="rounded-2xl py-5 bg-white/5 border-2 border-white/10"/>)}
          </div>
        )}
      </div>
    </main>
  );
}

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { playClick } from "@/lib/sound";
import { saveGameProgress } from "@/lib/progress";

const DonnaSVG = ({ happy }) => (
  <svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <radialGradient id="dg" cx="42%" cy="38%" r="62%">
        <stop offset="0%" stopColor="#fde87a"/>
        <stop offset="35%" stopColor="#f9c13a"/>
        <stop offset="70%" stopColor="#f0920e"/>
        <stop offset="100%" stopColor="#d4720a"/>
      </radialGradient>
      <radialGradient id="bg2" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#f07040" stopOpacity="0.5"/>
        <stop offset="100%" stopColor="#f07040" stopOpacity="0"/>
      </radialGradient>
    </defs>
    <path d="M110 12 C116 30 120 48 126 60 C140 56 158 50 174 60 C180 66 170 80 160 90 C168 100 178 114 172 128 C166 140 150 134 138 128 C134 144 128 164 118 172 C108 178 102 160 110 146 C98 160 92 178 82 172 C72 166 66 146 62 128 C50 134 34 140 28 128 C22 114 32 100 40 90 C30 80 20 66 26 60 C42 50 60 56 74 60 C80 48 104 30 110 12Z"
      fill="url(#dg)" stroke="#c86808" strokeWidth="2.5"/>
    <ellipse cx="88" cy="112" rx="12" ry="8" fill="url(#bg2)"/>
    <ellipse cx="132" cy="112" rx="12" ry="8" fill="url(#bg2)"/>
    {happy ? (
      <>
        <path d="M88 94 Q96 84 104 94" fill="none" stroke="#3a2010" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M116 94 Q124 84 132 94" fill="none" stroke="#3a2010" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M96 108 Q110 124 124 108" fill="none" stroke="#3a2010" strokeWidth="3" strokeLinecap="round"/>
      </>
    ) : (
      <>
        <path d="M91 96 Q99 88 107 96" fill="none" stroke="#3a2010" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M113 96 Q121 88 129 96" fill="none" stroke="#3a2010" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M100 110 Q110 120 120 110" fill="none" stroke="#3a2010" strokeWidth="2.8" strokeLinecap="round"/>
      </>
    )}
  </svg>
);

const WORDS = [
  { word: "CAT", animal: "Cat", src: "/images/cat.gif" },
  { word: "DOG", animal: "Dog", src: "/images/dog.gif" },
  { word: "HEN", animal: "Hen", src: "/images/hen.gif" },
  { word: "PIG", animal: "Pig", src: "/images/pig.gif" },
  { word: "OWL", animal: "Owl", src: "/images/owl.gif" },
  { word: "FOX", animal: "Fox", src: "/images/fox.gif" },
  { word: "RAT", animal: "Rat", src: "/images/rat.gif" },
  { word: "BAT", animal: "Bat", src: "/images/bat.gif" },
  { word: "ANT", animal: "Ant", src: "/images/ant.gif" },
  { word: "BUG", animal: "Bug", src: "/images/bug.gif" },
];

const ANIMAL_SOUNDS = {
  CAT: "/sounds/meow.mp3",
  DOG: "/sounds/bark.mp3",
  HEN: "/sounds/hen.mp3",
  PIG: "/sounds/pig.mp3",
  OWL: "/sounds/owl.mp3",
  FOX: "/sounds/fox.mp3",
  RAT: "/sounds/rat.mp3",
  BAT: "/sounds/bat.mp3",
  ANT: "/sounds/ant.mp3",
  BUG: "/sounds/bug.mp3",
};

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }
function getWrongLetters(word, count) {
  const wordSet = new Set(word.split(""));
  const pool = ALPHABET.split("").filter(l => !wordSet.has(l));
  return shuffle(pool).slice(0, count);
}

function playAnimalSound(word) {
  const soundSrc = ANIMAL_SOUNDS[word];
  if (!soundSrc) return;
  const audio = new Audio(soundSrc);
  audio.play().catch(() => {});
}

export default function BubbleLetters() {
  const TOTAL_QUESTIONS = 5;
  const [phase, setPhase] = useState("intro");
  const [questions] = useState(() => shuffle(WORDS).slice(0, TOTAL_QUESTIONS));
  const [qIndex, setQIndex] = useState(0);
  const [popped, setPopped] = useState([]);
  const [bubbles, setBubbles] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [shells, setShells] = useState(0);
  const [donnaHappy, setDonnaHappy] = useState(false);

  const current = questions[qIndex];

  useEffect(() => {
    if (!current || phase !== "playing") return;
    const { word } = current;
    const letters = word.split("");
    const wrong = getWrongLetters(word, 6);
    const all = shuffle([...letters, ...wrong]);
    const positioned = all.map((letter, i) => ({
      id: i, letter, x: 8 + (i % 5) * 18, y: 15 + Math.floor(i / 5) * 22,
      isCorrect: letters.includes(letter), popped: false,
    }));
    setBubbles(positioned);
    setPopped([]);
    setFeedback(null);
    setDonnaHappy(false);
  }, [qIndex, current, phase]);

  function startGame() {
    playClick();
    setPhase("playing");
    setQIndex(0);
    setShells(0);
  }

  function handlePop(bubble) {
    if (feedback) return;
    if (popped.includes(bubble.id)) return;
    const { word } = current;
    const expectedLetter = word[popped.length];

    if (bubble.letter === expectedLetter) {
      playClick();
      const newPopped = [...popped, bubble.id];
      setPopped(newPopped);

      if (newPopped.length === word.length) {
        setShells(s => s + 1);
        setDonnaHappy(true);
        setFeedback("correct");

        // 🔊 Play animal sound on correct word
        playAnimalSound(word);

        setTimeout(async () => {
          if (qIndex + 1 < TOTAL_QUESTIONS) {
            setQIndex(q => q + 1);
          } else {
            setPhase("result");
            await saveGameProgress("Bubble Letters", shells + 1);
          }
          setFeedback(null);
        }, 2500);
      }
    } else {
      setFeedback("wrong");
      setDonnaHappy(false);
      setTimeout(() => setFeedback(null), 1000);
    }
  }

  if (phase === "intro") return (
    <main className="relative min-h-screen w-full bg-[#0d2b5e] overflow-hidden flex flex-col items-center justify-center p-6">
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"/>
      <Link href="/map" onClick={() => playClick()} className="absolute top-8 left-8 text-white/40 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest">← Back</Link>
      <div className="flex flex-col items-center text-center z-10 max-w-md">
        <div className="mb-6 w-24 h-24"><DonnaSVG happy={false}/></div>
        <div className="inline-flex items-center gap-2 bg-[#4a90ff]/20 border border-[#4a90ff]/30 rounded-full px-4 py-2 mb-4">
          <span className="text-[10px] font-black text-[#8eb9ff] uppercase tracking-widest">English Cove</span>
        </div>
        <h1 className="text-5xl text-white font-bold mb-3" style={{ fontFamily:"var(--font-fredoka)" }}>
          Bubble <span className="text-[#ff8c6b]">Letters!</span>
        </h1>
        <p className="text-white/50 text-sm font-medium mb-8 leading-relaxed">
          Pop the floating bubbles in the right order to spell the animal name!
        </p>
        <div className="flex flex-col gap-3 w-full mb-10">
          {[
            { icon:"🐾", text:"Look at the animal picture" },
            { icon:"🫧", text:"Find the letters in bubbles" },
            { icon:"👆", text:"Pop them in order to spell" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-left">
              <span className="text-2xl">{item.icon}</span>
              <span className="text-white/60 text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </div>
        <button
          onClick={startGame}
          className="w-full py-5 bg-[#ff6b4a] text-white font-black text-xl rounded-[2rem] shadow-xl shadow-[#ff6b4a]/20 hover:bg-[#ff5a36] hover:-translate-y-1 transition-all active:scale-[0.98]"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          Start Spelling!
        </button>
      </div>
    </main>
  );

  if (phase === "result") return (
    <main className="relative min-h-screen w-full bg-[#0d2b5e] overflow-hidden flex flex-col items-center justify-center p-6">
      <div className="w-32 h-32 mb-6 animate-bounce"><DonnaSVG happy={true}/></div>
      <h1 className="text-5xl text-white font-bold mb-2 text-center" style={{ fontFamily: "var(--font-fredoka)" }}>
        Spelling Star!
      </h1>
      <p className="text-white/50 mb-10">You're a master of words!</p>
      <div className="flex items-center gap-3 bg-white/5 border border-[#ff8c6b]/20 rounded-2xl px-10 py-6 mb-10">
        <span className="text-4xl">🐚</span>
        <div className="text-left">
          <div className="text-white/40 text-[10px] font-black uppercase tracking-widest">Total Shells</div>
          <div className="text-3xl text-[#ff8c6b] font-black">+{shells}</div>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button
          onClick={startGame}
          className="w-full py-5 bg-[#ff6b4a] text-white font-black text-xl rounded-[2rem] shadow-xl hover:bg-[#ff5a36] transition-all"
        >
          Play Again
        </button>
        <Link href="/map" onClick={() => playClick()} className="text-center py-4 text-white/30 hover:text-white text-sm font-bold transition-all uppercase tracking-widest">
          Back to Map
        </Link>
      </div>
    </main>
  );

  return (
    <main className="relative min-h-screen w-full bg-[#0d2b5e] overflow-hidden flex flex-col items-center p-6">
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"/>
      <nav className="w-full flex justify-between items-center z-20 mb-4">
        <Link href="/map" onClick={() => playClick()}>
          <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/60 text-xs font-black uppercase tracking-widest transition-all">
            Back
          </button>
        </Link>
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 font-black text-sm">
          <span className="text-[#ff8c6b]">{shells}</span>
          <span className="text-white/40 uppercase text-[10px]">shells</span>
        </div>
      </nav>

      <div className="w-full max-w-xl z-10 flex flex-col items-center gap-6">
        <div className="w-full flex items-end justify-between gap-4 mt-4">
          <div className="flex flex-col items-center gap-2">
            <div className="relative w-52 h-52 md:w-60 md:h-60 bg-white/5 border border-white/10 rounded-[2.5rem] p-6 flex items-center justify-center shadow-lg overflow-hidden">
              <Image src={current.src} alt={current.animal} fill className="object-contain p-4"/>
            </div>
            <span className="text-white/50 text-[10px] font-black uppercase tracking-[0.2em]">{current.animal}</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className={`w-32 h-32 transition-transform duration-300 ${donnaHappy ? "scale-110" : "scale-100"}`}>
              <DonnaSVG happy={donnaHappy}/>
            </div>
            {feedback === "correct" && (
              <span className="text-[#ff8c6b] text-xs font-black animate-bounce uppercase">Correct! 🔊</span>
            )}
            {feedback === "wrong" && (
              <span className="text-white/40 text-xs font-black uppercase">Try Again!</span>
            )}
          </div>
        </div>

        {/* Word Display */}
        <div className="flex gap-2">
          {current.word.split("").map((letter, i) => (
            <div
              key={i}
              className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center text-2xl font-black transition-all ${
                popped.length > i
                  ? "bg-[#ff6b4a] border-[#ff6b4a] text-white"
                  : "bg-white/5 border-white/10 text-white/10"
              }`}
            >
              {popped.length > i ? letter : ""}
            </div>
          ))}
        </div>

        {/* Bubble Area */}
        <div className="relative w-full h-80 bg-white/[0.02] border border-white/5 rounded-[2.5rem] overflow-hidden mt-2">
          {bubbles.map((bubble) => {
            const isPopped = popped.includes(bubble.id);
            return (
              <button
                key={bubble.id}
                onClick={() => handlePop(bubble)}
                disabled={isPopped}
                style={{ left: `${bubble.x}%`, top: `${bubble.y}%` }}
                className={`absolute w-14 h-14 rounded-full border-2 font-black text-xl transition-all duration-300 transform
                  ${isPopped
                    ? "opacity-0 scale-0 pointer-events-none"
                    : "bg-white/10 border-white/20 text-white hover:scale-125"
                  }`}
              >
                {bubble.letter}
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}
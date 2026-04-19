"use client";
import Link from "next/link";
import Image from "next/image";
import { playClick } from "@/lib/sound"; // Import added

export default function IntroScreen() {
  return (
    <main className="relative min-h-screen w-full bg-[#0d2b5e] overflow-hidden flex items-center justify-center p-4">
      
      {/* 1. BACKGROUND GLOWS */}
      <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[450px] h-[450px] rounded-full bg-blue-500/25 blur-[80px] pointer-events-none" />

      {/* 2. OCEAN FLOOR WAVES */}
      <div className="absolute bottom-0 left-0 w-full h-[120px] opacity-25 pointer-events-none z-0">
        <Image 
          src="/images/wave.svg" 
          alt="Ocean Waves" 
          fill 
          className="object-cover" 
        />
      </div>

      {/* 3. MAIN CONTENT TRAY */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 w-full max-w-6xl px-6">
        
        {/* DONNA SECTION */}
        <div className="flex flex-col items-center animate-bob">
          <Image 
            src="/images/donna.svg" 
            alt="Donna the Starfish" 
            width={280} 
            height={280} 
            priority 
            className="drop-shadow-2xl"
          />
          <div className="mt-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-6 py-3 shadow-xl">
            <p className="text-white font-bold text-xl tracking-wide" style={{ fontFamily: 'var(--font-nunito), sans-serif' }}>
              Hi! I'm <span className="text-[#ff8c6b]">Donna!</span>
            </p>
          </div>
        </div>

        {/* WELCOME SECTION */}
        <div className="flex flex-col max-w-md text-center md:text-left">
          {/* Age Label Pill */}
          <div className="inline-flex items-center gap-2 bg-[#ff6b4a]/20 rounded-full px-4 py-2 mb-6 w-fit mx-auto md:mx-0 border border-[#ff6b4a]/30">
            <div className="w-2 h-2 rounded-full bg-[#ff6b4a] animate-pulse" />
            <span className="text-[10px] font-black text-[#ff6b4a] uppercase tracking-[0.2em]">
              For ages 2 to 5
            </span>
          </div>

          {/* BUBBLY TITLE */}
          <h1 
            className="text-5xl md:text-7xl text-white leading-[1.1] mb-6" 
            style={{ fontFamily: 'var(--font-fredoka), cursive', fontWeight: '700' }}
          >
            Welcome to <br />
            <span className="text-[#ff8c6b]">GameEd!</span>
          </h1>

          {/* INTERACTIVE BUTTONS */}
          <div className="flex flex-col gap-4 w-full max-w-sm mx-auto md:mx-0">
            <Link href="/login" onClick={() => playClick()} className="w-full"> {/* Sound added */}
              <button className="w-full py-4 bg-[#ff6b4a] hover:bg-[#ff5a36] text-white font-black text-lg rounded-2xl shadow-[0_8px_0_rgb(200,70,40)] hover:shadow-[0_4px_0_rgb(200,70,40)] hover:translate-y-[4px] transition-all active:translate-y-[6px] active:shadow-none">
                Login
              </button>
            </Link>
            <Link href="/signup" onClick={() => playClick()}> {/* Sound added */}
              <button className="w-full py-4 bg-white/5 border-2 border-white/10 text-white font-bold text-lg rounded-2xl hover:bg-white/10 transition-all backdrop-blur-sm active:scale-95">
                Create Account
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* FOOTER TERMS */}
      <p className="absolute bottom-8 text-[11px] text-white/30 font-medium tracking-wider">
        By continuing you agree to our <span className="underline cursor-pointer hover:text-white/50">Terms</span> and <span className="underline cursor-pointer hover:text-white/50">Privacy</span>
      </p>
    </main>
  );
}
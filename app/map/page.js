"use client";
import Link from "next/link";
import Image from "next/image";
import { playClick } from "@/lib/sound"; // Import added

const ZONES = [
  { id: 'english', title: 'English Cove', subtitle: 'Bubble Letters', icon: 'A', borderColor: 'border-t-[#ff8c6b]', href: '/games/bubble-letters' },
  { id: 'math', title: 'Math Lagoon', subtitle: 'Count the Fish', icon: '1+1', borderColor: 'border-t-[#8eb9ff]', href: '/games/count-the-fish' },
  { id: 'gk', title: 'GK Shipwreck', subtitle: 'Weather Watch', icon: '☀️', borderColor: 'border-t-[#5eead4]', href: '/games/weather-watch' },
  { id: 'art', title: 'Art Grotto', subtitle: 'Color the Reef', icon: '★', borderColor: 'border-t-[#c084fc]', href: '/games/color-the-reef' },
];

export default function SeaMap() {
  return (
    <main className="relative h-screen w-full bg-[#0d2b5e] overflow-hidden flex flex-col items-center p-8 justify-between">
      
      {/* 1. TOP NAVIGATION BAR */}
      <nav className="w-full flex justify-between items-center z-20">
        <div className="text-2xl font-black text-white" style={{ fontFamily: 'var(--font-fredoka)' }}>
          Game<span className="text-[#ff8c6b]">Ed</span>
        </div>
        <Link href="/settings" onClick={() => playClick()}> {/* Sound added here */}
          <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors backdrop-blur-md">
            ⚙️
          </button>
        </Link>
      </nav>

      {/* 2. HEADER SECTION */}
      <div className="flex flex-col items-center text-center z-10">
        <div className="relative mb-2 animate-bob">
          <Image 
            src="/images/donna.svg" 
            alt="Donna" 
            width={150} 
            height={150} 
            className="drop-shadow-[0_0_20px_rgba(255,140,107,0.4)]" 
          />
        </div>
        <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Ready to explore?</p>
        <h1 className="text-4xl md:text-5xl text-white font-bold leading-tight" style={{ fontFamily: 'var(--font-fredoka)' }}>
          Choose your <span className="text-[#ff8c6b]">Zone!</span>
        </h1>
      </div>

      {/* 3. THE ZONE GRID SECTION */}
      <div className="w-full max-w-4xl z-10 flex flex-col justify-center flex-1">
        
        <div className="flex items-center justify-center gap-6 mt-12 mb-8">
          <div className="h-px w-16 bg-white/10" />
          <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] whitespace-nowrap">Ocean Zones</span>
          <div className="h-px w-16 bg-white/10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 max-w-3xl mx-auto w-full">
          {ZONES.map((zone) => (
            <Link href={zone.href} key={zone.id} onClick={() => playClick()}> {/* Sound added to each card */}
              <div 
                className={`group relative bg-white/[0.03] backdrop-blur-xl border border-white/10 ${zone.borderColor} border-t-4 rounded-[1.5rem] p-5 md:p-6 transition-all hover:bg-white/[0.06] hover:-translate-y-1 cursor-pointer`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-2xl font-black text-white/5 mb-2 group-hover:text-white/10 transition-colors">
                      {zone.icon}
                    </div>
                  
                    <h3 className="text-xl text-white font-bold mb-0.5" style={{ fontFamily: 'var(--font-fredoka)' }}>
                      {zone.title}
                    </h3>
                    
                    <p className="text-white/40 text-xs font-medium">{zone.subtitle}</p>
                  </div>
                  
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/20 group-hover:border-[#ff8c6b] group-hover:text-[#ff8c6b] transition-all">
                    <span className="text-lg">→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 4. BACKGROUND DECORATION */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-100px] -right-20 w-[600px] h-[600px] bg-blue-400/10 blur-[150px] rounded-full pointer-events-none" />
    </main>
  );
}
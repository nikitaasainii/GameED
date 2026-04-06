"use client";
import { useState } from "react";
import Link from "next/link";

export default function ParentSettings() {
  // --- STATE MANAGEMENT ---
  const [minutes, setMinutes] = useState(30);
  const [showOTP, setShowOTP] = useState(false);
  const [otpValue, setOtpValue] = useState("");

  // Logic for Screen Time adjustment
  const increaseTime = () => setMinutes(prev => Math.min(prev + 5, 120));
  const decreaseTime = () => setMinutes(prev => Math.max(prev - 5, 5));

  return (
    <main className="relative h-screen w-full bg-[#0d2b5e] overflow-hidden flex flex-col items-center p-6 md:p-10">
      
      {/* 1. OTP MODAL OVERLAY */}
      {showOTP && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 transition-all">
          {/* Dark Blurred Backdrop */}
          <div 
            className="absolute inset-0 bg-[#071933]/60 backdrop-blur-xl animate-in fade-in duration-300" 
            onClick={() => setShowOTP(false)} 
          />
          
          {/* OTP Input Card */}
          <div className="relative z-10 w-full max-w-sm bg-[#162e55]/90 border border-white/20 rounded-[3rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#ff8c6b]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#ff8c6b]/30">
                <span className="text-2xl">📩</span>
              </div>
              <h3 className="text-2xl text-white font-bold mb-2" style={{ fontFamily: 'var(--font-fredoka)' }}>Parent Check</h3>
              <p className="text-white/40 text-[11px] leading-relaxed">
                Enter the 4-digit code sent to your email to verify these changes.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <input 
                type="text" 
                maxLength={4}
                value={otpValue}
                onChange={(e) => setOtpValue(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder="• • • •"
                className="w-full bg-white/5 border-2 border-white/10 rounded-2xl py-4 text-center text-4xl font-black text-[#ff8c6b] tracking-[0.4em] focus:border-[#ff8c6b] focus:outline-none transition-all placeholder:text-white/10"
              />
              
              <button 
                onClick={() => {
                   alert("Changes Verified and Saved!"); 
                   setShowOTP(false);
                   setOtpValue("");
                }}
                className="w-full py-4 bg-[#ff6b4a] text-white font-black rounded-2xl shadow-lg hover:bg-[#ff5a36] transition-all active:scale-95"
              >
                Verify & Save
              </button>
              
              <button 
                onClick={() => setShowOTP(false)}
                className="text-white/20 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. TOP NAVIGATION */}
      <nav className="w-full flex justify-between items-center z-20 mb-6">
        <div /> {/* Spacer for Left Side */}
        <Link href="/map">
          <button className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-white/70 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-md">
            ← Back to Map
          </button>
        </Link>
      </nav>

      {/* 3. SETTINGS CONTENT CONTAINER */}
      <div className="w-full max-w-2xl z-10 flex flex-col overflow-y-auto pr-2 custom-scrollbar">
        
        {/* Parent Warning Box */}
        <div className="bg-[#ff6b4a]/10 border border-[#ff6b4a]/20 rounded-[1.5rem] p-5 mb-8 flex items-start gap-4">
          <span className="text-lg">🔒</span>
          <p className="text-[11px] text-white/70 leading-relaxed font-medium">
            This section is <span className="text-[#ff8c6b] font-bold">parent only</span>. Changes require OTP verification for your child's safety.
          </p>
        </div>

        {/* Title Group */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-4xl text-white font-bold mb-1" style={{ fontFamily: 'var(--font-fredoka)' }}>Parent Settings</h1>
          
        </div>

        {/* SECTION: SCREEN TIME */}
        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 mb-6 backdrop-blur-sm">
          <div className="flex justify-between items-center mb-8">
             <h2 className="text-xl text-white font-bold">Screen Time</h2>
             <div className="w-12 h-6 bg-[#ff6b4a] rounded-full relative cursor-pointer shadow-[0_0_15px_rgba(255,140,107,0.2)]">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
             </div>
          </div>
          
          <div className="flex justify-between items-center pt-2 border-t border-white/5 mt-4 pt-6">
            <div>
              <div className="text-sm text-white font-bold mb-1">Daily Limit</div>
              <div className="text-[10px] text-white/30 font-medium">Auto-lock app after time expires</div>
            </div>

            <div className="flex items-center gap-4">
              <button onClick={decreaseTime} className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white text-xl hover:bg-white/10 active:scale-90 transition-all">−</button>
              <div className="flex items-baseline gap-2 bg-white/5 px-5 py-2 rounded-2xl border border-[#ff8c6b]/30 min-w-[100px] justify-center">
                <span className="text-white font-black text-2xl">{minutes}</span>
                <span className="text-white/30 text-[10px] font-bold uppercase">mins</span>
              </div>
              <button onClick={increaseTime} className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white text-xl hover:bg-white/10 active:scale-90 transition-all">+</button>
            </div>
          </div>
        </div>

        {/* SECTION: ACCOUNT PREVIEW */}
        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 mb-10">
          <div className="space-y-6">
            {[
              { label: 'Parent Email', value: 'sarah@email.com' },
              { label: 'Child Profile', value: 'Emma' }
            ].map((field) => (
              <div key={field.label} className="flex flex-col gap-2">
                <label className="text-[9px] uppercase font-black text-white/20 tracking-[0.3em] ml-1">{field.label}</label>
                <div className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-sm text-white/50 font-medium">
                  {field.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col gap-4 mb-10">
          <button 
            onClick={() => setShowOTP(true)}
            className="w-full py-5 bg-[#ff6b4a] text-white font-black text-lg rounded-[2rem] shadow-xl shadow-[#ff6b4a]/20 hover:bg-[#ff5a36] hover:-translate-y-1 transition-all active:translate-y-0 active:scale-[0.98]"
          >
            Save Changes
          </button>
          
          <Link href="/" className="w-full text-center">
            <button className="py-2 text-white/20 hover:text-red-400 text-[10px] font-bold uppercase tracking-widest transition-all">
              Sign Out
            </button>
          </Link>
        </div>
      </div>

      {/* BACKGROUND DECOR */}
      <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-0 -right-20 w-[500px] h-[500px] bg-[#ff8c6b]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
    </main>
  );
}
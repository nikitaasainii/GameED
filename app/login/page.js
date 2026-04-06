"use client";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen w-full bg-[#0d2b5e] overflow-hidden flex items-center justify-center p-6">
      {/* Background Glows (Same as Intro for consistency) */}
      <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />
      
      {/* Back Button */}
      <Link href="/" className="absolute top-8 left-8 text-white/50 hover:text-white flex items-center gap-2 transition-all">
        <span>← Back to Home</span>
      </Link>

      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-8 md:p-12 shadow-2xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl text-white mb-2" style={{ fontFamily: 'var(--font-fredoka)', fontWeight: '700' }}>
            Welcome Back!
          </h2>
          <p className="text-white/60" style={{ fontFamily: 'var(--font-nunito)' }}>
            Log in to continue your adventure
          </p>
        </div>

        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-white/80 text-sm font-bold ml-2">Email Address</label>
            <input 
              type="email" 
              placeholder="parent@email.com"
              className="w-full py-4 px-6 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-[#ff6b4a] transition-all"
            />
          </div>
          <Link href="/map">
          <button className="w-full py-4 bg-[#ff6b4a] text-white font-black text-lg rounded-2xl shadow-[0_6px_0_rgb(200,70,40)] active:translate-y-[4px] active:shadow-none transition-all mt-4">
            Start Playing
          </button>
          </Link>
        </form>
      </div>
    </main>
  );
}
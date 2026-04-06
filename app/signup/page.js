"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Added for redirection

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = (e) => {
    e.preventDefault();
    // This is where the database logic will go tomorrow!
    // For now, we simulate a successful signup and go to the map.
    router.push("/map");
  };

  return (
    <main className="relative min-h-screen w-full bg-[#0d2b5e] overflow-hidden flex items-center justify-center p-6">
      
      {/* Background Glows */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-[#ff8c6b]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Back Button */}
      <Link href="/" className="absolute top-8 left-8 text-white/40 hover:text-white flex items-center gap-2 transition-all text-[10px] font-black uppercase tracking-widest z-20">
        <span>← Back</span>
      </Link>

      <div className="relative z-10 w-full max-w-lg bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl">
        
        {/* Donna Icon Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative mb-4 animate-bob">
            <Image src="/images/donna.svg" alt="Donna" width={70} height={70} className="drop-shadow-lg" />
            <div className="absolute inset-0 bg-[#ff8c6b]/20 blur-xl rounded-full -z-10" />
          </div>
          <h2 className="text-4xl text-white font-bold mb-2" style={{ fontFamily: 'var(--font-fredoka)' }}>
            Start Your <span className="text-[#ff8c6b]">Journey!</span>
          </h2>
          <p className="text-white/30 text-xs font-medium uppercase tracking-wide">Create a parent account to play</p>
        </div>

        <form onSubmit={handleSignup} className="flex flex-col gap-5">
          {/* Parent Name */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-black text-white/30 tracking-widest ml-2">Parent Name</label>
            <input 
              required
              type="text" 
              placeholder="Your Name" 
              className="w-full py-4 px-6 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-[#ff8c6b] transition-all" 
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-black text-white/30 tracking-widest ml-2">Email Address</label>
            <input 
              required
              type="email" 
              placeholder="parent@email.com" 
              className="w-full py-4 px-6 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-[#ff8c6b] transition-all" 
            />
          </div>

          {/* Child's Name */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-black text-white/30 tracking-widest ml-2">Child's Name</label>
            <input 
              required
              type="text" 
              placeholder="Their Name" 
              className="w-full py-4 px-6 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-[#ff8c6b] transition-all" 
            />
          </div>

          {/* Create Button */}
          <button 
            type="submit"
            className="w-full py-5 bg-[#ff6b4a] text-white font-black text-lg rounded-[2rem] shadow-xl shadow-[#ff6b4a]/20 hover:bg-[#ff5a36] hover:-translate-y-1 transition-all mt-4 active:translate-y-0 active:scale-[0.98]"
          >
            Create Account & Play
          </button>
        </form>

        <p className="text-center mt-8 text-white/30 text-xs font-medium">
          Already have an account? <Link href="/login" className="text-[#ff8c6b] font-bold hover:underline">Login here</Link>
        </p>
      </div>
    </main>
  );
}
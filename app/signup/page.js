"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase"; 
import { playClick } from "@/lib/sound"; // Import added

export default function SignupPage() {
  const router = useRouter();

  const [parentName, setParentName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [childName, setChildName] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    playClick(); // Sound added here
    setLoading(true);
    setErrorMsg("");

    try {
      // 1. Create the Auth User in Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // 2. Insert into the 'parents' table
        const { error: parentError } = await supabase
          .from("parents")
          .insert([
            {
              name: parentName,
              email: email,
            },
          ]);

        if (parentError) throw parentError;

        // 3. Insert into the 'children' table
        const { error: childError } = await supabase
          .from("children")
          .insert([
            {
              parent_id: authData.user.id, 
              name: childName,
            },
          ]);

        if (childError) throw childError;

        // 4. If everything worked, head to the map!
        router.push("/map");
      }
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full bg-[#0d2b5e] overflow-hidden flex items-center justify-center p-6">
      
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-[#ff8c6b]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Back Button with Sound */}
      <Link 
        href="/" 
        onClick={() => playClick()} 
        className="absolute top-8 left-8 text-white/40 hover:text-white flex items-center gap-2 transition-all text-[10px] font-black uppercase tracking-widest z-20"
      >
        <span>← Back</span>
      </Link>

      <div className="relative z-10 w-full max-w-lg bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl">
        
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

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-xs text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSignup} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-black text-white/30 tracking-widest ml-2">Parent Name</label>
            <input 
              required
              type="text" 
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              placeholder="Your Name" 
              className="w-full py-4 px-6 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-[#ff8c6b] transition-all" 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-black text-white/30 tracking-widest ml-2">Email Address</label>
            <input 
              required
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="parent@email.com" 
              className="w-full py-4 px-6 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-[#ff8c6b] transition-all" 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-black text-white/30 tracking-widest ml-2">Password</label>
            <input 
              required
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              className="w-full py-4 px-6 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-[#ff8c6b] transition-all" 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-black text-white/30 tracking-widest ml-2">Child's Name</label>
            <input 
              required
              type="text" 
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder="Their Name" 
              className="w-full py-4 px-6 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-[#ff8c6b] transition-all" 
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-[#ff6b4a] text-white font-black text-lg rounded-[2rem] shadow-xl shadow-[#ff6b4a]/20 hover:bg-[#ff5a36] hover:-translate-y-1 transition-all mt-4 active:translate-y-0 active:scale-[0.98] disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {loading ? "Creating..." : "Create Account & Play"}
          </button>
        </form>

        <p className="text-center mt-8 text-white/30 text-xs font-medium">
          Already have an account? <Link href="/login" onClick={() => playClick()} className="text-[#ff8c6b] font-bold hover:underline">Login here</Link>
        </p>
      </div>
    </main>
  );
}
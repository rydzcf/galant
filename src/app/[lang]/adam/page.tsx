"use client"
import BlogAdminPanel from "@/components/BlogAdminPanel";
import { useFireBase } from "@/hooks/useFireBase";
import { div } from "framer-motion/client";

export default function AdminPage() {
    const { user, signInWithGoogle, signOut, fbError } = useFireBase();
    console.log(user, fbError);
    if (!user) {
      return (
        <div className="h-screen w-full flex justify-center items-center flex-col">
          <button
            className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-full font-bold transition-transform active:scale-95"
            onClick={signInWithGoogle}>
            Log in with Google
          </button>
          {fbError ? <div className="text-xs text-center mt-2">{fbError.message}</div> : null}
        </div>
      );
    }
    return <div className="pt-20">
      <BlogAdminPanel />; 
      </div>
}
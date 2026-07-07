"use client"
import BlogAdminPanel from "@/components/BlogAdminPanel";
import { useFireBase } from "@/hooks/useFireBase";

export default function AdminPage() {
    const { user, signInWithGoogle, signOut, fbError } = useFireBase();
    console.log(user, fbError);
    if (!user) {
      return (
        <div className="h-screen w-full flex justify-center items-center flex-col">
          <button
            className="cursor-pointer flex mx-auto border border-black px-2 py-1"
            onClick={signInWithGoogle}>
            Log in with Google
          </button>
          {fbError ? <div className="text-xs text-center mt-2">{fbError.message}</div> : null}
        </div>
      );
    }
    return <BlogAdminPanel />; 
}
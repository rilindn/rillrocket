import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login() {
  const { data: session, status } = useSession()
  const router = useRouter()
  console.log("🚀 ~ file: index.js:5 ~ Home ~ session", session)
  
 
  useEffect(() => {
    if (status === "authenticated") {
      router.push('/home')
    }
  }, [status]);

  return (
    <section className="grid h-screen place-items-center">
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Welcome To 
          <span className="text-emerald-400"> RillRocket</span>
        </h2><br />
        <button
          type="button"
          onClick={() => signIn()}
          className="w-full px-3 py-2 text-sm font-medium text-center text-white bg-emerald-400 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          Login
        </button>
      </div>
    </section>
  );
}
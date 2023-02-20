import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()
  console.log("🚀 ~ file: index.js:5 ~ Home ~ session", session)

  useEffect(() => {
    if (status !== "authenticated") {
      router.push('/login')
    }
  }, [status]);

  return (
    <section className="grid h-screen place-items-center">
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Hi {session?.user?.name}</h2><br />
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">You are signed in as {session?.user?.email}.</p>
        <div className="flex gap-x-2">
          <button
            type="button"
            onClick={() => router.push('/chat')}
            className="w-1/2 px-3 py-2 text-sm font-medium text-center text-white bg-emerald-400 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            Chat
          </button>
          <button
            type="button"
            onClick={() => signOut()}
            className="w-1/2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
            Logout
          </button>
        </div>
      </div>
    </section>
  );
}
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const { Configuration, OpenAIApi } = require("openai");


export default function Login() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [prompt, setPrompt] = useState('')
  const [prompts, setPrompts] = useState([])
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  
 
  useEffect(() => {
    if (status !== "authenticated") {
      router.push('/login')
    }
  }, [status]);

  const handlePrompt = async () => {
    setPrompt('')
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0.3,
      max_tokens: 100,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    console.log("🚀 ~ file: chat.js:34 ~ handlePrompt ~ response:", response)
    const msg = response.data?.choices?.[0]?.text
    setPrompts([...prompts, {prompt, msg}])
  }

  return (
    <section className="grid h-screen place-items-center p-10">
      <div className="w-3/4 h-full bg-slate-300 flex flex-col justify-between rounded-lg p-3">
        <div>
           <h2 className="text-center text-2xl">Messages</h2>
          <div className="overflow-y-auto">
            {prompts.map(p => (
              <div key={p}>
                <p className="p-2 bg-slate-400 m-2 rounded-lg">{p.prompt}</p>
                <p className="p-2 bg-slate-500 m-2 rounded-lg">{p.msg}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-[60px] flex gap-x-2 p-2">
          <input value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-10/12 border border-black rounded-lg p-2"/>
          <button onClick={handlePrompt} className="w-2/12 bg-emerald-300 rounded-lg">Send</button>
        </div>
      </div>
    </section>
  );
}
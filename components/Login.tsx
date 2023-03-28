'use client'

import { signIn } from "next-auth/react"
import Image from "next/image"

function Login() {
    return <div className="bg-[#11A37F] flex flex-col items-center justify-center text-center h-screen">
        <Image
            src='https://links.papareact.com/2i6'
            width={300}
            height={300}
            alt="logo"
        />
        <button onClick={() => signIn('google')} className="text-white font-bold text-3xl animate-pulse">Sign In to use GepetaAI</button>
    </div>

}

export default Login
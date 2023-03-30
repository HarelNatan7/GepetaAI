'use client'

import { db } from '@/firebase'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import React, { FormEvent, useState } from 'react'
import { toast } from 'react-hot-toast'

type Props = {
    chatId: string
}

function ChatInput({ chatId }: Props) {

    const { data: session } = useSession()
    const [prompt, setPrompt] = useState('')

    // SWR
    const model = 'text-davinci-003'

    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!prompt) return
        const input = prompt.trim()
        setPrompt('')

        const message: Message = {
            text: input,
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar: session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name}`
            }
        }

        await addDoc(collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'), message)

        const notification = toast.loading('GepetaAI is thinking...')

        await fetch('/api/askQuestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: input,
                chatId,
                model,
                session
            })
        }).then(() => {
            toast.success('GepetaAI has responded!', {
                id: notification
            })
        })
    }

    return (
        <div className='bg-gray-700/50 text-gray-400 rounded-lg text-sm'>
            <form onSubmit={sendMessage} className='flex p-5 space-x-5 flex-1'>
                <input
                    className='bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300'
                    type="text"
                    disabled={!session}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder='Talk With The Gepeta From Here...'
                />
                <button className='bg-[#11A37F] hover:opacity-70 text-white font-bold
             px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed transition-all'
                    type='submit' disabled={!prompt || !session}>
                    <PaperAirplaneIcon className='h-4 w-4 -rotate-45' />
                </button>
            </form>
            <div>
                {/* Model */}
            </div>
        </div>
    )
}

export default ChatInput
'use client'

import { db } from '@/firebase'
import { collection, orderBy, query } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import Message from './Message'
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline'

type Props = {
    chatId: string
}

function Chat({ chatId }: Props) {

    const { data: session } = useSession()

    const [messages] = useCollection(session && query(
        collection(db, 'users', session.user?.email!, 'chats', chatId, 'messages'), orderBy('createdAt', 'asc')
    ))
    return <div className='flex-1 overflow-y-auto overflow-x-hidden'>

        {messages?.empty && (
            <>
                <p className="mt-10 text-center text-white">
                    Ask the Gepeta whatever you want!
                </p>
                <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 text-white animate-bounce" />
            </>
        )}

        {messages?.docs.map(m => <Message key={m.id} message={m.data()} />)}
    </div>

}

export default Chat
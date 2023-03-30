import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import React from 'react'

type Props = {
    chatId: string
}

function ChatInput({ chatId }: Props) {
  return (
    <div>
        <form className='p-5 space-x-5 flex-1'>
            <input type="text"
            placeholder='Talk With The Gepeta From Here...'
             />
             <button> <PaperAirplaneIcon className='h-4 w-4 -rotate-45' /> </button>
        </form>
        <div>
            {/* Model */}
        </div>
    </div>
  )
}

export default ChatInput
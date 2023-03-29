'use client'

import { signOut, useSession } from "next-auth/react"
import NewChat from "./NewChat"

function SideBar() {
    const {data: session} = useSession()

    return <div className="p-2 flex flex-col h-screen">
        <div className="flex-1">
            <div>
                <NewChat />
                <div>
                    {/* Model */}
                </div>
                {/* Map the ChatRows */}
            </div>
        </div>
{session && (
    <img onClick={() => signOut()} src={session.user?.image!} alt="User Image" className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-70 transition-all ease-out" />
)}
    </div>

}

export default SideBar
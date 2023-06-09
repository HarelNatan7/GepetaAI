import SideBar from '@/components/SideBar'
import { getServerSession } from 'next-auth'
import '@/styles/globals.css'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { SessionProvider } from '@/components/SessionProvider'
import Login from '@/components/Login'
import ClientProvider from '@/components/ClientProvider'
export const metadata = {
  title: 'GepetaAI',
  description: 'Generated by Next.js',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions)

  console.log('session:', session)

  return <html lang="en">
    <body>
      <SessionProvider session={session}>

        {!session ? (
          <Login />
        ) : (
          <div className='flex'>
            <div className='bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem] min-w-[60px]'>
              <SideBar />
            </div>

            <ClientProvider />
            
            <div className='bg-[#343541] flex-1'>{children}</div>

          </div>
        )}

      </SessionProvider>
    </body>
  </html>

}

import { auth } from '@/lib/auth'
import { LoginButton } from '@/components/auth/login-button'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function Home() {
  const session = await auth()

  return (
    <div className="flex-1">
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Smart bookmarking for the modern web
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Organize your web bookmarks, manage reading lists, and never lose track
            of important content again.
          </p>
          <div className="space-x-4">
            {session ? (
              <Button asChild>
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <LoginButton />
            )}
            <Button variant="outline" asChild>
              <Link href="/about">Learn more</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
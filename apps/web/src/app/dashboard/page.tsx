import { DashboardHeader } from '@/components/dashboard/header'
import { BookmarkList } from '@/components/bookmarks/bookmark-list'
import { AddBookmarkButton } from '@/components/bookmarks/add-bookmark-button'
import { getBookmarks } from '@/lib/api'

export default async function DashboardPage() {
  const bookmarks = await getBookmarks()

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <DashboardHeader 
        heading="Dashboard" 
        text="Manage your bookmarks and reading list."
      >
        <AddBookmarkButton />
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <div className="grid gap-4">
            <BookmarkList bookmarks={bookmarks} />
          </div>
        </div>

        <div className="col-span-3">
          <div className="grid gap-4">
            <div className="rounded-xl border bg-card text-card-foreground shadow">
              <div className="p-6">
                <h3 className="font-semibold leading-none tracking-tight">
                  Reading Progress
                </h3>
                {/* Add reading progress visualization */}
              </div>
            </div>

            <div className="rounded-xl border bg-card text-card-foreground shadow">
              <div className="p-6">
                <h3 className="font-semibold leading-none tracking-tight">
                  Categories
                </h3>
                {/* Add category management */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
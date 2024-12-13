import { Bookmark } from '@/types'
import { BookmarkCard } from './bookmark-card'

interface BookmarkListProps {
  bookmarks: Bookmark[]
}

export function BookmarkList({ bookmarks }: BookmarkListProps) {
  if (bookmarks.length === 0) {
    return (
      <div className="flex h-[450px] items-center justify-center rounded-md border border-dashed">
        <div className="text-center">
          <h3 className="text-lg font-medium">No bookmarks yet</h3>
          <p className="text-sm text-muted-foreground">
            Add your first bookmark using the Chrome extension or the button above.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-6">
      {bookmarks.map((bookmark) => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  )
}
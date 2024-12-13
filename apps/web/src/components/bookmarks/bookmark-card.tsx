import { Bookmark } from '@/types'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookmarkOptions } from './bookmark-options'
import { formatDistanceToNow } from 'date-fns'

interface BookmarkCardProps {
  bookmark: Bookmark
}

export function BookmarkCard({ bookmark }: BookmarkCardProps) {
  return (
    <Card>
      <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle>{bookmark.title}</CardTitle>
          <CardDescription>
            Saved {formatDistanceToNow(new Date(bookmark.savedAt), { addSuffix: true })}
          </CardDescription>
        </div>
        <BookmarkOptions bookmark={bookmark} />
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Category:</span>
            <span className="text-sm font-medium">{bookmark.category}</span>
          </div>
          {bookmark.description && (
            <p className="text-sm text-muted-foreground">{bookmark.description}</p>
          )}
          {bookmark.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {bookmark.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex space-x-2">
          <Button asChild variant="secondary">
            <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
              Open Link
            </a>
          </Button>
          <Button variant="outline">View Summary</Button>
        </div>
      </CardFooter>
    </Card>
  )
}
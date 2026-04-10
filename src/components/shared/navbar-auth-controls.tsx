'use client'

import Link from 'next/link'
import { Bookmark, ChevronDown, LayoutGrid, LogOut, Plus, Settings, User, FileText, Building2, Tag, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

type NavbarAuthControlsProps = { directoryNav?: boolean }

export function NavbarAuthControls({ directoryNav = false }: NavbarAuthControlsProps) {
  const { user, logout } = useAuth()

  return (
    <>
      {!directoryNav ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" className="hidden h-10 gap-1 rounded-full bg-[#ff2d55] px-4 text-white shadow-[0_12px_28px_rgba(255,45,85,0.28)] hover:bg-[#e6294d] sm:flex">
              <Plus className="h-4 w-4" />
              Create
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 border-zinc-200 bg-white">
            {SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => {
              const Icon = taskIcons[task.key] || LayoutGrid
              return (
                <DropdownMenuItem key={task.key} asChild>
                  <Link href={`/create/${task.key}`}>
                    <Icon className="mr-2 h-4 w-4" />
                    Create {task.label}
                  </Link>
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full text-zinc-600 hover:bg-[#ff2d55]/10 hover:text-[#ff2d55]">
            <Avatar className="h-9 w-9 border border-zinc-200">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 border-zinc-200 bg-white">
          <div className="flex items-center gap-3 p-3">
            <Avatar className="h-10 w-10 border border-zinc-200">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user?.name}</span>
              <span className="text-xs text-zinc-500">{user?.email}</span>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard/saved">
              <Bookmark className="mr-2 h-4 w-4" />
              Saved Items
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout} className="text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

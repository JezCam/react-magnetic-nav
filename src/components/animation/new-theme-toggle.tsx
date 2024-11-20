'use client'

import * as React from 'react'
import { Moon, MoonIcon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { flushSync } from 'react-dom'
import { useRef } from 'react'

export function NewThemeToggle() {
    const { setTheme } = useTheme()
    const ref = useRef<HTMLButtonElement>(null)

    const switchTheme = async (theme: string) => {
        /**
         * Return early if View Transition API is not supported
         * or user prefers reduced motion
         */
        if (
            !ref.current ||
            !document.startViewTransition ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
            setTheme(theme)
            return
        }

        await document.startViewTransition(() => {
            flushSync(() => {
                setTheme(theme)
            })
        }).ready

        const { top, left, width, height } = ref.current.getBoundingClientRect()
        const x = left + width / 2
        const y = top + height / 2
        const right = window.innerWidth - left
        const bottom = window.innerHeight - top
        const maxRadius = Math.hypot(
            Math.max(left, right),
            Math.max(top, bottom)
        )

        document.documentElement.animate(
            {
                clipPath: [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${maxRadius}px at ${x}px ${y}px)`,
                ],
            },
            {
                duration: 800,
                easing: 'ease-in-out',
                pseudoElement: '::view-transition-new(root)',
            }
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    className="rounded-full [&_svg]:size-5"
                    variant="outline"
                    size="icon"
                    ref={ref}
                >
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    className="pointer-events-none text-muted-foreground dark:pointer-events-auto dark:text-foreground"
                    onClick={() => switchTheme('light')}
                >
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="dark:pointer-events-none dark:text-muted-foreground"
                    onClick={() => switchTheme('dark')}
                >
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => switchTheme('system')}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

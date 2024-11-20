'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'

import {
    motion,
    useAnimation,
    useMotionValue,
    MotionValue,
    useTransform,
    animate,
} from 'motion/react'
import { interpolate } from 'flubber'

const getIndex = (_: any, index: number) => index

function useFlubber(progress: MotionValue<number>, paths: string[]) {
    return useTransform(progress, paths.map(getIndex), paths, {
        mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 0.1 }),
    })
}
const sun =
    'M11.01,7.01c1.13,0,2.15.46,2.87,1.21s1.12,1.69,1.12,2.78-.4,1.99-1.05,2.7c-.73.8-1.78,1.3-2.95,1.3s-2.16-.47-2.88-1.23-1.12-1.7-1.12-2.77c0-1.24.57-2.35,1.46-3.08.69-.57,1.58-.91,2.55-.91Z'
const moon =
    'M9.69,3.96c1.13,0,8.06,1.38,8.79,2.12s1.41,5.39,1.41,6.47-5.28.44-5.93,1.15c-.73.8-1.78,1.3-2.95,1.3s-2.16-.47-2.88-1.23-1.12-1.7-1.12-2.77c0-1.24-3.01-3.08-2.12-3.81.69-.57,3.84-3.23,4.8-3.23Z'
const paths = [sun, moon]

const springTransition = {
    type: 'spring',
    stiffness: 400,
    damping: 6,
}

export function ModeToggle() {
    const controls = useAnimation()
    const { setTheme, systemTheme, resolvedTheme } = useTheme()
    const [currentVariant, setCurrentVariant] = useState<string>()
    const ref = useRef<HTMLButtonElement>(null)

    const [pathIndex, setPathIndex] = useState(0)
    const progress = useMotionValue(pathIndex)
    const path = useFlubber(progress, paths)

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

        // Change icon state
        switch (theme) {
            case 'system':
                switch (systemTheme) {
                    case 'dark':
                        controls.start('sun')
                        setTimeout(() => setCurrentVariant('sun'), 1000)
                        break
                    default:
                        controls.start('moon')
                        setTimeout(() => setCurrentVariant('moon'), 1000)
                        break
                }
                break
            case 'dark':
                controls.start('sun')
                setTimeout(() => setCurrentVariant('sun'), 1000)
                break
            default:
                controls.start('moon')
                setTimeout(() => setCurrentVariant('moon'), 1000)
                break
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

    useEffect(() => {
        controls.start(resolvedTheme === 'dark' ? 'sun' : 'moon')
        setCurrentVariant(resolvedTheme === 'dark' ? 'sun' : 'moon')
        const animation = animate(progress, pathIndex, {
            duration: 0.8,
            ease: 'easeInOut',
            onComplete: () => {
                if (pathIndex === paths.length - 1) {
                    progress.set(0)
                    setPathIndex(1)
                } else {
                    setPathIndex(pathIndex + 1)
                }
            },
        })

        return () => animation.stop()
    }, [pathIndex])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    onMouseEnter={() =>
                        controls.start(
                            resolvedTheme === 'dark' ? 'hoverSun' : 'hoverMoon'
                        )
                    }
                    onMouseLeave={() =>
                        controls.start(
                            resolvedTheme === 'dark' ? 'sun' : 'moon'
                        )
                    }
                    ref={ref}
                    className="rounded-full [&_svg]:size-5"
                    variant="outline"
                    size="icon"
                >
                    <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 22 22"
                        stroke="hsl(var(--foreground))"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        animate={controls}
                        variants={{
                            moon: {
                                rotate: 0,
                            },
                            hoverMoon: {
                                rotate: 0,
                            },
                        }}
                        transition={springTransition}
                    >
                        <g>
                            <motion.path
                                d={path}
                                animate={controls}
                                variants={{
                                    sun: {
                                        d: 'M11.01,7.01c1.13,0,2.15.46,2.87,1.21s1.12,1.69,1.12,2.78-.4,1.99-1.05,2.7c-.73.8-1.78,1.3-2.95,1.3s-2.16-.47-2.88-1.23-1.12-1.7-1.12-2.77c0-1.24.57-2.35,1.46-3.08.69-.57,1.58-.91,2.55-.91Z',
                                        transition: {
                                            ease: 'easeInOut',
                                            delay: 0.05,
                                            duration: 3,
                                        },
                                    },
                                    hoverSun: {
                                        d: 'M9.69,3.96c1.13,0,8.06,1.38,8.79,2.12s1.41,5.39,1.41,6.47-5.28.44-5.93,1.15c-.73.8-1.78,1.3-2.95,1.3s-2.16-.47-2.88-1.23-1.12-1.7-1.12-2.77c0-1.24-3.01-3.08-2.12-3.81.69-.57,3.84-3.23,4.8-3.23Z',
                                        transition: {
                                            ease: 'easeInOut',
                                            delay: 0.05,
                                            duration: 3,
                                        },
                                    },
                                    moon: {
                                        d: 'M11.04,11.68c2.21,0,3.96-2.89,3.96-.68s-1.79,4-4,4-4-1.79-4-4,1.83.68,4.04.68Z',
                                        transition: {
                                            ease: 'easeInOut',
                                            delay: 0.05,
                                        },
                                    },
                                    hoverMoonk: {
                                        rotate: 45,
                                        transition: springTransition,
                                    },
                                }}
                            />
                            {[
                                'M11,3V1',
                                'M16.66,5.34l1.41-1.41',
                                'M19,11h2',
                                'M16.66,16.66l1.41,1.41',
                                'M11,19v2',
                                'M5.34,16.66l-1.41,1.41',
                                'M3,11H1',
                                'M5.34,5.34l-1.41-1.41',
                            ].map((ray, index) => (
                                <motion.path
                                    key={index}
                                    d={ray}
                                    animate={controls}
                                    variants={{
                                        sun: (i: number) => {
                                            console.log(currentVariant)
                                            return {
                                                pathLength: 1,
                                                scale: 1,
                                                x: 0,
                                                y: 0,
                                                transition: {
                                                    pathLength: {
                                                        ease: 'easeInOut',
                                                        duration: 0.3,
                                                        delay:
                                                            currentVariant ===
                                                            'moon'
                                                                ? i * 0.08
                                                                : 0.08,
                                                    },
                                                    x: {
                                                        ...springTransition,
                                                        delay:
                                                            currentVariant ===
                                                            'moon'
                                                                ? i * 0.08
                                                                : 0.08,
                                                    },
                                                    y: {
                                                        ...springTransition,
                                                        delay:
                                                            currentVariant ===
                                                            'moon'
                                                                ? i * 0.08
                                                                : 0.08,
                                                    },
                                                    scale: {
                                                        delay:
                                                            currentVariant ===
                                                            'moon'
                                                                ? i * 0.08
                                                                : 0.08,
                                                    },
                                                },
                                            }
                                        },
                                        hoverSun: {
                                            pathLength: 0.1,
                                            x: [
                                                0, -0.5, -1, -0.5, 0, 0.5, 1,
                                                0.5,
                                            ][index],
                                            y: [
                                                1, 0.5, 0, -0.5, -1, -0.5, 0,
                                                0.5,
                                            ][index],
                                            transition: {
                                                pathLength: {
                                                    ease: 'easeInOut',
                                                    duration: 0.3,
                                                },
                                                x: {
                                                    ...springTransition,
                                                },
                                                y: {
                                                    ...springTransition,
                                                },
                                            },
                                        },
                                        moon: {
                                            pathLength: 0.1,
                                            scale: 0,
                                            x: [0, -1, -2, -1, 0, 1, 2, 1][
                                                index
                                            ],
                                            y: [2, 1, 0, -1, -2, -1, 0, 1][
                                                index
                                            ],
                                            transition: {
                                                ease: 'easeInOut',
                                                duration: 0.1,
                                            },
                                        },
                                    }}
                                    custom={index + 1}
                                />
                            ))}
                        </g>
                    </motion.svg>
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

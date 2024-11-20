'use client'
import { interpolate } from 'flubber'
import React, { useState, useEffect } from 'react'
import {
    motion,
    animate,
    useMotionValue,
    useTransform,
    useAnimation,
} from 'motion/react'

const sun =
    'M11.01,7.01c1.05,0,2,.4,2.71,1.06.79.73,1.28,1.77,1.28,2.93,0,2.21-1.79,4-4,4s-4-1.79-4-4,1.8-3.99,4.01-3.99Z'
const moon =
    'M10,1c-2.49,2.49-2.49,6.51,0,9,2.49,2.49,6.51,2.49,9,0,0,4.97-4.03,9-9,9S1,14.97,1,10,5.03,1,10,1'

const paths = [sun, moon]

export default function AnimatedThemeIcon(props: { theme: 'light' | 'dark' }) {
    const controls = useAnimation()
    const [pathIndex, setPathIndex] = useState<number>(
        props.theme === 'dark' ? 0 : 1
    )
    const progress = useMotionValue(pathIndex)

    const [complete, setComplete] = useState<boolean>(true)

    const arrayOfIndex = paths.map((_, i) => i)
    const path = useTransform(progress, arrayOfIndex, paths, {
        mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 1 }),
    })

    const handleClick = () => {
        setComplete(false)
        const newPathIndex = 1 - pathIndex
        setPathIndex(newPathIndex)
        controls.start(newPathIndex.toString())
    }

    const handleMouseEnter = () => {
        complete && controls.start(pathIndex.toString() + 'hover')
    }
    const handleMouseLeave = () => {
        complete && controls.start(pathIndex.toString())
    }

    useEffect(() => {
        const animation = animate(progress, pathIndex, {
            duration: 0.4,
            ease: 'easeInOut',
        })

        return () => {
            animation.stop()
        }
    }, [pathIndex])

    useEffect(() => {
        if (props.theme === 'dark') {
            controls.start('0')
            setPathIndex(0)
        } else {
            controls.start('1')
            setPathIndex(1)
        }
    }, [props.theme])

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            className="cursor-pointer"
        >
            <motion.svg
                stroke="hsl(var(--foreground))"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 22 22"
                width={22}
                xmlns="http://www.w3.org/2000/svg"
                animate={controls}
                variants={{
                    '0': { rotate: 0, scale: 1 },
                    '0hover': { rotate: 0, scale: 1 },
                    '1': { rotate: 0, scale: 1 },
                    '1hover': { rotate: -15, scale: 0.9 },
                }}
                transition={{
                    duration: 0.2,
                    ease: 'easeInOut',
                }}
            >
                {/* sun and moon body */}
                <motion.path
                    stroke="hsl(var(--foreground))"
                    fill="none"
                    d={path}
                    animate={controls}
                    variants={{
                        '0': { scale: 1 },
                        '0hover': { scale: 0.8 },
                        '1': { scale: 1 },
                        '1hover': { scale: 1 },
                    }}
                    transition={{
                        duration: 0.2,
                        ease: 'easeInOut',
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
                        onAnimationComplete={() => {
                            if (index === 7) setComplete(true)
                        }}
                        variants={{
                            '0': (i: number) => {
                                return {
                                    pathLength: 1,
                                    scale: 1,
                                    x: 0,
                                    y: 0,
                                    transition: {
                                        duration: 0.2,
                                        ease: 'easeInOut',
                                        delay: pathIndex === 1 ? i * 0.1 : 0,
                                    },
                                }
                            },
                            '0hover': {
                                pathLength: 0.1,
                                x: [0, -0.5, -1, -0.5, 0, 0.5, 1, 0.5][index],
                                y: [1, 0.5, 0, -0.5, -1, -0.5, 0, 0.5][index],
                                transition: {
                                    duration: 0.2,
                                    ease: 'easeInOut',
                                },
                            },
                            '1': {
                                pathLength: 0.1,
                                scale: 0,
                                x: [0, -1, -2, -1, 0, 1, 2, 1][index],
                                y: [2, 1, 0, -1, -2, -1, 0, 1][index],
                                transition: {
                                    ease: 'easeInOut',
                                    duration: 0.2,
                                },
                            },
                        }}
                        custom={index + 1}
                    />
                ))}
                {['M18,1v4', 'M20,3h-4'].map((star, index) => (
                    <motion.path
                        key={index}
                        d={star}
                        animate={controls}
                        variants={{
                            '0': {
                                scale: 0,
                                pathLength: 0,
                                transition: {
                                    ease: 'easeInOut',
                                    duration: 0.2,
                                },
                            },
                            '1': {
                                scale: 1,
                                pathLength: 1,
                                transition: {
                                    ease: 'easeInOut',
                                    duration: 0.2,
                                    delay: 0.1,
                                },
                            },
                        }}
                    />
                ))}
            </motion.svg>
        </div>
    )
}

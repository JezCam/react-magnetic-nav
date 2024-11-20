'use client'
import { interpolate } from 'flubber'
import React, { useState, useEffect } from 'react'
import { motion, animate, useMotionValue, useTransform } from 'motion/react'

export default function SVGMorph(props: { paths: [string, string] }) {
    const [pathIndex, setPathIndex] = useState(0)
    const progress = useMotionValue(pathIndex)

    const arrayOfIndex = props.paths.map((_, i) => i)
    const path = useTransform(progress, arrayOfIndex, props.paths, {
        mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 1 }),
    })

    useEffect(() => {
        const animation = animate(progress, pathIndex, {
            duration: 0.4,
            ease: 'easeInOut',
        })

        return () => {
            animation.stop()
        }
    }, [pathIndex])

    return (
        <div
            onClick={() => setPathIndex(1 - pathIndex)}
            className="cursor-pointer"
        >
            <svg
                stroke="hsl(var(--foreground))"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 22 22"
                width={22}
                xmlns="http://www.w3.org/2000/svg"
            >
                {/*  */}
                <motion.path
                    stroke="hsl(var(--foreground))"
                    fill="none"
                    d={path}
                    transition={{
                        duration: 0.4,
                        ease: 'easeInOut',
                    }}
                />
            </svg>
        </div>
    )
}

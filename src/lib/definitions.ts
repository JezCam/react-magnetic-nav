export const implementationCode = `import React from 'react'
import MagneticNav from './magnetic-nav'

export default function MagneticNavImplementation() {
    const navData = {
        links: [
            {
                name: 'Home',
                url: '/',
            },
            {
                name: 'About',
                url: '#',
            },
            {
                name: 'Contact',
                url: '#',
            },
        ],
    }

    return (
        <MagneticNav links={navData.links} />
    )
}
`

export const componentCode = `import React from 'react'

export default function MagneticNav(props: {
    links: { name: string; url: string }[]
    color?: string
    hoverBackgroundColor?: string
    hoverColor?: string
}) {
    return (
        <nav>
            <ul
                style={
                    {
                        '--color': props.color ?? 'rgba(0, 0, 0, .4)',
                        '--hover-background-color':
                            props.hoverBackgroundColor ?? 'rgba(0, 0, 0, .15)',
                        '--hover-color': props.hoverColor ?? 'rgba(0, 0, 0, 1)',
                    } as React.CSSProperties
                }
                className={\`flex text-[--color] transition-all before:pointer-events-none before:fixed before:left-[anchor(--anchor_left)] before:top-[anchor(--anchor_top)] before:z-[-1] before:h-[anchor-size(--anchor_height)] before:w-[anchor-size(--anchor_width)] before:rounded-md before:bg-[--hover-background-color] before:opacity-[var(--intent,0)] before:transition-all before:content-[""] [&:has(a:is(:focus-visible,:hover))]:[--intent:1] [&:has(a:target:is(:focus-visible,:hover))::after]:text-[--hoverColor]\`}
            >
                {props.links.map((link, index) => (
                    <li
                        key={index}
                        className="grid [&:has(a:is(:hover,:focus-visible))]:[anchor-name:--anchor]"
                    >
                        <a
                            href={link.url}
                            className="inline-block h-full w-full cursor-pointer px-[1.25rem] py-[.5rem] [&:is(:focus-visible,:hover)]:text-[--hover-color]"
                        >
                            {link.name}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
`;

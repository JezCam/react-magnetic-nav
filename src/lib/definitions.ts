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

export const componentCode = `import React from "react";

export default function MagneticNav(props: {
    links: { name: string; url: string }[];
}) {
    return (
        <nav>
            <ul
                className={\`flex text-primary/70 transition-all before:pointer-events-none before:fixed before:left-[anchor(--anchor_left)] before:top-[anchor(--anchor_top)] before:z-[-1] before:h-[anchor-size(--anchor_height)] before:w-[anchor-size(--anchor_width)] before:rounded-md before:bg-primary/10 before:opacity-[var(--intent,0)] before:transition-all before:content-[""] [&:has(a:is(:focus-visible,:hover))]:[--intent:1] [&:has(a:target:is(:focus-visible,:hover))::after]:text-primary\`}
            >
                {props.links.map((link, index) => (
                    <li
                        key={index}
                        className="grid [&:has(a:is(:hover,:focus-visible))]:[anchor-name:--anchor]"
                    >
                        <a
                            href={link.url}
                            className="inline-block h-full w-full cursor-pointer px-[1.25rem] py-[.5rem] [&:is(:focus-visible,:hover)]:text-primary"
                        >
                            {link.name}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

`;

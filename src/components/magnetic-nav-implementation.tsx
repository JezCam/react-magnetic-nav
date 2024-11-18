import React from 'react'
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

"use client";

import CopyButton from "@/components/copy-button";
import MagneticNavImplementation from "@/components/magnetic-nav-implementation";
import { ModeToggle } from "@/components/theme-toggle"
import { componentCode, implementationCode } from "@/lib/definitions"
import SyntaxHighlighter from 'react-syntax-highlighter'
import { stackoverflowDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'


export default function Home() {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="w-full flex gap-3 justify-between items-center">
          <h1 className="text-xl font-semibold">React Magnetic Nav</h1>
          <ModeToggle />
        </div>
        <div className="flex p-10">
          <MagneticNavImplementation />
        </div>
        <div className="relative flex flex-col gap-2 w-full">
          <div className="absolute right-7 top-10"><CopyButton text={implementationCode} /></div>
          <h2 className="font-medium text-sm ml-3">/components/magnetic-nav-implementation.tsx</h2>
          <div className="max-w-[800px] w-full h-[300px] rounded-xl overflow-y-scroll ">
            <SyntaxHighlighter language="typescript" style={stackoverflowDark}>
              {implementationCode}
            </SyntaxHighlighter>
          </div>
        </div>
        <div className="relative flex flex-col gap-2 w-full">
          <div className="absolute right-7 top-10"><CopyButton text={componentCode} /></div>
          <h2 className="font-medium text-sm ml-3">/components/magnetic-nav.tsx</h2>
          <div className="max-w-[800px] w-full h-[300px] rounded-xl overflow-y-scroll ">
            <SyntaxHighlighter language="typescript" style={stackoverflowDark}>
              {componentCode}
            </SyntaxHighlighter>
          </div>
        </div>

      </div>
    </div>
  )
}

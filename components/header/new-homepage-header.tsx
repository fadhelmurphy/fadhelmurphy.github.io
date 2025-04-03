import { useState } from 'react'
import { cn } from '@/Lib/utils'
import LogoSlider from '../logo-slider'
import BlueGradientBackground from '../background/blue-gradient-home'

export default function Header (): JSX.Element {
  const [activeButton, setActiveButton] = useState<'fulltime' | 'freelance'>('fulltime')

  const textLines = [
    ['Data', '&'],
    ['Software'],
    ['Engineer']
  ]

  return (
      <BlueGradientBackground className="min-h-screen">
        {/* Content */}
        <div className="relative z-10 flex min-h-[120vh] flex-col w-full items-center justify-center px-4 text-center">
          <h2 className="new-home-header-top-text">Hi, I&apos;m Fadhel</h2>
          <div className="relative flex flex-col items-center">
            {['new-home-header-text', 'new-home-header-text new-home-header-shadow-text'].map((className, idx) => (
              <div key={idx} className={className}>
                {textLines.map((line, lineIdx) => (
                  <h1 key={lineIdx} className="flex items-center justify-center space-x-5">
                    {line.map((word, wordIdx) => (
                      <span key={wordIdx} className={
                        idx === 0
                          ? (word === '&' ? 'highlight' : word === 'Engineer' ? 'highlight-2' : lineIdx === 0 ? 'white' : 'white-2')
                          : ''
                      }>
                        {word}
                      </span>
                    ))}
                  </h1>
                ))}
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-12 mb-16 flex items-center justify-center space-x-4">
            {['fulltime', 'freelance'].map((type) => (
              <button
                key={type}
                onClick={() => { setActiveButton(type as 'fulltime' | 'freelance') }}
                className={cn(
                  'rounded-full px-6 py-2 text-sm font-medium transition-all',
                  activeButton === type ? 'bg-white text-blue-500' : 'bg-white/30 text-white hover:bg-white/40'
                )}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {/* Logo slider */}
          <LogoSlider />
        </div>
      </BlueGradientBackground>
  )
}

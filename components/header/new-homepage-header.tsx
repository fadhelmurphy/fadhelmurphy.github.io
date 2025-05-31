// import { useState } from 'react'
import { cn } from '@/Lib/utils'
import LogoSlider from '../logo-slider'
import BlueGradientBackground from '../background/blue-gradient-home'

export default function Header (): JSX.Element {
  //   const [activeButton, setActiveButton] = useState<'fulltime' | 'freelance'>('fulltime')

  const textLines = [
    ['Data', '&'],
    ['Software'],
    ['Engineer']
  ]

  return (
        <BlueGradientBackground className="md:min-h-screen">
            {/* Content */}
            <div className="relative z-10 flex h-[100vh] mt-[30vh] md:mt-[unset] md:min-h-[120vh] flex-col w-full items-start md:items-center justify-center text-left md:text-center">
                <h2 className="ml-5 new-home-header-top-text">Hi, I&apos;m open to work for</h2>
                <div className="ml-5 relative flex flex-col items-start md:items-center">
                    {['new-home-header-text'].map((className, idx) => (
                        <div key={idx} className={className}>
                            {textLines.map((line, lineIdx) => (
                                <h1 key={lineIdx} className="flex items-center justify-start md:justify-center space-x-5">
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
                <div className="ml-5 mt-6 md:mt-12 md:mb-4 flex items-center justify-center space-x-4">
                    {['fulltime', 'freelance'].map((type) => (
                        <span
                            key={type}
                            className={cn(
                                `${type}-btn text-white rounded-full px-6 py-2 text-sm font-medium transition-all relative`
                            )}
                        >
                            <p className={`${type}-icon`} dangerouslySetInnerHTML={{ __html: '&bull;' }}/>
                            <p>{type.charAt(0).toUpperCase() + type.slice(1)}</p>
                        </span>
                    ))}
                </div>

                {/* Logo slider */}
                <LogoSlider />
            </div>
        </BlueGradientBackground>
  )
}

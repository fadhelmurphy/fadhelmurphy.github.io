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
        <BlueGradientBackground className="min-h-screen">
            {/* Content */}
            <div className="relative z-10 flex min-h-[120vh] flex-col w-full items-center justify-center text-center">
                <h2 className="new-home-header-top-text">Hi, I&apos;m Fadhel a</h2>
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
                <div className="mt-12 mb-4 flex items-center justify-center space-x-4">
                    {['fulltime', 'freelance'].map((type) => (
                        <button
                            key={type}
                            className={cn(
                                `${type}-btn text-white rounded-full px-6 py-2 text-sm font-medium transition-all relative`
                            )}
                        >
                            <span className={`${type}-icon`} dangerouslySetInnerHTML={{ __html: '&bull;' }}/>
                            <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                        </button>
                    ))}

                    <style>
                        {`
      .fulltime-btn, .freelance-btn {
        position: relative;
        padding-left: 2rem;
      }

      .fulltime-icon, .freelance-icon {
        position: absolute;
        left: 0.5rem;
        font-size: 3rem;
        top: 50%;
        transform: translateY(-50%);
        color: white;
      }

      .fulltime-btn {
        background: radial-gradient(
          82.56% 332.81% at 56.98% -109.38%,
          rgba(20, 168, 184, 0.56) 0%,
          rgba(20, 168, 184, 0.12) 76.76%
        );
        border: 2px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0px 8px 14px 3px rgba(110, 191, 228, 0.3);
        backdrop-filter: blur(2px);
        border-radius: 20px;
      }
      
      .freelance-btn {
        background: radial-gradient(
          82.56% 332.81% at 56.98% -109.38%,
          rgba(74, 140, 247, 0.56) 0%,
          rgba(74, 140, 247, 0.12) 76.76%
        );
        border: 2px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0px 8px 14px 3px rgba(129, 178, 250, 0.3);
        backdrop-filter: blur(2px);
        border-radius: 20px;
      }
    `}
                    </style>
                </div>

                {/* Logo slider */}
                <LogoSlider />
            </div>
        </BlueGradientBackground>
  )
}

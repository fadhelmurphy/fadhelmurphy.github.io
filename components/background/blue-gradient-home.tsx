'use client'

import React from 'react'

interface BlueGradientBackgroundProps {
  className?: string
  children?: React.ReactNode
}

export const BlueGradientBackground: React.FC<BlueGradientBackgroundProps> = ({ className = '', children }) => {
  return (
        <div className={`relative w-full h-full overflow-hidden ${className}`}>
            {/* Main gradient background - subtle blue gradient */}
            <div className='absolute hidden md:!block inset-0' style={{ zIndex: '3' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1512" height="982" viewBox="0 0 1512 982" fill="none" style={{
                  width: '100%',
                  height: '100%'
                }}>
                    <g filter="url(#filter0_f_333_14)">
                        <path d="M987.285 388.715C653.791 382.663 800.109 883.634 914.955 1134.88L1638.05 1048.37L1527.42 224.41C1486.33 281.7 1320.78 394.768 987.285 388.715Z" fill="url(#paint0_linear_333_14)" />
                    </g>
                    <g filter="url(#filter1_f_333_14)">
                        <path d="M260.583 481.756C91.9002 377.536 33.8747 117.16 25.9473 0L-258 695.252L111.721 846.249C85.2787 789.849 42.2388 666.285 81.615 623.229C130.835 569.409 471.437 612.032 260.583 481.756Z" fill="white" />
                    </g>
                    <defs>
                        <filter id="filter0_f_333_14" x="481.882" y="-75.5904" width="1456.17" height="1510.47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_333_14" />
                        </filter>
                        <filter id="filter1_f_333_14" x="-434.1" y="-176.1" width="939.017" height="1198.45" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="88.05" result="effect1_foregroundBlur_333_14" />
                        </filter>
                        <linearGradient id="paint0_linear_333_14" x1="1029.19" y1="767.671" x2="1418.18" y2="180.398" gradientUnits="userSpaceOnUse">
                            <stop offset="0.196229" stop-color="white" />
                            <stop offset="1" stop-color="white" stop-opacity="0" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <div className="base-bg-2-new-home-header z-2" />
            <div className="base-bg-1-new-home-header z-1" />
            <div className="base-bg-new-home-header z-0" />

            {/* Top-left visible squares */}
            <div className="absolute top-[7%] left-[22%] w-[35px] h-[35px] md:w-[75px] md:h-[75px] bg-[linear-gradient(180deg,_rgba(255,_255,_255,_0.5)_0%,_rgba(255,_255,_255,_0.1)_100%)] blur-[3px] z-10" />
            <div className="absolute top-[9%] md:top-[10%] left-[10%] md:left-[15%] w-[68px] h-[68px] md:w-[150px] md:h-[150px] bg-[linear-gradient(180deg,_rgba(255,_255,_255,_0.5)_0%,_rgba(255,_255,_255,_0.1)_100%)] z-10" />

            {/* Top-right visible squares */}
            <div className="absolute top-[12%] right-[20%] md:top-[2%] md:right-[20%] w-[98px] h-[98px] md:w-[150px] md:h-[150px] bg-[linear-gradient(180deg,_rgba(255,_255,_255,_0.5)_0%,_rgba(255,_255,_255,_0.1)_100%)] z-10" />
            <div className="absolute top-[16%] right-[-5%] md:top-[9%] md:right-[13%] w-[150px] h-[150px] md:w-[180px] md:h-[180px] bg-[linear-gradient(180deg,_rgba(255,_255,_255,_0.5)_0%,_rgba(255,_255,_255,_0.1)_100%)] blur-[6px] z-10" />

            {/* Bottom-left visible squares */}
            <div className="absolute bottom-[33%] left-[unset] right-[35%] md:right-[unset] md:bottom-[33%] md:left-[12%] w-[40px] h-[40px] md:w-[130px] md:h-[130px] bg-[linear-gradient(180deg,_rgba(255,_255,_255,_0.5)_0%,_rgba(255,_255,_255,_0.1)_100%)] blur-[3px] z-10" />
            <div className="absolute bottom-[28%] left-[unset] right-[22%] md:right-[unset] md:bottom-[45%] md:left-[20%] w-[65px] h-[65px] md:w-[70px] md:h-[70px] bg-[linear-gradient(180deg,_rgba(255,_255,_255,_0.5)_0%,_rgba(255,_255,_255,_0.1)_100%)] z-10" />

            {/* Bottom-right visible square */}
            <div className="absolute hidden md:!block bottom-[45%] right-[12%] w-[210px] h-[210px] bg-[linear-gradient(180deg,_rgba(255,_255,_255,_0.5)_0%,_rgba(255,_255,_255,_0.1)_100%)] blur-[10px] z-10" />

            {/* Additional square in bottom-right area */}
            <div className="absolute hidden md:!block bottom-[40%] right-[20%] w-[170px] h-[170px] bg-[linear-gradient(180deg,_rgba(255,_255,_255,_0.5)_0%,_rgba(255,_255,_255,_0.1)_100%)] z-10" />

            {/* Content container */}
            <div className="relative z-20 w-full h-full">{children}</div>
        </div>
  )
}

export default BlueGradientBackground

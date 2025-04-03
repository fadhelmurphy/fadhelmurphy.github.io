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
      <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-sky-200 to-blue-300 z-0" />

      {/* Top-left visible squares */}
      <div className="absolute top-[10%] left-[15%] w-[100px] h-[100px] bg-white/30 blur-[8px] z-10" />
      <div className="absolute top-[5%] left-[25%] w-[150px] h-[150px] bg-white/25 blur-[10px] z-10" />

      {/* Top-right visible squares */}
      <div className="absolute top-[5%] right-[15%] w-[120px] h-[120px] bg-white/30 blur-[8px] z-10" />
      <div className="absolute top-[15%] right-[25%] w-[180px] h-[180px] bg-white/25 blur-[10px] z-10" />

      {/* Center-left visible square */}
      <div className="absolute top-[40%] left-[30%] w-[80px] h-[80px] bg-white/20 blur-[8px] z-10" />

      {/* Bottom-left visible squares */}
      <div className="absolute bottom-[15%] left-[10%] w-[120px] h-[120px] bg-white/25 blur-[8px] z-10" />
      <div className="absolute bottom-[25%] left-[20%] w-[90px] h-[90px] bg-white/20 blur-[10px] z-10" />

      {/* Bottom-right visible square */}
      <div className="absolute bottom-[10%] right-[20%] w-[150px] h-[150px] bg-white/25 blur-[8px] z-10" />

      {/* Additional square in bottom-right area */}
      <div className="absolute bottom-[20%] right-[30%] w-[100px] h-[100px] bg-white/20 blur-[10px] z-10" />

      {/* Content container */}
      <div className="relative z-20 w-full h-full">{children}</div>
    </div>
  )
}

export default BlueGradientBackground

import React, { ReactNode } from 'react'
import Header from '../header'

const PageTemplate: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="bg-gradient-to-br from-pink-400 via-purple-500 to-fuchsia-600 relative">
      <div className="w-full h-[4px] bg-slate-50 absolute" />
      <div className="min-h-dvh flex flex-col max-w-md mx-auto">
        <Header />
        <div className="container text-slate-50 flex flex-col justify-between grow items-center">
          {children}
        </div>
      </div>
    </div>
  )
}

export default PageTemplate

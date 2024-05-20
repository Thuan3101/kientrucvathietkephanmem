import React, { ReactNode } from 'react'

type Props = {
  className?: string,
  children: ReactNode
}

const PrimaryButton = ({children, className}: Props) => {
  return (
    <button className={`inline-block font-medium rounded-md min-h-[40px] bg-primary text-white cursor-pointer hover:bg-[rgba(0,_166,_111,_0.8)] ${className}`}>
      {children}
    </button>
  )
}

export default PrimaryButton
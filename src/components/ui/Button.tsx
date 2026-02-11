"use client"
import React from 'react'
import clsx from 'clsx'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'ghost' | 'primary' | 'success'
}

export function Button({ variant = 'default', className, children, ...rest }: Props) {
  return (
    <button
      {...rest}
      className={clsx(
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-shadow',
        variant === 'primary' && 'bg-accent text-black shadow-md',
        variant === 'ghost' && 'bg-transparent border border-white/4',
        variant === 'success' && 'bg-green-500 text-black',
        className
      )}
    >
      {children}
    </button>
  )
}

export default Button

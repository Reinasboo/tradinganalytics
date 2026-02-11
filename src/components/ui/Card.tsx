"use client"
import React from 'react'
import clsx from 'clsx'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'glass'
}

export function Card({ variant = 'default', className, children, ...rest }: Props) {
  return (
    <div {...rest} className={clsx(variant === 'glass' ? 'glass' : 'card', className)}>
      {children}
    </div>
  )
}

export default Card

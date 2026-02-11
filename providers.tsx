"use client"
import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ToastContainer position="bottom-right" theme="dark" />
    </>
  )
}

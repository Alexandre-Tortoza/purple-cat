import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'icon'
  children?: ReactNode
}

export function Button({ variant = 'primary', className = '', children, ...props }: Props) {
  const base = 'inline-flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500'
  const styles: Record<string, string> = {
    primary: 'rounded-sm bg-purple-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-purple-700 hover:-translate-y-px hover:shadow-[0_6px_24px_rgba(168,85,247,0.4)]',
    ghost: 'rounded-sm px-4 py-2.5 text-sm font-medium text-zinc-400 hover:bg-purple-950/50 hover:text-zinc-200 hover:-translate-y-px hover:shadow-[0_6px_24px_rgba(168,85,247,0.4)]',
    icon: 'rounded-full h-10 w-10 text-zinc-400 hover:bg-purple-950/50 hover:text-zinc-200',
  }

  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

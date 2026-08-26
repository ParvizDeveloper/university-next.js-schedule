'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [theme, setTheme] = useState('dark')

  // При загрузке восстанавливаем тему из localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  // Переключение темы
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
    localStorage.setItem('theme', nextTheme)
  }

  const navItems = [
    { name: 'MAIN', href: '/' },
    { name: 'SCHEDULE', href: '/schedule' },
    { name: 'LEGENDS', href: '/legends' },
    { name: 'CONTACT', href: '/contact' },
  ]

  return (
    <>
      <header>
        <div className="nav-container">
          <nav>
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={pathname === item.href ? 'active' : ''}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
        <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
      </button>
    </>
  )
}
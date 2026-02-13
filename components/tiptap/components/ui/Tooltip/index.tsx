'use client'

import React, { useCallback, useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

import { TooltipProps } from './types'

const isMac = typeof window !== 'undefined' ? navigator.platform.toUpperCase().indexOf('MAC') >= 0 : false

const ShortcutKey = ({ children }: { children: string }) => {
  const className =
    'inline-flex items-center justify-center w-5 h-5 p-1 text-[0.625rem] rounded font-semibold leading-none border border-neutral-200 text-neutral-500 border-b-2'

  if (children === 'Mod') {
    return <kbd className={className}>{isMac ? '⌘' : 'Ctrl'}</kbd> // ⌃
  }

  if (children === 'Shift') {
    return <kbd className={className}>⇧</kbd>
  }

  if (children === 'Alt') {
    return <kbd className={className}>{isMac ? '⌥' : 'Alt'}</kbd>
  }

  return <kbd className={className}>{children}</kbd>
}

export const Tooltip = ({
  children,
  enabled = true,
  title,
  shortcut,
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const showTooltip = useCallback((event: Event) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    timeoutRef.current = setTimeout(() => {
      const rect = (event.target as HTMLElement).getBoundingClientRect()
      setPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 8
      })
      setIsVisible(true)
    }, 500)
  }, [])

  const hideTooltip = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsVisible(false)
  }, [])

  useEffect(() => {
    const element = triggerRef.current
    if (!element || !enabled) return

    element.addEventListener('mouseenter', showTooltip)
    element.addEventListener('mouseleave', hideTooltip)

    return () => {
      element.removeEventListener('mouseenter', showTooltip)
      element.removeEventListener('mouseleave', hideTooltip)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [enabled, showTooltip, hideTooltip])

  const tooltipContent = (
    <div
      className="fixed flex items-center gap-2 px-2.5 py-1 bg-white border border-neutral-100 rounded-lg shadow-sm pointer-events-none"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -100%)',
        zIndex: 99999,
        visibility: isVisible ? 'visible' : 'hidden',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.2s, visibility 0.2s'
      }}
    >
      {title && <span className="text-xs font-medium text-neutral-500">{title}</span>}
      {shortcut && (
        <span className="flex items-center gap-0.5">
          {shortcut.map(shortcutKey => (
            <ShortcutKey key={shortcutKey}>{shortcutKey}</ShortcutKey>
          ))}
        </span>
      )}
    </div>
  )

  return (
    <>
      <div ref={triggerRef} style={{ display: 'contents' }}>
        {children}
      </div>
      {enabled && typeof document !== 'undefined' && createPortal(tooltipContent, document.body)}
    </>
  )
}

export default Tooltip

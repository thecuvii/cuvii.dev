'use client'

import { useEffect, useState } from 'react'

export function ShenzhenClock() {
  const [time, setTime] = useState<string>('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const shenzhenTime = now.toLocaleTimeString('en-GB', {
        timeZone: 'Asia/Shanghai',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
      setTime(shenzhenTime)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!time) return null

  return (
    <div className='font-mono text-[10px] tracking-normal'>
      <div className='text-right tabular-nums'>{time}</div>
      <div className='text-right'>Shenzhen, China</div>
    </div>
  )
}

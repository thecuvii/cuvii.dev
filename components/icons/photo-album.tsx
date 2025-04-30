import type { SVGProps } from 'react'
import React from 'react'

type IconProps = SVGProps<SVGSVGElement> & {
  secondaryfill?: string
  strokewidth?: number
  title?: string
}

export function PhotoAlbum({ fill = 'currentColor', secondaryfill, ...props }: IconProps) {
  secondaryfill = secondaryfill || fill

  return (
    <svg aria-hidden='true' height='18' width='18' viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg' {...props}>
      <g fill={fill}>
        <path
          d='M4,14.75l5.836-5.836c.781-.781,2.047-.781,2.828,0l3.586,3.586'
          fill='none'
          stroke={secondaryfill}
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.5'
        />
        <rect
          height='11.5'
          width='14.5'
          fill='none'
          rx='2'
          ry='2'
          stroke={fill}
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.5'
          transform='translate(18 18) rotate(180)'
          x='1.75'
          y='3.25'
        />
        <circle cx='5.75' cy='7.25' fill={secondaryfill} r='1.25' stroke='none' />
        <line
          fill='none'
          stroke={fill}
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.5'
          x1='9'
          x2='9'
          y1='1.5'
          y2='3.25'
        />
        <line
          fill='none'
          stroke={fill}
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.5'
          x1='5.25'
          x2='5.25'
          y1='1.5'
          y2='3.25'
        />
        <line
          fill='none'
          stroke={fill}
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.5'
          x1='12.75'
          x2='12.75'
          y1='1.5'
          y2='3.25'
        />
      </g>
    </svg>
  )
}

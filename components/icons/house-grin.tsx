import type { SVGProps } from 'react'
import React from 'react'

type IconProps = SVGProps<SVGSVGElement> & {
  secondaryfill?: string
  strokewidth?: number
  title?: string
}

export function HouseGrinIcon({ fill = 'currentColor', secondaryfill, ...props }: IconProps) {
  secondaryfill = secondaryfill || fill

  return (
    <svg aria-hidden='true' height='18' width='18' viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg' {...props}>
      <g fill={fill}>
        <path
          d='M3.145,6.2l5.25-3.99c.358-.272,.853-.272,1.21,0l5.25,3.99c.249,.189,.395,.484,.395,.796v7.254c0,1.105-.895,2-2,2H4.75c-1.105,0-2-.895-2-2V6.996c0-.313,.146-.607,.395-.796Z'
          fill='none'
          stroke={fill}
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.5'
        />
        <path
          d='M8,11h2c.276,0,.5,.224,.5,.5h0c0,.828-.672,1.5-1.5,1.5h0c-.828,0-1.5-.672-1.5-1.5h0c0-.276,.224-.5,.5-.5Z'
          fill={secondaryfill}
          stroke='none'
        />
        <circle cx='6.75' cy='9.75' fill={secondaryfill} r='.75' stroke='none' />
        <circle cx='11.25' cy='9.75' fill={secondaryfill} r='.75' stroke='none' />
      </g>
    </svg>
  )
}

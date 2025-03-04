import Image from 'next/image'
import { IMAGES } from '~/images'

export default function PhotographyPage() {
  return (
    <ul>
      <li>
        {IMAGES.map((image, idx) => (
          <Image key={idx} src={image.src} alt="" />
        ))}
      </li>
    </ul>
  )
}

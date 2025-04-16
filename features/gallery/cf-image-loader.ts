// src will be like https://photography.cuvii.dev/DSCF2645.jpg
export function generateCloudflareImageUrl({
  src,
  width,
  quality,
  blur,
}: {
  src: string
  width: number
  quality?: number
  blur?: number
}) {
  const params = [`width=${width}`]
  if (quality) {
    params.push(`quality=${quality}`)
  }
  if (blur) {
    params.push(`blur=${blur}`)
  }
  const paramsString = params.join(',')
  const url = new URL(src)
  return `${url.origin}/cdn-cgi/image/${paramsString}${url.pathname}`
}

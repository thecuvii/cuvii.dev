// src will be like https://photography.cuvii.dev/DSCF2645.jpg
export function cloudflareImageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  const params = [`width=${width}`]
  if (quality) {
    params.push(`quality=${quality}`)
  }
  const paramsString = params.join(',')
  const url = new URL(src)
  return `${url.origin}/cdn-cgi/image/${paramsString}${url.pathname}`
}

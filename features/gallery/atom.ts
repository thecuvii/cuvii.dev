import type { GalleryImageItem } from './gallery'
import { atom } from 'jotai'

export const activeImageAtom = atom<GalleryImageItem | null>(null)

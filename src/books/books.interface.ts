export interface Item extends BaseItem {
  sbn: string
  description?: string | null
  author: string
  inventory?: number | null
}

export interface BaseItem {
  id: number
  name: string
}

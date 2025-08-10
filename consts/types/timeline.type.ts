export interface TimelineDataArrayType {
  [key: string]: string | boolean
  description?: string | null
}

export interface TimelineDataType {
  company: string
  data: TimelineDataArrayType[]
  isLatest: boolean
}

export interface TimelineDataArrayType {
  [key: string]: string | boolean
  description?: string
}

export interface TimelineDataType {
  company: string
  data: TimelineDataArrayType[]
  isLatest: boolean
}

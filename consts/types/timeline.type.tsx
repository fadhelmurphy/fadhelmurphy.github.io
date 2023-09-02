export type TimelineDataArrayType = {
  [key: string]: string | boolean;
  description?: string;
};

export type TimelineDataType = {
  company: string;
  data: TimelineDataArrayType[];
  isLatest: boolean;
};

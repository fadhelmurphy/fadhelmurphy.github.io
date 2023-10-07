export const stripHtml = (html: string): string => (html.replace(/<[^>]*>?/gm, ' '))

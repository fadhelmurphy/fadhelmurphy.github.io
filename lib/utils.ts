import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines multiple class names into a single string, handling conditional classes
 * and merging Tailwind CSS classes properly.
 *
 * @param inputs - Class values to be combined
 * @returns A string of combined class names
 */
export function cn (...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

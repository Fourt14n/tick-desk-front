import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function capitalizeFirstWord(str: string): string {
  if (!str) {
    return str;
  }
  const words = str.split(' ');
  if (words.length === 0) {
    return str;
  }
  const firstWord = words[0];
  const capitalizedFirstWord = firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
  words[0] = capitalizedFirstWord; 
  return words.join(' ');
}

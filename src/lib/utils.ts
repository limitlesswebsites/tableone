
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Add a formatDate utility function
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return format(date, 'MMM dd, yyyy');
}

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getLocalStorage = (key: string) => {
  if (typeof window === "undefined") return null; // Ensure it runs only in the browser
  return localStorage.getItem(key);
};

export const setLocalStorage = (key: string, value: string) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, value);
};



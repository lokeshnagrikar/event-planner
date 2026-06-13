import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names and resolves conflicting Tailwind classes.
 * Perfect for building highly reusable components with flexible styling.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

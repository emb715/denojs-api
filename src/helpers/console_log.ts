import { ConsoleColor } from '../deps.ts'

export function log(...args) {
  console.log(...args);
}

export function success(message: string) {
  console.log(ConsoleColor.success(message));
}

export function error(message: string) {
  console.error(ConsoleColor.error(message));
}

export function warning(message: string) {
  console.log(ConsoleColor.warning(message));
}
import { encodeBase32LowerCaseNoPadding } from "@oslojs/encoding";

export function generateRandomId(idLength: number): string {
  const byteLength = Math.ceil(idLength / 1.6);
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);

  const id = encodeBase32LowerCaseNoPadding(bytes).slice(0, idLength);

  return id;
}

export const BUTTON_TIMEOUT = 100;
export const SWIPE_AND_DRAWER_TIMEOUT = 300;
export const FORM_TIMEOUT = 500;

export async function timeout(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export const slideX = {
  "right-hidden": {
    opacity: 0,
    x: 16,
  },
  "slide-from-right": {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.36, 0.66, 0.04, 1],
    },
  },
  "slide-to-left": {
    opacity: 0,
    x: -16,
    transition: {
      duration: 0.15,
      ease: [0.36, 0.66, 0.04, 1],
    },
  },
};

export const biggerSlideX = {
  "right-hidden": {
    opacity: 0,
    x: 24,
  },
  "slide-from-right": {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.36, 0.66, 0.04, 1],
    },
  },
  "slide-to-left": {
    opacity: 0,
    x: -24,
    transition: {
      duration: 0.15,
      ease: [0.36, 0.66, 0.04, 1],
    },
  },
};

import { encodeBase32LowerCaseNoPadding } from "@oslojs/encoding";

import type { ExerciseType } from "./types";
import type { Variants } from "framer-motion";

export function generateRandomId(idLength: number): string {
  const byteLength = Math.ceil(idLength / 1.6);
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);

  const id = encodeBase32LowerCaseNoPadding(bytes).slice(0, idLength);

  return id;
}

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);

  return token;
}

export const BUTTON_TIMEOUT = 100;
export const SWIPE_AND_DRAWER_TIMEOUT = 300;
export const FORM_TIMEOUT = 500;
export const SESSION_COOKIE_NAME = "auth-session";

export async function timeout(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export const updateInterval = (lastUpdated: Date | string | null) => {
  if (!lastUpdated) {
    return null;
  }

  const parsedDate =
    lastUpdated instanceof Date ? lastUpdated : new Date(lastUpdated);

  const now = Date.now();
  const diffInMs = now - parsedDate.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) {
    return 60000; // Update in 1 minute
  } else if (diffInMinutes < 60) {
    return (60 - (diffInSeconds % 60)) * 1000; // Update at the next minute
  } else if (diffInHours < 24) {
    return (60 - (diffInMinutes % 60)) * 60 * 1000; // Update at the next hour
  } else if (diffInDays < 31) {
    return (24 - (diffInHours % 24)) * 60 * 60 * 1000; // Update at the next day
  } else {
    return null;
  }
};

export const formatDate = (date: Date, withDayOfTheWeek?: boolean) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  if (withDayOfTheWeek) {
    const dayOfTheWeek = date
      .toLocaleString("en", { weekday: "short" })
      .split(" ")[0];

    return `${dayOfTheWeek}, ${day}-${month}-${year}`;
  }

  return `${day}-${month}-${year}`;
};

export const formatLastUpdatedDate = (date: Date | string | null) => {
  if (!date) {
    return null;
  }

  const parsedDate = date instanceof Date ? date : new Date(date);

  const now = Date.now();
  const diffInMs = now - parsedDate.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) {
    return "just now";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} min${diffInMinutes > 1 ? "s" : ""} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  } else if (diffInDays < 31) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  } else {
    return "few months ago";
  }
};

export const reorderExercises = (
  list: ExerciseType[],
  startIndex: number,
  endIndex: number,
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);

  if (removed) {
    result.splice(endIndex, 0, removed);
  }

  return result;
};

export const slideX: Variants = {
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

export const biggerSlideX: Variants = {
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

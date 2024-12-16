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



// export const checkIsCancelValid = (date: any, time: any): boolean => {
//   console.log({ date, time });

//   if (!date || !time) {
//     console.log("Date or time is missing.");
//     return false;
//   }

//   // Parse the date
//   const providedDate = new Date(date);

//   if (isNaN(providedDate.getTime())) {
//     console.log("Invalid date format.");
//     return false;
//   }

//   // Extract hours and minutes from the time string
//   const [hours, minutes] = time.split(':').map(Number);

//   if (isNaN(hours) || isNaN(minutes)) {
//     console.log("Invalid time format.");
//     return false;
//   }

//   // Set the time explicitly to the provided date in UTC
//   providedDate.setUTCHours(hours, minutes, 0, 0);

//   console.log({ providedDate });

//   // Get the current UTC time
//   const currentTime = new Date();
//   const currentUtcTime = new Date(
//     currentTime.getUTCFullYear(),
//     currentTime.getUTCMonth(),
//     currentTime.getUTCDate(),
//     currentTime.getUTCHours(),
//     currentTime.getUTCMinutes(),
//     currentTime.getUTCSeconds(),
//     currentTime.getUTCMilliseconds()
//   );

//   console.log({ currentUtcTime });

//   // Calculate the time difference in hours
//   const timeDifferenceInMs = currentUtcTime.getTime() - providedDate.getTime();
//   const timeDifferenceInHours = timeDifferenceInMs / (1000 * 60 * 60); // Convert ms to hours

//   console.log({ timeDifferenceInHours });

//   // Only allow if time is more than 1 hour in the past and not in the future
//   if (timeDifferenceInHours < 1) {
//     console.log("Provided time is less than 1 hour in the past or in the future.");
//     return false;
//   }

//   return true;
// };



export const checkIsCancelValid = (date: any, time: any): boolean => {
  console.log({ date, time });

  if (!date || !time) {
    console.log("Date or time is missing.");
    return false;
  }

  // Parse the date
  const providedDate = new Date(date);

  if (isNaN(providedDate.getTime())) {
    console.log("Invalid date format.");
    return false;
  }

  // Extract hours and minutes from the time string
  const [hours, minutes] = time.split(':').map(Number);

  if (isNaN(hours) || isNaN(minutes)) {
    console.log("Invalid time format.");
    return false;
  }

  // Set the time explicitly to the provided date in the local timezone
  providedDate.setHours(hours, minutes, 0, 0);

  console.log({ providedDate });

  // Get the current local time
  const currentTime = new Date();
  console.log({ currentTime });

  // Calculate the time difference in hours
  const timeDifferenceInMs = currentTime.getTime() - providedDate.getTime();
  const timeDifferenceInHours = timeDifferenceInMs / (1000 * 60 * 60); // Convert ms to hours

  console.log({ timeDifferenceInHours });

  // Only allow if the provided time is more than 1 hour in the past and not in the future
  if (timeDifferenceInHours < 1) {
    console.log("Provided time is less than 1 hour in the past or in the future.");
    return false;
  }

  return true;
};

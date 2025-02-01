"use client";
export const formatDateToMatchInput = (dateString: Date | undefined) => {
  if (dateString) {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  } else {
    return undefined;
  }
};
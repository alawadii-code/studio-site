export const CV_ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
export const CV_ACCEPTED_EXTENSIONS = [".pdf", ".doc", ".docx"];
export const CV_MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export const PORTFOLIO_MAX_SIZE_BYTES = 15 * 1024 * 1024; // 15MB
export const PORTFOLIO_ACCEPTED_EXTENSIONS = [
  ".pdf",
  ".doc",
  ".docx",
  ".jpg",
  ".jpeg",
  ".png",
  ".zip",
];

export function hasAcceptedExtension(fileName: string, accepted: string[]) {
  const lower = fileName.toLowerCase();
  return accepted.some((ext) => lower.endsWith(ext));
}

export function formatBytes(bytes: number) {
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

export function getCSRFToken() {
  if (typeof document === "undefined") return null

  return document.cookie
    .split("; ")
    .find(row => row.startsWith("csrftoken="))
    ?.split("=")[1]
}

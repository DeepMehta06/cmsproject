export default function dateFormat(date) {
  if (!date) return ""

  const d = date instanceof Date ? date : new Date(date)

  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

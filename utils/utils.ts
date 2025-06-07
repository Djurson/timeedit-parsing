export function formatRange(start: Date, end: Date): string {
  const date = start.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const startTime = start.toTimeString().slice(0, 5); // "08:15"
  const endTime = end.toTimeString().slice(0, 5); // "17:00"
  return `${date}, ${startTime} - ${endTime}`;
}

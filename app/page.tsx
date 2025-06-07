import Calendar31 from "@/components/calendar-31";
import { parseICSFile } from "@/components/parsing";
import Image from "next/image";

export default async function Home() {
  const events = await parseICSFile("https://cloud.timeedit.net/liu/web/schema/ri677QQQY98Zn9Q5498109Z5y6Z06.ics");
  return (
    <>
      <Calendar31 events={events} />
    </>
  );
}

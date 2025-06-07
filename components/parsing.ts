import { CalendarEvent } from "./types";

const ical = require("node-ical");

export async function parseICSFile(ICSLink: string): Promise<Map<number, CalendarEvent[]>> {
  const webEvents = await ical.async.fromURL(ICSLink);
  let calendarEventMap: Map<number, CalendarEvent[]> = new Map<number, CalendarEvent[]>();

  for (let event in webEvents) {
    if (webEvents[event]?.type === "VEVENT") {
      let tempEvent: CalendarEvent = {
        uid: webEvents[event].uid,
        datetype: webEvents[event].datetype,
        description: webEvents[event].description,
        dtsStamp: webEvents[event].dtstamp,
        startStamp: webEvents[event].start,
        endStamp: webEvents[event].end,
        lastModifiedStamp: webEvents[event].lastmodified,
        location: webEvents[event].location,
        summary: webEvents[event].summary,
        mapUrl: webEvents[event].url,
      };
      let calendarEventArr = calendarEventMap.get(tempEvent.startStamp.getDate());
      if (!calendarEventArr) {
        calendarEventMap.set(tempEvent.startStamp.getDate(), [tempEvent]);
        continue;
      }

      calendarEventArr.push(tempEvent);
      calendarEventMap.set(tempEvent.startStamp.getDate(), calendarEventArr);
    }
  }

  return calendarEventMap;
}

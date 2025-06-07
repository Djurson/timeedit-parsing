"use client";

import { formatDateRange } from "little-date";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CalendarEvent } from "./types";
import { useState } from "react";
import { formatRange } from "@/utils/utils";

export default function Calendar31({ events }: { events: Map<number, CalendarEvent[]> }) {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <Card className="w-fit py-4">
      <CardContent className="px-4">
        <Calendar mode="single" selected={date} onSelect={setDate} className="bg-transparent p-0" required />
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-3 border-t px-4 !pt-4">
        <div className="flex w-full items-center justify-between px-1">
          <div className="text-sm font-medium">
            {date?.toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
          <Button variant="ghost" size="icon" className="size-6" title="Add Event">
            <PlusIcon />
            <span className="sr-only">Add Event</span>
          </Button>
        </div>
        <div className="flex w-full flex-col gap-2">
          {events.get(date.getDate())?.map((event) => (
            <div key={event.uid} className="bg-muted after:bg-primary/70 relative rounded-md p-2 pl-6 text-sm after:absolute after:inset-y-2 after:left-2 after:w-1 after:rounded-full">
              <div className="font-medium">{event.description}</div>
              <div className="text-muted-foreground text-xs">{formatRange(event.startStamp, event.endStamp)}</div>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}

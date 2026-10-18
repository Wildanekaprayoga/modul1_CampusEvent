import React, { createContext, useContext, useState } from "react";
import { EventItem, events as initialEvents } from "../data/events";

interface EventContextValue {
  events: EventItem[];
  reserveSeat: (eventId: number) => void;
}

const EventContext = createContext<EventContextValue | undefined>(undefined);

export function EventProvider({ children }: { children: React.ReactNode }) {
  // State bersama digunakan oleh Home, Detail, Registration, dan Success.
  const [events, setEvents] = useState<EventItem[]>(() =>
    initialEvents.map((event) => ({ ...event }))
  );

  const reserveSeat = (eventId: number) => {
    setEvents((currentEvents) =>
      currentEvents.map((event) =>
        event.id === eventId && event.seats > 0
          ? { ...event, seats: event.seats - 1 }
          : event
      )
    );
  };

  return (
    <EventContext.Provider value={{ events, reserveSeat }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEventInventory(): EventContextValue {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEventInventory wajib berada di dalam EventProvider");
  }
  return context;
}

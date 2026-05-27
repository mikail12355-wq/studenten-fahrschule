export type KlasseType = "klasse-b" | "klasse-a";

export interface RecurringTermin {
  dayOfWeek: number; // 1 = Monday, 2 = Tuesday
  time: string;
  title: string;
  klasse: KlasseType;
  ort: string;
  hinweis: string;
}

export const recurringTermine: RecurringTermin[] = [
  {
    dayOfWeek: 2, // Tuesday
    time: "19:00 Uhr",
    title: "Theorie Klasse B",
    klasse: "klasse-b",
    ort: "Sorauer Straße 16, 10997 Berlin",
    hinweis:
      "Anmeldung telefonisch (030 250 15 902) oder per E-Mail (info@studenten-fahrschule.de) erforderlich.",
  },
  {
    dayOfWeek: 1, // Monday
    time: "19:00 Uhr",
    title: "Theorie Klasse A / A2 / B196",
    klasse: "klasse-a",
    ort: "Sorauer Straße 16, 10997 Berlin",
    hinweis:
      "Anmeldung telefonisch (030 250 15 902) oder per E-Mail (info@studenten-fahrschule.de) erforderlich.",
  },
];

export function getTermineForMonth(year: number, month: number): Map<number, RecurringTermin[]> {
  const result = new Map<number, RecurringTermin[]>();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const jsDay = date.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
    // Convert to ISO day: Mon=1..Sun=7
    const isoDay = jsDay === 0 ? 7 : jsDay;

    const matched = recurringTermine.filter((t) => t.dayOfWeek === isoDay);
    if (matched.length > 0) {
      result.set(day, matched);
    }
  }
  return result;
}

export function getUpcomingTermine(weeksAhead = 4): Array<{ date: Date; termin: RecurringTermin }> {
  const now = new Date();
  const end = new Date(now);
  end.setDate(end.getDate() + weeksAhead * 7);

  const result: Array<{ date: Date; termin: RecurringTermin }> = [];
  const cur = new Date(now);
  cur.setHours(0, 0, 0, 0);

  while (cur <= end) {
    const jsDay = cur.getDay();
    const isoDay = jsDay === 0 ? 7 : jsDay;
    const matched = recurringTermine.filter((t) => t.dayOfWeek === isoDay);

    for (const termin of matched) {
      const eventDate = new Date(cur);
      const [h, m] = termin.time.replace(" Uhr", "").split(":").map(Number);
      eventDate.setHours(h, m, 0, 0);
      if (eventDate > now) {
        result.push({ date: eventDate, termin });
      }
    }
    cur.setDate(cur.getDate() + 1);
  }

  return result.sort((a, b) => a.date.getTime() - b.date.getTime());
}

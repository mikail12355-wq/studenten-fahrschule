export interface Holiday {
  date: string; // "YYYY-MM-DD"
  name: string;
}

function easterSunday(year: number): Date {
  // Gauss/Butcher algorithm
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month, day);
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function fmt(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getBerlinHolidaysForYear(year: number): Holiday[] {
  const easter = easterSunday(year);

  return [
    { date: `${year}-01-01`, name: "Neujahr" },
    { date: `${year}-03-08`, name: "Internationaler Frauentag" },
    { date: fmt(addDays(easter, -2)), name: "Karfreitag" },
    { date: fmt(easter), name: "Ostersonntag" },
    { date: fmt(addDays(easter, 1)), name: "Ostermontag" },
    { date: `${year}-05-01`, name: "Tag der Arbeit" },
    { date: fmt(addDays(easter, 39)), name: "Christi Himmelfahrt" },
    { date: fmt(addDays(easter, 49)), name: "Pfingstsonntag" },
    { date: fmt(addDays(easter, 50)), name: "Pfingstmontag" },
    { date: `${year}-10-03`, name: "Tag der Deutschen Einheit" },
    { date: `${year}-12-25`, name: "1. Weihnachtstag" },
    { date: `${year}-12-26`, name: "2. Weihnachtstag" },
  ];
}

const holidayCache = new Map<number, Map<string, string>>();

export function getBerlinHolidays(year: number): Map<string, string> {
  if (holidayCache.has(year)) {
    return holidayCache.get(year)!;
  }
  const map = new Map<string, string>();
  for (const h of getBerlinHolidaysForYear(year)) {
    map.set(h.date, h.name);
  }
  holidayCache.set(year, map);
  return map;
}

export function isHoliday(date: Date): string | null {
  const key = fmt(date);
  const map = getBerlinHolidays(date.getFullYear());
  return map.get(key) ?? null;
}

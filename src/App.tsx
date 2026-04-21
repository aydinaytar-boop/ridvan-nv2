import { prayerTimes2026, fallbackTimes } from "../data/prayerTimes2026";
import { DUA_ARCHIVE } from "../data/duaArchive";

export type VakitKey = "sabah" | "gunes" | "ogle" | "ikindi" | "aksam" | "yatsi";
export type Phase = "normal" | "ezan" | "kamet_countdown" | "kamet_alert" | "blackout";

export interface TodayTimes {
  sabah: string;
  gunes: string;
  ogle: string;
  ikindi: string;
  aksam: string;
  yatsi: string;
  sabahKamet: string;
}

export interface FlowState {
  phase: Phase;
  currentVakit: VakitKey | null;
  nextVakit: VakitKey | null;
  nextVakitTime: string;
  countdownSeconds: number;
  ezanElapsed: number;
  blackoutRemaining: number;
  activeEzanVakit: VakitKey | null;
  kametCountdown: number;
  kametAlertActive: boolean;
}

// SABİTLER
export const SETTINGS = {
  sabahKamet: "06:15",
  kametSureleri: {
    ogle: 8,
    ikindi: 8,
    aksam: 3,
    yatsi: 8,
  } as Record<string, number>,
  blackoutSuresi: 600,
  cuma: {
    ezan: "13:10",
    kamet: "13:30",
  },
  bayramlar: [
    {
      ad_tr: "Ramazan Bayramı",
      ad_de: "Eid al-Fitr",
      tarih: "2026-03-20",
      tarih2: "2026-03-22",
    },
    {
      ad_tr: "Kurban Bayramı",
      ad_de: "Eid al-Adha",
      tarih: "2026-05-27",
      tarih2: "2026-05-30",
    },
  ],
};

let _sabahKametSaati = SETTINGS.sabahKamet;

export function getSabahKametSaati(): string {
  return _sabahKametSaati;
}

export function setSabahKametSaati(val: string) {
  _sabahKametSaati = val;
}

// --- YARDIMCI FONKSİYONLAR ---

export function timeToDate(timeStr: string, baseDate: Date): Date {
  const [h, m] = timeStr.split(":").map(Number);
  const d = new Date(baseDate);
  d.setHours(h, m, 0, 0);
  return d;
}

export function diffSeconds(a: Date, b: Date): number {
  return Math.floor((b.getTime() - a.getTime()) / 1000);
}

export function addMinutes(timeStr: string, mins: number): string {
  const [h, m] = timeStr.split(":").map(Number);
  const total = h * 60 + m + mins;
  const nh = Math.floor(total / 60) % 24;
  const nm = total % 60;
  return `${String(nh).padStart(2, "0")}:${String(nm).padStart(2, "0")}`;
}

export function isWinterTime(date: Date): boolean {
  const year = date.getFullYear();
  const mar31 = new Date(year, 2, 31);
  const marLastSun = new Date(mar31);
  marLastSun.setDate(31 - ((mar31.getDay() + 7) % 7 === 0 ? 0 : mar31.getDay()));
  marLastSun.setHours(2, 0, 0, 0);
  const oct31 = new Date(year, 9, 31);
  const octLastSun = new Date(oct31);
  octLastSun.setDate(31 - ((oct31.getDay() + 7) % 7 === 0 ? 0 : oct31.getDay()));
  octLastSun.setHours(3, 0, 0, 0);
  return date >= octLastSun || date < marLastSun;
}

export function isCumaGunu(date: Date): boolean {
  return date.getDay() === 5;
}

export function resolveOgleTime(takvimOgle: string, now: Date): string {
  const day = now.getDay();
  const winter = isWinterTime(now);
  const month = now.getMonth() + 1;
  const isPztPer = day >= 1 && day <= 4;
  const isWeekend = day === 0 || day === 6;
  if (winter && month >= 10) {
    if (isPztPer) return "12:00";
    if (isWeekend) return "13:00";
  }
  return takvimOgle;
}

export function showWeekendOgleMsg(now: Date): boolean {
  const day = now.getDay();
  const isWeekend = day === 0 || day === 6;
  const winter = isWinterTime(now);
  const month = now.getMonth() + 1;
  return isWeekend && winter && month >= 10;
}

// --- HİCRİ TAKVİM HESAPLAMA ---
export function computeHijri(date: Date): { day: number; month: number; year: number } {
  const d = new Date(date);
  const jd = Math.floor((d.getTime() / 86400000) + 2440587.5);
  let l = jd - 1948440 + 10632;
  let n = Math.floor((l - 1) / 10631);
  let ll = l - 10631 * n + 354;
  let j = Math.floor((10985 - ll) / 5316) * Math.floor((50 * ll) / 17719) + Math.floor(ll / 5670) * Math.floor((43 * ll) / 15238);
  let lll = ll - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) - Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
  let month = Math.floor((24 * lll) / 709);
  let day = lll - Math.floor((709 * month) / 24);
  let year = 30 * n + j - 30;
  if (month > 12) {
    month -= 12;
    year += 1;
  }
  return { day, month, year };
}

// --- VAKİT HESAPLAMA ---

export function getTodayTimes(date: Date = new Date()): TodayTimes {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const key = `${yyyy}-${mm}-${dd}`;

  const found = prayerTimes2026.find((r) => r.t === key);
  const times = found
    ? {
        sabah: found.i,
        gunes: found.g,
        ogle: found.o,
        ikindi: found.k,
        aksam: found.a,
        yatsi: found.y,
      }
    : fallbackTimes;

  const ogleResolved = resolveOgleTime(times.ogle, date);

  return {
    sabah: times.sabah,
    gunes: times.gunes,
    ogle: ogleResolved,
    ikindi: times.ikindi,
    aksam: times.aksam,
    yatsi: times.yatsi,
    sabahKamet: getSabahKametSaati(),
  };
}

export function getKametTime(vakit: VakitKey, ezanTime: string): string | null {
  if (vakit === "gunes") return null;
  if (vakit === "sabah") return getSabahKametSaati();
  const kametDk = SETTINGS.kametSureleri[vakit as keyof typeof SETTINGS.kametSureleri];
  if (kametDk === undefined) return null;
  return addMinutes(ezanTime, kametDk);
}

export function getBayramVisibility(now: Date): {
  visible: boolean;
  bayram?: (typeof SETTINGS.bayramlar)[0];
  saat?: string;
} {
  for (const b of SETTINGS.bayramlar) {
    const bayramStart = new Date(b.tarih + "T00:00:00");
    const bayramEnd = new Date(b.tarih2 + "T11:00:00");
    const showStart = new Date(bayramStart);
    showStart.setDate(showStart.getDate() - 7);
    if (now >= showStart && now < bayramEnd) {
      return { visible: true, bayram: b, saat: "09:00" };
    }
  }
  return { visible: false };
}

export function getDailyDua(date: Date) {
  const index = date.getDate() % DUA_ARCHIVE.length;
  return DUA_ARCHIVE[index];
}

// --- ANA AKIŞ (FLOW) HESAPLAMA ---

export function computeFlow(now: Date, times: TodayTimes): FlowState {
  const vakit_order: VakitKey[] = ["sabah", "gunes", "ogle", "ikindi", "aksam", "yatsi"];
  const isCuma = isCumaGunu(now);
  const cumaEzan = SETTINGS.cuma.ezan;
  const cumaKamet = SETTINGS.cuma.kamet;

  const timeMap: Record<VakitKey, string> = {
    sabah: times.sabah,
    gunes: times.gunes,
    ogle: isCuma ? cumaEzan : times.ogle,
    ikindi: times.ikindi,
    aksam: times.aksam,
    yatsi: times.yatsi,
  };

  let current: VakitKey | null = null;
  let next: VakitKey | null = null;
  let nextTime = "";

  for (const vakit of vakit_order) {
    const vakitDate = timeToDate(timeMap[vakit], now);
    if (now >= vakitDate) {
      current = vakit;
    } else {
      next = vakit;
      nextTime = timeMap[vakit];
      break;
    }
  }

  if (!next) {
    next = "sabah";
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowTimes = getTodayTimes(tomorrow);
    nextTime = tomorrowTimes.sabah;
  }

  const ezanVakitler: VakitKey[] = ["sabah", "ogle", "ikindi", "aksam", "yatsi"];

  for (const vakit of ezanVakitler) {
    const ezanStr = timeMap[vakit];
    const ezanDate = timeToDate(ezanStr, now);
    let kametStr: string | null;

    if (isCuma && vakit === "ogle") {
      kametStr = cumaKamet;
    } else {
      kametStr = getKametTime(vakit, ezanStr);
    }

    if (!kametStr) continue;

    const kametDate = timeToDate(kametStr, now);
    const kametAlertEnd = new Date(kametDate.getTime() + 60 * 1000);
    const blackoutEnd = new Date(kametAlertEnd.getTime() + SETTINGS.blackoutSuresi * 1000);
    const secSinceEzan = diffSeconds(ezanDate, now);

    // 1. EZAN OKUNUYOR
    if (secSinceEzan >= 0 && secSinceEzan < 60) {
      return {
        phase: "ezan",
        currentVakit: vakit,
        nextVakit: next,
        nextVakitTime: nextTime,
        countdownSeconds: 0,
        ezanElapsed: secSinceEzan,
        blackoutRemaining: 0,
        activeEzanVakit: vakit,
        kametCountdown: 0,
        kametAlertActive: false,
      };
    }

    // 2. KAMET SAYIMI
    if (now >= ezanDate && secSinceEzan >= 60 && now < kametDate) {
      return {
        phase: "kamet_countdown",
        currentVakit: vakit,
        nextVakit: next,
        nextVakitTime: nextTime,
        countdownSeconds: 0,
        ezanElapsed: secSinceEzan,
        blackoutRemaining: 0,
        activeEzanVakit: vakit,
        kametCountdown: diffSeconds(now, kametDate),
        kametAlertActive: false,
      };
    }

    // 3. KAMET OKUNUYOR
    if (now >= kametDate && now < kametAlertEnd) {
      return {
        phase: "kamet_alert",
        currentVakit: vakit,
        nextVakit: next,
        nextVakitTime: nextTime,
        countdownSeconds: 0,
        ezanElapsed: secSinceEzan,
        blackoutRemaining: 0,
        activeEzanVakit: vakit,
        kametCountdown: 0,
        kametAlertActive: true,
      };
    }

    // 4. BLACKOUT (Kamet + 10 dk)
    if (now >= kametAlertEnd && now < blackoutEnd) {
      return {
        phase: "blackout",
        currentVakit: vakit,
        nextVakit: next,
        nextVakitTime: nextTime,
        countdownSeconds: 0,
        ezanElapsed: secSinceEzan,
        blackoutRemaining: diffSeconds(now, blackoutEnd),
        activeEzanVakit: vakit,
        kametCountdown: 0,
        kametAlertActive: false,
      };
    }
  }

  // Normal Durum
  const countdown = next ? diffSeconds(now, timeToDate(nextTime, now)) : 0;
  return {
    phase: "normal",
    currentVakit: current,
    nextVakit: next,
    nextVakitTime: nextTime,
    countdownSeconds: Math.max(0, countdown),
    ezanElapsed: 0,
    blackoutRemaining: 0,
    activeEzanVakit: null,
    kametCountdown: 0,
    kametAlertActive: false,
  };
}
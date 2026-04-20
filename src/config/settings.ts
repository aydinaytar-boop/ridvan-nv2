// src/config/settings.ts
// Ridvan Camii TV — Merkezi Ayar Dosyası

export const SETTINGS = {
  get manuelSabahKamet(): string {
    return localStorage.getItem("manuelSabahKamet") || "05:15";
  },

  kametSureleri: { ogle: 9, ikindi: 9, aksam: 3, yatsi: 9, cuma: 20 },

  kametOffsets: {
    sabah: 0, ogle: 9, ikindi: 9, aksam: 3, yatsi: 9, cuma: 20,
  } as Record<string, number>,

  cuma: { ezan: "13:10", kamet: "13:30" },

  blackoutSuresi: 600,

  bayramlar: [
    { ad_tr: "Ramazan Bayramı", ad_de: "Bayram", tarih: "2026-03-20", tarih2: "2026-03-22", saat: "06:30" },
    { ad_tr: "Kurban Bayramı", ad_de: "Opferfest", tarih: "2026-05-27", tarih2: "2026-05-30", saat: "05:35" },
  ],

  duyurular: {
    tr: "Izine erken gidecek olanlar LUTFEN Kurban bagislarinizi yapmis olarak gidin! Iyi Tatiller!",
    de: "Wer frueher in den Urlaub faehrt, wird gebeten, seine Kurban-Spenden bereits im Voraus geleistet zu haben. Schoene Feiertage!",
  },
};

export function getSabahKametSaati(): string {
  return localStorage.getItem("manuelSabahKamet") || "05:15";
}

export function setSabahKametSaati(saat: string): void {
  localStorage.setItem("manuelSabahKamet", saat);
}

export function getBayramSaati(tarih: string): string {
  return localStorage.getItem(`bayramSaati_${tarih}`) || "09:00";
}

export function getDuyuru(lang: "tr" | "de"): string {
  const key = lang === "tr" ? "duyuruTR" : "duyuruDE";
  return localStorage.getItem(key) || SETTINGS.duyurular[lang];
}

export function setDuyuru(lang: "tr" | "de", text: string): void {
  const key = lang === "tr" ? "duyuruTR" : "duyuruDE";
  localStorage.setItem(key, text);
}
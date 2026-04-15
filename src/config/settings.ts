// src/config/settings.ts
export const SETTINGS = {
  // Sabah kamet saati — elle girilir (localStorage'dan okunur)
  get manuelSabahKamet(): string {
    return localStorage.getItem("manuelSabahKamet") || "06:15";
  },
  // Her vakit için ezandan kaç dk sonra kamet?
  kametSureleri: {
    ogle: 9,
    ikindi: 9,
    aksam: 3,
    yatsi: 9,
    cuma: 20,
  },
  // usePrayerFlow.ts için kametOffsets (kametSureleri ile aynı değerler)
  kametOffsets: {
    sabah: 0,
    ogle: 9,
    ikindi: 9,
    aksam: 3,
    yatsi: 9,
    cuma: 20,
  } as Record<string, number>,
  // Cuma namazı sabit saatleri
  cuma: { ezan: "13:10", kamet: "13:30" },
  // Blackout süresi (saniye) — 10 dk
  blackoutSuresi: 600,
  // Bayram bilgileri
  bayramlar: [
    {
      ad_tr: "Ramazan Bayramı",
      ad_de: "Bayram",
      tarih: "2026-03-20",
      tarih2: "2026-03-22",
      saat: "09:00",
    },
    {
      ad_tr: "Kurban Bayramı",
      ad_de: "Opferfest",
      tarih: "2026-05-27",
      tarih2: "2026-05-30",
      saat: "09:00",
    },
  ],
};
export function getSabahKametSaati(): string {
  return localStorage.getItem("manuelSabahKamet") || "06:15";
}
export function setSabahKametSaati(saat: string): void {
  localStorage.setItem("manuelSabahKamet", saat);
}
export function getBayramSaati(tarih: string): string {
  const key = `bayramSaati_${tarih}`;
  return localStorage.getItem(key) || "09:00";
}
export function setBayramSaati(tarih: string, saat: string): void {
  const key = `bayramSaati_${tarih}`;
  localStorage.setItem(key, saat);
}
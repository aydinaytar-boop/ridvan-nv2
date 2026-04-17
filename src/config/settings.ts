// src/config/settings.ts
import { db } from "../utils/firebase"; // Yeni oluşturduğumuz firebase.ts
import { ref, onValue, update } from "firebase/database";

// --- MEVCUT YAPIN AYNEN KALIYOR ---
export const SETTINGS = {
  get manuelSabahKamet(): string {
    return localStorage.getItem("manuelSabahKamet") || "06:15";
  },
  kametSureleri: { ogle: 9, ikindi: 9, aksam: 3, yatsi: 9, cuma: 20 },
  kametOffsets: { sabah: 0, ogle: 9, ikindi: 9, aksam: 3, yatsi: 9, cuma: 20 } as Record<string, number>,
  cuma: { ezan: "13:10", kamet: "13:30" },
  blackoutSuresi: 600,
  bayramlar: [
    { ad_tr: "Ramazan Bayramı", ad_de: "Bayram", tarih: "2026-03-20", tarih2: "2026-03-22", saat: "09:00" },
    { ad_tr: "Kurban Bayramı", ad_de: "Opferfest", tarih: "2026-05-27", tarih2: "2026-05-30", saat: "09:00" },
  ],
};

export function getSabahKametSaati(): string { return localStorage.getItem("manuelSabahKamet") || "06:15"; }
export function getBayramSaati(tarih: string): string { return localStorage.getItem(`bayramSaati_${tarih}`) || "09:00"; }

// --- BURASI YENİ EK: FİREBASE'DEN YAZMA/OKUMA FONKSİYONLARI ---

// Ayarları Firebase'e kaydetmek için (Bunu Ayarlar panelindeki "Kaydet" butonunda kullanacaksın)
export function saveSettingToFirebase(key: string, value: string) {
  update(ref(db, 'settings'), { [key]: value });
}

// Uygulama açılışında bir kez çalışacak: Firebase'i dinle ve değişeni localStorage'a yaz
export function initFirebaseSync() {
  const settingsRef = ref(db, 'settings');
  onValue(settingsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      // Firebase'den gelen verileri localStorage'a işle
      Object.keys(data).forEach((key) => {
        localStorage.setItem(key, data[key]);
      });
      console.log("Firebase verileri yerel hafızaya senkronize edildi.");
    }
  });
}
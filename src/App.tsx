import { useState, useEffect, useRef, useCallback } from "react";

import {
  getTodayTimes,
  computeFlow,
  getKametTime,
  getBayramVisibility,
  isCumaGunu,
  showWeekendOgleMsg,
  setSabahKametSaati,
  getSabahKametSaati,
  getDailyDua,   // ← ZORUNLU
  SETTINGS,
  type VakitKey,
} from "./utils/timeEngine";

import { DUA_ARCHIVE, EZAN_DUASI } from "./data/duaArchive";

/* -------------------------------------------------------
   CONFIG.JSON MERKEZİ AYAR SİSTEMİ
   ------------------------------------------------------- */

async function loadConfig() {
  try {
    const res = await fetch("config.json?v=" + Date.now());
    if (!res.ok) throw new Error("Config yüklenemedi");
    return await res.json();
  } catch (e) {
    console.warn("config.json okunamadı, localStorage kullanılacak:", e);
    return null;
  }
}

function saveConfigToLocal(config: any) {
  localStorage.setItem("centralConfig", JSON.stringify(config));
}

function loadConfigFromLocal() {
  const raw = localStorage.getItem("centralConfig");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/* -------------------------------------------------------
   YARDIMCI FONKSİYONLAR
   ------------------------------------------------------- */

function fmt2(n: number) {
  return String(Math.max(0, n)).padStart(2, "0");
}

function toHijri(date: Date, offset = 0) {
  const d = new Date(date);
  d.setDate(d.getDate() + offset);
  const JD =
    Math.floor(
      (d.getTime() - new Date(1970, 0, 1).getTime()) / 86400000
    ) + 2440587.5;
  const Z = Math.floor(JD);
  const A = Math.floor((Z - 1867216.25) / 36524.25);
  const AA = Z + 1 + A - Math.floor(A / 4);
  const B = AA + 1524;
  const C = Math.floor((B - 122.1) / 365.25);
  const D2 = Math.floor(365.25 * C);
  const E = Math.floor((B - D2) / 30.6001);
  const dayG = B - D2 - Math.floor(30.6001 * E);
  const monthG = (E < 14 ? E - 1 : E - 13) as number;
  const yearG = monthG > 2 ? C - 4716 : C - 4715;
  const JDN =
    367 * yearG -
    Math.floor((7 * (yearG + Math.floor((monthG + 9) / 12))) / 4) +
    Math.floor((275 * monthG) / 9) +
    dayG +
    1721013.5;
  const l = Math.floor(JDN) - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const ll = l - 10631 * n + 354;
  const j =
    Math.floor((10985 - ll) / 5316) *
      Math.floor((50 * ll) / 17719) +
    Math.floor(ll / 5670) *
      Math.floor((43 * ll) / 15238);
  const lll =
    ll -
    Math.floor((30 - j) / 15) *
      Math.floor((17719 * j) / 50) -
    Math.floor(j / 16) *
      Math.floor((15238 * j) / 43) +
    29;
  const month = Math.floor((24 * lll) / 709);
  const day = lll - Math.floor((709 * month) / 24);
  const year = 30 * n + j - 30;
  return { day, month, year };
}

/* -------------------------------------------------------
   HİCRİ / MİLADİ METİNLER
   ------------------------------------------------------- */

const HICRI_AYLAR_TR = [
  "",
  "Muharrem",
  "Safer",
  "Rebiülevvel",
  "Rebiülahir",
  "Cemâziyelevvel",
  "Cemâziyelahir",
  "Recep",
  "Şaban",
  "Ramazan",
  "Şevval",
  "Zilkade",
  "Zilhicce",
];

const HICRI_AYLAR_DE = [
  "",
  "Muharram",
  "Safar",
  "Rabi al-Awwal",
  "Rabi al-Thani",
  "Dschumada al-Ula",
  "Dschumada al-Thaniya",
  "Radschab",
  "Scha'ban",
  "Ramadan",
  "Schawwal",
  "Dhu al-Qa'da",
  "Dhu al-Hijja",
];

function hicriStrTR(h) {
  return `${h.day} ${HICRI_AYLAR_TR[h.month]} ${h.year}`;
}
function hicriStrDE(h) {
  return `${h.day}. ${HICRI_AYLAR_DE[h.month]} ${h.year}`;
}

const GUNLER_TR = [
  "Pazar",
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi",
];

const GUNLER_DE = [
  "Sonntag",
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
];

const AYLAR_TR = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

const AYLAR_DE = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];

function miladiTRStr(d: Date) {
  return `${GUNLER_TR[d.getDay()]}, ${d.getDate()} ${
    AYLAR_TR[d.getMonth()]
  } ${d.getFullYear()}`;
}

function miladiDEStr(d: Date) {
  return `${GUNLER_DE[d.getDay()]}, ${d.getDate()}. ${
    AYLAR_DE[d.getMonth()]
  } ${d.getFullYear()}`;
}

/* -------------------------------------------------------
   VAKİT İSİMLERİ
   ------------------------------------------------------- */

const VAKIT_NAMES = {
  tr: {
    sabah: "SABAH",
    gunes: "GÜNEŞ",
    ogle: "ÖĞLE",
    ikindi: "İKİNDİ",
    aksam: "AKŞAM",
    yatsi: "YATSI",
  },
  de: {
    sabah: "FAJR",
    gunes: "SCHURUQ",
    ogle: "DHUHR",
    ikindi: "ASSR",
    aksam: "MAGHRIB",
    yatsi: "ISCHAA",
  },
};

const VAKIT_LABEL = {
  tr: {
    sabah: "Sabah",
    gunes: "Güneş",
    ogle: "Öğle",
    ikindi: "İkindi",
    aksam: "Akşam",
    yatsi: "Yatsı",
  },
  de: {
    sabah: "Fajr",
    gunes: "Schuruq",
    ogle: "Dhuhr",
    ikindi: "Assr",
    aksam: "Maghrib",
    yatsi: "Ischaa",
  },
};
/* -------------------------------------------------------
   APP BAŞLANGICI
   ------------------------------------------------------- */

export default function App() {
  const [now, setNow] = useState(() => new Date());
  const [lang, setLang] = useState<"tr" | "de">("tr");

  /* MERKEZİ CONFIG AYARLARI */
  const [centralConfig, setCentralConfig] = useState<any>(null);
  const [configLoaded, setConfigLoaded] = useState(false);

  const [hicriOffset, setHicriOffset] = useState(0);
  const [sabahKametInput, setSabahKametInput] = useState("05:30");
  const [bayramInputs, setBayramInputs] = useState({});
  const [duyuruTR, setDuyuruTR] = useState("");
  const [duyuruDE, setDuyuruDE] = useState("");

  const [showSettings, setShowSettings] = useState(false);
  const [showBayramForm, setShowBayramForm] = useState(false);
  const [showDuyuruForm, setShowDuyuruForm] = useState(false);
  const [duaLang, setDuaLang] = useState<"tr" | "de">("tr");

  const settingsClickCount = useRef(0);
  const settingsTimer = useRef<any>(null);

  /* -------------------------------------------------------
     CONFIG.JSON YÜKLEME
     ------------------------------------------------------- */

  useEffect(() => {
    (async () => {
      let cfg = await loadConfig();

      if (!cfg) {
        cfg = loadConfigFromLocal();
      }

      if (cfg) {
        setCentralConfig(cfg);

        setSabahKametInput(cfg.sabahKamet || "05:30");
        setHicriOffset(cfg.hicriOffset || 0);
        setBayramInputs(cfg.bayramInputs || {});
        setDuyuruTR(cfg.duyuruTR || "");
        setDuyuruDE(cfg.duyuruDE || "");
      }

      setConfigLoaded(true);
    })();
  }, []);

  /* -------------------------------------------------------
     AUTO SCALE
     ------------------------------------------------------- */

  useEffect(() => {
    const timer = setTimeout(() => {
      applyAutoScale();
    }, 50);

    window.addEventListener("resize", applyAutoScale);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", applyAutoScale);
    };
  }, []);

  /* -------------------------------------------------------
     CONFIG.JSON DEĞİŞİKLİKLERİNİ KAYDETME (PC MODU)
     ------------------------------------------------------- */

  const saveCentralConfig = useCallback(() => {
    const base = centralConfig || {};
    const updated = {
      ...base,
      sabahKamet: sabahKametInput,
      hicriOffset,
      bayramInputs,
      duyuruTR,
      duyuruDE,
    };

    saveConfigToLocal(updated);
    setCentralConfig(updated);
  }, [centralConfig, sabahKametInput, hicriOffset, bayramInputs, duyuruTR, duyuruDE]);

  /* -------------------------------------------------------
     SAAT TİMERLERİ
     ------------------------------------------------------- */

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setLang((l) => (l === "tr" ? "de" : "tr"));
    }, 20000);
    return () => clearInterval(id);
  }, []);

  /* -------------------------------------------------------
     SABAH KAMET SAATİ (MERKEZİ)
     ------------------------------------------------------- */

  useEffect(() => {
    if (configLoaded) {
      setSabahKametSaati(sabahKametInput);
    }
  }, [sabahKametInput, configLoaded]);
  /* -------------------------------------------------------
     HESAPLAMALAR
     ------------------------------------------------------- */

  const times = getTodayTimes(now);
  const flow = computeFlow(now, times);
  const bayram = getBayramVisibility(now);
  const weekendMsg = showWeekendOgleMsg(now);
  const dailyDua = getDailyDua(now);

  const hicri = toHijri(now, hicriOffset);
  const hicriTR = hicriStrTR(hicri);
  const hicriDE = hicriStrDE(hicri);

  const miladiTR = miladiTRStr(now);
  const miladiDE = miladiDEStr(now);

  const hh = fmt2(now.getHours());
  const mm = fmt2(now.getMinutes());
  const ss = fmt2(now.getSeconds());

  const isEzan = flow.phase === "ezan";
  const isKametCountdown = flow.phase === "kamet_countdown";
  const isKametAlert = flow.phase === "kamet_alert";
  const isBlackout = flow.phase === "blackout";

  /* -------------------------------------------------------
     GERİ SAYIM
     ------------------------------------------------------- */

  let cdH = 0, cdM = 0, cdS = 0;

  if (isKametCountdown) {
    const total = flow.kametCountdown;
    cdH = Math.floor(total / 3600);
    cdM = Math.floor((total % 3600) / 60);
    cdS = total % 60;
  } else if (!isEzan && !isKametAlert && !isBlackout) {
    const total = flow.countdownSeconds;
    cdH = Math.floor(total / 3600);
    cdM = Math.floor((total % 3600) / 60);
    cdS = total % 60;
  }

  /* -------------------------------------------------------
     GÜNEŞE KALAN SÜRE
     ------------------------------------------------------- */

  const gunesDate = new Date(now);
  const [gh, gm] = times.gunes.split(":").map(Number);
  gunesDate.setHours(gh, gm, 0, 0);

  const gunesKalanSec = Math.max(
    0,
    Math.floor((gunesDate.getTime() - now.getTime()) / 1000)
  );

  const gunesKalanH = Math.floor(gunesKalanSec / 3600);
  const gunesKalanM = Math.floor((gunesKalanSec % 3600) / 60);
  const gunesKalanS = gunesKalanSec % 60;

  /* -------------------------------------------------------
     VAKİT LİSTESİ
     ------------------------------------------------------- */

  const currentLabel = flow.currentVakit
    ? VAKIT_LABEL[lang][flow.currentVakit]
    : "—";

  const nextLabel = flow.nextVakit
    ? VAKIT_LABEL[lang][flow.nextVakit]
    : "—";

  const nextTime = flow.nextVakitTime;
  const kametVakit = flow.activeEzanVakit;

  const vakitList = [
    { key: "sabah", ezan: times.sabah, kamet: times.sabahKamet },
    { key: "gunes", ezan: times.gunes, kamet: null },
    { key: "ogle", ezan: times.ogle, kamet: getKametTime("ogle", times.ogle) },
    { key: "ikindi", ezan: times.ikindi, kamet: getKametTime("ikindi", times.ikindi) },
    { key: "aksam", ezan: times.aksam, kamet: getKametTime("aksam", times.aksam) },
    { key: "yatsi", ezan: times.yatsi, kamet: getKametTime("yatsi", times.yatsi) },
  ];

  /* -------------------------------------------------------
     ALT BAR TIKLAMA (GİZLİ AYARLAR)
     ------------------------------------------------------- */

  const handleBottomClick = useCallback(() => {
    settingsClickCount.current += 1;

    if (settingsTimer.current) clearTimeout(settingsTimer.current);

    settingsTimer.current = setTimeout(() => {
      settingsClickCount.current = 0;
    }, 1000);

    if (settingsClickCount.current >= 3) {
      settingsClickCount.current = 0;
      setShowSettings(true);
    }
  }, []);

  /* -------------------------------------------------------
     BLACKOUT EKRANI
     ------------------------------------------------------- */

  if (isBlackout) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          background: "#000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
        }}
      >
        <img
          src="img/close.png?v=5"
          alt="Lütfen telefonunuzu kapatın!"
          style={{
            maxWidth: "100%",
            maxHeight: "95vh",
            objectFit: "contain",
          }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <div
          style={{
            color: "#c9a66b",
            fontSize: 28,
            fontFamily: "'Segoe UI', Arial, sans-serif",
            letterSpacing: 2,
            textAlign: "center",
          }}
        >
          {lang === "tr"
            ? "🤲 Namaz vakti — Lütfen telefonlarınızı kapatın!"
            : "🤲 Gebetszeit — Bitte schalten Sie Ihre Handys aus!"}
        </div>
        <div style={{ color: "#6a9e78", fontSize: 22 }}>
          {lang === "tr" ? "Kalan süre" : "Verbleibende Zeit"}:{" "}
          {fmt2(Math.floor(flow.blackoutRemaining / 60))}:
          {fmt2(flow.blackoutRemaining % 60)}
        </div>
      </div>
    );
  }
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "fixed",
        top: 0,
        left: 0,
        background: "#000",
        zIndex: 0,
      }}
    >
      <div className="tv-safe-area">
        <div
          className="outer-frame"
          style={{ display: "flex", flexDirection: "column", position: "relative" }}
        >
          {/* AYARLAR OVERLAY */}
          {showSettings && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "#0a3d2e",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 24,
                padding: 40,
                overflowY: "auto",
                zIndex: 10,
              }}
            >
              <div
                style={{
                  color: "#c9a66b",
                  fontSize: 22,
                  fontWeight: "bold",
                  marginBottom: 8,
                }}
              >
                ⚙️ {lang === "tr" ? "Ayarlar" : "Einstellungen"}
              </div>

              {/* SABAH KAMET */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  width: "100%",
                  maxWidth: 600,
                }}
              >
                <span
                  style={{
                    color: "#f5d78e",
                    fontSize: 20,
                    flex: 1,
                  }}
                >
                  {lang === "tr" ? "Sabah Kamet Saati" : "Fajr Iqâmat-Zeit"}
                </span>
                <input
                  type="time"
                  value={sabahKametInput}
                  onChange={(e) => setSabahKametInput(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "8px 12px",
                    borderRadius: 8,
                    border: "2px solid #c9a66b",
                    background: "#1a5c3a",
                    color: "#f5d78e",
                    fontSize: 18,
                  }}
                />
              </div>

              {/* HİCRİ TAKVİM */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  width: "100%",
                  maxWidth: 600,
                }}
              >
                <span
                  style={{
                    color: "#f5d78e",
                    fontSize: 20,
                  }}
                >
                  {lang === "tr"
                    ? "Hicri Takvim Düzeltmesi"
                    : "Hidschra-Kalender Korrektur"}
                </span>

                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "center",
                  }}
                >
                  <button
                    onClick={() => setHicriOffset((o) => o - 1)}
                    style={{
                      padding: "8px 20px",
                      fontSize: 22,
                      background: "#1a5c3a",
                      color: "#c9a66b",
                      border: "2px solid #c9a66b",
                      borderRadius: 8,
                      cursor: "pointer",
                    }}
                  >
                    −
                  </button>

                  <span
                    style={{
                      color: "#f5d78e",
                      fontSize: 22,
                      minWidth: 60,
                      textAlign: "center",
                    }}
                  >
                    {hicriOffset > 0 ? `+${hicriOffset}` : hicriOffset}{" "}
                    {lang === "tr" ? "gün" : "Tage"}
                  </span>

                  <button
                    onClick={() => setHicriOffset((o) => o + 1)}
                    style={{
                      padding: "8px 20px",
                      fontSize: 24,
                      background: "#1a5c3a",
                      color: "#c9a66b",
                      border: "2px solid #c9a66b",
                      borderRadius: 8,
                      cursor: "pointer",
                    }}
                  >
                    +
                  </button>
                </div>

                <div style={{ color: "#6a9e78", fontSize: 16 }}>
                  {lang === "tr" ? `Şu an: ${hicriTR}` : `Aktuell: ${hicriDE}`}
                </div>
              </div>

              {/* BAYRAM SAATLERİ */}
              <div style={{ width: "100%", maxWidth: 600 }}>
                <button
                  onClick={() => setShowBayramForm((v) => !v)}
                  style={{
                    padding: "8px 20px",
                    fontSize: 18,
                    background: "#1a5c3a",
                    color: "#c9a66b",
                    border: "2px solid #c9a66b",
                    borderRadius: 8,
                    cursor: "pointer",
                    marginBottom: 12,
                  }}
                >
                  {lang === "tr" ? "Bayram Saatleri" : "Feiertagszeiten"} ▾
                </button>

                {showBayramForm &&
                  SETTINGS.bayramlar.map((b) => (
                    <div
                      key={b.tarih}
                      style={{
                        display: "flex",
                        gap: 12,
                        alignItems: "center",
                        marginBottom: 8,
                      }}
                    >
                      <span
                        style={{
                          color: "#f5d78e",
                          flex: 1,
                          fontSize: 16,
                        }}
                      >
                        {lang === "tr" ? b.ad_tr : b.ad_de} — {b.tarih}
                      </span>

                      <input
                        type="time"
                        value={bayramInputs[b.tarih] || "09:00"}
                        onChange={(e) =>
                          setBayramInputs((prev) => ({
                            ...prev,
                            [b.tarih]: e.target.value,
                          }))
                        }
                        style={{
                          flex: 1,
                          padding: "6px 10px",
                          borderRadius: 6,
                          border: "2px solid #c9a66b",
                          background: "#0a3d2e",
                          color: "#f5d78e",
                          fontSize: 16,
                        }}
                      />
                    </div>
                  ))}
              </div>

              {/* DUYURULAR */}
              <div style={{ width: "100%", maxWidth: 600 }}>
                <button
                  onClick={() => setShowDuyuruForm((v) => !v)}
                  style={{
                    padding: "8px 20px",
                    fontSize: 18,
                    background: "#1a5c3a",
                    color: "#c9a66b",
                    border: "2px solid #c9a66b",
                    borderRadius: 8,
                    cursor: "pointer",
                    marginBottom: 12,
                  }}
                >
                  {lang === "tr" ? "Duyurular" : "Ankündigungen"} ▾
                </button>

                {showDuyuruForm && (
                  <>
                    {/* TR DUYURU */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                        marginBottom: 12,
                      }}
                    >
                      <span
                        style={{
                          color: "#f5d78e",
                          fontSize: 22,
                        }}
                      >
                        {lang === "tr"
                          ? "Türkçe Duyuru"
                          : "Türkische Ankündigung"}
                      </span>

                      <textarea
                        value={duyuruTR}
                        onChange={(e) => setDuyuruTR(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          borderRadius: 6,
                          border: "2px solid #c9a66b",
                          background: "#0a3d2e",
                          color: "#f5d78e",
                          fontSize: 22,
                          minHeight: 80,
                          resize: "vertical",
                        }}
                      />
                    </div>

                    {/* DE DUYURU */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      <span
                        style={{
                          color: "#f5d78e",
                          fontSize: 16,
                        }}
                      >
                        {lang === "tr"
                          ? "Almanca Duyuru"
                          : "Deutsche Ankündigung"}
                      </span>

                      <textarea
                        value={duyuruDE}
                        onChange={(e) => setDuyuruDE(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          borderRadius: 6,
                          border: "2px solid #c9a66b",
                          background: "#0a3d2e",
                          color: "#f5d78e",
                          fontSize: 22,
                          minHeight: 80,
                          resize: "vertical",
                        }}
                      />
                    </div>
                  </>
                )}
              </div>

              {/* BİLGİ NOTU */}
              <div
                style={{
                  color: "#6a9e78",
                  fontSize: 22,
                  textAlign: "center",
                  maxWidth: 600,
                  marginTop: 8,
                }}
              >
                ℹ️{" "}
                {lang === "tr"
                  ? "TV'den yapılan değişiklikler bu cihazda saklanır. Tüm TV'ler için GitHub'da public/config.json dosyasını güncelleyin."
                  : "Änderungen von TV werden auf diesem Gerät gespeichert. Für alle TVs aktualisieren Sie public/config.json auf GitHub."}
              </div>

              {/* KAPAT */}
              <button
                onClick={() => setShowSettings(false)}
                style={{
                  marginTop: 16,
                  padding: "12px 40px",
                  fontSize: 20,
                  background: "#c9a66b",
                  color: "#0a3d2e",
                  border: "none",
                  borderRadius: 10,
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                ✓ {lang === "tr" ? "Kaydet & Kapat" : "Speichern & Schließen"}
              </button>
            </div>
          )}
          {/* ÜST BAR */}
          <div
            className="top-bar"
            style={{
              background: "linear-gradient(180deg,#0e5c3a 0%,#0a3d2e 100%)",
              borderBottom: "4px solid #c9a66b",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 32px",
            }}
          >
            {/* TARİH BLOĞU */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                minWidth: 260,
              }}
            >
              <div
                style={{
                  color: "#c9a66b",
                  fontSize: 22,
                  fontWeight: 500,
                  letterSpacing: 1,
                  lineHeight: 1,
                }}
              >
                {lang === "tr" ? hicriTR : hicriDE}
              </div>

              <div
                style={{
                  color: "#f5d78e",
                  fontSize: 28,
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                {lang === "tr" ? miladiTR : miladiDE}
              </div>
            </div>

            {/* CAMİ ADI */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  color: "#f5d78e",
                  fontSize: 52,
                  fontWeight: 900,
                  letterSpacing: 6,
                  textTransform: "uppercase",
                  textAlign: "center",
                  lineHeight: 1,
                  fontFamily: "'Segoe UI', 'Arial', sans-serif",
                }}
              >
                {lang === "tr"
                  ? "RIDVAN CAMİİ — VİYANA"
                  : "RIDVAN MOSCHEE — WIEN"}
              </div>
            </div>

            {/* SAAT */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                minWidth: 220,
                justifyContent: "flex-end",
              }}
            >
              <span
                style={{
                  color: "#f5d78e",
                  fontSize: 68,
                  fontWeight: 900,
                  lineHeight: 1,
                  fontFamily: "monospace",
                }}
              >
                {hh}
              </span>

              <span
                style={{
                  color: "#c9a66b",
                  fontSize: 52,
                  fontWeight: 900,
                  margin: "0 4px",
                  fontFamily: "monospace",
                  animation: "pulse 1s infinite",
                }}
              >
                :
              </span>

              <span
                style={{
                  color: "#f5d78e",
                  fontSize: 68,
                  fontWeight: 900,
                  lineHeight: 1,
                  fontFamily: "monospace",
                }}
              >
                {mm}
              </span>

              <span
                style={{
                  color: "#c9a66b",
                  fontSize: 32,
                  fontWeight: 700,
                  marginBottom: 6,
                  marginLeft: 6,
                  fontFamily: "monospace",
                  animation: "pulse 1s infinite",
                }}
              >
                {ss}
              </span>
            </div>
          </div>

          {/* ANA PANELLER */}
          <div className="main-panels" style={{ display: "flex", flex: 1 }}>
            {/* SOL PANEL */}
            <div
              className="panel"
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                background: "#0a3d2e",
              }}
            >
              <div
                style={{
                  background: "#c9a66b",
                  textAlign: "center",
                  padding: "12px 0",
                  color: "#0a3d2e",
                  fontSize: 36,
                  fontWeight: 900,
                  letterSpacing: 3,
                  flexShrink: 0,
                  lineHeight: 1,
                }}
              >
                {lang === "tr" ? "NAMAZ VAKİTLERİ" : "GEBETSZEITEN"}
              </div>

              {/* TABLO BAŞLIKLARI */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1fr 1fr",
                  padding: "8px 20px",
                  borderBottom: "2px solid #c9a66b",
                  background: "#072d20",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    color: "#c9a66b",
                    fontSize: 24,
                    fontWeight: 700,
                    letterSpacing: 2,
                    lineHeight: 1,
                  }}
                >
                  {lang === "tr" ? "VAKİT" : "GEBET"}
                </span>

                <span
                  style={{
                    color: "#c9a66b",
                    fontSize: 24,
                    fontWeight: 700,
                    letterSpacing: 2,
                    textAlign: "center",
                    lineHeight: 1,
                  }}
                >
                  {lang === "tr" ? "EZAN" : "ADHAN"}
                </span>

                <span
                  style={{
                    color: "#c9a66b",
                    fontSize: 24,
                    fontWeight: 700,
                    letterSpacing: 2,
                    textAlign: "right",
                    lineHeight: 1,
                  }}
                >
                  {lang === "tr" ? "KAMET" : "IQÂMAT"}
                </span>
              </div>

              {/* VAKİT SATIRLARI */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {vakitList.map(({ key, ezan, kamet }) => {
                  const isActive = flow.currentVakit === key;
                  const isNext = flow.nextVakit === key;

                  return (
                    <div
                      key={key}
                      className={isActive ? "active-vakit-row" : ""}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1.2fr 1fr 1fr",
                        padding: "0 20px",
                        flex: 1,
                        borderBottom: "1px solid #c9a66b33",
                        background: isActive
                          ? undefined
                          : isNext
                          ? "rgba(201,166,107,0.07)"
                          : "transparent",
                        borderLeft: isActive
                          ? "7px solid #c9a66b"
                          : "7px solid transparent",
                        alignItems: "center",
                        transition: "background 0.3s",
                      }}
                    >
                      <span
                        className={isActive ? "active-vakit-text" : ""}
                        style={{
                          color: isActive ? "#f5d78e" : "#a8c8b0",
                          fontSize: isActive ? 36 : 32,
                          fontWeight: isActive ? 900 : 600,
                          letterSpacing: 1,
                          lineHeight: 1,
                        }}
                      >
                        {VAKIT_LABEL[lang][key]}
                      </span>

                      <span
                        style={{
                          color: "#f5d78e",
                          fontSize: 32,
                          textAlign: "center",
                          lineHeight: 1,
                        }}
                      >
                        {ezan}
                      </span>

                      <span
                        style={{
                          color: "#f5d78e",
                          fontSize: 32,
                          textAlign: "right",
                          lineHeight: 1,
                        }}
                      >
                        {kamet || "—"}
                      </span>
                    </div>
                  );
                })}
                {/* CUMA SATIRI */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.2fr 1fr 1fr",
                    padding: "0 20px",
                    flex: 1,
                    background: "#c9a66b",
                    alignItems: "center",
                    borderLeft: "7px solid #a07d3a",
                    lineHeight: 1,
                  }}
                >
                  <span
                    style={{
                      color: "#0a3d2e",
                      fontSize: 34,
                      fontWeight: 900,
                      letterSpacing: 1,
                      lineHeight: 1,
                    }}
                  >
                    {lang === "tr" ? "CUMA" : "DSCHUM'A"}
                  </span>

                  <span
                    style={{
                      color: "#0a3d2e",
                      fontSize: 46,
                      fontWeight: 700,
                      textAlign: "center",
                      fontFamily: "monospace",
                      lineHeight: 1,
                    }}
                  >
                    {SETTINGS.cuma.ezan}
                  </span>

                  <span
                    style={{
                      color: "#0a3d2e",
                      fontSize: 40,
                      textAlign: "right",
                      fontFamily: "monospace",
                      lineHeight: 1,
                    }}
                  >
                    {SETTINGS.cuma.kamet}
                  </span>
                </div>

                {/* BAYRAM SATIRI */}
                {bayram.visible && bayram.bayram && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.2fr 1fr 1fr",
                      padding: "0 20px",
                      flex: 1,
                      background: "rgba(201,166,107,0.15)",
                      borderTop: "2px solid #c9a66b66",
                      alignItems: "center",
                      lineHeight: 1,
                    }}
                  >
                    <span
                      style={{
                        color: "#f5d78e",
                        fontSize: 26,
                        fontWeight: 700,
                        lineHeight: 1,
                      }}
                    >
                      {lang === "tr"
                        ? bayram.bayram.ad_tr
                        : bayram.bayram.ad_de}
                    </span>

                    <span
                      style={{
                        color: "#f5d78e",
                        fontSize: 40,
                        fontWeight: 700,
                        textAlign: "center",
                        fontFamily: "monospace",
                        lineHeight: 1,
                      }}
                    >
                      {bayram.saat}
                    </span>

                    <span
                      style={{
                        color: "#a8c8b0",
                        fontSize: 34,
                        textAlign: "right",
                        lineHeight: 1,
                      }}
                    >
                      —
                    </span>
                  </div>
                )}

                {/* HAFTA SONU ÖĞLE MESAJI */}
                {weekendMsg && (
                  <div
                    style={{
                      padding: "8px 16px",
                      color: "#c9a66b",
                      fontSize: 16,
                      fontStyle: "italic",
                      flexShrink: 0,
                      borderTop: "1px solid #c9a66b33",
                      lineHeight: 1,
                    }}
                  >
                    {lang === "tr"
                      ? "Haftasonu eğitimi sebebiyle öğle namazı 13:00 olarak ayarlanmıştır."
                      : "Das Mittagsgebet ist aufgrund des Wochenendunterrichts auf 13:00 Uhr festgelegt."}
                  </div>
                )}
              </div>
            </div>

            {/* ORTA PANEL */}
            <div
              className="panel"
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "#0a3d2e",
                gap: 20,
              }}
            >
              {isKametAlert ? (
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      color: "#c9a66b",
                      fontSize: 58,
                      fontWeight: 900,
                      letterSpacing: 6,
                      animation: "pulse 1s infinite",
                      marginBottom: 20,
                      lineHeight: 1,
                    }}
                  >
                    {lang === "tr" ? "KAMET" : "IQÂMAT"}
                  </div>

                  <div
                    style={{
                      color: "#f5d78e",
                      fontSize: 108,
                      fontWeight: 900,
                      letterSpacing: 4,
                      animation: "pulse 1s infinite",
                      lineHeight: 1,
                    }}
                  >
                    {kametVakit ? VAKIT_NAMES[lang][kametVakit] : ""}
                  </div>
                </div>
              ) : (
                <>
                  {/* GÜNÜN VAKTİ */}
                  <div className="panel-title">
                    {lang === "tr" ? "GÜNÜN VAKTİ" : "AKTUELLE GEBETSZEIT"}
                  </div>

                  <div className={`current-vakit ${isEzan ? "ezan" : ""}`}>
                    {currentLabel}
                  </div>

                  {/* SONRAKİ VAKİT */}
                  {!isKametCountdown && (
                    <>
                      <div className="panel-title" style={{ marginTop: 8 }}>
                        {lang === "tr"
                          ? "SONRAKI VAKİT"
                          : "NÄCHSTE GEBETSZEIT"}
                      </div>

                      <div className="next-vakit">
                        {nextLabel} — {nextTime}
                      </div>
                    </>
                  )}

                  {/* KAMETE KALAN SÜRE */}
                  {isKametCountdown && (
                    <div style={{ textAlign: "center", marginTop: 8 }}>
                      <div className="panel-title">
                        {lang === "tr"
                          ? "KAMETE KALAN SÜRE"
                          : "ZEIT BIS ZUM IQÂMAT"}
                      </div>

                      <div
                        style={{
                          color: "#f5d78e",
                          fontSize: 70,
                          fontWeight: 700,
                          marginTop: 16,
                          lineHeight: 1,
                        }}
                      >
                        {kametVakit ? VAKIT_NAMES[lang][kametVakit] : ""}
                      </div>
                    </div>
                  )}

                  {/* GERİ SAYIM */}
                  <div className="countdown-row">
                    {[
                      { val: fmt2(cdH), label: lang === "tr" ? "Saat" : "Std." },
                      null,
                      { val: fmt2(cdM), label: lang === "tr" ? "Dakika" : "Min." },
                      null,
                      { val: fmt2(cdS), label: lang === "tr" ? "Saniye" : "Sek." },
                    ].map((item, i) =>
                      item === null ? (
                        <span key={i} className="countdown-separator">:</span>
                      ) : (
                        <div key={i} className="countdown-box">
                          <span className="countdown-value">{item.val}</span>
                          <span className="countdown-label">{item.label}</span>
                        </div>
                      )
                    )}
                  </div>

                  {/* SABAH → GÜNEŞE KALAN */}
                  {flow.currentVakit === "sabah" &&
                    !isEzan &&
                    !isKametCountdown && (
                      <div style={{ textAlign: "center", marginTop: 16 }}>
                        <div
                          style={{
                            color: "#c9a66b",
                            fontSize: 36,
                            letterSpacing: 3,
                            lineHeight: 1,
                          }}
                        >
                          {lang === "tr" ? "GÜNEŞE KALAN" : "BIS SCHURUQ"}
                        </div>

                        <div
                          style={{
                            color: "#a8c8b0",
                            fontSize: 40,
                            fontWeight: 700,
                            lineHeight: 1,
                          }}
                        >
                          {fmt2(gunesKalanH)}:
                          {fmt2(gunesKalanM)}:
                          {fmt2(gunesKalanS)}
                        </div>
                      </div>
                    )}
                </>
              )}

              {/* BAYRAM KUTUSU */}
              {bayram.visible && (
                <div
                  style={{
                    marginTop: 20,
                    padding: "12px 36px",
                    background: "#c9a66b22",
                    border: "3px solid #c9a66b",
                    borderRadius: 12,
                    color: "#f5d78e",
                    fontSize: 35,
                    fontWeight: 700,
                    textAlign: "center",
                    lineHeight: 1,
                  }}
                >
                  🎉 {lang === "tr" ? bayram.bayram?.ad_tr : bayram.bayram?.ad_de}
                </div>
              )}
            </div>
            {/* SAĞ PANEL - DUA + DUYURULAR */}
            <div
              className="panel"
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                background: "#0a3d2e",
              }}
            >
              {/* ÜST YARI - DUA */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  borderBottom: "3px solid #c9a66b",
                }}
              >
                <div
                  style={{
                    background: "#c9a66b",
                    textAlign: "center",
                    padding: "10px 0",
                    color: "#0a3d2e",
                    fontSize: 36,
                    fontWeight: 900,
                    letterSpacing: 3,
                  }}
                >
                  {isEzan
                    ? duaLang === "tr"
                      ? "EZAN DUASI"
                      : "ADHAN-GEBET"
                    : lang === "tr"
                    ? "GÜNÜN DUASI"
                    : "DUA DES TAGES"}
                </div>

                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px 16px",
                    gap: 16,
                  }}
                >
                  {isEzan ? (
                    <>
                      <div
                        style={{
                          color: "#f5d78e",
                          fontSize: 36,
                          textAlign: "right",
                          lineHeight: 1.8,
                          direction: "rtl",
                          fontFamily: "serif",
                          width: "100%",
                        }}
                      >
                        {EZAN_DUASI.arabic}
                      </div>

                      <div
                        style={{
                          color: "#a8c8b0",
                          fontSize: 22,
                          textAlign: "center",
                          lineHeight: 1.6,
                        }}
                      >
                        {duaLang === "tr"
                          ? EZAN_DUASI.tr
                          : EZAN_DUASI.de}
                      </div>
                    </>
                  ) : (
                    <>
                      {dailyDua.source && (
                        <div
                          style={{
                            background: "transparent",
                            border: "2px solid #c9a66b",
                            borderRadius: 8,
                            padding: "4px 16px",
                            color: "#c9a66b",
                            fontSize: 22,
                            fontWeight: 700,
                            letterSpacing: 3,
                          }}
                        >
                          {dailyDua.source}
                        </div>
                      )}

                      <div
                        style={{
                          color: "#f5d78e",
                          fontSize: 22,
                          textAlign: "right",
                          lineHeight: 1.8,
                          direction: "rtl",
                          fontFamily: "serif",
                          width: "100%",
                        }}
                      >
                        {dailyDua.ar}
                      </div>

                      <div
                        style={{
                          color: "#a8c8b0",
                          fontSize: 22,
                          textAlign: "center",
                          lineHeight: 1.6,
                        }}
                      >
                        {lang === "tr"
                          ? dailyDua.tr
                          : dailyDua.de}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* ALT YARI - DUYURULAR */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    background: "#c9a66b",
                    textAlign: "center",
                    padding: "10px 0",
                    color: "#0a3d2e",
                    fontSize: 36,
                    fontWeight: 900,
                    letterSpacing: 3,
                  }}
                >
                  {lang === "tr" ? "DUYURULAR" : "ANKÜNDIGUNGEN"}
                </div>

                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px 16px",
                  }}
                >
                  <div
                    style={{
                      color: "#f5d78e",
                      fontSize: 22,
                      textAlign: "center",
                      lineHeight: 1.6,
                      width: "100%",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {lang === "tr" ? duyuruTR || "—" : duyuruDE || "—"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ALT BAR */}
          <div
            className="bottom-bar"
            style={{
              background: "linear-gradient(180deg,#0a3d2e 0%,#072d20 100%)",
              borderTop: "4px solid #c9a66b",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 32px",
              cursor: "default",
              position: "relative",
            }}
          >
            <div
              style={{
                color: "#c9a66b",
                fontSize: 14,
                letterSpacing: 1,
              }}
              onClick={handleBottomClick}
            >
              Bu uygulama <strong>AyTa®</strong> tarafından hazırlanmıştır
            </div>

            <button
              onClick={() => setShowSettings(true)}
              title="Ayarlar"
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                background: "transparent",
                border: "1px solid #c9a66b44",
                borderRadius: 6,
                padding: "4px 10px",
                color: "#c9a66b77",
                fontSize: 16,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 4,
                transition: "all 0.2s",
                lineHeight: 1,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#c9a66b";
                e.currentTarget.style.borderColor = "#c9a66b";
                e.currentTarget.style.background = "#c9a66b11";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#c9a66b77";
                e.currentTarget.style.borderColor = "#c9a66b44";
                e.currentTarget.style.background = "transparent";
              }}
            >
              ⚙️
            </button>

            <div
              style={{
                border: "3px solid #c9a66b",
                borderRadius: 8,
                padding: "6px 12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ffffff",
                boxShadow: "0 0 0 1px #c9a66b",
              }}
            >
              <img
                src="img/logo.png?v=5"
                alt="Ridvan Camii Logo"
                style={{ height: 52, objectFit: "contain" }}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


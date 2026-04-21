import { useState, useEffect, useRef, useCallback } from "react";
import {
  getTodayTimes,
  computeFlow,
  getKametTime,
  getBayramVisibility,
  showWeekendOgleMsg,
  setSabahKametSaati,
  getSabahKametSaati,
  SETTINGS,
  computeHijri,
  type VakitKey,
} from "./utils/timeEngine";
import { DUA_ARCHIVE, EZAN_DUASI } from "./data/duaArchive";
import { getDuyurular, setDuyurular } from "./config/settings";

function fmt2(n: number) {
  return String(Math.max(0, n)).padStart(2, "0");
}

function miladiTRStr(d: Date) {
  return `${["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"][d.getDay()]}, ${d.getDate()} ${["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"][d.getMonth()]} ${d.getFullYear()}`;
}
function miladiDEStr(d: Date) {
  return `${["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"][d.getDay()]}, ${d.getDate()}. ${["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"][d.getMonth()]} ${d.getFullYear()}`;
}

const VAKIT_NAMES: Record<string, Record<VakitKey, string>> = {
  tr: { sabah: "SABAH", gunes: "GÜNEŞ", ogle: "ÖĞLE", ikindi: "İKİNDİ", aksam: "AKŞAM", yatsi: "YATSI" },
  de: { sabah: "FAJR", gunes: "SCHURUQ", ogle: "DHUHR", ikindi: "ASSR", aksam: "MAGHRIB", yatsi: "ISCHAA" },
};
const VAKIT_LABEL: Record<string, Record<VakitKey, string>> = {
  tr: { sabah: "Sabah", gunes: "Güneş", ogle: "Öğle", ikindi: "İkindi", aksam: "Akşam", yatsi: "Yatsı" },
  de: { sabah: "Fajr", gunes: "Schuruq", ogle: "Dhuhr", ikindi: "Assr", aksam: "Maghrib", yatsi: "Ischaa" },
};
const HICRI_AYLAR = ["", "Muharrem", "Safer", "Rebiülevvel", "Rebiülahir", "Cemâziyelevvel", "Cemâziyelahir", "Recep", "Şaban", "Ramazan", "Şevval", "Zilkade", "Zilhicce"];

function getDailyDua(date: Date) { return DUA_ARCHIVE[date.getDate() % DUA_ARCHIVE.length]; }

function applyAutoScale() {
  const el = document.querySelector(".tv-safe-area");
  if (!el) return;
  const w = window.innerWidth || 1920;
  let s = w / 1920;
  if (!s || s <= 0 || s > 2) s = 1;
  s *= 0.95;
  (el as HTMLElement).style.transform = `translateX(-50%) scale(${s})`;
  (el as HTMLElement).style.transformOrigin = "top center";
}

export default function App() {
  const [now, setNow] = useState(() => new Date());
  const [lang, setLang] = useState<"tr" | "de">("tr");
  const [hicriOffset, setHicriOffset] = useState(0);
  const [sabahKametInput, setSabahKametInput] = useState("05:15");
  const [showSettings, setShowSettings] = useState(false);
  const [bayramInputs, setBayramInputs] = useState<Record<string, string>>({});
  const [showBayramForm, setShowBayramForm] = useState(false);
  const [duaLang, setDuaLang] = useState<"tr" | "de">("tr");
  const [duyuruTR, setDuyuruTR] = useState("");
  const [duyuruDE, setDuyuruDE] = useState("");
  const [showDuyuruForm, setShowDuyuruForm] = useState(false);
  const [configLoaded, setConfigLoaded] = useState(false);

  const settingsClickCount = useRef(0);
  const settingsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const savedKamet = localStorage.getItem("manuelSabahKamet");
    if (savedKamet) setSabahKametInput(savedKamet);
    const savedDuyuru = localStorage.getItem("duyurular_metni");
    if (savedDuyuru) {
      try {
        const p = JSON.parse(savedDuyuru);
        if (p.tr) setDuyuruTR(p.tr);
        if (p.de) setDuyuruDE(p.de);
      } catch { setDuyuruTR(savedDuyuru); }
    }
    const savedBayram = localStorage.getItem("ridvan_bayram_inputs");
    if (savedBayram) { try { setBayramInputs(JSON.parse(savedBayram)); } catch { console.error(savedBayram); } }
    setConfigLoaded(true);
  }, []);

  useEffect(() => {
    if (configLoaded) {
      localStorage.setItem("manuelSabahKamet", sabahKametInput);
      setDuyurular({ tr: duyuruTR, de: duyuruDE });
      localStorage.setItem("ridvan_bayram_inputs", JSON.stringify(bayramInputs));
    }
  }, [sabahKametInput, duyuruTR, duyuruDE, bayramInputs, configLoaded]);

  useEffect(() => { setSabahKametSaati(sabahKametInput); }, [sabahKametInput]);

  useEffect(() => {
    const t = setTimeout(() => applyAutoScale(), 50);
    window.addEventListener("resize", applyAutoScale);
    return () => { clearTimeout(t); window.removeEventListener("resize", applyAutoScale); };
  }, []);

  useEffect(() => {
    const id = setInterval(() => setLang((l) => (l === "tr" ? "de" : "tr")), 20000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const times = getTodayTimes(now);
  const flow = computeFlow(now, times);
  const bayram = getBayramVisibility(now);
  const weekendMsg = showWeekendOgleMsg(now);
  const dailyDua = getDailyDua(now);

  const hijriDate = computeHijri(now);
  const hicriTR = `${hijriDate.day} ${HICRI_AYLAR[hijriDate.month]} ${hijriDate.year}`;
  const hicriDE = `${hijriDate.day}. ${HICRI_AYLAR[hijriDate.month]} ${hijriDate.year}`;

  const miladiTR = miladiTRStr(now);
  const miladiDE = miladiDEStr(now);

  const hh = fmt2(now.getHours());
  const mm = fmt2(now.getMinutes());
  const ss = fmt2(now.getSeconds());

  const isEzan = flow.phase === "ezan";
  const isKametCountdown = flow.phase === "kamet_countdown";
  const isKametAlert = flow.phase === "kamet_alert";
  const isBlackout = flow.phase === "blackout";

  let cdH = 0, cdM = 0, cdS = 0;
  if (isKametCountdown) {
    cdH = Math.floor(flow.kametCountdown / 3600);
    cdM = Math.floor((flow.kametCountdown % 3600) / 60);
    cdS = flow.kametCountdown % 60;
  } else if (!isEzan && !isKametAlert && !isBlackout) {
    cdH = Math.floor(flow.countdownSeconds / 3600);
    cdM = Math.floor((flow.countdownSeconds % 3600) / 60);
    cdS = flow.countdownSeconds % 60;
  }

  const gunesDate = new Date(now);
  const [gh, gm] = times.gunes.split(":").map(Number);
  gunesDate.setHours(gh, gm, 0, 0);
  const gunesKalanSec = Math.max(0, Math.floor((gunesDate.getTime() - now.getTime()) / 1000));
  const gunesKalanH = Math.floor(gunesKalanSec / 3600);
  const gunesKalanM = Math.floor((gunesKalanSec % 3600) / 60);
  const gunesKalanS = gunesKalanSec % 60;

  const getLabel = (key: VakitKey) => VAKIT_LABEL[lang]?.[key] ?? key;
  const getName = (key: VakitKey) => VAKIT_NAMES[lang]?.[key] ?? key;

  const currentLabel = flow.currentVakit ? getLabel(flow.currentVakit) : "—";
  const nextLabel = flow.nextVakit ? getLabel(flow.nextVakit) : "—";
  const nextTime = flow.nextVakitTime;
  const kametVakit = flow.activeEzanVakit;

  const vakitList: { key: VakitKey; ezan: string; kamet: string | null }[] = [
    { key: "sabah", ezan: times.sabah, kamet: times.sabahKamet },
    { key: "gunes", ezan: times.gunes, kamet: null },
    { key: "ogle", ezan: times.ogle, kamet: getKametTime("ogle", times.ogle) },
    { key: "ikindi", ezan: times.ikindi, kamet: getKametTime("ikindi", times.ikindi) },
    { key: "aksam", ezan: times.aksam, kamet: getKametTime("aksam", times.aksam) },
    { key: "yatsi", ezan: times.yatsi, kamet: getKametTime("yatsi", times.yatsi) },
  ];

  const handleBottomClick = useCallback(() => {
    settingsClickCount.current += 1;
    if (settingsTimer.current) clearTimeout(settingsTimer.current);
    settingsTimer.current = setTimeout(() => { settingsClickCount.current = 0; }, 1000);
    if (settingsClickCount.current >= 3) { settingsClickCount.current = 0; setShowSettings(true); }
  }, []);

  const handleSaveAndClose = () => setShowSettings(false);

  // ============================================
  // 🚨 BLACKOUT EKRANI (KAMET + 10 DK)
  // ============================================
  if (isBlackout) {
    return (
      <div style={{ width: "100vw", height: "100vh", background: "#000", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32 }}>
        <img src="img/close.png?v=5" alt="Kapat" style={{ maxWidth: "100%", maxHeight: "95vh", objectFit: "contain" }} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
        <div style={{ color: "#c9a66b", fontSize: 28, fontFamily: "'Segoe UI', Arial, sans-serif", letterSpacing: 2, textAlign: "center" }}>
          {lang === "tr" ? "🤲 Namaz vakti — Lütfen telefonlarınızı kapatın!" : "🤲 Gebetszeit — Bitte schalten Sie Ihre Handys aus!"}
        </div>
        <div style={{ color: "#6a9e78", fontSize: 22 }}>
          {lang === "tr" ? "Kalan süre" : "Verbleibende Zeit"}: {fmt2(Math.floor(flow.blackoutRemaining / 60))}:{fmt2(flow.blackoutRemaining % 60)}
        </div>
      </div>
    );
  }

  // ============================================
  // 📋 AYARLAR PANELİ
  // ============================================
  const SettingsPanel = () => (
    <div style={{ position: "absolute", inset: 0, background: "#0a3d2e", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24, padding: 40, overflowY: "auto", zIndex: 10 }}>
      <div style={{ color: "#c9a66b", fontSize: 22, fontWeight: "bold", marginBottom: 8 }}>& {lang === "tr" ? "Ayarlar" : "Einstellungen"}</div>

      <div style={{ display: "flex", alignItems: "center", gap: 16, width: "100%", maxWidth: 600 }}>
        <span style={{ color: "#f5d78e", fontSize: 20, flex: 1 }}>{lang === "tr" ? "Sabah Kamet Saati" : "Fajr Iqâmat-Zeit"}</span>
        <input type="time" value={sabahKametInput} onChange={(e) => setSabahKametInput(e.target.value)} style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: "2px solid #c9a66b", background: "#1a5c3a", color: "#f5d78e", fontSize: 18 }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", maxWidth: 600 }}>
        <span style={{ color: "#f5d78e", fontSize: 20 }}>{lang === "tr" ? "Hicri Takvim Düzeltmesi" : "Hidschra-Kalender Korrektur"}</span>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button onClick={() => setHicriOffset((o) => o - 1)} style={{ padding: "8px 20px", fontSize: 22, background: "#1a5c3a", color: "#c9a66b", border: "2px solid #c9a66b", borderRadius: 8, cursor: "pointer" }}>−</button>
          <span style={{ color: "#f5d78e", fontSize: 22, minWidth: 60, textAlign: "center" }}>{hicriOffset > 0 ? `+${hicriOffset}` : hicriOffset} {lang === "tr" ? "gün" : "Tage"}</span>
          <button onClick={() => setHicriOffset((o) => o + 1)} style={{ padding: "8px 20px", fontSize: 24, background: "#1a5c3a", color: "#c9a66b", border: "2px solid #c9a66b", borderRadius: 8, cursor: "pointer" }}>+</button>
        </div>
        <div style={{ color: "#6a9e78", fontSize: 16 }}>{lang === "tr" ? `Şu an: ${hicriTR}` : `Aktuell: ${hicriDE}`}</div>
      </div>

      <div style={{ width: "100%", maxWidth: 600 }}>
        <button onClick={() => setShowBayramForm((v) => !v)} style={{ padding: "8px 20px", fontSize: 18, background: "#1a5c3a", color: "#c9a66b", border: "2px solid #c9a66b", borderRadius: 8, cursor: "pointer", marginBottom: 12 }}>{lang === "tr" ? "Bayram Saatleri" : "Feiertagszeiten"} ▾</button>
        {showBayramForm && SETTINGS.bayramlar.map((b) => (
          <div key={b.tarih} style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
            <span style={{ color: "#f5d78e", flex: 1, fontSize: 16 }}>{lang === "tr" ? b.ad_tr : b.ad_de} — {b.tarih}</span>
            <input type="time" value={bayramInputs[b.tarih] || "09:00"} onChange={(e) => setBayramInputs((prev) => ({ ...prev, [b.tarih]: e.target.value }))} style={{ flex: 1, padding: "6px 10px", borderRadius: 6, border: "2px solid #c9a66b", background: "#0a3d2e", color: "#f5d78e", fontSize: 16 }} />
          </div>
        ))}
      </div>

      <div style={{ width: "100%", maxWidth: 600 }}>
        <button onClick={() => setShowDuyuruForm((v) => !v)} style={{ padding: "8px 20px", fontSize: 18, background: "#1a5c3a", color: "#c9a66b", border: "2px solid #c9a66b", borderRadius: 8, cursor: "pointer", marginBottom: 12 }}>{lang === "tr" ? "Duyurular" : "Ankündigungen"} ▾</button>
        {showDuyuruForm && (<>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
            <span style={{ color: "#f5d78e", fontSize: 22 }}>{lang === "tr" ? "Türkçe Duyuru" : "Türkische Ankündigung"}</span>
            <textarea value={duyuruTR} onChange={(e) => setDuyuruTR(e.target.value)} style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border: "2px solid #c9a66b", background: "#0a3d2e", color: "#f5d78e", fontSize: 22, minHeight: 80, resize: "vertical" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ color: "#f5d78e", fontSize: 16 }}>{lang === "tr" ? "Almanca Duyuru" : "Deutsche Ankündigung"}</span>
            <textarea value={duyuruDE} onChange={(e) => setDuyuruDE(e.target.value)} style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border: "2px solid #c9a66b", background: "#0a3d2e", color: "#f5d78e", fontSize: 22, minHeight: 80, resize: "vertical" }} />
          </div>
        </>)}
      </div>

      <div style={{ color: "#6a9e78", fontSize: 22, textAlign: "center", maxWidth: 600, marginTop: 8 }}>
        ! {lang === "tr" ? "TV'den yapılan değişiklikler bu cihazda saklanır. Tüm TV'ler için GitHub'da public/config.json dosyasını güncelleyin." : "Änderungen von TV werden auf diesem Gerät gespeichert. Für alle TVs aktualisieren Sie public/config.json auf GitHub."}
      </div>
      <button onClick={handleSaveAndClose} style={{ marginTop: 16, padding: "12px 40px", fontSize: 20, background: "#c9a66b", color: "#0a3d2e", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: "bold" }}>✓ {lang === "tr" ? "Kaydet & Kapat" : "Speichern & Schließen"}</button>
    </div>
  );

  // ============================================
  // 🎨 ANA EKRAN RENDER
  // ============================================
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#000", display: "flex", flexDirection: "column", overflow: "hidden", position: "fixed", top: 0, left: 0, zIndex: 0, userSelect: "none" }}>
      <div className="tv-safe-area">
        <div className="outer-frame" style={{ display: "flex", flexDirection: "column", position: "relative", height: "100%" }}>

          {showSettings && <SettingsPanel />}

          <div className="main-panels" style={{ display: "flex", flex: 1, height: "100%" }}>

            {/* ============================================ */}
            {/* 🟢 SOL PANEL - NAMAZ VAKİTLERİ              */}
            {/* ============================================ */}
            <div className="panel" style={{ flex: 1, display: "flex", flexDirection: "column", background: "#0a3d2e" }}>
              <div style={{ background: "#c9a66b", textAlign: "center", padding: "12px 0", color: "#0a3d2e", fontSize: 36, fontWeight: 900, letterSpacing: 3, flexShrink: 0, lineHeight: 1 }}>{lang === "tr" ? "NAMAZ VAKİTLERİ" : "GEBETSZEITEN"}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", padding: "8px 20px", borderBottom: "2px solid #c9a66b", background: "#072d20", flexShrink: 0 }}>
                <span style={{ color: "#c9a66b", fontSize: 24, fontWeight: 700, letterSpacing: 2, lineHeight: 1 }}>{lang === "tr" ? "VAKİT" : "GEBET"}</span>
                <span style={{ color: "#c9a66b", fontSize: 24, fontWeight: 700, letterSpacing: 2, textAlign: "center", lineHeight: 1 }}>{lang === "tr" ? "EZAN" : "ADHAN"}</span>
                <span style={{ color: "#c9a66b", fontSize: 24, fontWeight: 700, letterSpacing: 2, textAlign: "right", lineHeight: 1 }}>{lang === "tr" ? "KAMET" : "IQÂMAT"}</span>
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                {vakitList.map(({ key, ezan, kamet }) => {
                  const isActive = flow.currentVakit === key;
                  const isNext = flow.nextVakit === key;
                  return (
                    <div key={key} className={isActive ? "active-vakit-row" : ""} style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", padding: "0 20px", flex: 1, borderBottom: "1px solid #c9a66b33", background: isNext ? "rgba(201,166,107,0.07)" : "transparent", borderLeft: isActive ? "7px solid #c9a66b" : "7px solid transparent", alignItems: "center", transition: "background 0.3s" }}>
                      <span className={isActive ? "active-vakit-text" : ""} style={{ color: isActive ? "#f5d78e" : "#a8c8b0", fontSize: isActive ? 36 : 32, fontWeight: isActive ? 900 : 600, letterSpacing: 1, lineHeight: 1 }}>{getName(key)}</span>
                      <span className={isActive ? "active-vakit-text" : ""} style={{ color: "#f5d78e", fontSize: isActive ? 48 : 44, fontWeight: 700, textAlign: "center", fontFamily: "monospace", lineHeight: 1 }}>{ezan}</span>
                      <span className={isActive ? "active-vakit-text" : ""} style={{ color: isActive ? "#f5d78e" : "#a8c8b0", fontSize: 40, textAlign: "right", fontFamily: "monospace", lineHeight: 1 }}>{kamet ?? "—"}</span>
                    </div>
                  );
                })}
                <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", padding: "0 20px", flex: 1, background: "#c9a66b", alignItems: "center", borderLeft: "7px solid #a07d3a", lineHeight: 1 }}>
                  <span style={{ color: "#0a3d2e", fontSize: 34, fontWeight: 900, letterSpacing: 1, lineHeight: 1 }}>{lang === "tr" ? "CUMA" : "DSCHUM'A"}</span>
                  <span style={{ color: "#0a3d2e", fontSize: 46, fontWeight: 700, textAlign: "center", fontFamily: "monospace", lineHeight: 1 }}>{SETTINGS.cuma.ezan}</span>
                  <span style={{ color: "#0a3d2e", fontSize: 40, textAlign: "right", fontFamily: "monospace", lineHeight: 1 }}>{SETTINGS.cuma.kamet}</span>
                </div>
                {bayram.visible && bayram.bayram && (
                  <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", padding: "0 20px", flex: 1, background: "rgba(201,166,107,0.15)", borderTop: "2px solid #c9a66b66", alignItems: "center", lineHeight: 1 }}>
                    <span style={{ color: "#f5d78e", fontSize: 26, fontWeight: 700, lineHeight: 1 }}>{lang === "tr" ? bayram.bayram.ad_tr : bayram.bayram.ad_de}</span>
                    <span style={{ color: "#f5d78e", fontSize: 40, fontWeight: 700, textAlign: "center", fontFamily: "monospace", lineHeight: 1 }}>{bayram.saat}</span>
                    <span style={{ color: "#a8c8b0", fontSize: 34, textAlign: "right", lineHeight: 1 }}>—</span>
                  </div>
                )}
                {weekendMsg && <div style={{ padding: "8px 16px", color: "#c9a66b", fontSize: 16, fontStyle: "italic", flexShrink: 0, borderTop: "1px solid #c9a66b33", lineHeight: 1 }}>{lang === "tr" ? "Haftasonu eğitimi sebebiyle öğle namazı 13:00 olarak ayarlanmıştır." : "Das Mittagsgebet ist aufgrund des Wochenendunterrichts auf 13:00 Uhr festgelegt."}</div>}
              </div>
            </div>

            {/* ============================================ */}
            {/* 🟡 ORTA PANEL - DUA & SAAT                  */}
            {/* ============================================ */}
            <div className="panel" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#0a3d2e", gap: 20 }}>
              {isKametAlert ? (
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: "#c9a66b", fontSize: 58, fontWeight: 900, letterSpacing: 6, animation: "pulse 1s infinite", marginBottom: 20, lineHeight: 1 }}>{lang === "tr" ? "KAMET" : "IQÂMAT"}</div>
                  <div style={{ color: "#f5d78e", fontSize: 108, fontWeight: 900, letterSpacing: 4, animation: "pulse 1s infinite", lineHeight: 1 }}>{kametVakit ? getName(kametVakit) : ""}</div>
                </div>
              ) : (
                <>
                  <div className="panel-title">{lang === "tr" ? "GÜNÜN VAKTİ" : "AKTUELLE GEBETSZEIT"}</div>
                  <div className={`current-vakit ${isEzan ? "ezan" : ""}`}>{currentLabel}</div>

                  {!isKametCountdown && (<>
                    <div className="panel-title" style={{ marginTop: 8 }}>{lang === "tr" ? "SONRAKİ VAKİT" : "NÄCHSTE GEBETSZEIT"}</div>
                    <div className="next-vakit">{nextLabel} — {nextTime}</div>
                  </>)}

                  {isKametCountdown && (<div style={{ textAlign: "center", marginTop: 8 }}>
                    <div className="panel-title">{lang === "tr" ? "KAMETE KALAN SÜRE" : "ZEIT BIS ZUM IQÂMAT"}</div>
                    <div style={{ color: "#f5d78e", fontSize: 70, fontWeight: 700, marginTop: 16, lineHeight: 1 }}>{kametVakit ? getName(kametVakit) : ""}</div>
                  </div>)}

                  <div className="countdown-row">
                    {[
                      { val: fmt2(cdH), label: lang === "tr" ? "Saat" : "Std." },
                      null,
                      { val: fmt2(cdM), label: lang === "tr" ? "Dakika" : "Min." },
                      null,
                      { val: fmt2(cdS), label: lang === "tr" ? "Saniye" : "Sek." },
                    ].map((item, i) =>
                      item === null ? <span key={i} className="countdown-separator">:</span> : (
                        <div key={i} className="countdown-box">
                          <span className="countdown-value">{item.val}</span>
                          <span className="countdown-label">{item.label}</span>
                        </div>
                      )
                    )}
                  </div>

                  {flow.currentVakit === "sabah" && !isEzan && !isKametCountdown && (<div style={{ textAlign: "center", marginTop: 16 }}>
                    <div style={{ color: "#c9a66b", fontSize: 36, letterSpacing: 3, lineHeight: 1 }}>{lang === "tr" ? "GÜNEŞE KALAN" : "BIS SCHURUQ"}</div>
                    <div style={{ color: "#a8c8b0", fontSize: 40, fontWeight: 700, lineHeight: 1 }}>{fmt2(gunesKalanH)}:{fmt2(gunesKalanM)}:{fmt2(gunesKalanS)}</div>
                  </div>)}
                </>
              )}
              {bayram.visible && (<div style={{ marginTop: 20, padding: "12px 36px", background: "#c9a66b22", border: "3px solid #c9a66b", borderRadius: 12, color: "#f5d78e", fontSize: 35, fontWeight: 700, textAlign: "center", lineHeight: 1 }}>🎉 {lang === "tr" ? bayram.bayram?.ad_tr : bayram.bayram?.ad_de}</div>)}
            </div>

            {/* ============================================ */}
            {/* 🔵 SAĞ PANEL - DUYURULAR                    */}
            {/* ============================================ */}
            <div className="panel" style={{ flex: 1, display: "flex", flexDirection: "column", background: "#0a3d2e" }}>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", borderBottom: "3px solid #c9a66b" }}>
                <div style={{ background: "#c9a66b", textAlign: "center", padding: "10px 0", color: "#0a3d2e", fontSize: 36, fontWeight: 900, letterSpacing: 3 }}>{isEzan ? (duaLang === "tr" ? "EZAN DUASI" : "ADHAN-GEBET") : (lang === "tr" ? "GÜNÜN DUASI" : "DUA DES TAGES")}</div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px 16px", gap: 16 }}>
                  {isEzan ? (<>
                    <div style={{ color: "#f5d78e", fontSize: 36, textAlign: "right", lineHeight: 1.8, direction: "rtl", fontFamily: "serif", width: "100%" }}>{EZAN_DUASI.arabic}</div>
                    <div style={{ color: "#a8c8b0", fontSize: 22, textAlign: "center", lineHeight: 1.6 }}>{duaLang === "tr" ? EZAN_DUASI.tr : EZAN_DUASI.de}</div>
                  </>) : (<>
                    {dailyDua.source && <div style={{ background: "transparent", border: "2px solid #c9a66b", borderRadius: 8, padding: "4px 16px", color: "#c9a66b", fontSize: 22, fontWeight: 700, letterSpacing: 3 }}>{dailyDua.source}</div>}
                    <div style={{ color: "#f5d78e", fontSize: 22, textAlign: "right", lineHeight: 1.8, direction: "rtl", fontFamily: "serif", width: "100%" }}>{dailyDua.ar}</div>
                    <div style={{ color: "#a8c8b0", fontSize: 22, textAlign: "center", lineHeight: 1.6 }}>{lang === "tr" ? dailyDua.tr : dailyDua.de}</div>
                  </>)}
                </div>
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ background: "#c9a66b", textAlign: "center", padding: "10px 0", color: "#0a3d2e", fontSize: 36, fontWeight: 900, letterSpacing: 3 }}>{lang === "tr" ? "DUYURULAR" : "ANKÜNDIGUNGEN"}</div>
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 16px" }}>
                  <div style={{ color: "#f5d78e", fontSize: 22, textAlign: "center", lineHeight: 1.6, width: "100%", whiteSpace: "pre-wrap" }}>{getDuyurular(lang)}</div>
                </div>
              </div>
            </div>

          </div>

          {/* ============================================ */}
          {/* 🟤 ÜST BAR (HEADER) - Tarih & Saat          */}
          {/* ============================================ */}
          <div style={{
            background: "linear-gradient(180deg, #0a3d2e 0%, #072d20 100%)",
            borderBottom: "4px solid #c9a66b",
            padding: "10px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0
          }}>
            <div>
              <div style={{ color: "#c9a66b", fontSize: 14, letterSpacing: 1, lineHeight: 1 }}>{miladiTR}</div>
              <div style={{ color: "#c9a66b", fontSize: 14, letterSpacing: 1, lineHeight: 1, marginTop: 2 }}>{hicriTR}</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "#f5d78e", fontSize: 48, fontWeight: 900, fontFamily: "monospace", lineHeight: 1 }}>{hh}:{mm}</div>
              <div style={{ color: "#f5d78e", fontSize: 24, fontWeight: 700, fontFamily: "monospace", lineHeight: 1, marginTop: 2 }}>{ss}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "#c9a66b", fontSize: 14, letterSpacing: 1, lineHeight: 1 }}>{miladiDE}</div>
              <div style={{ color: "#c9a66b", fontSize: 14, letterSpacing: 1, lineHeight: 1, marginTop: 2 }}>{hicriDE}</div>
            </div>
          </div>

          {/* ============================================ */}
          {/* ⚫ ALT BAR (FOOTER) - Logo & Ayarlar Butonu  */}
          {/* ============================================ */}
          <div className="bottom-bar" style={{ background: "linear-gradient(180deg,#0a3d2e 0%,#072d20 100%)", borderTop: "4px solid #c9a66b", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", cursor: "default", position: "relative", flexShrink: 0 }}>
            <div style={{ color: "#c9a66b", fontSize: 14, letterSpacing: 1 }} onClick={handleBottomClick}>Bu uygulama <strong>AyTa®</strong> tarafından hazırlanmıştır</div>
            <button onClick={() => setShowSettings(true)} title="Ayarlar" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", background: "transparent", border: "1px solid #c9a66b44", borderRadius: 6, padding: "4px 10px", color: "#c9a66b77", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, transition: "all 0.2s", lineHeight: 1 }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#c9a66b"; (e.currentTarget as HTMLButtonElement).style.borderColor = "#c9a66b"; (e.currentTarget as HTMLButtonElement).style.background = "#c9a66b11"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#c9a66b77"; (e.currentTarget as HTMLButtonElement).style.borderColor = "#c9a66b44"; (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}>
              &
            </button>
            <div style={{ border: "3px solid #c9a66b", borderRadius: 8, padding: "6px 12px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#ffffff", boxShadow: "0 0 0 1px #c9a66b" }}>
              <img src="img/logo.png?v=5" alt="Logo" style={{ height: 52, objectFit: "contain" }} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
// src/hooks/usePrayerFlow.ts
import { useState, useEffect, useRef } from "react";
import { SETTINGS } from "../config/settings";

export type PrayerKey = "sabah" | "ogle" | "ikindi" | "aksam" | "yatsi" | "cuma";
export type FlowPhase = "normal" | "ezan" | "kamet" | "blackout";

interface UsePrayerFlowReturn {
  phase: FlowPhase;
  activePrayer: PrayerKey | null;
  ezanRemaining: number;
  duaLang: "TR" | "DE";
  kametRemaining: number;
  blackoutRemaining: number;
}

export const usePrayerFlow = (prayerTimes: Record<PrayerKey, string>): UsePrayerFlowReturn => {
  const [phase, setPhase] = useState<FlowPhase>("normal");
  const [activePrayer, setActivePrayer] = useState<PrayerKey | null>(null);
  const [ezanRemaining, setEzanRemaining] = useState(60);
  const [duaLang, setDuaLang] = useState<"TR" | "DE">("TR");
  const [kametTarget, setKametTarget] = useState<Date | null>(null);
  const [kametRemaining, setKametRemaining] = useState(0);
  const [blackoutRemaining, setBlackoutRemaining] = useState(600);

  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  const parseTime = (timeStr: string) => {
    const [h, m] = timeStr.split(":").map(Number);
    const d = new Date();
    d.setHours(h, m, 0, 0);
    return d;
  };

  const getKametTime = (prayer: PrayerKey, ezanTime: string) => {
    if (prayer === "cuma") return parseTime(SETTINGS.cuma.kamet);
    const offset = SETTINGS.kametOffsets[prayer] || 0;
    const base = parseTime(ezanTime);
    base.setMinutes(base.getMinutes() + offset);
    return base;
  };

  useEffect(() => {
    const tick = setInterval(() => {
      const now = new Date();

      if (phaseRef.current === "ezan") {
        setEzanRemaining((prev) => {
          if (prev <= 1) {
            const target = getKametTime(activePrayer!, prayerTimes[activePrayer!]);
            setKametTarget(target);
            setPhase("kamet");
            return 60;
          }
          if (prev === 30) setDuaLang((l) => (l === "TR" ? "DE" : "TR"));
          return prev - 1;
        });
      } 
      else if (phaseRef.current === "kamet") {
        if (kametTarget) {
          const diff = Math.max(0, Math.floor((kametTarget.getTime() - now.getTime()) / 1000));
          setKametRemaining(diff);
          if (diff === 0) {
            setPhase("blackout");
            setBlackoutRemaining(600);
          }
        }
      } 
      else if (phaseRef.current === "blackout") {
        setBlackoutRemaining((prev) => {
          if (prev <= 1) {
            setPhase("normal");
            setActivePrayer(null);
            setKametTarget(null);
            return 600;
          }
          return prev - 1;
        });
      } 
      else {
        // normal: vakit kontrolü
        const currentHM = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
        for (const [key, time] of Object.entries(prayerTimes)) {
          if (time === currentHM && phaseRef.current === "normal") {
            setPhase("ezan");
            setActivePrayer(key as PrayerKey);
            setEzanRemaining(60);
            setDuaLang("TR");
            break;
          }
        }
      }
    }, 1000);

    return () => clearInterval(tick);
  }, [prayerTimes, activePrayer, kametTarget]);

  return { phase, activePrayer, ezanRemaining, duaLang, kametRemaining, blackoutRemaining };
};
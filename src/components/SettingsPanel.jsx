import React, { useState } from "react";
import { saveSettingToFirebase } from "../config/settings";

export default function SettingsPanel({ onClose }) {
  const [manuelSabahKamet, setManuelSabahKamet] = useState(
    localStorage.getItem("manuelSabahKamet") || "05:00"
  );

  const [hicriOffset, setHicriOffset] = useState(
    Number(localStorage.getItem("hicriOffset") || 0)
  );

  const handleSave = () => {
    saveSettingToFirebase("manuelSabahKamet", manuelSabahKamet);
    saveSettingToFirebase("hicriOffset", hicriOffset);
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: 600,
          maxHeight: "90%",
          overflowY: "auto",
          background: "#0a3d2e",
          border: "4px solid #c9a66b",
          borderRadius: 12,
          padding: 32,
          color: "#c9a66b",
        }}
      >
        <h2 style={{ marginBottom: 20 }}>⚙️ Ayarlar</h2>

        {/* Sabah Kamet Saati */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", marginBottom: 8 }}>
            Sabah Kamet Saati
          </label>
          <input
            type="time"
            value={manuelSabahKamet}
            onChange={(e) => setManuelSabahKamet(e.target.value)}
            style={{
              padding: 8,
              width: "100%",
              borderRadius: 6,
              border: "1px solid #c9a66b",
              background: "#072d20",
              color: "#c9a66b",
            }}
          />
        </div>

        {/* Hicri Takvim */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", marginBottom: 8 }}>
            Hicri Takvim Düzeltmesi
          </label>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => setHicriOffset(hicriOffset - 1)}
              style={{
                padding: "6px 12px",
                borderRadius: 6,
                border: "1px solid #c9a66b",
                background: "#072d20",
                color: "#c9a66b",
              }}
            >
              −
            </button>

            <div
              style={{
                padding: "6px 12px",
                borderRadius: 6,
                border: "1px solid #c9a66b",
                background: "#072d20",
                color: "#c9a66b",
                flex: 1,
                textAlign: "center",
              }}
            >
              Şu an: {hicriOffset} gün
            </div>

            <button
              onClick={() => setHicriOffset(hicriOffset + 1)}
              style={{
                padding: "6px 12px",
                borderRadius: 6,
                border: "1px solid #c9a66b",
                background: "#072d20",
                color: "#c9a66b",
              }}
            >
              +
            </button>
          </div>
        </div>

        {/* Kaydet */}
        <button
          onClick={handleSave}
          style={{
            marginTop: 20,
            width: "100%",
            padding: "10px 0",
            borderRadius: 6,
            border: "2px solid #c9a66b",
            background: "#c9a66b22",
            color: "#c9a66b",
            fontSize: 18,
            cursor: "pointer",
          }}
        >
          ✓ Kaydet & Kapat
        </button>
      </div>
    </div>
  );
}

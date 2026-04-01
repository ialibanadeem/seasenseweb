"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { X, Phone, Radio, MapPin, AlertTriangle } from "lucide-react"
import { useSettings } from "@/lib/settings-context"

interface SOSPayload {
  lat: number
  lng: number
  vesselName: string
  registration: string
  mmsi: string
  timestamp: string
}

// -------------------------------------------------------
// Stub: replace with real backend call when ready
// -------------------------------------------------------
async function sendSOSAlert(payload: SOSPayload): Promise<{ ok: boolean }> {
  // Simulates a network call. Swap this body for a real fetch().
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ok: true }), 1200)
  })
}

interface SOSButtonProps {
  lat: number
  lng: number
}

type SOSState = "idle" | "confirming" | "countdown" | "sending" | "sent" | "error"

const COUNTDOWN_SECONDS = 5

export function SOSButton({ lat, lng }: SOSButtonProps) {
  const { t } = useSettings()
  const [state, setState] = useState<SOSState>("idle")
  const [count, setCount] = useState(COUNTDOWN_SECONDS)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const reset = useCallback(() => {
    setState("idle")
    setCount(COUNTDOWN_SECONDS)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  // Countdown timer
  useEffect(() => {
    if (state !== "countdown") return

    intervalRef.current = setInterval(() => {
      setCount((c) => {
        if (c <= 1) {
          clearInterval(intervalRef.current!)
          intervalRef.current = null
          return 0
        }
        return c - 1
      })
    }, 1000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [state])

  // Trigger send when countdown reaches 0
  useEffect(() => {
    if (state === "countdown" && count === 0) {
      fire()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, state])

  async function fire() {
    setState("sending")
    try {
      const result = await sendSOSAlert({
        lat,
        lng,
        vesselName: "Shaheen",
        registration: "KHI-2024-001",
        mmsi: "987654321",
        timestamp: new Date().toISOString(),
      })
      setState(result.ok ? "sent" : "error")
    } catch {
      setState("error")
    }
  }

  // Auto-dismiss success/error after 4s
  useEffect(() => {
    if (state === "sent" || state === "error") {
      const t = setTimeout(reset, 4000)
      return () => clearTimeout(t)
    }
  }, [state, reset])

  // ---------- IDLE ----------
  if (state === "idle") {
    return (
      <button
        onClick={() => setState("confirming")}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive text-sm font-bold text-destructive-foreground shadow-lg shadow-destructive/30 transition-transform hover:scale-105 active:scale-95"
        aria-label="SOS Emergency"
      >
        SOS
      </button>
    )
  }

  // ---------- FULL-SCREEN OVERLAY ----------
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/95 backdrop-blur-sm">
      {/* Close / Cancel */}
      {(state === "confirming" || state === "countdown") && (
        <button
          onClick={reset}
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-border hover:text-foreground"
          aria-label="Cancel SOS"
        >
          <X className="h-5 w-5" />
        </button>
      )}

      <div className="flex w-full max-w-xs flex-col items-center gap-6 px-6 text-center">

        {/* ---------- CONFIRMING ---------- */}
        {state === "confirming" && (
          <>
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-10 w-10 text-destructive" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">{t("sos.title")}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t("sos.description")}
              </p>
            </div>

            {/* Location preview */}
            <div className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-accent" />
                <span>{t("sos.currentPosition")}</span>
              </div>
              <p className="mt-1 font-mono text-sm text-foreground">
                {lat.toFixed(4)}°N, {lng.toFixed(4)}°E
              </p>
            </div>

            {/* Will notify */}
            <div className="w-full space-y-2">
              <div className="flex items-center gap-3 rounded-lg bg-secondary/50 px-3 py-2">
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-xs text-muted-foreground">{t("sos.primaryContact")}</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-secondary/50 px-3 py-2">
                <Radio className="h-4 w-4 text-accent" />
                <span className="text-xs text-muted-foreground">{t("sos.coastGuard")}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setCount(COUNTDOWN_SECONDS)
                setState("countdown")
              }}
              className="w-full rounded-xl bg-destructive py-3.5 text-sm font-bold text-destructive-foreground transition-transform active:scale-[0.98]"
            >
              {t("sos.sendSignal")}
            </button>
          </>
        )}

        {/* ---------- COUNTDOWN ---------- */}
        {state === "countdown" && (
          <>
            {/* Pulsing ring */}
            <div className="relative flex h-28 w-28 items-center justify-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-destructive/20" />
              <span className="absolute inset-2 animate-pulse rounded-full bg-destructive/10" />
              <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-destructive text-3xl font-bold text-destructive-foreground">
                {count}
              </span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">{t("sos.sendingIn")} {count}s</h2>
              <p className="mt-1 text-sm text-muted-foreground">{t("sos.cancelHint")}</p>
            </div>
            <button
              onClick={reset}
              className="w-full rounded-xl border border-border bg-secondary py-3 text-sm font-semibold text-foreground transition-colors hover:bg-border"
            >
              {t("sos.cancel")}
            </button>
          </>
        )}

        {/* ---------- SENDING ---------- */}
        {state === "sending" && (
          <>
            <div className="relative flex h-20 w-20 items-center justify-center">
              <span className="absolute inset-0 animate-spin rounded-full border-4 border-destructive/20 border-t-destructive" />
              <Radio className="h-8 w-8 text-destructive" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">{t("sos.transmitting")}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{t("sos.broadcasting")}</p>
            </div>
          </>
        )}

        {/* ---------- SENT ---------- */}
        {state === "sent" && (
          <>
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
              <Radio className="h-10 w-10 text-green-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">{t("sos.transmitted")}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("sos.transmittedDesc")}
              </p>
            </div>
            <button
              onClick={reset}
              className="w-full rounded-xl bg-secondary py-3 text-sm font-semibold text-foreground transition-colors hover:bg-border"
            >
              {t("sos.dismiss")}
            </button>
          </>
        )}

        {/* ---------- ERROR ---------- */}
        {state === "error" && (
          <>
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-500/10">
              <AlertTriangle className="h-10 w-10 text-amber-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">{t("sos.failed")}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("sos.failedDesc")}
              </p>
            </div>
            <div className="flex w-full gap-3">
              <button
                onClick={reset}
                className="flex-1 rounded-xl border border-border bg-secondary py-3 text-sm font-semibold text-foreground transition-colors hover:bg-border"
              >
                {t("sos.cancel")}
              </button>
              <button
                onClick={fire}
                className="flex-1 rounded-xl bg-destructive py-3 text-sm font-bold text-destructive-foreground transition-transform active:scale-[0.98]"
              >
                {t("sos.retry")}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

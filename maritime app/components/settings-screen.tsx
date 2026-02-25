"use client"

import { useState, useRef, useEffect } from "react"
import { AppHeader } from "./app-header"
import { useSettings, type Theme, type SpeedUnit, type Language } from "@/lib/settings-context"
import {
  Monitor,
  Gauge,
  Globe,
  Bell,
  Wrench,
  CloudRain,
  ChevronDown,
  Check,
} from "lucide-react"

// ───── Toggle ─────
interface ToggleProps {
  enabled: boolean
  onToggle: () => void
  label: string
}

function Toggle({ enabled, onToggle, label }: ToggleProps) {
  return (
    <button
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      onClick={onToggle}
      className={`relative h-7 w-12 rounded-full transition-colors ${
        enabled ? "bg-accent" : "bg-border"
      }`}
    >
      <span
        className={`absolute top-0.5 h-6 w-6 rounded-full bg-foreground shadow-sm transition-transform ${
          enabled ? "left-[22px]" : "left-0.5"
        }`}
      />
    </button>
  )
}

// ───── SelectField ─────
interface SelectOption {
  value: string
  label: string
}

interface SelectFieldProps {
  value: string
  options: SelectOption[]
  onChange: (value: string) => void
}

function SelectField({ value, options, onChange }: SelectFieldProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open])

  const selected = options.find((o) => o.value === value)

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-muted"
      >
        <span>{selected?.label ?? value}</span>
        <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-10 mt-1 min-w-[160px] rounded-lg border border-border bg-card py-1 shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value)
                setOpen(false)
              }}
              className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors hover:bg-secondary ${
                value === option.value ? "text-accent" : "text-foreground"
              }`}
            >
              <span>{option.label}</span>
              {value === option.value && <Check className="h-3.5 w-3.5 text-accent" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ───── Settings Screen ─────
export function SettingsScreen() {
  const {
    theme, setTheme,
    speedUnit, setSpeedUnit,
    language, setLanguage,
    geofence, setGeofence,
    engine, setEngine,
    weather, setWeather,
    t,
  } = useSettings()

  const themeOptions: SelectOption[] = [
    { value: "dark", label: t("settings.dark") },
    { value: "light", label: t("settings.light") },
  ]

  const speedOptions: SelectOption[] = [
    { value: "kn", label: t("settings.knots") },
    { value: "kmh", label: t("settings.kmh") },
    { value: "mph", label: t("settings.mph") },
  ]

  const langOptions: SelectOption[] = [
    { value: "en", label: t("settings.english") },
    { value: "ur", label: t("settings.urdu") },
  ]

  return (
    <div className="flex h-full flex-col">
      <AppHeader title={t("settings.title")} />

      <div className="flex-1 overflow-y-auto px-4 pb-6">
        {/* Display & Units */}
        <section>
          <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            {t("settings.displayUnits")}
          </h3>
          <div className="space-y-1 rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between px-4 py-3.5">
              <div className="flex items-center gap-3">
                <Monitor className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{t("settings.appTheme")}</span>
              </div>
              <SelectField
                value={theme}
                options={themeOptions}
                onChange={(v) => setTheme(v as Theme)}
              />
            </div>
            <div className="mx-4 h-px bg-border" />
            <div className="flex items-center justify-between px-4 py-3.5">
              <div className="flex items-center gap-3">
                <Gauge className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{t("settings.speedUnits")}</span>
              </div>
              <SelectField
                value={speedUnit}
                options={speedOptions}
                onChange={(v) => setSpeedUnit(v as SpeedUnit)}
              />
            </div>
            <div className="mx-4 h-px bg-border" />
            <div className="flex items-center justify-between px-4 py-3.5">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{t("settings.language")}</span>
              </div>
              <SelectField
                value={language}
                options={langOptions}
                onChange={(v) => setLanguage(v as Language)}
              />
            </div>
          </div>
        </section>

        {/* Alerts & Notifications */}
        <section className="mt-6">
          <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            {t("settings.alertsNotifications")}
          </h3>
          <div className="space-y-1 rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between px-4 py-3.5">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">{t("settings.geofenceAlerts")}</p>
                  <p className="text-xs text-muted-foreground">{t("settings.geofenceDesc")}</p>
                </div>
              </div>
              <Toggle
                enabled={geofence}
                onToggle={() => setGeofence(!geofence)}
                label={t("settings.geofenceAlerts")}
              />
            </div>
            <div className="mx-4 h-px bg-border" />
            <div className="flex items-center justify-between px-4 py-3.5">
              <div className="flex items-center gap-3">
                <Wrench className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">{t("settings.engineDiagnostics")}</p>
                  <p className="text-xs text-muted-foreground">{t("settings.engineDesc")}</p>
                </div>
              </div>
              <Toggle
                enabled={engine}
                onToggle={() => setEngine(!engine)}
                label={t("settings.engineDiagnostics")}
              />
            </div>
            <div className="mx-4 h-px bg-border" />
            <div className="flex items-center justify-between px-4 py-3.5">
              <div className="flex items-center gap-3">
                <CloudRain className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">{t("settings.weatherWarnings")}</p>
                  <p className="text-xs text-muted-foreground">{t("settings.weatherDesc")}</p>
                </div>
              </div>
              <Toggle
                enabled={weather}
                onToggle={() => setWeather(!weather)}
                label={t("settings.weatherWarnings")}
              />
            </div>
          </div>
        </section>

        {/* App Info */}
        <div className="mt-10 flex flex-col items-center gap-1">
          <p className="text-xs text-muted-foreground">{t("settings.appInfo")}</p>
          <p className="text-xs text-muted-foreground">{t("settings.copyright")}</p>
        </div>
      </div>
    </div>
  )
}

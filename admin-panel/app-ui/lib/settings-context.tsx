"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// ───── Types ─────
export type Theme = "dark" | "light"
export type SpeedUnit = "kn" | "kmh" | "mph"
export type Language = "en" | "ur"

interface SettingsState {
  theme: Theme
  speedUnit: SpeedUnit
  language: Language
  geofence: boolean
  engine: boolean
  weather: boolean
  setTheme: (t: Theme) => void
  setSpeedUnit: (s: SpeedUnit) => void
  setLanguage: (l: Language) => void
  setGeofence: (v: boolean) => void
  setEngine: (v: boolean) => void
  setWeather: (v: boolean) => void
  t: (key: string) => string
  convertSpeed: (knots: number) => { value: number; label: string }
  dir: "ltr" | "rtl"
}

// ───── Translations ─────
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Bottom nav
    "nav.live": "LIVE",
    "nav.profile": "PROFILE",
    "nav.settings": "SETTINGS",

    // Live screen
    "live.speed": "Speed",
    "live.heading": "Heading",
    "live.depth": "Depth",
    "live.livePosition": "Live Position",
    "live.activeRoute": "Active Route",
    "live.karachiPort": "Karachi Port",
    "live.gwadar": "Gwadar",
    "live.deg": "deg",

    // Profile
    "profile.title": "Profile",
    "profile.fisherLicense": "Fisherman License #892-321",
    "profile.vesselDetails": "Vessel Details",
    "profile.vesselValue": "Shaheen",
    "profile.mmsi": "MMSI",
    "profile.length": "Length",
    "profile.crewSize": "Crew Size",
    "profile.crewValue": "8 People",
    "profile.emergencyContacts": "Emergency Contacts",
    "profile.primaryContact": "Primary Contact",
    "profile.harborMaster": "Harbor Master",
    "profile.signOut": "Sign Out",

    // Settings
    "settings.title": "Settings",
    "settings.displayUnits": "Display & Units",
    "settings.appTheme": "App Theme",
    "settings.speedUnits": "Speed Units",
    "settings.language": "Language",
    "settings.alertsNotifications": "Alerts & Notifications",
    "settings.geofenceAlerts": "Geofence Alerts",
    "settings.geofenceDesc": "Notify when leaving fishing zones",
    "settings.engineDiagnostics": "Engine Diagnostics",
    "settings.engineDesc": "Alerts for maintenance",
    "settings.weatherWarnings": "Weather Warnings",
    "settings.weatherDesc": "Severe weather proximity",
    "settings.appInfo": "MarineTrack v1.0.3 (Build 240)",
    "settings.copyright": "\u00a9 2025 Marine Systems Inc.",
    "settings.dark": "Dark",
    "settings.light": "Light",
    "settings.knots": "Knots (kn)",
    "settings.kmh": "km/h",
    "settings.mph": "mph",
    "settings.english": "English",
    "settings.urdu": "Urdu",

    // SOS
    "sos.title": "Emergency SOS",
    "sos.description": "This will broadcast a distress signal with your live coordinates to the coast guard and emergency contacts.",
    "sos.currentPosition": "Current Position",
    "sos.primaryContact": "Ahmed Malik - Primary Contact",
    "sos.coastGuard": "Karachi Port Coast Guard",
    "sos.sendSignal": "Send Distress Signal",
    "sos.sendingIn": "Sending in",
    "sos.cancelHint": "Tap cancel to abort the distress signal",
    "sos.cancel": "Cancel",
    "sos.transmitting": "Transmitting...",
    "sos.broadcasting": "Broadcasting distress signal",
    "sos.transmitted": "SOS Transmitted",
    "sos.transmittedDesc": "Distress signal sent. Emergency services and your contacts have been notified.",
    "sos.dismiss": "Dismiss",
    "sos.failed": "Transmission Failed",
    "sos.failedDesc": "Could not send distress signal. Check your connection and try again.",
    "sos.retry": "Retry",

    // Notifications
    "notif.title": "Notifications",
    "notif.markAllRead": "Mark all read",
    "notif.empty": "No notifications",
    "notif.weatherAlert": "Weather Alert",
    "notif.weatherMsg": "Storm approaching from the southwest. Wind speeds up to 45 knots expected in 3 hours.",
    "notif.geofenceWarning": "Geofence Warning",
    "notif.geofenceMsg": "You are approaching the boundary of permitted fishing zone KHI-7.",
    "notif.engineMaintenance": "Engine Maintenance Due",
    "notif.engineMsg": "Scheduled engine maintenance is overdue by 12 hours. Check oil and coolant levels.",
    "notif.harborNotice": "Harbor Notice",
    "notif.harborMsg": "Karachi Port dock B3 is closed for maintenance. Use dock B5 on return.",
    "notif.routeUpdated": "Route Updated",
    "notif.routeMsg": "Optimal route to Gwadar has been recalculated due to current changes.",
    "notif.12min": "12 min ago",
    "notif.28min": "28 min ago",
    "notif.1hr": "1 hr ago",
    "notif.3hrs": "3 hrs ago",
    "notif.5hrs": "5 hrs ago",
  },
  ur: {
    // Bottom nav
    "nav.live": "\u0644\u0627\u0626\u06CC\u0648",
    "nav.profile": "\u067E\u0631\u0648\u0641\u0627\u0626\u0644",
    "nav.settings": "\u062A\u0631\u062A\u06CC\u0628\u0627\u062A",

    // Live screen
    "live.speed": "\u0631\u0641\u062A\u0627\u0631",
    "live.heading": "\u0633\u0645\u062A",
    "live.depth": "\u06AF\u06C1\u0631\u0627\u0626\u06CC",
    "live.livePosition": "\u0645\u0648\u062C\u0648\u062F\u06C1 \u0645\u0642\u0627\u0645",
    "live.activeRoute": "\u0641\u0639\u0627\u0644 \u0631\u0627\u0633\u062A\u06C1",
    "live.karachiPort": "\u06A9\u0631\u0627\u0686\u06CC \u0628\u0646\u062F\u0631\u06AF\u0627\u06C1",
    "live.gwadar": "\u06AF\u0648\u0627\u062F\u0631",
    "live.deg": "\u0688\u06CC\u06AF\u0631\u06CC",

    // Profile
    "profile.title": "\u067E\u0631\u0648\u0641\u0627\u0626\u0644",
    "profile.fisherLicense": "\u0645\u0627\u06C1\u06CC \u06AF\u06CC\u0631 \u0644\u0627\u0626\u0633\u0646\u0633 #892-321",
    "profile.vesselDetails": "\u06A9\u0634\u062A\u06CC \u06A9\u06CC \u062A\u0641\u0635\u06CC\u0644\u0627\u062A",
    "profile.vesselName": "\u06A9\u0634\u062A\u06CC \u06A9\u0627 \u0646\u0627\u0645",
    "profile.vesselValue": "Shaheen",
    "profile.registration": "\u0631\u062C\u0633\u0679\u0631\u06CC\u0634\u0646",
    "profile.mmsi": "MMSI",
    "profile.length": "\u0644\u0645\u0628\u0627\u0626\u06CC",
    "profile.crewSize": "\u0639\u0645\u0644\u06C1 \u06A9\u06CC \u062A\u0639\u062F\u0627\u062F",
    "profile.crewValue": "8 \u0627\u0641\u0631\u0627\u062F",
    "profile.emergencyContacts": "\u06C1\u0646\u06AF\u0627\u0645\u06CC \u0631\u0627\u0628\u0637\u06D2",
    "profile.primaryContact": "\u0628\u0646\u06CC\u0627\u062F\u06CC \u0631\u0627\u0628\u0637\u06C1",
    "profile.harborMaster": "\u06C1\u0627\u0631\u0628\u0631 \u0645\u0627\u0633\u0679\u0631",
    "profile.signOut": "\u0633\u0627\u0626\u0646 \u0622\u0624\u0679",

    // Settings
    "settings.title": "\u062A\u0631\u062A\u06CC\u0628\u0627\u062A",
    "settings.displayUnits": "\u0688\u0633\u067E\u0644\u06CC \u0627\u0648\u0631 \u0627\u06A9\u0627\u0626\u06CC\u0627\u06BA",
    "settings.appTheme": "\u0627\u06CC\u067E \u062A\u06BE\u06CC\u0645",
    "settings.speedUnits": "\u0631\u0641\u062A\u0627\u0631 \u06A9\u06CC \u0627\u06A9\u0627\u0626\u06CC",
    "settings.language": "\u0632\u0628\u0627\u0646",
    "settings.alertsNotifications": "\u0627\u0644\u0631\u0679\u0633 \u0627\u0648\u0631 \u0627\u0637\u0644\u0627\u0639\u0627\u062A",
    "settings.geofenceAlerts": "\u062C\u06CC\u0648\u0641\u06CC\u0646\u0633 \u0627\u0644\u0631\u0679\u0633",
    "settings.geofenceDesc": "\u0645\u0627\u06C1\u06CC \u06AF\u06CC\u0631\u06CC \u06A9\u06D2 \u0639\u0644\u0627\u0642\u06D2 \u0633\u06D2 \u0646\u06A9\u0644\u0646\u06D2 \u067E\u0631 \u0645\u0637\u0644\u0639 \u06A9\u0631\u06CC\u06BA",
    "settings.engineDiagnostics": "\u0627\u0646\u062C\u0646 \u062A\u0634\u062E\u06CC\u0635",
    "settings.engineDesc": "\u062F\u06CC\u06A9\u06BE \u0628\u06BE\u0627\u0644 \u06A9\u06D2 \u0644\u06CC\u06D2 \u0627\u0644\u0631\u0679\u0633",
    "settings.weatherWarnings": "\u0645\u0648\u0633\u0645 \u06A9\u06CC \u0648\u0627\u0631\u0646\u0646\u06AF",
    "settings.weatherDesc": "\u0634\u062F\u06CC\u062F \u0645\u0648\u0633\u0645 \u06A9\u06CC \u0642\u0631\u0628\u062A",
    "settings.appInfo": "MarineTrack v1.0.3 (Build 240)",
    "settings.copyright": "\u00a9 2025 Marine Systems Inc.",
    "settings.dark": "\u0688\u0627\u0631\u06A9",
    "settings.light": "\u0644\u0627\u0626\u0679",
    "settings.knots": "\u0646\u0627\u0679\u0633 (kn)",
    "settings.kmh": "\u06A9\u0644\u0648\u0645\u06CC\u0679\u0631/\u06AF\u06BE\u0646\u0679\u06C1",
    "settings.mph": "\u0645\u06CC\u0644/\u06AF\u06BE\u0646\u0679\u06C1",
    "settings.english": "English",
    "settings.urdu": "\u0627\u0631\u062F\u0648",

    // SOS
    "sos.title": "\u06C1\u0646\u06AF\u0627\u0645\u06CC SOS",
    "sos.description": "\u06CC\u06C1 \u0622\u067E \u06A9\u06D2 \u0645\u0648\u062C\u0648\u062F\u06C1 \u0645\u0642\u0627\u0645 \u06A9\u06D2 \u0633\u0627\u062A\u06BE \u06A9\u0648\u0633\u0679 \u06AF\u0627\u0631\u0688 \u0627\u0648\u0631 \u06C1\u0646\u06AF\u0627\u0645\u06CC \u0631\u0627\u0628\u0637\u0648\u06BA \u06A9\u0648 \u0627\u0645\u062F\u0627\u062F\u06CC \u0633\u06AF\u0646\u0644 \u0628\u06BE\u06CC\u062C\u06D2 \u06AF\u0627\u06D4",
    "sos.currentPosition": "\u0645\u0648\u062C\u0648\u062F\u06C1 \u0645\u0642\u0627\u0645",
    "sos.primaryContact": "\u0627\u062D\u0645\u062F \u0645\u0644\u06A9 - \u0628\u0646\u06CC\u0627\u062F\u06CC \u0631\u0627\u0628\u0637\u06C1",
    "sos.coastGuard": "\u06A9\u0631\u0627\u0686\u06CC \u0628\u0646\u062F\u0631\u06AF\u0627\u06C1 \u06A9\u0648\u0633\u0679 \u06AF\u0627\u0631\u0688",
    "sos.sendSignal": "\u0627\u0645\u062F\u0627\u062F\u06CC \u0633\u06AF\u0646\u0644 \u0628\u06BE\u06CC\u062C\u06CC\u06BA",
    "sos.sendingIn": "\u0628\u06BE\u06CC\u062C\u0646\u06D2 \u0645\u06CC\u06BA",
    "sos.cancelHint": "\u0627\u0645\u062F\u0627\u062F\u06CC \u0633\u06AF\u0646\u0644 \u0631\u062F \u06A9\u0631\u0646\u06D2 \u06A9\u06D2 \u0644\u06CC\u06D2 \u0645\u0646\u0633\u0648\u062E \u062F\u0628\u0627\u0626\u06CC\u06BA",
    "sos.cancel": "\u0645\u0646\u0633\u0648\u062E",
    "sos.transmitting": "\u0628\u06BE\u06CC\u062C\u0627 \u062C\u0627 \u0631\u06C1\u0627 \u06C1\u06D2...",
    "sos.broadcasting": "\u0627\u0645\u062F\u0627\u062F\u06CC \u0633\u06AF\u0646\u0644 \u0646\u0634\u0631 \u06C1\u0648 \u0631\u06C1\u0627 \u06C1\u06D2",
    "sos.transmitted": "SOS \u0628\u06BE\u06CC\u062C \u062F\u06CC\u0627 \u06AF\u06CC\u0627",
    "sos.transmittedDesc": "\u0627\u0645\u062F\u0627\u062F\u06CC \u0633\u06AF\u0646\u0644 \u0628\u06BE\u06CC\u062C\u0627 \u06AF\u06CC\u0627\u06D4 \u06C1\u0646\u06AF\u0627\u0645\u06CC \u062E\u062F\u0645\u0627\u062A \u0627\u0648\u0631 \u0622\u067E \u06A9\u06D2 \u0631\u0627\u0628\u0637\u0648\u06BA \u06A9\u0648 \u0645\u0637\u0644\u0639 \u06A9\u0631 \u062F\u06CC\u0627 \u06AF\u06CC\u0627 \u06C1\u06D2\u06D4",
    "sos.dismiss": "\u0628\u0646\u062F \u06A9\u0631\u06CC\u06BA",
    "sos.failed": "\u0679\u0631\u0627\u0646\u0633\u0645\u0634\u0646 \u0646\u0627\u06A9\u0627\u0645",
    "sos.failedDesc": "\u0627\u0645\u062F\u0627\u062F\u06CC \u0633\u06AF\u0646\u0644 \u0646\u06C1\u06CC\u06BA \u0628\u06BE\u06CC\u062C\u0627 \u062C\u0627 \u0633\u06A9\u0627\u06D4 \u0627\u067E\u0646\u0627 \u06A9\u0646\u06CC\u06A9\u0634\u0646 \u0686\u06CC\u06A9 \u06A9\u0631\u06CC\u06BA\u06D4",
    "sos.retry": "\u062F\u0648\u0628\u0627\u0631\u06C1 \u06A9\u0648\u0634\u0634",

    // Notifications
    "notif.title": "\u0627\u0637\u0644\u0627\u0639\u0627\u062A",
    "notif.markAllRead": "\u0633\u0628 \u067E\u0691\u06BE \u06C1\u0648\u0627 \u0646\u0634\u0627\u0646 \u0644\u06AF\u0627\u0626\u06CC\u06BA",
    "notif.empty": "\u06A9\u0648\u0626\u06CC \u0627\u0637\u0644\u0627\u0639 \u0646\u06C1\u06CC\u06BA",
    "notif.weatherAlert": "\u0645\u0648\u0633\u0645 \u06A9\u06CC \u0648\u0627\u0631\u0646\u0646\u06AF",
    "notif.weatherMsg": "\u062C\u0646\u0648\u0628 \u0645\u063A\u0631\u0628 \u0633\u06D2 \u0637\u0648\u0641\u0627\u0646 \u0622 \u0631\u06C1\u0627 \u06C1\u06D2\u06D4 3 \u06AF\u06BE\u0646\u0679\u0648\u06BA \u0645\u06CC\u06BA 45 \u0646\u0627\u0679\u0633 \u062A\u06A9 \u06C1\u0648\u0627 \u06A9\u06CC \u0631\u0641\u062A\u0627\u0631 \u0645\u062A\u0648\u0642\u0639 \u06C1\u06D2\u06D4",
    "notif.geofenceWarning": "\u062C\u06CC\u0648\u0641\u06CC\u0646\u0633 \u0648\u0627\u0631\u0646\u0646\u06AF",
    "notif.geofenceMsg": "\u0622\u067E \u0645\u0627\u06C1\u06CC \u06AF\u06CC\u0631\u06CC \u06A9\u06D2 \u0627\u062C\u0627\u0632\u062A \u06CC\u0627\u0641\u062A\u06C1 \u0639\u0644\u0627\u0642\u06D2 KHI-7 \u06A9\u06CC \u062D\u062F \u06A9\u06D2 \u0642\u0631\u06CC\u0628 \u06C1\u06CC\u06BA\u06D4",
    "notif.engineMaintenance": "\u0627\u0646\u062C\u0646 \u062F\u06CC\u06A9\u06BE \u0628\u06BE\u0627\u0644 \u0628\u0627\u0642\u06CC",
    "notif.engineMsg": "\u0627\u0646\u062C\u0646 \u06A9\u06CC \u062F\u06CC\u06A9\u06BE \u0628\u06BE\u0627\u0644 12 \u06AF\u06BE\u0646\u0679\u06D2 \u062A\u0627\u062E\u06CC\u0631 \u0633\u06D2 \u06C1\u06D2\u06D4 \u062A\u06CC\u0644 \u0627\u0648\u0631 \u06A9\u0648\u0644\u0646\u0679 \u0686\u06CC\u06A9 \u06A9\u0631\u06CC\u06BA\u06D4",
    "notif.harborNotice": "\u0628\u0646\u062F\u0631\u06AF\u0627\u06C1 \u06A9\u0627 \u0646\u0648\u0679\u0633",
    "notif.harborMsg": "\u06A9\u0631\u0627\u0686\u06CC \u0628\u0646\u062F\u0631\u06AF\u0627\u06C1 \u0688\u0627\u06A9 B3 \u062F\u06CC\u06A9\u06BE \u0628\u06BE\u0627\u0644 \u06A9\u06D2 \u0644\u06CC\u06D2 \u0628\u0646\u062F \u06C1\u06D2\u06D4 \u0648\u0627\u067E\u0633\u06CC \u067E\u0631 \u0688\u0627\u06A9 B5 \u0627\u0633\u062A\u0639\u0645\u0627\u0644 \u06A9\u0631\u06CC\u06BA\u06D4",
    "notif.routeUpdated": "\u0631\u0627\u0633\u062A\u06C1 \u0627\u067E \u0688\u06CC\u0679",
    "notif.routeMsg": "\u06A9\u0631\u0646\u0679 \u062A\u0628\u062F\u06CC\u0644\u06CC\u0648\u06BA \u06A9\u06CC \u0648\u062C\u06C1 \u0633\u06D2 \u06AF\u0648\u0627\u062F\u0631 \u06A9\u0627 \u0628\u06C1\u062A\u0631\u06CC\u0646 \u0631\u0627\u0633\u062A\u06C1 \u062F\u0648\u0628\u0627\u0631\u06C1 \u0646\u06A9\u0627\u0644\u0627 \u06AF\u06CC\u0627 \u06C1\u06D2\u06D4",
    "notif.12min": "12 \u0645\u0646\u0679 \u067E\u06C1\u0644\u06D2",
    "notif.28min": "28 \u0645\u0646\u0679 \u067E\u06C1\u0644\u06D2",
    "notif.1hr": "1 \u06AF\u06BE\u0646\u0679\u06C1 \u067E\u06C1\u0644\u06D2",
    "notif.3hrs": "3 \u06AF\u06BE\u0646\u0679\u06D2 \u067E\u06C1\u0644\u06D2",
    "notif.5hrs": "5 \u06AF\u06BE\u0646\u0679\u06D2 \u067E\u06C1\u0644\u06D2",
  },
}

// ───── Speed conversion ─────
function convertSpeedValue(knots: number, unit: SpeedUnit): { value: number; label: string } {
  switch (unit) {
    case "kmh":
      return { value: Math.round(knots * 1.852 * 10) / 10, label: "km/h" }
    case "mph":
      return { value: Math.round(knots * 1.15078 * 10) / 10, label: "mph" }
    default:
      return { value: knots, label: "kn" }
  }
}

// ───── Context ─────
const SettingsContext = createContext<SettingsState | null>(null)

export function useSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider")
  return ctx
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark")
  const [speedUnit, setSpeedUnit] = useState<SpeedUnit>("kn")
  const [language, setLanguage] = useState<Language>("en")
  const [geofence, setGeofence] = useState(true)
  const [engine, setEngine] = useState(true)
  const [weather, setWeather] = useState(false)

  // Apply theme class to html element
  useEffect(() => {
    const root = document.documentElement
    if (theme === "light") {
      root.classList.add("light")
      root.classList.remove("dark")
    } else {
      root.classList.add("dark")
      root.classList.remove("light")
    }
  }, [theme])

  // Apply RTL for Urdu
  useEffect(() => {
    document.documentElement.dir = language === "ur" ? "rtl" : "ltr"
    document.documentElement.lang = language === "ur" ? "ur" : "en"
  }, [language])

  const t = (key: string): string => {
    return translations[language]?.[key] ?? translations.en[key] ?? key
  }

  const convertSpeed = (knots: number) => convertSpeedValue(knots, speedUnit)

  const dir = language === "ur" ? "rtl" : "ltr" as const

  return (
    <SettingsContext.Provider
      value={{
        theme, speedUnit, language,
        geofence, engine, weather,
        setTheme, setSpeedUnit, setLanguage,
        setGeofence, setEngine, setWeather,
        t, convertSpeed, dir,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

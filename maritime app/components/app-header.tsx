"use client"

import { useState, useRef, useEffect } from "react"
import {
  Bell,
  Ship,
  CloudRain,
  AlertTriangle,
  Anchor,
  Wrench,
  MapPin,
  X,
} from "lucide-react"
import { useSettings } from "@/lib/settings-context"

interface NotificationItem {
  id: string
  icon: typeof Bell
  iconColor: string
  iconBg: string
  titleKey: string
  messageKey: string
  timeKey: string
  unread: boolean
}

const notificationData: NotificationItem[] = [
  {
    id: "1",
    icon: CloudRain,
    iconColor: "text-sky-400",
    iconBg: "bg-sky-400/10",
    titleKey: "notif.weatherAlert",
    messageKey: "notif.weatherMsg",
    timeKey: "notif.12min",
    unread: true,
  },
  {
    id: "2",
    icon: AlertTriangle,
    iconColor: "text-amber-400",
    iconBg: "bg-amber-400/10",
    titleKey: "notif.geofenceWarning",
    messageKey: "notif.geofenceMsg",
    timeKey: "notif.28min",
    unread: true,
  },
  {
    id: "3",
    icon: Wrench,
    iconColor: "text-orange-400",
    iconBg: "bg-orange-400/10",
    titleKey: "notif.engineMaintenance",
    messageKey: "notif.engineMsg",
    timeKey: "notif.1hr",
    unread: true,
  },
  {
    id: "4",
    icon: Anchor,
    iconColor: "text-accent",
    iconBg: "bg-accent/10",
    titleKey: "notif.harborNotice",
    messageKey: "notif.harborMsg",
    timeKey: "notif.3hrs",
    unread: false,
  },
  {
    id: "5",
    icon: MapPin,
    iconColor: "text-green-400",
    iconBg: "bg-green-400/10",
    titleKey: "notif.routeUpdated",
    messageKey: "notif.routeMsg",
    timeKey: "notif.5hrs",
    unread: false,
  },
]

interface AppHeaderProps {
  title: string
  subtitle?: string
}

export function AppHeader({ title, subtitle }: AppHeaderProps) {
  const { t } = useSettings()
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState(notificationData)
  const panelRef = useRef<HTMLDivElement>(null)

  const unreadCount = items.filter((n) => n.unread).length

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClick)
    }
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open])

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  function dismissNotification(id: string) {
    setItems((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <header className="relative z-[1100] flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
          <Ship className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h1 className="text-base font-semibold text-foreground">{title}</h1>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Bell button */}
      <button
        onClick={() => setOpen(!open)}
        className={`relative flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-secondary ${open ? "bg-secondary" : ""}`}
        aria-label="Notifications"
        aria-expanded={open}
      >
        <Bell className={`h-5 w-5 ${open ? "text-accent" : "text-muted-foreground"}`} />
        {unreadCount > 0 && (
          <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-accent-foreground">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {open && (
        <div
          ref={panelRef}
          className="absolute right-3 top-full mt-1 w-[calc(100vw-24px)] max-w-[360px] overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
        >
          {/* Panel Header */}
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <h2 className="text-sm font-semibold text-foreground">{t("notif.title")}</h2>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-xs font-medium text-accent transition-colors hover:text-accent/80"
              >
                {t("notif.markAllRead")}
              </button>
            )}
          </div>

          {/* Notification list */}
          <div className="max-h-[400px] overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center gap-2 px-4 py-10">
                <Bell className="h-8 w-8 text-muted-foreground/40" />
                <p className="text-sm text-muted-foreground">{t("notif.empty")}</p>
              </div>
            ) : (
              items.map((notification) => {
                const Icon = notification.icon
                return (
                  <div
                    key={notification.id}
                    className={`group relative flex gap-3 border-b border-border/50 px-4 py-3 transition-colors last:border-0 hover:bg-secondary/50 ${notification.unread ? "bg-accent/[0.03]" : ""}`}
                  >
                    {/* Unread dot */}
                    {notification.unread && (
                      <span className="absolute left-1.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent" />
                    )}

                    <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${notification.iconBg}`}>
                      <Icon className={`h-4 w-4 ${notification.iconColor}`} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className={`text-sm leading-tight ${notification.unread ? "font-semibold text-foreground" : "font-medium text-foreground/80"}`}>
                          {t(notification.titleKey)}
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            dismissNotification(notification.id)
                          }}
                          className="shrink-0 rounded p-0.5 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-border"
                          aria-label={`Dismiss ${t(notification.titleKey)}`}
                        >
                          <X className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                      </div>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                        {t(notification.messageKey)}
                      </p>
                      <p className="mt-1 text-[10px] text-muted-foreground/60">
                        {t(notification.timeKey)}
                      </p>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      )}
    </header>
  )
}

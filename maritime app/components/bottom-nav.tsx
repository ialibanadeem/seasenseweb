"use client"

import { Home, User, Settings } from "lucide-react"
import { useSettings } from "@/lib/settings-context"

type TabId = "live" | "profile" | "settings"

interface BottomNavProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
}

const tabs: { id: TabId; labelKey: string; icon: typeof Home }[] = [
  { id: "live", labelKey: "nav.live", icon: Home },
  { id: "profile", labelKey: "nav.profile", icon: User },
  { id: "settings", labelKey: "nav.settings", icon: Settings },
]

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const { t } = useSettings()

  return (
    <nav
      className="flex items-center justify-around border-t border-border bg-card px-2 py-2"
      role="tablist"
      aria-label="Main navigation"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-label={t(tab.labelKey)}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center gap-1 rounded-lg px-3 py-1.5 text-[10px] font-medium tracking-wide transition-colors ${
              isActive
                ? "text-accent"
                : "text-muted-foreground hover:text-secondary-foreground"
            }`}
          >
            <tab.icon className={`h-5 w-5 ${isActive ? "text-accent" : ""}`} />
            <span>{t(tab.labelKey)}</span>
          </button>
        )
      })}
    </nav>
  )
}

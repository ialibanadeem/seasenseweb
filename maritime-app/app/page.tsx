"use client"

import { useState } from "react"
import { SettingsProvider } from "@/lib/settings-context"
import { BottomNav } from "@/components/bottom-nav"
import { LiveScreen } from "@/components/live-screen"
import { ProfileScreen } from "@/components/profile-screen"
import { SettingsScreen } from "@/components/settings-screen"

type TabId = "live" | "profile" | "settings"

export default function Page() {
  const [activeTab, setActiveTab] = useState<TabId>("live")

  return (
    <SettingsProvider>
      <div className="mx-auto flex h-dvh max-w-md flex-col overflow-hidden bg-background">
        <main className="flex-1 overflow-hidden">
          {activeTab === "live" && <LiveScreen />}
          {activeTab === "profile" && <ProfileScreen />}
          {activeTab === "settings" && <SettingsScreen />}
        </main>
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </SettingsProvider>
  )
}

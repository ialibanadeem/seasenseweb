"use client"

import { AppHeader } from "./app-header"
import { useSettings } from "@/lib/settings-context"
import { Ship, Phone, Anchor, LogOut, ChevronRight } from "lucide-react"

export function ProfileScreen() {
  const { t } = useSettings()

  return (
    <div className="flex h-full flex-col">
      <AppHeader title={t("profile.title")} />

      <div className="flex-1 overflow-y-auto px-4 pb-6">
        {/* Avatar Section */}
        <div className="flex flex-col items-center py-6">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-border bg-secondary">
              <span className="text-2xl font-bold text-accent">HA</span>
            </div>
            <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-background bg-accent" />
          </div>
          <h2 className="mt-4 text-xl font-bold text-foreground">Hassan Malik</h2>
          <p className="mt-1 text-sm text-accent">{t("profile.fisherLicense")}</p>
        </div>

        {/* Vessel Details */}
        <section className="mt-2">
          <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            {t("profile.vesselDetails")}
          </h3>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <Ship className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{t("profile.vesselName")}</p>
                <p className="text-xs text-muted-foreground">{t("profile.vesselValue")}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {t("profile.registration")}
                </p>
                <p className="mt-0.5 text-sm font-bold text-foreground">KHI-2024-001</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {t("profile.mmsi")}
                </p>
                <p className="mt-0.5 text-sm font-bold text-foreground">507000001</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {t("profile.length")}
                </p>
                <p className="mt-0.5 text-sm font-bold text-foreground">18.5m</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {t("profile.crewSize")}
                </p>
                <p className="mt-0.5 text-sm font-bold text-foreground">{t("profile.crewValue")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Contacts */}
        <section className="mt-6">
          <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            {t("profile.emergencyContacts")}
          </h3>
          <div className="space-y-2">
            <button className="flex w-full items-center justify-between rounded-xl border border-border bg-card p-4 transition-colors hover:bg-secondary">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                  <Phone className="h-5 w-5 text-destructive" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-foreground">Ahmed Malik</p>
                  <p className="text-xs text-muted-foreground">{t("profile.primaryContact")}</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
            <button className="flex w-full items-center justify-between rounded-xl border border-border bg-card p-4 transition-colors hover:bg-secondary">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <Anchor className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-foreground">{t("profile.harborMaster")}</p>
                  <p className="text-xs text-muted-foreground">{t("live.karachiPort")}</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        </section>

        {/* Sign Out */}
        <div className="mt-8">
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-destructive py-3.5 text-sm font-semibold text-destructive-foreground transition-colors hover:bg-destructive/90">
            <LogOut className="h-4 w-4" />
            {t("profile.signOut")}
          </button>
        </div>
      </div>
    </div>
  )
}

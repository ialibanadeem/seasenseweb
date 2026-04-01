"use client";

import { useEffect, useState, useRef } from "react"
import { AppHeader } from "./app-header"
import { SOSButton } from "./sos-button"        
import { useSettings } from "@/lib/settings-context"
import { Gauge, Navigation, Waves, MapPin } from "lucide-react"

interface Coordinates {
  lat: number
  lng: number
}

function LeafletMap({ coords }: { coords: Coordinates }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const markerRef = useRef<any>(null)
  const initRef = useRef(false)

  useEffect(() => {
    if (initRef.current || !containerRef.current) return
    initRef.current = true

    let isCancelled = false

    const setup = async () => {
      const L = (await import("leaflet")).default
      await import("leaflet/dist/leaflet.css")

      if (isCancelled || !containerRef.current) return

      const map = L.map(containerRef.current, {
        center: [coords.lat, coords.lng],
        zoom: 13,
        zoomControl: false,
        attributionControl: false,
      })

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        { maxZoom: 19 }
      ).addTo(map)

      const vesselIcon = L.divIcon({
        html: `<div style="width:20px;height:20px;background:hsl(195,100%,50%);border:3px solid white;border-radius:50%;box-shadow:0 0 12px hsl(195,100%,50%),0 0 24px hsla(195,100%,50%,0.3)"></div>`,
        className: "",
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      })

      const marker = L.marker([coords.lat, coords.lng], { icon: vesselIcon }).addTo(map)

      L.polyline(
        [
          [coords.lat, coords.lng - 0.3],
          [coords.lat, coords.lng],
          [coords.lat, coords.lng + 0.3],
        ],
        { color: "hsl(195,100%,50%)", weight: 2, opacity: 0.7, dashArray: "8,8" }
      ).addTo(map)

      mapRef.current = map
      markerRef.current = marker
    }

    setup()

    return () => {
      isCancelled = true
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
        markerRef.current = null
      }
      initRef.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (mapRef.current && markerRef.current) {
      markerRef.current.setLatLng([coords.lat, coords.lng])
      mapRef.current.panTo([coords.lat, coords.lng])
    }
  }, [coords.lat, coords.lng])

  return <div ref={containerRef} className="h-full w-full" />
}

export function LiveScreen() {
  const { t, convertSpeed } = useSettings()
  const [coords, setCoords] = useState<Coordinates>({ lat: 24.8607, lng: 66.9933 })
  const [speedKnots, setSpeedKnots] = useState(10.5)
  const [heading, setHeading] = useState(245)
  const [depth] = useState(42)
  const [locationError, setLocationError] = useState<string | null>(null)

  const displaySpeed = convertSpeed(speedKnots)

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported")
      return
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        if (position.coords.speed !== null) {
          setSpeedKnots(Math.round(position.coords.speed * 1.94384 * 10) / 10)
        }
        if (position.coords.heading !== null && position.coords.heading > 0) {
          setHeading(Math.round(position.coords.heading))
        }
      },
      (error) => {
        setLocationError(error.message)
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    )

    return () => navigator.geolocation.clearWatch(watchId)
  }, [])

  return (
    <div className="relative flex h-full flex-col">
      {/* Header - floating on top */}
      <div className="relative z-[1100]">
        <AppHeader title="Shaheen" subtitle="KHI-2024-001" />
      </div>

      {/* Full-bleed map fills entire remaining area */}
      <div className="relative flex-1">
        <div className="absolute inset-0">
          <LeafletMap coords={coords} />
        </div>

        {/* Stats Bar Overlay - floats at top of map */}
        <div className="pointer-events-auto absolute left-3 right-3 top-2 z-[1000] flex items-center justify-between rounded-xl border border-border/50 bg-card/85 px-3 py-2.5 backdrop-blur-md">
          <div className="flex flex-col items-center gap-0.5">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
              <Gauge className="h-3 w-3" />
              <span>{t("live.speed")}</span>
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-xl font-bold text-foreground">{displaySpeed.value}</span>
              <span className="text-xs text-muted-foreground">{displaySpeed.label}</span>
            </div>
          </div>
          <div className="h-8 w-px bg-border/50" />
          <div className="flex flex-col items-center gap-0.5">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
              <Navigation className="h-3 w-3" />
              <span>{t("live.heading")}</span>
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-xl font-bold text-foreground">{heading}°</span>
              <span className="text-xs text-muted-foreground">{t("live.deg")}</span>
            </div>
          </div>
          <div className="h-8 w-px bg-border/50" />
          <div className="flex flex-col items-center gap-0.5">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
              <Waves className="h-3 w-3" />
              <span>{t("live.depth")}</span>
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-xl font-bold text-foreground">{depth}</span>
              <span className="text-xs text-muted-foreground">m</span>
            </div>
          </div>
        </div>

        {/* Live Coordinates Overlay */}
        <div className="absolute left-3 top-[76px] z-[1000] rounded-lg border border-border/50 bg-card/85 px-3 py-2 backdrop-blur-md">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
            <MapPin className="h-3 w-3 text-accent" />
            <span>{t("live.livePosition")}</span>
          </div>
          <p className="mt-0.5 font-mono text-xs text-foreground">
            {coords.lat.toFixed(4)}°N, {coords.lng.toFixed(4)}°E
          </p>
        </div>

        {locationError && (
          <div className="absolute right-3 top-[76px] z-[1000] rounded-lg bg-destructive/90 px-3 py-2 text-xs text-destructive-foreground backdrop-blur-sm">
            {locationError}
          </div>
        )}

        {/* Active Route Overlay - floats at bottom of map */}
        <div className="pointer-events-auto absolute bottom-0 left-0 right-0 z-[1000] rounded-t-2xl border-t border-border/50 bg-card/85 px-4 py-3 backdrop-blur-md">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span>{t("live.activeRoute")}</span>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-foreground">{t("live.karachiPort")}</span>
            </div>
            <span className="text-muted-foreground">{"\u2014"}</span>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-foreground">{t("live.gwadar")}</span>
            </div>
          </div>
        </div>

        {/* SOS Button - floating over map */}
        <div className="absolute bottom-20 right-4 z-[1000]">
          <SOSButton lat={coords.lat} lng={coords.lng} />
        </div>
      </div>
    </div>
  )
}

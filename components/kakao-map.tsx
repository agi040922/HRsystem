"use client"

import { useEffect, useRef } from "react"

interface KakaoMapProps {
  latitude: number
  longitude: number
  level?: number
  markerText?: string
  className?: string
}

export default function KakaoMap({ latitude, longitude, level = 3, markerText = "Marker", className }: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.kakao) {
      console.error("Kakao Maps API is not loaded.")
      return
    }

    const container = mapRef.current

    if (!container) {
      console.error("Map container not found.")
      return
    }

    const options = {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: level,
    }

    const map = new window.kakao.maps.Map(container, options)

    const markerPosition = new window.kakao.maps.LatLng(latitude, longitude)
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    })

    marker.setMap(map)

    // Add info window
    if (markerText) {
      const infowindow = new window.kakao.maps.InfoWindow({
        content: `<div style="padding:5px;">${markerText}</div>`,
      })

      window.kakao.maps.event.addListener(marker, "mouseover", () => {
        infowindow.open(map, marker)
      })

      window.kakao.maps.event.addListener(marker, "mouseout", () => {
        infowindow.close()
      })
    }

    return () => {
      // Cleanup function (optional)
      // Remove markers and listeners when the component unmounts
    }
  }, [latitude, longitude, level, markerText])

  return <div ref={mapRef} className={className} />
}

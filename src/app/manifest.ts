import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    short_name: "Noteset",
    name: "Noteset - personalized workout tracker",
    display: "standalone",
    orientation: "portrait-primary",
    id: "/current",
    start_url: "/current",
    scope: "/",
    display_override: ["standalone", "minimal-ui", "window-controls-overlay"],
    //still waiting for the option to put prefer color schema
    description: "Tracking workout progress",
    icons: [
      {
        src: "/manifest-icon-192.maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/manifest-icon-192.maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/manifest-icon-512.maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  }
}

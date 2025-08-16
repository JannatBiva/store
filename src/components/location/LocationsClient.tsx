"use client";

import LocationPicker from "@/components/location/LocationPicker";

export default function LocationsClient() {
  return (
    <LocationPicker
      onChange={(v) => {
        console.log("Selection:", v);

      }}
    />
  );
}

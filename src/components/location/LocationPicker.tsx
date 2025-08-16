"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { EP } from "@/lib/endpoints";

export type CityAPI = { cityID: number; cityName: string };
export type TownAPI = { townID: number; townName: string; cityID: number };

type Props = {
  onChange?: (v: { city?: CityAPI; town?: TownAPI }) => void;
  className?: string;
};

export default function LocationPicker({ onChange, className = "" }: Props) {
  const [cities, setCities] = useState<CityAPI[]>([]);
  const [towns, setTowns] = useState<TownAPI[]>([]);

  const [cityID, setCityID] = useState<number | null>(null);
  const [townID, setTownID] = useState<number | null>(null);

  const [loadingCities, setLoadingCities] = useState(true);
  const [loadingTowns, setLoadingTowns] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1) Load cities on mount
  useEffect(() => {
    let alive = true;
    setLoadingCities(true);
    api<CityAPI[]>(EP.cities)
      .then((list) => alive && setCities(list))
      .catch((e) => alive && setError(e?.message ?? "Failed to fetch cities"))
      .finally(() => alive && setLoadingCities(false));
    return () => {
      alive = false;
    };
  }, []);

  // 2) Load towns when a city is selected (fetch all + filter)
  useEffect(() => {
    if (cityID == null) {
      setTowns([]);
      setTownID(null);
      return;
    }
    let alive = true;
    setLoadingTowns(true);
    api<TownAPI[]>(EP.towns)
      .then((all) => {
        if (!alive) return;
        setTowns(all.filter((t) => t.cityID === cityID));
      })
      .catch((e) => alive && setError(e?.message ?? "Failed to fetch towns"))
      .finally(() => alive && setLoadingTowns(false));
    return () => {
      alive = false;
    };
  }, [cityID]);

  // 3) Bubble up
  useEffect(() => {
    const city = cities.find((c) => c.cityID === cityID);
    const town = towns.find((t) => t.townID === townID);
    onChange?.({ city, town });
  }, [cityID, townID, cities, towns, onChange]);

  const selectCls =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 " +
    "text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 " +
    "disabled:bg-slate-50 disabled:text-slate-400";

  return (
    <div className={`grid gap-4 sm:grid-cols-2 ${className}`}>
      {/* City */}
      <label className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <span className="text-sm text-slate-600">City</span>
        <select
          className={selectCls}
          value={cityID ?? ""}
          onChange={(e) => {
            const v = e.target.value ? Number(e.target.value) : null;
            setCityID(v);
            setTownID(null); // reset town when city changes
          }}
        >
          <option value="">{loadingCities ? "Loading..." : "Select a City"}</option>
          {!loadingCities &&
            cities.map((city) => (
              <option key={city.cityID} value={city.cityID}>
                {city.cityName}
              </option>
            ))}
        </select>
      </label>

      {/* Town */}
      <label className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <span className="text-sm text-slate-600">Town</span>
        <select
          className={selectCls}
          value={townID ?? ""}
          onChange={(e) => setTownID(e.target.value ? Number(e.target.value) : null)}
          disabled={cityID == null || loadingTowns}
        >
          <option value="">
            {cityID == null ? "Select a city first" : loadingTowns ? "Loading..." : "Select a town"}
          </option>
          {!loadingTowns &&
            towns.map((town) => (
              <option key={town.townID} value={town.townID}>
                {town.townName}
              </option>
            ))}
        </select>
      </label>

      {error && <p className="sm:col-span-2 text-sm text-rose-600">{error}</p>}
    </div>
  );
}

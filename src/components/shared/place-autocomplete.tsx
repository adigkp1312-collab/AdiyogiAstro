"use client";

import * as React from "react";
import { MapPin, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlaceResult {
  display_name: string;
  lat: string;
  lon: string;
}

interface PlaceAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onPlaceSelect: (place: { name: string; latitude: number; longitude: number }) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

export function PlaceAutocomplete({
  value,
  onChange,
  onPlaceSelect,
  placeholder = "Enter birth place (e.g., New Delhi, India)",
  className,
  required,
}: PlaceAutocompleteProps) {
  const [results, setResults] = React.useState<PlaceResult[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [selectedPlace, setSelectedPlace] = React.useState<string | null>(null);
  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchPlaces = React.useCallback(async (query: string) => {
    if (query.length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=6&addressdetails=0`,
        {
          headers: {
            "Accept-Language": "en",
          },
        }
      );
      if (response.ok) {
        const data: PlaceResult[] = await response.json();
        setResults(data);
        setShowDropdown(data.length > 0);
      }
    } catch {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    onChange(val);
    setSelectedPlace(null);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      searchPlaces(val);
    }, 350);
  }

  function handleSelect(place: PlaceResult) {
    const shortName = place.display_name.split(",").slice(0, 3).join(",").trim();
    onChange(shortName);
    setSelectedPlace(shortName);
    setShowDropdown(false);
    setResults([]);
    onPlaceSelect({
      name: shortName,
      latitude: parseFloat(place.lat),
      longitude: parseFloat(place.lon),
    });
  }

  function handleClear() {
    onChange("");
    setSelectedPlace(null);
    setResults([]);
    setShowDropdown(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => {
            if (results.length > 0 && !selectedPlace) {
              setShowDropdown(true);
            }
          }}
          placeholder={placeholder}
          required={required}
          className={cn(
            "w-full rounded-md border border-gray-300 py-2 pl-9 pr-8 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#FF6600] focus:outline-none focus:ring-2 focus:ring-orange-200",
            className
          )}
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-gray-400 hover:text-gray-600"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>

      {isLoading && (
        <div className="absolute right-8 top-1/2 -translate-y-1/2">
          <Loader2 className="size-4 animate-spin text-[#FF6600]" />
        </div>
      )}

      {showDropdown && results.length > 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
          {results.map((place, idx) => (
            <button
              key={`${place.lat}-${place.lon}-${idx}`}
              type="button"
              onClick={() => handleSelect(place)}
              className="flex w-full items-start gap-2 px-3 py-2.5 text-left text-sm text-gray-700 transition-colors hover:bg-orange-50 hover:text-[#FF6600] first:rounded-t-md last:rounded-b-md"
            >
              <MapPin className="mt-0.5 size-3.5 shrink-0 text-gray-400" />
              <span className="line-clamp-2">{place.display_name}</span>
            </button>
          ))}
          <div className="border-t border-gray-100 px-3 py-1.5 text-[10px] text-gray-400">
            Powered by OpenStreetMap Nominatim
          </div>
        </div>
      )}
    </div>
  );
}

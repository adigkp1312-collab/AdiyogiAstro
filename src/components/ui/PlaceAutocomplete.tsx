'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

interface PlaceAutocompleteProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  icon?: React.ReactNode;
}

// Major Indian cities for fallback autocomplete
const INDIAN_CITIES = [
  'Mumbai, Maharashtra', 'Delhi, NCT', 'Bangalore, Karnataka', 'Hyderabad, Telangana',
  'Ahmedabad, Gujarat', 'Chennai, Tamil Nadu', 'Kolkata, West Bengal', 'Pune, Maharashtra',
  'Jaipur, Rajasthan', 'Surat, Gujarat', 'Lucknow, Uttar Pradesh', 'Kanpur, Uttar Pradesh',
  'Nagpur, Maharashtra', 'Indore, Madhya Pradesh', 'Thane, Maharashtra', 'Bhopal, Madhya Pradesh',
  'Visakhapatnam, Andhra Pradesh', 'Patna, Bihar', 'Vadodara, Gujarat', 'Ghaziabad, Uttar Pradesh',
  'Ludhiana, Punjab', 'Agra, Uttar Pradesh', 'Nashik, Maharashtra', 'Faridabad, Haryana',
  'Meerut, Uttar Pradesh', 'Rajkot, Gujarat', 'Varanasi, Uttar Pradesh', 'Srinagar, Jammu & Kashmir',
  'Aurangabad, Maharashtra', 'Dhanbad, Jharkhand', 'Amritsar, Punjab', 'Navi Mumbai, Maharashtra',
  'Allahabad, Uttar Pradesh', 'Ranchi, Jharkhand', 'Howrah, West Bengal', 'Coimbatore, Tamil Nadu',
  'Jabalpur, Madhya Pradesh', 'Gwalior, Madhya Pradesh', 'Vijayawada, Andhra Pradesh',
  'Jodhpur, Rajasthan', 'Madurai, Tamil Nadu', 'Raipur, Chhattisgarh', 'Kota, Rajasthan',
  'Chandigarh, Chandigarh', 'Guwahati, Assam', 'Solapur, Maharashtra', 'Hubli, Karnataka',
  'Tiruchirappalli, Tamil Nadu', 'Bareilly, Uttar Pradesh', 'Mysore, Karnataka',
  'Tiruppur, Tamil Nadu', 'Gurgaon, Haryana', 'Aligarh, Uttar Pradesh', 'Jalandhar, Punjab',
  'Bhubaneswar, Odisha', 'Salem, Tamil Nadu', 'Warangal, Telangana', 'Guntur, Andhra Pradesh',
  'Bhiwandi, Maharashtra', 'Saharanpur, Uttar Pradesh', 'Gorakhpur, Uttar Pradesh',
  'Bikaner, Rajasthan', 'Amravati, Maharashtra', 'Noida, Uttar Pradesh', 'Jamshedpur, Jharkhand',
  'Bhilai, Chhattisgarh', 'Cuttack, Odisha', 'Firozabad, Uttar Pradesh', 'Kochi, Kerala',
  'Nellore, Andhra Pradesh', 'Bhavnagar, Gujarat', 'Dehradun, Uttarakhand', 'Durgapur, West Bengal',
  'Asansol, West Bengal', 'Rourkela, Odisha', 'Nanded, Maharashtra', 'Kolhapur, Maharashtra',
  'Ajmer, Rajasthan', 'Akola, Maharashtra', 'Gulbarga, Karnataka', 'Jamnagar, Gujarat',
  'Ujjain, Madhya Pradesh', 'Loni, Uttar Pradesh', 'Siliguri, West Bengal', 'Jhansi, Uttar Pradesh',
  'Ulhasnagar, Maharashtra', 'Jammu, Jammu & Kashmir', 'Sangli, Maharashtra', 'Mangalore, Karnataka',
  'Erode, Tamil Nadu', 'Belgaum, Karnataka', 'Ambattur, Tamil Nadu', 'Tirunelveli, Tamil Nadu',
  'Malegaon, Maharashtra', 'Gaya, Bihar', 'Udaipur, Rajasthan', 'Kakinada, Andhra Pradesh',
  'Davanagere, Karnataka', 'Kozhikode, Kerala', 'Maheshtala, West Bengal', 'Rajahmundry, Andhra Pradesh',
  'Bokaro, Jharkhand', 'South Dumdum, West Bengal', 'Bellary, Karnataka', 'Patiala, Punjab',
  'Gopalpur, Bihar', 'Agartala, Tripura', 'Bhagalpur, Bihar', 'Muzaffarnagar, Uttar Pradesh',
  'Bhatpara, West Bengal', 'Panihati, West Bengal', 'Latur, Maharashtra', 'Dhule, Maharashtra',
  'Rohtak, Haryana', 'Korba, Chhattisgarh', 'Bhilwara, Rajasthan', 'Berhampur, Odisha',
  'Muzaffarpur, Bihar', 'Ahmednagar, Maharashtra', 'Mathura, Uttar Pradesh', 'Kollam, Kerala',
  'Avadi, Tamil Nadu', 'Kadapa, Andhra Pradesh', 'Anantapur, Andhra Pradesh',
  'Kamarhati, West Bengal', 'Bilaspur, Chhattisgarh', 'Sambalpur, Odisha', 'Shahjahanpur, Uttar Pradesh',
  'Satara, Maharashtra', 'Bijapur, Karnataka', 'Rampur, Uttar Pradesh', 'Shimoga, Karnataka',
  'Chandrapur, Maharashtra', 'Junagadh, Gujarat', 'Thrissur, Kerala', 'Alwar, Rajasthan',
  'Bardhaman, West Bengal', 'Kulti, West Bengal', 'Nizamabad, Telangana', 'Parbhani, Maharashtra',
  'Tumkur, Karnataka', 'Khammam, Telangana', 'Ozhukarai, Puducherry', 'Bihar Sharif, Bihar',
  'Panipat, Haryana', 'Darbhanga, Bihar', 'Bally, West Bengal', 'Aizawl, Mizoram',
  'Dewas, Madhya Pradesh', 'Ichalkaranji, Maharashtra', 'Karnal, Haryana', 'Bathinda, Punjab',
  'Jalna, Maharashtra', 'Eluru, Andhra Pradesh', 'Kirari Suleman Nagar, Delhi',
  'Barasat, West Bengal', 'Purnia, Bihar', 'Satna, Madhya Pradesh', 'Mau, Uttar Pradesh',
  'Sonipat, Haryana', 'Farrukhabad, Uttar Pradesh', 'Durg, Chhattisgarh', 'Imphal, Manipur',
  'Ratlam, Madhya Pradesh', 'Hapur, Uttar Pradesh', 'Arrah, Bihar', 'Anantapur, Andhra Pradesh',
  'Karimnagar, Telangana', 'Etawah, Uttar Pradesh', 'Ambernath, Maharashtra',
  'North Dumdum, West Bengal', 'Bharatpur, Rajasthan', 'Begusarai, Bihar', 'New Delhi, Delhi',
  'Gandhidham, Gujarat', 'Baranagar, West Bengal', 'Tiruvottiyur, Tamil Nadu', 'Pondicherry, Puducherry',
  'Sikar, Rajasthan', 'Thoothukudi, Tamil Nadu', 'Rewa, Madhya Pradesh', 'Mirzapur, Uttar Pradesh',
  'Raichur, Karnataka', 'Pali, Rajasthan', 'Kharagpur, West Bengal', 'Shimla, Himachal Pradesh',
  'Gangtok, Sikkim', 'Itanagar, Arunachal Pradesh', 'Shillong, Meghalaya', 'Kohima, Nagaland',
  'Dimapur, Nagaland', 'Port Blair, Andaman and Nicobar', 'Daman, Daman and Diu',
  'Silvassa, Dadra and Nagar Haveli', 'Kavaratti, Lakshadweep', 'Panaji, Goa',
  'Margao, Goa', 'Thiruvananthapuram, Kerala', 'Palakkad, Kerala', 'Alappuzha, Kerala',
  'Kannur, Kerala', 'Kottayam, Kerala',
];

export default function PlaceAutocomplete({
  label,
  placeholder = 'Search for a city...',
  value,
  onChange,
  error,
  icon,
}: PlaceAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync external value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    onChange(val);

    if (val.trim().length >= 2) {
      const query = val.toLowerCase();
      const filtered = INDIAN_CITIES
        .filter(city => city.toLowerCase().includes(query))
        .slice(0, 8);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [onChange]);

  const handleSelect = useCallback((city: string) => {
    const cityName = city.split(',')[0].trim();
    setInputValue(city);
    onChange(cityName);
    setShowSuggestions(false);
  }, [onChange]);

  return (
    <div className="w-full" ref={wrapperRef}>
      {label && (
        <label className="block text-sm font-medium text-text-primary mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary z-10">
            {icon}
          </div>
        )}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => {
            if (suggestions.length > 0) setShowSuggestions(true);
          }}
          placeholder={placeholder}
          autoComplete="off"
          className={`w-full px-4 py-3 rounded-button border border-border bg-surface-card text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-300 ${icon ? 'pl-10' : ''} ${error ? 'border-negative' : ''}`}
        />

        {/* Google Maps icon indicator */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary/40">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-surface-card border border-border/50 rounded-card shadow-elevated max-h-48 overflow-y-auto animate-fade-in">
            {suggestions.map((city, idx) => {
              const parts = city.split(',');
              const cityName = parts[0].trim();
              const state = parts[1]?.trim() || '';
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelect(city)}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-primary/10 transition-colors text-left border-b border-border/20 last:border-0"
                >
                  <svg className="w-4 h-4 text-primary/60 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div>
                    <p className="text-xs font-semibold text-text-primary">{cityName}</p>
                    {state && <p className="text-[10px] text-text-secondary">{state}</p>}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-xs text-negative">{error}</p>
      )}
    </div>
  );
}

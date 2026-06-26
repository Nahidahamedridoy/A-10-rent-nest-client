"use client";

import { useState, useEffect } from "react";
import { Card, Input, Button, Label } from "@heroui/react";
import { FaSearch, FaSlidersH, FaHistory } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";

// রিকোয়ারমেন্ট অনুযায়ী ডাইনামিক ফিল্টার ডেটা সেট
const PROPERTY_TYPES = ["Apartment", "House", "Duplex", "Studio", "Office", "Commercial"];

export default function FilterPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL-এর বর্তমান অবস্থা ধরে রাখার জন্য স্টেট (যাতে পেজ রিলোড হলেও ইনপুট মুছে না যায়)
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [propertyType, setPropertyType] = useState(searchParams.get("propertyType") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "");

  // URL চেঞ্জ হলে স্টেট সিঙ্ক করার জন্য
  useEffect(() => {
    setLocation(searchParams.get("location") || "");
    setPropertyType(searchParams.get("propertyType") || "");
    setSort(searchParams.get("sort") || "");
  }, [searchParams]);

  // ফিল্টার অ্যাপ্লাই করার লজিক (ব্যাকএন্ড ফিল্টারিংয়ের জন্য ইউআরএল পুশ করবে)
  const handleApplyFilters = () => {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (propertyType) params.set("propertyType", propertyType);
    if (sort) params.set("sort", sort);
    params.set("page", "1"); // ফিল্টার চেঞ্জ করলে সবসময় প্রথম পেজ থেকে শুরু হবে

    router.push(`/properties?${params.toString()}`);
  };

  // ফিল্টার রিসেট লজিক
  const handleReset = () => {
    setLocation("");
    setPropertyType("");
    setSort("");
    router.push("/properties");
  };

  return (
    <Card 
      className="bg-white border border-slate-100 p-6 md:p-8 shadow-md rounded-2xl relative overflow-hidden"
      shadow="none"
    >
      <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 items-end">
        
        {/* Location Search Input */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="search-location" className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Search Location
          </Label>
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            id="search-location"
            placeholder="e.g. Dhaka, New York..."
            startContent={<FaSearch className="text-pink-500 text-sm" />}
            variant="bordered"
            className="w-full text-slate-800 text-sm h-12"
            classNames={{
              inputWrapper: "bg-slate-50 border-slate-200 hover:border-pink-500/50 focus-within:!border-pink-500 rounded-xl transition-all h-12"
            }}
          />
        </div>

        {/* Property Type Selector */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="filter-type" className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Property Type
          </Label>
          <div className="relative">
            <select
              id="filter-type"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full h-12 bg-slate-50 border border-slate-200 hover:border-pink-500/50 focus:border-pink-500 rounded-xl px-3 text-slate-700 text-sm outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="">All Types</option>
              {PROPERTY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Price Sorting Selector */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="filter-sort" className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Sort By Price
          </Label>
          <div className="relative">
            <select
              id="filter-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full h-12 bg-slate-50 border border-slate-200 hover:border-pink-500/50 focus:border-pink-500 rounded-xl px-3 text-slate-700 text-sm outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="">Default Order</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 w-full">
          <Button
            onClick={handleApplyFilters}
            className="flex-grow bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold h-12 shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-95 transition-all duration-200"
            radius="lg"
            startContent={<FaSlidersH size={12} />}
          >
            Apply Filters
          </Button>
          <Button
            onClick={handleReset}
            variant="bordered"
            className="border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 font-semibold h-12 transition-all duration-200 px-4 min-w-0"
            radius="lg"
            title="Reset Filters"
          >
            <FaHistory size={13} className="text-slate-400 group-hover:text-slate-600" />
          </Button>
        </div>

      </div>
    </Card>
  );
}
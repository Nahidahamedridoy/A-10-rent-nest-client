"use client";

import { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import { baseURL } from "@/lib/api/baseUrl";

export default function FeaturedProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      const res = await fetch(
        `${baseURL}/featured-property`
      );
      const data = await res.json();

      setProperties(data);
      setLoading(false);
    };

    fetchProperties();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <section className="max-w-7xl mx-auto py-16">
      <h2 className="text-4xl font-bold text-center mb-10">
        Featured Properties
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <PropertyCard
            key={property._id}
            property={property}
          />
        ))}
      </div>
    </section>
  );
}
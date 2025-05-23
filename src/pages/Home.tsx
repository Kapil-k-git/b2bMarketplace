"use client";
import {
  FilterIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/Loader";
import Image from "next/image";

interface Listing {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  location: string;
  attributes: Record<string, string>;
}

interface FacetOption {
  _id: string;
  count: number;
}

interface Category {
  _id: string;
  name: string;
  attributeSchema: {
    _id: string;
    key: string;
    type: "text" | "number" | "select";
    options: string[];
  }[];
}

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Listing[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string>
  >({});
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/search/`, {
        params: {
          q: query,
          filters: Object.keys(selectedFilters).length ? JSON.stringify(selectedFilters) : undefined,
          category: selectedCategory || undefined,
        },
      });
      setResults(res.data.listings);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/category`);
      if (res?.data) {
        setCategory(res.data.category);
      }
    } catch (error) {
      console.error("Category fetch failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    if (category.length) {
      fetchData();
    }
  }, [selectedFilters, selectedCategory, category]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData();
  };
  const selectedCategoryObj = category.find(cat => cat._id === selectedCategory);

  const onFilterChange = (key: string, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  if (loading) {
    return <Loading />;
  }

  if (!loading && results.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header handleSearch={handleSearch} setQuery={setQuery} query={query} />
        <main className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-500 text-lg font-medium mt-10">
            No results found
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header handleSearch={handleSearch} setQuery={setQuery} query={query} />
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <button className="lg:hidden flex items-center justify-center gap-2 w-full py-2 px-4 bg-white border border-gray-300 rounded-lg shadow-sm">
            <FilterIcon className="w-5 h-5" />
            <span>Show Filters</span>
          </button>

          {/* Sidebar Filters */}
          <aside className="hidden lg:block w-full lg:w-64 shrink-0 space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h2 className="font-semibold text-lg mb-4">Categories</h2>
              <div className="space-y-2">
                {category.map((cat) => (
                  <div key={cat._id} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      id={`category-${cat._id}`}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedCategory === cat._id}
                      onChange={() => setSelectedCategory(cat._id)}
                    />
                    <label
                      htmlFor={`category-${cat._id}`}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {cat.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h2 className="font-semibold text-lg mb-4">Filter</h2>
              <div className="space-y-4">
                {selectedCategoryObj?.attributeSchema?.map((attribute) => (
                  <div key={attribute._id}>
                    <h3 className="text-sm font-medium text-gray-700 capitalize mb-1">
                      {attribute.key}
                    </h3>
                    {attribute.type === "select" ? (
                      <select
                        value={selectedFilters[attribute.key] || ""}
                        onChange={(e) =>
                          onFilterChange(attribute.key, e.target.value)
                        }
                        className="text-sm w-full border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="" disabled>Select</option>
                        {attribute.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={attribute.type}
                        placeholder={`Enter ${attribute.key}`}
                        value={selectedFilters[attribute.key] || ""}
                        onChange={(e) =>
                          onFilterChange(attribute.key, e.target.value)
                        }
                        className="text-sm w-full border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-xl font-bold text-gray-800">
                    Search Results
                  </h1>
                  <p className="text-sm text-gray-500">
                    Showing {results.length} results
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((result, index) => (
                <div
                  key={result._id}
                  className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48 mb-4">
                    <Image
                      src={result.image}
                      alt={result.title}
                      fill
                      className="rounded-t-lg w-100 h-50"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1 line-clamp-2">
                      {result.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-1">
                      Brand: {result.attributes?.brand || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                      {result.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-gray-900">
                          ${result.price}
                        </span>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          index % 3 === 0
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {index % 3 === 0 ? "Sale" : "In Stock"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <nav className="flex items-center gap-1">
                <button className="p-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">
                  <ChevronLeftIcon className="w-5 h-5" />
                  <span className="sr-only">Previous</span>
                </button>
                {[1].map((page) => (
                  <button
                    key={page}
                    className={`w-10 h-10 rounded-md ${
                      page === 1
                        ? "bg-blue-600 text-white"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="p-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">
                  <ChevronRightIcon className="w-5 h-5" />
                  <span className="sr-only">Next</span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

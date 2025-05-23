import { SearchIcon } from "lucide-react";
import Link from "next/link";
import React, { FormEvent } from "react";

interface SearchHeaderProps {
  query: string;
  setQuery: (value: string) => void;
  handleSearch: (e: FormEvent<HTMLFormElement>) => void;
}

const Header: React.FC<SearchHeaderProps> = ({ handleSearch, setQuery, query }) => {
  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            B2B<span className="text-blue-600">Marketplace</span>
          </Link>

          <form onSubmit={handleSearch} className="flex w-full max-w-md gap-2">
            <input
              type="text"
              placeholder="Search for products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              <SearchIcon className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;

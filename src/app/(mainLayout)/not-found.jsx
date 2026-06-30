import Link from "next/link";
import { Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 flex items-center justify-center px-4">
      
      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 text-center max-w-2xl">
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-6 rounded-full bg-white/10 border border-white/10 backdrop-blur-xl shadow-2xl">
            <SearchX className="w-16 h-16 text-cyan-400" />
          </div>
        </div>

        {/* 404 */}
        <h1 className="text-7xl md:text-9xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-4 text-3xl md:text-5xl font-bold text-white">
          Oops! Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-6 text-gray-300 text-lg leading-relaxed max-w-xl mx-auto">
          The page you are looking for might have been removed,
          renamed, or is temporarily unavailable.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-white font-semibold transition-all duration-300 shadow-lg shadow-cyan-500/30"
          >
            <Home size={20} />
            Back To Home
          </Link>

          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold backdrop-blur-lg transition-all duration-300"
          >
            Browse Rooms
          </Link>
        </div>

        {/* Bottom Text */}
        <p className="mt-12 text-sm text-gray-500">
          Error Code: 404 | Lost in Space 🚀
        </p>
      </div>
    </div>
  );
}
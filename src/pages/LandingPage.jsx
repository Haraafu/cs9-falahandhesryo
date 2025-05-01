import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col sm:flex-row z-10">
      <img
        src="/landingpage.svg" 
        alt="background"
        className="absolute inset-0 object-cover min-h-screen w-full h-full z-0"
      />
      <div className="sm:w-1/2 w-full text-white flex flex-col justify-center items-center px-6 py-12 z-10 ">
        <div className="max-w-md text-center sm:text-left">
          <h1 className="text-8xl font-bold mb-4">FALVORA</h1>
          <p className="text-zinc-300 text-xl mb-8">
            Belanja lebih bijak, tanpa drama. Solusi digital untuk generasi profesional.
          </p>
          <Link
            to="/login"
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold text-lg transition"
          >
            Mulai Sekarang
          </Link>
        </div>
      </div>
      <div className="sm:w-1/2 w-full flex items-center justify-center px-6 py-12 z-10">
        <img
          src="/ilustrasi.webp"
          alt="Illustration"
          className="w-3/5"
        />
      </div>
      <footer className="absolute bottom-0 w-full bg-zinc-900 text-center text-xs text-zinc-300 z-10 p-4">
        © 2025 Falah Andhesryo (2306161990). All rights reserved.
      </footer>
    </div>
  );
}
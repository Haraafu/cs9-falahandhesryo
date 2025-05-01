import { useEffect, useState } from "react";

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero");
      if (!hero) return;
      const heroBottom = hero.getBoundingClientRect().bottom;
      setShowNavbar(heroBottom <= 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 left-0 w-full bg-zinc-900 shadow-md z-50 px-24 py-4 flex items-center justify-between
				transition-transform duration-500 ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
			<div className="font-bold text-2xl text-white">FALVORA</div>
			<input
				type="text"
				placeholder="Cari produk..."
				className="w-full max-w-4xl px-3 py-2 bg-white border border-zinc-700 rounded-full text-sm text-white placeholder:text-zinc-400 mx-6"
			/>
			<div className="flex gap-3">
				<button
					onClick={() => window.location.href = "/"}
					className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
				>
					Log Out
				</button>
			</div>
		</div>
  );  
}

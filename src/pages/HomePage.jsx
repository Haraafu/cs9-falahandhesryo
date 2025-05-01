import { useEffect, useState } from "react";
import { getAllItems } from "../assets/services/itemService";
import Typewrite from "../assets/components/Typewrite";
import Navbar from "../assets/components/Navbar";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showHeroNavbar, setShowHeroNavbar] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // 🆕 Search state

  const handleClickProduct = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero");
      if (!hero) return;
      const heroBottom = hero.getBoundingClientRect().bottom;
      setShowHeroNavbar(heroBottom > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    getAllItems()
      .then((res) => setProducts(res.data.payload))
      .catch((err) => console.error("Gagal ambil produk:", err));
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      {showHeroNavbar && (
        <div className="absolute top-0 left-0 w-full bg-zinc-900 px-24 py-4 flex items-center justify-between z-50">
          <div className="font-bold text-2xl text-white">FALVORA</div>
          <button
            onClick={() => (window.location.href = "/")}
            className="font-semibold text-sm px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            Log Out
          </button>
        </div>
      )}

      <img
        src="/background.svg"
        alt="background"
        className="absolute inset-0 object-cover w-full h-[60vh] z-0"
      />
      <div
        id="hero"
        className="flex flex-col h-[60vh] justify-center items-center relative z-10 text-white px-4 text-center"
      >
        <h1 className="text-3xl sm:text-4xl pb-4 font-semibold">Temukan Produk</h1>
        <Typewrite />
        <h1 className="text-3xl sm:text-4xl pb-8 font-semibold">
          Hanya di <span className="font-bold">FALVORA</span>
        </h1>
        <input
          type="text"
          placeholder="Cari produk..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-4xl px-4 py-3 rounded-full shadow-md border border-gray-300 text-black bg-white"
        />
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 max-w-[70vw] xl:mx-auto mt-12">
        <h2 className="text-xl font-bold mb-4">Terlaris di FALVORA</h2>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {[...filteredProducts]
            .filter((p) => typeof p.stock === "number" && p.stock > 0)
            .sort((a, b) => a.stock - b.stock)
            .slice(0, 7)
            .map((product) => (
              <div
                key={`${product.id}-terlaris`}
                onClick={() => handleClickProduct(product)}
                className="cursor-pointer bg-white rounded-2xl shadow-md w-[200px] p-4 flex-shrink-0 flex flex-col justify-between"
              >
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
                <h3 className="text-md font-semibold min-h-[3rem]">{product.name}</h3>
                <p className="text-sm text-gray-800">Rp {product.price.toLocaleString("id-ID")}</p>
              </div>
            ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 max-w-[70vw] xl:mx-auto mt-6">
        <h2 className="text-xl font-bold mb-4">Mungkin Anda Suka</h2>
        <div className="flex flex-wrap gap-4 justify-start">
          {filteredProducts.map((product) => (
            <div
              key={`${product.id}-all`}
              onClick={() => handleClickProduct(product)}
              className="cursor-pointer bg-white rounded-2xl shadow-md w-[200px] p-4 flex flex-col justify-between"
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md mb-2"
              />
              <h3 className="text-md font-semibold min-h-[3rem]">{product.name}</h3>
              <p className="text-sm text-gray-800">Rp {product.price.toLocaleString("id-ID")}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 px-4">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
            <div className="flex gap-4 items-start">
              <img
                src={selectedProduct.image_url}
                alt={selectedProduct.name}
                className="w-32 h-32 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{selectedProduct.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Stok tersedia: {selectedProduct.stock}
                </p>
                <label className="text-sm text-gray-700">Jumlah yang ingin dibeli:</label>
                <input
                  type="number"
                  min={1}
                  max={selectedProduct.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full border px-3 py-2 rounded mt-1 mb-4"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Beli
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="relative bg-zinc-900 text-zinc-300 py-8 px-4 mt-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
          <div>
            <h2 className="text-white font-bold text-lg mb-2">FALVORA</h2>
            <p>Belanja mudah, cepat, dan terpercaya. Temukan produk terbaik untuk kebutuhanmu.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">Navigasi</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">Beranda</a></li>
              <li><a href="#" className="hover:underline">Produk</a></li>
              <li><a href="#" className="hover:underline">Tentang Kami</a></li>
              <li><a href="#" className="hover:underline">Kontak</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">Hubungi Kami</h3>
            <p>Email: support@falvora.com</p>
            <p className="mt-1">Instagram: @falvora.id</p>
          </div>
        </div>
        <div className="absolute bottom-0 bg-zinc-900 w-full text-center text-xs text-zinc-300 p-4">
          © 2025 Falah Andhesryo (2306161990). All rights reserved.
        </div>
      </footer>
    </div>
  );
}

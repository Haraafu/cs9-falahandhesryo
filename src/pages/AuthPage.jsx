import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "../assets/api/axios";

export default function AuthPage() {
  const navigate = useNavigate(); 
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isResetMode, setIsResetMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLoginMode) {
        const res = await axios.post(`/user/login?email=${email}&password=${password}`);
        setMessage(`Login berhasil: ${res.data.payload?.name || "Selamat datang!"}`);
        setTimeout(() => navigate("/home"), 1000); 
      } else {
        const res = await axios.post(`/user/register?name=${name}&email=${email}&password=${password}`);
        setMessage("Registrasi berhasil, silakan login.");
        setIsLoginMode(true);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Terjadi kesalahan.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const resUser = await axios.get(`/user/${email}`);
      const user = resUser.data.payload;

      if (!user || !user.id || !user.name) {
        setMessage("Akun tidak ditemukan.");
        return;
      }

      await axios.put("/user", {
        id: user.id,
        email,
        password,
        name: user.name,
      });

      setMessage("Password berhasil direset. Silakan login.");
      setIsResetMode(false);
      setIsLoginMode(true);
    } catch (err) {
      setMessage(err.response?.data?.message || "Gagal reset password.");
    }
  };

	return (
		<div className="min-h-screen bg-zinc-900 flex items-center justify-center px-4 relative">
			<img
				src="/authpage.svg"
				alt="background"
				className="absolute inset-0 w-full h-full object-cover z-0"
			/>
			<div className="bg-zinc-800 p-8 rounded-xl shadow-lg w-full max-w-md z-10">
				<h1 className="text-white text-2xl font-bold mb-6 text-center">
					{isResetMode
						? "Reset Password"
						: isLoginMode
						? "Login ke FALVORA"
						: "Daftar Akun Baru"}
				</h1>

				{message && (
					<div className="mb-4 text-sm text-center text-indigo-400">{message}</div>
				)}

				{!isResetMode ? (
					<form onSubmit={handleSubmit} className="space-y-4">
						{!isLoginMode && (
							<div>
								<label className="block text-zinc-300 mb-1 text-sm">Nama Lengkap</label>
								<input
									type="text"
									required
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="w-full px-4 py-2 rounded bg-zinc-700 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
								/>
							</div>
						)}
						<div>
							<label className="block text-zinc-300 mb-1 text-sm">Email</label>
							<input
								type="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full px-4 py-2 rounded bg-zinc-700 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
						</div>
						<div>
							<label className="block text-zinc-300 mb-1 text-sm">Password</label>
							<input
								type="password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full px-4 py-2 rounded bg-zinc-700 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
						</div>
						<button
							type="submit"
							className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded"
						>
							{isLoginMode ? "Login" : "Register"}
						</button>
					</form>
				) : (
					<form onSubmit={handleResetPassword} className="space-y-4">
						<div>
							<label className="block text-zinc-300 mb-1 text-sm">Email</label>
							<input
								type="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full px-4 py-2 rounded bg-zinc-700 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
						</div>
						<div>
							<label className="block text-zinc-300 mb-1 text-sm">Password Baru</label>
							<input
								type="password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full px-4 py-2 rounded bg-zinc-700 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
						</div>
						<button
							type="submit"
							className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded"
						>
							Reset Password
						</button>
					</form>
				)}

				{!isResetMode && (
					<p className="text-zinc-400 text-sm text-center mt-4">
						{isLoginMode ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
						<button
							onClick={() => {
								setIsLoginMode(!isLoginMode);
								setMessage("");
							}}
							className="text-indigo-400 hover:underline"
						>
							{isLoginMode ? "Daftar di sini" : "Login di sini"}
						</button>
					</p>
				)}

				{isLoginMode && !isResetMode && (
					<p className="text-zinc-400 text-sm text-center mt-2">
						Lupa password?{" "}
						<button
							onClick={() => {
								setIsResetMode(true);
								setMessage("");
							}}
							className="text-indigo-400 hover:underline"
						>
							Reset di sini
						</button>
					</p>
				)}

				{isResetMode && (
					<p className="text-zinc-400 text-sm text-center mt-4">
						Kembali ke{" "}
						<button
							onClick={() => {
								setIsResetMode(false);
								setIsLoginMode(true);
								setMessage("");
							}}
							className="text-indigo-400 hover:underline"
						>
							Login
						</button>
					</p>
				)}
			</div>

			<footer className="absolute bottom-0 bg-zinc-900 w-full text-center text-xs text-zinc-300 p-4">
				© 2025 Falah Andhesryo (2306161990). All rights reserved.
			</footer>
		</div>
	);
}
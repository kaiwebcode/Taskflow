
// import { useRouter } from "next/router";

import { useRouter } from "next/navigation";

export default function Navbar({ name }) {
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-200">
      <h1 className="text-xl font-bold">Welcome, {name}</h1>
      <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
    </nav>
  );
}

import { useAuth } from "../contexts/AuthContext";


const LogoutButton = () => {
    const { logout } = useAuth();
  return (
    <button
      onClick={logout}
      className="w-full rounded-2xl p-4 bg-red-500 text-white font-semibold shadow hover:bg-red-600 transition"
    >
      Log Out
    </button>
  )
}

export default LogoutButton

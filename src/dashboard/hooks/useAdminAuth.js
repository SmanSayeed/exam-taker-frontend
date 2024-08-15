import { useSelector } from "react-redux";

export default function useAdminAuth() {
    const auth = useSelector(state => state.auth);
    const isAdmin = auth?.admin_user?.roles.some(role => role.toLowerCase() === "admin");

    return isAdmin;
}

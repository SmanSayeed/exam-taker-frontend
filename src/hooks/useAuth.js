import { useSelector } from "react-redux";

export default function useAuth() {
    const auth = useSelector((state) => state.auth);

    if (auth?.access_token && auth?.admin_user) {
        return true;
    } else {
        return false;
    }
}

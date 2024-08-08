import { userLoggedIn } from "@/features/auth/authSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function useAuthCheck() {
    const dispatch = useDispatch();
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const localAuth = localStorage?.getItem("auth");

        if (localAuth) {
            const auth = JSON.parse(localAuth);

            if (auth?.access_token && auth?.admin_user) {
                dispatch(
                    userLoggedIn({
                        status: auth?.status,
                        message: auth?.message,
                        access_token: auth?.access_token,
                        admin_user: auth?.admin_user,
                    })
                );
            }
        }

        setAuthChecked(true);
    }, [dispatch, setAuthChecked]);

    return authChecked;
}

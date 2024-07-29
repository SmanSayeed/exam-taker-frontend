import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { useLogoutMutation } from "@/features/auth/authApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Logout = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleOpen = (event) => {
        event.preventDefault();
        setOpen(true)
    };

    const [logout, { isError, isSuccess, error }] = useLogoutMutation();

    const handleLogout = () => {
        logout();
    }

    useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message);
        }

        if (isSuccess) {
            setOpen(false);
            toast.success("Logout Succes!");
            navigate("/login/admin");
        }
    }, [isSuccess, navigate, isError, error]);

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger onClick={handleOpen}>
                Logout
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to log out from your account? This will end your current session.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>
                        <form onSubmit={handleLogout} >
                            <button type="submit">Yes</button>
                        </form>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default Logout;
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
import { Button } from "@/components/ui/button";
import { useCreateSubscriptionMutation } from "@/features/subscriptions/subscriptionsApi";
import { useState } from "react";
import { toast } from "sonner";

export function ApproveSubscription({ row }) {
    console.log("payment row data: ", row.original)

    const [open, setOpen] = useState(false);
    const handleOpen = (event) => {
        event.preventDefault();
        setOpen(true);
    };

    const [createSubscription, { isLoading }] = useCreateSubscriptionMutation();

    const handleApprove = async () => {
        const payload = {
            student_id: row.original.student_id,
            package_id: row.original.package_id,
            is_active: true,
        };

        try {
            const response = await createSubscription(payload).unwrap();
            toast.success(response?.message || "Subscription approved successfully.");
            setOpen(false);
        } catch (error) {
            toast.error(error?.data?.message || "Failed to approve subscription.");
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <span onClick={handleOpen} className="flex text-green-600">
                    Approve Subs
                </span>
            </AlertDialogTrigger>
            <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                <AlertDialogHeader>
                    <AlertDialogTitle>Approve Subscription?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to approve this subscription for Student ID: {row.original.student_id}?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>
                        <Button onClick={handleApprove} disabled={isLoading}>
                            {isLoading ? "Processing..." : "Confirm"}
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}


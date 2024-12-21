import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeclineSubscriptionMutation } from "@/features/subscriptions/subscriptionsApi";
import { useState } from "react";
import { toast } from "sonner";

export function DeclineSubscription({ row }) {
    const [open, setOpen] = useState(false);
    const [declineSubscription, { isLoading }] = useDeclineSubscriptionMutation();

    const handleOpen = (event) => {
        event.preventDefault();
        setOpen(true);
    };

    const handleDecline = async () => {
        try {
            const response = await declineSubscription({ id: row.id, data: { is_active: false } }).unwrap();
            toast.success(response?.message || "Subscription declined successfully.");
        } catch (error) {
            toast.error("Failed to decline the subscription. Please try again.");
        } finally {
            setOpen(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <span onClick={handleOpen} className="flex text-orange-600">
                    Decline Subs
                </span>
            </AlertDialogTrigger>
            <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                <AlertDialogHeader>
                    <AlertDialogTitle>Decline Payment?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to decline this payment?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>
                        <Button onClick={handleDecline} disabled={isLoading}>
                            {isLoading ? "Processing..." : "Confirm"}
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

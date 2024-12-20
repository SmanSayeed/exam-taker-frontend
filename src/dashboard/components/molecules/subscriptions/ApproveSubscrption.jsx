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
import { useGetSinglePackageQuery } from "@/features/packages/packageApi";
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
    const { data: packageData, isLoading: packageLoading } = useGetSinglePackageQuery(row.original.package_id, {
        skip: !row.original.package_id, // Skip query if package_id is null
    });

    const handleApprove = async () => {
        if (!packageData?.data || packageLoading) {
            toast.error("Package data is not available. Cannot approve subscription.");
            return;
        }

        const durationDays = packageData?.data?.duration_days || 0;
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + durationDays);

        const payload = {
            student_id: row.original.student_id,
            package_id: row.original.package_id,
            expires_at: expiresAt.toISOString().split("T")[0],
            is_active: packageData?.data?.is_active === 1 || false,
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
                        <Button onClick={handleApprove} disabled={isLoading || packageLoading}>
                            {isLoading || packageLoading ? "Processing..." : "Confirm"}
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}


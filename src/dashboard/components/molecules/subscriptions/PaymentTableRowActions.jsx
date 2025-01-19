import { DeleteAction } from "@/components/delete-action";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    useDeletePaymentMutation,
    useGetAllPaymentsQuery,
    useGetAllSubscriptionQuery
} from "@/features/subscriptions/subscriptionsApi";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ApproveSubscription } from "./ApproveSubscrption";

export function PaymentTableRowActions({ row }) {
    const [deletePayment] = useDeletePaymentMutation();
    const { refetch } = useGetAllPaymentsQuery();
    const { data: subscribedData } = useGetAllSubscriptionQuery();

    // check student has subscribed to a package
    const hasSubscribedToPkg = subscribedData?.data?.some((sub) => {
        return (
            sub?.student_id === row.original.student?.id &&
            sub?.package_id === row.original.package_details?.id
        );
    });

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                    <DotsHorizontalIcon className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                {/* Approve Subscrption */}
                {
                    !hasSubscribedToPkg && (
                        <>
                            <DropdownMenuItem className="cursor-pointer">
                                <ApproveSubscription row={row} />
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />
                        </>
                    )
                }

                {/* Decline Subscrption */}
                {/* {
                    hasSubscribedToPkg && (
                        <>
                            <DropdownMenuItem className="cursor-pointer">
                                <DeclineSubscription row={row} />
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />
                        </>
                    )
                } */}

                {/* Delete Payment */}
                <DropdownMenuItem className="cursor-pointer">
                    <DeleteAction
                        entityId={row.original.id}
                        entityName="Payment"
                        deleteFunction={deletePayment}
                        refetch={refetch}
                    />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

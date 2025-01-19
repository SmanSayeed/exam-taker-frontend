import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/dashboard/components/organism/datatable/DataTableColumnHeader";
import { useGetAllSubscriptionQuery } from "@/features/subscriptions/subscriptionsApi";
import { parseHtmlContent } from "@/utils/parseHtmlContent";
import { PaymentTableRowActions } from "./PaymentTableRowActions";

export const usePaymentColumns = () => {
    const { data: subscribedData } = useGetAllSubscriptionQuery();

    return [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                    className="translate-y-[2px]"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                    className="translate-y-[2px]"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        // payment id
        {
            accessorKey: "id",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Pay ID" />
            ),
            cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
            enableSorting: true,
        },
        // student name
        {
            accessorKey: "student",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Name" />
            ),
            cell: ({ row }) => {
                return (
                    <div>{row.original.student?.name}</div>
                )
            },
        },
        // student email
        {
            accessorKey: "student",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Email" />
            ),
            cell: ({ row }) => {
                return (
                    <div>{row.original.student?.email}</div>
                )
            },
        },
        // package name
        {
            accessorKey: "package_details",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Package" />
            ),
            cell: ({ row }) => {
                return (
                    <div>{parseHtmlContent(row.original.package_details?.name)}</div>
                )
            },
        },
        // payment number
        {
            accessorKey: "mobile_number",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Pay Number" />
            ),
            cell: ({ row }) => <div>{row.getValue("mobile_number")}</div>,
        },
        // payment method
        {
            accessorKey: "payment_method",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Payment Method" />
            ),
            cell: ({ row }) => <div>{row.getValue("payment_method")}</div>,
        },
        // transaction id
        {
            accessorKey: "transaction_id",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Transaction ID" />
            ),
            cell: ({ row }) => <div>{row.getValue("transaction_id")}</div>,
        },
        // amount
        {
            accessorKey: "amount",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Amount" />
            ),
            cell: ({ row }) => <div>{row.getValue("amount")}</div>,
        },
        // subscribtion status
        {
            accessorKey: "status",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Status" />
            ),
            cell: ({ row }) => {
                const hasSubscribedToPkg = subscribedData?.data?.some((sub) => {
                    return (
                        sub?.student_id === row.original.student?.id &&
                        sub?.package_id === row.original.package_details?.id
                    );
                });

                return (
                    <Badge variant={hasSubscribedToPkg ? "success" : "destructive"}>
                        {hasSubscribedToPkg ? "Approved" : "Pending"}
                    </Badge>
                )
            },
        },
        // payment time
        {
            accessorKey: "created_at",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Created At" />
            ),
            cell: ({ row }) =>
                new Date(row.getValue("created_at")).toLocaleString(),
        },
        {
            id: "actions",
            cell: ({ row }) => <PaymentTableRowActions row={row} />
        }
    ];
}

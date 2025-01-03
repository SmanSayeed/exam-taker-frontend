import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/dashboard/components/organism/datatable/DataTableColumnHeader";
import { PaymentTableRowActions } from "./PaymentTableRowActions";

export const paymentColumns = [
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
    {
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Payment ID" />
        ),
        cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
        enableSorting: true,
    },
    {
        accessorKey: "payment_method",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Payment Method" />
        ),
        cell: ({ row }) => <div>{row.getValue("payment_method")}</div>,
    },
    {
        accessorKey: "mobile_number",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Mobile Number" />
        ),
        cell: ({ row }) => <div>{row.getValue("mobile_number")}</div>,
    },
    {
        accessorKey: "transaction_id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Transaction ID" />
        ),
        cell: ({ row }) => <div>{row.getValue("transaction_id")}</div>,
    },
    {
        accessorKey: "amount",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Amount" />
        ),
        cell: ({ row }) => <div>{row.getValue("amount")}</div>,
    },
    {
        accessorKey: "verified",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Verified" />
        ),
        cell: ({ row }) => (
            <Badge variant={row.getValue("verified") ? "success" : "destructive"}>
                {row.getValue("verified") ? "Yes" : "No"}
            </Badge>
        ),
    },
    {
        accessorKey: "verified_at",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Verified At" />
        ),
        cell: ({ row }) =>
            row.getValue("verified_at") ? (
                <div>{new Date(row.getValue("verified_at")).toLocaleString()}</div>
            ) : (
                <div>Not Verified</div>
            ),
    },
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

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/dashboard/components/organism/datatable/DataTableColumnHeader";
import { useGetPackagesQuery } from "@/features/packages/packageApi";
import { useGetStudentsQuery } from "@/features/studentsApi/studentsApi";
import { parseHtmlContent } from "@/utils/parseHtmlContent";
import { PaymentTableRowActions } from "./PaymentTableRowActions";

export const usePaymentColumns = () => {
    const { data: allStudents } = useGetStudentsQuery();
    const { data: allPackages } = useGetPackagesQuery();
    console.log("allpackages", allPackages)

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
            accessorKey: "student_id",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Name" />
            ),
            cell: ({ row }) => {
                const foundStudent = allStudents?.data?.find(stu => stu?.id === row.original.student_id);

                return (
                    <div>{foundStudent?.name}</div>
                )
            },
        },
        // student email
        {
            accessorKey: "student_id",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Email" />
            ),
            cell: ({ row }) => {
                const foundStudent = allStudents?.data?.find(stu => stu?.id === row.original.student_id);

                return (
                    <div>{foundStudent?.email}</div>
                )
            },
        },
        // package name
        {
            accessorKey: "package",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Package" />
            ),
            cell: ({ row }) => {
                const foundPkg = allPackages?.data?.find(pkg => pkg?.id === row.original.package.id);
                console.log("foundPkg", foundPkg)

                return (
                    <div>{parseHtmlContent(foundPkg?.name)}</div>
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
        // verified status
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
        // verified time
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

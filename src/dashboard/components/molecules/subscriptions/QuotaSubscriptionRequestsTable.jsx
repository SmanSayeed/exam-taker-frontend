import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import {
  useGetQuotaSubscriptionsQuery,
  useVerifyQuotaSubscriptionMutation,
} from "@/features/subscriptions/quotaSubscriptionApi";
import { ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CommonModal from "../../atoms/CommonModal";
import { toast } from "sonner";

const columnHelper = createColumnHelper();

const QuotaSubscriptionRequestsTable = () => {
  const { data, error, isLoading } = useGetQuotaSubscriptionsQuery();
  const [verifyQuotaSubscription] = useVerifyQuotaSubscriptionMutation();
  const [sorting, setSorting] = React.useState([]);
  const [timeSort, setTimeSort] = React.useState("newest");

  const [openModal, setOpenModal] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(null);

  // Sort data based on timeSort selection
  const sortedData = React.useMemo(() => {
    if (!data?.message) return [];
    const sortedArray = [...data.message];
    return sortedArray.sort((a, b) => {
      const timeA = new Date(a.verified_at || a.created_at).getTime();
      const timeB = new Date(b.verified_at || b.created_at).getTime();
      return timeSort === "newest" ? timeB - timeA : timeA - timeB;
    });
  }, [data?.message, timeSort]);

  const columns = [
    columnHelper.accessor("id", {
      header: ({ column }) => (
        <button
          className="flex items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="h-4 w-4" />
        </button>
      ),
    }),
    columnHelper.accessor("student.name", {
      header: ({ column }) => (
        <button
          className="flex items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Student Name
          <ArrowUpDown className="h-4 w-4" />
        </button>
      ),
    }),
    columnHelper.accessor("student.email", {
      header: "Email",
    }),
    columnHelper.accessor("mobile_number", {
      header: "Mobile Number",
    }),
    columnHelper.accessor("payment_method", {
      header: "Payment Method",
    }),
    columnHelper.accessor("transaction_id", {
      header: "Transaction ID",
    }),
    columnHelper.accessor("coupon", {
      header: "Coupon",
    }),
    columnHelper.accessor("verified", {
      header: "Verified",
      cell: ({ row }) => (
        <span
          className={row.original.verified ? "text-green-600" : "text-red-600"}
        >
          {row.original.verified ? "Yes" : "No"}
        </span>
      ),
    }),
    columnHelper.accessor("verified_at", {
      header: "Verified At",
      cell: ({ row }) => row.original.verified_at || "Not Verified",
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <button
          className="bg-accent text-accent-foreground py-1 px-3 rounded hover:bg-accent-foreground hover:text-accent"
          onClick={() => {
            setSelectedId(row.original.id);
            setOpenModal(true);
          }}
        >
          Verify
        </button>
      ),
    }),
  ];

  const handleVerify = async () => {
    try {
      if (selectedId) {
        await verifyQuotaSubscription(selectedId).unwrap();
        toast.success("Subscription verified.");
      }
    } catch (error) {
      toast.error("Failed to verify subscription.");
    } finally {
      setOpenModal(false);
      setSelectedId(null);
    }
  };

  const table = useReactTable({
    data: sortedData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (isLoading)
    return <p className="text-center text-muted-foreground">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-destructive-foreground">
        Error loading data!
      </p>
    );

  return (
    <div className="container mx-auto p-4">
      <CommonModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title="Are you sure?"
      >
        <div className="flex justify-end gap-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={handleVerify}
          >
            Confirm
          </button>
        </div>
      </CommonModal>
      <div className="flex justify-end mb-4">
        <Select value={timeSort} onValueChange={setTimeSort}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Sort by time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="overflow-x-auto bg-card shadow-md rounded-lg border-l border-r border-border">
        <table className="min-w-full text-sm text-left text-foreground">
          <thead className="bg-primary text-primary-foreground">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 border-b border-border"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="bg-card hover:bg-accent/10">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-2 border-b border-border"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuotaSubscriptionRequestsTable;

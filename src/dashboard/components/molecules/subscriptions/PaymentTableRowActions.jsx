import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ApproveSubscription } from "./ApproveSubscrption";
import { DeclineSubscrption } from "./DeclineSubscrption";
import { DeletePayment } from "./DeletePayment";

export function PaymentTableRowActions({ row }) {
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
                <DropdownMenuItem className="cursor-pointer">
                    <ApproveSubscription row={row} />
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* Decline Subscrption */}
                <DropdownMenuItem className="cursor-pointer">
                    <DeclineSubscrption row={row} />
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* Delete Payment */}
                <DropdownMenuItem className="cursor-pointer">
                    <DeletePayment row={row} />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

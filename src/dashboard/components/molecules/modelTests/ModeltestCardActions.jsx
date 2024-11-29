import { DeleteAction } from '@/components/delete-action';
import IconMenu from '@/components/icon-menu';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, FilePenIcon } from "lucide-react";

export function ModeltestCardActions() {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer absolute top-3 right-[-5px]"
                >
                    <EllipsisVertical className="w-5 h-5" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {/* Edit Model test */}
                <DropdownMenuItem>
                    <button
                        className="w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
                    >
                        <IconMenu
                            text="Edit"
                            icon={<FilePenIcon className="h-4 w-4" />}
                        />
                    </button>
                </DropdownMenuItem>

                {/* Delete model test */}
                <DropdownMenuItem>
                    <DeleteAction
                        // entityId={modelTestId}
                        entityName="Model Test"
                    // deleteFunction={deleteModelTest}
                    // refetch={refetch}
                    />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

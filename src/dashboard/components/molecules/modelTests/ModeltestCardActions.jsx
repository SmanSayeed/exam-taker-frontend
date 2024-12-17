import { DeleteAction } from '@/components/delete-action';
import IconMenu from '@/components/icon-menu';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useDeleteModelTestMutation } from '@/features/modelTests/modelTestApi';
import { EllipsisVertical, Eye, FilePenIcon } from "lucide-react";
import { Link } from 'react-router-dom';

export function ModeltestCardActions({ modelTestId, refetch }) {
    const [deleteModelTest] = useDeleteModelTestMutation();

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
                        entityId={modelTestId}
                        entityName="Model Test"
                        deleteFunction={deleteModelTest}
                        refetch={refetch}
                    />
                </DropdownMenuItem>

                {/* View Exams */}
                <DropdownMenuItem>
                    <Link
                        to={`/admin/model-tests/${modelTestId}/exams`}
                        className="w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
                    >
                        <IconMenu
                            text="View Exams"
                            icon={<Eye className="h-4 w-4" />}
                        />
                    </Link>
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    );
}

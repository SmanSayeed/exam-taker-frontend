import { DeleteAction } from '@/components/delete-action';
import IconMenu from '@/components/icon-menu';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useDeletePackageMutation } from '@/features/packages/packageApi';
import { EllipsisVertical, Eye, FilePenIcon } from "lucide-react";
import { Link } from 'react-router-dom';

export function PackageCardActions({ refetch, singlePackage }) {
    const [deletePackage] = useDeletePackageMutation();

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
                    <Link
                        to={`/admin/package/edit/${singlePackage?.id}`}
                        className="w-full justify-start flex rounded-md p-2 transition-all duration-75"
                        state={{ singlePackage }}
                    >
                        <IconMenu
                            text="Edit"
                            icon={<FilePenIcon className="h-4 w-4" />}
                        />
                    </Link>
                </DropdownMenuItem>

                {/* Delete model test */}
                <DropdownMenuItem>
                    <DeleteAction
                        entityId={singlePackage?.id}
                        entityName="Package"
                        deleteFunction={deletePackage}
                        refetch={refetch}
                    />
                </DropdownMenuItem>

                {/* Edit Model test */}
                <DropdownMenuItem>
                    <Link
                        to={`/admin/package/${singlePackage?.id}/model-tests`}
                        className="w-full justify-start flex rounded-md p-2 transition-all duration-75"
                    >
                        <IconMenu
                            text="View model tests"
                            icon={<Eye className="h-4 w-4" />}
                        />
                    </Link>
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    );
}

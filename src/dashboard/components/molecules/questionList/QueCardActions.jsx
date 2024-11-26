import { CustomDialog } from '@/components/custom-dialog';
import IconMenu from '@/components/icon-menu';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Eye, FilePenIcon } from "lucide-react";
import { useState } from 'react';
import { Link } from "react-router-dom";
import { QueDeleteAction } from './QueDeleteAction';
import QuestionView from './QuestionView';

export function QueCardActions({ refetch, questionData }) {
    const [isViewOpen, setIsViewOpen] = useState(false);

    return (
        <>
            {/* View Question Dialog */}
            <CustomDialog
                isOpen={isViewOpen}
                setIsOpen={setIsViewOpen}
                title="View Question"
            >
                <QuestionView data={questionData} />
            </CustomDialog>

            {/* Actions Dropdown */}
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
                    {/* View Question */}
                    <DropdownMenuItem>
                        <button
                            onClick={() => setIsViewOpen(true)}
                            className="w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
                        >
                            <IconMenu
                                text="View"
                                icon={<Eye className="h-4 w-4" />}
                            />
                        </button>
                    </DropdownMenuItem>

                    {/* Edit Question */}
                    <DropdownMenuItem>
                        <Link
                            state={questionData}
                            className="w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
                            to={`/admin/question/edit/${questionData?.id}`}
                        >
                            <IconMenu
                                text="Edit"
                                icon={<FilePenIcon className="h-4 w-4" />}
                            />
                        </Link>
                    </DropdownMenuItem>

                    {/* Delete Question */}
                    <DropdownMenuItem>
                        <QueDeleteAction questionId={questionData?.id} refetch={refetch} />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}

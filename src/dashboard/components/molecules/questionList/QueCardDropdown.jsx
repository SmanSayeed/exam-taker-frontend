import IconMenu from '@/components/icon-menu';
import { ResponsiveDialog } from '@/components/responsive-dialog';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { useDeleteQuestionMutation } from "@/features/questions/questionsApi";
import { EllipsisVertical, Eye, FilePenIcon, Loader2, Trash2 } from "lucide-react";
import { useState } from 'react';
import { Link } from "react-router-dom";
import { toast } from "sonner";
import QuestionView from './QuestionView';

const QueCardDropdown = ({ refetch, questionData }) => {
    const [isViewOpen, setIsViewOpen] = useState(false);

    const [deleteQuestion, { isLoading }] = useDeleteQuestionMutation();

    const handleDelete = async (id) => {
        if (id) {
            try {
                const response = await deleteQuestion(id).unwrap();
                toast.success(response?.message || "Data deleted successfully");
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || "An error occurred");
            }
        } else {
            toast.error("Cannot delete the data");
        }
    };

    return (
        <>
            <ResponsiveDialog
                isOpen={isViewOpen}
                setIsOpen={setIsViewOpen}
            >
                <QuestionView
                    data={questionData}
                    setIsViewOpen={setIsViewOpen}
                />
            </ResponsiveDialog>

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
                    {/* Quetsion View Action */}
                    <DropdownMenuItem>
                        {/* <QueViewDialogue data={questionData} /> */}
                        <button
                            onClick={() => {
                                setIsViewOpen(true);
                            }}
                            className="w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
                        >
                            <IconMenu
                                text="View"
                                icon={<Eye className="h-4 w-4" />}
                            />
                        </button>
                    </DropdownMenuItem>

                    {/* Edit Action */}
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

                    {/* Delete Action */}
                    <DropdownMenuItem
                        onSelect={() => handleDelete(questionData?.id)}
                        className="text-red-500 flex gap-1 cursor-pointer"
                    >
                        {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <button className="w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-neutral-100">
                                <IconMenu
                                    text="Delete"
                                    icon={<Trash2 className="h-4 w-4" />}
                                />
                            </button>
                        )}
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default QueCardDropdown;
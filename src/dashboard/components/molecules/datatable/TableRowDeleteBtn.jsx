import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteQuestionsCategoryMutation } from "@/features/questions/questionsCategoryApi";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const TableRowDeleteBtn = ({ row, type }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = (event) => {
        event.preventDefault();
        setOpen(true);
    };

    const [deleteQuestionsCategory] = useDeleteQuestionsCategoryMutation();

    const handleDelete = async () => {
        const id = row.original.id;

        if (id) {
            try {
                const response = await deleteQuestionsCategory({ type, id }).unwrap();
                toast.success(response?.message || "Data deleted successfully");
                setOpen(false);
            } catch (err) {
                toast.error(err?.data?.message || "An error occurred");
            }
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild onClick={handleOpen}>
                <span className="flex text-red-600">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                </span>
            </AlertDialogTrigger>
            <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete this data from table?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>
                        <Button onClick={handleDelete}>
                            Confirm
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default TableRowDeleteBtn;
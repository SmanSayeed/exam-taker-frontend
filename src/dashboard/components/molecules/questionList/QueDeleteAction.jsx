import IconMenu from "@/components/icon-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useDeleteQuestionMutation } from "@/features/questions/questionsApi";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function QueDeleteAction({ questionId, refetch }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [deleteQuestion, { isLoading }] = useDeleteQuestionMutation();

    const handleOpen = (event) => {
        event.preventDefault();
        setIsDialogOpen(true);
    };

    const handleDelete = async () => {
        try {
            const response = await deleteQuestion(questionId).unwrap();
            toast.success(response?.message || "Data deleted successfully");
            refetch();
            setIsDialogOpen(false);
        } catch (err) {
            toast.error(err?.data?.message || "An error occurred");
        }
    };

    return (
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger asChild onClick={handleOpen}>
                <button className="w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-neutral-100 text-red-500">
                    <IconMenu
                        text="Delete"
                        icon={<Trash2 className="h-4 w-4" />}
                    />
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the question.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} disabled={isLoading}>
                        {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

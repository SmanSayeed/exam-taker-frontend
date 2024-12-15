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

export function CategoryDelete({ row, type }) {
    const [open, setOpen] = useState(false);

    const handleOpen = (event) => {
        event.preventDefault();
        setOpen(true);
    };

    const [deleteQuestionsCategory] = useDeleteQuestionsCategoryMutation();

    const typeToKeyMap = {
        "sections": "section",
        "exam-types": "exam_type",
        "exam-sub-types": "exam_sub_type",
        "groups": "group",
        "levels": "level",
        "subjects": "subject",
        "lessons": "lesson",
        "topics": "topic",
        "sub-topics": "sub_topic"
    };

    const relatedTypeMap = {
        "sections": ["exam_type"],
        "exam-types": ["exam_sub_type"],
        "groups": ["level", "subject"],
        "levels": ["subject"],
        "subjects": ["lesson"],
        "lessons": ["topic"],
        "topics": ["sub_topic"]
    };

    const handleDelete = async () => {
        const id = row.original.id.toString();

        if (id) {
            try {
                const response = await deleteQuestionsCategory({ type, id }).unwrap();
                toast.success(response?.message || "Data deleted successfully");
                setOpen(false);

                // Get the localStorage key for the current category type
                const localStorageKey = typeToKeyMap[type];

                if (localStorageKey) {
                    const storedValue = localStorage.getItem(localStorageKey);

                    // If the stored value matches the category id, remove it from localStorage
                    if (JSON.parse(storedValue) === id) {
                        localStorage.removeItem(localStorageKey);

                        // Handle related categories that need to be deleted as well
                        const relatedKeys = relatedTypeMap[type] || [];
                        relatedKeys.forEach((key) => {
                            localStorage.removeItem(key);
                        });
                    } else {
                        console.log("No match found. Skipping removal.");
                    }
                }
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
}
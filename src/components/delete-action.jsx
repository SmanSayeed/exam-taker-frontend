import IconMenu from "@/components/icon-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function DeleteAction({ entityId, entityName, deleteFunction, refetch }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleOpen = (event) => {
        event.preventDefault();
        setIsDialogOpen(true);
    };

    const handleDelete = async () => {
        setIsDeleting(true);

        try {
            const response = await deleteFunction(entityId).unwrap();
            toast.success(response?.message || `${entityName} deleted successfully`);
            if (refetch) refetch();
            setIsDialogOpen(false);
        } catch (err) {
            toast.error(err?.data?.message || `Failed to delete ${entityName}`);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger asChild onClick={handleOpen}>
                <button className="w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-neutral-100 text-red-500">
                    <IconMenu
                        text={`Delete`}
                        icon={<Trash2 className="h-4 w-4" />}
                    />
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the {entityName}.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                        {isDeleting ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : `Delete ${entityName}`}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

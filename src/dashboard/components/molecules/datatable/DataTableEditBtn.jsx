import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";
import { useState } from "react";

const DataTableEditBtn = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = (event) => {
        event.preventDefault();

        setOpen(true);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild onClick={handleOpen}>
                <span className="flex">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                </span>
            </DialogTrigger>
            <DialogContent
                onClick={(e) => e.stopPropagation()}
                className="max-w-[85%] sm:max-w-[70%]"
            >
                <DialogHeader>
                    <DialogTitle>Edit question&apos;s category</DialogTitle>
                    <DialogDescription>
                        Make changes to your categories here. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            defaultValue="Pedro Duarte"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input
                            id="username"
                            defaultValue="@peduarte"
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DataTableEditBtn

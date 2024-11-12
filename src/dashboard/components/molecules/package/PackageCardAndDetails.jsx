import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useDeletePackageMutation } from "@/features/packages/packagesApi";
import DOMPurify from "dompurify";
import { useState } from "react";
import { toast } from "sonner";
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
import { Link } from "react-router-dom";

// Helper function to parse HTML string and convert to JSX with Tailwind classes
const parseHtmlContent = (htmlContent) => {
    return (
        <div
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(htmlContent),
            }}
        />
    );
};

const PackageCardAndDetails = ({ aPackage }) => {
    const { id, name, description, price, duration_days, is_active } = aPackage || {};

    const [open, setOpen] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);

    const handleOpen = (event) => {
        event.preventDefault();
        setOpen(true);
    };

    const handleOpenDetails = (event) => {
        event.preventDefault();
        setOpenDetails(true);
    };

    // Helper function to calculate months and days with proper pluralization
    const calculateValidityInMonths = (days) => {
        const daysInMonth = 30;
        const months = Math.floor(days / daysInMonth);
        const remainingDays = days % daysInMonth;

        const monthText = months === 1 ? "month" : "months";
        const dayText = remainingDays === 1 ? "day" : "days";

        if (months > 0 && remainingDays > 0) {
            return `${months} ${monthText} and ${remainingDays} ${dayText}`;
        } else if (months > 0) {
            return `${months} ${monthText}`;
        } else if (remainingDays > 0) {
            return `${remainingDays} ${dayText}`;
        } else {
            return null; // No duration
        }
    };

    // Get the validity in months
    const validity = duration_days ? calculateValidityInMonths(duration_days) : null;

    const [deletePackage, { error }] = useDeletePackageMutation();
    const handleDelete = async (id) => {
        if (id) {
            try {
                const response = await deletePackage(id).unwrap();
                toast.success(response?.message || "Data deleted successfully");
            } catch (err) {
                toast.error(err?.data?.message || "An error occurred");
            }
        } else {
            toast.error("Cannot Delete the Data");
        }
    };

    return (
        <Card className="hover:shadow-md transform transition-transform hover:-translate-y-1.5 duration-300 relative">

            <div onClick={handleOpenDetails} className="cursor-pointer p-4 pb-20 ">
                <p className="absolute top-2 right-3 text-sm font-semibold ">{is_active === 1 ? "Activated" : "Inactive"} </p>
                <h1 className="text-4xl mt-6 font-semibold ">
                    ${price}
                    {validity && <span className="text-base">/{validity}</span>}
                </h1>

                <h2 className="text-xl font-semibold mt-4">{parseHtmlContent(name)}</h2>
                <p className="mt-2 mb-5 text-sm">{parseHtmlContent(description)}</p>
            </div>

            
            <Link to={`/admin/package/edit/${id}`} state={{aPackage}} >
                <Button className="absolute bottom-4 right-4">Edit</Button>
            </Link>

            {/* Delete confirmation dialog */}
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger onClick={handleOpen}>
                    <Button className="absolute bottom-4 left-4">Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure to delete this package? <br />This action will remove the package and its benefits from your account.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>
                            <Button onClick={() => handleDelete(id)}>Yes</Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Package details dialog */}
            <AlertDialog open={openDetails} onOpenChange={setOpenDetails}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Package Details</AlertDialogTitle>
                        <AlertDialogDescription>
                            <strong>Package Name: </strong>{parseHtmlContent(name)}<br />
                            <strong>Description: </strong>{parseHtmlContent(description)}<br />
                            <strong>Price: </strong>${price} / {validity}<br />
                            <strong>Status: </strong>{is_active === 1 ? "Active" : "Inactive"}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                            <Button onClick={() => setOpenDetails(false)} >  Close </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Card>
    );
};

export default PackageCardAndDetails;
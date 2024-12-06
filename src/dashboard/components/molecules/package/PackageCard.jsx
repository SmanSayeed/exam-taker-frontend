import { CustomDialog } from "@/components/custom-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useChangePackageStatusMutation } from "@/features/packages/packageApi";
import DOMPurify from "dompurify";
import { useState } from "react";
import { toast } from "sonner";
import { PackageCardActions } from "./PackageCardActions";

const parseHtmlContent = (htmlContent) => {
    return (
        <div
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(htmlContent),
            }}
        />
    );
};

const PackageCard = ({ singlePackage, refetch }) => {
    const { id: packageId, name, description, price, duration_days, is_active } = singlePackage || {};

    const [openDetails, setOpenDetails] = useState(false);
    const [isActive, setIsActive] = useState(is_active);

    const [changePackageStatus, { isLoading }] = useChangePackageStatusMutation();

    const handleOpenDetails = (event) => {
        event.preventDefault();
        setOpenDetails(true);
    };

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
    const validity = duration_days ? calculateValidityInMonths(duration_days) : null;

    const handleChangeStatus = async () => {
        try {
            const updatedStatus = !isActive;

            const response = await changePackageStatus({
                id: packageId,
                data: { "is_active": updatedStatus ? 1 : 0 },
            }).unwrap();

            setIsActive(updatedStatus);

            toast.success(`Package status updated to ${updatedStatus ? "Active" : "Inactive"}` || response?.message);
        } catch (error) {
            // Revert to the previous state in case of an error
            setIsActive(isActive);

            toast.error(error?.data?.message || "Failed to update package status. Please try again.");
        }
    };

    return (
        <>
            {/* View Package details dialog */}
            <CustomDialog
                isOpen={openDetails}
                setIsOpen={setOpenDetails}
                title="View Package Details"
            >
                <div className="relative p-4 space-y-4">
                    <div className="space-y-2 mb-4">
                        <div>
                            <strong>Package Name: </strong>
                            {parseHtmlContent(name)}
                        </div>
                        <div>
                            <strong>Description: </strong>
                            {parseHtmlContent(description)}
                        </div>
                        <div>
                            <strong>Price: </strong>${price} / {validity}
                        </div>
                        <div>
                            <strong>Status: </strong>
                            {isActive ? "Active" : "Inactive"}
                        </div>
                    </div>
                    <Button
                        onClick={() => setOpenDetails(false)}
                        className="absolute bottom-0 right-2"
                    >
                        Close
                    </Button>
                </div>
            </CustomDialog>

            <Card className="hover:shadow-md duration-300 relative">
                <div onClick={handleOpenDetails} className="cursor-pointer p-4 pb-20">
                    <h1 className="text-4xl mt-6 font-semibold">
                        ${price}
                        {validity && <span className="text-base">/{validity}</span>}
                    </h1>

                    <h2 className="text-xl font-semibold mt-4">{parseHtmlContent(name)}</h2>
                    <p className="mt-2 mb-5 text-sm">{parseHtmlContent(description)}</p>
                </div>

                <PackageCardActions
                    singlePackage={singlePackage}
                    refetch={refetch}
                />

                <div className="flex items-center space-x-2 text-end p-4">
                    <Label htmlFor={`status-switch-${packageId}`}>Change Status</Label>
                    <Switch
                        id={`status-switch-${packageId}`}
                        checked={isActive}
                        onCheckedChange={handleChangeStatus}
                        disabled={isLoading}
                    />
                </div>
            </Card>
        </>
    );
};

export default PackageCard;

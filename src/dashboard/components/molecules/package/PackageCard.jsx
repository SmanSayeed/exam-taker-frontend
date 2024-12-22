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

export const PackageCard = ({ singlePackage, refetch }) => {
    const {
        id: packageId,
        name,
        description,
        price,
        duration_days,
        img,
        is_active,
        discount,
        discount_type,
    } = singlePackage || {};

    // const [openDetails, setOpenDetails] = useState(false);
    const [isActive, setIsActive] = useState(is_active);

    const [changePackageStatus, { isLoading }] = useChangePackageStatusMutation();

    // const handleOpenDetails = (event) => {
    //     event.preventDefault();
    //     setOpenDetails(true);
    // };

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

    const baseURL = "https://loopsexam.xyz";
    const imageURL = img && `${baseURL}${img}`;

    const validity = duration_days ? calculateValidityInMonths(duration_days) : null;

    const discountedPrice =
        discount && discount_type === "percentage"
            ? price - price * (discount / 100)
            : discount && discount_type === "amount"
                ? price - discount
                : price;

    const handleChangeStatus = async () => {
        try {
            const updatedStatus = !isActive;

            const response = await changePackageStatus({
                id: packageId,
                data: { is_active: updatedStatus ? 1 : 0 },
            }).unwrap();

            setIsActive(updatedStatus);

            toast.success(`Package status updated to ${updatedStatus ? "Active" : "Inactive"}` || response?.message);
        } catch (error) {
            setIsActive(isActive);
            toast.error(error?.data?.message || "Failed to update package status. Please try again.");
        }
    };

    return (
        <>
            {/* View Package details dialog */}
            {/* <CustomDialog
                isOpen={openDetails}
                setIsOpen={setOpenDetails}
                title="View Package Details"
            >
                <div className="relative p-4 space-y-4">
                    <div className="space-y-2 mb-4">
                        {img && (
                            <div>
                                <strong>Image: </strong>
                                <img src={img} alt="Package" className="w-full h-auto rounded-md" />
                            </div>
                        )}
                        <div>
                            <strong>Package Name: </strong>
                            {parseHtmlContent(name)}
                        </div>
                        <div>
                            <strong>Description: </strong>
                            {parseHtmlContent(description)}
                        </div>
                        <div>
                            <strong>Price: </strong>
                            ৳{discountedPrice}{" "}
                            {discount && (
                                <span className="line-through text-gray-500">৳{price}</span>
                            )}
                            / {validity}
                        </div>
                        <div>
                            <strong>Status: </strong>
                            {isActive ? "Active" : "Inactive"}
                        </div>
                    </div>
                </div>
            </CustomDialog> */}

            <Card className="hover:shadow-md duration-300 relative">
                {/* onClick={handleOpenDetails} */}
                <div className="p-4">
                    <div className="mx-3 rounded-md mb-4">
                        {img ? (
                            <img
                                src={imageURL}
                                alt="Package"
                                className="w-full h-40"
                            />
                        ) : (
                            <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500">
                                No Image
                            </div>
                        )}
                    </div>

                    <h1 className="text-4xl mt-6 font-semibold">
                        {discountedPrice}
                        {discount && (
                            <span className="text-base line-through text-gray-500 ml-2">৳{price}</span>
                        )}
                        {validity && <span className="text-base"> / {validity}</span>}
                    </h1>

                    <h2 className="text-xl font-semibold mt-4">{parseHtmlContent(name)}</h2>
                    <p className="mt-2 mb-5 text-sm">{parseHtmlContent(description)}</p>
                </div>

                <PackageCardActions
                    singlePackage={singlePackage}
                    refetch={refetch}
                />

                <div className="flex items-center space-x-2 text-end p-4">
                    <Label htmlFor={`status-switch-৳{packageId}`}>Change Status</Label>
                    <Switch
                        id={`status-switch-৳{packageId}`}
                        checked={isActive}
                        onCheckedChange={handleChangeStatus}
                        disabled={isLoading}
                    />
                </div>
            </Card>
        </>
    );
};


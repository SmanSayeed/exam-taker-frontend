import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useChangeModelTestStatusMutation } from "@/features/modelTests/modelTestApi";
import { parseHtmlContent } from "@/utils/parseHtmlContent";
import { useState } from "react";
import { toast } from "sonner";
import { ModeltestCardActions } from "./ModeltestCardActions";

const ModelTestCard = ({ modelTest }) => {
    console.log("modeltest", modelTest)
    const [isActive, setIsActive] = useState(modelTest?.is_active);
    const [changeModelTestStatus, { isLoading }] = useChangeModelTestStatusMutation();

    const handleChangeStatus = async () => {
        try {
            const updatedStatus = !isActive;

            const response = await changeModelTestStatus({
                id: modelTest?.id,
                data: { is_active: updatedStatus ? 1 : 0 },
            }).unwrap();

            setIsActive(updatedStatus);

            toast.success(`Model Test status updated to ${updatedStatus ? "Active" : "Inactive"}.` || response?.message);

        } catch (error) {
            // Revert local state if the API call fails
            setIsActive(isActive);

            toast.error("Failed to update Model Test status. Please try again.");
        }
    };

    return (
        <Card className="py-4 relative group shadow-md hover:shadow-lg duration-500">
            <CardHeader>
                <CardTitle className="text-xl font-semibold">
                    {parseHtmlContent(modelTest?.title)}
                </CardTitle>
                <CardDescription>
                    {parseHtmlContent(modelTest?.description)}
                </CardDescription>
            </CardHeader>

            <ModeltestCardActions />

            <div className="flex items-center justify-end space-x-2 mt-4 p-4">
                <Label htmlFor={`status-switch-${modelTest?.id}`}>Change Status</Label>
                <Switch
                    id={`status-switch-${modelTest?.id}`}
                    checked={isActive}
                    onCheckedChange={handleChangeStatus}
                    disabled={isLoading}
                />
            </div>
        </Card>
    )
}

export default ModelTestCard;
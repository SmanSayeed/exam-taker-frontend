import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const StudentDetails = ({ studentData }) => {

    return (
        <Card>
            <CardHeader>
                <CardTitle>Student Details</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-medium">{studentData?.data?.name}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{studentData?.data?.email}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{studentData?.data?.phone}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
};

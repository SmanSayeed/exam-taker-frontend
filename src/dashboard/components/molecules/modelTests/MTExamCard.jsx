import { Card } from "@/components/ui/card";

export default function MTExamCard({ exam }) {

    return (
        <Card
            className="container py-2"
        >
            <h3 className="text-xl font-semibold">{exam.title}</h3>
            <p className="text-gray-600">{exam.description}</p>
            <div className="mt-2 flex justify-between items-center">
                <span
                    className={`text-sm font-medium ${exam.is_active ? "text-green-500" : "text-red-500"
                        }`}
                >
                    {exam.is_active ? "Active" : "Inactive"}
                </span>
            </div>
        </Card>
    );
}

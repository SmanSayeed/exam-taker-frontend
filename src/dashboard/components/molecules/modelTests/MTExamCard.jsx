import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function MTExamCard({ exam }) {

    return (
        <Card className="container py-4 px-6 shadow-md">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">{exam.title}</h3>
                {/* <Switch
                    checked={isActive}
                    onChange={handleToggle}
                    className={isActive ? "bg-green-500" : "bg-red-500"}
                /> */}
            </div>
            <p className="text-gray-600 mt-2">{exam.description}</p>

            <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                    <p className="text-sm">
                        <strong>Type:</strong> {exam.type.toUpperCase()}
                    </p>
                    <p className="text-sm">
                        <strong>Paid:</strong> {exam.is_paid ? "Yes" : "No"}
                    </p>
                    <p className="text-sm">
                        <strong>Time Limit:</strong> {exam.time_limit} mins
                    </p>
                </div>
                <div>
                    <p className="text-sm">
                        <strong>Start:</strong> {new Date(exam.start_time).toLocaleString()}
                    </p>
                    <p className="text-sm">
                        <strong>End:</strong> {new Date(exam.end_time).toLocaleString()}
                    </p>
                    <p className="text-sm">
                        <strong>Negative Marking:</strong> {exam.is_negative_mark_applicable ? "Yes" : "No"}
                    </p>
                </div>
                <div className="col-span-2 border-t border-gray-200 mt-4 pt-4 ">
                    <Link className="text-blue-500" to={`/admin/model-tests/${exam.model_test_id}/exams/${exam.id}/submissions`}>
                        View submissions
                    </Link>
                </div>
            </div>

            {/* edit and delete actions */}
            {/* <div className="mt-4 flex justify-between items-center">
                <Button
                    onClick={() => onEdit(exam.id)}
                    variant="secondary"
                    size="sm"
                    className="text-blue-500"
                >
                    Edit
                </Button>
                <Button
                    onClick={() => onDelete(exam.id)}
                    variant="danger"
                    size="sm"
                    className="text-red-500"
                >
                    Delete
                </Button>
            </div> */}
        </Card>
    );
}

import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { useDeleteQuestionMutation } from "@/features/questions/questionsApi";
import { parseHtmlContent } from "@/utils/parseHtmlContent";
import { Delete, DeleteIcon, Eye, FilePenIcon, SquareX, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ViewModal } from "./ViewModal";

export default function QuestionCard({ data: questionData }) {
    const { id, title, description, mcq_questions, is_paid, is_featured, type, mark } =
        questionData || {};

    console.log("questionData", questionData)

    const [deleteQuestion, { error }] = useDeleteQuestionMutation();

    const handleDelete = async (id) => {
        if (id) {
            try {
                const response = await deleteQuestion(id).unwrap();
                toast.success(response?.message || "Data deleted successfully");
            } catch (err) {
                toast.error(err?.data?.message || "An error occurred");
            }
        } else {
            toast.error("Cannot Delete the Data");
        }
    };

    return (
        <Card className="p-4 pr-10 relative group shadow-md my3 hover:shadow-lg duration-500">
            <CardTitle>
                <p className="mb-4 text-lg dark:text-white ">
                    {parseHtmlContent(title)}
                </p>
            </CardTitle>

            

            <div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
                    {
                        mcq_questions?.map((option, index) => <li key={option.id} className="flex items-center gap-3 border rounded-sm p-2 " >
                            <p className="h-8 w-8 flex items-center justify-center border rounded-full" >{index + 1}</p>
                            <p>
                                {parseHtmlContent(option.mcq_question_text)}
                            </p>
                        </li>)
                    }
                </ul>
            </div>

            {/* <div className="text-xs flex flex-col gap-0.5">
                <p>Que ID: {id}</p>
                <p className="pl-2 capitalize ">
                    {is_paid === 0 ? "not paid" : "paid"}
                </p>
                <p className="pl-2">{mark} Marks </p>
                <p className="pl-2 capitalize ">
                    {is_featured === 0 ? "not featured" : "featured"}
                </p>
                <p className="pl-2"> <span className={`${type === "mcq" ? "uppercase" : "capitalize"}`} > {type}  </span>Question</p>
            </div> */}

            {/* <div className="text-sm">
                <div id="section">
                    <p>
                        <span className="font-medium">Section:</span> &rarr; exam-type
                        &rarr; exam sub-type
                    </p>
                </div>
                <div id="group">
                    <p>
                        <span className="font-medium"> Group: </span> &rarr; level &rarr;
                        subject &rarr; exam topic &rarr; exam sub-topic
                    </p>
                </div>
            </div> */}

            {/* <div className="mt-4 flex gap-2 items-center text-sm ">
                <span className="font-medium ">
                    Descriptions:
                </span>
                {parseHtmlContent(description)}
            </div> */}

            <Trash2
                onClick={() => handleDelete(id)}
                size={18}
                className="cursor-pointer absolute top-3 right-3 opacity-50 group-hover:scale-105 group-hover:opacity-100 duration-300"
            />

            <div className="absolute bottom-3 right-3 flex flex-col items-center gap-4">
                <button>
                    <ViewModal data={questionData} />
                </button>

                <Link state={questionData} to={`/admin/question/edit/${id}`}>
                    <FilePenIcon size={18} />
                </Link>
            </div>
        </Card>
    );
}
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { useDeleteQuestionMutation } from "@/features/questions/questionsApi";
import DOMPurify from "dompurify";
import { SquareX } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ViewModal } from "./ViewModal";

export default function QuestionCard({ data }) {
    const { id, title, description, is_paid, is_featured, type, mark } = data || {};

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
            console.log("tmr id nai miya")
            toast.error("tmr id nai miya");
        }
    };


    // Function to add Tailwind classes to specific elements
    const addTailwindClasses = (htmlContent) => {
        const div = document.createElement("div");
        div.innerHTML = htmlContent;

        // Example: Add classes to specific elements
        const paragraphs = div.querySelectorAll("p");
        paragraphs.forEach((p) => {
            p.classList.add("text-3xl", "mb-5", "text-sm");
        });

        const headings = div.querySelectorAll("h1, h2, h3");
        headings.forEach((heading) => {
            heading.classList.add("capitalize", "text-2xl", "mb-3", "font-semibold");
        });

        const lists = div.querySelectorAll("ul, ol");
        lists.forEach((list) => {
            list.classList.add("list-disc", "list-inside", "ml-4");
        });

        return div.innerHTML;
    };
    // Sanitize and style the title HTML
    const sanitizedTitle = DOMPurify.sanitize(addTailwindClasses(title));
    // Sanitize and style the description HTML
    const sanitizedDescription = DOMPurify.sanitize(addTailwindClasses(description));


    return (
        <Card className="p-4 relative group shadow-md my-3 hover:shadow-lg duration-500">
            <CardTitle>
                <span
                    className="description-content"
                    dangerouslySetInnerHTML={{ __html: sanitizedTitle }}
                ></span>
            </CardTitle>

            <div className="m1-2 text-xs text-gray-500 flex items-center gap-3">
                <p>Que ID: {id}</p>
                <p className="border-l pl-2">{is_paid === 0 ? "not paid" : "paid"}</p>
                <p className="border-l pl-2">{is_featured === 0 ? "not featured" : "featured"}</p>
                <p className="border-l pl-2">{type} question</p>
                <p className="border-l pl-2">{mark} marks </p>

            </div>

            <div className="my-2 text-sm text-gray-500">
                <div id="section">
                    <p><span className="font-medium">Section:</span>  &rarr; exam-type &rarr; exam sub-type</p>
                </div>
                <div id="group">
                    <p><span className="font-medium"> Group: </span> &rarr; level &rarr; subject &rarr; exam topic &rarr; exam sub-topic</p>
                </div>
            </div>

            <div className="flex gap-2">
                <span className="font-medium text-sm text-gray-500 ">Descriptions:</span>
                <div
                    className="description-content"
                    dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
                ></div>
            </div>

            {/* Card controllers */}
            <SquareX
                onClick={() => handleDelete(id)}
                size={18}
                className="cursor-pointer absolute top-4 right-4 opacity-45 group-hover:scale-105 group-hover:opacity-85 duration-300"
            />

            <div className="absolute bottom-4 right-4 flex items-center gap-3">
                <Button>
                    <ViewModal data={data} />
                </Button>
                <Button>
                    <Link state={(data)} to={`/admin/question/edit/${id}`}>
                        Edit
                    </Link>
                </Button>
            </div>
        </Card>
    );
}
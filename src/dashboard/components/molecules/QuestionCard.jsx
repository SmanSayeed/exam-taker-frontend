import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { SquareX } from "lucide-react";
import { ViewModal } from "./ViewModal";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { useDeleteQuestionMutation } from "@/features/questions/questionApi";
import { toast } from "sonner";

export default function QuestionCard({ data }) {
    const { id, title, description, is_paid, is_featured, type } = data || {};

    const [deleteQuestion, { error }] = useDeleteQuestionMutation();

    const handleDelete = async () => {
        // const id = id;
        if (id) {
            try {
                const response = await deleteQuestion({ type, id }).unwrap();
                toast.success(response?.message || "Data deleted successfully");
            } catch (err) {
                toast.error(err?.data?.message || "An error occurred");
            }
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

        const headings = div.querySelectorAll("h2, h3");
        headings.forEach((heading) => {
            heading.classList.add("capitalize", "text-2xl", "text-red-500", "font-semibold", "mt-4");
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
        <Card className="p-3 relative group shadow-md my-3 hover:shadow-lg duration-500">
            <CardTitle>
                <span
                    className="description-content"
                    dangerouslySetInnerHTML={{ __html: sanitizedTitle }}
                ></span>
            </CardTitle>

            <div className="my-2 text-xs text-gray-500 flex items-center gap-3">
                <p>Que ID: {id}</p>
                <p className="border-l pl-2">{is_paid === 0 ? "not paid" : "paid"}</p>
                <p className="border-l pl-2">{is_featured === 0 ? "not featured" : "featured"}</p>
                <p className="border-l pl-2">{type}</p>
            </div>

            <div className="mt-3 text-sm text-gray-500">
                <div id="section">
                    <p>Section &rarr; exam-type &rarr; exam sub-type</p>
                </div>
                <div id="group">
                    <p>Group &rarr; level &rarr; subject &rarr; exam topic &rarr; exam sub-topic</p>
                </div>
            </div>

            <div
                className="description-content"
                dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            ></div>

            {/* Card controllers */}
            <SquareX
                onClick={handleDelete}
                size={18}
                className="cursor-pointer absolute top-2 right-2 opacity-45 group-hover:scale-105 group-hover:opacity-85 duration-300"
            />

            <div className="absolute bottom-2 right-2 flex items-center gap-3">
                <ViewModal data={"data"} />
                <Link to={`/admin/question/edit/${id}`}>
                    <Button>Edit</Button>
                </Link>
            </div>
        </Card>
    );
}
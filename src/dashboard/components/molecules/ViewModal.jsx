import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Link } from "react-router-dom"
import DOMPurify from "dompurify";


export function ViewModal({ data }) {
    const { id, title, description, is_paid, is_featured, type, mark } = data || {};


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
            heading.classList.add("capitalize", "text-2xl", "mb-1", "font-semibold");
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
        <Dialog>
            <DialogTrigger asChild>
                <Link variant="outline">View</Link>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[60%] ">
                <DialogHeader>
                    <DialogTitle>
                        <p
                            className="description-content"
                            dangerouslySetInnerHTML={{ __html: sanitizedTitle }}
                        ></p>
                    </DialogTitle>


                    <div className="mb-20 text-xs text-gray-500 flex items-center gap-3">
                        <p>Que ID: {id}</p>
                        <p className="border-l pl-2">{is_paid === 0 ? "not paid" : "paid"}</p>
                        <p className="border-l pl-2">{is_featured === 0 ? "not featured" : "featured"}</p>
                        <p className="border-l pl-2">{type} question</p>
                        <p className="border-l pl-2">{mark} Marks </p>
                    </div>

                    <div className="text-sm text-gray-500 my-20 ">
                        <div id="section" className="mt-1">
                            <p><span className="font-medium">Section:</span>  &rarr; exam-type &rarr; exam sub-type</p>
                        </div>
                        <div id="group" className="mb-2">
                            <p> <span className="font-medium"> Group: </span> &rarr; level &rarr; subject &rarr; exam topic &rarr; exam sub-topic</p>
                        </div>
                    </div>

                    <DialogDescription className="flex gap-2">
                        <span className="font-medium">Description:</span>
                        <div
                            className="description-content "
                            dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
                        ></div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
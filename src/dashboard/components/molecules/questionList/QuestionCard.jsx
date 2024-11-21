import { Card, CardTitle } from "@/components/ui/card";
import { parseHtmlContent } from "@/utils/parseHtmlContent";

import QueCardDropdown from "./QueCardDropdown";

export default function QuestionCard({ data: questionData, refetch }) {
    const { id, title, mcq_questions } = questionData || {};

    return (
        <Card className="py-4 pl-4 pr-8 relative group shadow-md my-3 hover:shadow-lg duration-500">
            <span className="text-xs font-semibold absolute top-0 left-0 px-2 py-0 rounded-br bg-gray-400 text-primary-foreground">
                #{id}
            </span>
            <CardTitle>
                <p className="my-4 text-lg dark:text-white">
                    {parseHtmlContent(title)}
                </p>
            </CardTitle>

            <div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {mcq_questions?.map((option, index) => (
                        <li key={option.id} className="flex items-center gap-3 border rounded-sm p-2">
                            <p className="h-8 w-8 flex items-center justify-center border rounded-full">
                                {index + 1}
                            </p>
                            <p>{parseHtmlContent(option.mcq_question_text)}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <QueCardDropdown
                refetch={refetch}
                questionData={questionData}
            />
        </Card>
    );
}






// import { Card, CardTitle } from "@/components/ui/card";
// import { useDeleteQuestionMutation } from "@/features/questions/questionsApi";
// import { parseHtmlContent } from "@/utils/parseHtmlContent";
// import { EllipsisVertical, FilePenIcon, Loader2, Trash2 } from "lucide-react";
// import { Link } from "react-router-dom";
// import { toast } from "sonner";
// import { ViewModal } from "./ViewModal";

// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger
// } from "@/components/ui/dropdown-menu";

// export default function QuestionCard({ data: questionData, refetch }) {
//     const { id, title, description, mcq_questions, is_paid, is_featured, type, mark } =
//         questionData || {};

//     const [deleteQuestion, { isLoading }] = useDeleteQuestionMutation();

//     const handleDelete = async (id) => {
//         if (id) {
//             try {
//                 const response = await deleteQuestion(id).unwrap();
//                 toast.success(response?.message || "Data deleted successfully");
//                 refetch();
//             } catch (err) {
//                 toast.error(err?.data?.message || "An error occurred");
//             }
//         } else {
//             toast.error("Cannot Delete the Data");
//         }
//     };

//     return (
//         <Card className="p-4 pr-10 relative group shadow-md my3 hover:shadow-lg duration-500">
//             <span className="text-xs font-semibold absolute top-0 left-0 px-2 py-0 rounded-br bg-gray-400 text-primary-foreground ">
//                 #{id}
//             </span>
//             <CardTitle>
//                 <p className="mb-4 text-lg dark:text-white ">
//                     {parseHtmlContent(title)}
//                 </p>
//             </CardTitle>

//             <div>
//                 <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
//                     {
//                         mcq_questions?.map((option, index) => <li key={option.id} className="flex items-center gap-3 border rounded-sm p-2 " >
//                             <p className="h-8 w-8 flex items-center justify-center border rounded-full" >{index + 1}</p>
//                             <p>
//                                 {parseHtmlContent(option.mcq_question_text)}
//                             </p>
//                         </li>)
//                     }
//                 </ul>
//             </div>

//             <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                     <Button variant="ghost" size="icon">
//                         <MoreHorizontal className="w-4 h-4" />
//                     </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                     <DropdownMenuItem onSelect={() => console.log("Edit clicked")}>
//                         Edit
//                     </DropdownMenuItem>
//                     <DropdownMenuItem onSelect={() => console.log("View clicked")}>
//                         View
//                     </DropdownMenuItem>
//                     <DropdownMenuItem onSelect={() => console.log("Delete clicked")} className="text-red-500">
//                         Delete
//                     </DropdownMenuItem>
//                 </DropdownMenuContent>

//                 <EllipsisVertical
//                     className="cursor-pointer absolute top-3 right-3 opacity-50 group-hover:scale-105 group-hover:opacity-100 duration-300"
//                 />

//                 {
//                     isLoading ? (
//                         <Loader2 className="mr-2 h-4 w-4 animate-spin absolute top-3 right-3" />
//                     ) : (
//                         <Trash2
//                             onClick={() => handleDelete(id)}
//                             size={18}
//                             className="cursor-pointer absolute top-10 right-3 opacity-50 group-hover:scale-105 group-hover:opacity-100 duration-300"
//                         />
//                     )
//                 }

//                 <div className="absolute bottom-3 right-3 flex flex-col items-center gap-4">
//                     <button>
//                         <ViewModal data={questionData} />
//                     </button>

//                     <Link state={questionData} to={`/admin/question/edit/${id}`}>
//                         <FilePenIcon size={18} />
//                     </Link>
//                 </div>
//         </Card>
//     );
// }


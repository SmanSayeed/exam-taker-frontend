// import { Label } from "@/components/ui/label";
// import { useState } from "react";
// import { Controller } from "react-hook-form";

// import { Check, ChevronsUpDown, CircleX } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//     Command,
//     CommandEmpty,
//     CommandGroup,
//     CommandInput,
//     CommandItem,
//     CommandList,
// } from "@/components/ui/command";
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover";
// import { useGetQuestionsCategoryQuery } from "@/features/questions/questionsCategoryApi";
// import { cn } from "@/lib/utils";

// const TagsField = ({ control, tags, setTags }) => {
//     const [popoverOpen, setPopoverOpen] = useState(false);
//     const { data: tagsData } = useGetQuestionsCategoryQuery("tags");

//     const handleAddTag = (tag) => {
//         if (!tags.find((t) => t.id === tag.id)) {
//             setTags([...tags, tag]);
//         }
//     };

//     const handleRemoveTag = (tagIdToRemove) => {
//         setTags(tags.filter((tag) => tag.id !== tagIdToRemove));
//     };

//     return (
//         <div className="space-y-1">
//             <Label htmlFor="tags" className="text-md font-bold">
//                 Tags
//             </Label>

//             <Controller
//                 name="tag"
//                 control={control}
//                 defaultValue=""
//                 render={({ field, formState: { errors } }) => (
//                     <>
//                         <div className="flex items-center gap-2">
//                             <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
//                                 <PopoverTrigger asChild>
//                                     <Button
//                                         variant="outline"
//                                         role="combobox"
//                                         aria-expanded={popoverOpen}
//                                         className="w-1/2 justify-between"
//                                     >
//                                         {tags.length > 0
//                                             ? `Selected Tags (${tags.length})`
//                                             : "Select Tags"}
//                                         <ChevronsUpDown className="opacity-50" />
//                                     </Button>
//                                 </PopoverTrigger>
//                                 <PopoverContent className="w-[200px] p-0">
//                                     <Command>
//                                         <CommandInput placeholder="Search tags..." />
//                                         <CommandList>
//                                             <CommandEmpty>No tags found.</CommandEmpty>
//                                             <CommandGroup>
//                                                 {tagsData?.data?.data &&
//                                                     tagsData?.data?.data.map((tag) => (
//                                                         <CommandItem
//                                                             key={tag?.id}
//                                                             value={tag?.id}
//                                                             onSelect={() => {
//                                                                 field.onChange(tag?.id);
//                                                                 handleAddTag({ id: tag.id, title: tag.title });
//                                                                 setPopoverOpen(false);
//                                                             }}
//                                                         >
//                                                             {tag.title}
//                                                             <Check
//                                                                 className={cn(
//                                                                     "ml-auto",
//                                                                     tags.find((t) => t.id === tag.id)
//                                                                         ? "opacity-100"
//                                                                         : "opacity-0"
//                                                                 )}
//                                                             />
//                                                         </CommandItem>
//                                                     ))}
//                                             </CommandGroup>
//                                         </CommandList>
//                                     </Command>
//                                 </PopoverContent>
//                             </Popover>
//                         </div>

//                         {errors.tag && <span className="text-red-600">{errors.tag.message}</span>}
//                     </>
//                 )}
//             />

//             {/* Display Added Tags */}
//             <div className="flex flex-wrap gap-2 pt-2">
//                 {tags &&
//                     tags.map((tag, index) => (
//                         <span
//                             key={index}
//                             className="flex items-center space-x-2 bg-gray-200 text-gray-800 px-3 py-1 rounded-full"
//                         >
//                             <span className="text-sm">{tag.title}</span>
//                             <button
//                                 type="button"
//                                 className="text-red-500"
//                                 onClick={() => handleRemoveTag(tag.id)}
//                             >
//                                 <CircleX size={18} />
//                             </button>
//                         </span>
//                     ))}
//             </div>
//         </div>
//     );
// };

// export default TagsField;







import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useGetQuestionsCategoryQuery } from "@/features/questions/questionsCategoryApi";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

const TagsField = ({ control, tags, setTags, existingTags }) => {
    const [popoverOpen, setPopoverOpen] = useState(false);
    const { data: tagsData } = useGetQuestionsCategoryQuery("tags");

    // Initialize existing tags
    useEffect(() => {
        if (existingTags) {
            const parsedTags = existingTags
                .split(",")
                .map((id) => tagsData?.data?.data.find((tag) => tag.id === parseInt(id)))
                .filter((tag) => tag);
            setTags(parsedTags);
        }
    }, [existingTags, tagsData?.data, setTags]);

    const handleAddTag = (tag) => {
        if (!tags.find((t) => t.id === tag.id)) {
            setTags([...tags, tag]);
        }
    };

    const handleRemoveTag = (tagIdToRemove) => {
        setTags(tags.filter((tag) => tag.id !== tagIdToRemove));
    };

    return (
        <div className="space-y-1">
            <Label htmlFor="tags" className="text-md font-bold">
                Tags
            </Label>

            <Controller
                name="tag"
                control={control}
                defaultValue=""
                render={({ field, formState: { errors } }) => (
                    <>
                        <div className="flex items-center gap-2">
                            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={popoverOpen}
                                        className="w-1/2 justify-between"
                                    >
                                        {tags.length > 0
                                            ? `Selected Tags (${tags.length})`
                                            : "Select Tags"}
                                        <ChevronsUpDown className="opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search tags..." />
                                        <CommandList>
                                            <CommandEmpty>No tags found.</CommandEmpty>
                                            <CommandGroup>
                                                {tagsData?.data?.data &&
                                                    tagsData?.data?.data.map((tag) => (
                                                        <CommandItem
                                                            key={tag?.id}
                                                            value={tag?.id}
                                                            onSelect={() => {
                                                                field.onChange(tag?.id);
                                                                handleAddTag({ id: tag.id, title: tag.title });
                                                                setPopoverOpen(false);
                                                            }}
                                                        >
                                                            {tag.title}
                                                            <Check
                                                                className={cn(
                                                                    "ml-auto",
                                                                    tags.find((t) => t.id === tag.id)
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                )}
                                                            />
                                                        </CommandItem>
                                                    ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>

                        {errors.tag && <span className="text-red-600">{errors.tag.message}</span>}
                    </>
                )}
            />

            {/* Display Added Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
                {tags &&
                    tags.map((tag, index) => (
                        <span
                            key={index}
                            className="flex items-center space-x-2 bg-gray-200 text-gray-800 px-3 py-1 rounded-full"
                        >
                            <span className="text-sm">{tag.title}</span>
                            <button
                                type="button"
                                className="text-red-500"
                                onClick={() => handleRemoveTag(tag.id)}
                            >
                                <CircleX size={18} />
                            </button>
                        </span>
                    ))}
            </div>
        </div>
    );
};

export default TagsField;

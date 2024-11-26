import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Controller } from "react-hook-form";

import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const TagsField = ({ control, tags, setTags }) => {
    const [popoverOpen, setPopoverOpen] = useState(false);

    const handleAddTag = (tag) => {
        if (tag.trim() && !tags.includes(tag.trim())) {
            setTags([...tags, tag.trim()]);
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div className="space-y-1">
            <Label htmlFor="tags" className="text-md font-bold">
                Tags
            </Label>

            <Controller
                name="tagSelect"
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
                                        Select Tags
                                        <ChevronsUpDown className="opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search tags..." />
                                        <CommandList>
                                            <CommandEmpty>No tags found.</CommandEmpty>
                                            <CommandGroup>
                                                {["JavaScript", "React", "Next.js", "CSS", "HTML"].map(
                                                    (tag) => (
                                                        <CommandItem
                                                            key={tag}
                                                            value={tag}
                                                            onSelect={() => {
                                                                field.onChange(tag);
                                                                handleAddTag(tag);
                                                                setPopoverOpen(false);
                                                            }}
                                                        >
                                                            {tag}
                                                            <Check
                                                                className={cn(
                                                                    "ml-auto",
                                                                    tags.includes(tag)
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                )}
                                                            />
                                                        </CommandItem>
                                                    )
                                                )}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>

                        {errors.tagSelect && <span className="text-red-600">{errors.tagSelect.message}</span>}
                    </>
                )}
            />

            {/* Display Added Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
                {tags && tags.map((tag, index) => (
                    <span
                        key={index}
                        className="flex items-center space-x-2 bg-gray-200 text-gray-800 px-3 py-1 rounded-full"
                    >
                        <span className="text-sm">{tag}</span>
                        <button
                            type="button"
                            className="text-red-500"
                            onClick={() => handleRemoveTag(tag)}
                        >
                            ×
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default TagsField;

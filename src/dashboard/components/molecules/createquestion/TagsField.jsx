import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";


const TagsField = ({ tags, setTags }) => {
    const [tagInput, setTagInput] = useState("");

    const handleAddTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()]);
            setTagInput(""); // Clear the input field after adding the tag
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
            <div className="flex items-center space-x-2">
                <Input
                    id="tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Enter a tag and press +"
                />
                <Button type="button" onClick={handleAddTag}>
                    +
                </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
                {tags && tags.map((tag, index) => (
                    <span
                        key={index}
                        className="flex items-center space-x-2 bg-gray-200 text-gray-800 px-3 py-1 rounded-full"
                    >
                        <span>{tag}</span>
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
    )
}

export default TagsField;
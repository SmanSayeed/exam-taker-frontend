import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import { XIcon } from "lucide-react";
import { useState } from "react";
import { Controller } from "react-hook-form";

export const AutoSearchSelect = ({
    label,
    name,
    control,
    options = [],
    placeholder,
    onChange,
    rules = {},
    onRemove,
    defaultValue,
    disabled = false,
}) => {
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [selectedCatName, setSelectedCatName] = useState("");

    return (
        <div className="grid gap-2">
            <Label className="text-md font-bold">{label}</Label>
            <Controller
                name={name}
                control={control}
                rules={rules}
                defaultValue={defaultValue}
                render={({ field, formState: { errors } }) => (
                    <>
                        <div className="flex items-center gap-2">
                            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-start">
                                        {selectedCatName ? selectedCatName.charAt(0).toUpperCase() + selectedCatName.slice(1) : placeholder}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder={placeholder} />
                                        <CommandList>
                                            <CommandEmpty>No results found.</CommandEmpty>
                                            <CommandGroup>
                                                {options && options.map((item) => (
                                                    <CommandItem
                                                        key={item?.id.toString()}
                                                        onSelect={() => {
                                                            field.onChange(item?.id.toString());
                                                            if (onChange) onChange(item?.id.toString());
                                                            setSelectedCatName(item?.title);
                                                            setPopoverOpen(false);
                                                        }}
                                                    >
                                                        {item?.title.charAt(0).toUpperCase() + item?.title.slice(1)}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            {field.value && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (onRemove) onRemove();
                                    }}
                                    className="p-2 rounded-full bg-gray-200 hover:bg-red-200 text-gray-500 hover:text-red-500"
                                    aria-label={`Clear ${label}`}
                                >
                                    <XIcon className="w-5 h-5" aria-hidden="true" />
                                </button>
                            )}
                        </div>

                        {errors[name] && <span className="text-red-600">{errors[name]?.message}</span>}
                    </>
                )}
            />
        </div>
    );
}

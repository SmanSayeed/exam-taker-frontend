import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { useState } from "react";


import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";

import { useCreateModelTestMutation } from "@/features/modelTests/modelTestApi";
import { useGetPackagesQuery, useGetSinglePackageQuery } from "@/features/packages/packageApi";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

export default function ModelTestCreateForm() {
    const [statusCheck, setStatusCheck] = useState(true);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [selectedPackageName, setSelectedPackageName] = useState("");
    const [selectedPackage, setSelectedPackage] = useState(null);

    const { data: allPackages } = useGetPackagesQuery();
    const { data: singlePackage } = useGetSinglePackageQuery(selectedPackage);
    console.log("singlePackage", singlePackage)
    const [createModelTest, { isLoading }] = useCreateModelTestMutation();

    const {
        formState: { errors },
        control,
        handleSubmit
    } = useForm();

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['link', 'formula'],

        [{ 'header': 1 }, { 'header': 2 }, { 'header': 3 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],

        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']
    ];
    const module = {
        toolbar: toolbarOptions
    }

    const handleCreate = async (formData) => {
        console.log(formData)

        const payload = {
            "package_id": formData.package,
            "title": formData.title,
            "description": formData.description,
            "start_time": formData.start_time,
            "end_time": formData.end_time,
            "is_active": statusCheck,
            "category": {
                "section_id": singlePackage?.data?.category?.section_id || null,
                "exam_type_id": singlePackage?.data?.category?.exam_type_id || null,
                "exam_sub_type_id": singlePackage?.data?.category?.exam_sub_type_id || null
            }
        }

        console.log("payload", payload)

        try {
            const response = await createModelTest(payload).unwrap();
            console.log(response)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(handleCreate)} id="question-form">
            <div className="space-y-4 mt-4">
                {/* select packages */}
                <div className="space-y-2">
                    <Label className="text-md font-bold">Select Package: </Label>
                    <Controller
                        name="package"
                        control={control}
                        render={({ field }) => (
                            <>
                                <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="w-full justify-start">
                                            {selectedPackageName ? selectedPackageName.charAt(0).toUpperCase() + selectedPackageName.slice(1) : "Select Package"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0">
                                        <Command>
                                            <CommandInput placeholder="Search package..." />
                                            <CommandList>
                                                <CommandEmpty>No results found.</CommandEmpty>
                                                <CommandGroup>
                                                    {allPackages?.data.map((type) => (
                                                        <CommandItem
                                                            key={type?.id}
                                                            onSelect={() => {
                                                                field.onChange(type?.id);
                                                                setSelectedPackage(type?.id);
                                                                setSelectedPackageName(type?.name);
                                                                setPopoverOpen(false);
                                                            }}
                                                        >
                                                            {type?.name.charAt(0).toUpperCase() + type?.name.slice(1)}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </>
                        )}
                    />
                </div>

                {/* title */}
                <div className="space-y-1">
                    <Label htmlFor="title" className="text-md font-bold">Title</Label>
                    <Controller
                        name="title"
                        control={control}
                        rules={{ required: "Title is required" }}
                        render={({ field }) => (
                            <ReactQuill
                                theme="snow"
                                value={field.value}
                                onChange={field.onChange}
                                modules={module}
                            />
                        )}
                    />
                    {errors.title && <span className="text-red-600">{errors.title.message}</span>}
                </div>

                {/* description */}
                <div className="space-y-1">
                    <Label htmlFor="details" className="text-md font-bold">Description</Label>
                    <Controller
                        name="description"
                        control={control}
                        rules={{ required: "Description is required" }}
                        render={({ field }) => (
                            <ReactQuill
                                theme="snow"
                                value={field.value}
                                onChange={field.onChange}
                                modules={module}
                            />
                        )}
                    />
                    {errors.description && <span className="text-red-600">{errors.description.message}</span>}
                </div>

                {/* start time */}
                <div className="space-y-1">
                    <Label htmlFor="start_time" className="text-md font-bold">Start Time</Label>
                    <Controller
                        name="start_time"
                        control={control}
                        rules={{ required: "Start time is required" }}
                        render={({ field }) => (
                            <input
                                type="datetime-local"
                                id="start_time"
                                {...field}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        )}
                    />
                    {errors.start_time && <p className="text-red-500">{errors.start_time.message}</p>}
                </div>

                {/* end time */}
                <div className="space-y-1">
                    <Label htmlFor="end_time" className="text-md font-bold">End Time</Label>
                    <Controller
                        name="end_time"
                        control={control}
                        rules={{ required: "End time is required" }}
                        render={({ field }) => (
                            <input
                                type="datetime-local"
                                id="end_time"
                                {...field}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        )}
                    />
                    {errors.end_time && <p className="text-red-500">{errors.end_time.message}</p>}
                </div>

                {/* is active */}
                <div>
                    <Checkbox
                        id="status"
                        checked={statusCheck}
                        onCheckedChange={(checked) => setStatusCheck(checked)}
                    />
                    <Label htmlFor="status" className="ml-2">Status</Label>
                </div>

                <Button
                    // disabled={isLoading}
                    type="submit"
                    className="w-full"
                >
                    {/* {isLoading ? "Proceeding" : "Create Question"} */}
                    Create Model Test
                </Button>
            </div>
        </form>
    )
}
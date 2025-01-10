import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEditModelTestMutation } from "@/features/modelTests/modelTestApi";
import { useGetPackagesQuery } from "@/features/packages/packageApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import { getPlainTextFromHtml } from "@/utils/getPlainTextFromHtml";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { toast } from "sonner";
import { AutoSearchSelectForEdit } from "../../../../components/autosearch-select-edit";
import SelectCatForModelTest from "../../molecules/modelTests/SelectCatForModelTest";

export function MTEditForm({ isFetching, modelTestData, modelTestId }) {
    console.log(modelTestData)
    const [isActive, setIsActive] = useState(modelTestData?.is_active === 1 ? true : false);
    const [updateModelTest, { isLoading: isUpdating }] = useEditModelTestMutation();
    const { data: allPackages } = useGetPackagesQuery();

    const {
        formState: { errors },
        control,
        setValue,
        handleSubmit
    } = useForm({
        defaultValues: modelTestData || {},
        values: modelTestData || {},
    });

    const [selectedGroup, setSelectedGroup] = useLocalStorage({ key: 'group', defaultValue: modelTestData?.category?.group_id || "" });
    const [selectedLevel, setSelectedLevel] = useLocalStorage({ key: 'level', defaultValue: modelTestData?.category?.level_id || "" });
    const [selectedSubject, setSelectedSubject] = useLocalStorage({ key: 'subject', defaultValue: modelTestData?.category?.subject_id || "" });
    const [selectedLesson, setSelectedLesson] = useLocalStorage({ key: 'lesson', defaultValue: modelTestData?.category?.lesson_id || "" });
    const [selectedTopic, setSelectedTopic] = useLocalStorage({ key: 'topic', defaultValue: modelTestData?.category?.topic_id || "" });
    const [selectedSubTopic, setSelectedSubTopic] = useLocalStorage({ key: 'sub_topic', defaultValue: modelTestData?.category?.sub_topic_id || "" });

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
    };

    const handleUpdate = async (formData) => {
        const categoriesPayload = {
            group_id: selectedGroup || formData.group,
            level_id: selectedLevel || formData.level,
            subject_id: selectedSubject || formData.subject,
            lesson_id: selectedLesson || formData.lesson,
            topic_id: selectedTopic || formData.topic,
            sub_topic_id: selectedSubTopic || formData.sub_topic,
        };

        const payload = {
            package_id: formData.package.id,
            title: formData.title,
            description: formData.description,
            start_time: formData.start_time,
            end_time: formData.end_time,
            pass_mark: formData.pass_mark,
            full_mark: formData.full_mark,
            is_active: isActive ? 1 : 0,
            // category: categoriesPayload,
        };

        try {
            const response = await updateModelTest({ id: modelTestId, data: payload }).unwrap();
            toast.success(response.message);
        } catch (error) {
            console.error(error);
            toast.error(error?.data?.message);
        }
    };

    if (isFetching) return <p>Loading...</p>;

    return (
        <form onSubmit={handleSubmit(handleUpdate)} id="model-test-edit-form">
            <div className="space-y-4 my-4">
                {/* Select Package */}
                <AutoSearchSelectForEdit
                    label="Select Package"
                    name="package"
                    control={control}
                    options={
                        allPackages?.data.map((pkg) => ({
                            id: pkg.id,
                            title: getPlainTextFromHtml(pkg.name),
                        })) || []
                    }
                    placeholder="Select Package"
                    selectedValue={modelTestData?.package.id}
                    showRemoveButton={false}
                />

                {/* Title */}
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
                </div>

                {/* Description */}
                <div className="space-y-1">
                    <Label htmlFor="description" className="text-md font-bold">Description</Label>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <ReactQuill
                                theme="snow"
                                value={field.value}
                                onChange={field.onChange}
                                modules={module}
                            />
                        )}
                    />
                </div>

                {/* Start Time */}
                <div className="space-y-1">
                    <Label htmlFor="start_time" className="text-md font-bold">Start Time</Label>
                    <Controller
                        name="start_time"
                        control={control}
                        rules={{ required: "Start time is required" }}
                        render={({ field }) => (
                            <Input
                                type="datetime-local"
                                id="start_time"
                                {...field}
                            />
                        )}
                    />
                    {errors.start_time && <p className="text-red-500">{errors.start_time.message}</p>}
                </div>

                {/* End Time */}
                <div className="space-y-1">
                    <Label htmlFor="end_time" className="text-md font-bold">End Time</Label>
                    <Controller
                        name="end_time"
                        control={control}
                        rules={{ required: "End time is required" }}
                        render={({ field }) => (
                            <Input
                                type="datetime-local"
                                id="end_time"
                                {...field}
                            />
                        )}
                    />
                    {errors.end_time && <p className="text-red-500">{errors.end_time.message}</p>}
                </div>

                {/* Pass Mark */}
                <div className="space-y-1">
                    <Label htmlFor="pass_mark" className="text-md font-bold">Pass Mark</Label>
                    <Controller
                        name="pass_mark"
                        control={control}
                        rules={{ required: "Pass mark is required", min: 1 }}
                        render={({ field }) => (
                            <Input
                                type="number"
                                id="pass_mark"
                                {...field}
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                }}
                                className="w-full p-2 border border-gray-300 bg-inherit rounded"
                            />
                        )}
                    />
                    {errors.pass_mark && <p className="text-red-500">{errors.pass_mark.message}</p>}
                </div>

                {/* Full Mark */}
                <div className="space-y-1">
                    <Label htmlFor="full_mark" className="text-md font-bold">Full Mark</Label>
                    <Controller
                        name="full_mark"
                        control={control}
                        rules={{ required: "Full mark is required", min: 1 }}
                        render={({ field }) => (
                            <Input
                                type="number"
                                id="full_mark"
                                {...field}
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                }}
                                className="w-full p-2 border border-gray-300 bg-inherit rounded"
                            />
                        )}
                    />
                    {errors.full_mark && <p className="text-red-500">{errors.full_mark.message}</p>}
                </div>

                {/* Is Active */}
                <div className="flex items-center">
                    <Checkbox
                        id="status"
                        checked={isActive}
                        onCheckedChange={(checked) => setIsActive(checked)}
                    />
                    <Label htmlFor="status" className="ml-2">Status</Label>
                </div>

                {/* Select Category */}
                <SelectCatForModelTest
                    control={control}
                    setValue={setValue}
                    setSelectedGroup={setSelectedGroup}
                    setSelectedLevel={setSelectedLevel}
                    setSelectedSubject={setSelectedSubject}
                    setSelectedLesson={setSelectedLesson}
                    setSelectedTopic={setSelectedTopic}
                    setSelectedSubTopic={setSelectedSubTopic}
                />

                <Button
                    disabled={isUpdating}
                    type="submit"
                    className="w-full"
                >
                    {isUpdating ? "Updating..." : "Update Model Test"}
                </Button>
            </div>
        </form>
    );
}

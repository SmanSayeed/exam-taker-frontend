import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { Input } from "@/components/ui/input";
import useLocalStorage from "@/hooks/useLocalStorage";
import { getPlainTextFromHtml } from "@/utils/getPlainTextFromHtml";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { toast } from "sonner";
import SelectCatForModelTest from "../../molecules/modelTests/SelectCatForModelTest";
import { AutoSearchSelectForEdit } from "../../molecules/questionedit/AutoSearchSelectForEdit";

export function MTEditForm({ isFetching, modelTestData }) {
    console.log(modelTestData)
    // const [updateModelTest, { isLoading: isUpdating }] = useUpdateModelTestMutation();

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
            id: modelTestData?.id,
            package_id: formData.package,
            title: formData.title,
            description: formData.description,
            start_time: formData.start_time,
            end_time: formData.end_time,
            is_active: formData.is_active,
            category: categoriesPayload,
        };

        try {
            const response = await updateModelTest(payload).unwrap();
            toast.success(response.message);
        } catch (error) {
            console.error(error);
            toast.error(error?.data?.message);
        }
    };

    if (isFetching) return <p>Loading...</p>;

    return (
        <form onSubmit={handleSubmit(handleUpdate)} id="model-test-edit-form">
            <div className="space-y-4 mt-4">
                {/* Select Package */}
                <AutoSearchSelectForEdit
                    label="Select Package"
                    name="package"
                    control={control}
                    options={
                        modelTestData
                            ? [
                                {
                                    id: modelTestData.package.id.toString(),
                                    title: getPlainTextFromHtml(modelTestData.package.name),
                                },
                            ]
                            : []
                    }
                    placeholder="Select Package"
                    defaultValue={modelTestData?.package_id}
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

                {/* Is Active */}
                <div className="flex items-center">
                    <Checkbox
                        id="status"
                        checked={modelTestData?.is_active}
                        onCheckedChange={(checked) => setValue('is_active', checked)}
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

                {/* <Button
                    disabled={isUpdating}
                    type="submit"
                    className="w-full"
                >
                    {isUpdating ? "Updating..." : "Update Model Test"}
                </Button> */}
            </div>
        </form>
    );
}

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import { AutoSearchSelect } from "@/components/autosearch-select";
import { useCreateModelTestMutation } from "@/features/modelTests/modelTestApi";
import { updateField } from "@/features/modelTests/modelTestFormSlice";
import { useGetPackagesQuery } from "@/features/packages/packageApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import { getPlainTextFromHtml } from "@/utils/getPlainTextFromHtml";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from "react-redux";
import SelectCatForModelTest from "../../molecules/modelTests/SelectCatForModelTest";

export function ModelTestCreateForm() {
    const { data: allPackages } = useGetPackagesQuery();
    const [createModelTest, { isLoading }] = useCreateModelTestMutation();

    const dispatch = useDispatch();
    const modelTestForm = useSelector((state) => state.modelTestForm);

    const {
        formState: { errors },
        control,
        setValue,
        handleSubmit,
        reset
    } = useForm({
        defaultValues: modelTestForm,
    });

    const [selectedGroup, setSelectedGroup] = useLocalStorage({ key: 'group', defaultValue: "" });
    const [selectedLevel, setSelectedLevel] = useLocalStorage({ key: 'level', defaultValue: "" });
    const [selectedSubject, setSelectedSubject] = useLocalStorage({ key: 'subject', defaultValue: "" });
    const [selectedLesson, setSelectedLesson] = useLocalStorage({ key: 'lesson', defaultValue: "" });
    const [selectedTopic, setSelectedTopic] = useLocalStorage({ key: 'topic', defaultValue: "" });
    const [selectedSubTopic, setSelectedSubTopic] = useLocalStorage({ key: 'sub_topic', defaultValue: "" });

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

        const categoriesPayload = {
            group_id: selectedGroup || formData.group,
            level_id: selectedLevel || formData.level,
            subject_id: selectedSubject || formData.subject,
            lesson_id: selectedLesson || formData.lesson,
            topic_id: selectedTopic || formData.topic,
            sub_topic_id: selectedSubTopic || formData.sub_topic,
        }

        const payload = {
            "package_id": modelTestForm.package || formData.package,
            "title": formData.title,
            "description": formData.description,
            "start_time": formData.start_time,
            "end_time": formData.end_time,
            "is_active": modelTestForm.is_active,
            "category": categoriesPayload
        }

        try {
            const response = await createModelTest(payload).unwrap();
            toast.success(response.message);
            reset();
        } catch (error) {
            console.error(error);
            toast.error(error?.data?.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(handleCreate)} id="question-form">
            <div className="space-y-4 mt-4">
                {/* Select Package */}
                <AutoSearchSelect
                    label="Select Package"
                    name="package"
                    control={control}
                    options={
                        allPackages?.data.map((pkg) => ({
                            id: pkg.id.toString(),
                            title: getPlainTextFromHtml(pkg.name),
                        })) || []
                    }
                    placeholder="Select Package"
                    onChange={(packageId) => {
                        dispatch(updateField({ field: 'package', value: packageId }));
                    }}
                    rules={{ required: "Package selection is required" }}
                    defaultValue={modelTestForm.package}
                    showRemoveButton={false}
                />

                {/* title */}
                <div className="space-y-1">
                    <Label htmlFor="title" className="text-md font-bold">Title</Label>
                    <Controller
                        name="title"
                        control={control}
                        rules={{ required: "Title is required" }}
                        render={({ field, formState: errors }) => (
                            <>
                                <ReactQuill
                                    theme="snow"
                                    value={field.value}
                                    onChange={(value) => {
                                        field.onChange(value);
                                        dispatch(updateField({ field: 'title', value }));
                                    }}
                                    modules={module}
                                />
                                {errors.title && <span className="text-red-600">{errors.title.message}</span>}
                            </>
                        )}
                    />
                </div>

                {/* description */}
                <div className="space-y-1">
                    <Label htmlFor="details" className="text-md font-bold">Description</Label>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <ReactQuill
                                theme="snow"
                                value={field.value}
                                onChange={(value) => {
                                    field.onChange(value);
                                    dispatch(updateField({ field: 'description', value }));
                                }}
                                modules={module}
                            />
                        )}
                    />
                </div>

                {/* start time */}
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
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                    dispatch(updateField({ field: 'start_time', value: e.target.value }));
                                }}
                                className="w-full p-2 border border-gray-300 bg-inherit rounded"
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
                            <Input
                                type="datetime-local"
                                id="end_time"
                                {...field}
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                    dispatch(updateField({ field: 'end_time', value: e.target.value }));
                                }}
                                className="w-full p-2 border border-gray-300 bg-inherit rounded"
                            />
                        )}
                    />
                    {errors.end_time && <p className="text-red-500">{errors.end_time.message}</p>}
                </div>

                {/* is active */}
                <div className="flex items-center">
                    <Checkbox
                        id="status"
                        checked={modelTestForm?.is_active}
                        onCheckedChange={(checked) => dispatch(updateField({ field: 'is_active', value: checked }))}
                    />
                    <Label htmlFor="status" className="ml-2">Status</Label>
                </div>

                {/* select category */}
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
                    disabled={isLoading}
                    type="submit"
                    className="w-full"
                >
                    {isLoading ? "Proceeding" : "Create Model Test"}
                </Button>
            </div>
        </form>
    )
}
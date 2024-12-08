import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useGetSingleModelTestQuery } from "@/features/modelTests/modelTestApi";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export default function CreateExamFormForModelTest() {
    const { modelTestId } = useParams();
    console.log(modelTestId)
    const { data: singleModelTest } = useGetSingleModelTestQuery(modelTestId);
    console.log(singleModelTest)

    const form = useForm({
        defaultValues: {
            exam_title: "",
            is_optional: false,
            time_limit: "",
            start_time: singleModelTest?.start_time || "",
        },
        mode: "onChange",
    });

    const onSubmit = async (data) => {
        console.log("Submitting exam data:", data);

        // Uncomment and implement the API call if needed
        // try {
        //     const response = await someApiCall(data);
        //     console.log(response);
        //     toast.success("Exam created successfully!");
        //     form.reset();
        // } catch (error) {
        //     console.error(error);
        //     toast.error("Failed to create exam");
        // }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Exam Title Field */}
                <FormField
                    name="exam_title"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Exam Title</FormLabel>
                            <FormControl>
                                <input
                                    {...field}
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-md"
                                    placeholder="Enter exam title"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Is Optional Field (Checkbox) */}
                <FormField
                    name="is_optional"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                <input
                                    {...field}
                                    type="checkbox"
                                    className="mr-2"
                                    checked={field.value}
                                    onChange={(e) => field.onChange(e.target.checked)}
                                />
                                Is Optional
                            </FormLabel>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Time Limit Field */}
                <FormField
                    name="time_limit"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Time Limit (minutes)</FormLabel>
                            <FormControl>
                                <input
                                    {...field}
                                    type="number"
                                    className="w-full px-4 py-2 border rounded-md"
                                    placeholder="Enter time limit"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Start Time Field */}
                <FormField
                    name="start_time"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Start Time</FormLabel>
                            <FormControl>
                                <input
                                    {...field}
                                    type="datetime-local"
                                    className="w-full px-4 py-2 border rounded-md"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* category filtering */}
                {/* <MultipleSelector /> */}

                {/* Action Buttons */}
                <div className="flex justify-center space-x-4">
                    <Button
                        className="w-full"
                        type="submit"
                        disabled={!form.formState.isValid}
                    >
                        {
                            form.formState.isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : "Create Exam"
                        }
                    </Button>
                </div>
            </form>
        </Form>
    );
}

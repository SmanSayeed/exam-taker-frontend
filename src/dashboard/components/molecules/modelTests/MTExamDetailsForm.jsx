import CheckboxField from "@/components/atoms/CheckboxField";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export default function MTExamDetailsForm({
    form, isActive, setIsActive, isPaid, setIsPaid, isOptional, setIsOptional, isNegativeMarking, setIsNegativeMarking
}) {
    return (
        <>
            {/* Exam Title */}
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
                                className="w-full px-4 py-2 border rounded-md" placeholder="Enter exam title"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Description */}
            <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <textarea
                                {...field}
                                className="w-full px-4 py-2 border rounded-md" placeholder="Enter exam description"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Checkboxes */}
            <CheckboxField
                id="is_active"
                label="Is Active"
                checked={isActive}
                onCheckedChange={setIsActive}
            />
            <CheckboxField
                id="is_paid"
                label="Paid Exam"
                checked={isPaid}
                onCheckedChange={setIsPaid}
            />
            <CheckboxField
                id="is_optional"
                label="Is Optional"
                checked={isOptional}
                onCheckedChange={setIsOptional}
            />
            <CheckboxField
                id="is_negative_mark_applicable"
                label="Negative Marking Applicable"
                checked={isNegativeMarking}
                onCheckedChange={setIsNegativeMarking}
            />
        </>
    );
}

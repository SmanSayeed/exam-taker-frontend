import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";
import FilterQuestionsByCategory from "../molecules/questionList/FilterQuestionsByCategory";

export default function FilteringQuestions({ control, setValue, refetch, handleFilterQuestions, register, handleSubmit, errors, isLoadingGetQuestions }) {

  // const {
  //   register,
  //   handleSubmit,
  //   control,
  //   setValue,
  //   watch,
  // } = useForm({
  //   defaultValues: {
  //     keyword: "",
  //     section: [],
  //     exam_type: [],
  //     exam_sub_type: [],
  //     group: [],
  //     level: [],
  //     lesson: [],
  //     topic: [],
  //     sub_topic: [],
  //   },
  // });

  // Watch for changes in form data
  // const watchedFormData = watch();

  // Trigger the query with dynamic parameters
  // const { data: filteredQuestions, refetch, isFetching } = useGetQuestionsQuery({
  //   keyword: watchedFormData.keyword || "",
  //   type: watchedFormData.type || "mcq",
  //   section_id: watchedFormData.section,
  //   exam_type_id: watchedFormData.exam_type,
  //   exam_sub_type_id: watchedFormData.exam_sub_type,
  //   group_id: watchedFormData.group,
  //   level_id: watchedFormData.level,
  //   subject_id: watchedFormData.subject,
  //   lesson_id: watchedFormData.lesson,
  //   topic_id: watchedFormData.topic,
  //   sub_topic_id: watchedFormData.sub_topic,
  //   perPage: perPage,
  // });

  // const cleanPayload = (payload) =>
  //   Object.fromEntries(
  //     Object.entries(payload).filter(
  //       ([, value]) =>
  //         value !== undefined && value !== "" && value.length !== 0 // Remove empty or undefined fields
  //     )
  //   );

  // const handleFilterQuestions = async (formData) => {
  //   const rawPayload = {
  //     keyword: formData.keyword,
  //     section_id: formData.section,
  //     exam_type_id: formData.exam_type,
  //     exam_sub_type_id: formData.exam_sub_type,
  //     group_id: formData.group,
  //     level_id: formData.level,
  //     lesson_id: formData.lesson,
  //     topic_id: formData.topic,
  //     sub_topic_id: formData.sub_topic,
  //   };

  //   const payload = cleanPayload(rawPayload);

  //   // Update filters dynamically and refetch questions
  //   setValue("keyword", payload.keyword || "");

  //   refetch({
  //     page: currentPage,
  //     perPage: perPage,
  //     ...payload,
  //   });
  // };

  return (
    <form
      onSubmit={handleSubmit(handleFilterQuestions)}
      className="relative h-full min-h-20"
    >
      <div className="mb-4">
        {/* Filter Options */}
        <FilterQuestionsByCategory control={control} setValue={setValue} />
      </div>

      <div className="relative mb-4">
        {/* Search Input */}
        <Input
          placeholder="Search questions..."
          {...register("keyword")}
          className="pr-10"
        />
        <button type="submit" className="absolute right-2 top-1/4">
          <Search size={18} className="opacity-70" />
        </button>
      </div>

      <div className="mb-4 text-end">
        <Button type="submit" disabled={isLoadingGetQuestions}>
          {
            isLoadingGetQuestions ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              </span>
            ) : "Filtered"
          }
        </Button>
      </div>
    </form>
  );
}

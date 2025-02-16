import CInput from "@/components/atoms/CInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUpdateSubmissionReviewMutation } from "@/features/modelTests/modelTestApi";
import { X } from "lucide-react";
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export const ReviewModal = ({ isOpen, onClose, initialData, modelTestId, examId, studentId }) => {
  const { register, handleSubmit, setValue, control } = useForm({
    defaultValues: {
      total_marks: initialData?.total_marks || '',
      comments: initialData?.comments || ''
    }
  });

  const [updateReview] = useUpdateSubmissionReviewMutation();

  const handleFormSubmit = async (data) => {
    try {
      await updateReview({ modelTestId, examId, studentId, data }).unwrap();
      toast.success("Review updated successfully");
      onClose();
    } catch (error) {
      toast.error('Failed to update review');
      console.error('Error updating review:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Review</DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none">
            <X className="h-4 w-4" />
          </DialogClose>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Total Marks</label>
            <Input
              type="number"
              step="0.01"
              {...register('total_marks')}
              className="mt-1"
            />
          </div>

          <CInput
            name="comments"
            label="Comments"
            control={control}
          />

          <Button type="submit" className="w-full">
            Update Review
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
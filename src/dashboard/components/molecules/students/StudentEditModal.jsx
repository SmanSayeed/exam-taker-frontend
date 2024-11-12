import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useEditStudentMutation } from "@/features/studentsApi/studentsApi";
import { useForm } from "react-hook-form";

const StudentEditModal = ({ isOpen, onClose, student }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [editStudent] = useEditStudentMutation();

  const onSubmit = async (data) => {
    try {
      await editStudent({ id: student.id, data });
      reset();
      onClose();
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Student</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[50%] bg-white dark:bg-gray-800 border border-gray-400 p-6 rounded-md shadow-lg">
        <p className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Edit Student Profile</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
            defaultValue={student?.name}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 dark:bg-gray-700 dark:text-gray-200"
          />
          {errors.name && <span className="text-red-600 text-sm">{errors.name.message}</span>}

          <input
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            defaultValue={student?.email}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 dark:bg-gray-700 dark:text-gray-200"
          />
          {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}

          <input
            placeholder="Phone"
            {...register("phone")}
            defaultValue={student?.phone}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 dark:bg-gray-700 dark:text-gray-200"
          />

          <input
            placeholder="Address"
            {...register("address")}
            defaultValue={student?.address}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 dark:bg-gray-700 dark:text-gray-200"
          />

          <input
            placeholder="Country"
            {...register("country")}
            defaultValue={student?.country}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 dark:bg-gray-700 dark:text-gray-200"
          />

          <input
            placeholder="Country Code"
            {...register("country_code")}
            defaultValue={student?.country_code}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 dark:bg-gray-700 dark:text-gray-200"
          />

          <Button type="submit" className="w-full bg-blue-500 text-white rounded px-3 py-2 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
            Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StudentEditModal;

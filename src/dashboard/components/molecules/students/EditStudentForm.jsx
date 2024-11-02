import { useForm } from "react-hook-form";
import { useEditStudentMutation } from "@/features/api/studentsApi";

const EditStudentForm = ({ student, onClose }) => {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: student,
  });
  const [editStudent] = useEditStudentMutation();

  const onSubmit = async (data) => {
    await editStudent({ id: student.id, data });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register("name", { required: true })} placeholder="Name" />
      {errors.name && <p className="text-red-500">Name is required.</p>}
      
      <input {...register("email", { required: true })} placeholder="Email" />
      {errors.email && <p className="text-red-500">Email is required.</p>}
      
      <input {...register("phone")} placeholder="Phone" />

      <button type="submit" className="btn-primary">Save</button>
    </form>
  );
};

export default EditStudentForm;

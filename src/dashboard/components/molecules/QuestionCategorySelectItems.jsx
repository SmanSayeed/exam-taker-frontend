import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Controller, useForm } from "react-hook-form";


export default function QuestionCategorySelectItems({name}) {

    const {
        register,
        handleSubmit, reset,
        formState: { errors },
        setError,
        control
    } = useForm();

  return (
    <div>
          <Card>
              <form>
                  <Controller
                      name="section"
                      control={name}
                      rules={{ required: `${name}  is required` }}
                      render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger className="w-[300px]">
                                  <SelectValue placeholder={name} />
                              </SelectTrigger>
                              <SelectContent>
                                  {/* {
                                      categories?.data && categories?.data.map(item => (
                                          <SelectItem key={item.id} value={item?.id}>
                                              {item?.title}
                                          </SelectItem>
                                      ))
                                  } */}
                                  <SelectItem value={"Item-1"} >
                                      Item-1
                                  </SelectItem>
                                  <SelectItem value={"Item-2"} >
                                      Item-2
                                  </SelectItem>
                                  <SelectItem value={"Item-3"} >
                                      Item-3
                                  </SelectItem>
                              </SelectContent>
                          </Select>
                      )}
                  />
              </form>
      </Card>
    </div>
  )
}
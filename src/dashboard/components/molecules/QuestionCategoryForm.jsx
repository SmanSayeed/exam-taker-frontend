import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const QuestionCategoryForm = ({ title, placeholder, inputType }) => {
    return (
        <Card>
            <form className="container gap-2 p-8 ">
                <CardTitle>
                    {title}
                </CardTitle>
                <div className="flex items-center gap-4 mt-4 ">
                    <Input type={inputType} name="section" placeholder={placeholder} required />
                    <Button>Create</Button>
                </div>
            </form>
        </Card>
    )
}
export default QuestionCategoryForm
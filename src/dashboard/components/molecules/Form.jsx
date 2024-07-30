import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
const Form = ({ title, type }) => {
    return (
        <Card className="container gap-2 p-8 ">
            <CardTitle className="text-xl">{title}</CardTitle>
            <div className="flex items-center gap-4 mt-4 ">
            {/* <Select>
                <SelectTrigger>
                    <SelectValue placeholder={type} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="SSC">SSC</SelectItem>
                    <SelectItem value="HSC">HSC</SelectItem>
                    <SelectItem value="admission">Admission</SelectItem>
                    <SelectItem value="creative"></SelectItem>
                    <SelectItem value="mcq">MCQ</SelectItem>
                </SelectContent>
            </Select> */}
            <Input type="text" name="section" placeholder="Enter section" required />
            <Button>Create</Button>
            </div>
        </Card>
    )
}
export default Form
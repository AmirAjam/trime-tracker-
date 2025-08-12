import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const Selectbox = () => {
    return (
        <Select defaultValue="apple" className="bg-darker border-gray-300!">
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="apple"> اصغر</SelectItem>
                    <SelectItem value="banana">اصغر</SelectItem>
                    <SelectItem value="blueberry">اصغر</SelectItem>
                    <SelectItem value="grapes">اصغر</SelectItem>
                    <SelectItem value="pineapple">اصغر</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default Selectbox


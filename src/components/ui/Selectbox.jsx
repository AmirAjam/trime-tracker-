import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

const Selectbox = ({ options, defultOption }) => {
    return (
        <Select defaultValue={defultOption} className="bg-darker border-gray-300! ">
            <SelectTrigger className="w-52 h-11! cursor-pointer">
                <SelectValue placeholder="در حال لود..." />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {options?.map(option => <SelectItem key={option._id}
                        value={option._id}>{option.name}</SelectItem>
                    )}
                </SelectGroup>
            </SelectContent>
        </Select >
    )
}

export default Selectbox


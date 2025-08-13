import Selectbox from "@/components/ui/Selectbox"
import { pesrianDayName } from '@/utils/getPersianDayName';
import icons from "../../icons"
import moment from 'moment-jalaali';
import { useEffect, useId, useState } from "react";
import { getAllUsers, getUser } from "@/api/userAPi";
import getLocalStorage from "@/utils/getLocalStorage";


const TopTracker = ({ backOneDay, forwardOneDay, selectedDate }) => {
    const [users, setUsers] = useState(null)

    const currentDate = moment().startOf('day');
    const nextDay = selectedDate.clone().startOf('day').add(1, 'day');

    const token = getLocalStorage('token')
    const userId = getLocalStorage('id')
    const { Plus, Play, Stop, AngleRight } = icons

    useEffect(() => {

        getAllUsers(token)
            .then(res => setUsers(res.data.users))
    }, [])
    return (
        <section className='flex items-center justify-between '>
            <div className="flex justify-center items-center gap-5">
                <button className="bg-green-600 rounded-full cursor-pointer size-10 flex justify-center 
                    items-center hover:bg-green-700 duration-300">
                    <Plus className="text-3xl hidden" />
                    <Play className="text-xl mb-.5 ml-1" />
                </button>
                <button className="bg-red-600 rounded-full cursor-pointer size-10 flex justify-center 
                    items-center hover:bg-red-700 duration-300">
                    <Stop className="text-xl" />
                </button>
                <Selectbox options={users} defultOption={userId} />
            </div>
            <div className="flex justify-center items-center gap-3 select-none">
                {nextDay.isAfter(currentDate)
                    ?
                    <button className="p-2 bg-dark opacity-70 rounded-full mt-1 cursor-not-allowed">
                        <AngleRight className="text-xl" />
                    </button>
                    :
                    <button onClick={forwardOneDay} className="p-2 bg-dark rounded-full mt-1">
                        <AngleRight className="text-xl cursor-pointer" />
                    </button>
                }
                <p className="mt-1 text-2xl">{pesrianDayName(selectedDate)}</p>
                <button onClick={backOneDay} className="p-2 bg-dark rounded-full mt-1 rotate-180">
                    <AngleRight className="text-xl cursor-pointer" />
                </button>
            </div>
        </section>
    )
}

export default TopTracker
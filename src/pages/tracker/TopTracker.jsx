import Selectbox from "@/components/ui/Selectbox"
import { pesrianDayName } from '@/utils/getPersianDayName';
import icons from "../../icons"
import moment from 'moment-jalaali';
import { useEffect, useId, useState } from "react";
import { getAllUsers, getUser } from "@/api/userAPi";
import getLocalStorage from "@/utils/getLocalStorage";
import { addManualTask, addTask } from "@/api/timesApi";
import { toast } from "sonner";


const TopTracker = ({ backOneDay, forwardOneDay, selectedDate, reloadFetchTask, changeUser }) => {
    const [users, setUsers] = useState(null)

    const currentDate = moment().startOf('day');
    const nextDay = selectedDate.clone().startOf('day').add(1, 'day');

    const token = getLocalStorage('token')
    const userId = getLocalStorage('id')
    const { Plus, Play, Stop, AngleRight } = icons

    const addNewTask = () => {
        if (nextDay.isAfter(currentDate)) {
            addTask(token)
                .then(res => reloadFetchTask()
                )
        }
        else {
            reloadFetchTask()
        }

    }

    useEffect(() => {
        getAllUsers(token)
            .then(res => setUsers(res.data.users))
    }, [])
    return (
        <section className='flex flex-wrap justify-center items-center sm:justify-between '>
            <div className="flex justify-center items-center gap-5">
                <button onClick={addNewTask} className="bg-green-600 rounded-full cursor-pointer size-10 flex justify-center 
                    items-center hover:bg-green-700 duration-300">
                    {/* <Plus className="text-3xl hidden" /> */}
                    <Play className="text-xl mb-.5 ml-1" />
                </button>
                <button className="bg-red-600 rounded-full cursor-pointer size-10 justify-center 
                    items-center hover:bg-red-700 duration-300 hidden">
                    <Stop className="text-xl" />
                </button>
                <Selectbox options={users} defultOption={userId} changeUser={changeUser} />
            </div>
            <div className="flex justify-center items-center gap-3 select-none mt-5 sm:mt-0">
                {nextDay.isAfter(currentDate)
                    ?
                    <button className="p-1.5 bg-dark opacity-30 rounded-full mt-1 cursor-not-allowed">
                        <AngleRight className="text-base sm:text-xl" />
                    </button>
                    :
                    <button onClick={forwardOneDay} className="p-1.5 bg-dark rounded-full mt-1 cursor-pointer">
                        <AngleRight className="text-base sm:text-xl" />
                    </button>
                }
                <p className="mt-1 text-2xl">{pesrianDayName(selectedDate)}</p>
                <button onClick={backOneDay} className="p-1.5 bg-dark rounded-full mt-1 rotate-180 cursor-pointer">
                    <AngleRight className="text-base sm:text-xl" />
                </button>
            </div>
        </section>
    )
}

export default TopTracker
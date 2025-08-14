import React, { useEffect, useState } from 'react'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getOtherUserTimes, getTimes } from '@/api/timesApi';
import getLocalStorage from '@/utils/getLocalStorage';
import moment from 'moment-jalaali';


const ReadOnlyTable = ({ selectedDate, userId,setTotalTime }) => {
    console.log(selectedDate)
    const [tasks, setTasks] = useState(null)
    const token = getLocalStorage('token')

    const changeTimeFormat = (time) => {
        return moment.utc(time).local().format("HH:mm")
    }

    const formatMinutesToHHMM = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
    };

    useEffect(() => {
        getOtherUserTimes(selectedDate.format("YYYY-MM-DD"), userId, token)
            .then(res => {
                console.log("res.data =>" ,res.data)
                setTotalTime(res.data.totalMinutes)
                setTasks(res.data.tasks)
            })

        console.log()
    }, [userId,selectedDate])

    return (
        <Table className="bg-darker rounded-lg">
            <TableHeader>
                <TableRow className="text-white! hover:bg-dark/60">
                    <TableHead className="w-1/4 text-right text-white">تیتر</TableHead>
                    <TableHead className="text-right w-1/10 text-white">شروع</TableHead>
                    <TableHead className="text-right w-1/10 text-white">پایان</TableHead>
                    <TableHead className="text-right w-1/10 text-white">مدت</TableHead>
                    <TableHead className="text-right w-2/5 text-white">توضیحات</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {tasks?.map(task => {
                    return (
                        <TableRow key={task._id} className="text-lg hover:bg-dark/60">
                            <TableCell>
                                <p>{task.title}</p>
                            </TableCell>
                            <TableCell>
                                <p>{changeTimeFormat(task.startTime)}</p>
                            </TableCell>
                            <TableCell>
                                <p>{task.endTime?changeTimeFormat(task.endTime):"--:--"}</p>
                            </TableCell>
                            <TableCell>
                                <p>{formatMinutesToHHMM(task.durationMinutes)}</p>
                            </TableCell>
                            <TableCell>
                                <p className='text-sm'>{task.description}</p>
                            </TableCell>
                        </TableRow>
                    )
                }
                )}
            </TableBody>
        </Table>
    )
}

export default ReadOnlyTable
import React, { useEffect, useState } from 'react'
import { TableCell, TableRow } from './ui/table'
import moment from 'moment-jalaali';
import { putEditTime, stopTask } from '@/api/timesApi';
import getLocalStorage from '@/utils/getLocalStorage';
import icons from '@/icons';

const TableItem = ({ task }) => {
    const { Stop } = icons
    console.log(task)
    const [taskTitle, setTaskTitle] = useState("")
    const [taskDescription, setTaskDescription] = useState("")
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("")

    const token = getLocalStorage('token')


    const editTask = (taskId) => {
        console.log("endTime => " , endTime)
        const newTask = {
            title: taskTitle,
            description: taskDescription,
            startTime: convertToISOString(startTime, task.startTime),
            endTime: endTime ? convertToISOString(endTime, task.startTime) : ""
        }


        putEditTime(taskId, newTask, token)
            .then(res => console.log(res.data))
    }

    const stopTaskHandler = (id) => {
        stopTask(id,token)
        .then(res => setEndTime(changeTimeFormat(res.data.timeEntry.endTime)))
    }

    const convertToISOString = (timeStr, baseDate) => {
        const date = new Date(baseDate);

        const [hours, minutes] = timeStr.split(":").map(Number);

        date.setHours(hours);
        date.setMinutes(minutes);
        date.setSeconds(0);
        date.setMilliseconds(0);

        return date.toISOString();
    };

    const changeTimeFormat = (time) => {
        return moment.utc(time).local().format("HH:mm")
    }
    useEffect(() => {
        task.startTime ? setStartTime(changeTimeFormat(task.startTime)) : setStartTime("--:--")

        task.endTime ? setEndTime(moment.utc(task.endTime).local().format("HH:mm")) : setEndTime("--:--")

        task.title ? setTaskTitle(task.title) : ""

        task.description ? setTaskDescription(task.description) : ""

    }, [])
    return (
        <TableRow className="text-lg hover:bg-dark/60">
            <TableCell className="font-medium">
                <input type="text"
                    value={taskTitle}
                    onChange={e => setTaskTitle(e.target.value)}
                    className='bg-dark py-1 w-3/4 px-2 rounded-sm' /></TableCell>
            <TableCell>
                <input type="text"
                    value={startTime}
                    onChange={e => setStartTime(e.target.value)}
                    className='bg-dark py-1 w-18 text-center rounded-sm' />
            </TableCell>
            <TableCell>
                <input type="text" value={endTime}
                    onChange={e => setEndTime(e.target.value)}
                    className='bg-dark py-1 w-18 text-center rounded-sm' />
            </TableCell>
            <TableCell>
                <textarea
                    value={taskDescription}
                    onChange={e => setTaskDescription(e.target.value)}
                    className='w-9/10 overflow-hidden text-sm h-20
               bg-dark rounded-lg outline-0 p-2'></textarea>
            </TableCell>
            <TableCell className="text-right flex items-center mt-6">
                <button onClick={() => editTask(task._id)} className='bg-green-800 py-1.5 px-3 text-sm rounded-lg cursor-pointer'>ذخیره</button>
                <button className='bg-red-700 py-1.5 px-3 text-sm rounded-lg cursor-pointer mr-3'>حذف</button>
                {!task.endTime && 
                <button className='p-1.5 text-sm rounded-sm cursor-pointer mr-5'>
                    <Stop onClick={() => stopTaskHandler(task._id)} className='text-lg text-red-700' />
                </button>
                }
            </TableCell>
        </TableRow>
    )
}

export default TableItem
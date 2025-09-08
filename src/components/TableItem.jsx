import React, { useEffect, useState } from 'react'
import { TableCell, TableRow } from './ui/table'
import moment from 'moment-jalaali';
import { deleteTask, putEditTime, stopTask } from '@/api/timesApi';
import getLocalStorage from '@/utils/getLocalStorage';
import icons from '@/icons';
import { toast } from 'sonner';
import { formatMinutesToHHMM } from '@/utils/changeDurationTimeFormat';

const TableItem = ({ mobileItem, task, reloadFetchTask }) => {

    const { Stop } = icons
    const [taskTitle, setTaskTitle] = useState("")
    const [taskDescription, setTaskDescription] = useState("")
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("")
    const [durationTime, setDurationTime] = useState(null)

    const token = getLocalStorage('token')


    const editTask = (taskId) => {

        const newTask = {
            title: taskTitle,
            description: taskDescription,
            startTime: convertToISOString(startTime),
            endTime: endTime ? convertToISOString(endTime) : ""
        };

        if (moment(newTask.startTime).isAfter(moment(newTask.endTime))) {
            console.log("Log!!!!!");
            newTask.startTime = moment(newTask.startTime).subtract(1, "day").toISOString();
        }

        putEditTime(taskId, newTask, token)
            .then(res => {
                toast.success("با موفقیت تغییر کرد")
            });
    };

    const deleteTaskHandler = (id) => {
        deleteTask(id, token)
            .then(res => reloadFetchTask())
    }

    const stopTaskHandler = (id) => {
        stopTask(id, token)
            .then(res => setEndTime(changeTimeFormat(res.data.timeEntry.endTime)))
    }

    const convertToISOString = (timeStr) => {
        const date = new Date();

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

    const calDurationTime = (startTime) => {
        return moment().diff(moment(startTime), "minutes");
    }
    useEffect(() => {
        const updateDuration = () => {
            if (task.durationMinutes) {
                setDurationTime(formatMinutesToHHMM(task.durationMinutes))
            } else {
                const durationMinuteTime = calDurationTime(task.startTime)
                setDurationTime(formatMinutesToHHMM(durationMinuteTime))
            }
        }
        updateDuration()
        const intervalId = setInterval(updateDuration, 60000)

        task.startTime ? setStartTime(changeTimeFormat(task.startTime)) : setStartTime("")
        task.endTime ? setEndTime(changeTimeFormat(task.endTime)) : setEndTime("")
        task.title ? setTaskTitle(task.title) : ""
        task.description ? setTaskDescription(task.description) : ""

        return () => clearInterval(intervalId)
    }, [])
    return (
        <>
            {!mobileItem ?
                <TableRow className="text-lg hover:bg-dark/60">
                    <TableCell className="font-medium">
                        <input type="text"
                            value={taskTitle}
                            onChange={e => setTaskTitle(e.target.value)}
                            className='bg-dark py-2 w-4/5 px-2 rounded-sm text-sm' /></TableCell>
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
                        <p>{durationTime}</p>
                    </TableCell>
                    <TableCell>
                        <textarea
                            value={taskDescription}
                            onChange={e => setTaskDescription(e.target.value)}
                            className='w-9/10 overflow-hidden text-sm h-20
               bg-dark rounded-lg outline-0 p-2'></textarea>
                    </TableCell>
                    <TableCell className="text-right flex items-center mt-6">
                        <button onClick={() => editTask(task._id)}
                            className='bg-green-800 py-1.5 px-3 text-sm rounded-lg cursor-pointer hover:bg-green-900 duration-300'>
                            ذخیره
                        </button>
                        <button onClick={() => deleteTaskHandler(task._id)}
                            className='bg-red-700 py-1.5 px-3 text-sm rounded-lg cursor-pointer mr-3 hover:bg-red-800 duration-300'>حذف</button>
                        {!endTime &&
                            <button onClick={() => stopTaskHandler(task._id)} className='p-1.5 text-sm rounded-sm cursor-pointer mr-5'>
                                <Stop className='text-lg text-red-700 hover:text-red-800 duration-300' />
                            </button>
                        }
                    </TableCell>
                </TableRow>
                :
                <div className='last:border-0 border-b border-gray-300 py-8 sm:hidden'>
                    <div className='flex items-center gap-5'>
                        <h2 className='text-lg'>تیتر:</h2>
                        <input type="text"
                            value={taskTitle}
                            onChange={e => setTaskTitle(e.target.value)}
                            className='bg-dark p-2 w-full rounded-sm' />
                    </div>
                    <div className='mt-8 flex justify-between '>
                        <div className='flex items-center gap-2'>
                            <h2 className='text-lg'>شروع:</h2>
                            <input type="text"
                                value={startTime}
                                onChange={e => setStartTime(e.target.value)}
                                className='bg-dark py-1 w-18 text-center rounded-sm' />
                        </div>
                        <div className='flex items-center gap-2'>
                            <h2 className='text-lg'>پایان:</h2>
                            <input type="text" value={endTime}
                                onChange={e => setEndTime(e.target.value)}
                                className='bg-dark py-1 w-18 text-center rounded-sm' />
                        </div>
                    </div>
                    <div className='flex items-center gap-2 mt-8 text-white font-Vazirmatn-Bold text-lg'>
                        <h2 className='text-lg'>مدت:</h2>
                        <p>{durationTime}</p>
                    </div>
                    <div className='flex items-center gap-5 mt-8'>
                        <h2 className='text-lg'>تیتر:</h2>
                        <textarea
                            value={taskDescription}
                            onChange={e => setTaskDescription(e.target.value)}
                            className='w-9/10 overflow-hidden text-sm h-20
                            bg-dark rounded-lg outline-0 p-2 '></textarea>
                    </div>
                    <div className='mt-8 flex justify-center items-center'>
                        <button onClick={() => editTask(task._id)} className='bg-green-800 py-1.5 px-3 rounded-lg cursor-pointer'>ذخیره</button>
                        <button onClick={() => deleteTaskHandler(task._id)}
                            className='bg-red-700 py-1.5 px-3 rounded-lg cursor-pointer mr-3'>حذف</button>
                        {!endTime &&
                            <button onClick={() => stopTaskHandler(task._id)} className='p-1.5 rounded-sm cursor-pointer mr-5'>
                                <Stop className='text-lg text-red-700' />
                            </button>
                        }
                    </div>
                </div>
            }

        </>
    )
}

export default TableItem
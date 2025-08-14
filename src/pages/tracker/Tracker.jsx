import React, { useEffect, useState } from 'react'
import TopTracker from './TopTracker'
import moment from 'moment-jalaali';
import PrimaryTable from '@/components/ui/PrimaryTable';
import getLocalStorage from '@/utils/getLocalStorage';
import { getTimes } from '@/api/timesApi';
import ReadOnlyTable from '@/components/ReadOnlyTable';
import { Link } from 'react-router-dom';
import { formatMinutesToHHMM } from '@/utils/changeDuratonTimeFormat';

const Tracker = () => {
    const [tasks, setTasks] = useState(null)
    const [totalTime, setTotalTime] = useState(0)
    const [selectedDate, setSelectedDate] = useState(moment());
    const [otherUserId, setOtherUserId] = useState("")

    const token = getLocalStorage('token')
    const userId = getLocalStorage('id')

    const backOneDay = () => {
        setSelectedDate(prev => prev.clone().subtract(1, 'day'))
    }

    const forwardOneDay = () => {
        setSelectedDate(prev => prev.clone().add(1, 'day'))
    }

    const changeUser = (value) => {
        value !== userId ? setOtherUserId(value) : setOtherUserId(null)
    }


    const getTasks = () => {
        getTimes(selectedDate.format("YYYY-MM-DD"), token)
            .then(res => {
                setTasks(res.data.tasks)
                setTotalTime(res.data.totalMinutes)
            })
    }

    useEffect(() => {
        !otherUserId ? getTasks() : ""
    }, [selectedDate])

    return (
        <main className='py-10'>
            <div className="container">
                <TopTracker
                    backOneDay={backOneDay}
                    forwardOneDay={forwardOneDay}
                    selectedDate={selectedDate}
                    reloadFetchTask={getTasks}
                    changeUser={changeUser} />
                <section className='mt-12 bg-darker rounded-lg p-5 flex justify-between items-center'>
                    <h2 className='text-2xl'>مجموع : {formatMinutesToHHMM(totalTime)}</h2>
                    <Link className='text-xl' to={`/report?currentDay=${selectedDate.format("YYYY-MM-DD")}`}>گزارش</Link>
                </section>
                <section className='mt-12'>
                    {!otherUserId ?
                        < PrimaryTable tasks={tasks} reloadFetchTask={getTasks} />
                        :
                        < ReadOnlyTable selectedDate={selectedDate} userId={otherUserId} setTotalTime={setTotalTime} />
                    }
                </section>
            </div>
        </main>
    )
}

export default Tracker
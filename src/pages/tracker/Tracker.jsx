import React, { useEffect, useState } from 'react'
import TopTracker from './TopTracker'
import moment from 'moment-jalaali';
import PrimaryTable from '@/components/ui/PrimaryTable';
import getLocalStorage from '@/utils/getLocalStorage';
import { getTimes } from '@/api/timesApi';
import ReadOnlyTable from '@/components/ReadOnlyTable';
import { Link } from 'react-router-dom';
import { formatMinutesToHHMM } from '@/utils/changeDurationTimeFormat';
import icons from '@/icons';


const Tracker = () => {
    const { AngleRight } = icons

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
    }, [selectedDate,otherUserId])

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
                    <h2 className='text-lg sm:text-2xl'>مجموع : {formatMinutesToHHMM(totalTime)}</h2>
                    <Link
                        className='sm:text-xl bg-dark hover:bg-dark/50 duration-300 py-2 px-4 flex 
                        justify-center items-center rounded-sm'
                        to={`/report?currentDay=${selectedDate.format("YYYY-MM-DD")}`}>
                        گزارش
                        <AngleRight className='rotate-180 mr-2' />
                    </Link>
                </section>
                <section className='mt-12'>
                    {!otherUserId ?
                        <PrimaryTable tasks={tasks} reloadFetchTask={getTasks} />
                        :
                        <ReadOnlyTable selectedDate={selectedDate} userId={otherUserId} setTotalTime={setTotalTime} />
                    }
                </section>
            </div>
        </main>
    )
}

export default Tracker
import React, { useEffect, useState } from 'react'
import TopTracker from './TopTracker'
import moment from 'moment-jalaali';
import PrimaryTable from '@/components/ui/PrimaryTable';
import getLocalStorage from '@/utils/getLocalStorage';
import { getTimes } from '@/api/timesApi';

const Tracker = () => {
    const [tasks, setTasks] = useState(null)
    const [selectedDate, setSelectedDate] = useState(moment());

    const backOneDay = () => {
        setSelectedDate(prev => prev.clone().subtract(1, 'day'))
    }

    const forwardOneDay = () => {
        setSelectedDate(prev => prev.clone().add(1, 'day'))
    }

    const token = getLocalStorage('token')

    const getTasks = () => {
        getTimes(selectedDate.format("YYYY-MM-DD"), token)
            .then(res => setTasks(res.data.tasks))
    }
    useEffect(() => {
        getTasks()
    }, [selectedDate])

    return (
        <main className='py-10'>
            <div className="container">
                <TopTracker
                    backOneDay={backOneDay}
                    forwardOneDay={forwardOneDay}
                    selectedDate={selectedDate}
                    reloadFetchTask={getTasks} />
                <section className='mt-12'>
                    <PrimaryTable tasks={tasks} reloadFetchTask={getTasks} />
                </section>
            </div>
        </main>
    )
}

export default Tracker
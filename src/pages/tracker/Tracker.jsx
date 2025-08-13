import React, { useEffect, useState } from 'react'
import TopTracker from './TopTracker'
import moment from 'moment-jalaali';
import TrackerTable from './TrackerTable';
import { getTimes } from '@/api/timesApi';

const Tracker = () => {
    const [times,setTimes] = useState(null)
    const [selectedDate , setSelectedDate] = useState(moment());
    
    const backOneDay = () => {
        setSelectedDate(prev => prev.clone().subtract(1, 'day'))
    }

    const forwardOneDay = () => {
        setSelectedDate(prev => prev.clone().add(1, 'day'))
    }

    useEffect(() => {
        getTimes(selectedDate)
        .then(res => console.log(res))
    },[])

    return (
        <main className='py-10'>
            <div className="container">
                <TopTracker
                    backOneDay={backOneDay}
                    forwardOneDay={forwardOneDay}
                    selectedDate={selectedDate} />
                    <section>
                        
                    </section>
                    <TrackerTable />
            </div>
        </main>
    )
}

export default Tracker
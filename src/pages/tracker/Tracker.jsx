import React, { useEffect, useState } from 'react'
import TopTracker from './TopTracker'
import moment from 'moment-jalaali';
import TrackerTable from './TrackerTable';
import { getTimes } from '@/api/timesApi';
import getLocalStorage from '@/utils/getLocalStorage';

const Tracker = () => {
    const [times,setTimes] = useState(null)
    const [selectedDate , setSelectedDate] = useState(moment());
    
    const backOneDay = () => {
        setSelectedDate(prev => prev.clone().subtract(1, 'day'))
    }

    const forwardOneDay = () => {
        setSelectedDate(prev => prev.clone().add(1, 'day'))
    }

    const token = getLocalStorage('token')

    useEffect(() => {
        // getTimes(selectedDate.format("YYYY-MM-DD") , token)
        // .then(response => console.log(response))
    },[selectedDate])

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
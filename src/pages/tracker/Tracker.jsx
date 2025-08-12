import React, { useState } from 'react'
import TopTracker from './TopTracker'
import moment from 'moment-jalaali';
import TrackerTable from './TrackerTable';

const Tracker = () => {
    const [selectedDate , setSelectedDate] = useState(moment());
    

    const backOneDay = () => {
        setSelectedDate(prev => prev.clone().subtract(1, 'day'))
    }

    const forwardOneDay = () => {
        setSelectedDate(prev => prev.clone().add(1, 'day'))
    }

    return (
        <main className='py-10'>
            <div className="container">
                <TopTracker
                    backOneDay={backOneDay}
                    forwardOneDay={forwardOneDay}
                    selectedDate={selectedDate} />
                    <TrackerTable />
            </div>
        </main>
    )
}

export default Tracker
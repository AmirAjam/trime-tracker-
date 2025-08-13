import PrimaryTable from '@/components/ui/PrimaryTable'
import React from 'react'

const TrackerTable = ({tasks}) => {
  return (
    <section className='mt-20 bg-darker rounded-lg'>
        <PrimaryTable tasks={tasks}/>
    </section>
)
}

export default TrackerTable
import React, { useState } from 'react'
import { TableCell, TableRow } from './ui/table'

const TableItem = ({ invoice }) => {
    const [timeStart, setTimeStart] = useState("")
    const [timeEnd, setTimeEnd] = useState("")

    const sendNewValue = () => {
        console.log("changeTimeFormat =>" , changeTimeFormat(timeStart))
    }

    const changeTimeFormat = (value) => {
        const now = new Date();

        const [hours, minutes] = value.split(':').map(Number);

        now.setHours(hours);
        now.setMinutes(minutes);
        now.setSeconds(0);
        now.setMilliseconds(0);

        return now
    }
    return (
        <TableRow className="text-lg hover:bg-dark/60">
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>
                <input type="text" value={timeStart}
                    onChange={e => setTimeStart(e.target.value)}
                    className='bg-dark py-1 w-18 text-center rounded-sm' />
            </TableCell>
            <TableCell>
                <input type="text" value={timeEnd}
                    onChange={e => setTimeEnd(e.target.value)}
                    className='bg-dark py-1 w-18 text-center rounded-sm' />
            </TableCell>
            <TableCell>
                <textarea name="" value={invoice.desc} id="" className='w-9/10 overflow-hidden text-sm h-20
               bg-dark rounded-lg outline-0 px-2'></textarea>
            </TableCell>
            <TableCell className="text-right">
                <button onClick={sendNewValue} className='bg-green-800 py-1.5 px-3 text-sm rounded-lg cursor-pointer'>ذخیره</button>
                <button className='bg-red-800 py-1.5 px-3 text-sm rounded-lg cursor-pointer mr-5'>حذف</button>
            </TableCell>
        </TableRow>
    )
}

export default TableItem
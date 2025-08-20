
import React, { useEffect, useState } from 'react'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import getLocalStorage from '@/utils/getLocalStorage';
import moment from 'moment-jalaali';
import { getAllUsersDailyTime, getAllUsersWeeklyTime } from '@/api/reportApi';
import { Link, useSearchParams } from 'react-router-dom';
import { formatMinutesToHHMM } from '@/utils/changeDurationTimeFormat';
import icons from '@/icons';

const Report = () => {
    const { AngleRight } = icons
    const [weeklyLeaderboard, setWeeklyLeaderboard] = useState(null)
    const [dailyLeaderboard, setDailyLeaderboard] = useState(null)
    const [searchParams] = useSearchParams();

    const currentDay = searchParams.get("currentDay");
    const saturday = moment(currentDay, "YYYY-MM-DD").clone().startOf("week").format("YYYY-MM-DD");

    const token = getLocalStorage('token')
    useEffect(() => {
        getAllUsersDailyTime(currentDay, token)
            .then(res => setDailyLeaderboard(res.data.leaderboard))

        getAllUsersWeeklyTime(saturday, currentDay, token)
            .then(res => setWeeklyLeaderboard(res.data.leaderboard))

        console.log(dailyLeaderboard)
    }, [])
    return (
        <div className='container mt-12'>
            <div>
                <div className='flex justify-between items-center mb-5'>
                    <h2 className='text-2xl'>جدول روزانه</h2>
                    <Link to="/" className="bg-dark hover:bg-dark/50 duration-300 rounded-sm py-2 px-4 flex justify-center items-center">
                        صفحه اصلی
                        <AngleRight className='rotate-180 mr-2' />
                    </Link>
                </div>
                <Table className="bg-darker rounded-lg text-center ">
                    <TableHeader>
                        <TableRow className="text-white! hover:bg-dark/60">
                            <TableHead className="w-1/3 text-center text-white">رنک</TableHead>
                            <TableHead className="text-center w-1/3 text-white">اسم</TableHead>
                            <TableHead className="text-center w-1/3 text-white">مدت کد</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dailyLeaderboard?.map(user => {
                            return (
                                <TableRow key={user.userId} className="text-lg hover:bg-dark/60">
                                    <TableCell>
                                        <p>{user.rank}</p>
                                    </TableCell>
                                    <TableCell>
                                        <p>{user.name}</p>
                                    </TableCell>
                                    <TableCell>
                                        <span className='mt-1 inline-block'>{formatMinutesToHHMM(user.totalMinutes)}</span>
                                        {user.isActiveTask ?
                                            <span className='bg-green-700 text-sm py-1 rounded-sm mr-5 w-16 inline-block'>فعال</span>
                                            :
                                            <span className='bg-red-700 text-sm py-1 rounded-sm mr-5 w-16 inline-block'>غیرفعال</span>

                                        }
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
            <div className='my-16'>
                <h2 className='text-2xl mb-5'>جدول هفتگی</h2>
                <Table className="bg-darker rounded-lg text-center ">
                    <TableHeader>
                        <TableRow className="text-white! hover:bg-dark/60">
                            <TableHead className="w-1/3 text-center text-white">رنک</TableHead>
                            <TableHead className="text-center w-1/3 text-white">اسم</TableHead>
                            <TableHead className="text-center w-1/3 text-white">مدت کد</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {weeklyLeaderboard?.map(user => {
                            return (
                                <TableRow key={user.userId} className="text-lg hover:bg-dark/60">
                                    <TableCell>
                                        <p>{user.rank}</p>
                                    </TableCell>
                                    <TableCell>
                                        <p>{user.name}</p>
                                    </TableCell>
                                    <TableCell>
                                        <p>{formatMinutesToHHMM(user.totalMinutes)}</p>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}


export default Report
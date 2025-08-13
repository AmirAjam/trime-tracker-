import React from 'react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import TableItem from '../TableItem';
import { getTimes } from '@/api/timesApi';

const PrimaryTable = ({tasks,reloadFetchTask}) => {

  return (
    <Table className="bg-darker rounded-lg">
      <TableHeader>
        <TableRow className="text-white! hover:bg-dark/60">
          <TableHead className="w-1/4 text-right text-white">تیتر</TableHead>
          <TableHead className="text-right w-1/10 text-white">شروع</TableHead>
          <TableHead className="text-right w-1/10 text-white">پایان</TableHead>
          <TableHead className="text-right w-2/5 text-white">توضیحات</TableHead>
          <TableHead className="text-right w-2/10 text-white">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks?.map((task) => (
          <TableItem key={task._id} task={task} reloadFetchTask={reloadFetchTask} />
        ))}
      </TableBody>
    </Table>
  )
}

export default PrimaryTable
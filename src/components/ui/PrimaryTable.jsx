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


const invoices = [
  {
    invoice: "پروژه time tracker",
    start: "12:05",
    end: "12:20",
    desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "پروژه time tracker",
    start: "12:05",
    end: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "پروژه time tracker",
    start: "12:05",
    end: "$250.00",
    paymentMethod: "Credit Card",
  },
]

const PrimaryTable = () => {
  const [times, setTimes] = React.useState(invoices.map(i => i.start));
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
        {invoices.map((invoice,index) => (
          <TableItem key={index} invoice={invoice}/>
        ))}
      </TableBody>
    </Table>
  )
}

export default PrimaryTable
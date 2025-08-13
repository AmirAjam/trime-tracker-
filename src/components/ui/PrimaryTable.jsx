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
      {/* <TableBody>
        {invoices.map((invoice) => (
          <TableRow className="text-lg hover:bg-dark/60" key={crypto.randomUUID()}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>
              <input type="text" value={invoice.start} className='bg-dark py-1 w-18 text-center rounded-sm' />
            </TableCell>
            <TableCell>
              <input type="text" value={invoice.end} className='bg-dark py-1 w-18 text-center rounded-sm' />
            </TableCell>
            <TableCell>
              <textarea name="" value={invoice.desc} id="" className='w-9/10 overflow-hidden text-sm h-20
               bg-dark rounded-lg outline-0 px-2'></textarea>
            </TableCell>
            <TableCell className="text-right">
              <button className='bg-green-800 py-1.5 px-3 text-sm rounded-lg cursor-pointer'>ذخیره</button>
              <button className='bg-red-800 py-1.5 px-3 text-sm rounded-lg cursor-pointer mr-5'>حذف</button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody> */}
    </Table>
  )
}

export default PrimaryTable
'use client'

import { Card } from "@radix-ui/themes"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function JurusanPage() {
    return (
        <Card  className="m-6">
            <h1 className="text-2xl font-bold mb-2">User Management</h1>
            <p>manage your users here.</p>
           <Table className="mt-4">
                <TableHeader>
                    <TableRow>
                    <TableHead >Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                    <TableCell>INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell>$250.00</TableCell>
                    </TableRow>
                </TableBody>
</Table>
        </Card>
    )
}
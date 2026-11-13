'use client'

import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react";
import { Card } from "@radix-ui/themes";

export default function Category() {
  return (
    <Card className="m-6">

      <div className="flex justify-end mb-4">
        <Link href="/admin/category/form">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold">
            <Plus className="mr-2 h-4 w-4" /> Category
          </Button>
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">Category</h1>
      <p>Kelola Category SMK MVP ARS INTERNASIONAL</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
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
  );
}
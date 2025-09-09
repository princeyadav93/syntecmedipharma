'use client';

import React, { useEffect, useState } from 'react';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import * as XLSX from 'xlsx';
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';
import 'react-datepicker/dist/react-datepicker.css';
import { AnimatePresence, motion } from 'framer-motion';

type FormData = {
    _id: string;
    name: string;
    address: string;
    pincode?: string;
    phone: string;
    consent: boolean;
    createdAt: string; // coming from timestamps
};

const columnHelper = createColumnHelper<FormData>();

export default function DataTable() {
    const [data, setData] = useState<FormData[]>([]);
    const [loading, setLoading] = useState(false);

    const [globalFilter, setGlobalFilter] = useState('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    // ✅ Fetch Data (helper)
    async function fetchData(start?: string, end?: string) {
        setLoading(true);
        try {
            let url = '/api/form';
            if (start && end) {
                url += `?startDate=${start}&endDate=${end}`;
            }
            const res = await fetch(url, { cache: 'no-store' });
            const json = await res.json();
            setData(json);
        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    }

    // ✅ Default load (Yesterday’s data)
    useEffect(() => {
        const yStart = dayjs().subtract(1, 'day').startOf('day').toISOString();
        const yEnd = dayjs().subtract(1, 'day').endOf('day').toISOString();
        fetchData(yStart, yEnd);
    }, []);

    // ✅ Fetch on date range change
    useEffect(() => {
        if (startDate && endDate) {
            fetchData(startDate.toISOString(), endDate.toISOString());
        }
    }, [startDate, endDate]);

    // ✅ Quick filters
    function applyQuickFilter(type: 'today' | 'yesterday' | 'last7') {
        let s: Date, e: Date;

        if (type === 'today') {
            s = dayjs().startOf('day').toDate();
            e = dayjs().endOf('day').toDate();
        } else if (type === 'yesterday') {
            s = dayjs().subtract(1, 'day').startOf('day').toDate();
            e = dayjs().subtract(1, 'day').endOf('day').toDate();
        } else {
            s = dayjs().subtract(7, 'day').startOf('day').toDate();
            e = dayjs().endOf('day').toDate();
        }

        setStartDate(s);
        setEndDate(e);
        fetchData(s.toISOString(), e.toISOString());
    }

    // ✅ Columns
    const columns = [
        columnHelper.accessor('name', {
            header: 'Name',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('address', {
            header: 'Address',
            cell: (info) => info.getValue() || '----',
        }),
        columnHelper.accessor('phone', {
            header: 'Phone',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('pincode', {
            header: 'Pincode',
            cell: (info) => info.getValue() || '----', // default
        }),
    ];
    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
            pagination: {
                pageIndex: 0,
                pageSize: 10, // default show 10 rows
            },
        },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        globalFilterFn: (row, columnId, filterValue) => {
            const rawValue = row.getValue(columnId);
            const value = rawValue ? String(rawValue) : '';
            return value.toLowerCase().includes(filterValue.toLowerCase());
        },
    });

    // ✅ Excel Export
    const exportToExcel = () => {
        const exportData = table.getFilteredRowModel().rows.map((r) => ({
            ...r.original,
            address: r.original.address || '----',
            pincode: r.original.pincode || '----',
            submittedOn: dayjs(r.original.createdAt).format('DD-MM-YYYY HH:mm'),
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Forms');

        const filename =
            startDate && endDate
                ? `forms_${dayjs(startDate).format('DD-MM-YYYY')}_to_${dayjs(
                      endDate
                  ).format('DD-MM-YYYY')}.xlsx`
                : `forms_${dayjs().format('DD-MM-YYYY')}.xlsx`;

        XLSX.writeFile(workbook, filename);
    };

    return (
        <div className="space-y-6 h-screen p-4 md:p-6">
            {/* Filters */}
            <div className="flex items-center gap-3 flex-wrap  p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                {/* Search */}
                <input
                    type="text"
                    placeholder="Search..."
                    value={globalFilter ?? ''}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-bg shadow-sm"
                />

                {/* Date Range */}
                <div className="flex gap-3 items-center">
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        placeholderText="Start Date"
                        dateFormat="dd-MM-yyyy"
                        className="border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-bg shadow-sm"
                    />
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        placeholderText="End Date"
                        dateFormat="dd-MM-yyyy"
                        className="border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-bg shadow-sm"
                    />
                </div>

                {/* Quick Filter Buttons */}
                <div className="flex gap-2">
                    {['today', 'yesterday', 'last7'].map((type) => (
                        <button
                            key={type}
                            onClick={() =>
                                applyQuickFilter(
                                    type as 'today' | 'yesterday' | 'last7'
                                )
                            }
                            className="px-4 py-2 rounded-full text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm cursor-pointer"
                        >
                            {type === 'today' && 'Today'}
                            {type === 'yesterday' && 'Yesterday'}
                            {type === 'last7' && 'Last 7 Days'}
                        </button>
                    ))}
                </div>

                {/* Export */}
                <button
                    onClick={exportToExcel}
                    className="px-5 py-2 rounded-full text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition shadow-sm cursor-pointer"
                >
                    Export Excel
                </button>
            </div>

            {/* Table */}
            <div className="overflow-hidden border rounded-xl shadow-lg">
                {loading ? (
                    <p className="p-6 text-center text-gray-500">Loading...</p>
                ) : (
                    <table className="min-w-full border-collapse text-sm">
                        <thead>
                            {table.getHeaderGroups().map((hg) => (
                                <tr key={hg.id}>
                                    {hg.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            className="px-5 py-3 font-semibold border-b text-left uppercase tracking-wide text-xs"
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <AnimatePresence>
                            <tbody>
                                {table.getRowModel().rows.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <motion.tr
                                            key={row.id}
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            transition={{ duration: 0.15 }}
                                        >
                                            {row
                                                .getVisibleCells()
                                                .map((cell) => (
                                                    <td
                                                        key={cell.id}
                                                        className="px-5 py-3 border-b"
                                                    >
                                                        {flexRender(
                                                            cell.column
                                                                .columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </td>
                                                ))}
                                        </motion.tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={columns.length}
                                            className="text-center py-6 text-gray-500"
                                        >
                                            No data found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </AnimatePresence>
                    </table>
                )}

                {/* Pagination */}
                <div className="flex items-center justify-between px-5 py-3 ">
                    <div className="text-sm">
                        Page {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount()}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="px-4 py-1.5 rounded-full text-sm border disabled:opacity-40 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer"
                        >
                            Prev
                        </button>
                        <button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="px-4 py-1.5 rounded-full text-sm border disabled:opacity-40 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer"
                        >
                            Next
                        </button>
                        <select
                            value={table.getState().pagination.pageSize}
                            onChange={(e) =>
                                table.setPageSize(Number(e.target.value))
                            }
                            className="ml-3 px-3 py-1.5 rounded-lg border text-sm bg-bg cursor-pointer"
                        >
                            {[10, 20, 50, 100].map((size) => (
                                <option key={size} value={size}>
                                    Show {size}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

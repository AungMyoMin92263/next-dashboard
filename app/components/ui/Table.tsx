'use client'

import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useProperty} from "@/app/components/property-provider";
import { useRouter } from 'next/navigation';
interface TableProps {
    columns: string[];
    data: any[];
    striped?: boolean;
    bordered?: boolean;
    hover?: boolean;
}

const Table: React.FC<TableProps> = ({
                                         columns,
                                         data,
                                         striped = false,
                                         bordered = false,
                                         hover = false,
                                     }) => {
    const [searchTerms, setSearchTerms] = useState<{ [key: string]: string }>({});
    const [submittedDate, setSubmittedDate] = useState<Date | null>(null);
    const { property, setProperty } = useProperty();
    const router = useRouter();

    console.log("property", property);
    // Handle search term changes
    const handleSearchChange = (column: string, value: string) => {
        setSearchTerms((prev) => ({
            ...prev,
            [column]: value,
        }));
    };

    // Filter rows based on search terms and date
    const filteredData = data.filter((row) => {
        const matchesSearchTerms = columns.every((column) =>
            row[column]
                ?.toString()
                .toLowerCase()
                .includes(searchTerms[column]?.toLowerCase() || "")
        );

        const matchesDate = submittedDate
            ? new Date(row["Submitted On"]).toLocaleDateString() === submittedDate.toLocaleDateString()
            : true;

        return matchesSearchTerms && matchesDate;
    });


    const handleRowClick = (id) => {
        // Navigate to the detail page for the clicked row
        router.push(`/guests/registration/${id}`);
    };


    return (
        <div className="">
            <table
                className={`table ${
                    striped ? "table-striped" : ""
                } ${bordered ? "table-bordered" : ""} ${hover ? "table-hover" : ""} table-auto w-full text-sm md:text-base`}
            >
                <thead className="bg-gray-100">
                <tr>
                    {columns.map((column, index) => (
                        <th key={index} className="px-4 py-2 text-left">
                            {column}
                        </th>
                    ))}
                    <th className="px-4 py-2 text-left">Submitted On</th>
                </tr>
                <tr>
                    {columns.map((column, index) => (
                        <th key={index} className="px-4 py-2 text-left cursor-pointer">
                            <input
                                type="text"
                                placeholder={`Search ${column}`}
                                value={searchTerms[column] || ""}
                                onChange={(e) =>
                                    handleSearchChange(column, e.target.value)
                                }
                                className="form-control p-2"
                            />
                        </th>
                    ))}
                    <th className="px-4 py-2 text-left">
                        <ReactDatePicker
                            selected={submittedDate}
                            onChange={(date: Date) => setSubmittedDate(date)}
                            className="form-control p-2"
                            placeholderText="Filter by date"
                            dateFormat="yyyy-MM-dd"
                        />
                    </th>
                </tr>
                </thead>
                <tbody>
                {filteredData.map((row, index) => (
                    <tr
                        key={index}
                        className={`${striped && index % 2 === 0 ? "bg-gray-50" : ""} cursor-pointer` }
                        onClick={() => handleRowClick(row.id)}
                    >
                        {columns.map((column, idx) => (
                            <td key={idx} className="px-4 py-2">
                                {row[column]}
                            </td>
                        ))}
                        <td className="px-4 py-2">{row["Submitted On"]}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;

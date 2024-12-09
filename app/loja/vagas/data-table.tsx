"use client";

import React, { useState, useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ButtonNewVehicle } from "@/components/_my_components/ButtonNewVehicle";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends { plate?: string }, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [filterText, setFilterText] = useState("");

  // UseMemo para evitar recalcular o filtro a cada renderização
  const filteredData = useMemo(() => {
    if (!filterText) return data;
    return data.filter((item) =>
      item.plate?.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [filterText, data]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      {/* Input para o filtro */}
      <div className="flex justify-evenly items-center">
        <div className="p-4 text-gray-600 w-[90%]">
          <input
            type="text"
            placeholder="Buscar por placa"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full border rounded-md p-2"
          />
        </div> 
        <div>
          <ButtonNewVehicle/>
        </div>
      </div>
      

      {/* Tabela */}
      <div className="max-h-[400px] overflow-y-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

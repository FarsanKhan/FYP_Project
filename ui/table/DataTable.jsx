import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import DataTablePagination from "./DataTablePagination";
import DataTableToolbar from "./DataTableToolbar";
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import DataTableRowActions from "./DataTableRowActions";

const DataTable = ({
  columns,
  data,
  count = -1,
  isSearchable,
  filterRoute,
  filters = {},
  dateFilter,
  isLoading,
  onAction,
  options = [],
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const {
    limit = 10,
    offset = 0,
    sortBy = "createdAt",
    order = "DESC",
    ...rest
  } = !filters || Array.isArray(filters) ? {} : filters;
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState({
    pageSize: parseInt(limit),
    pageIndex: offset == 0 ? 0 : parseInt(limit) / parseInt(offset),
  });

  const [columnVisibility, setColumnVisibility] = React.useState({
    search: false,
    dateRange: false,
  });

  const [columnFilters, setColumnFilters] = React.useState(
    Object.keys(rest).map((f) => {
      if (f === "startDate" || f === "endDate") {
        return {
          id: "dateRange",
          value: { startDate: rest.startDate, endDate: rest.endDate },
        };
      }
      return { id: f, value: rest[f] };
    })
  );

  const [sorting, setSorting] = React.useState([
    { id: sortBy, desc: order !== "ASC" },
  ]);

  const onFilterChange = (newFilters) => {
    const allFilters = {
      limit,
      offset,
      sortBy,
      order,
      ...filters,
      ...newFilters,
    };
    navigate(filterRoute || pathname + "?" + queryString.stringify(allFilters));
  };

  const table = useReactTable({
    data,
    columns: columns.map((col) => {
      if (col.id === "actions") {
        return {
          ...col,
          cell: ({ row }) => (
            <DataTableRowActions
              options={
                typeof options === "function" ? options(row.original) : options
              }
              onAction={(option) => onAction(option, row.original)}
            />
          ),
        };
      }
      return col;
    }),
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    enableRowSelection: false,
    manualFiltering: true,
    onRowSelectionChange: setRowSelection,
    manualSorting: true,
    onSortingChange: (s) => {
      const sortModel = s();
      if (sortModel.length > 0) {
        onFilterChange({
          sortBy: sortModel[0].id,
          order: sortModel[0].desc ? "DESC" : "ASC",
        });
      }
      setSorting(s);
    },
    onColumnFiltersChange: (updater) => {
      const filterModel = updater(columnFilters);
      const newFilters = {
        ...filterModel.reduce((acc, fM) => {
          if (fM.id === "dateRange") {
            acc = {
              ...acc,
              startDate: fM.value.startDate,
              endDate: fM.value.endDate,
            };
          } else {
            acc = {
              ...acc,
              [fM.id]: fM.value,
            };
          }
          return acc;
        }, {}),
      };

      onFilterChange(newFilters);
      setColumnFilters(updater);
    },
    manualPagination: true,
    pageCount: Math.ceil(count / pagination.pageSize),
    onPaginationChange: (updater) => {
      const paginationModel = updater(pagination);
      onFilterChange({
        limit: paginationModel.pageSize,
        offset: paginationModel.pageIndex * paginationModel.pageSize,
      });
      setPagination(updater);
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar
        table={table}
        dateFilter={dateFilter}
        isSearchable={isSearchable}
        onReset={() => {
          navigate(
            filterRoute ||
              pathname +
                "?" +
                queryString.stringify({
                  limit,
                  offset,
                  sortBy,
                  order,
                })
          );
        }}
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {isLoading ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="loader-lg"></div>
                    </div>
                  ) : (
                    "No results."
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
};

export default DataTable;

import { ReportMap, reports } from "../../lib/utils";
import DataTableColumnHeader from "../ui/table/DataTableColumnHeader";
import moment from "moment";

export const userColumns = [
  { accessorKey: "search", enableHiding: false },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "reportedBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reported By" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[450px] truncate">{row.getValue("reportedBy")}</div>
    ),
  },
  {
    accessorKey: "entity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Section" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[450px] truncate capitalize">
        {row.getValue("entity")}
      </div>
    ),
  },
  {
    accessorKey: "reason",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reason" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[450px] truncate">
        {ReportMap[row.getValue("reason")]?.label ?? row.getValue("reason")}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Creation Date" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[450px] truncate">
        {moment(row.getValue("createdAt")).format("MM/DD/YYYY hh:mm A")}
      </div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Updated" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[450px] truncate">
        {moment(row.getValue("updatedAt")).format("MM/DD/YYYY hh:mm A")}
      </div>
    ),
  },
  {
    id: "actions",
  },
];

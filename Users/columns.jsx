import DataTableColumnHeader from "../ui/table/DataTableColumnHeader";
import { AccountTypeMap, getRandomInitailsImage } from "../../lib/utils";
import moment from "moment";
import { Link } from "react-router-dom";

export const userColumns = [
  { accessorKey: "search", enableHiding: false },
  {
    accessorKey: "image",
    header: ({ column }) => <DataTableColumnHeader column={column} title="" />,
    cell: ({ row }) => (
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <img
          src={
            row.getValue("image")
              ? import.meta.env.VITE_API_BASE_URL + row.getValue("image")
              : row.original.type === "job_seeker"
              ? getRandomInitailsImage(row.original.name)
              : "/ghost-company.jpg"
          }
          alt="1"
          className="w-full h-full object-cover"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <Link to={`/app/users/${row.original.id}`}>
        <div className="max-w-[450px] hover:underline truncate">
          {row.getValue("name")}
        </div>
      </Link>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[450px] truncate">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[450px] truncate">{row.getValue("phone")}</div>
    ),
  },
  {
    accessorKey: "industry",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Industry" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[450px] truncate">{row.getValue("industry")}</div>
    ),
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[450px] truncate">{row.getValue("location")}</div>
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[450px] truncate">
        {AccountTypeMap[row.getValue("type")]}
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

import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "../button";
import DataTableViewOptions from "./DataTableViewOptions";
import DebouncedInput from "../DebouncedInput";
import { DatePickerWithRange } from "../DateRangePicker";
import { format } from "date-fns";

const DataTableToolbar = ({
  table,
  isSearchable = true,
  onReset,
  dateFilter,
}) => {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {isSearchable && (
          <DebouncedInput
            placeholder="Search"
            value={table.getColumn("search")?.getFilterValue() ?? ""}
            onChange={(value) => {
              table.getColumn("search")?.setFilterValue(value);
            }}
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}
        {dateFilter && (
          <div className="w-[150px] lg:w-[250px]">
            <DatePickerWithRange
              mode="range"
              selected={
                table.getColumn("dateRange")?.getFilterValue()
                  ? {
                      from: new Date(
                        (table
                          .getColumn("dateRange")
                          ?.getFilterValue()).startDate
                      ),
                      to: new Date(
                        (table.getColumn("dateRange")?.getFilterValue()).endDate
                      ),
                    }
                  : undefined
              }
              onSelect={(date) => {
                if (date) {
                  table.getColumn("dateRange")?.setFilterValue({
                    startDate: format(date.from, "yyyy-MM-dd"),
                    endDate: format(date.to, "yyyy-MM-dd"),
                  });
                } else {
                  table.getColumn("dateRange")?.setFilterValue(undefined);
                }
              }}
              placeholder="Select start and end date"
            />
          </div>
        )}
        {isFiltered ? (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
              onReset();
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        ) : null}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
};

export default DataTableToolbar;

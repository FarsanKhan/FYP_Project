import React, { useState } from "react";
import SidebarWrapper from "../ui/SidebarWrapper";
import DataTable from "../ui/table/DataTable";
import { userColumns } from "./columns";
import { TypographyH2 } from "../ui/typography";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteReport, getAllReports } from "../../api";
import queryString from "query-string";
import ReportDetails from "./ReportDetails";
import AlertDialog from "../ui/AlertDialog";
import toast from "react-hot-toast";

const Reports = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const filters = {
    limit: 10,
    offset: 0,
    sortBy: "createdAt",
    order: "DESC",
    ...queryString.parse(location.search),
  };

  const { data = { count: 0, results: [] }, isPending } = useQuery({
    queryKey: ["reports", filters],
    queryFn: () => getAllReports(filters),
  });

  const deleteReportMutation = useMutation({
    mutationFn: deleteReport,
    onSuccess: () => {
      setAlert(null);
      toast.success(`Report deleted successfully`, {
        position: "bottom-right",
      });
      queryClient.invalidateQueries({ queryKey: ["reports", filters] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const [alert, setAlert] = useState(null);

  const handleActions = (action, row) => {
    if (action.value === "details") {
      navigate(`/app/reports/${row.id}`);
    } else if (action.value === "delete") {
      setAlert(row);
    } else if (action.value === "delete-confirm") {
      deleteReportMutation.mutate(row.id);
    }
  };

  return (
    <SidebarWrapper>
      <div className="px-5 flex flex-col gap-6">
        <TypographyH2>Reports</TypographyH2>
        <div
          className="overflow-hidden"
          style={{ width: "calc(100vw - 342px)" }}
        >
          <div className="h-full flex-1 flex-col space-y-6">
            <DataTable
              options={[
                { label: "View Details", value: "details" },
                { label: "Delete", value: "delete" },
              ]}
              onAction={handleActions}
              isLoading={isPending}
              filters={filters}
              data={data.results}
              columns={userColumns}
              count={data.count}
            />
          </div>
        </div>
      </div>
      <Routes>
        <Route
          path="/:id"
          element={<ReportDetails onClose={() => navigate("/app/reports")} />}
        />
      </Routes>
      {alert && (
        <AlertDialog
          // isLoading={disableJobMutation.isPending}
          onClose={() => setAlert(null)}
          title="Are you sure, you would like to delete this report?"
          description="Deleting this report cannot be undone."
          onAction={() => handleActions({ value: "delete-confirm" }, alert)}
        />
      )}
    </SidebarWrapper>
  );
};

export default Reports;

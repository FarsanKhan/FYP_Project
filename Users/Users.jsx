import React, { useState } from "react";
import SidebarWrapper from "../ui/SidebarWrapper";
import DataTable from "../ui/table/DataTable";
import { userColumns } from "./columns";
import { TypographyH2 } from "../ui/typography";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { disableUser, enableUser, getAllUsers } from "../../api";
import queryString from "query-string";
import AlertDialog from "../ui/AlertDialog";
import toast from "react-hot-toast";
import BaseSheet from "../ui/BaseSheet";
import Profile from "../Profile/Profile";
import JobDetails from "../Jobs/JobDetails";
import { cn } from "../../lib/utils";

const Users = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();
  const filters = {
    limit: 10,
    offset: 0,
    sortBy: "createdAt",
    order: "DESC",
    ...queryString.parse(location.search),
  };

  const [alert, setAlert] = useState(null);
  const [job, setJob] = useState(null);

  const { data = { count: 0, results: [] }, isPending } = useQuery({
    queryKey: ["users", filters],
    queryFn: () => getAllUsers(filters),
  });

  const enableUserMutation = useMutation({
    mutationFn: enableUser,
    onSuccess: () => {
      toast.success("User enabled successfully", {
        position: "bottom-right",
      });
      queryClient.invalidateQueries({ queryKey: ["users", filters] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const disableUserMutation = useMutation({
    mutationFn: disableUser,
    onSuccess: () => {
      setAlert(null);
      toast.success("User disabled successfully", {
        position: "bottom-right",
      });
      queryClient.invalidateQueries({ queryKey: ["users", filters] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleActions = (action, row) => {
    if (action.value === "disable") {
      setAlert(row);
    } else if (action.value === "disable-confirm") {
      disableUserMutation.mutate(row.id);
    } else if (action.value === "enable") {
      enableUserMutation.mutate(row.id);
    } else if (action.value === "details") {
      navigate(`/app/users/${row.id}`);
    }
  };

  return (
    <SidebarWrapper>
      <div className="px-3 flex flex-col gap-6">
        <TypographyH2>Users</TypographyH2>
        <div
          className="overflow-hidden"
          style={{ width: "calc(100vw - 342px)" }}
        >
          <div className="h-full flex-1 flex-col space-y-6">
            <DataTable
              options={(row) => [
                { label: "View Details", value: "details" },
                ...(row.status === 1
                  ? [{ label: "Disable User", value: "disable" }]
                  : [{ label: "Enable User", value: "enable" }]),
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
          element={
            <BaseSheet
              onClose={() => {
                setJob(null);
                navigate("/app/users");
              }}
              title="User details"
              description="Showing all the details for this user"
              headerClassName={job ? "hidden" : ""}
              className={cn(
                "!max-w-[850px] overflow-auto",
                job ? "flex flex-col p-0" : ""
              )}
              hideClose={job}
            >
              {job ? (
                <JobDetails id={job.id} onBack={() => setJob(null)} />
              ) : (
                <Profile className="p-0 pt-4" onJobClick={setJob} />
              )}
            </BaseSheet>
          }
        />
      </Routes>
      {alert && (
        <AlertDialog
          isLoading={disableUserMutation.isPending}
          onClose={() => setAlert(null)}
          title="Are you sure, you would like to disable this user?"
          description="Disabling the user would terminate all of its job posts."
          onAction={() => handleActions({ value: "disable-confirm" }, alert)}
        />
      )}
    </SidebarWrapper>
  );
};

export default Users;

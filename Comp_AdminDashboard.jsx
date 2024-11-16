import React from "react";
import queryString from "query-string";
import SidebarWrapper from "../ui/SidebarWrapper";
import SummaryCard from "../ui/SummaryCard";
import PerformanceChart from "../ui/PerformanceChart";
import { DatePickerWithRange } from "../ui/DateRangePicker";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  getAnalyticsCount,
  getAnalyticsJobsByDay,
  getAnalyticsUsersByDay,
} from "../../api";
import moment from "moment";

const firstChartConfig = {
  jobSeekers: {
    label: "Job Seekers",
    color: "hsl(var(--chart-1))",
  },
  employers: {
    label: "Employers",
    color: "hsl(var(--chart-2))",
  },
};

const secondChartConfig = {
  jobsApplied: {
    label: "Jobs Applied",
    color: "hsl(var(--chart-1))",
  },
  jobsCreated: {
    label: "Jobs Created",
    color: "hsl(var(--chart-2))",
  },
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const filters = {
    ...queryString.parse(location.search),
  };

  const { data, isPending } = useQuery({
    queryKey: ["analytics-count", filters],
    queryFn: () => getAnalyticsCount(filters),
  });

  const { data: usersByDay = [] } = useQuery({
    queryKey: ["users-by-day", filters],
    queryFn: () => getAnalyticsUsersByDay(filters),
  });

  const { data: jobsByDay = [] } = useQuery({
    queryKey: ["jobs-by-day", filters],
    queryFn: () => getAnalyticsJobsByDay(filters),
  });

  const onDateChange = (dateRange) => {
    navigate(
      queryString.stringifyUrl({
        url: location.pathname,
        query: {
          from: moment(dateRange.from).format("MM-DD-YYYY"),
          to: moment(dateRange.to).format("MM-DD-YYYY"),
        },
      })
    );
  };

  return (
    <SidebarWrapper
      containerClassName="gap-6 flex flex-col overflow-auto"
      containerStyle={{ height: "calc(100vh - 64px)" }}
    >
      <div className="flex justify-items-end flex-col items-end">
        <DatePickerWithRange onChange={onDateChange} />
      </div>
      <div className="flex items-center gap-5">
        <SummaryCard
          isLoading={!data || isPending}
          icon="user"
          className="flex-1"
          label="Job Seekers"
          value={data ? data.jobSeekers : 0}
        />
        <SummaryCard
          icon="user"
          isLoading={!data || isPending}
          className="flex-1"
          label="Employers"
          value={data ? data.employers : 0}
        />
        <SummaryCard
          isLoading={!data || isPending}
          icon="job"
          className="flex-1"
          label="Jobs"
          value={data ? data.jobs : 0}
        />
      </div>
      <PerformanceChart
        chartData={usersByDay}
        title="Job Seekers & Employers"
        description="Showing total number of job seekers and employers who have joined the platform over the course of the above date range"
        chartConfig={firstChartConfig}
        keys={["jobSeekers", "employers"]}
      />
      <PerformanceChart
        chartData={jobsByDay}
        title="Jobs Applied & Created"
        description="Showing total number of jobs applied and created over the course of the above date range"
        chartConfig={secondChartConfig}
        keys={["jobsApplied", "jobsCreated"]}
      />
    </SidebarWrapper>
  );
};

export default AdminDashboard;

import React, { useState } from "react";
import JobPostInitial from "./JobPostInitial";
import JobPostDescription from "./JobPostDescription";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getJob, postJob, updateJob } from "../../api";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import JobPromote from "./JobPromote";

const JobPosting = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [values, setValues] = useState({});
  const [type, setType] = useState("initial");

  const { data, isPending } = useQuery({
    queryKey: ["job-" + id],
    queryFn: () => getJob(id),
    enabled: Boolean(id),
  });

  useEffect(() => {
    if (id && data && !values.id) setValues(data);
  }, [id, data]);

  const postJobMutation = useMutation({
    mutationFn: postJob,
    onSuccess: () => {
      navigate("/app/jobs");
      toast.success("Job posted successfully!", {
        position: "bottom-right",
      });
      queryClient.invalidateQueries({ queryKey: ["jobs_all"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const updateJobMutation = useMutation({
    mutationFn: updateJob,
    onSuccess: () => {
      navigate("/app/jobs");
      toast.success("Job updated successfully!", {
        position: "bottom-right",
      });
      queryClient.invalidateQueries({
        queryKey: ["job-" + id],
      });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const onSubmit = (e) => {
    if (type === "initial") {
      e.preventDefault();
      const formData = Object.fromEntries(new FormData(e.currentTarget));
      setValues({
        description: values.description,
        skills: values.skills,
        ...formData,
      });
      setType("description");
    } else if (type === "description") {
      if (id) {
        updateJobMutation.mutate({ ...values, ...e, id });
      } else {
        setValues({ ...values, ...e });
        setType("promotion");
      }
    } else if (type === "promotion") {
      postJobMutation.mutate({ ...values, ...e });
    }
  };

  return (
    <div
      className="w-full overflow-auto flex items-center justify-center mt-14 h-full"
      style={{ background: "#38434f" }}
    >
      {id && isPending && <div className="z-10 absolute loader-lg"></div>}
      {type === "initial" ? (
        <JobPostInitial onSubmit={onSubmit} values={values} />
      ) : type === "description" ? (
        <JobPostDescription
          values={values}
          onSubmit={onSubmit}
          isLoading={postJobMutation.isPending || updateJobMutation.isPending}
          onBack={() => setType("initial")}
        />
      ) : type === "promotion" ? (
        <JobPromote
          values={values}
          onSubmit={onSubmit}
          isLoading={postJobMutation.isPending}
        />
      ) : null}
    </div>
  );
};

export default JobPosting;




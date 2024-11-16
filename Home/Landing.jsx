import React, { useState } from "react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { TypographyH2, TypographyMuted, TypographyP } from "../ui/typography";
import { Input } from "../ui/input";
import Question from "../ui/Question";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { getFeaturedJobs, getPublicJobs } from "../../api";
import JobListItem from "../Jobs/JobListItem";
import Search from "../ui/search";
import AutocompleteInput from "../ui/AutocompleteInput";
import { Cities } from "../../lib/utils";
import { GoLocation } from "react-icons/go";

const companies = [
  "/companies/alfalah.png",
  "/companies/engro.png",
  "/companies/nestle.jpeg",
  "/companies/pepsico.jpeg",
  "/companies/uniliver.svg",
  "/companies/ubl.svg",
];

const items = [
  {
    title: "Easy Search",
    description:
      "Find your ideal job with our advanced search filters and personalized recommendations.",
    icon: "lighting",
  },
  {
    title: "Post Easily",
    description:
      "Employers can post job listings quickly and efficiently to reach the right talent.",
    icon: "ai",
  },
  {
    title: "Build Network",
    description:
      "Connect with industry professionals and expand your career opportunities.",
    icon: "lock",
  },
  {
    title: "Expert Advice",
    description:
      "Get career advice and tips from industry experts to boost your job search.",
    icon: "heart",
  },
  {
    title: "Video Interviews",
    description:
      "Streamline the hiring process with video interviews, enabling companies to connect with candidates remotely.",
    icon: "video",
  },
];

const questions = [
  {
    question: "How do I apply for jobs?",
    answer: `Employers can post jobs by creating an account, navigating to the
              'Post a Job' section, and filling out the job details. Your job
              listing will be reviewed and published promptly.`,
  },
  {
    question: "How can employers post jobs?",
    answer: `Employers can post jobs by creating an account, navigating to the 'Post a Job' section, and filling out the job details. Your job listing will be reviewed and published promptly.`,
  },
  {
    question: "Is there a fee for job seekers?",
    answer:
      "No, job seekers can use our platform for free. Create your profile, browse through job listings, and apply without any charges.",
  },
  {
    question: "Can I track my job applications?",
    answer:
      "Yes, you can track your job applications through your dashboard. You'll be able to see the status of each application and receive notifications for updates.",
  },
  {
    question: "What types of jobs are available?",
    answer:
      "We host a wide variety of job listings, including full-time, part-time, freelance, and remote positions across various industries such as technology, healthcare, finance, and more.",
  },
];

const Landing = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({});

  const { data: featuredJobs } = useQuery({
    queryKey: ["featuredJobs"],
    queryFn: () => getFeaturedJobs(),
    refetchOnMount: true,
  });

  const { data: publicJobs } = useQuery({
    queryKey: ["publicJobs", filters],
    queryFn: () => getPublicJobs(filters),
    enabled: Object.keys(filters).length > 0,
  });

  return (
    <div className="w-full h-full" id="landing">
      <div
        className="min-h-[1020px] sm:min-h-[900px] w-full"
        // style={{ background: "url(/landing.png)" }}
      >
        <div className="relative px-0 sm:px-5 pr-0 lg:pr-[5.5rem] pb-0 sm:pb-5 pt-1 sm:pt-5 flex-col sm:flex-row flex items-center justify-between">
          <div>
            <Link to="/">
              <div className="relative sm:absolute top-[-15px] left-0 sm:left-20">
                <img src="/logo.png" alt="logo" width={250} height={250} />
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-6 absolute sm:relative top-32 sm:top-auto">
            <Button
              className="text-base font-normal"
              variant="link"
              onClick={() => navigate("/login")}
            >
              Home
            </Button>
            <Button
              className="text-base font-normal"
              variant="link"
              onClick={() => navigate("/login")}
            >
              Jobs
            </Button>
            <Button
              className="text-base font-normal"
              variant="link"
              onClick={() => navigate("/login")}
            >
              Sign in
            </Button>
            <Button
              className="text-sm font-semibold bg-blue-500 border-blue-500 "
              onClick={() => navigate("/signup")}
            >
              Try for free
            </Button>
          </div>
        </div>
        <section className="px-12 py-14 sm:py-20 flex flex-col gap-[64px] items-center justify-center">
          <div className="text-center">
            <TypographyH2 className="mt-2">Search for a job</TypographyH2>
          </div>
          <div className="flex items-center justify-center gap-4 w-full">
            <Search
              className="w-full"
              onSearch={(q) => setFilters({ ...filters, query: q })}
              placeholder="Title, skill or company"
            />
            <AutocompleteInput
              freeSolo
              placeholder="Location"
              options={Cities}
              onChange={(q) => {
                setFilters({ ...filters, location: q });
              }}
              renderInput={(params) => (
                <Search
                  {...params}
                  left={
                    <div
                      className="absolute top-[50%] left-[8px]"
                      style={{ transform: "translateY(-50%)" }}
                    >
                      <GoLocation size="1.125em" />
                    </div>
                  }
                  showClose
                  fireOnChange
                  defaultValue={params.value}
                  onSearch={(q, r) => {
                    if (r === "clear" || r === "enter") {
                      setFilters({ ...filters, location: q });
                    }
                    params.onChange({ target: { value: q } });
                  }}
                  placeholder="Location"
                />
              )}
            />
          </div>
          {publicJobs && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {publicJobs.map((publicJob) => (
                <div className="flex bg-[#FCFCFC] rounded-[12px] p-4 max-w-[524px]">
                  <Link to="/login" key={publicJob.id}>
                    <JobListItem {...publicJob} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
        <div className="flex flex-col items-center sm:flex-row px-8 sm:px-28 pb-8 pt-12 sm:pb-28">
          <div className="w-full sm:w-1/2">
            <h1 className="text-6xl sm:text-7xl text-center sm:text-left scroll-m-20 font-extrabold">
              Empowering <br /> Your Job Search
            </h1>
            <TypographyP className="text-xl mt-9 text-center sm:text-left">
              Find the perfect job that matches your skills and passion.
              <br className="hidden sm:block" /> Join us today.
            </TypographyP>
            <Button
              size="lg"
              className="mt-6 font-semibold text-md bg-blue-500 border-blue-500 text-white w-full sm:w-auto"
              onClick={() => navigate("/signup")}
            >
              Get Started
            </Button>
          </div>
          <div className="w-full sm:w-1/2 flex justify-end pt-20 sm:pt-0">
            <div className="w-[660px]">
              <img
                src="/guy-with-charts.svg"
                alt="guy-with-charts"
                className="object-center object-cover inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>

      <section className="px-12 py-14 sm:py-20 flex flex-col gap-[64px] items-center justify-center">
        <div className="text-center">
          <TypographyH2 className="mt-2">
            Interview at top companies like these
          </TypographyH2>
        </div>
        <div className="flex items-center flex-col sm:flex-row gap-10 sm:gap-24">
          {companies.map((company, i) => (
            <div key={i}>
              <img src={company} className="w-20 block" />
            </div>
          ))}
        </div>
      </section>
      <div className="px-12 py-14 sm:py-20 flex flex-col gap-[64px] items-center justify-center">
        <div className="text-center">
          <TypographyMuted className="text-base font-bold">
            Join Us Today
          </TypographyMuted>
          <TypographyH2 className="mt-2">Why Choose Us</TypographyH2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              className="flex bg-[#FCFCFC] rounded-[12px] p-6 max-w-[524px]"
              key={item.icon}
            >
              <div className="mr-4 h-[44px] w-[44px] flex items-center justify-center rounded-[12px] border border-[#B3B3B3]">
                <img src={`/${item.icon}.svg`} alt={item.icon} />
              </div>
              <div className="flex-1">
                <TypographyP className="font-bold">{item.title}</TypographyP>
                <TypographyP className="mt-2 text-sm">
                  {item.description}
                </TypographyP>
              </div>
            </div>
          ))}
        </div>
      </div>
      <section className="px-12 py-14 sm:py-20 flex gap-20 sm:gap-36 items-center flex-col sm:flex-row justify-center">
        <img className="rounded" src="/m_image.png" />
        <div className="flex flex-col gap-8">
          <div className="text-center sm:text-left">
            <TypographyH2>
              Discover Your Next Career <br /> Opportunity Today!
            </TypographyH2>
            <TypographyP className="mt-4">
              Join thousands of job seekers and employers. Find the <br />{" "}
              perfect job or candidate with ease and efficiency on our <br />{" "}
              platform.
            </TypographyP>
          </div>
          <div>
            <Input placeholder="Sign in with Email" />
            <Button
              size="lg"
              className="mt-4 w-full sm:w-auto font-semibold text-md bg-blue-500 border-blue-500 text-white"
              onClick={() => navigate("/login")}
            >
              Get Started
            </Button>
          </div>
        </div>
      </section>
      <section className="px-12 py-14 sm:py-20 flex flex-col gap-[64px] items-center justify-center">
        <div className="text-center">
          <TypographyH2 className="mt-2">Job Explorer in Numbers</TypographyH2>
          <TypographyMuted className="mt-2 text-base">
            Discover the statistics that showcase how Job Explorer is
            revolutionizing the job market for both job seekers and <br />{" "}
            companies.
          </TypographyMuted>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-36">
          <div className="flex flex-col items-center">
            <TypographyP className="text-blue-500 text-3xl font-bold">
              60 sec.
            </TypographyP>
            <TypographyP className="p-2 text-xl font-bold">
              Apply Faster
            </TypographyP>
            <TypographyP className="mb-8 text-base text-center">
              Cut down the application process{" "}
              <br className="hidden sm:block" /> time and increase your chances
              of <br className="hidden sm:block" /> landing the perfect job.
            </TypographyP>
          </div>
          <div className="flex flex-col items-center">
            <TypographyP className="text-blue-500 text-3xl font-bold">
              +1000
            </TypographyP>
            <TypographyP className="p-2 text-xl font-bold">
              Companies
            </TypographyP>
            <TypographyP className="mb-8 text-base text-center">
              Join a community of forward- <br className="hidden sm:block" />
              thinking companies who rely on <br className="hidden sm:block" />{" "}
              Job Explorer to find top talent.
            </TypographyP>
          </div>
          <div className="flex flex-col items-center">
            <TypographyP className="text-blue-500 text-3xl font-bold">
              2x
            </TypographyP>
            <TypographyP className="p-2 text-xl font-bold">
              Hire Faster
            </TypographyP>
            <TypographyP className="mb-8 text-base text-center">
              Streamline your hiring process <br className="hidden sm:block" />{" "}
              and bring the best talent on board{" "}
              <br className="hidden sm:block" /> swiftly and efficiently.
            </TypographyP>
          </div>
        </div>
      </section>
      {featuredJobs && (
        <section className="px-12 py-14 sm:py-20 flex flex-col gap-[64px] items-center justify-center">
          <div className="text-center">
            <TypographyH2 className="mt-2">Featured Job Posts</TypographyH2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredJobs.map((featuredJob) => (
              <div className="flex bg-[#FCFCFC] rounded-[12px] p-4 max-w-[524px]">
                <Link to="/login" key={featuredJob.id}>
                  <JobListItem {...featuredJob} />
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
      <section className="px-12 py-14 sm:py-20 flex gap-[64px] flex-col items-center justify-center">
        <div className="text-center">
          <TypographyH2>Frequently Asked Questions</TypographyH2>
          <TypographyMuted className="mt-2 text-base">
            We Have Answers
          </TypographyMuted>
        </div>
        <div className="w-full justify-center items-center flex flex-col gap-[16px]">
          {questions.map((question, i) => (
            <Question {...question} key={i} />
          ))}
        </div>
      </section>
      <div className="px-12 pt-12 flex gap-[64px] flex-col items-center justify-center">
        <div className="w-full">
          <div className="relative py-12 flex items-center flex-col sm:flex-row justify-between gap-0 w-full border-t border-t-neutral-200">
            <Link to="/">
              <div className="relative sm:absolute bottom-0">
                <img src="/logo.png" alt="logo" width={200} height={200} />
              </div>
            </Link>
            {/* <div className="flex items-center flex-col sm:flex-row gap-0 sm:gap-52">
          </div> */}
            <div className="flex items-center gap-8">
              <Link to="/">
                <TypographyP className="hover:underline">Home</TypographyP>
              </Link>
              <Link to="/login">
                <TypographyP className="hover:underline">Jobs</TypographyP>
              </Link>
              <Link to="/login">
                <TypographyP className="hover:underline">Sign in</TypographyP>
              </Link>
              <Link to="/signup">
                <TypographyP className="hover:underline">
                  Try for free
                </TypographyP>
              </Link>
            </div>
          </div>
          <TypographyP className="pb-6 text-center font-normal text-sm mb-2">
            © {moment().format("YYYY")} Job-Explorer. All rights reserved.
          </TypographyP>
        </div>
      </div>
    </div>
  );
};

export default Landing;

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(string) {
  if (!string) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getRandomInitailsImage = (name) => "/user-placeholder.png";
// `https://ui-avatars.com/api/?name=${name}`;

export const iconProps = {
  color: "rgb(0 0 0/.6)",
  size: "1.675em",
};

export const WorkplaceTypes = [
  {
    label: "On-site",
    value: "onsite",
    description: "Employees come to work in-person.",
  },
  {
    label: "Hybrid",
    value: "hybrid",
    description: "Employees work on-site and off-site.",
  },
  {
    label: "Remote",
    value: "remote",
    description: "Employees work off-site.",
  },
];

export const WorkplaceTypesMap = WorkplaceTypes.reduce((acc, curr) => {
  acc[curr.value] = curr.label;
  return acc;
}, {});

export const JobTypes = [
  {
    label: "Full-time",
    value: "full_time",
  },
  {
    label: "Part-time",
    value: "part_time",
  },
  {
    label: "Contract",
    value: "contract",
  },
  {
    label: "Temporary",
    value: "temporary",
  },
  {
    label: "Other",
    value: "other",
  },
  {
    label: "Volunteer",
    value: "volunteer",
  },
  {
    label: "Internship",
    value: "internship",
  },
];

export const JobTypesMap = JobTypes.reduce((acc, curr) => {
  acc[curr.value] = curr.label;
  return acc;
}, {});

export const AccountTypes = [
  { label: "Looking to hire", value: "employer" },
  { label: "Looking for work", value: "job_seeker" },
];

export const Cities = [
  "Karachi, Pakistan",
  "Lahore, Pakistan",
  "Islamabad, Pakistan",
  "Faisalabad, Pakistan",
  "Rawalpindi, Pakistan",
  "Multan, Pakistan",
  "Peshawar, Pakistan",
  "Hyderabad, Pakistan",
  "Quetta, Pakistan",
  "Gujranwala, Pakistan",
  "Sialkot, Pakistan",
  "Bahawalpur, Pakistan",
  "Sukkur, Pakistan",
  "Larkana, Pakistan",
  "Mardan, Pakistan",
].map((city) => ({ label: city, value: city }));

export const JobTitles = [
  "Front-End Developer",
  "Back-End Developer",
  "Full-Stack Developer",
  "Mobile App Developer",
  "Android Developer",
  "iOS Developer",
  "React Developer",
  "React Native Developer",
  "Vue.js Developer",
  "Node.js Developer",
  "Angular Developer",
  "Python Developer",
  "Flutter Developer",
  "DevOps Engineer",
  "Systems Analyst",
  "Data Scientist",
  "Data Analyst",
  "Database Administrator",
  "Network Engineer",
  "Cloud Architect",
  "IT Project Manager",
  "UI/UX Designer",
  "Quality Assurance Engineer",
  "Cybersecurity Analyst",
  "Technical Support Specialist",
  "Business Intelligence Developer",
  "Machine Learning Engineer",
].map((job) => ({ label: job, value: job }));

export const Industries = [
  // { label: "Advertising Services", value: "Advertising Services" },
  // {
  //   label: "Business Consulting and Services",
  //   value: "Business Consulting and Services",
  // },
  // { label: "Farming", value: "Farming" },
  // { label: "Financial Services", value: "Financial Services" },
  // { label: "Food and Beverage Services", value: "Food and Beverage Services" },
  // { label: "Government Administration", value: "Government Administration" },
  // { label: "Leisure, Travel & Tourism", value: "Leisure, Travel & Tourism" },
  // { label: "Media Production", value: "Media Production" },
  // { label: "Investment Management", value: "Investment Management" },
  {
    label: "IT Services and IT Consulting",
    value: "IT Services and IT Consulting",
  },
  {
    label: "Internet Marketplace Platforms",
    value: "Internet Marketplace Platforms",
  },
  {
    label: "Technology, Information and Internet",
    value: "Technology, Information and Internet",
  },
  // { label: "Travel Arrangements", value: "Travel Arrangements" },
  { label: "Staffing and Recruiting", value: "Staffing and Recruiting" },
  { label: "Software Development", value: "Software Development" },
];

export const ApplicantStatus = [
  {
    label: "Submitted",
    value: "submitted",
  },
  {
    label: "Approved",
    value: "approved",
  },
  {
    label: "Rejected",
    value: "rejected",
  },
  {
    label: "Scheduled for interview",
    value: "scheduled",
  },
];

export const AccountTypeMap = {
  employer: "Employer",
  job_seeker: "Job Seeker",
};

export const ApplicantStatusMap = ApplicantStatus.reduce((acc, curr) => {
  acc[curr.value] = curr.label;
  return acc;
}, {});

export const downloadFromURL = async (url, name) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", downloadUrl);
    a.setAttribute("download", name);
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
};

export const formatCreatedAt = (createdAt) => {
  const today = moment().startOf("day");
  const createdAtMoment = moment(createdAt);

  if (createdAtMoment.isSame(today, "day")) {
    return createdAtMoment.format("h:mm A");
  } else if (createdAtMoment.isSame(today, "year")) {
    return createdAtMoment.format("MMM D");
  } else {
    return createdAtMoment.format("MMM D, YYYY");
  }
};

export const getElapsedTime = (createdAt) => {
  const now = moment();
  const diffInSeconds = now.diff(createdAt, "seconds");
  const diffInMinutes = now.diff(createdAt, "minutes");
  const diffInHours = now.diff(createdAt, "hours");
  const diffInDays = now.diff(createdAt, "days");
  const diffInWeeks = now.diff(createdAt, "weeks");
  const diffInMonths = now.diff(createdAt, "months");
  const diffInYears = now.diff(createdAt, "years");

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s`;
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h`;
  } else if (diffInDays < 7) {
    return `${diffInDays}d`;
  } else if (diffInWeeks < 4) {
    return `${diffInWeeks}w`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths}m`;
  } else {
    return `${diffInYears}y`;
  }
};

export const reports = [
  {
    label: `I think it's spam or a scam`,
    value: "scam",
    options: [
      {
        label: `I think it's a scam, phishing or malware`,
        value: "scam",
        description:
          "Ex: someone asks for personal information or money or posts suspicious links",
      },
      {
        label: `I think it's promotional or spam`,
        value: "spam",
        description:
          "Ex: someone advertises a product for monetary gain or posts irrelevant content for high visibility",
      },
      {
        label: `I think it's an illegal good or service`,
        value: "illegal",
        description:
          "Ex: content that attempts to sell illegal or regulated goods and services, including solicitation of escort services, prostitution and content that depicts and/or promotes sex trafficking or human trafficking",
      },
    ],
  },
  {
    label: `I think it's discriminatory or offensive`,
    value: "offensive",
    options: [
      {
        label:
          "I think it's discriminatory, or advocates, or supports discrimination",
        value: "discriminatory",
        description: "Ex: discriminates based off of age or sex",
      },
      {
        label: "I think it's offensive or harassing",
        value: "offensive",
        description: "Ex: threats of violence or unwelcome advances",
      },
      {
        label: "I think it shows or promotes extreme violence or terrorism",
        value: "violence",
        description:
          "Ex: torture, rape or abuse, terrorist acts, or recruitment for terrorism",
      },
    ],
  },
  {
    label: `I think something is broken or incorrect`,
    value: "broken",
    options: [
      {
        label: "This job is closed",
        value: "closed",
        description: "Ex: it's no longer accepting applicants",
      },
      {
        label: "This job has an incorrect company",
        value: "incorrect_company",
        description: "Ex: the job has the wrong company name or page displayed",
      },
      {
        label: "This job has an incorrect location",
        value: "incorrect_location",
        description: "Ex: the city, state, province or country is incorrect",
      },
      {
        label: "This job has incorrect formatting",
        value: "incorrect_formatting",
        description:
          "Ex: its job details has text missing, grammatical errors, or other formatting mistakes",
      },
      {
        label: "This job does not belong on LinkedIn",
        value: "not_belong",
        description:
          "Ex: the job from this page should not be posted on LinkedIn",
      },
    ],
  },
];

export const ReportMap = reports
  .map((r) => r.options)
  .flat()
  .reduce((acc, curr) => {
    acc[curr.value] = curr;
    return acc;
  }, {});

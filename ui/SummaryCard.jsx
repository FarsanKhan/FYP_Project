import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { FaUsers } from "react-icons/fa";
import { cn, iconProps } from "../../lib/utils";
import { AiFillReconciliation } from "react-icons/ai";
import CenterLoader from "./CenterLoader";

const ICONS = {
  user: <FaUsers {...iconProps} size="2em" />,
  job: <AiFillReconciliation {...iconProps} size="2em" />,
};

const SummaryCard = ({ label, value, icon, className, isLoading }) => {
  return (
    <Card className={cn(className, "relative")}>
      {isLoading && <CenterLoader />}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold">{label}</CardTitle>
        {ICONS[icon]}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-2xl font-bold font-blue">{value}</div>
        {/* <Link href={link}>
          <p className="text-xs text-muted-foreground">View all</p>
        </Link> */}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;

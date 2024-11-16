import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { PrivateRoutes } from "./common/ConditionalRoutes";
import NotFound from "./NotFound";
import Dashboard from "./Dashboard/Dashboard";
import Navbar from "./ui/Navbar";
import Jobs from "./Jobs/Jobs";
import Messaging from "./Messaging/Messaging";
import Profile from "./Profile/Profile";
import Results from "./Search/Results";
import { useStore } from "../lib/store";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import Users from "./Users/Users";
import Reports from "./Reports/Reports";
import Meeting from "./Meeting/MeetingContainer";
import IncomingCall from "./ui/IncomingCall";
import { ws } from "../lib/ws";

const withNavbar = (Component) => (
  <div className="flex flex-col h-full w-full">
    <Navbar />
    <div
      className="flex-1 flex flex-col items-center"
      style={{ background: "#F4F2EE" }}
    >
      <Component />
    </div>
  </div>
);

const AppRoutes = () => {
  const [incomingCall, setIncomingCall] = useState(null);
  const user = useStore((state) => state.user);

  const handleIncomingCall = (data) => {
    if (user.id === data.peerId) {
      setIncomingCall(data);
    }
  };

  useEffect(() => {
    if (!user) return;
    ws.on("incoming-call", handleIncomingCall);
    return () => {
      ws.off("incoming-call");
    };
  }, [user]);

  return (
    <PrivateRoutes>
      {user && user.type !== "admin" && incomingCall && (
        <IncomingCall {...incomingCall} onClose={() => setIncomingCall(null)} />
      )}
      <Routes>
        <Route path="*" element={<NotFound />} />
        {user && user.type !== "admin" ? (
          <>
            <Route path="/" element={withNavbar(Dashboard)} />
            <Route path="/jobs/*" element={withNavbar(Jobs)} />
            <Route path="/messaging/:id" element={withNavbar(Messaging)} />
            <Route path="/messaging/*" element={withNavbar(Messaging)} />
            <Route path="/profile/:id" element={withNavbar(Profile)} />
            <Route path="/meeting/:id" element={<Meeting />} />
            <Route path="/search/results/*" element={withNavbar(Results)} />
            {/* <Route path="/notifications/*" element={withNavbar(Notifications)} /> */}
          </>
        ) : (
          <>
            <Route path="/" element={withNavbar(AdminDashboard)} />
            <Route path="/users/*" element={withNavbar(Users)} />
            <Route path="/reports/*" element={withNavbar(Reports)} />
          </>
        )}
      </Routes>
    </PrivateRoutes>
  );
};

export default AppRoutes;

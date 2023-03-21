// import { Navigate, Outlet } from "react-router-dom";
import React, { useEffect } from "react";
import { Leaderboards } from "../components/Leaderboards";
import { useApplicationData } from "../contexts/ApplicationDataContext";
import LeagueService from "../services/LeagueService";
function PageLeaderboards() {
  const { setScheduleData, setLeaderboardData, leaderboard } =
    useApplicationData();

  async function handle() {
    if (leaderboard.length === 0) {
      const leagueService = new LeagueService();
      await leagueService.fetchData();
      setScheduleData(leagueService.getMatches());
      setLeaderboardData(leagueService.getLeaderboard());
    }
  }

  useEffect(() => {
    handle();
  }, [leaderboard]);

  return (
    <>
      <Leaderboards leaderboards={leaderboard} />
    </>
  );
}

export { PageLeaderboards };

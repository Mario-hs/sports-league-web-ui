import React, { useEffect } from "react";
import { Schedule } from "../components/Schedule";
import { useApplicationData } from "../contexts/ApplicationDataContext";
import LeagueService from "../services/LeagueService";

function PageSchedule() {
  const { setScheduleData, setLeaderboardData, schedule } =
    useApplicationData();

  async function handle() {
    if (schedule.length === 0) {
      const leagueService = new LeagueService();
      await leagueService.fetchData();
      setScheduleData(leagueService.getMatches());
      setLeaderboardData(leagueService.getLeaderboard());
    }
  }

  useEffect(() => {
    handle();
  }, [schedule]);

  return <>{schedule.length > 0 && <Schedule matches={schedule} />}</>;
}

export { PageSchedule };

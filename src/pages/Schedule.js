import React, { useEffect, useState } from "react";
import { Schedule } from "../components/Schedule";
import LeagueService from "../services/LeagueService";

function PageSchedule() {
  const [data, setData] = useState([]);

  async function handle(leagueService) {
    await leagueService.fetchData();
    await leagueService.getLeaderboard();
    setData(leagueService.getMatches());
  }

  useEffect(() => {
    const leagueService = new LeagueService();
    handle(leagueService);
  }, []);

  return <>{data.length > 0 && <Schedule matches={data} />}</>;
}

export { PageSchedule };

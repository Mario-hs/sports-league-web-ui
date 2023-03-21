import { createContext } from "react";
import { useContext, useState } from "react";

export const ApplicationDataContext = createContext();

export function ApplicationDataContextProvider({ children }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [schedule, setSchedule] = useState([]);

  function setScheduleData(data) {
    setSchedule(data);
  }

  function setLeaderboardData(data) {
    setLeaderboard(data);
  }

  function getScheduleData() {
    return schedule;
  }

  function getLeaderboardData() {
    return leaderboard;
  }

  return (
    <ApplicationDataContext.Provider
      value={{
        setScheduleData,
        setLeaderboardData,
        getScheduleData,
        getLeaderboardData,
        schedule,
        leaderboard,
      }}
    >
      {children}
    </ApplicationDataContext.Provider>
  );
}

export const useApplicationData = () => {
  return useContext(ApplicationDataContext);
};

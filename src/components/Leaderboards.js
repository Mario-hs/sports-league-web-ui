import React from "react";
function Leaderboards({ leaderboards }) {
  if (leaderboards) {
    leaderboards.map((team) => {
      // console.log(team.goalsFor - team.goalsAgainst);
    });
  }
  return (
    <main className="container">
      <table className="table_leaderboards">
        <caption className="title_table">League Standing</caption>
        <thead>
          <tr>
            <th>Team Name</th>
            <th>MP</th>
            <th>GF</th>
            <th>GA</th>
            <th className="goal_difference">GD</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboards &&
            leaderboards.map((team) => {
              return (
                <tr key={Math.random()}>
                  <td className="team_name_flag">
                    <img
                      className="flag_icon"
                      src={`https://flagsapi.codeaid.io/${team.teamName}.png`}
                      alt="flag icon"
                    />
                    <span>{team.teamName}</span>
                  </td>
                  <td>{team.matchesPlayed}</td>

                  <td>{team.goalsFor}</td>
                  <td>{team.goalsAgainst}</td>
                  <td className="goal_difference">
                    {team.goalsFor - team.goalsAgainst}
                  </td>
                  <td className="point">{team.points}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </main>
  );
}

export { Leaderboards };

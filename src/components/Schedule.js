import React from "react";

function Schedule({ matches }) {
  return (
    <main className="container">
      <table>
        <caption className="title_table">League Schedule</caption>
        <thead>
          <tr>
            <th>Date/Time</th>
            <th>Stadim</th>
            <th>Home Team</th>
            <th></th>
            <th>Away Team</th>
          </tr>
        </thead>
        <tbody>
          {matches &&
            matches.map((match) => {
              return (
                <tr key={Math.random()}>
                  <td>
                    {match.matchDate[0]} <br /> {match.matchDate[1]}
                  </td>
                  <td>{match.stadium}</td>
                  <td className="container_flag_left">
                    <span>{match.homeTeam}</span>
                    <img
                      className="flag_icon"
                      src={`https://flagsapi.codeaid.io/${match.homeTeam}.png`}
                      alt="flag icon"
                    />
                  </td>
                  <td>
                    {match.homeTeamScore} : {match.awayTeamScore}
                  </td>
                  <td className="container_flag_right">
                    <img
                      className="flag_icon"
                      src={`https://flagsapi.codeaid.io/${match.awayTeam}.png`}
                      alt="flag icon"
                    />
                    <span>{match.awayTeam}</span>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </main>
  );
}

export { Schedule };

/**
 * A class representing a service that processes the data for match schedule
 * and generates leaderboard.
 *
 * NOTE: MAKE SURE TO IMPLEMENT ALL EXISITNG METHODS BELOW WITHOUT CHANGING THE INTERFACE OF THEM,
 *       AND PLEASE DO NOT RENAME, MOVE OR DELETE THIS FILE.
 *
 */
class LeagueService {
  constructor() {
    this.matches = [];
    this.leaderboard = [];
  }
  /**
   * Sets the match schedule.
   * Match schedule will be given in the following form:
   * [
   *      {
   *          matchDate: [TIMESTAMP],
   *          stadium: [STRING],
   *          homeTeam: [STRING],
   *          awayTeam: [STRING],
   *          matchPlayed: [BOOLEAN],
   *          homeTeamScore: [INTEGER],
   *          awayTeamScore: [INTEGER]
   *      },
   *      {
   *          matchDate: [TIMESTAMP],
   *          stadium: [STRING],
   *          homeTeam: [STRING],
   *          awayTeam: [STRING],
   *          matchPlayed: [BOOLEAN],
   *          homeTeamScore: [INTEGER],
   *          awayTeamScore: [INTEGER]
   *      }
   * ]
   *
   * @param {Array} matches List of matches.
   */
  setMatches(matches) {
    matches.forEach((match) => {
      const newDate = new Date(match.matchDate);
      const dateFormatter = `${newDate.getDate()}.${
        newDate.getMonth() + 1
      }.${newDate.getFullYear()} - ${newDate.getHours()}:${newDate.getMinutes()}`;
      this.matches.push({
        matchDate: dateFormatter.split("-"),
        stadium: match.stadium,
        homeTeam: match.homeTeam,
        awayTeam: match.awayTeam,
        matchPlayed: match.matchPlayed,
        homeTeamScore: match.homeTeamScore,
        awayTeamScore: match.awayTeamScore,
      });
    });
  }

  /**
   * Returns the full list of matches.
   *
   * @returns {Array} List of matches.
   */
  getMatches() {
    return this.matches;
  }

  /**
   * Returns the leaderboard in a form of a list of JSON objecs.
   *
   * [
   *      {
   *          teamName: [STRING]',
   *          matchesPlayed: [INTEGER],
   *          goalsFor: [INTEGER],
   *          goalsAgainst: [INTEGER],
   *          points: [INTEGER]
   *      },
   * ]
   *
   * @returns {Array} List of teams representing the leaderboard.
   */
  getLeaderboard() {
    let games = [];

    this.matches.forEach((match) => {
      if (match.homeTeamScore !== null) {
        games.push({
          teamName: match.homeTeam,
          matchesPlayed: 1,
          goalsFor: match.homeTeamScore,
          goalsAgainst: match.awayTeamScore,
          points:
            match.homeTeamScore > match.awayTeamScore
              ? 3
              : match.homeTeamScore === match.awayTeamScore
              ? 1
              : 0,
        });

        games.push({
          teamName: match.awayTeam,
          matchesPlayed: 1,
          goalsFor: match.awayTeamScore,
          goalsAgainst: match.homeTeamScore,
          points:
            match.homeTeamScore < match.awayTeamScore
              ? 3
              : match.homeTeamScore === match.awayTeamScore
              ? 1
              : 0,
        });
      }
    });

    games.forEach((game) => {
      let teamName = "";
      let matchesPlayed = 0;
      let goalsFor = 0;
      let goalsAgainst = 0;
      let points = 0;

      games.forEach((team) => {
        if (team.teamName === game.teamName) {
          teamName = team.teamName;
          matchesPlayed++;
          goalsFor += team.goalsFor;
          goalsAgainst += team.goalsAgainst;
          team.goalsFor > team.goalsAgainst
            ? (points += team.points)
            : team.goalsFor === team.goalsAgainst
            ? (points += team.points)
            : (points += team.points);
        }
      });
      if (
        this.leaderboard.find((team) => team.teamName === teamName) ===
        undefined
      ) {
        this.leaderboard.push({
          teamName: teamName,
          matchesPlayed: matchesPlayed,
          goalsFor: goalsFor,
          goalsAgainst: goalsAgainst,
          points: points,
        });
      }
    });

    this.leaderboard.sort((a, b) => {
      let x = a.teamName.toUpperCase(),
        y = b.teamName.toUpperCase();
      return x === y ? 0 : x > y ? 1 : -1;
    });

    this.leaderboard.sort((a, b) => {
      if (a.goalsFor - a.goalsAgainst > b.goalsFor - b.goalsAgainst) return -1;
      if (a.points > b.points) return -1;
    });

    return this.leaderboard;
  }

  /**
   * Asynchronic function to fetch the data from the server.
   */
  async fetchData() {
    await fetch("http://localhost:3001/api/v1/getAllMatches", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Não foi possível buscar os dados para esse recurso");
        }
        return res.json();
      })
      .then((data) => {
        this.setMatches(data.matches);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Requisão abortada");
        } else {
          console.log(err.message);
        }
      });
  }
}

export default LeagueService;

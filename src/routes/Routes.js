import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PageLeaderboards } from "../pages/Leaderboards";
import { PageSchedule } from "../pages/Schedule";
import { NotFound } from "../pages/NotFound";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { TokenService } from "../services/TokenService";
import { useEffect } from "react";
import LeagueService from "../services/LeagueService";

const Router = () => {
  const { token, isPeding, error } = TokenService(
    "http://localhost:3001/api/v1/getAccessToken"
  );

  useEffect(() => {
    if (localStorage.getItem("token") === undefined && token !== null) {
      localStorage.setItem("token", token.access_token);
    }
  }, [token]);

  // jogar a consulta dos dados aqui para que ele seja algo amplo
  // ou pesquisar de context para passar os dados

  // const [data, setData] = useState([]);

  async function handle(leagueService) {
    await leagueService.fetchData();
    await leagueService.getLeaderboard();
    await leagueService.getMatches();
    // setData(leagueService.getMatches());
  }

  useEffect(() => {
    const leagueService = new LeagueService();
    handle(leagueService);
  }, []);
  return (
    <BrowserRouter>
      <Header />
      {error && <div>{error}</div>}
      {isPeding && <div>Carregando...</div>}
      {token && (
        <Switch>
          <Route exact path="/" component={PageSchedule} />
          <Route path="/schedule" component={PageSchedule} />
          <Route path="/leaderboard" component={PageLeaderboards} />
          <Route path="*" component={NotFound} />
        </Switch>
      )}

      <Footer />
    </BrowserRouter>
  );
};

export { Router };

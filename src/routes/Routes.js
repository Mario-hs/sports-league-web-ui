import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PageLeaderboard } from "../pages/Leaderboard";
import { PageSchedule } from "../pages/Schedule";
import { NotFound } from "../pages/NotFound";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { TokenService } from "../services/TokenService";
import { useEffect } from "react";

const Router = () => {
  const { token, isPeding, error } = TokenService(
    "http://localhost:3001/api/v1/getAccessToken"
  );

  useEffect(() => {
    if (localStorage.getItem("token") === undefined && token !== null) {
      localStorage.setItem("token", token.access_token);
    }
  }, [token]);

  return (
    <BrowserRouter>
      <Header />
      {error && <div>{error}</div>}
      {isPeding && <div>Carregando...</div>}
      {token && (
        <Switch>
          <Route exact path="/" component={PageSchedule} />
          <Route path="/schedule" component={PageSchedule} />
          <Route path="/leaderboard" component={PageLeaderboard} />
          <Route path="*" component={NotFound} />
        </Switch>
      )}

      <Footer />
    </BrowserRouter>
  );
};

export { Router };

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePageAllSpots from "./components/HomePageAllSpots"
import SpotPage from "./components/SpotPage";
import CreateAListing from "./components/CreateAListing";
import PageNotFound from "./components/PageNotFound";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>

          <Route exact path='/'>
            <HomePageAllSpots />
          </Route>

          <Route path='/spots/create-a-listing'>
            <CreateAListing />
          </Route>

          <Route path='/spots/:spotId' >
            <SpotPage />
          </Route>

          <Route>
            <PageNotFound />
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
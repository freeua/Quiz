import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "../lib/PrivateRoute";

import Login from "../pages/login";
import Registration from "../pages/registration";
import ResetRequest from "../pages/reset-request";
import ResetPassword from "../pages/reset-password";
import ActivationTypesContainer from "../pages/activation-types/ActivationTypesContainer";
import ActivationsContainer from "../pages/activations/ActivationsContainer";
import LocationsContainer from "../pages/locations";
import EnterPage from "../pages/enter-page";
import Quizzes from "../pages/quizzes";
import FinishQuiz from "../pages/finish-quiz";
import Result from "../pages/result";
import FullQuiz from "../pages/full-quiz/FullQuiz";
import Products from "../pages/products/Products";
import SingleProduct from "../pages/single-product/SingleProduct";

const App = () => (
  <Router>
    <Switch>
      <Route exact={true} path="/login" component={Login} />
      <Route exact={true} path="/confirm_registration/:token" component={Registration} />
      <Route exact={true} path="/reset-request" component={ResetRequest} />
      <Route exact={true} path="/reset-password/:token" component={ResetPassword} />

      <PrivateRoute exact={true} path="/" component={ActivationTypesContainer} />
      <PrivateRoute
        exact={true}
        path="/activation-types/:activationTypeId"
        component={ActivationsContainer}
      />
      <PrivateRoute
        exact={true}
        path="/activation-types/:activationTypeId/activations/:activationId"
        component={LocationsContainer}
      />
      <PrivateRoute
        exact={true}
        path="/activation-types/:activationTypeId/activations/:activationId/start/:locationId"
        component={EnterPage}
      />
      <PrivateRoute
        exact={true}
        path="/activation-types/:activationTypeId/activations/:activationId/quizzes/:locationId"
        component={Quizzes}
      />
      <PrivateRoute
        exact={true}
        path="/activation-types/:activationTypeId/activations/:activationId/location/:locationId/quiz/:quizId"
        component={FullQuiz}
      />
      <PrivateRoute
        exact={true}
        path="/activation-types/:activationTypeId/activations/:activationId/location/:locationId/finish-quiz"
        component={FinishQuiz}
      />
      <PrivateRoute
        exact={true}
        path="/activation-types/:activationTypeId/activations/:activationId/location/:locationId/result"
        component={Result}
      />
      <PrivateRoute
        exact={true}
        path="/activation-types/:activationTypeId/activations/:activationId/products/:locationId"
        component={Products}
      />
      <PrivateRoute
        exact={true}
        path="/activation-types/:activationTypeId/activations/:activationId/location/:locationId/product/:productId"
        component={SingleProduct}
      />
    </Switch>
  </Router>
);

export default App;

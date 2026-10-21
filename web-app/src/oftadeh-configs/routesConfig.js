import React from "react";
import { Redirect } from "react-router-dom";

import { DashboardPageConfig } from "../pages/dashboard/DashboardPageConfig";
import { AboutPageConfig } from "../pages/Note/AboutPageConfig";
import { CalendarPageConfig } from "../pages/calendar/CalendarPageConfig";
import { ForgotPasswordPageConfig } from "../pages/auth/forgot-password/ForgotPasswordPageConfig";
import { LoginPageConfig } from "../pages/auth/login/LoginPageConfig";
import { AddPageConfig } from "../pages/users/AddPageConfig";
import { MonthsConfig } from "../pages/month/MonthsConfig";
import { Error404PageConfig } from "../pages/errors/404/Error404PageConfig";
import { Error500PageConfig } from "../pages/errors/500/Error500PageConfig";
import { DayConfig } from "../pages/day/DayConfig";
import {DashboardUserConfig} from "../pages/dashboard/DashboardUserConfig";

import { ListeUsersConfig } from "../pages/users/ListeUsersConfig";

const routeConfigs = [
  ...DashboardPageConfig.routes,
  ...AddPageConfig.routes,
  ...CalendarPageConfig.routes,
  ...ForgotPasswordPageConfig.routes,
  ...LoginPageConfig.routes,
  ...ListeUsersConfig.routes,
  ...MonthsConfig.routes,
  ...Error404PageConfig.routes,
  ...Error500PageConfig.routes,
  ...AboutPageConfig.routes,
  ...DayConfig.routes,
  ...DashboardUserConfig.routes,
  
];

const routes = [
  ...routeConfigs,
  {
    component: () => <Redirect to="/pages/errors/error-404" />
  }
  // {
  //   path: "/test",
  //   exact: true,
  //   component: <Example />
  // }
];

export default routes;

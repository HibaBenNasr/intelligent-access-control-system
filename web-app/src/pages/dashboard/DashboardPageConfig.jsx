import DashboardPage from "./DashboardPage";
//import FirestoreService from '../../utils/services/FirestoreService';


export const DashboardPageConfig = {
  routes: [
    {
      path: "/",
      exact: true,
      component: DashboardPage
    }
  ]
};

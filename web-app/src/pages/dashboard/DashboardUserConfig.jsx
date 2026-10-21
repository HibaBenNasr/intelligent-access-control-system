import DashboardUser from "./DashboardUser";
//import FirestoreService from '../../utils/services/FirestoreService';


export const DashboardUserConfig = {
  routes: [
    {
      path: "/dash",
      exact: true,
      component: DashboardUser
    }
  ]
};

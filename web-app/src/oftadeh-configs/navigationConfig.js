
const navigationConfig = [
  {
    id: "Main",
    title: "MAIN",
    type: "group",
    children: [
      {
        id: "dashboard",
        title: "Dashboard",
        type: "item",
        icon: "apps",
        url: "/",
        exact: true,
      },
      {
        id: "dashboard1",
        title: "Users Dashboard",
        type: "item",
        icon: "apps",
        url: "/dash",
        exact: true,
      },
      {
        id: "day",
        title: "Daily Statistics",
        type: "item",
        icon:"today",
        url: "/pages/day/Day",
        exact: true,
      },
      
      {
        id: "month",
        title: "Monthly Statistics",
        type: "item",
        icon:"event",
        url: "/pages/month/Months",
        exact: true,
      },
     
    ],
  },
  {
    id: "user",
    title: "Users Management",
    type: "group",
    children: [
      {
        
          id: "list",
          title: "Users List",
          type: "item",
          icon:"person",
          url: "/pages/users/ListeUsers",
          exact: true,
        
      },
        {
          
            id: "add",
            title: "Users Add",
            type: "item",
            icon:"add",
            url: "/pages/users/Add",
            exact: true,
          
        }
    ]}
      
  
];

export default navigationConfig;

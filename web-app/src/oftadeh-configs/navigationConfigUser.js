
const navigationConfigUser = [
  {
    id: "Main",
    title: "MAIN",
    type: "group",
    children: [
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
];

export default navigationConfigUser;

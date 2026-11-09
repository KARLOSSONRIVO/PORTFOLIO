// Fixture adapters keep the original dashboard components independent of auth/APIs.
const monthlyData = [
  {month:"Jun",transport:0.68,energy:0.52,food:0.35,shopping:0.25,total:1.80},
  {month:"Jul",transport:0.65,energy:0.49,food:0.34,shopping:0.22,total:1.70},
  {month:"Aug",transport:0.60,energy:0.48,food:0.32,shopping:0.20,total:1.60},
  {month:"Sep",transport:0.56,energy:0.44,food:0.30,shopping:0.20,total:1.50},
  {month:"Oct",transport:0.52,energy:0.41,food:0.29,shopping:0.18,total:1.40},
  {month:"Nov",transport:0.44,energy:0.37,food:0.26,shopping:0.16,total:1.23},
];

export function useAuth() { return {user:{firstName:"Karlos",lastName:"Rivo"}}; }
export function useDashboard() {
  return {
    isLoading:false,
    stats:{thisMonth:1.23,deltaPct:-12.1,reductionTons:0.17,annualGoalProgress:76,streak:14},
    chartData:monthlyData,
  };
}
export function useAnalytics() {
  return {
    monthlyData,
    monthsReducedCount:5,
    strongestCorrelation:{category:"Transport",r:0.84},
    weekdayData:[{day:"Mon",total:0.043},{day:"Tue",total:0.048},{day:"Wed",total:0.037},{day:"Thu",total:0.046},{day:"Fri",total:0.041},{day:"Sat",total:0.032},{day:"Sun",total:0.029}],
    categoryData:[
      {name:"Transport",value:3.45,color:"var(--chart-1)"},
      {name:"Energy",value:2.71,color:"var(--chart-2)"},
      {name:"Food",value:1.86,color:"var(--chart-3)"},
      {name:"Shopping",value:1.21,color:"var(--chart-4)"},
    ],
  };
}
export function useRecentActivities() {
  return {isLoading:false,error:null,refetch:()=>{},activities:[
    {_id:"sample-1",ActivityType:"transport",notes:"Morning commute by bus",description:"Bus ride",dateLogged:"2026-11-09T08:00:00",co2_emissions:1.24},
    {_id:"sample-2",ActivityType:"food",notes:"Plant-based lunch",description:"Lunch",dateLogged:"2026-11-09T06:00:00",co2_emissions:0.62},
    {_id:"sample-3",ActivityType:"energy",notes:"Home electricity usage",description:"Electricity",dateLogged:"2026-11-08T09:00:00",co2_emissions:3.18},
  ]};
}
export const formatTimeElapsed=(date:string)=>{
  const hours=Math.floor((new Date("2026-11-09T09:00:00").getTime()-new Date(date).getTime())/3600000);
  return hours>=24?"1 day ago":`${hours} hour${hours===1?"":"s"} ago`;
};
export const formatCO2Emissions=(emissions:number)=>`${emissions.toFixed(2)} kg CO2e`;

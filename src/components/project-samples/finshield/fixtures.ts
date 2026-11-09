import type { CurrentUser } from "./auth-types";
import type { Period } from "./dashboard-chart-filters";

export const user:CurrentUser={
  id:"sample-owner",companyId:"sample-company",firstName:"Karlos",lastName:"Rivo",
  email:"owner@example.test",role:"COMPANY_OWNER",
};

export function financialRows(period:Period,range:string) {
  const rows=[
    {label:"Jun",issued:82000,refunds:2600,net:79400},
    {label:"Jul",issued:96000,refunds:3000,net:93000},
    {label:"Aug",issued:108000,refunds:4200,net:103800},
    {label:"Sep",issued:130000,refunds:3600,net:126400},
    {label:"Oct",issued:159000,refunds:5000,net:154000},
    {label:"Nov",issued:188000,refunds:6200,net:181800},
  ];
  if(period==="yearly")return [{label:"2025",issued:632000,refunds:21000,net:611000},{label:"2026",issued:763000,refunds:24600,net:738400}].filter(row=>range==="all"||row.label===range);
  const count=Math.min(Number(range)||6,rows.length);
  return rows.slice(-count).map((row,index)=>({...row,label:period==="weekly"?`Week ${index+1}`:row.label}));
}

export const data={
  byBranch:[
    {branch:{branchName:"Dagupan",invoicePrefix:"DAG"},invoiceCount:52,invoiceValue:"310000"},
    {branch:{branchName:"Manila",invoicePrefix:"MNL"},invoiceCount:43,invoiceValue:"275000"},
    {branch:{branchName:"Baguio",invoicePrefix:"BAG"},invoiceCount:33,invoiceValue:"178000"},
  ],
  byCashier:[{cashier:{firstName:"Alex",lastName:"Santos"},invoiceCount:52,invoiceValue:"310000"}],
};
export const refundedItemMix=[{label:"Office supplies",value:12400},{label:"Accessories",value:8200},{label:"Other items",value:4000}];
export const recentInvoices=[
  {id:"sample-1",invoiceNumber:"DAG-2026-00128",customerName:"Northstar Studio",totalAmount:"24800",invoiceStatus:"ISSUED"},
  {id:"sample-2",invoiceNumber:"MNL-2026-00127",customerName:"Harbor Supply Co.",totalAmount:"18350",invoiceStatus:"ISSUED"},
  {id:"sample-3",invoiceNumber:"BAG-2026-00126",customerName:"Pineworks Trading",totalAmount:"12600",invoiceStatus:"ISSUED"},
  {id:"sample-4",invoiceNumber:"DAG-2026-00125",customerName:"Walk-in Customer",totalAmount:"4200",invoiceStatus:"ISSUED"},
];
export function useCompanyInventorySummary(){return{
  isLoading:false,isError:false,refetch:()=>{},
  data:{summary:{activeBranches:3,inStockLocations:42,lowStockLocations:8,outOfStockLocations:3,notConfiguredLocations:2}},
};}

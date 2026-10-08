import type { BagItem } from '@/components/mahaa/store-context';
export type DemoProfile={name:string;email:string;phone:string;street:string;city:string;avatar:string;newsletter:boolean};
export type DemoOrder={id:string;items:BagItem[];total:number;date:string;status:number;address:DemoProfile;delivery:string};
export const initialProfile:DemoProfile={name:'Demo Customer',email:'customer@example.com',phone:'01700000000',street:'Sample address, Police Line',city:'Natore',avatar:'',newsletter:false};
export const sampleOrder:DemoOrder={id:'MAHAA-DEMO-1001',items:[{id:'bella-gown-black',quantity:1}],total:1330,date:'2026-10-08',status:4,address:initialProfile,delivery:'Demo estimate: 12–14 October 2026'};
export const trackingSteps=['Order placed','Confirmed','Processing','Packed','Shipped','Out for delivery','Delivered'];
export function readDemoOrders():DemoOrder[]{try{return JSON.parse(localStorage.getItem('mahaa-demo-orders')??'null')??[sampleOrder];}catch{return [sampleOrder];}}
export function saveDemoOrder(order:DemoOrder){localStorage.setItem('mahaa-demo-orders',JSON.stringify([order,...readDemoOrders()]));}
export function readDemoProfile():DemoProfile{try{return {...initialProfile,...JSON.parse(localStorage.getItem('mahaa-demo-profile')??'{}')};}catch{return initialProfile;}}
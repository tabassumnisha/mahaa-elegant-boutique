export const deliveryOptions = [
  { id: 'dhaka', label: 'Inside Dhaka', charge: 150, note: 'Existing nationwide rate; a separate Dhaka rate is not confirmed.' },
  { id: 'bangladesh', label: 'Outside Dhaka', charge: 150, note: 'Existing nationwide rate; Natore local delivery is listed separately.' },
  { id: 'natore', label: 'Within Natore', charge: 80, note: 'Existing local delivery rate.' },
] as const;
export const deliveryFor = (id: string) => deliveryOptions.find(option => option.id === id) ?? deliveryOptions[1];
export const paymentOptions = [{id:'bkash',label:'bKash'},{id:'nagad',label:'Nagad'},{id:'cod',label:'Cash on Delivery'}] as const;
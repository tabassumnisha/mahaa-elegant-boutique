import { createContext,useContext,useEffect,useRef,useState,type ReactNode } from 'react';
import { useRouter } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
export type BagItem={id:string;quantity:number};
type Store={user:User|null;ready:boolean;cart:BagItem[];wishlist:string[];add:(id:string)=>void;quantity:(id:string,n:number)=>void;wish:(id:string)=>void;clear:()=>void;signOut:()=>Promise<void>};
const Context=createContext<Store|null>(null);
export function StoreProvider({children}:{children:ReactNode}){
 const [user,setUser]=useState<User|null>(null);const [ready,setReady]=useState(false);const [cart,setCart]=useState<BagItem[]>([]);const [wishlist,setWishlist]=useState<string[]>([]);const [loadedFor,setLoadedFor]=useState<string|null>(null);const router=useRouter();const qc=useQueryClient();const cartRef=useRef<BagItem[]>([]);
 useEffect(()=>{let alive=true;try{const guest=JSON.parse(sessionStorage.getItem('mahaa-guest-bag')??'[]');if(Array.isArray(guest)){cartRef.current=guest;setCart(guest);}}catch{sessionStorage.removeItem('mahaa-guest-bag');}supabase.auth.getUser().then(({data})=>{if(alive){setUser(data.user);setReady(true);}});const {data}=supabase.auth.onAuthStateChange((event,session)=>{if(!['SIGNED_IN','SIGNED_OUT','USER_UPDATED'].includes(event))return;setLoadedFor(null);setUser(session?.user??null);router.invalidate();if(event!=='SIGNED_OUT')qc.invalidateQueries();});return()=>{alive=false;data.subscription.unsubscribe();};},[router,qc]);
 useEffect(()=>{if(!ready)return;let alive=true;setLoadedFor(null);if(!user){setWishlist([]);setLoadedFor('guest');return;}const guest=[...cartRef.current];supabase.from('customer_bags').select('cart,wishlist').eq('user_id',user.id).maybeSingle().then(({data,error})=>{if(!alive)return;if(error){toast.error('Saved shopping bag could not load.');return;}const stored=Array.isArray(data?.cart)?data.cart as BagItem[]:[];const guestSession=sessionStorage.getItem('mahaa-guest-bag');const merged=[...stored];if(guestSession){for(const item of guest){const existing=merged.find(p=>p.id===item.id);if(existing)existing.quantity=Math.min(20,existing.quantity+item.quantity);else merged.push(item);}sessionStorage.removeItem('mahaa-guest-bag');}setCart(merged);cartRef.current=merged;setWishlist(Array.isArray(data?.wishlist)?data.wishlist as string[]:[]);setLoadedFor(user.id);});return()=>{alive=false;};},[user?.id,ready]);
 useEffect(()=>{cartRef.current=cart;if(!ready||loadedFor===null)return;if(!user){sessionStorage.setItem('mahaa-guest-bag',JSON.stringify(cart));return;}if(loadedFor!==user.id)return;supabase.from('customer_bags').upsert({user_id:user.id,cart,wishlist}).then(({error})=>{if(error)toast.error('Your shopping bag could not be saved.');});},[cart,wishlist,loadedFor,user?.id,ready]);
 const add=(id:string)=>{setCart(prev=>{const exists=prev.find(p=>p.id===id);return exists?prev.map(p=>p.id===id?{...p,quantity:Math.min(20,p.quantity+1)}:p):[...prev,{id,quantity:1}];});toast.success('Added to your shopping bag');};
 const quantity=(id:string,n:number)=>setCart(prev=>n<=0?prev.filter(p=>p.id!==id):prev.map(p=>p.id===id?{...p,quantity:Math.min(20,n)}:p));
 const wish=(id:string)=>{if(!user){toast('Sign in to save your wishlist');router.navigate({to:'/auth'});return;}setWishlist(prev=>prev.includes(id)?prev.filter(p=>p!==id):[...prev,id]);};
 const signOut=async()=>{await qc.cancelQueries();qc.clear();setCart([]);cartRef.current=[];setWishlist([]);sessionStorage.removeItem('mahaa-guest-bag');await supabase.auth.signOut();await router.navigate({to:'/auth',replace:true});};
 return <Context.Provider value={{user,ready,cart,wishlist,add,quantity,wish,clear:()=>setCart([]),signOut}}>{children}</Context.Provider>;
}
export function useStore(){const value=useContext(Context);if(!value)throw new Error('Store provider is missing');return value;}

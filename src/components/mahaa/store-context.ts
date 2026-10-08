import { createContext, useContext } from 'react';
import type { User } from '@supabase/supabase-js';
export type BagItem = { id: string; quantity: number };
export type Store = { user: User | null; ready: boolean; cart: BagItem[]; wishlist: string[]; add: (id:string)=>void; quantity:(id:string,n:number)=>void; wish:(id:string)=>void; clear:()=>void; signOut:()=>Promise<void> };
export const StoreContext = createContext<Store | null>(null);
export function useStore() { const value = useContext(StoreContext); if (!value) throw new Error('Store provider is missing'); return value; }
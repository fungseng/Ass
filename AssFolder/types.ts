// types.ts
export type Store = {
    id: number;
    name: string;
    localImage?: any; // Adjust type if needed
    phone: string;
    floor: string;
    description: string;
  };
  
  export type RootStackParamList = {
    ADIDAS: undefined;
    EditScreen: { storeData: Store };
    G42: undefined;
  };
  
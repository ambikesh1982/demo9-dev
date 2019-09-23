import * as firebase from 'firebase';

export interface IKitchen {
    id: string;
    ownerId: string;
    title: string;
    address: string;
    image: { path: string, url: string };
    description: string;
    // pureVeg: boolean;
    menuItemsCount: number;
    likeCount: number;
    createdAt: firebase.firestore.FieldValue;
}

export interface IKitchenResolved {
    kitchen: IKitchen;
    error?: any;
}

export interface IMenuItem {
    id: string;
    title: string;
    price: number;
    isNonVeg: boolean;
    qty: number;
    createdAt?: firebase.firestore.FieldValue;
}

export interface IOrder {
    orderId: string;
    status: string;
    buyerInfo: {uid: string, name: string};
    kitchenInfo: {kid: string, name: string};
    orderValue: number;
    itemsCount: number;
    items: IMenuItem[];
}

export interface IUser {
    uid: string;
    name: string;
    photoUrl: string;
}

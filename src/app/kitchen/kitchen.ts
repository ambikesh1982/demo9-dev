import * as firebase from 'firebase';

export interface IKitchen {
    // kid: string;
    ownerId: string;
    title: string;
    address: string;
    image: { path: string, url: string };
    description: string;
    // pureVeg: boolean;
    menuItemsCount: number;
    likeCount: number;
    createdAt: firebase.firestore.FieldValue;
    id?: string;
}

export interface IMenuItem {
    title: string;
    price: number;
    isNonVeg: boolean;
    qty: number;
    id?: string;
    createdAt?: firebase.firestore.FieldValue;
}

export interface IOrder {
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

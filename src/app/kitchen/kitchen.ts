export interface IKitchen {
    kid: string;
    ownerId: string;
    title: string;
    address: string;
    image: { path: string, url: string };
    description: string;
    pureVeg: boolean;
    postCount: number;
    likeCount: number;
    createdAt?: Date;
}

export interface IMenuItem {
    id: string;
    title: string;
    price: number;
    isNonVeg: boolean;
    qty: number;
    createdAt?: Date;
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

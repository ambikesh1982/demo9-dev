export interface AppUser {
    uid: string;
    isAnonymous: boolean;
    displayName?: string;
    // geoInfo?: IGeoInfo;
    address?: string;
    photoURL?: string;
    providerId?: string;
    isSeller?: boolean;
    isBuyer?: boolean;
    hasOrders?: boolean;
    hasUploads?: boolean;
    hasLikes?: boolean;
    hasWishlisth?: boolean;
}


export interface ImageObj { path: string; url: string; }

export interface MiniUser {
    uid: string;
    name: string;
    photoURL: string;
}

export interface Fooditem {
    isNew: boolean;
    id: string;
    title: string;
    price: number;
    serving: number;
    isNonVeg: boolean;
    createdAt?: Date;
    createdBy?: MiniUser;
    orderType?: string;
    image?: ImageObj;
    likeCount?: number;
    // <optional fields>
    isModified?: boolean;
    modifiedAt?: Date;
    category?: string;
    cuisine?: string;
    orderTime?: string;
    availability?: string[];
    deliveryTime?: string;
    cashOnDelivery?: boolean;
    onlinePayment?: boolean;
    takeAway?: boolean;
    homeDelivery?: boolean;
    dineIn?: boolean;
    // </optional fields>
}

export interface Filter {
    orderType?: string;
    isNonVeg?: boolean;
    // cuisine?: string;
    // category?: string;
}

export interface IOrder {
    buyer: { uid: string, displayName: string };
    seller: { uid: string, displayName: string };
    items: IOrderItem[];
    currState: string;
    updateTime: Date;
    total: number;
}

export interface IOrderItem {
    id: string;
    title?: string;
    isNonVeg: boolean;
    qty?: number;
    price?: number;
}

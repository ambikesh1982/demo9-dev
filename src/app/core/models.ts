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

export interface FirebaseImage {
    path: string;
    url: string;
}

export interface MiniUser {
    uid: string;
    name: string;
    profilePicURL: string;
}

export interface Product {
    isNew: boolean;
    id: string;
    title: string;
    price: number;
    serving: number;
    isNonVeg: boolean;
    orderType?: string;
    images: FirebaseImage;
    likeCount: number;
    createdAt: Date;
    createdBy: MiniUser;
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

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

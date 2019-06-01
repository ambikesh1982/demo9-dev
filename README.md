1. ng add @angular/material
2. npm install @angular/fire firebase --save


Application modules -
1. Core: Core services
2. Shared: Shared components ( toolbar, action-fab, product-card, directives....)

Feature Modules -
1. products: list
2. kitchen: <Sellers home page> : User kitchen with user info and services and items offered.
3. cart: Add items to cart
4. orders
5. chat
6. login


Flow - 
1. Home page:<For new user or user not having locaion information.> 
        1. Get <Mandatory information>: Visitors location info.
        2. Login (Anonymous/Google)
        3. Navigation (List/Login page )

2. Product List page
        1. Get product list <getProducts$()>
        2. Add2Cart
        3. Add/Remove filters
        4. Navigation (Seller's kitchen)
    Guard: userAuth<Anonymous>

    


export enum UserType {

    // Super user who will perform below actions:
    // 1. Manage platform Admins
    SUPER_ADMIN = "super-admin",

    // Platform admin will perform below actions:
    // 1. Manage Brands & supportive accounts (Owner & other types of users)
    // 2. Manage platform Settings
    ADMIN = "admin",

    // Platform admin will perform below actions:
    // 1. Manage Brands & supportive accounts (Owner & other types of users)
    // 2. Manage platform Settings
    EMPLOYEE = "employee" 

}
import { UserType } from "src/app/consts/app.const";
import { IImage } from "../ui-kit/components/uikit-image/uikit-image.component";


export const USERS_STATUSES = [
  {label: 'Active', id: 'active'}, 
  {label: 'Inactive', id: 'inactive'}
]

export interface IUser {
    first_name?: string | null;
    last_name?: string | null;
    email?: string | null;
    password?:string;
    image?: IImage,
    phone_number?: string | null;
    providerId?: string;
    number_auth?: boolean;
    is_active?: boolean,
    status_id?: string,
    role_id?: string,
    gender_id?: string;
    gender?: string;
    created_by?: string;
    warehouses?: string;
    warehouse_id?: string;
    permissions?: any;
    type?: UserType,
    /**
     * The user's unique ID.
     */
    id?: string;
    firebase_uid?: string;
  }
  
  export interface IFirebaseUser {
    uid: string,
    displayName?: string,
    email?: string,
    phoneNumber?: string,
    providerId?: string,
    accessToken?: string
  }

  export function toUser(fbUser: IFirebaseUser): IUser{
    if(!fbUser) return fbUser;
    return {
        email: fbUser.email,
        phone_number: fbUser.phoneNumber,
        providerId: fbUser.providerId,
        firebase_uid: fbUser.uid

    }
  }
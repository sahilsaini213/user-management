import { IImage } from "src/app/modules/ui-kit/components/uikit-image/uikit-image.component";

export const WAREHOUSE_STATUSES = [
    {label: 'Published', id: 'Published'}, 
    {label: 'Draft', id: 'draft'}
  ]

  export const PAYMENT_STATUSES = [
    {label: 'COMPLETE', id: 'published'}, 
    {label: 'PAID', id: 'paid'},
    {label: 'PENDING', id: 'pending'}
  ]
  

export interface IWarehouse {

    // ***** old properties start *****
    id?: any,
    name?: string,
    api_key?: string, // Stores retailer specific secret_key to be shared on other platforms
    referrer?: string,
    msg_service_id?: number,
    url?: string, // Stores website url or Shopify store url
    is_verified?: boolean,
    logo?: string,
    privilege?: string;
    uid?: number,
    // ***** old properties end *****


    // ***** newly added properties start *****
    phone_number?: string,
    email?: string,
    status?: string,
    country_id?: string,
    country?: string,
    city?: string,
    zipcode?: string,
    is_active?: boolean,
    address?: string,
    image?: IImage,
    // ***** newly added properties end *****
}
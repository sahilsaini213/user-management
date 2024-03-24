
export type ATagTarget = '_blank'|'_self'|'_parent'|'_top'|'framename';

export interface IQMenuSubItem {
   label: string,
   icon?: string,
   routerLink?: string[],
   click?: Function,
   items?: IQMenuSubItem[],
   class?: string,
   url?: string[],    
   badge?: string,
   target?: ATagTarget,
   preventExact?: boolean                                       
}

export interface IQMenuItem {
    label: string,
    items?: IQMenuSubItem[]
 }
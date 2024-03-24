import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    constructor(private messageService: MessageService) {}

    success(data: IToastMessage) {
        const meta = this.format(data, DEF_SUCCESS);
        this.messageService.add({severity:'success', summary:meta.title, detail:meta.message, sticky: meta.sticky});
    }

    error(data: IToastMessage) {
        const meta = this.format(data, DEF_ERROR);
        this.messageService.add({severity:'error', summary:meta.title, detail:meta.message, sticky: meta.sticky});
    }

    warn(data: IToastMessage) {
        const meta = this.format(data, DEF_WARNING);
        this.messageService.add({severity:'warn', summary:meta.title, detail:meta.message, sticky: meta.sticky});
    }

    info(data: IToastMessage) {
        const meta = this.format(data, DEF_INFO);
        this.messageService.add({severity:'info', summary:meta.title, detail:meta.message, sticky: meta.sticky});
    }

    clear() {
        this.messageService.clear();
    }

    private format(data: IToastMessage, def: any) {
        return {
            ...def,
            ...data
        }
    }
}

export interface IToastMessage{
    message: string,
    title?: string,
    sticky?: boolean
}

const DEF_SUCCESS = {title: 'Success', sticky: false};
const DEF_ERROR = {title: 'Error', sticky: true};
const DEF_WARNING = {title: 'Warning', sticky: false};
const DEF_INFO = {title: 'Info', sticky: false};
import { Component, Input, OnInit } from '@angular/core';
import { IQMenuItem } from '.';

@Component({
    selector: 'q-menu',
    templateUrl: './menu.component.html'
})

export class QMenuComponent implements OnInit {
    @Input() parentRef: any = {};
    @Input() menuItems: IQMenuItem[];

    constructor() { }

    ngOnInit() { 

    }

    onKeydown(event: KeyboardEvent) {
        const nodeElement = (<HTMLDivElement> event.target);
        if (event.code === 'Enter' || event.code === 'Space') {
            nodeElement.click();
            event.preventDefault();
        }
    }

}

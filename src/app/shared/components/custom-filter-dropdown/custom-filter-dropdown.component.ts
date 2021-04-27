import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { CriteriaInfo } from '../../../features/to-do/model/list-filterWrapper';

@Component({
    selector: 'custom-filter-dropdown',
    templateUrl: './custom-filter-dropdown.component.html',
    styleUrls: [ './custom-filter-dropdown.component.css' ]
})
export class CustomFilterDropdownComponent implements OnInit, OnChanges {

    // tslint:disable-next-line:no-output-on-prefix
    @Output() onCriteriaSelected: EventEmitter<CriteriaInfo> = new EventEmitter<CriteriaInfo>();

    @Input() name: string = 'Options';

    @Input() headerTitle: string = 'Select';

    @Input() dropdownList: CriteriaInfo [] = [];

    @Input() currentSelected: CriteriaInfo | undefined = {
        name: 'defaultName',
        id: 0,
        shortName: 'defaultShortName'
    };

    constructor() {
    }

    ngOnInit(): void {
    }


    ngOnChanges(): void {
        console.log("on change detection, currently selected is : ", customElements);
    }

    handleSelection(dropdownItem: CriteriaInfo): void {
        this.onCriteriaSelected.emit(dropdownItem);
    }
}

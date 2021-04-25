import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CriteriaInfo } from '../../../features/to-do/model/list-filterWrapper';

@Component({
    selector: 'custom-filter-dropdown',
    templateUrl: './custom-filter-dropdown.component.html',
    styleUrls: [ './custom-filter-dropdown.component.css' ]
})
export class CustomFilterDropdownComponent implements OnInit {

    @Output() onCriteriaSelected: EventEmitter<CriteriaInfo> = new EventEmitter<CriteriaInfo>();

    @Input() name: string = 'Options';

    @Input() headerTitle: string = 'Select';

    @Input() dropdownList: CriteriaInfo [] = [];

    @Input() currentSelected: CriteriaInfo = {
        name: 'defaultName',
        id: 0,
        shortName: 'defaultShortName'
    };

    constructor() {
    }

    ngOnInit(): void {
    }

    handleSelection(dropdownItem: CriteriaInfo): void {
        this.onCriteriaSelected.emit(dropdownItem);
    }
}

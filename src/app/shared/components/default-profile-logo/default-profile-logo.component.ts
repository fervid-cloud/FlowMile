import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'default-profile-logo',
    templateUrl: './default-profile-logo.component.html',
    styleUrls: [ './default-profile-logo.component.css' ]
})
export class DefaultProfileLogoComponent implements OnInit, AfterViewInit {

    @Input() size: number = 40;

    @Input() unit: string = "px";

    @Input() completeName: string [] = [];

    private defaultSize: number = 40;

    defaultFontSize: number = 20;

    fontSizeMapperValue: number = 0;

    shortName: string = "G";

    constructor() {
    }

    ngOnInit(): void {
        this.initializeShortName();
    }

    private initializeShortName(): void {
        this.shortName = "";
        for (let i = 0; i < 2; ++i) {
            if (this.completeName[i].trim().length > 0) {
                this.shortName += this.completeName[i].trim()[0];
            }
        }

        if (this.shortName.length == 0) {
            this.shortName = "-1";
        }

        this.fontSizeMapperValue = (this.size - Math.abs(this.size - this.defaultSize)) / this.defaultSize;
        // this.fontSizeMapperValue = (this.size ) / this.defaultSize;
    }

    ngAfterViewInit(): void {
        console.log("the size for the logo specified is : ", this.size);
        console.log("font size is : ", this.fontSizeMapperValue * this.defaultFontSize);
    }


}

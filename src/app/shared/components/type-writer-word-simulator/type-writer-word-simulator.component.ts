import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'type-writer-word-simulator',
    templateUrl: './type-writer-word-simulator.component.html',
    styleUrls: [ './type-writer-word-simulator.component.css' ]
})
export class TypeWriterWordSimulatorComponent implements OnInit, OnDestroy {

    // tslint:disable-next-line:no-input-rename
    @Input('word') givenWord: string = '';

    displayWord: string = '';

    timerTracker: number = -1;
    private TIMER_INTERVAL: number = 200;

    constructor() {
        console.log("given word is : ", this.givenWord);
    }

    ngOnInit(): void {
        console.log("starting");
        console.log(this.givenWord);
        if (this.givenWord.trim().length > 0) {
            this.startSimulator();
        }
    }

    ngOnDestroy(): void {
        clearInterval(this.timerTracker);
    }

    private startSimulator(): void {
        const n = this.givenWord.length;
        let i = 0;
        this.displayWord = "";
        this.timerTracker = setInterval(() => {
            if (i < n) {
                this.displayWord += this.givenWord[i++];
            } else {
                clearInterval(this.timerTracker);
                setTimeout(() => this.startSimulator(), 2000);
            }
            console.log(this.displayWord);
        }, this.TIMER_INTERVAL);
    }
}

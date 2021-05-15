import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Params } from '@angular/router';
import { ListFilterSortPaginationWrapperDto } from '../../../features/to-do/dto/list-filter-wrapper-dto';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

    constructor(

    ) { }

    static getAllRouteParams1(activatedRoute: ActivatedRoute) {
        let allParams: Params = {};
        const activatedRouteSnapShotsArray: ActivatedRouteSnapshot[] = [activatedRoute.snapshot.root];
        console.log(activatedRouteSnapShotsArray);
        // kind of dfs in iterative way
        while (activatedRouteSnapShotsArray.length > 0) {
            const route = activatedRouteSnapShotsArray.pop()!;
            allParams = { ...allParams, ...route.params , route};
            activatedRouteSnapShotsArray.push(...route.children);
        }
        return allParams;
    }

    static getAllRouteParams2(activatedRoute: ActivatedRoute) {
        let allParams: Params = {};
        const activatedRouteSnapShots: ActivatedRouteSnapshot[] = [activatedRoute.snapshot.root];
        let route = activatedRouteSnapShots[0];
        console.log(route);
        while (route) {
            allParams = { ...allParams, ...route?.params };
            route = route.children[0];
        }
        return allParams;
    }

    static isValidNumber(givenValue: number): boolean {
        return !isNaN(givenValue) && isFinite(givenValue) && givenValue > 0;
    }

    static getUpdatedPageNumber(pageNumber: any): number {
        if (!pageNumber || !UtilService.isValidNumber(parseInt(pageNumber, 10))) {
            return 1;
        } else {
            return parseInt(pageNumber, 10);
        }
    }

    public static formatTime(date: Date) {
        date = new Date(date);
        return date.toLocaleTimeString() + ", " + date.toLocaleDateString();
    }




}

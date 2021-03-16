import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

    constructor() { }

    getAllRouteParams1(activatedRoute: ActivatedRoute) {
        let allParams: Params = {};
        const activatedRouteSnapShotsArray: ActivatedRouteSnapshot[] = [activatedRoute.snapshot.root];
        console.log(activatedRouteSnapShotsArray);
        //kind of dfs in iterative way
        while (activatedRouteSnapShotsArray.length > 0) {
            const route = activatedRouteSnapShotsArray.pop()!;
            allParams = { ...allParams, ...route.params };
            activatedRouteSnapShotsArray.push(...route.children);
        }
        return allParams;
    }

    getAllRouteParams2(activatedRoute: ActivatedRoute) {
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
}

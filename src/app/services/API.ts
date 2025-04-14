import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Restaurant } from "../pages/order-page/interface";
import { BehaviorSubject, firstValueFrom } from "rxjs";


@Injectable ({
    providedIn: 'root'
})

export class API {
   
    private readonly _data$ = new BehaviorSubject< null | Restaurant >(null as any);
    public readonly data$ = this._data$.asObservable();

    constructor(
        private readonly _http: HttpClient
    ) {
    }


    async getHttpClient (): Promise<Restaurant> {
        const data = this._data$.value;
        if (data) {
            return data;
        }

        const url = `./resto-data.json`;
        const ops = {
            headers: new HttpHeaders({
                'authorization': 'xxx',
            })
        };
        const request = this._http.get<Restaurant>(url, ops);
        const response = await firstValueFrom(request)
        this._data$.next(response);
        return response;
    }
};


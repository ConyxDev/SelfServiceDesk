import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Restaurant } from "../pages/order-page/interface";
import { firstValueFrom } from "rxjs";


@Injectable ({
    providedIn: 'root'
})

export class API {

    constructor(
        private readonly _http: HttpClient
    ) {
        console.log('Hi from the constructor');
    }


    async getHttpClient () {
        const url = `./resto-data.json`;
        const request = this._http.get<Restaurant>(url);
        const response = await firstValueFrom(request)
        return response;

    }
};

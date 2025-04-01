import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";


@Injectable ({
    providedIn: 'root'
})

export class FoodAPI {

    constructor(
        private readonly _http: HttpClient
    ){
        console.log('hello from food api')
    }

    async getFoodApi () {
        const url = "https://www.data.gouv.fr/fr/datasets/r/4fde04b0-6ed9-45b1-a05b-e5da562ad474";
        const request = this._http.get<any>(url);
        const response = await firstValueFrom(request);
        console.log(response);
        return response;
    }


}

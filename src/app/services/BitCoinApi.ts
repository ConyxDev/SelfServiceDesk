import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";


@Injectable ({
    providedIn: 'root'
})

export class BitCoinHttp {

    constructor(
        private readonly _http: HttpClient
    ) {
        console.log('hi from the BitCoin constructor')
    }

    async getBitCoin () {
        const url = 'https://api.coingecko.com/api/v3/coins/bitcoin';
        const request = this._http.get<any>(url);
        const response = await firstValueFrom(request)
        return response;
        
    }

}

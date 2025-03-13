export class API {


    getRecipes = async (): Promise<any> => {
        const response = await fetch('/resto-data.json');
        const database: any = await response.json();
        console.log(database);
        return database;

    }

}


/* export class APIService {
async getRecipes(): Promise<Restaurant> {
    const url = './resto-data.json';
    const request = await fetch(url);
    const response: Restaurant = await request.json();
    console.log(response);
    return response;
}
    async sendOrder() {}


}

*/
export class API {


    getRecipes = async (): Promise<any> => {
        const response = await fetch('/resto-data.json');
        const database: any = await response.json();
        console.log(database);
        return database;

    }

}
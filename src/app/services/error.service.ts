import { ErrorHandler, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ErrorService implements ErrorHandler {
  handleError(error: any) {
    console.error('Error:', error);
  }
}

export default ErrorService;

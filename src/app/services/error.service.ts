import { ErrorHandler, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ErrorService implements ErrorHandler {
  handleError(error: any) {
  }
}

export default ErrorService;

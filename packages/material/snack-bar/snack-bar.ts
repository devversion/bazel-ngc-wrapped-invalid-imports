import {Injectable} from "@angular/core";
import {Overlay} from "@angular/cdk/overlay";

@Injectable({providedIn: 'root'})
export class MatSnackBar {

    constructor(private overlay: Overlay) {}

}
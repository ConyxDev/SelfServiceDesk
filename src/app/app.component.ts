import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, collectionData, query } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonApp, IonRouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SelfServiceDesk';
  public data$: any;
  public currentUser$: any;


  constructor(
    private readonly _auth: Auth,
    private readonly _firestore: Firestore,
    private readonly _router: Router
  ) {}

  loadData(): void {
    const collectionRef = collection(this._firestore, 'demo');
    const q = query(collectionRef);
    const data$ = collectionData(q);
    this.data$ = data$;
  };



  };
  

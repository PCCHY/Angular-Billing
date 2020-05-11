import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user : User;

  constructor(private afAuth: AngularFireAuth, public router: Router, private ngZone: NgZone) { 
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        //JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        //JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // async login(email: string, password: string) {
  //   var result = await this.afAuth.auth.signInWithEmailAndPassword(email, password)
  //   this.router.navigate(['/']);
  // }

  async login(email:string,password:string){
    return this.afAuth.auth.signInWithEmailAndPassword(email,password).then((result) => {
      this.ngZone.run(() =>{
        location.reload();
        this.router.navigate(['/order-detail']);
      });
    }).catch((error) => {
      window.alert(error.message)
    });
  }

  async register(email:string, password: string) {
    var result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    this.sendEmailVerification();
  }

  async sendEmailVerification(){
    await this.afAuth.auth.currentUser.sendEmailVerification()
    this.router.navigate(['/verify-email']);
  }

  async sendPasswordResetEmail(passwordResetEmail: string){
    return await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
  }

  async logout(){
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  async loginWithGoogle(){
    await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
    this.router.navigate(['/order-detail']);
  }


}

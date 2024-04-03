import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login!: string;
  password!: string;
  rememberMe!: boolean;
  isToastOpen = false;


  ngOnInit() {
    this.loadCredentials();
  }

  constructor(private storage: Storage, private http: HttpClient, private navCtrl: NavController) {
    this.initStorage();
  }
  
  
  async initStorage() {
    await this.storage.create();
  }

  async loadCredentials() {
    const storedCredentials = await this.storage.get('credentials');
    if (storedCredentials) {
      this.login = storedCredentials.login;
      this.password = storedCredentials.password;
      this.rememberMe = true;
    }
  }
  
  async saveCredentials() {
    if (this.rememberMe) {
      await this.storage.set('credentials', { login: this.login, password: this.password });
    } else {
      await this.storage.remove('credentials');
    }
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  async connect() {
    const url = `http://www.sebastien-thon.fr/prince/index.php?connexion&login=${this.login}&mdp=${this.password}`;
    this.http.get(url).subscribe(
      (response: any) => {
        console.log(response);
        if (response.erreur === 'Login ou mot de passe incorrect') {
          this.setOpen(true);
        }
        if (response.resultat === "OK") {
          this.saveCredentials();
          this.onLoginSuccess();
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  async onLoginSuccess() {
    const hasSeenTutorial = await this.storage.get('hasSeenTutorial');
    if (!hasSeenTutorial) {
      await this.storage.set('hasSeenTutorial', true);
      this.navCtrl.navigateRoot('/slider');
    } else {
      this.navCtrl.navigateRoot('/tabs');
    }
  }
  
}
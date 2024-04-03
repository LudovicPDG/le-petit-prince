import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  login!: string;
  password!: string;
  class!: number;
  dates: any[] = [];

  constructor(private storage: Storage) {
    this.initStorage();
  }

  handleRefresh(event: any): void {
    this.getDateInformations();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  async initStorage() {
    await this.storage.create();
  }

  async ngOnInit() {
    await this.loadCredentials();
    this.getDateInformations();
  }

  async loadCredentials() {
    const storedCredentials = await this.storage.get('credentials');
    if (storedCredentials) {
      switch (storedCredentials.login) {
        case 'classe1':
          this.class = 1;
          break;
        case 'classe2':
          this.class = 2;
          break;
        case 'classe3':
          this.class = 3;
          break;
      }
      this.login = storedCredentials.login;
      this.password = storedCredentials.password;
    }
  }

  async getDateInformations() {
    console.log(this.login)
    console.log(this.password)
    const url = `http://www.sebastien-thon.fr/prince/index.php?login=${this.login}&mdp=${this.password}`;
    fetch(url)
      .then(response => response.json())
      .then(data => data.dates)
      .then(data => data.filter((date: any) => date.classe === this.class))
      .then(data => {
        console.log(data);
        this.dates = data;
      });
  }

}

import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  login!: string;
  password!: string;
  class!: number;
  articles: any[] = [];
  public results = [...this.articles];


  constructor(private storage: Storage) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
  }

  async toggleFavorite(article: any) {
    article.favorite = !article.favorite;
    await this.storage.set(`article-${article.id}-favorite`, article.favorite);
  }

  async loadFavorites() {
    for (const article of this.articles) {
      const favorite = await this.storage.get(`article-${article.id}-favorite`);
      article.favorite = favorite !== null ? favorite : false;
    }
  }

  handleRefresh(event: any): void {
    this.getArticlesInformations();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  async ngOnInit() {
    await this.loadCredentials();
    this.getArticlesInformations();
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

  handleInput(event: any = null) {
    const query = event.target.value.toLowerCase();
    this.results = this.articles.filter((article) => article.titre.toLowerCase().indexOf(query) > -1);
    console.log(this.results);
  }

  async getArticlesInformations() {
    console.log(this.login, this.password)
    const url = `http://www.sebastien-thon.fr/prince/index.php?login=${this.login}&mdp=${this.password}`;
    fetch(url)
      .then(response => response.json())
      .then(data => data.articles)
      .then(data => data.filter((article: any) => article.classe === this.class))
      .then(data => {
        this.articles = data;
        this.results = [...this.articles];
        this.loadFavorites();
        console.log(this.articles);
      });
  }

  





}

import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Data } from '../data/data';
@Component({
  selector: 'app-get-started',
  templateUrl: 'get-started.page.html',
  styleUrls: ['get-started.page.scss'],
})
export class GetStartedPage {
  displayContent: boolean = false;
  firstTitle: string;
  secondTitle: string;
  thirdTitle: string;
  fourthTitle: string;
  getStartedButtonText: string;
  slideOpts: any = {};
  constructor(
    private navCtrl: NavController, 
    private data: Data
    ) {}
  ionViewDidEnter() {
    this.fetchData();
    this.setStringsToLanguage();
  }
  fetchData() {
    if (window.localStorage.getItem("data")) {
      this.data = JSON.parse(window.localStorage.getItem("data"));
    }
    this.checkUser();
  }
  checkUser() {
    if (this.data?.user?.isLoggedin) {
      this.navCtrl.navigateRoot("home");
    } else {
      this.displayContent = true;
      if (!this.data.settings?.language) this.data.settings.language = "en";
    }
  }
  setStringsToLanguage() {
    switch(this.data.settings.language) {
      case "en": 
        this.firstTitle = "This service helps to quickly generate and download an insurance report";
        this.secondTitle = "Easily generate a report and download it directly to your smartphone";
        this.thirdTitle = "Easily find a branch of an insurance company";
        this.fourthTitle = "Smart Mobile Services, fast solutions for telephone problems";
        this.getStartedButtonText = "Get started";
        break;
      case "ge":
        this.firstTitle = "Dieser Service hilft, schnell einen Versicherungsbericht zu erstellen und herunterzuladen";
        this.secondTitle = "Erstellen Sie ganz einfach einen Bericht und laden Sie ihn direkt auf Ihr Smartphone herunter";
        this.thirdTitle = "Einfach eine Filiale einer Versicherungsgesellschaft finden";
        this.fourthTitle = "Smart Mobile Services, schnelle Lösungen für Telefonprobleme";
        this.getStartedButtonText = "Erste Schritte";
        break;
      case "ru":
        this.firstTitle = "Этот сервис помогает быстро сформировать и загрузить страховой отчет";
        this.secondTitle = "С легкостью создайте отчет и загрузите его прямо на свой смартфон";
        this.thirdTitle = "Легко найти филиал страховой компании";
        this.fourthTitle = "Умные мобильные службы, быстрое решение проблем с телефоном";
        this.getStartedButtonText = "Начать";
        break;
      default: 
        this.firstTitle = "This service helps to quickly generate and download an insurance report";
        this.secondTitle = "Easily generate a report and download it directly to your smartphone";
        this.thirdTitle = "Easily find a branch of an insurance company";
        this.fourthTitle = "Smart Mobile Services, fast solutions for telephone problems";
        this.getStartedButtonText = "Get started";
      break;
    }
  }
  ngOnInit() {
  }
  getStarted() {
    this.navCtrl.navigateRoot("entry");
  }
}

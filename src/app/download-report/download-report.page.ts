import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import JSPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File, IWriteOptions } from '@ionic-native/file/ngx';
import { AngularFirestore } from "@angular/fire/firestore";

import { Data } from '../data/data';
import { Config } from '@ionic/angular';
@Component({
  selector: 'app-download-report',
  templateUrl: 'download-report.page.html',
  styleUrls: ['download-report.page.scss'],
})
export class DownloadReportPage {
  supabase: any;
  email: any;
  password: any;
  errorMessage: any;
  displayError: boolean = false;
  titleText: string;
  labelText: string;
  backButtonText: string;
  saveButtonText: string;
  constructor(
    private navCtrl: NavController, 
    public data: Data, 
    public config: Config,
    private file: File,
    private fileOpener: FileOpener,
    private angularFirestore: AngularFirestore,
    ) {

  }
  ngOnInit() {}
  ionViewDidEnter() {
    this.fetchData();
    this.setStringsToLanguage();
  }
  fetchData() {
    this.data = JSON.parse(window.localStorage.getItem("data"));
    this.angularFirestore.collection("users").doc(this.data.user.uid).ref.get().then(res => {
      this.data.user = res.data();
    })
  }
  setStringsToLanguage() {
    switch(this.data.settings.language) {
      case "en": 
        this.titleText = "Download report"; 
        this.labelText = "Report"
        this.backButtonText = "Back";
        this.saveButtonText = "Save";
        break;
      case "ge":
        this.titleText = "Bericht herunterladen";
        this.labelText = "Bericht"
        this.backButtonText = "Zurück";
        this.saveButtonText = "Speichern";
        break;
      case "ru":
        this.titleText = "Скачать отчет";
        this.labelText = "Отчет"
        this.backButtonText = "Назад";
        this.saveButtonText = "Сохранить";
        break;
      default: 
        this.titleText = "Download report"; 
        this.labelText = "Report"
        this.backButtonText = "Back";
        this.saveButtonText = "Save";
        break;
    }
  }

  createPdf() {
    const pdfBlock = document.getElementById("print-wrapper");
    
    const options = { 
      background: "white", 
      height: pdfBlock.clientWidth, 
      width: pdfBlock.clientHeight 
    };

    domtoimage.toPng(pdfBlock, options).then((fileUrl) => {
      var doc = new JSPDF("p","mm","a4");
      doc.addImage(fileUrl, 'PNG', 10, 10, 180, 240);
  
      let docRes = doc.output();
      let buffer = new ArrayBuffer(docRes.length);
      let array = new Uint8Array(buffer);
      for (var i = 0; i < docRes.length; i++) {
          array[i] = docRes.charCodeAt(i);
      }
  
  
      const directory = "file:///storage/emulated/0/Documents";
      const fileName = String(this.data.user.uid + "-" + this.data.mobileData.defect) + ".pdf";

      let options: IWriteOptions = { 
        replace: true 
      };
      ///file:///storage/emulated/0/Documents
      this.file.checkFile(directory, fileName).then((res)=> {
        this.file.writeFile(directory, fileName,buffer, options)
        .then((res)=> {
          console.log("File generated" + JSON.stringify(res));
          this.fileOpener.open(directory + fileName, 'application/pdf')
            .then(() => console.log('File is exported'), err => console.error("1" + JSON.stringify(err)))
            .catch(e => console.error("2" + JSON.stringify(e)));
        }, err => console.error("3" + JSON.stringify(err))).catch((error)=> {
          console.error("4" + JSON.stringify(error));
        });
      }, err => {
        console.error("5" + JSON.stringify(err));

        this.file.writeFile(directory,fileName,buffer).then((res)=> {
          console.log("File generated" + JSON.stringify(res));
          this.fileOpener.open(directory + fileName, 'application/pdf')
            .then(() => console.log('File exported'), err => console.error("13" + JSON.stringify(err)))
            .catch(e => console.error("14" + JSON.stringify(e)));
        }, err => {
          if (err.message == "PATH_EXISTS_ERR") {
            this.file.removeFile(directory,fileName).then(res => {

              this.file.writeFile(directory,fileName,buffer).then((res)=> {
                console.log("File generated" + JSON.stringify(res));
                this.fileOpener.open(directory + fileName, 'application/pdf')
                  .then(() => console.log('File exported'), err => console.error("18" + JSON.stringify(err)))
                  .catch(e => console.error("19" + JSON.stringify(e)));
              }, err => console.error("20" + JSON.stringify(err)))
              .catch((error)=> {
                console.error("21" + JSON.stringify(error));
              });

            }, err => console.error("17" + JSON.stringify(err)));
            // this.file.writeExistingFile(directory,fileName,buffer).then(res => {}, err => {});
          }
          console.error("15" + JSON.stringify(err));
        })
        .catch((error)=> {
          console.error("16" + JSON.stringify(error));
        });

      }).catch((error)=> {
        console.error("6" + JSON.stringify(error));
        this.file.writeFile(directory,fileName,buffer).then((res)=> {
          console.log("File generated" + JSON.stringify(res));
          this.fileOpener.open(directory + fileName, 'application/pdf')
            .then(() => console.log('File exported'), err => console.error("7" + JSON.stringify(err)))
            .catch(e => console.error("8" + JSON.stringify(e)));
        }, err => console.error("9" + JSON.stringify(err)))
        .catch((error)=> {
          console.error("10" + JSON.stringify(error));
        });
      });
    }, err => console.error("11" + JSON.stringify(err))).catch(function (error) {
      console.error("12" + JSON.stringify(error));
    });
  }
  
  ionViewDidLeave() {
    this.config.set('animated', false);
  }
  redirect(page) {
    this.navCtrl.navigateForward(page, {animated: false});
  }
  save() {
    this.saveInfoToDB();
  }
  saveInfoToDB() {
    const ref = this.angularFirestore.collection("users").doc(this.data.user.uid);
    this.data.mobileData.date = new Date();
    ref.get().subscribe(obs => {
      var data: any = obs.data();
      var reports: any = data.reports;
      if (reports) {
        reports.push(this.data.mobileData);
      } else {
        reports = Array(this.data.mobileData);
      }
      ref.update({
        reports: reports
      }).then(_ => {
        ref.get().subscribe(obs => {
          this.saveDataToStorage(obs.data());
        });
      });
    })
  }
  saveDataToStorage(data) {
    this.data.user = data;
    this.data.user.isLoggedin = true;
    window.localStorage.setItem("data", JSON.stringify(this.data));
  }
}

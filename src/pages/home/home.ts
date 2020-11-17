import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { from } from 'rxjs/observable/from';
import { textChangeRangeIsUnchanged } from 'typescript';
import { SmileProvider } from '../../providers/smile/smile';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public smile: SmileProvider, public loadingController: LoadingController, public storage: Storage) {
    let that = this;
    this.storage.get('last_tag').then((val) => {
      if (val) {
        return
      }
      that.storage.set('last_tag', 1);
    });
  }

  getTag(): Promise<any> {
    return this.storage.get('last_tag')
  }

  captureSelfie() {
    let that = this;
    this.getTag().then(result => {
      let tag = "test_unique_tag_" + result;
      that.smile.captureSelfie(tag).then(result => {
        if (result["SMILE_ID_RESULT"] === "success") {
          alert("Selfie Capture success");
        } else {
          alert("Selfie Capture cancelled");
        }
      }).catch(err => {
        alert("Selfie Capture Failed : " + err);
      })
    }).catch(err => {
      alert("Selfie Capture Failed :" + err);
    })
  }

  captureIDCard() {
    let that = this;
    this.getTag().then(result => {
      let tag = "test_unique_tag_" + result;
      that.smile.captureID(tag).then(result => {
        if (result["SMILE_ID_RESULT"] === "success") {
          alert("ID Capture success");
        } else {
          alert("ID Capture cancelled");
        }
      }).catch(err => {
        alert("ID Capture Failed :" + err);
      })
    }).catch(err => {
      alert("ID Capture Failed :" + err);
    })

  }

 enrolWithoutID() {
    let loading = this.loadingController.create({
      cssClass: 'my-custom-class',
      content: 'Please wait...',
      duration: 200000
    });
    let that = this;
    let d = new Date();
    var n = d.getTime();
    let tag = "mic" + n;
    that.smile.captureSelfie(tag).then(result => {
      if (result["SMILE_ID_RESULT"] === "success") {
        loading.present();
        that.upload(4, tag, false, tag).then(result => {
          console.log("JAPHET TAG SAVED " + tag);
          that.storage.set('last_tag', tag);
          loading.dismiss();
          alert("Enrolled successfully ");
        }).catch(err => {
          loading.dismiss();
          alert("Enrolled Failed : " + err);
        })
      } else {
        alert("ID Capture Failed :" + JSON.stringify(result));
      }
    }).catch(err => {
      alert("ID Capture Failed :" + err);
    })
  }

  async enrolWithID() {
    let loading = this.loadingController.create({
      cssClass: 'my-custom-class',
      content: 'Please wait...',
      duration: 200000
    });
    let that = this;
    let d = new Date();
    var n = d.getTime();
    let tag = "mic" + n;
    console.log("JAPHET");
    that.smile.captureSelfie(tag).then(result => {
      if (result["SMILE_ID_RESULT"] === "success") {
        that.smile.captureID(tag).then(result => {
          if (result["SMILE_ID_RESULT"] === "success") {
            loading.present();
            that.upload(1, tag, true, tag).then(result => {
              console.log("JAPHET TAG SAVED " + tag);
              that.storage.set('last_tag', tag);
              loading.dismiss();
              alert("Enrolled successfully ");
            }).catch(err => {
              loading.dismiss();
              alert("Enrolled Failed : " + err);
            })
          } else {
            console.log(result["SMILE_ID_RESULT"])
            alert("Enrolled cancelled" + result);
          }
        }).catch(err => {
          alert("ID Capture Failed :" + err);
        })
      } else {
        console.log(result["SMILE_ID_RESULT"])
        alert("Enrolled cancelled" + result);
      }
    }).catch(err => {
      alert("ID Capture Failed :" + err);
    })
  }

  async authenticate() {
    let loading = this.loadingController.create({
      cssClass: 'my-custom-class',
      content: 'Please wait...',
      duration: 200000
    });

    let that = this;
    this.getTag().then(result => {
      let tag = result;
      console.log("rettrevied " + tag);
      that.smile.captureSelfie(tag).then(result => {
        if (result["SMILE_ID_RESULT"] === "success") {
          console.log("rettrevied 2 " + tag);
          loading.present();
          that.upload(2, tag, false, tag).then(result => {
            loading.dismiss();
            alert("Authenticated successfully1 ");
          }).catch(err => {
            loading.dismiss();
            alert("Authentication Failed : " + err);
          })
        }else{
          alert("Authenticated cancelled ");
        }
      }).catch(err => {
        alert("Authentication Failed :" + err);
      })
    }).catch(err => {
      loading.dismiss();
      alert("Authentication Failed :" + err);
    })
  }

  upload(jobType: number, tag: string, useIdCard: boolean, userId: string): Promise<any> {
    let jobInfo = {
      tag: tag,
      jobType: jobType,
      useIdCard: useIdCard
    }

    let partnerParams = {
      test: "test",
      userId: userId
    }

    let userIdInfo = {

    }

    let sidNetInfo = {
      authUrl: "api/v2/#/auth_smile/",
      partnerUrl: "https://test-smileid.herokuapp.com/",
      partnerPort: "8080",
      lambdaUrl: "https://testapi.smileidentity.com/v1/",
      siPort: "8443"
    }

    console.log("JAPHET upload " + jobInfo);
    return this.smile.upload(jobInfo, partnerParams, userIdInfo, sidNetInfo)
  }

}

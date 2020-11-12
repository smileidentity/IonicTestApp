import { Injectable } from '@angular/core';
import { Plugin, Cordova, CordovaProperty, CordovaInstance, IonicNativePlugin } from '@ionic-native/core'

/*
  Generated class for the SmileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Plugin({
  pluginName: "smileidionic",
  plugin: "cordova-plugin-smileid",
  pluginRef: "SmileIDIonic",
  platforms: ['Android', 'iOS'],
})

@Injectable()
export class SmileProvider {

  @Cordova()
  captureSelfie(arg0: any): Promise<any> {
    return;
  }

  @Cordova()
  captureID(arg0: any): Promise<any> {
    return;
  }

  @Cordova()
  upload(jobInfo: any, partnerParams: any, userIdInfo: any, sidNetInfo: any): Promise<any> {
    return;
  }

}

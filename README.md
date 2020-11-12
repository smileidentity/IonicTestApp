# Smile Identity Ionic Test App


A test application for the Smile Identity Ionic Wrapper located here https://github.com/smileidentity/SmileIDIonic

# Step 1
```sh
$ git clone https://github.com/smileidentity/SmileIDIonic
```

#Step 2
```sh
$ npm i
```

#Step 3
```sh
$ ionic cordova platform add android
```

#Step 4 
- Download your partner smile_detect_library-release.aar file from your partner portal a https://www.smileidentity.com/
- Place this file in the folder ./platforms/android/app/src/main/libs

#Step 5
Configure your platforms/android/local.properties to point to your ndk and sdk locations
ndk.dir=$ANDROID_NDK_HOME
sdk.dir=$ANDROID_SDK_HOME

#Step 6
Replace the contents of the file platforms/android/project.properties with the below
```groovy
target=android-28
android.library.reference.1=CordovaLib
android.library.reference.2=app
cordova.system.library.1=com.android.support:support-annotations:27.+
cordova.gradle.include.1=cordova-android-play-services-gradle-release/starter-cordova-android-play-services-gradle-release.gradle
cordova.system.library.3=com.google.android.gms:play-services-vision:18.0.0
cordova.system.library.4=com.android.support:appcompat-v7:28.0.0
cordova.system.library.5=com.android.support:support-v4:28.0.0
cordova.system.library.6=com.android.support.constraint:constraint-layout:1.1.3
cordova.system.library.7=com.android.support:exifinterface:28.0.0
cordova.system.library.8=com.google.code.gson:gson:2.8.4
cordova.gradle.include.2=cordova-plugin-smileid/starter-smile.gradle
```
#Step 7
Add gradle dependancies to platforms/android/app/build.gradle under the app dependancies
```groovy
  implementation "com.android.support:support-annotations:27.+"
  implementation "com.google.android.gms:play-services-vision:18.0.0"
  implementation "com.android.support:appcompat-v7:28.0.0"
  implementation "com.android.support:support-v4:28.0.0"
  implementation "com.android.support.constraint:constraint-layout:1.1.3"
  implementation "com.android.support:exifinterface:28.0.0"
  implementation "com.google.code.gson:gson:2.8.4"
```
#Build and Run
Connect your android device and run
```sh
$ ionic cordova run android
```


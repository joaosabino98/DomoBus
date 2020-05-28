# DOMOBUS MOBILE INTERFACE - FRONT-END
Ambient Intelligence 2019/2020 - G11

## Functionalities

1. Login with user selection\
	Users in database are fetched during splash screen\
	User data is fetched after login

2. View devices in home\
	List all devices in home with short status indicator\
	Search by name\
	Sort by name or division\
	Refresh all data\
	Restricted access to devices in unauthorized divisions\
	Touch device to control it

3. Control device\
	Overlay with all properties\
	Context-based controls\
	Edit name of device

## Instructions to install React-Native (Ubuntu):

1. Install Node.js:
```
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
```
2. Install Java SE Development Kit version 8 or OpenJDK:
```
sudo apt install openjdk-8-jdk
```
3. Donwload and install Android Studio from [this site](https://developer.android.com/studio/index.html)
   Make sure the following boxes are checked:
    Android SDK
    Android SDK Platform
    Android Virtual Device
   
   Install the Android SDK
```
The SDK Manager can be accessed from the "Welcome to Android Studio" screen.
Click on "Configure", then select "SDK Manager".
Select the "SDK Platforms" tab from within the SDK Manager, then check the box next to "Show Package Details" in the bottom right corner.
Look for and expand the Android 9 (Pie) entry, then make sure the following items are checked:
  Android SDK Platform 28
  Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image

Next, select the "SDK Tools" tab and check the box next to "Show Package Details" here as well.
Look for and expand the "Android SDK Build-Tools" entry, then make sure that 28.0.3 is selected.

Finally, click "Apply" to download and install the Android SDK and related build tools.
```
4. Configure the `ANDROID_HOME` environment variable:
Add the following lines to your `$HOME/.bash_profile` or `$HOME/.bashrc` config file:
```
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```
5. Install Watchman:
```
brew update
brew install watchman
```
6. React Native CLI:
Rather than install and manage a specific version of the CLI globally, we recommend you access the current version at runtime using `npx`, which ships with Node.js. With `npx react-native <command>`, the current stable version of the CLI will be downloaded and executed at the time the command is run.

## Instructions to setup the Android virtual device:

If you have recently installed Android Studio, you will likely need to create a new AVD.
Select *Create Virtual Device...*, then pick any Phone from the list and click *Next*, then select the Pie API Level 28 image.
Click *Next* then *Finish* to create your AVD.

## Instructions for running the React Native application:
Launch the Android Virtual Device you created in the previous section.
Open a terminal:
```
cd ./DomoBus/Front-end/DomoBus
npx react-native start
```
Open another terminal:
```
cd ./DomoBus/Front-end/DomoBus
npx react-native run-android
```
The app will run on the emulated device and you can edit the code while watching it change live.

## Instructions to generate a new APK:
Open a terminal:
```
cd ./DomoBus/Front-end/DomoBus/android
./gradlew assembleRelease
```
The APK will be in `./DomoBus/Front-end/DomoBus/android/app/build/outputs/apk/release`.







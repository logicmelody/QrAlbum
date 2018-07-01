import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import QRCode from '@remobile/react-native-qrcode-local-image';
import URL from 'url-parse';
import { PermissionsAndroid } from 'react-native';
import Button from './components/Button';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			qrCodeLog: 'No image selected'
		};
	}
	_selectPhotoTapped() {
		if (Platform.OS === 'ios') {
			this._showImagePicker();
		} else {
			this._requestPermissionForAndroid();
		}
	}
	async _requestPermissionForAndroid() {
		try {
			//const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
			const granted = await PermissionsAndroid.requestMultiple(
				[
					PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
					PermissionsAndroid.PERMISSIONS.CAMERA
				]);

			console.log(granted);

			if (granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED && 
				granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED) {
				console.log("Show image picker")
				this._showImagePicker();
			} else {
			  	console.log("Show dialogs")
			}
		} catch (err) {
			console.warn(err)
		}
	}
	_showImagePicker() {
		const options = {
			mediaType: 'photo',
			quality: 1.0,
		};

		ImagePicker.launchImageLibrary(options, response => {
			console.log('Response = ', response);

			if (response.didCancel) {
				console.log('User cancelled photo picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				console.log(
					'User tapped custom button: ',
					response.customButton
				);
			} else {
				this._decodeImage(response);
			}
		});
	}
	_decodeImage(response) {
		if (response === null) {
			return;
		}

		const imageUri = Platform.OS === 'ios' ?
			new URL(response.uri).set('protocol', '').href : response.path;
		// const url = new URL('https://github.com/foo/bar');
		// url.set('protocol', '');

		console.log('Response uri = ' + response.uri);
		console.log('Response origURL = ' + response.origURL);
		console.log('Response path = ' + response.path);
		console.log('Image uri = ' + imageUri);

		QRCode.decode(imageUri, (error, result) => {
			console.log('decode error = ' + error);
			console.log('decode result = ' + result);

			this.setState({
				qrCodeLog: error ? 'There is no qr code' : result
			});
		});
	}
	render() {
		return (
			<View style={styles.containerStyle}>
				<Button onPress={() => this._selectPhotoTapped()}>
					Show Image Picker
				</Button>
				<Text>{this.state.qrCodeLog}</Text>
			</View>
		);
	}
}

const styles = {
	containerStyle: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center'
	}
};

export default App;

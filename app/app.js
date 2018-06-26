import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { byteLength, toByteArray, fromByteArray } from 'base64-js';
import jsQR from 'jsqr';
import Button from './components/Button';

const QRCode = require('@remobile/react-native-qrcode-local-image');

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			qrCodeLog: 'No image selected'
		};
	}
	selectPhotoTapped() {
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
				// console.log('Image width = ' + response.width);
				// console.log('Image height = ' + response.height);
				// console.log('ByteArray length = ' + byteLength(response.data));
				// console.log('ByteArray data = ' + toByteArray(response.data));

				// const code = jsQR(toByteArray(response.data), response.width, response.height);
				// console.log('QR code = ' + code);

				//const uri = response.origURL.slice(16);

				console.log(response.uri);
				console.log(response.origURL);
				console.log(response.path);
				console.log(encodeURI(response.path));

				QRCode.decode(encodeURI(response.path), (error, result) => {
					console.log(error);
					console.log(result);

					this.setState({
						qrCodeLog: error ? 'There is no qr code' : result
					});
				})
			}
		});
	}
	render() {
		return (
			<View style={styles.containerStyle}>
				<Button onPress={() => this.selectPhotoTapped()}>
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

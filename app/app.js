import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import QRCode from '@remobile/react-native-qrcode-local-image';
import URL from 'url-parse';
import Button from './components/Button';

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
				this.decodeImage(response);
			}
		});
	}
	decodeImage(response) {
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

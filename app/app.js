import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';
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
				this.decodeImage(response);
			}
		});
	}
	decodeImage(response) {
		const imageUri = Platform.OS === 'ios' ? response.uri.slice(7) : response.path;

		console.log('Response uri = ' + response.uri);
		console.log('Response origURL = ' + response.origURL);
		console.log('Response path = ' + response.path);
		console.log('Image uri = ' + imageUri);

		QRCode.decode(imageUri, (error, result) => {
			console.log(error);
			console.log(result);

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

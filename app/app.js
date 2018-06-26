import React, { Component } from 'react';
import { View } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Button from './components/Button';

class App extends Component {
	selectPhotoTapped() {
		ImagePicker.launchImageLibrary(null, response => {
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
				// You can also display the image using data:
				let source = { uri: 'data:image/jpeg;base64,' + response.data };

				console.log('Image data = ' + response.data);

				this.setState({
					avatarSource: source
				});
			}
		});
	}
	render() {
		return (
			<View style={styles.containerStyle}>
				<Button
					onPress={() => this.selectPhotoTapped()}
				>
					Show Image Picker
				</Button>;
			</View>
		);
	}
}

const styles = {
	containerStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
};

export default App;

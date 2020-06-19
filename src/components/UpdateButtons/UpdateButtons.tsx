import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

interface Props {
  decreaseValue: () => void;
  increaseValue: () => void;
}

const UpdateButtons: React.FC<Props> = ({increaseValue, decreaseValue}) => {
  return (
    <View style={styles.buttons}>
      <TouchableOpacity style={styles.button} onPress={decreaseValue}>
        <Image
          style={styles.buttonImage}
          source={require('../../assets/minus-icon.png')}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={increaseValue}>
        <Image
          style={styles.buttonImage}
          source={require('../../assets/plus-icon.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default UpdateButtons;

const styles = StyleSheet.create({
  buttons: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginHorizontal: -10,
  },
  button: {
    marginHorizontal: 10,
  },
  buttonImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
});

import {
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {appIcons, colors, WP} from '../../shared/exporter';

const ChatInput = () => {
  const [textInput, setTextInput] = useState('');
  return (
    <View style={styles.mainContainer}>
      <TextInput
        placeholder="Enter your issue..."
        placeholderTextColor={colors.g9}
        style={styles.input}
        value={textInput}
        onChangeText={text => setTextInput(text)}
      />
      <View style={styles.rowContainer}>
        <TouchableOpacity>
          <Image source={appIcons.gallery} style={styles.galleryIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={appIcons.sendbutton} style={styles.galleryIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export {ChatInput};
const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: colors.g7,
    borderRadius: 15,
    paddingHorizontal: WP('2'),
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: WP('1'),
  },
  galleryIcon: {
    width: WP('10'),
    height: WP('10'),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginLeft: WP('0.5'),
  },
  rowContainer: {
    flexDirection: 'row',
  },
  input: {
    color: colors.white,
  },
});

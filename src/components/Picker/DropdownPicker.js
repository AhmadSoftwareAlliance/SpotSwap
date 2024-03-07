import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {Icon} from 'react-native-elements';
import {
  WP,
  size,
  colors,
  family,
  StatusBarHeight,
  platformOrientedCode,
} from '../../shared/exporter';

export const DropdownPicker = ({
  data,
  title,
  onBlur,
  onFocus,
  onSelect,
  isPickerOpen,
  errorMessage,
  defaultButtonText = 'Choose Brand',
}) => {
  return (
    <View style={styles.pickerContainer}>
      {title && <Text style={styles.labelTxtStyle}>{title}</Text>}
      {/* {console.log("data",JSON.stringify(data,null,2))} */}
      <SelectDropdown
        data={data}
        onBlur={onBlur}
        onFocus={onFocus}
        onSelect={onSelect}
        buttonStyle={styles.buttonStyle}
        rowStyle={styles.pickerRowStyle}
        dropdownOverlayColor={'transparent'}
        dropdownStyle={styles.dropdownStyle}
        defaultButtonText={defaultButtonText}
        dropdownBackgroundColor={colors.white}
        rowTextStyle={styles.pickerRowTxtStyle}
        buttonTextStyle={styles.pickerBtnTxtStyle}
        renderDropdownIcon={() => {
          return (
            <Icon
              type={'MaterialIcons'}
              name={isPickerOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              size={30}
              color={colors.white}
            />
          );
        }}
        // rowTextForSelection={item => `${item?.name}  ${item?.released_year?item?.released_year:""}`}
        rowTextForSelection={item => `${item?.name}`}
        // rowTextForSelection={item => console.log("item.length",item)}
        // buttonTextAfterSelection={selectedItem => `${selectedItem?.name} ${selectedItem?.released_year?selectedItem?.released_year:""}`}
        buttonTextAfterSelection={selectedItem => `${selectedItem?.name}`}
        // buttonTextAfterSelection={selectedItem =>s console.log("selectedItem",selectedItem)}
      />
      {errorMessage ? (
        <Text style={styles.errorTxtStyle}>{errorMessage}</Text>
      ) : (
        <Text style={styles.errorTxtStyle} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  labelTxtStyle: {
    color: colors.g2,
    fontSize: size.tiny,
    paddingBottom: WP('2.5'),
    fontFamily: family.SFProText_Regular,
  },
  buttonStyle: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.g3,
    backgroundColor: colors.t1,
    height: platformOrientedCode(55, 55),
  },
  dropdownStyle: {
    borderWidth: 1,
    borderColor: colors.g3,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    marginTop: platformOrientedCode(-StatusBarHeight + -10, -10),
  },
  pickerBtnTxtStyle: {
    width: '10%',
    textAlign: 'left',
    color: colors.white,
    fontSize: size.normal,
    fontFamily: family.SFProText_Regular,
  },
  pickerRowStyle: {
    backgroundColor: colors.g5,
    borderBottomColor: colors.g5,
  },
  pickerRowTxtStyle: {
    left: 9,
    textAlign: 'left',
    color: colors.white,
    fontSize: size.normal,
  },
  errorStyle: {
    padding: 5,
    color: colors.p1,
    fontSize: size.tiny,
  },
  errorTxtStyle: {
    top: WP('1'),
    color: colors.s1,
    fontSize: size.tiny,
    fontFamily: family.SFProText_Regular,
  },
});

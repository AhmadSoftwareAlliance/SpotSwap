import React, { useRef, useState, useEffect } from 'react';
import { Text, ImageBackground } from 'react-native';
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  WP,
  colors,
  appImages,
  carInfoVS,
  carInfoFormFields,
} from '../../../shared/exporter';
import {
  Spacer,
  AppInput,
  AppButton,
  AppLoader,
  DropdownPicker,
  AppHeader,
} from '../../../components';
import styles from './styles';

// redux stuff
import { useDispatch } from 'react-redux';
import { getCarSpecsRequest } from '../../../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
const colordata = [
  { id: 1, name: "White" },
  { id: 1, name: "Black" },
  { id: 2, name: "Blue" },
  { id: 3, name: "Red" },
  { id: 3, name: "Silver" },
  { id: 3, name: "Grey" },
]
const modaldata = [
  { id: 1, name: "1995" },
  { id: 2, name: "1996" },
  { id: 3, name: "1997" },
  { id: 4, name: "1998" },
  { id: 5, name: "1999" },
  { id: 6, name: "2000" },
  { id: 7, name: "2001" },
  { id: 8, name: "2002" },
  { id: 9, name: "2003" },
  { id: 10, name: "2004" },
  { id: 11, name: "2005" },
  { id: 12, name: "2006" },
  { id: 13, name: "2007" },
  { id: 14, name: "2008" },
  { id: 15, name: "2009" },
  { id: 16, name: "2010" },
  { id: 17, name: "2011" },
  { id: 18, name: "2012" },
  { id: 19, name: "2013" },
  { id: 20, name: "2014" },
  { id: 21, name: "2015" },
  { id: 22, name: "2016" },
  { id: 23, name: "2017" },
  { id: 24, name: "2018" },
  { id: 25, name: "2019" },
  { id: 26, name: "2020" },
  { id: 27, name: "2021" },
  { id: 28, name: "2022" },
  { id: 29, name: "2023" },
]
const AddCarInfo = ({ navigation }) => {
  const formikRef = useRef();
  const [carBrands, setCarBrands] = useState(false);
  const [carModels, setCarModels] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openBrandPicker, setOpenBrandPicker] = useState(false);
  const [openModelPicker, setOpenModelPicker] = useState(false);

  // redux stuff
  const dispatch = useDispatch(null);

  useEffect(() => {
    getCarSpecs();
  }, []);

  const getCarSpecs = () => {
    setIsLoading(true);
    dispatch(
      getCarSpecsRequest(
        res => {
          // console.log("get car space request",JSON.stringify(res,null,2));
          setIsLoading(false);
          let newArry = res?.car_brand.sort((a, b) => a.name.localeCompare(b.name));
          newArry = newArry?.map(item => {
            const car_models = []
            item?.car_models?.forEach(ite => {
              const i = car_models.findIndex(it => it?.name == ite?.name)
              if (i > -1) {
                car_models[i].released_years.push({ ...ite })
              } else {
                car_models.push({ ...ite, released_years: [{ ...ite }] })
              }
            })
            return { ...item, car_models }
          })
          console.log("arr>>>", JSON.stringify(newArry, null, 2));
          setCarBrands(newArry);
        },
        err => {
          setIsLoading(false);
          console.log('Err ==> ', err);
        },
      ),
    );
  };

  return (
    <ImageBackground style={styles.rootContainer} source={appImages.app_bg}>
      <AppLoader loading={isLoading} />
      <AppHeader onBackPress={() => navigation.goBack()} />
      <Formik
        innerRef={formikRef}
        initialValues={carInfoFormFields}
        onSubmit={values => {
          console.log("pressCalled");
          navigation.navigate('AddCarPics', { item: values });
        }}
        validationSchema={carInfoVS}>
        {({
          values,
          errors,
          touched,
          handleSubmit,
          handleChange,
          setFieldValue,
          setFieldTouched,
        }) => (
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <Spacer androidVal={WP('14')} iOSVal={WP('14')} />
            <Text style={styles.passTxtStyle}>Tell us about{'\n'}your car</Text>
            <Spacer androidVal={WP('8')} iOSVal={WP('8')} />
            <DropdownPicker
              data={carBrands}
              onSelect={(selectedItem, index) => {
                setFieldValue('brand', { selectedItem });
                setCarModels(selectedItem?.car_models);
                setFieldValue('length', '');
                setFieldValue('width', '');
                setFieldValue('height', '');
                setFieldValue('color', '');
              }}
              title={'Made / Brand'}
              touched={touched.brand}
              errorMessage={errors.brand}
              isPickerOpen={openBrandPicker}
              defaultButtonText="Choose Brand"
              onFocus={() => setOpenBrandPicker(true)}
              onBlur={() => setOpenBrandPicker(false)}
            />
            <Spacer androidVal={WP('3')} iOSVal={WP('3')} />
            {/* {console.log("carModels>>>",carModels.length)} */}
            <DropdownPicker
              data={carModels}
              onSelect={(selectedItem, index) => {
                console.log("selectedItem", JSON.stringify(selectedItem, null, 2));
                setFieldValue('model', { selectedItem });
                setFieldValue('length', '');
                setFieldValue('width', '');
                setFieldValue('height', '');
                setFieldValue('color', values?.color);
              }}
              title={'Car Model'}
              touched={touched.model}
              errorMessage={errors.model}
              isPickerOpen={openModelPicker}
              defaultButtonText="Choose Model"
              onFocus={() => setOpenModelPicker(true)}
              onBlur={() => setOpenModelPicker(false)}
            />
            <Spacer androidVal={WP('3')} iOSVal={WP('3')} />
            <DropdownPicker
              data={modaldata}
              onSelect={(selectedItem, index) => {
                console.log("selectedItem", selectedItem);
                AsyncStorage.setItem('year', selectedItem?.name)
                console.log("values", values?.model?.selectedItem?.released_years);
                setFieldValue('year', { selectedItem });
                const year = values?.model?.selectedItem?.released_years?.find(item => item?.released_year == selectedItem?.name) > -1
                  || values?.model?.selectedItem?.released_years[0]
                  console.log('yearr',year)
                if (year) {
                  setFieldValue('brandId',year?.id)
                  setFieldValue('length', year?.length?.toString());
                  setFieldValue('width', year?.width?.toString());
                  setFieldValue('height', year?.height?.toString());
                  setFieldValue('color', year?.color?.toString());
                }
                // setFieldValue('model', {selectedItem});
                // setFieldValue('length', selectedItem?.length.toString());
                // setFieldValue('width', selectedItem?.width.toString());
                // setFieldValue('height', selectedItem?.height.toString());
                // setFieldValue('color', selectedItem?.color.toString());
              }}
              title={'Models year'}
              // touched={touched.model}
              errorMessage={false}
              isPickerOpen={openModelPicker}
              // defaultButtonText="Select Color"
              defaultButtonText={
                values
                  ? values.year || 'Select Models'
                  : 'Select Models'
              }
              onFocus={() => setOpenModelPicker(true)}
              onBlur={() => setOpenModelPicker(false)}
            />
            <Spacer androidVal={WP('3')} iOSVal={WP('3')} />
            {/* <AppInput
              renderErrorMessage
              disableFullscreenUI
              value={values.length}
              title="Length (in)"
              blurOnSubmit={false}
              editable={false}
              touched={touched.length}
              keyboardType="numeric"
              placeholder="Enter Length"
              errorMessage={errors.length}
              placeholderTextColor={colors.g2}
              onChangeText={handleChange('length')}
              onBlur={() => setFieldTouched('length')}
            /> */}
            <Spacer androidVal={WP('3')} iOSVal={WP('3')} />
            {/* <AppInput
              title="Color"
              renderErrorMessage
              disableFullscreenUI
              value={values.color}
              blurOnSubmit={false}
              touched={touched.color}
              placeholder="Enter Color"
              errorMessage={errors.color}
              placeholderTextColor={colors.g2}
              onChangeText={handleChange('color')}
              onBlur={() => setFieldTouched('color')}
            /> */}
            <DropdownPicker
              data={colordata}
              onSelect={(selectedItem, index) => {
                console.log("selectedItem",selectedItem);
                // setFieldValue('model', {selectedItem});
                // setFieldValue('length', selectedItem?.length.toString());
                // setFieldValue('width', selectedItem?.width.toString());
                // setFieldValue('height', selectedItem?.height.toString());
                setFieldValue('color', selectedItem?.name);
              }}
              title={'Color'}
              // touched={touched.model}
              errorMessage={false}
              isPickerOpen={openModelPicker}
              // defaultButtonText="Select Color"
              defaultButtonText={
                values
                  ? values.color || 'Select Color'
                  : 'Select Color'
              }
              onFocus={() => setOpenModelPicker(true)}
              onBlur={() => setOpenModelPicker(false)}
            />
            <Spacer androidVal={WP('3')} iOSVal={WP('3')} />
            <AppInput
              renderErrorMessage
              disableFullscreenUI
              value={values.plateNumber}
              blurOnSubmit={false}
              touched={touched.plateNumber}
              errorMessage={errors.plateNumber}
              title="Plate Number (Optional)"
              placeholderTextColor={colors.g2}
              placeholder="Enter Plate Number"
              onChangeText={handleChange('plateNumber')}
              onBlur={() => setFieldTouched('plateNumber')}
            />
            <Spacer androidVal={WP('9')} iOSVal={WP('9')} />
            <AppButton title="Continue" onPress={() => handleSubmit()} />
            <Spacer androidVal={WP('2')} iOSVal={WP('2')} />
          </KeyboardAwareScrollView>
        )}
      </Formik>
    </ImageBackground>
  );
};

export default AddCarInfo;

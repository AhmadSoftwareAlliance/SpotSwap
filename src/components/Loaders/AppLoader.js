import React from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {colors} from '../../shared/exporter';

export const AppLoader = ({loading}) => {
  return (
    <Modal
      avoidKeyboard={true}
      isVisible={loading}
      hasBackdrop={false}
      style={styles.container}>
      <ActivityIndicator size={'large'} color={colors.p1} animating={loading} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0, 0.5)',
  },
});

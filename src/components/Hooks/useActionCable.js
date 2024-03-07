import React, {useEffect, useMemo} from 'react';
import {ActionCable, Cable} from '@kesha-antonov/react-native-action-cable';

export const useActionCable = (url, token) => {
  const actionCable = useMemo(
    () => ActionCable.createConsumer(`${url}token=${token}`),
    [],
  );

  useEffect(() => {
    // ActionCable.startDebugging();
    return () => {
      console.log('Disconnect Action Cable');
      actionCable.disconnect();
    };
  }, []);

  return {actionCable};
};

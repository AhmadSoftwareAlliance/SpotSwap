import React, {useState, useEffect, useRef} from 'react';
import {Cable} from '@kesha-antonov/react-native-action-cable';

export const useChannel = actionCable => {
  const channelRef = useRef();
  const [connected, setConnected] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    return () => {
      unsubscribe();
    };
  }, []);

  const subscribe = (data, callbacks) => {
    const cable = new Cable({});
    const channel = cable.setChannel(
      data.channel_key,
      actionCable.subscriptions.create(data),
    );
    channel
      .on('received', x => {
        console.log('Recieved from ' + data?.channel);
        if (callbacks?.received) callbacks?.received(x);
      })
      .on('connected', x => {
        console.log('Connected to ' + data?.channel);
        setConnected(true);
        if (callbacks.connected) callbacks.connected(x);
      })
      .on('rejected', x => {
        console.log('Rejected');
        setConnected(false);
        if (callbacks.disconnected) callbacks.disconnected();
      })
      .on('disconnected', x => {
        console.log('Disconnected');
        setConnected(false);
        if (callbacks.disconnected) callbacks.disconnected();
      });
    channelRef.current = channel;
  };

  const send = (type, payload) => {
    if (subscribed && !connected) throw 'useChannel - ERROR: not connected';
    if (!subscribed) throw 'useChannel - ERROR: not subscribed';
    try {
      channelRef.current.perform('send_message', {text: 'Hey'});
      //channelRef?.current?.send(type, payload);
    } catch (e) {
      throw 'useChannel - ERROR: ' + e;
    }
  };

  const unsubscribe = () => {
    setSubscribed(false);
    if (channelRef.current) {
      console.log(
        'useChannel - INFO: Unsubscribing from ' +
          channelRef.current.identifier,
      );
      actionCable.subscriptions.remove(channelRef.current);
      channelRef.current = null;
    }
  };

  return {subscribe, unsubscribe, send, connected};
};

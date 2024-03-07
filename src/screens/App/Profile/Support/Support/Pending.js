import React from 'react';
import {View, FlatList} from 'react-native';
import moment from 'moment';
import {useNavigation} from '@react-navigation/core';
import {AppCard, NoRecordsField} from '../../../../../components';

const Pending = ({pendingTickts, isLoading}) => {
  let navigation = useNavigation();

  const renderCard = ({item, index}) => (
    <AppCard
      numberText={item.ticket.ticket_number}
      monthYear={moment(item.ticket.created_at).format('ll')}
      time={moment(item.ticket.created_at).format('LT')}
      messageText={item.ticket.description}
      onPress={() =>
        navigation.navigate('SupportChat', {
          convoId: item?.support_conversation_id,
          ticketNumber: item?.ticket?.ticket_number,
        })
      }
    />
  );

  return (
    <View style={{flex: 1}}>
      {pendingTickts?.length > 0 ? (
        <FlatList
          data={pendingTickts}
          extraData={pendingTickts}
          renderItem={renderCard}
          keyExtractor={(index, item) => index + item.toString()}
        />
      ) : (
        <NoRecordsField loading={isLoading} content="No Pending Tickts Found" />
      )}
    </View>
  );
};

export default Pending;

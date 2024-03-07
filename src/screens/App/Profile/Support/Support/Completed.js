import React from 'react';
import {FlatList, View} from 'react-native';
import moment from 'moment';
import {useNavigation} from '@react-navigation/core';
import {AppCard, NoRecordsField} from '../../../../../components';

const Completed = ({completedTickts, isLoading}) => {
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
      {completedTickts?.length > 0 ? (
        <FlatList
          data={completedTickts}
          extraData={completedTickts}
          renderItem={renderCard}
          keyExtractor={(index, item) => index + item.toString()}
        />
      ) : (
        <NoRecordsField
          loading={isLoading}
          content="No Completed Tickts Found"
        />
      )}
    </View>
  );
};

export default Completed;

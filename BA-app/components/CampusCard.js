import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

const CampusCard = ({ name, focus, adres, gemeente, kleur, image, onPress }) => {

  return (
    /* Schaduw in campuskleur rondom de kaart */
    <Shadow

      distance={20}
      startColor={kleur + '20'}
      offset={[4, 0]}
      style={styles.shadowWrapper}
    >

      <TouchableOpacity
        style={[styles.card, {

        }]}
        onPress={onPress}
      >
        <Image source={image} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Text style={[styles.focus, { color: kleur }]}>{focus}</Text>
          <Text style={styles.adres}>{adres}</Text>
          <Text style={styles.gemeente}>{gemeente}</Text>
        </View>
      </TouchableOpacity>
    </Shadow>
  );
};

const styles = StyleSheet.create({

  shadowWrapper: {
    borderRadius: 32,
    marginBottom: 32,
  },
  card: {
    width: 350,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 32,
    borderWidth: 0,

  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 16,
  },
  info: {
    marginTop: 8,
  },
  name: {
    fontSize: 18,
    fontFamily: 'PoppinsBold',
    marginTop: 8,
  },
  focus: {
    fontSize: 14,
    fontFamily: 'PoppinsSemiBold',
    color: '#4CAF50',
    marginTop: 4,
  },
  adres: {
    fontSize: 12,
    fontFamily: 'PoppinsRegular',
    color: '#555',
    marginTop: 4,
  },
  gemeente: {
    fontSize: 12,
    fontFamily: 'PoppinsRegular',
    color: '#555',
  },
});

export default CampusCard;
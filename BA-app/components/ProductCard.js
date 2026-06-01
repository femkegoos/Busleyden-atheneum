import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

const ProductCard = ({ title, price, image, onPress }) => {
  return (
    <Shadow
      distance={20}
      startColor="#00000020"
      offset={[4, 0]}
      style={styles.shadowWrapper}
    >
      <TouchableOpacity style={styles.card} onPress={onPress}>

        {/* Product foto */}
        <Image source={image} style={styles.image} />

        {/* Titel */}
        <Text style={styles.title}>{title}</Text>

        {/* Prijs en knop op zelfde rij */}
        <View style={styles.bottomRij}>
          <Text style={styles.price}>€{price.toFixed(2)}</Text>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Bekijk</Text>
          </View>
        </View>

      </TouchableOpacity>
    </Shadow>
  );
};

const styles = StyleSheet.create({
  shadowWrapper: {
    borderRadius: 16,
    marginBottom: 16,
  },
  card: {
    width: 350,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontFamily: 'PoppinsBold',
    marginTop: 12,
  },
  bottomRij: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  price: {
    fontSize: 18,
    fontFamily: 'PoppinsSemiBold',
    color: '#4CAF50',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'PoppinsSemiBold',
    fontSize: 14,
  },
});

export default ProductCard;
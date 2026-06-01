import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

const ProductCard = ({ title, description, price, image, onPress, isPromo }) => {
  return (
    <Shadow
      distance={20}
      startColor="#4CAF5020"
      offset={[4, 0]}
      style={styles.shadowWrapper}
    >
      <TouchableOpacity style={styles.card} onPress={onPress}>

        {/* Product foto */}
        <Image source={image} style={styles.image} />

        {isPromo && <Text style={styles.promo}>PROMOTION</Text>}

        {/* Naam product */}
        <Text style={styles.title}>{title}</Text>

        {/* Uitleg product */}
        <Text style={styles.description}>{description}</Text>

        {/* Prijs */}
        <Text style={styles.price}>€{price.toFixed(2)}</Text>

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
  description: {
    fontSize: 12,
    fontFamily: 'PoppinsRegular',
    color: '#555',
    marginTop: 8,
    lineHeight: 20,
  },
  price: {
    fontSize: 18,
    fontFamily: 'PoppinsSemiBold',
    color: '#4CAF50',
    marginTop: 12,
  },
  promo: {
    fontSize: 11,
    fontFamily: 'PoppinsBold',
    color: '#ff6b6b',
    marginTop: 8,
},
});

export default ProductCard;
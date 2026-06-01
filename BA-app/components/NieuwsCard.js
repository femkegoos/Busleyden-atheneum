import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

const NieuwsCard = ({ title, description, date, image, tag, schoolnaam, kleur, onPress }) => {

  {/* Maakt een transparante versie van de campuskleur voor de schaduw */}
 const getShadowColor = (kleur) => {
  if (!kleur || typeof kleur !== 'string') return '#00000020'; // fallback
  {/*Controleer of kleur begint met # */}
  const isHex = kleur.startsWith('#');
  {/*Voeg transparantie toe aan de hex-code */}
  return isHex ? `${kleur}20` : `#${kleur}20`;
};

  return (
    <Shadow
  distance={20}
  startColor={getShadowColor(kleur)} // hier wordt de schaduw kleur gegenereerd
  offset={[4, 0]}
  style={styles.shadowWrapper}
>
      <TouchableOpacity style={styles.card} onPress={onPress}>

        {/* Cover foto */}
        <Image source={image} style={styles.image} />

        {/* Campus naam vlak onder foto */}
        <View style={styles.campusNaamContainer}>
<Text style={styles.campusNaam}>{schoolnaam || 'Geen school'}</Text>
        </View>

        {/* Titel */}
        <Text style={styles.title}>{title}</Text>

        {/* Datum klein */}
        <Text style={styles.date}>{date}</Text>

        {/* Excerpt tekst */}
        <Text style={styles.description}>{description}</Text>

        {/* Tag rechts uitgelijnd */}
        <Text style={[styles.tag, { color: kleur }]}>{tag}</Text>
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
    height: 150,
    borderRadius: 8,
  },
  campusNaamContainer: {
    marginTop: 8,
    alignItems: 'left',
  },
  campusNaam: {
    fontSize: 12,
    fontFamily: 'PoppinsItalic',
    color: '#333',
  },
  title: {
    fontSize: 18,
    fontFamily: 'PoppinsBold',
    marginTop: 8,
  },
  date: {
    fontSize: 11,
    fontFamily: 'PoppinsItalic',
    color: '#555',
    marginTop: 4,
  },
  description: {
    fontSize: 12,
    fontFamily: 'PoppinsRegular',
    color: '#555',
    marginTop: 8,
  },
  tag: {
    fontSize: 12,
    fontFamily: 'PoppinsItalic',
    marginTop: 8,
    textAlign: 'right',
  },
});

export default NieuwsCard;
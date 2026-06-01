import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Shadow } from 'react-native-shadow-2';


const campusKleur = {
  "": "All",
  "6a14a9a659b55fdc303e1bae": "#e63323",
  "6a14a8b5e90f485594413b81": "#f7a600",
  "6a14a7adc6a92c1040923648": "#a7358b",
  "6a14a5821345a3411c062ca1": "#dedc00",
  "6a14a0ff63dac69c69d52b18": "#ea5297",
  "6a149fe4513cc18215025734": "#ea5297",
  "6a149d91863c30159169aa23": "#00afcb",
  "6a149a4450cc66459d9b51f5": "#1961ac",
  "6a1498283138b63b27a88a1a": "#ea5297",
};

const campusNaam = {
    "6a14a9a659b55fdc303e1bae": "Zandpoort",
    "6a14a8b5e90f485594413b81": "Stassart",
    "6a14a7adc6a92c1040923648": "Nekkerspoel",
    "6a14a5821345a3411c062ca1": "De Beemden",
    "6a14a0ff63dac69c69d52b18": "Pitzemburg",
    "6a149fe4513cc18215025734": "Basisverpleegkunde",
    "6a149d91863c30159169aa23": "Caputsteen",
    "6a149a4450cc66459d9b51f5": "Botaniek",
    "6a1498283138b63b27a88a1a": "Basisverpleegkunde",
};


const NieuwsCard = ({ title, description, date, image, tag, school, onPress }) => {
  const kleur = campusKleur[school] || '#4CAF50';
const schoolNaam = campusNaam[school] || "";

  console.log("school ID:", school);
  console.log("tag:", tag);
  console.log("kleur:", kleur);
  console.log("schoolNaam:", schoolNaam);

  return (
    <Shadow
      distance={20}
      startColor={kleur + '20'}
      offset={[4, 0]}
      style={styles.shadowWrapper}
    >
      <TouchableOpacity style={styles.card} onPress={onPress}>

        {/* Cover foto */}
        <Image source={image} style={styles.image} />

        {/* School naam italic links onder foto */}
        <Text style={styles.school}>{schoolNaam}</Text>

        {/* Titel */}
        <Text style={styles.title}>{title}</Text>

        {/* Datum italic klein */}
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
    height: 150,
    borderRadius: 8,
  },
  school: {
    fontSize: 12,
    fontFamily: 'PoppinsItalic',
    color: '#555',
    marginTop: 8,
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
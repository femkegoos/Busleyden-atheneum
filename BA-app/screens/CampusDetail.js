import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';

const CampusDetail = ({ route }) => {
  const { name, focus, beschrijving, adres, gemeente, kleur, image } = route.params;

  return (
    <ScrollView style={styles.container}>

      {/* Afbeelding */}
      <Image source={image} style={styles.image} />

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.adres}>{adres}</Text>
        <Text style={styles.gemeente}>{gemeente}</Text>
        <Text style={[styles.focus, { color: kleur }]}>{focus}</Text>
        <Text style={styles.beschrijving}>{beschrijving}</Text>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 250,
  },
  info: {
    padding: 24,
  },
  name: {
    fontSize: 38,
    fontFamily: 'PoppinsBold',
    marginTop: 8,
  },
  focus: {
    fontSize: 16,
    fontFamily: 'PoppinsSemiBold',
    marginTop: 24,
  },
  beschrijving: {
    fontSize: 14,
    fontFamily: 'PoppinsRegular',
    color: '#555',
    marginTop: 8,
    lineHeight: 22,
  },
  adres: {
    fontSize: 14,
    fontFamily: 'PoppinsItalic',
    color: '#555',
    marginTop: 0,
  },
  gemeente: {
    fontSize: 14,
    fontFamily: 'PoppinsItalic',
    color: '#555',
    marginTop: -4,
  },
});

export default CampusDetail;
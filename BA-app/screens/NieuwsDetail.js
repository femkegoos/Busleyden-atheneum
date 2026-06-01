import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';

const NieuwsDetail = ({ route }) => {
  const { name, content, date, image, sfeerfotos, tag, kleur, schoolNaam } = route.params;

  return (
    <ScrollView style={styles.container}>

      {/* Cover foto */}
      <Image source={image} style={styles.image} />

      {/* Campus naam links + datum rechts, onder foto */}
      <View style={styles.metaRij}>
        <Text style={[styles.schoolNaam, { color: kleur }]}>{schoolNaam}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      <View style={styles.info}>

        {/* Titel */}
        <Text style={styles.name}>{name}</Text>

        {/* Tag in campuskleur */}
        <Text style={[styles.tag, { color: kleur }]}>{tag}</Text>

        {/* Volledige inhoud */}
        <Text style={styles.content}>{content}</Text>

        {/* Sfeerfotos galerij */}
        {sfeerfotos && sfeerfotos.length > 0 && (
          <>
            <Text style={[styles.sfeerTitel, { color: kleur }]}>Foto's</Text>
            <View style={styles.sfeerGrid}>
              {sfeerfotos.map((foto, index) => (
                <Image
                  key={index}
                  source={{ uri: foto.url }}
                  style={styles.sfeerfoto}
                />
              ))}
            </View>
          </>
        )}

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 250,
  },
  metaRij: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  schoolNaam: {
    fontSize: 14,
    fontFamily: 'PoppinsSemiBold',
  },
  date: {
    fontSize: 11,
    fontFamily: 'PoppinsItalic',
    color: '#888',
  },
  info: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  name: {
    fontSize: 28,
    fontFamily: 'PoppinsBold',
    marginBottom: 6,
  },
  tag: {
    fontSize: 12,
    fontFamily: 'PoppinsItalic',
    marginBottom: 16,
  },
  content: {
    fontSize: 14,
    fontFamily: 'PoppinsRegular',
    color: '#555',
    lineHeight: 24,
  },
  sfeerTitel: {
    fontSize: 18,
    fontFamily: 'PoppinsBold',
    marginTop: 24,
    marginBottom: 12,
  },
  sfeerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sfeerfoto: {
    width: '47%',
    height: 150,
    borderRadius: 8,
  },
});

export default NieuwsDetail;
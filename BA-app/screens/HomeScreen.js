import { ScrollView, Textinput, StyleSheet, Text, View } from 'react-native';
import { useRef, useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import NieuwsCard from '../components/NieuwsCard';
import CampusCard from '../components/CampusCard';
import ProductCard from '../components/ProductCard';

const HomeScreen = ({ navigation }) => {
    const [Nieuws, setNieuws] = useState([]);
    const [campuses, setCampuses] = useState([]);
    const [products, setProducts] = useState([]);

    // voorbereiding filter
    const categoryNames = {
        "": "All",
        "6a16f2413598132e63b5b88f": "Kleding",
        "6a16f275719f7ecaa24c2546": "Baby & kids",
        "6a16f2a3d851ef2bd4663cd9": "Accessoires",
        "6a16f2cc8036c41f275614ea": "Food & drinks",
        "6a16f2e6b4b2caf5acc108e0": "Schrijfgerei",
        "6a16f313d851ef2bd4668e80": "0verige",
    };

   //sorteren van de producten 
 const filteredProducts = products.filter((p) =>
    (selectedCategory === "" || p.category === selectedCategory) &&
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

 //filteren van de producten op categorie, naam en prijs
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-asc") return a.price - b.price;
    if (sortOption === "price-desc") return b.price - a.price;
    if (sortOption === "name-asc") return a.title.localeCompare(b.title);
    if (sortOption === "name-desc") return b.title.localeCompare(a.title);
    return 0;
  });


    // API ophalen voor content dynamisch in te vullen
    useEffect(() => {
        Promise.all([
            fetch('https://api.webflow.com/v2/sites/6a11e2085af61b924447aac9/products', {
                headers: { Authorization: 'Bearer e9758ecc015511838b7e2d0b202273d8a0b45da01e278075056113c076f5284a' },
            }).then((response) => response.json()),

            fetch('https://api.webflow.com/v2/sites/6a11e2085af61b924447aac9/collections/6a1734029f26e0be247dcd5d/items', {
                headers: { Authorization: 'Bearer e9758ecc015511838b7e2d0b202273d8a0b45da01e278075056113c076f5284a' },
            }).then((response) => response.json()),

            fetch('https://api.webflow.com/v2/sites/6a11e2085af61b924447aac9/collections/6a1490d759b55fdc30312d14/items', {
                headers: { Authorization: 'Bearer e9758ecc015511838b7e2d0b202273d8a0b45da01e278075056113c076f5284a' },
            }).then((response) => response.json()),
        ]).then(([productData, newsData, campusData]) => {

            setProducts(productData.items.map((item) => ({
                id: item.product.id,
                title: item.product.fieldData.name,
                price: (item.skus[0]?.fieldData.price.value || 0) / 100,
                image: { uri: item.skus[0]?.fieldData["main-image"]?.url },
            })));

            setNieuws(newsData.items.map((item) => ({
                id: item.id,
                name: item.fieldData.name,
                description: item.fieldData["preview-nieuws"] || "",
                content: item.fieldData["uitleg-nieuws"] || "",
                date: item.fieldData.datum ? new Date(item.fieldData.datum).toLocaleDateString() : "",
                image: { uri: item.fieldData["cover-nieuws-foto"]?.url },
                sfeerfotos: item.fieldData.sfeerfotos || [],
                school: item.fieldData.school || "",
                tag: item.fieldData["tag-nieuws"] || "",
            })));

            setCampuses(campusData.items.map((item) => ({
                id: item.id,
                name: item.fieldData.name,
                focus: item.fieldData.focus || "",
                beschrijving: item.fieldData.beschrijving || "",
                adres: item.fieldData.adres || "",
                gemeente: item.fieldData.gemeente || "",
                kleur: item.fieldData["kleur-2"] || "#000000",
                image: { uri: item.fieldData.galerij?.[0]?.url },
            })));
        })
        .catch((error) => console.error('Error:', error));
}, []);
return (
    //filter systeem met opties van categorie
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.Title}>Webshop</Text>
        <Picker selectedValue={selectedCategory} onValueChange={setSelectedCategory} style={styles.picker}>
            <Picker.Item label="All" value="" />
            <Picker.Item label="Kleding" value="Kleding" />
            <Picker.Item label="Baby & kids" value="Baby & kids" />
            <Picker.Item label="Accessoires" value="Accessoires" />
            <Picker.Item label="Food & drinks" value="Food & drinks" />
            <Picker.Item label="Schrijfgerei" value="Schrijfgerei" />
            <Picker.Item label="0verige" value="0verige" />
        </Picker>

        //sorteren van producten 
        <picker selectedValue={sortOption} onValueChange={setSortOption} style={styles.picker}>
            <Picker.Item label="Sort by" value="" />
            <Picker.Item label="Price: Low to High" value="price-asc" />
            <Picker.Item label="Price: High to Low" value="price-desc" />
            <Picker.Item label="Name: A to Z" value="name-asc" />
            <Picker.Item label="Name: Z to A" value="name-desc" />
        </picker>

        //search balk
        <TedxtInput style={styles.searchInput} placeholder="Search products..." value={searchQuery} onChangeText={setSearchQuery} />

       
            {sortedProducts.map((product) => (
                <ProductCard key={product.id} title={product.title} price={product.price} image={product.image} onPress={() => navigation.navigate('ProductDetail',  product )} />
            ))}

            <Text style={styles.Title}>Nieuws</Text>

            {Nieuws.map((nieuws) => (
                <NieuwsCard key={nieuws.id} title={nieuws.name} description={nieuws.description} date={nieuws.date} image={nieuws.image} onPress={() => navigation.navigate('NieuwsDetail', nieuws)} />
            ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 16,
    paddingTop: 64,
  },
  titel: {
    fontSize: 32,
    fontFamily: 'PoppinsBold',
    marginTop: 32,
    marginBottom: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    width: '90%',
    marginBottom: 16,
  },
  picker: {
    width: '90%',
    marginBottom: 16,
  },
});

export default HomeScreen;
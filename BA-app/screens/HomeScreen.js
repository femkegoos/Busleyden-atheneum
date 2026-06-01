import { ScrollView, TextInput, StyleSheet, Text, View, Switch } from 'react-native';
import { useRef, useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import NieuwsCard from '../components/NieuwsCard';
import CampusCard from '../components/CampusCard';
import ProductCard from '../components/ProductCard';

const HomeScreen = ({ navigation }) => {
    const [Nieuws, setNieuws] = useState([]);
    const [campuses, setCampuses] = useState([]);
    const [products, setProducts] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState("");

    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [promotions, setPromotions] = useState(false);

    const [nieuwsSearchQuery, setNieuwsSearchQuery] = useState("");
    const [nieuwsSortOption, setNieuwsSortOption] = useState("");
    const [nieuwsPromotions, setNieuwsPromotions] = useState(false);
    const [nieuwsCategory, setNieuwsCategory] = useState("");

    {/*voorbereiding filter */ }
    const categoryNames = {
        "": "All",
        "6a16f2413598132e63b5b88f": "Kleding",
        "6a16f275719f7ecaa24c2546": "Baby & kids",
        "6a16f2a3d851ef2bd4663cd9": "Accessoires",
        "6a16f2cc8036c41f275614ea": "Food & drinks",
        "6a16f2e6b4b2caf5acc108e0": "Schrijfgerei",
        "6a16f313d851ef2bd4668e80": "0verige",
    };
    {/*Kleuren ophalen */ }
    const campusKleuren = {
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
    {/*Campusnamen ophalen */ }
    const campusNamen = {
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

    const tagMap = {
        "6a173214fd6b6da7210b76a7": "Terugblik",
        "6a173200719f7ecaa26c16d8": "Activiteit",
        "6a1731f01a80eb9ba7f1c7c7": "Nieuws",
    };

    {/*sorteren van de producten */ }
    const filteredProducts = products.filter((p) =>
        (selectedCategory === "" || p.category === selectedCategory) &&
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    {/*filteren van de producten op categorie, naam en prijs */ }
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortOption === "price-asc") return a.price - b.price;
        if (sortOption === "price-desc") return b.price - a.price;
        if (sortOption === "name-asc") return a.title.localeCompare(b.title);
        if (sortOption === "name-desc") return b.title.localeCompare(a.title);
        return 0;
    });

    const filteredNieuws = Nieuws.filter((n) =>
        (nieuwsCategory === "" || n.tag === nieuwsCategory) &&
        n.name.toLowerCase().includes(nieuwsSearchQuery.toLowerCase())
    );

    const sortedNieuws = [...filteredNieuws].sort((a, b) => {
        if (nieuwsSortOption === "date-newest") return new Date(b.rawDate) - new Date(a.rawDate);
        if (nieuwsSortOption === "date-oldest") return new Date(a.rawDate) - new Date(b.rawDate);
        return 0;
    });


    {/*API ophalen voor content dynamisch in te vullen */ }
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



            setProducts(productData.items.map((item) => {
    const rawCategory = item.product.fieldData.category?.[0] || "";

    let vertaaldeCategory;
    if (categoryNames[rawCategory]) {
        vertaaldeCategory = categoryNames[rawCategory];
    } else {
        vertaaldeCategory = rawCategory;
    }

    return {
        id: item.product.id,
        title: item.product.fieldData.name,
        description: item.product.fieldData.description || "",
        price: (item.skus[0]?.fieldData.price.value || 0) / 100,
        image: { uri: item.skus[0]?.fieldData["main-image"]?.url },
        category: vertaaldeCategory,
        isPromo: item.product.fieldData.promotie || false,
    };
}));

            setNieuws(newsData.items.map((item) => {
                const rawTag = item.fieldData["tag-nieuws"] || "";

                let schoolId;
                if (Array.isArray(item.fieldData.school)) {
                    schoolId = item.fieldData.school[0];
                } else {
                    schoolId = item.fieldData.school;
                }

                let vertaaldeTag;
                if (tagMap[rawTag]) {
                    vertaaldeTag = tagMap[rawTag];
                } else {
                    vertaaldeTag = rawTag;
                }

                return {
                    id: item.id,
                    name: item.fieldData.name,
                    description: item.fieldData["preview-nieuws"] || "",
                    content: item.fieldData["uitleg-nieuws"] || "",
                    date: item.fieldData.datum ? new Date(item.fieldData.datum).toLocaleDateString() : "",
                    rawDate: item.fieldData.datum || "",
                    image: { uri: item.fieldData["cover-nieuws-foto"]?.url },
                    sfeerfotos: item.fieldData.sfeerfotos || [],
                    school: item.fieldData.school || "",
                    tag: vertaaldeTag,
                    kleur: campusKleuren[schoolId] || "#4CAF50",
                    schoolNaam: campusNamen[schoolId] || "",
                };
            }));
            {/*De ?.[0] pakt het eerste element uit de array */ }
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

        <ScrollView contentContainerStyle={styles.container}>

            {/*Campus sectie*/}
            <Text style={styles.titel}>BA campussen</Text>
            {campuses.map((campus) => (
                <CampusCard key={campus.id} name={campus.name} focus={campus.focus} beschrijving={campus.beschrijving} adres={campus.adres} gemeente={campus.gemeente} kleur={campus.kleur} image={campus.image} onPress={() => navigation.navigate('CampusDetail', campus)} />
            ))}


            {/*Webshop sectie*/}

            {/*filter systeem met opties van categorie*/}
            <Text style={styles.titel}>Webshop</Text>
            <Picker selectedValue={selectedCategory} onValueChange={setSelectedCategory} style={styles.picker}>
                <Picker.Item label="All" value="" />
                <Picker.Item label="Kleding" value="Kleding" />
                <Picker.Item label="Baby & kids" value="Baby & kids" />
                <Picker.Item label="Accessoires" value="Accessoires" />
                <Picker.Item label="Food & drinks" value="Food & drinks" />
                <Picker.Item label="Schrijfgerei" value="Schrijfgerei" />
                <Picker.Item label="0verige" value="0verige" />
            </Picker>

            {/*sorteren van producten*/}
            <Picker selectedValue={sortOption} onValueChange={setSortOption} style={styles.picker}>
                <Picker.Item label="Sort by" value="" />
                <Picker.Item label="Price: Low to High" value="price-asc" />
                <Picker.Item label="Price: High to Low" value="price-desc" />
                <Picker.Item label="Name: A to Z" value="name-asc" />
                <Picker.Item label="Name: Z to A" value="name-desc" />
            </Picker>

            {/*search balk*/}
            <TextInput style={styles.searchInput} placeholder="Search products..." value={searchQuery} onChangeText={setSearchQuery} />

            <View style={styles.switchContainer}>
                <Text>Enkel promoties</Text>
                <Switch value={promotions} onValueChange={(value) => setPromotions(value)} trackColor={{ false: 'rgba(122, 90, 69, 0.1)', true: '#4CAF50' }} thumbColor={promotions ? '#fff' : '#fff'} />
            </View>


            {sortedProducts.map((product) => (
                <ProductCard key={product.id} title={product.title} description={product.description} price={product.price} image={product.image} onPress={() => navigation.navigate('ProductDetail', product)} />
            ))}


            {/*Nieuws sectie*/}
            <Text style={styles.titel}>Nieuws</Text>

            {/*filter systeem met opties van categorie*/}
            <Picker selectedValue={nieuwsCategory} onValueChange={setNieuwsCategory} style={styles.picker}>
                <Picker.Item label="All" value="" />
                <Picker.Item label="Nieuws" value="Nieuws" />
                <Picker.Item label="Activiteit" value="Activiteit" />
                <Picker.Item label="Aankondiging" value="Aankondiging" />
            </Picker>

            {/*sorteren van producten*/}
            <Picker selectedValue={nieuwsSortOption} onValueChange={setNieuwsSortOption} style={styles.picker}>
                <Picker.Item label="Sort by" value="" />
                <Picker.Item label="Datum: Nieuwste eerst" value="date-newest" />
                <Picker.Item label="Datum: Oudste eerst" value="date-oldest" />
            </Picker>

            {/*search van producten*/}
            <TextInput style={styles.searchInput} placeholder="Zoek nieuws..." value={nieuwsSearchQuery} onChangeText={setNieuwsSearchQuery} />

            {sortedNieuws.map((nieuws) => (
                <NieuwsCard
                    key={nieuws.id}
                    title={nieuws.name}
                    description={nieuws.description}
                    date={nieuws.date}
                    image={nieuws.image}
                    schoolnaam={nieuws.schoolNaam}
                    tag={nieuws.tag}
                    kleur={nieuws.kleur}
                    onPress={() => navigation.navigate('NieuwsDetail', nieuws)}
                />
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
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        justifyContent: 'space-between',
        width: '90%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
});

export default HomeScreen;
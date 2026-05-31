import { ScrollView, Textinput, StyleSheet, Text, View, Switch } from 'react-native';
import { useRef, useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import BlogCard from '../components/BlogCard';
import CampusCard from '../components/CampusCard';
import ProductCard from '../components/ProductCard';

const HomeScreen = ({ navigation }) => {
    const [News, setNews] = useState([]);
    const [campuses, setCampuses] = useState([]);
    const [products, setProducts] = useState([]);

    const categoryNames = {
        "": "All",
        "6a16f2413598132e63b5b88f": "Kleding",
        "6a16f275719f7ecaa24c2546": "Baby & kids",
        "6a16f2a3d851ef2bd4663cd9": "Accessoires",
        "6a16f2cc8036c41f275614ea": "Food & drinks",
        "6a16f2e6b4b2caf5acc108e0": "Schrijfgerei",
        "6a16f313d851ef2bd4668e80": "0verige",
    };

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

            setNews(newsData.items.map((item) => ({
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

  );
}

export default HomeScreen;
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';

const ShopDetail = ({ route }) => {
    {/* Haal productdata op uit de navigatieparameters */}
    const { title, description, price, image } = route.params;
    {/* Bijhouden van het gekozen aantal producten*/}
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Image source={image} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.price}>€{price.toFixed(2)}</Text>
            <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{quantity}</Text>
                <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.totalPrice}>Totaal: €{(price * quantity).toFixed(2)}</Text>
          <TouchableOpacity style={styles.addToCartButton} onPress={() => alert('Toegevoegd aan winkelmandje!')} activeOpacity={0.7}>
    <Text style={styles.addToCartButtonText}>Toevoegen aan winkelmandje</Text>
</TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({

  addToCartButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 12,
    alignItems: 'center',
},
addToCartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'PoppinsSemiBold',
},
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 8,
        resizeMode: 'cover',
    },
    title: {
        fontSize: 24,
        fontFamily: 'PoppinsBold',
        marginTop: 16,
    },
    description: {
        fontSize: 16,
        fontFamily: 'PoppinsRegular',
        color: '#555',
        marginTop: 8,
    },
    price: {
        fontSize: 20,
        fontFamily: 'PoppinsSemiBold',
        color: '#4CAF50',
        marginTop: 8,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 24,
    },
    quantityButton: {
        backgroundColor: '#4CAF50',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 5,
    },
    quantityButtonText: {
        fontSize: 18,
        fontFamily: 'PoppinsBold',
        color: '#fff',
    },
    quantity: {
        fontSize: 18,
        marginHorizontal: 16,
        fontFamily: 'PoppinsBold',
    },
    totalPrice: {
        fontSize: 18,
        fontFamily: 'PoppinsSemiBold',
        marginTop: 16,
        marginBottom: 16,
    },
});

export default ShopDetail;
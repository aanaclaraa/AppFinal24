import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function Home() {
    const [animais, setAnimais] = useState([]);

    useEffect(() => {
        fetchAnimais();
    }, []);

    const fetchAnimais = async () => {
        try {
            const response = await fetch('http://10.139.75.28:5251/api/Animal/GetAllAnimal');
            if (response.ok) {
                const data = await response.json();
                setAnimais(data);
            } else {
                throw new Error('Erro ao obter animais perdidos');
            }
        } catch (error) {
            console.error('Erro ao obter animais perdidos:', error.message);
            Alert.alert('Erro', 'Ocorreu um erro ao obter animais perdidos. Por favor, tente novamente.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>STATUS:</Text>
            <FlatList
                data={animais}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.animalItem}>
                        <Text style={styles.animalName}>{item.nome}</Text>
                        <Text>Nome: {item.nomeAnimal}</Text>
                        <Text>Raça: {item.animalRaca}</Text>
                        <Text>Tipo: {item.animalTipo}</Text>
                        <Text>Cor: {item.animalCor}</Text>
                        <Text>Sexo: {item.animalSexo}</Text>
                        <Text>Data Desaparecimento: {item.animalDtDesaparecimento}</Text>
                        <Text>Data Encontro: {item.animalDtEncontro}</Text>
                        <Text>Status: {item.animalStatus}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.animalId}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'beige',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    animalItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        width: '100%',
    },
    animalName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
});

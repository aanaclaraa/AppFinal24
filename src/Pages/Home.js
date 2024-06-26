import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import Obs from '../Components/InserirObservacao'
export default function Home() {
    const [animais, setAnimais] = useState([]);
    const [detalhes, setDetalhes] = useState(false);
    const [obs, setObs] = useState(false);
    const [idAnimal, setIdAnimal] = useState(0);

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

    const renderAnimalItem = ({ item }) => (
        <TouchableOpacity style={styles.animalItem}>
            <View style={styles.animalItem}>
                <Text style={styles.animalName}>{item.nome}</Text>
                <Text style={styles.animalDetail}>Nome: {item.nomeAnimal}</Text>
                <Text style={styles.animalDetail}>Raça: {item.animalRaca}</Text>
                {detalhes && idAnimal == item.animalId &&
                    <View>
                        <Text style={styles.animalDetail}>Tipo: {item.animalTipo}</Text>
                        <Text style={styles.animalDetail}>Cor: {item.animalCor}</Text>
                        <Text style={styles.animalDetail}>Sexo: {item.animalSexo}</Text>
                        <Text style={styles.animalDetail}>Data Desaparecimento: {item.animalDtDesaparecimento}</Text>
                        <Text style={styles.animalDetail}>Data Encontro: {item.animalDtEncontro}</Text>
                        <Text style={styles.animalDetail}>Status: {item.animalStatus}</Text>
                    </View>
                }
                <TouchableOpacity style={styles.button} onPress={() => { setDetalhes(true); setIdAnimal(item.animalId) }}>
                    <Text style={styles.buttonText}>DETALHES</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => { setObs(true); setIdAnimal(item.animalId);  }}>
                    <Text style={styles.buttonText}>OBSERVAÇÃO</Text>
                </TouchableOpacity>
                {obs &&  idAnimal == item.animalId &&
                    <View style={styles.Obs}>
                        <Obs animalId = {item.animalId} usuarioId={item.usuarioId} ></Obs>
                    </View>                   
                }
            </View>           
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require("../../assets/logo.jpg")} style={styles.logo} />
            </View>
            <Text style={styles.title}>STATUS DOS ANIMAIS</Text>
            <FlatList
                data={animais}
                renderItem={renderAnimalItem}
                keyExtractor={(item) => item.animalId.toString()}
                contentContainerStyle={styles.flatListContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        width:'100%',
        textAlign: 'center'
    },
    Obs:{
        width:'100%',
        height: 800,
        textAlign: 'center',
    },
    imageContainer: {
        width: 150,
        height: 150,
        borderRadius: 75,
        overflow: "hidden",
        marginBottom: 20,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    logo: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333333',
        textAlign: 'center',
    },
    animalItem: {
        backgroundColor: '#FFC0CB',
        borderRadius: 10,
        marginBottom: 20,
        padding: 15,
        width: '100%',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    animalName: {
        fontSize: 5,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333333',
    },
    animalDetail: {
        color: 'black',
        marginBottom: 3,
        fontSize: 15,
    },
    flatListContainer: {
        paddingBottom: 15,
        width: '103%',
    },
    button: {
        width: '100%',
        height: 40,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'pink',
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CadastroUsuario() {
    
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigation = useNavigation();

    const cadastrarUsuario = async () => {
        try {
            const response = await fetch('http://10.139.75.28:5251/api/Usuario/GetAllUsuario', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, telefone, email, senha })
            });
            const data = await response.json();
            if (response.ok) {
                Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!', [
                    { text: 'OK', onPress: () => navigation.navigate('Home') } // Navegação para a tela Home
                ]);
            } else {
                Alert.alert('Erro', data.message || 'Erro ao cadastrar o usuário.');
            }
        } catch (error) {
            console.error('Erro:', error);
            Alert.alert('Erro', 'Erro ao cadastrar o usuário. Tente novamente.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require("../../assets/logo.jpg")} style={styles.logo} />
            </View>
            <Text style={styles.text}>AINDA NÃO SE CADASTROU?</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Nome" 
                value={nome} 
                onChangeText={setNome} 
            />
            <TextInput 
                style={styles.input}
                placeholder="Telefone"
                value={telefone} 
                onChangeText={setTelefone}
                keyboardType="phone-pad" 
            />
            <TextInput 
                style={styles.input} 
                placeholder="Email" 
                value={email} 
                onChangeText={setEmail} 
                keyboardType="email-address" 
            />
            <TextInput 
                style={styles.input} 
                placeholder="Senha" 
                value={senha} 
                onChangeText={setSenha} 
                secureTextEntry={true} 
            />
            <TouchableOpacity style={styles.button} onPress={cadastrarUsuario}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
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
    },
    imageContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        overflow: 'hidden',
        marginBottom: 30,
    },
    logo: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    text: {
        fontSize: 20,
        marginBottom: 20,
        fontWeight: 'bold',
        color: 'black', 
    },
    input: {
        width: '100%',
        height: 40,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'red', 
        borderRadius: 5,
        padding: 10,
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
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
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
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome,
                    telefone,
                    email,
                    senha,
                })
            });
            const data = await response.json();
            if (response.ok) {
                Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
                navigation.navigate('Home'); 
            } else {
                Alert.alert('Erro', data.message || 'Ocorreu um erro ao cadastrar o usuário.');
            }
        } catch (error) {
            console.error('Erro:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o usuário. Por favor, tente novamente.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.texto}>AINDA NÃO SE CADASTROU?</Text>
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
        backgroundColor: 'beige',
    },
    texto: {
        fontSize: 20,
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'pink',
        borderRadius: 5,
        padding: 10,
    },
    button: {
        width: '80%',
        height: 40,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

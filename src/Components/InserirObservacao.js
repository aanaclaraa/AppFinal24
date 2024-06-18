import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native';

export default function Inserir( {animalId, usuarioId}) {
    const [observacoesDescri, setObservacoesDescri] = useState('');
    const [observacaoLocal, setObservacaoLocal] = useState('');
    const [observacaoData, setObservacaoData] = useState('');
    const [sucesso, setSucesso] = useState(false);
    const [erro, setErro] = useState(false);

    const navigation = useNavigation();
    async function Cadastro() {
        await fetch('http://10.139.75.28:5251/api/Observacoes/CreateObservacoes', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                observacoesDescri: observacoesDescri,
                observacaoLocal: observacaoLocal,
                observacaoData: "2024-06-18T13:56:41.704Z",
                animalId: animalId,
                usuarioId:usuarioId
            })
        })
            .then(res => (res.ok == true) ? res.json() : false)
            .then(json => {
                console.log(json);
                setSucesso(true);
                // navigation.navigate('Observacao');
            })
            .catch(err => setErro(true))
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Descrição:</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite aqui"
                onChangeText={text => setObservacoesDescri(text)}
                value={observacoesDescri}
            />

            <Text style={styles.label}>Local:</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite aqui"
                onChangeText={text => setObservacaoLocal(text)}
                value={observacaoLocal}
            />

            <Text style={styles.label}>Data:</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite seu email"
                onChangeText={text => setObservacaoData(text)}
                value={observacaoData}
            />
            <TouchableOpacity style={styles.btnCadastrar} onPress={Cadastro}>
                <Text style={styles.cadastrarText}>NOVA OBSERVAÇÃO</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position:'absolute',
        padding: 20,
        backgroundColor: 'white',
        color: 'white',
        height:500,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black'
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: 'black'
    },
    input: {
        borderWidth: 1,
        borderColor: 'pink',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        color: 'black'
    },
    btnCadastrar: {
        backgroundColor: 'red',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    cadastrarText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});
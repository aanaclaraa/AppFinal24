import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native';

export default function Inserir() {
    const [observacoesDescri, setObservacoesDescri] = useState('');
    const [observacaoLocal, setObservacaoLocal] = useState('');
    const [observacaoData, setObservacaoData] = useState('');
    const [sucesso, setSucesso] = useState(false);
    const [erro, setErro] = useState(false);

    const navigation = useNavigation(); 
    async function Cadastro() {
        await fetch('http://10.139.75.28:5251/api/Observacoes/GetAllObservacoes', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                observacoesDescri: observacoesDescri,
                observacaoLocal: observacaoLocal,
                observacaoData: observacaoData,
            })
        })
            .then(res => (res.ok == true) ? res.json() : false)
            .then(json => {
                console.log(json);
                setSucesso(true); 
                navigation.navigate('Observacao'); 
            })
            .catch(err => setErro(true))
    }

    return (
        <ScrollView style={styles.container}>
            {sucesso ?
                <Text style={styles.text}>Obrigada(o) por colocar mais Detalhes! Vamos te enviar para a página de Observações</Text>
                :
                <>

                    <Text style={styles.title}>Detalhes</Text>

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
                    {erro && <Text style={styles.errorText}>Revise os campos cuidadosamente. Tente Novamente</Text>}
                </>
            }
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'black',
        color: 'white'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white'
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: 'white'
    },
    input: {
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        color: 'white'
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
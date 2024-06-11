import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import Produto from '../Components/Produto';

const Observacoes = () => {
  const [animais, setAnimais] = useState([]);
  const [nome, setNome] = useState('');
  const [raca, setRaca] = useState('');
  const [cor, setCor] = useState('');
  const [tipo, setTipo] = useState('');
  const [sexo, setSexo] = useState('');
  const [dtdesaparecimento, setDtDesaparecimento] = useState('');
  const [dtencontro, setDtEncontro] = useState('');

  useEffect(() => {
    carregarAnimais();
  }, []);

  const carregarAnimais = async () => {
    try {
      const response = await fetch('http://10.139.75.28:5251/api/Animal/GetAllAnimal');
      const data = await response.json();
      setAnimais(data);
    } catch (error) {
      console.error('Erro ao carregar animais:', error);
    }
  };

  const cadastrarAnimal = async () => {
    try {
      const novoAnimal = { nome, raca, cor, tipo,  };
      const response = await fetch('http://10.139.75.28:5251/api/Animal/GetAllAnimal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoAnimal),
      });
      if (response.ok) {
        setNome('');
        setRaca('');
        setCor('');
        setTipo('');
        setSexo('');
        setObservacao('');
        setDtDesaparecimento('');
        setDtEncontro('');
        setStatus('');

        carregarAnimais(); 
      } else {
        console.certo('Dados salvos com SUCESSO!', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao cadastrar animal:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Inserir dados do Animal</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do animal"
        value={nome}
        onChangeText={text => setNome(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Raça do animal"
        value={raca}
        onChangeText={text => setRaca(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Tipo de animal"
        value={tipo}
        onChangeText={text => setTipo(text)}
      />
       <TextInput
        style={styles.input}
        placeholder="Cor de animal"
        value={cor}
        onChangeText={text => setCor(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Sexo do animal"
        value={sexo}
        onChangeText={text => setSexo(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Desapareciemnto do animal"
        value={dtdesaparecimento}
        onChangeText={text => setDtDesaparecimento(text)}
      />
       <TextInput
        style={styles.input}
        placeholder="Data de Encontro do animal"
        value={dtencontro}
        onChangeText={text => setDtEncontro(text)}
      />

      <Button style={styles.button} title="Salvar" onPress={cadastrarAnimal} />

      <Text style={styles.encontrados}>Animais Encontrados e Perdidos</Text>
      <FlatList
        style={styles.lista}
        data={animais}
        renderItem={({ item }) => (
          <Produto
            style={styles.produto}
            title={item.nomeAnimal}
            price={item.animalRaca}
            image={item.animalCor}
            description={item.animalSexo}             
          />
        )}
        keyExtractor={(item) => item.animalId.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'beige',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    marginBottom: 20,
  },
  encontrados: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  lista: {
    marginTop: 10,
  },
  produto: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default Observacoes;

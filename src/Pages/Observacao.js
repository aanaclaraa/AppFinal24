import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, TextInput, FlatList, StyleSheet } from 'react-native';

const Observacao = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://10.139.75.28:5251/api/Observacoes/GetAllObservacoes');
      const jsonData = await response.json();
      setData(jsonData);
      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
      setIsLoading(false);
    }
  };

  const voltarParaDetalhes = () => {
    navigation.goBack();
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text === '') {
      setFilteredData([]);
    } else {
      const filtered = data.filter(item => item.Local.includes(text)); 
      setFilteredData(filtered);
    }
  };

  const renderDataItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.Descricao}</Text> 
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.input}
          placeholder="Pesquisar..."
          onChangeText={handleSearch}
          value={searchQuery}
        />
        <Button title="Listar Todos" onPress={() => setFilteredData(data)} />
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#f9c2ff" />
      ) : filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          renderItem={renderDataItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={styles.noDataText}>Nenhum dado disponível.</Text>
      )}
      <Button title="Voltar para Detalhes" onPress={voltarParaDetalhes} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemText: {
    fontSize: 16,
  },
  noDataText: {
    flex: 1,
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: 'gray',
  },
});

export default Observacao;
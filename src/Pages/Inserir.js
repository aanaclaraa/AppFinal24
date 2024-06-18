import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, Button, ScrollView } from 'react-native';
import Carousel from 'react-native-snap-carousel';

// Componente principal
export default function Inserir() {
  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Dados de exemplo
  const animaisEncontrados = [
    { id: 1, imagem: require('../../assets/Lhasa-imagem1.webp'), descricao: 'Animal encontrada, Tutor(a) entrar em contato (14)98255-665' },
    { id: 2, imagem: require('../../assets/lhasa-2.jpg'), descricao: 'Animal encontrado com Lilica, Tutor(a) entrar em contato (14)98255-665' },
    { id: 3, imagem: require('../../assets/gato-siames.webp'), descricao: 'Animal encontrado Tutor(a) entrar em contato (14)98255-665' },
  ];

  const animaisDesaparecidos = [
    { id: 4, imagem: require('../../assets/Pets-enchente.jpg'), descricao: 'Animal (Indefinido) encontrado, entrar em contato (14)98255-665' },
    { id: 5, imagem: require('../../assets/Pedro-Piegas.webp'), descricao: 'Tutor(a) desse animal por favor entrar em contato (14)98255-665' },
    { id: 6, imagem: require('../../assets/mqdefault.jpg'), descricao: 'Tutor(a) desse animal por favor entrar em contato (14)98255-665' },
  ];


  const handleImageSelection = (imagem) => {
    setImagemSelecionada(imagem);
    setModalVisible(true);
  };

 
  const handleCloseModal = () => {
    setImagemSelecionada(null);
    setModalVisible(false);
  };


  const renderCarousel = (data) => (
    <Carousel
      data={data}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleImageSelection(item.imagem)}>
          <Image source={item.imagem} style={styles.carrosselImagem} />
        </TouchableOpacity>
      )}
      sliderWidth={350}
      itemWidth={250}
      layout={'default'}
      loop={true}
      autoplay={true}
    />
  );


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.carrosselContainer}>
        <Text>Animais Encontrados à espera do Tutor(a):</Text>
        {renderCarousel(animaisEncontrados)}
        <Text>Animais Desaparecidos:</Text>
        {renderCarousel(animaisDesaparecidos)}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {imagemSelecionada && (
              <Image source={imagemSelecionada} style={styles.modalImagem} />
            )}
            <Text style={styles.modalDescricao}>
              {imagemSelecionada &&
                [...animaisEncontrados, ...animaisDesaparecidos].find(img => img.imagem === imagemSelecionada)?.descricao
              }
            </Text>
            <Button title="Fechar" onPress={handleCloseModal} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  carrosselContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  carrosselImagem: {
    width: 250,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 25,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    borderRadius: 25,
  },
  modalImagem: {
    width: 350,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  modalDescricao: {
    fontSize: 16,
    textAlign: 'center',
  },
});
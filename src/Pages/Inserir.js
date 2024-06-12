import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, Button } from 'react-native';
import Carousel from 'react-native-snap-carousel';

export default function Inserir() {
  const [imagens, setImagens] = useState([
    { id: 1, imagem: require('../../assets/Lhasa-imagem1.webp'), descricao: 'Lilica (Lhasa Apso) encontrada, Tutor(a) entrar em contato (14)98255-665' },
    { id: 2, imagem: require('../../assets/lhasa-2.jpg'), descricao: 'Puff (Lhasa Apso) encontrado junto com a Lilica, Tutor(a) entrar em contato (14)98255-665' },
    { id: 3, imagem: require('../../assets/gato-siames.webp'), descricao: 'Simba (Gato Siames) infelizmente não resistiu ao desastre' },
    { id: 4, imagem: require('../../assets/Pets-enchente.jpg'), descricao: 'Animal (Indefinido) encontrado em uma casa abandonada' },
    { id: 5, imagem: require('../../assets/Pedro-Piegas.webp'), descricao: 'Até o momento não foi encontrado' },
    { id: 6, imagem: require('../../assets/mqdefault.jpg'), descricao: 'Até o momento não foi encontrado' },
  ]);
  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleImageSelection = (imagem) => {
    setImagemSelecionada(imagem);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setImagemSelecionada(null);
    setModalVisible(false);
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleImageSelection(item.imagem)}>
        <Image source={item.imagem} style={styles.carrosselImagem} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.carrosselContainer}>
        <Carousel
          data={imagens}
          renderItem={renderItem}
          sliderWidth={350}
          itemWidth={250}
          layout={'default'}
          loop={true}
          autoplay={true}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={imagemSelecionada} style={styles.modalImagem} />
            <Text style={styles.modalDescricao}>{imagens.find(img => img.imagem === imagemSelecionada)?.descricao}</Text>
            <Button title="Fechar" onPress={handleCloseModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'beige',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 150, 
    paddingBottom: 150, 
  },
  carrosselContainer: {
    alignItems: 'center',
  },
  carrosselImagem: {
    width: 250,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginRight: 10,
  },
  modalContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
  modalImagem: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  modalDescricao: {
    fontSize: 16,
    textAlign: 'center',
  },
});
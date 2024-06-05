import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Produto from '../Components/Produto';
import Stories from '../Components/Stories';


export default function Home() {

  const [produtos, setProdutos] = useState([]);

  async function getProdutos() {
    await fetch('https://fakestoreapi.com/products', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => setProdutos(json))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getProdutos();
  }, [])

  return (
    <View style={css.container}>
      {produtos ?
        <>
          <Stories produtos={produtos} />
          <FlatList
            data={produtos}
            renderItem={({ item }) => <Produto title={item.title} price={item.price} image={item.image} description={item.description} category={item.category} rating={item.rating} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ height: (produtos.length * 600) + 110 }}
          />
        </>
        :
        <Text style={css.text}>Carregando produtos...</Text>
      }
    </View>
  )
}
const css = StyleSheet.create({
  container: {
    backgroundColor: "#191919",
    flexGrow: 1,
    color: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "white"
  },
  stories: {
    width: "100%",
    height: 100
  }
})
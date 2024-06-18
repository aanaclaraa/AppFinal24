import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const { Login, error } = useContext(AuthContext);

    function RealizaLogin() {
        Login(email, senha);
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require("../../assets/logo.jpg")} style={styles.logo} />
            </View>
            <TextInput
                inputMode="email"
                placeholder="Email do Usuário"
                style={styles.input}
                value={email}
                onChangeText={(digitado) => setEmail(digitado)}
                placeholderTextColor="#999"
            />
            <TextInput
                inputMode="text"
                placeholder="Senha"
                secureTextEntry={true}
                style={styles.input}
                value={senha}
                onChangeText={(digitado) => setSenha(digitado)}
                placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.btnLogin} onPress={RealizaLogin}>
                <Text style={styles.btnLoginText}>ENTRAR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.forgot} onPress={() => console.log("Esqueceu a senha?")}>
                <Text style={styles.forgotText}>Esqueceu a senha?</Text>
            </TouchableOpacity>
            {error &&
                <View style={styles.error}>
                    <Text style={styles.errorText}>Revise os campos e tente novamente.</Text>
                </View>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF"
    },
    imageContainer: {
        width: 150,
        height: 150,
        borderRadius: 75,
        overflow: "hidden",
        marginBottom: 35,
        elevation: 10 // Adiciona sombra à imagem
    },
    logo: {
        flex: 1,
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    input: {
        width: "90%",
        height: 50,
        borderRadius: 10,
        marginBottom: 15,
        padding: 15,
        backgroundColor: "#F5F5F5",
        color: "#333",
        borderWidth: 1,
        borderColor: "#DDD" // Adiciona borda para destacar o campo
    },
    forgot: {
        width: "90%",
        marginTop: 5,
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    forgotText: {
        color: "blue",
        textDecorationLine: 'underline' // Adiciona sublinhado para indicar link
    },
    btnLogin: {
        width: "90%",
        height: 50,
        borderRadius: 10,
        marginTop: 30,
        backgroundColor: "#FF69B4",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5 
    },
    btnLoginText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "bold"
    },
    error: {
        width: "90%",
        height: 50,
        marginTop: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FF6347",
        borderRadius: 10
    },
    errorText: {
        color: "#FFF",
        textAlign: "center"
    }
});

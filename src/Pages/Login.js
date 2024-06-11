import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext';

export default function Login() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const { Login, error } = useContext(AuthContext);

    function RealizaLogin() {
       Login( email, senha );
    }

    return (
        <ScrollView contentContainerStyle={css.container}>
            <View style={css.imageContainer}>
                <Image source={require("../../assets/logo.jpg")} style={css.logo} />
            </View>
            <TextInput
                inputMode="email"
                placeholder="Email do Usuário:"
                style={css.input}
                value={email}
                onChangeText={(digitado) => setEmail(digitado)}
                placeholderTextColor="white"
            />
            <TextInput
                inputMode="text"
                placeholder="Senha:"
                secureTextEntry={true}
                style={css.input}
                value={senha}
                onChangeText={(digitado) => setSenha(digitado)}
                placeholderTextColor="white"
            />
            <View style={css.forgot}>
                <Text style={css.forgotText}>Esqueceu a senha?</Text>
            </View>
            <TouchableOpacity style={css.btnLogin} onPress={RealizaLogin}>
                <Text style={css.btnLoginText}>ENTRAR</Text>
            </TouchableOpacity>
            {error &&
                <View style={css.error}>
                    <Text style={css.errorText}>Revise os campos. Tente novamente!</Text>
                </View>
            }
        </ScrollView>
    )
}
const css = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "beige"
    },
    imageContainer: {
        width: 150,
        height: 150,
        borderRadius: 75, 
        overflow: "hidden",
        marginBottom: 35
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
        backgroundColor: "#262626",
        color: "white"
    },
    forgot: {
        width: "90%",
        marginTop: 5,
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    forgotText: {
        color: "red",
        fontWeight: "bold"
    },
    btnLogin: {
        width: "90%",
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 30,
        backgroundColor: "pink",
        justifyContent: "center",
        alignItems: "center",
    },
    btnLoginText: {
        color: "black",
        fontSize: 18,
        fontWeight: "bold"
    },
    error: {
        width: "100%",
        height: 50,
        marginTop: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        color: "white",
        textAlign: "center"
    }
});


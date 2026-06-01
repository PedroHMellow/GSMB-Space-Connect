import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginCard() {
  const [producerName, setProducerName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!producerName || !password) {
      Alert.alert('Erro', 'Campos obrigatórios não preenchidos.');
      return;
    }

    try {
      const storedUsers = await AsyncStorage.getItem('@users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      // Procura o usuário pelo email (armazenado em producerName neste componente)
      const user = users.find((u: any) => u.emailOrPhone === producerName);

      if (!user) {
        Alert.alert('Erro', 'Usuário não encontrado.');
        return;
      }

      if (user.password !== password) {
        Alert.alert('Erro', 'Senha incorreta.');
        return;
      }

      // Redireciona para a Home usando replace para evitar voltar ao login
      router.replace('/screen/Tabs/home');
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao tentar entrar. Tente novamente.');
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-4">
      {/* Card Principal */}
      <View className="w-11/12 max-w-xs bg-white rounded-[16px] p-5 shadow-md">
        
        {/* Campo: Email */}
        <View className="mb-4">
          <Text className="font-inter text-neutral-700 text-sm font-semibold mb-2">
            Email 
          </Text>
          <View className="flex-row items-center border border-neutral-200 rounded-lg px-3 h-12 bg-white">
            <Feather name="user" size={18} color="#9ca3af" style={{ marginRight: 10 }} />
            <TextInput
              className="flex-1 font-inter text-base text-neutral-800"
              placeholder="Ex: joao.silva@example.com"
              placeholderTextColor="#9ca3af"
              value={producerName}
              onChangeText={setProducerName}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Campo: Senha */}
        <View className="mb-5">
          <Text className="font-inter text-neutral-700 text-sm font-semibold mb-2">
            Senha
          </Text>
          <View className="flex-row items-center border border-neutral-200 rounded-lg px-3 h-12 bg-white">
            <Feather name="lock" size={18} color="#9ca3af" style={{ marginRight: 10 }} />
            <TextInput
              className="flex-1 font-inter text-base text-neutral-800"
              placeholder="Senha"
              placeholderTextColor="#9ca3af"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>

        {/* Botão Entrar */}
        <TouchableOpacity
          onPress={handleLogin}
          activeOpacity={0.8}
          className="bg-primary h-12 rounded-[10px] flex-row justify-center items-center mt-1"
        >
          <Text className="font-inter text-white text-base font-bold mr-2">
            Entrar
          </Text>
          <Feather name="arrow-right" size={18} color="white" />
        </TouchableOpacity>
        
        {/* Criar Conta */}
         <TouchableOpacity
          activeOpacity={0.7}
          className="mt-5 items-center"
          onPress={() => router.push("/screen/Stack/signup")}
        >
          <Text className="font-inter text-neutral-500 text-sm">
            Ainda não possui conta?{" "}
            <Text className="text-primary font-semibold">
              Criar conta
            </Text>
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}
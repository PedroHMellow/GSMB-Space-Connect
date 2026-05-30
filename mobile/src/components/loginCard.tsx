import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons'; 

export default function LoginCard() {
  const [producerName, setProducerName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Lógica de autenticação aqui
    console.log('Login:', { producerName, password });
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
              autoCapitalize="words"
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
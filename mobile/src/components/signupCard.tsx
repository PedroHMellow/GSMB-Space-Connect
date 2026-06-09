import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUpCard() {
	const [fullName, setFullName] = useState('');
	const [emailOrPhone, setEmailOrPhone] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();

	const handleCreateAccount = async () => {
		if (!fullName || !emailOrPhone || !password) {
			Alert.alert('Erro', 'Campos obrigatórios não preenchidos.');
			return;
		}

		try {
			const storedUsers = await AsyncStorage.getItem('@users');
			const users = storedUsers ? JSON.parse(storedUsers) : [];

			const userExists = users.some((u: any) => u.emailOrPhone === emailOrPhone);

			if (userExists) {
				Alert.alert('Erro', 'Conta já cadastrada.');
				return;
			}

			const newUser = { fullName, emailOrPhone, password };
			users.push(newUser);

			await AsyncStorage.setItem('@users', JSON.stringify(users));
			
			Alert.alert('Sucesso', 'Conta criada com sucesso!');
			router.replace('/screen/Stack/farmInfo');
		} catch (error) {
			Alert.alert('Erro', 'Ocorreu um erro ao salvar sua conta.');
		}
	};

	return (
		<View className="w-11/12 max-w-xs bg-white rounded-[16px] p-5 shadow-md">

			<View className="mb-4">
				<Text className="font-inter text-neutral-700 text-sm font-semibold mb-2">Nome Completo</Text>
				<View className="flex-row items-center border border-neutral-200 rounded-lg px-3 h-12 bg-white">
					<Feather name="user" size={18} color="#9ca3af" style={{ marginRight: 10 }} />
					<TextInput
						className="flex-1 font-inter text-base text-neutral-800"
						placeholder="Seu nome"
						placeholderTextColor="#9ca3af"
						value={fullName}
						onChangeText={setFullName}
						autoCapitalize="words"
					/>
				</View>
			</View>

			<View className="mb-4">
				<Text className="font-inter text-neutral-700 text-sm font-semibold mb-2">E-mail ou Celular</Text>
				<View className="flex-row items-center border border-neutral-200 rounded-lg px-3 h-12 bg-white">
					<Feather name="mail" size={18} color="#9ca3af" style={{ marginRight: 10 }} />
					<TextInput
						className="flex-1 font-inter text-base text-neutral-800"
						placeholder="email@exemplo.com"
						placeholderTextColor="#9ca3af"
						value={emailOrPhone}
						onChangeText={setEmailOrPhone}
						keyboardType="email-address"
						autoCapitalize="none"
					/>
				</View>
			</View>

			<View className="mb-5">
				<Text className="font-inter text-neutral-700 text-sm font-semibold mb-2">Senha</Text>
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

			<TouchableOpacity
				onPress={handleCreateAccount}
				activeOpacity={0.8}
				className="bg-primary h-12 rounded-[10px] flex-row justify-center items-center mt-1"
			>
				<Text className="font-inter text-white text-base font-bold mr-2">Criar minha conta</Text>
				<Feather name="arrow-right" size={18} color="white" />
			</TouchableOpacity>

			 {/* Já tem uma conta? */}
			<TouchableOpacity
				activeOpacity={0.7}
				className="mt-5 items-center"
				onPress={() => router.push("/screen/Stack/login")}
			>
				<Text className="font-inter text-neutral-500 text-sm">
					Já tem uma conta?{" "}
				<Text className="text-primary font-semibold">
					Entrar
				</Text>
				</Text>
			</TouchableOpacity>

		</View>
	);
}

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function SignUpCard() {
	const [fullName, setFullName] = useState('');
	const [emailOrPhone, setEmailOrPhone] = useState('');
	const [password, setPassword] = useState('');

	const handleCreateAccount = () => {
		console.log('Criar conta:', { fullName, emailOrPhone, password });
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

		</View>
	);
}

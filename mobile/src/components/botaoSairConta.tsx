import React from 'react';
import { TouchableOpacity, Text, Alert, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

export default function BotaoSairConta() {
    const router = useRouter();

    const handleLogout = () => {
        Alert.alert(
            "Sair da conta",
            "Tem certeza que deseja sair?",
            [
                {
                    text: "Não",
                    style: "cancel"
                },
                {
                    text: "Sim",
                    onPress: () => {
                        router.replace("/screen/Stack/login");
                    },
                    style: "destructive"
                }
            ]
        );
    };

    return (
        <TouchableOpacity
            onPress={handleLogout}
            activeOpacity={0.7}
            className="bg-red-600 w-full h-12 rounded-xl items-center justify-center shadow-sm"
        >
            <View className="flex-row items-center">
                <Feather
                    name="log-out"
                    size={18}
                    color="#FFF"
                />

                <Text className="text-white font-inter font-bold text-base ml-2">
                    Sair da conta
                </Text>
            </View>
        </TouchableOpacity>
    );
}
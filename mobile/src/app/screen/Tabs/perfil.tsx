import { Text, View } from "react-native";
import BotaoSairConta from "../../../components/botaoSairConta";

export default function Perfil() {
    return (
        <View className="flex-1 items-center justify-center bg-background px-6">
            <Text className="font-inter text-2xl text-black mb-8">
                Bem-vindo à Perfil!
            </Text>


            <View className="w-full mt-4 ">
                <BotaoSairConta />
            </View>
            
        </View>
    )
}
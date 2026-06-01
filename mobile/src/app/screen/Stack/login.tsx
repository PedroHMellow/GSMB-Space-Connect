import {
  View,
  Text,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import LoginCard from "../../../components/loginCard";
import Bglogin from "../../../assets/images/bg-login.png";
import Logoapp from "../../../assets/images/logo-app.png";

export default function Login() {
  return (
    <ImageBackground
      source={Bglogin}
      className="flex-1"
      resizeMode="cover"
      blurRadius={3}
    >
      <View className="absolute inset-0 bg-white/45" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={50}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 px-6 pt-16 pb-8 justify-between">
            
            <View className="items-center mt-6 z-10">
              <Image
                source={Logoapp}
                className="w-24 h-24 rounded-2xl mb-4 shadow-sm"
                resizeMode="contain"
              />

              <Text className="font-inter text-3xl text-black mb-12 text-center">
                Nome do APP
              </Text>

              <Text className="font-inter text-base text-neutral-700 text-center">
                Seu parceiro inteligente no campo.
              </Text>
            </View>

            <View className="flex-1 justify-center items-center">
              <LoginCard />
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
import { View, Text, ImageBackground, Image } from "react-native";
import Bglogin from "../../../assets/images/bg-login.png";
import Logoapp from "../../../assets/images/logo-app.png";
import SignUpCard from "../../../components/signupCard";

export default function Signup() {
  return (
    <ImageBackground
      source={Bglogin}
      className="flex-1 px-6 pt-16 pb-8 justify-between"
      resizeMode="cover"
      blurRadius={3}
    >
      <View className="absolute inset-0 bg-white/45" />

      <View className="items-center mt-6">
        <Image
          source={Logoapp}
          className="w-24 h-24 mb-4"
          resizeMode="contain"
        />

        <Text className="font-inter text-3xl text-black text-center">
          Nome do APP
        </Text>

        <Text className="font-inter text-base text-neutral-700 mt-4 text-center">
          Junte-se à revolução digital no campo.
        </Text>
      </View>

      <View className="flex-1 justify-center items-center">
        <SignUpCard />
      </View>

    </ImageBackground>
  );
}
import { View, Text } from "react-native"; 
import LoginCard from "../../../components/loginCard";

export default function Login() {
  return (
    <View className="flex-1  bg-background">
      <Text className="text-5xl text-primary">Aqui é login</Text>
      
      
        <LoginCard />
      
    </View>
  );
}
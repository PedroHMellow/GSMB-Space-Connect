import "../../../styles/global.css";
import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { View, Text } from "react-native";

function TabIcon({
  focused,
  icon,
  label,
}: {
  focused: boolean;
  icon: keyof typeof Feather.glyphMap;
  label: string;
}) {
  // ABA ATIVA
  if (focused) {
    return (
      <View className="items-center justify-center -mt-2">
        <View
          style={{
            minWidth: 92,
            height: 52,
            paddingHorizontal: 20,
            borderRadius: 999,
            backgroundColor: "#2e7d32",

            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",

            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.12,
            shadowRadius: 4,

            elevation: 4,
          }}
        >
          <Feather name={icon} size={24} color="#fff" />
        </View>

        <Text
          numberOfLines={1}
          style={{
            marginTop: 4,
            width: 80,

            textAlign: "center",

            fontSize: 12,
            fontFamily: "Inter",
            fontWeight: "600",
            color: "#2e7d32",
          }}
        >
          {label}
        </Text>
      </View>
    );
  }

  // ABA INATIVA
  return (
    <View className="items-center justify-center">
      <Feather name={icon} size={22} color="#525252" />

      <Text
        numberOfLines={1}
        style={{
          marginTop: 4,
          width: 80,

          textAlign: "center",

          fontSize: 12,
          fontFamily: "Inter",
          fontWeight: "500",
          color: "#525252",
        }}
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        // Remove labels padrão
        tabBarShowLabel: false,

        tabBarStyle: {
          backgroundColor: "#F5F5F5",
          borderTopWidth: 0,

          height: 70,

          paddingTop: 8,
          paddingBottom: 8,

          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      {/* HOME */}
      <Tabs.Screen
        name="home"
        options={{
          title: "Início",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon="home"
              label="Início"
            />
          ),
        }}
      />

      {/* PERFIL */}
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon="user"
              label="Perfil"
            />
          ),
        }}
      />
    </Tabs>
  );
}
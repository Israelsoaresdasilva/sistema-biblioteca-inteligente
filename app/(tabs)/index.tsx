import { View, Text, TouchableOpacity } from "react-native";

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0f172a",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 32,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        Biblioteca Inteligente 📚
      </Text>

      <Text
        style={{
          color: "#94a3b8",
          fontSize: 16,
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        Sistema mobile de gerenciamento de biblioteca
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: "#2563eb",
          paddingVertical: 14,
          paddingHorizontal: 40,
          borderRadius: 12,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Entrar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

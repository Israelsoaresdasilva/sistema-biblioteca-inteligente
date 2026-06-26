import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Cores } from '../constants/cores';

export default function Nome() {
  const router = useRouter();
  const [nome, setNome] = useState('');

  const salvar = async () => {
    if (!nome.trim()) return;
    await AsyncStorage.setItem('nome_usuario', nome.trim());
    await AsyncStorage.setItem('onboarding_concluido', 'true');
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inner}>
        <View style={styles.conteudo}>
          <Text style={styles.emoji}>👤</Text>
          <Text style={styles.titulo}>Como podemos te chamar?</Text>
          <Text style={styles.descricao}>Personalize sua experiência de leitura</Text>

          <TextInput
            style={styles.input}
            placeholder="Seu nome..."
            placeholderTextColor={Cores.textoSuave}
            value={nome}
            onChangeText={setNome}
            autoFocus
            maxLength={20}
            returnKeyType="done"
            onSubmitEditing={salvar}
          />
        </View>

        <TouchableOpacity
          style={[styles.botao, !nome.trim() && styles.botaoDesabilitado]}
          onPress={salvar}
          disabled={!nome.trim()}>
          <Text style={styles.botaoTexto}>Entrar na biblioteca</Text>
          <Ionicons name="arrow-forward" size={20} color={Cores.texto} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Cores.fundo },
  inner: { flex: 1, paddingHorizontal: 32 },
  conteudo: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 },
  emoji: { fontSize: 72 },
  titulo: { fontSize: 26, fontWeight: 'bold', color: Cores.texto, textAlign: 'center' },
  descricao: { fontSize: 16, color: Cores.textoSuave, textAlign: 'center' },
  input: { width: '100%', backgroundColor: Cores.card, borderRadius: 16, padding: 18, fontSize: 18, color: Cores.texto, marginTop: 16, borderWidth: 1, borderColor: Cores.borda, textAlign: 'center' },
  botao: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: Cores.destaque, borderRadius: 16, padding: 18, marginBottom: 32, gap: 10 },
  botaoDesabilitado: { opacity: 0.5 },
  botaoTexto: { color: Cores.texto, fontSize: 18, fontWeight: 'bold' },
});

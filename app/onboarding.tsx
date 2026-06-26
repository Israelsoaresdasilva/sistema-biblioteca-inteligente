import { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Cores } from '../constants/cores';

const SLIDES = [
  {
    emoji: '📚',
    titulo: 'Sua biblioteca inteligente',
    descricao: 'Milhões de livros na palma da sua mão. Explore, descubra e organize suas leituras.',
  },
  {
    emoji: '✨',
    titulo: 'Resumos com IA',
    descricao: 'Entenda qualquer livro em segundos com resumos gerados por inteligência artificial.',
  },
  {
    emoji: '🔖',
    titulo: 'Sua estante pessoal',
    descricao: 'Salve os livros que quer ler e acompanhe sua jornada como leitor.',
  },
];

export default function Onboarding() {
  const router = useRouter();
  const [slide, setSlide] = useState(0);

  const proximo = () => {
    if (slide < SLIDES.length - 1) {
      setSlide(slide + 1);
    } else {
      router.replace('/nome');
    }
  };

  const pular = async () => {
    await AsyncStorage.setItem('onboarding_concluido', 'true');
    router.replace('/(tabs)');
  };

  const atual = SLIDES[slide];

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.pular} onPress={pular}>
        <Text style={styles.pularTexto}>Pular</Text>
      </TouchableOpacity>

      <View style={styles.conteudo}>
        <Text style={styles.emoji}>{atual.emoji}</Text>
        <Text style={styles.titulo}>{atual.titulo}</Text>
        <Text style={styles.descricao}>{atual.descricao}</Text>
      </View>

      <View style={styles.indicadores}>
        {SLIDES.map((_, i) => (
          <View key={i} style={[styles.ponto, i === slide && styles.pontoAtivo]} />
        ))}
      </View>

      <TouchableOpacity style={styles.botao} onPress={proximo}>
        <Text style={styles.botaoTexto}>
          {slide === SLIDES.length - 1 ? 'Continuar' : 'Próximo'}
        </Text>
        <Ionicons name="arrow-forward" size={20} color={Cores.texto} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Cores.fundo, paddingHorizontal: 32 },
  pular: { alignSelf: 'flex-end', padding: 16, marginTop: 8 },
  pularTexto: { color: Cores.textoSuave, fontSize: 16 },
  conteudo: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 24 },
  emoji: { fontSize: 80 },
  titulo: { fontSize: 28, fontWeight: 'bold', color: Cores.texto, textAlign: 'center' },
  descricao: { fontSize: 16, color: Cores.textoSuave, textAlign: 'center', lineHeight: 24 },
  indicadores: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: 32 },
  ponto: { width: 8, height: 8, borderRadius: 4, backgroundColor: Cores.borda },
  pontoAtivo: { width: 24, backgroundColor: Cores.destaque },
  botao: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: Cores.destaque, borderRadius: 16, padding: 18, marginBottom: 32, gap: 10 },
  botaoTexto: { color: Cores.texto, fontSize: 18, fontWeight: 'bold' },
});

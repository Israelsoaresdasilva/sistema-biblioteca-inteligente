import { useEffect, useState } from 'react';
import {
  View, Text, Image, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, ActivityIndicator
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Cores } from '../../constants/cores';

export default function DetalheLivro() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id, titulo, autor, cover } = params;

  const [naEstante, setNaEstante] = useState(false);
  const [avaliacao, setAvaliacao] = useState(0);
  const [resumo, setResumo] = useState('');
  const [carregandoResumo, setCarregandoResumo] = useState(false);

  useEffect(() => {
    verificarEstante();
    carregarAvaliacao();
  }, [id]);

  const verificarEstante = async () => {
    const estanteSalva = await AsyncStorage.getItem('estante_livros');
    if (estanteSalva) {
      const livros = JSON.parse(estanteSalva);
      setNaEstante(livros.includes(id));
    }
  };

  const alternarEstante = async () => {
    const estanteSalva = await AsyncStorage.getItem('estante_livros');
    let livros = estanteSalva ? JSON.parse(estanteSalva) : [];

    if (naEstante) {
      livros = livros.filter((livroId: string) => livroId !== id);
    } else {
      livros.push(id);
    }

    await AsyncStorage.setItem('estante_livros', JSON.stringify(livros));
    setNaEstante(!naEstante);
  };

  const avaliar = async (estrelas: number) => {
    setAvaliacao(estrelas);
    await AsyncStorage.setItem(`avaliacao_${id}`, estrelas.toString());
  };

  const carregarAvaliacao = async () => {
    const nota = await AsyncStorage.getItem(`avaliacao_${id}`);
    if (nota) setAvaliacao(parseInt(nota));
  };

  const gerarResumoIA = () => {
    setCarregandoResumo(true);
    // Simulação temporária de requisição à IA
    setTimeout(() => {
      setResumo(`Este é um resumo inteligente gerado por IA para a obra "${titulo}". A história aborda conceitos profundos sobre o desenvolvimento dos personagens em um universo ricamente detalhado por ${autor}, prendendo a atenção do início ao fim.`);
      setCarregandoResumo(false);
    }, 2000);
  };

  const capaUrl = cover && cover !== 'undefined'
    ? `https://covers.openlibrary.org/b/id/${cover}-L.jpg`
    : null;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Superior */}
      <View style={styles.headerNav}>
        <TouchableOpacity onPress={() => router.back()} style={styles.botaoCircular}>
          <Ionicons name="arrow-back" size={24} color={Cores.texto} />
        </TouchableOpacity>
        <TouchableOpacity onPress={alternarEstante} style={styles.botaoCircular}>
          <Ionicons 
            name={naEstante ? "bookmark" : "bookmark-outline"} 
            size={24} 
            color={naEstante ? Cores.destaque : Cores.texto} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollConteudo}>
        {/* Bloco de Informações do Livro */}
        <View style={styles.blocoInfo}>
          {capaUrl ? (
            <Image source={{ uri: capaUrl }} style={styles.capa} />
          ) : (
            <View style={[styles.capa, styles.semCapa]}>
              <Ionicons name="book-outline" size={48} color={Cores.textoSuave} />
            </View>
          )}
          <Text style={styles.titulo} numberOfLines={2}>{titulo}</Text>
          <Text style={styles.autor}>{autor}</Text>
        </View>

        {/* Sistema de Avaliação por Estrelas */}
        <View style={styles.secaoAvaliacao}>
          <Text style={styles.labelSecao}>Sua Avaliação</Text>
          <View style={styles.estrelasContainer}>
            {[1, 2, 3, 4, 5].map((estrela) => (
              <TouchableOpacity key={estrela} onPress={() => avaliar(estrela)}>
                <Ionicons
                  name={estrela <= avaliacao ? "star" : "star-outline"}
                  size={32}
                  color={estrela <= avaliacao ? "#FFD700" : Cores.textoSuave}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Área de Resumo com IA */}
        <View style={styles.secaoResumo}>
          <Text style={styles.labelSecao}>Resumo Inteligente</Text>
          
          {resumo ? (
            <View style={styles.cardResumo}>
              <Text style={styles.textoResumo}>{resumo}</Text>
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.botaoIA} 
              onPress={gerarResumoIA}
              disabled={carregandoResumo}
            >
              {carregandoResumo ? (
                <ActivityIndicator color={Cores.texto} />
              ) : (
                <>
                  <Ionicons name="sparkles" size={20} color={Cores.texto} />
                  <Text style={styles.botaoIATexto}>Gerar resumo com IA</Text>
                </>
              )}
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Cores.fundo },
  headerNav: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: 16, zIndex: 10 },
  botaoCircular: { width: 44, height: 44, borderRadius: 22, backgroundColor: Cores.card, justifyContent: 'center', alignItems: 'center' },
  scrollConteudo: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 },
  blocoInfo: { alignItems: 'center', marginBottom: 28 },
  capa: { width: 160, height: 240, borderRadius: 16, backgroundColor: Cores.card, marginBottom: 16, elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4 },
  semCapa: { justifyContent: 'center', alignItems: 'center' },
  titulo: { fontSize: 22, fontWeight: 'bold', color: Cores.texto, textAlign: 'center', marginBottom: 6 },
  autor: { fontSize: 16, color: Cores.textoSuave, textAlign: 'center' },
  secaoAvaliacao: { alignItems: 'center', marginBottom: 28, backgroundColor: Cores.card, padding: 16, borderRadius: 16 },
  labelSecao: { fontSize: 16, fontWeight: 'bold', color: Cores.texto, marginBottom: 10 },
  estrelasContainer: { flexDirection: 'row', gap: 8 },
  secaoResumo: { marginTop: 8 },
  botaoIA: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: Cores.destaque, borderRadius: 16, padding: 18, gap: 10 },
  botaoIATexto: { color: Cores.texto, fontSize: 16, fontWeight: 'bold' },
  cardResumo: { backgroundColor: Cores.card, borderRadius: 16, padding: 20, borderWidth: 1, borderColor: Cores.borda },
  textoResumo: { color: Cores.texto, fontSize: 15, lineHeight: 24 },
});

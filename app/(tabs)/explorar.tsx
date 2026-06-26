import { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, Image, TouchableOpacity,
  StyleSheet, ActivityIndicator, SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';
import { Cores } from '../../constants/cores';
import { buscarPorCategoria, getCoverUrl, Livro } from '../../services/openLibrary';

const CATEGORIAS = [
  { nome: 'Ficção', query: 'fiction', emoji: '🚀' },
  { nome: 'Ciência', query: 'science', emoji: '🔬' },
  { nome: 'História', query: 'history', emoji: '🏛️' },
  { nome: 'Fantasia', query: 'fantasy', emoji: '🐉' },
  { nome: 'Romance', query: 'romance', emoji: '💕' },
  { nome: 'Terror', query: 'horror', emoji: '👻' },
  { nome: 'Biografia', query: 'biography', emoji: '👤' },
  { nome: 'Tecnologia', query: 'technology', emoji: '💻' },
];

export default function Explorar() {
  const router = useRouter();
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(CATEGORIAS[0]);
  const [livros, setLivros] = useState<Livro[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarCategoria(categoriaSelecionada.query);
  }, [categoriaSelecionada]);

  const carregarCategoria = async (query: string) => {
    setLoading(true);
    const res = await buscarPorCategoria(query);
    setLivros(res.filter(l => l.cover_i).slice(0, 20));
    setLoading(false);
  };

  const irParaLivro = (livro: Livro) => {
    router.push({ pathname: '/livro/[id]', params: { id: livro.key.replace('/works/', ''), titulo: livro.title, autor: livro.author_name?.[0] || 'Desconhecido', cover: livro.cover_i?.toString() } });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Explorar</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categorias}>
        {CATEGORIAS.map((cat) => (
          <TouchableOpacity
            key={cat.query}
            style={[styles.chip, categoriaSelecionada.query === cat.query && styles.chipAtivo]}
            onPress={() => setCategoriaSelecionada(cat)}>
            <Text style={styles.chipEmoji}>{cat.emoji}</Text>
            <Text style={[styles.chipTexto, categoriaSelecionada.query === cat.query && styles.chipTextoAtivo]}>
              {cat.nome}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {loading ? (
        <View style={styles.centro}>
          <ActivityIndicator color={Cores.destaque} size="large" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
          {livros.map((livro) => (
            <TouchableOpacity key={livro.key} style={styles.card} onPress={() => irParaLivro(livro)}>
              <Image source={{ uri: getCoverUrl(livro.cover_i!, 'M') }} style={styles.capa} />
              <Text style={styles.tituloLivro} numberOfLines={2}>{livro.title}</Text>
              <Text style={styles.autor} numberOfLines={1}>{livro.author_name?.[0]}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Cores.fundo },
  titulo: { fontSize: 28, fontWeight: 'bold', color: Cores.texto, padding: 24, paddingTop: 40 },
  categorias: { paddingLeft: 24, marginBottom: 16, flexGrow: 0 },
  chip: { flexDirection: 'row', alignItems: 'center', backgroundColor: Cores.card, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, marginRight: 10, gap: 6, borderWidth: 1, borderColor: Cores.borda },
  chipAtivo: { backgroundColor: Cores.destaque, borderColor: Cores.destaque },
  chipEmoji: { fontSize: 16 },
  chipTexto: { color: Cores.textoSuave, fontSize: 14, fontWeight: '500' },
  chipTextoAtivo: { color: Cores.texto },
  centro: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 16, justifyContent: 'space-between' },
  card: { width: '46%' },
  capa: { width: '100%', height: 180, borderRadius: 12, backgroundColor: Cores.card },
  tituloLivro: { color: Cores.texto, fontSize: 13, fontWeight: '600', marginTop: 8 },
  autor: { color: Cores.textoSuave, fontSize: 12, marginTop: 2 },
});

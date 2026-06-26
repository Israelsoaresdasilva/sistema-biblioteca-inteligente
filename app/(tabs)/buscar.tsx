import { useState } from 'react';
import {
  View, Text, TextInput, FlatList, Image,
  TouchableOpacity, StyleSheet, ActivityIndicator, SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Cores } from '../../constants/cores';
import { buscarLivros, getCoverUrl, Livro } from '../../services/openLibrary';

export default function Buscar() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState<Livro[]>([]);
  const [loading, setLoading] = useState(false);
  const [buscou, setBuscou] = useState(false);

  const buscar = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setBuscou(true);
    const res = await buscarLivros(query);
    setResultados(res.filter(l => l.cover_i).slice(0, 20));
    setLoading(false);
  };

  const irParaLivro = (livro: Livro) => {
    router.push({ pathname: '/livro/[id]', params: { id: livro.key.replace('/works/', ''), titulo: livro.title, autor: livro.author_name?.[0] || 'Desconhecido', cover: livro.cover_i?.toString() } });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Buscar Livros</Text>

      <View style={styles.barraBusca}>
        <Ionicons name="search" size={20} color={Cores.textoSuave} />
        <TextInput
          style={styles.input}
          placeholder="Título, autor ou assunto..."
          placeholderTextColor={Cores.textoSuave}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={buscar}
          returnKeyType="search"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => { setQuery(''); setResultados([]); setBuscou(false); }}>
            <Ionicons name="close-circle" size={20} color={Cores.textoSuave} />
          </TouchableOpacity>
        )}
      </View>

      {loading && <ActivityIndicator color={Cores.destaque} size="large" style={{ marginTop: 40 }} />}

      {!loading && buscou && resultados.length === 0 && (
        <View style={styles.centro}>
          <Text style={styles.textoVazio}>Nenhum livro encontrado 😕</Text>
          <Text style={styles.textoSuave}>Tente outro termo de busca</Text>
        </View>
      )}

      {!loading && !buscou && (
        <View style={styles.centro}>
          <Ionicons name="book-outline" size={64} color={Cores.borda} />
          <Text style={styles.textoSuave}>Digite algo para buscar</Text>
        </View>
      )}

      <FlatList
        data={resultados}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => irParaLivro(item)}>
            <Image source={{ uri: getCoverUrl(item.cover_i!, 'S') }} style={styles.capa} />
            <View style={styles.info}>
              <Text style={styles.tituloLivro} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.autor} numberOfLines={1}>{item.author_name?.[0] || 'Autor desconhecido'}</Text>
              {item.first_publish_year && (
                <Text style={styles.ano}>{item.first_publish_year}</Text>
              )}
            </View>
            <Ionicons name="chevron-forward" size={20} color={Cores.textoSuave} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Cores.fundo },
  titulo: { fontSize: 28, fontWeight: 'bold', color: Cores.texto, padding: 24, paddingTop: 40 },
  barraBusca: { flexDirection: 'row', alignItems: 'center', backgroundColor: Cores.card, marginHorizontal: 24, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, gap: 10 },
  input: { flex: 1, color: Cores.texto, fontSize: 16 },
  centro: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 },
  textoVazio: { color: Cores.texto, fontSize: 18, fontWeight: '600' },
  textoSuave: { color: Cores.textoSuave, fontSize: 14 },
  lista: { padding: 24, gap: 16 },
  item: { flexDirection: 'row', alignItems: 'center', backgroundColor: Cores.card, borderRadius: 12, padding: 12, gap: 12 },
  capa: { width: 60, height: 85, borderRadius: 8, backgroundColor: Cores.borda },
  info: { flex: 1 },
  tituloLivro: { color: Cores.texto, fontSize: 15, fontWeight: '600' },
  autor: { color: Cores.textoSuave, fontSize: 13, marginTop: 4 },
  ano: { color: Cores.destaque, fontSize: 12, marginTop: 4 },
});

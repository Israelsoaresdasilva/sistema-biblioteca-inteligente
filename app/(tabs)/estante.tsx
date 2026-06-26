import { useEffect, useState } from 'react';
import {
  View, Text, FlatList, Image, TouchableOpacity,
  StyleSheet, SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Cores } from '../../constants/cores';
import { getCoverUrl } from '../../services/openLibrary';

export interface LivroSalvo {
  id: string;
  titulo: string;
  autor: string;
  cover: string;
}

export default function Estante() {
  const router = useRouter();
  const [livros, setLivros] = useState<LivroSalvo[]>([]);

  useEffect(() => {
    carregarEstante();
  }, []);

  const carregarEstante = async () => {
    const dados = await AsyncStorage.getItem('estante');
    if (dados) setLivros(JSON.parse(dados));
  };

  const remover = async (id: string) => {
    const novos = livros.filter(l => l.id !== id);
    setLivros(novos);
    await AsyncStorage.setItem('estante', JSON.stringify(novos));
  };

  const irParaLivro = (livro: LivroSalvo) => {
    router.push({ pathname: '/livro/[id]', params: { id: livro.id, titulo: livro.titulo, autor: livro.autor, cover: livro.cover } });
  };

  if (livros.length === 0) return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Minha Estante</Text>
      <View style={styles.centro}>
        <Ionicons name="bookmarks-outline" size={72} color={Cores.borda} />
        <Text style={styles.textoVazio}>Sua estante está vazia</Text>
        <Text style={styles.textoSuave}>Salve livros para ler depois!</Text>
      </View>
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Minha Estante</Text>
      <Text style={styles.contador}>{livros.length} livro{livros.length !== 1 ? 's' : ''} salvos</Text>
      <FlatList
        data={livros}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => irParaLivro(item)}>
            <Image
              source={{ uri: getCoverUrl(Number(item.cover), 'S') }}
              style={styles.capa}
            />
            <View style={styles.info}>
              <Text style={styles.tituloLivro} numberOfLines={2}>{item.titulo}</Text>
              <Text style={styles.autor} numberOfLines={1}>{item.autor}</Text>
            </View>
            <TouchableOpacity onPress={() => remover(item.id)} style={styles.botaoRemover}>
              <Ionicons name="trash-outline" size={20} color={Cores.destaque} />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Cores.fundo },
  titulo: { fontSize: 28, fontWeight: 'bold', color: Cores.texto, padding: 24, paddingTop: 40 },
  contador: { color: Cores.textoSuave, fontSize: 14, paddingHorizontal: 24, marginBottom: 8 },
  centro: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  textoVazio: { color: Cores.texto, fontSize: 20, fontWeight: '600' },
  textoSuave: { color: Cores.textoSuave, fontSize: 14 },
  lista: { padding: 24, gap: 16 },
  item: { flexDirection: 'row', alignItems: 'center', backgroundColor: Cores.card, borderRadius: 12, padding: 12, gap: 12 },
  capa: { width: 60, height: 85, borderRadius: 8, backgroundColor: Cores.borda },
  info: { flex: 1 },
  tituloLivro: { color: Cores.texto, fontSize: 15, fontWeight: '600' },
  autor: { color: Cores.textoSuave, fontSize: 13, marginTop: 4 },
  botaoRemover: { padding: 8 },
});

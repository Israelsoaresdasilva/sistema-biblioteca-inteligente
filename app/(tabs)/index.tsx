import { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, Image, TouchableOpacity,
  StyleSheet, ActivityIndicator, SafeAreaView
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';
import { Cores } from '../../constants/cores';
import { buscarLivros, buscarPorCategoria, getCoverUrl, Livro } from '../../services/openLibrary';

export default function Home() {
  const router = useRouter();
  const [destaques, setDestaques] = useState<Livro[]>([]);
  const [populares, setPopulares] = useState<Livro[]>([]);
  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState('');

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('nome_usuario').then(n => setNome(n || 'leitor'));
    }, [])
  );

  useEffect(() => {
    async function carregar() {
      const [d, p] = await Promise.all([
        buscarLivros('harry potter'),
        buscarPorCategoria('Fiction'),
      ]);
      setDestaques(d.filter(l => l.cover_i).slice(0, 10));
      setPopulares(p.filter(l => l.cover_i).slice(0, 10));
      setLoading(false);
    }
    carregar();
  }, []);

  const irParaLivro = (livro: Livro) => {
    router.push({ pathname: '/livro/[id]', params: { id: livro.key.replace('/works/', ''), titulo: livro.title, autor: livro.author_name?.[0] || 'Desconhecido', cover: livro.cover_i?.toString() } });
  };

  if (loading) return (
    <View style={styles.centro}>
      <ActivityIndicator color={Cores.destaque} size="large" />
      <Text style={styles.textoCarregando}>Carregando biblioteca...</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.saudacao}>Olá, {nome}! 👋</Text>
            <Text style={styles.subtitulo}>O que vamos ler hoje?</Text>
          </View>
        </View>

        <Text style={styles.secao}>📚 Destaques</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontal}>
          {destaques.map((livro) => (
            <TouchableOpacity key={livro.key} style={styles.cardGrande} onPress={() => irParaLivro(livro)}>
              <Image source={{ uri: getCoverUrl(livro.cover_i!, 'M') }} style={styles.capaGrande} />
              <Text style={styles.tituloCard} numberOfLines={2}>{livro.title}</Text>
              <Text style={styles.autorCard} numberOfLines={1}>{livro.author_name?.[0]}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.secao}>🔥 Populares em Ficção</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontal}>
          {populares.map((livro) => (
            <TouchableOpacity key={livro.key} style={styles.cardPequeno} onPress={() => irParaLivro(livro)}>
              <Image source={{ uri: getCoverUrl(livro.cover_i!, 'S') }} style={styles.capaPequena} />
              <Text style={styles.tituloCard} numberOfLines={2}>{livro.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Cores.fundo },
  centro: { flex: 1, backgroundColor: Cores.fundo, justifyContent: 'center', alignItems: 'center' },
  textoCarregando: { color: Cores.textoSuave, marginTop: 12, fontSize: 16 },
  header: { padding: 24, paddingTop: 40 },
  saudacao: { fontSize: 28, fontWeight: 'bold', color: Cores.texto },
  subtitulo: { fontSize: 16, color: Cores.textoSuave, marginTop: 4 },
  secao: { fontSize: 18, fontWeight: 'bold', color: Cores.texto, paddingHorizontal: 24, marginTop: 24, marginBottom: 12 },
  horizontal: { paddingLeft: 24 },
  cardGrande: { width: 140, marginRight: 16 },
  capaGrande: { width: 140, height: 200, borderRadius: 12, backgroundColor: Cores.card },
  cardPequeno: { width: 100, marginRight: 12 },
  capaPequena: { width: 100, height: 140, borderRadius: 8, backgroundColor: Cores.card },
  tituloCard: { color: Cores.texto, fontSize: 12, marginTop: 8, fontWeight: '600' },
  autorCard: { color: Cores.textoSuave, fontSize: 11, marginTop: 2 },
});

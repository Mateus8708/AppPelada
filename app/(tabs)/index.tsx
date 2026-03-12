import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, FlatList, 
  TouchableOpacity, TextInput, Keyboard 
} from 'react-native';

export default function PeladaScreen() {
  const [novoNome, setNovoNome] = useState('');
  const [jogadores, setJogadores] = useState([
    { id: '1', nome: 'Mateus', gols: 0, assistencias: 0 },
  ]);

  // Função para adicionar um novo craque
  const adicionarJogador = () => {
    if (novoNome.trim() === '') return; // Não aceita nome vazio

    const novoJogador = {
      id: Math.random().toString(), // Gera um ID único aleatório
      nome: novoNome,
      gols: 0,
      assistencias: 0
    };

    setJogadores([...jogadores, novoJogador]); // Pega os que já existem e soma o novo
    setNovoNome(''); // Limpa o campo de texto
    Keyboard.dismiss(); // Esconde o teclado do celular
  };

  // Lógica de Ranking (Ordenação)
  const jogadoresRankeados = [...jogadores].sort((a, b) => {
    if (b.gols !== a.gols) return b.gols - a.gols;
    return b.assistencias - a.assistencias;
  });

  // Funções de Alteração
  const alterarStatus = (id: string, campo: 'gols' | 'assistencias', valor: number) => {
    setJogadores(prev => prev.map(j => 
      j.id === id ? { ...j, [campo]: Math.max(0, j[campo] + valor) } : j
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pelada Cesar</Text>

      {/* ÁREA DE ENTRADA DE DADOS */}
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input}
          placeholder="Nome do novo jogador..."
          value={novoNome}
          onChangeText={setNovoNome} // Atualiza o estado enquanto você digita
        />
        <TouchableOpacity style={styles.botaoAdd} onPress={adicionarJogador}>
          <Text style={styles.textoBotaoAdd}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={jogadoresRankeados}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.cardJogador}>
            <View style={styles.info}>
              <Text style={styles.nome}>{index + 1}º {item.nome}</Text>
              <Text style={styles.stats}>⚽ {item.gols} | 👟 {item.assistencias}</Text>
            </View>

            <View style={styles.controles}>
              {/* Botões de Gols */}
              <View style={styles.grupo}>
                <TouchableOpacity onPress={() => alterarStatus(item.id, 'gols', -1)} style={styles.btnMenos}><Text style={styles.txt}>-</Text></TouchableOpacity>
                <Text>⚽</Text>
                <TouchableOpacity onPress={() => alterarStatus(item.id, 'gols', 1)} style={styles.btnMais}><Text style={styles.txt}>+</Text></TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5', paddingTop: 60, paddingHorizontal: 15 },
  titulo: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#1B5E20' },
  inputContainer: { flexDirection: 'row', marginBottom: 20 },
  input: { flex: 1, backgroundColor: '#fff', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#ddd' },
  botaoAdd: { backgroundColor: '#1B5E20', marginLeft: 10, paddingHorizontal: 20, borderRadius: 10, justifyContent: 'center' },
  textoBotaoAdd: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  cardJogador: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 10, flexDirection: 'row', alignItems: 'center', elevation: 2 },
  info: { flex: 1 },
  nome: { fontSize: 16, fontWeight: 'bold' },
  stats: { color: '#666' },
  controles: { flexDirection: 'row' },
  grupo: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f9f9f9', borderRadius: 8, padding: 5 },
  btnMais: { backgroundColor: '#2e7d32', paddingHorizontal: 10, borderRadius: 5, marginLeft: 5 },
  btnMenos: { backgroundColor: '#c62828', paddingHorizontal: 10, borderRadius: 5, marginRight: 5 },
  txt: { color: '#fff', fontWeight: 'bold', fontSize: 18 }
});
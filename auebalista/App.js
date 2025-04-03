import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  // Estados do componente
  const [produto, setProduto] = useState(''); // Armazena o texto do campo "Produto"
  const [quantidade, setQuantidade] = useState(''); // Armazena o texto do campo "Quantidade"
  const [lista, setLista] = useState([]); // Armazena a lista de produtos

  // Função para adicionar um novo produto à lista
  const adicionarProduto = () => {
    if (produto.trim() && quantidade.trim()) { // Verifica se ambos campos estão preenchidos
      setLista([...lista, { 
        produto, 
        quantidade, 
        id: Date.now().toString(), // ID único baseado no timestamp
        checked: false // Estado inicial do checkbox
      }]);
      // Limpa os campos após adicionar
      setProduto('');
      setQuantidade('');
      Keyboard.dismiss(); // Fecha o teclado virtual
    }
  };

  // Função para remover um produto da lista
  const removerProduto = (id) => {
    setLista(lista.filter(item => item.id !== id)); // Filtra a lista removendo o item com o ID correspondente
  };

  // Função para marcar/desmarcar um produto como concluído
  const toggleCheck = (id) => {
    setLista(lista.map(item => 
      item.id === id ? {...item, checked: !item.checked} : item // Inverte o estado "checked" do item
    ));
  };

  // Renderização do componente
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.titulo}>lista de compras</Text>
          <View style={styles.headerDivider} />
        </View>
        
        {/* Card do formulário para adicionar novos produtos */}
        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>NOVO PRODUTO</Text>
          
          {/* Linha com os campos de input */}
          <View style={styles.inputRow}>
            {/* Container do input do produto */}
            <View style={styles.inputContainer}>
              <Ionicons name="pricetag" size={18} color="#8AA6D6" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Nome do produto"
                placeholderTextColor="#A3B8D9"
                value={produto}
                onChangeText={setProduto}
              />
            </View>
            
            {/* Container do input da quantidade */}
            <View style={[styles.inputContainer, styles.quantityContainer]}>
              <TextInput
                style={styles.input}
                placeholder="Qtd"
                placeholderTextColor="#A3B8D9"
                value={quantidade}
                onChangeText={setQuantidade}
                keyboardType="numeric"
              />
            </View>
          </View>
          
          {/* Botão de adicionar */}
          <TouchableOpacity 
            style={styles.addButton}
            onPress={adicionarProduto}
          >
            <Ionicons name="add" size={22} color="#FFF" />
            <Text style={styles.addButtonText}>adicionar</Text>
          </TouchableOpacity>
        </View>

        {/* Seção da lista de produtos */}
        <View style={styles.listSection}>
          <Text style={styles.sectionTitle}>PRODUTOS ADICIONADOS</Text>
          
          {/* Estado vazio (quando não há produtos) */}
          {lista.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="cart-outline" size={40} color="#C1D2F0" />
              <Text style={styles.emptyText}>Sua lista está vazia</Text>
            </View>
          ) : (
            /* Card da lista de produtos */
            <View style={styles.listCard}>
              {lista.map((item) => (
                /* Item individual da lista */
                <View 
                  key={item.id} 
                  style={[
                    styles.listItem,
                    item.checked && styles.checkedItem // Aplica estilo riscado quando marcado
                  ]}
                >
                  {/* Botão de check/uncheck */}
                  <TouchableOpacity 
                    style={styles.checkButton}
                    onPress={() => toggleCheck(item.id)}
                  >
                    <Ionicons 
                      name={item.checked ? "checkbox" : "square-outline"} 
                      size={22} 
                      color={item.checked ? "#8AA6D6" : "#C1D2F0"} 
                    />
                  </TouchableOpacity>
                  
                  {/* Textos do produto (nome e quantidade) */}
                  <View style={styles.itemTextContainer}>
                    <Text 
                      style={[
                        styles.itemName,
                        item.checked && styles.checkedText
                      ]}
                    >
                      {item.produto}
                    </Text>
                    <Text 
                      style={[
                        styles.itemQuantity,
                        item.checked && styles.checkedText
                      ]}
                    >
                      {item.quantidade}
                    </Text>
                  </View>
                  
                  {/* Botão para remover item */}
                  <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={() => removerProduto(item.id)}
                  >
                    <Ionicons name="close" size={20} color="#D1DDF5" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

// Estilos do componente
const styles = StyleSheet.create({
  // Container principal
  container: {
    flex: 1,
    backgroundColor: '#F5F9FF', // Azul bebê claro
  },
  
  // Container do ScrollView
  scrollContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  
  // Estilos do cabeçalho
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  headerDivider: {
    width: 40,
    height: 3,
    backgroundColor: '#D1E0FF',
    marginTop: 12,
    borderRadius: 3,
  },
  titulo: {
    fontSize: 26,
    fontWeight: '300',
    color: '#5A7EC4', // Azul médio
    letterSpacing: 0.5,
    textTransform: 'lowercase',
  },
  
  // Estilos do card do formulário
  formCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#D1E0FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8AA6D6', // Azul pastel
    marginBottom: 16,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  
  // Estilos dos inputs
  inputRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  inputContainer: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F9FF',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E1EBFC',
  },
  quantityContainer: {
    flex: 1,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 48,
    color: '#5A7EC4',
    fontSize: 16,
  },
  
  // Estilos do botão de adicionar
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8AA6D6', // Azul pastel
    borderRadius: 12,
    padding: 16,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
    textTransform: 'lowercase',
  },
  
  // Estilos da seção da lista
  listSection: {
    marginBottom: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    color: '#A3B8D9',
    fontSize: 16,
    marginTop: 16,
  },
  
  // Estilos do card da lista
  listCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    shadowColor: '#D1E0FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 3,
  },
  
  // Estilos dos itens da lista
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F5FF',
  },
  checkedItem: {
    opacity: 0.6,
  },
  checkButton: {
    marginRight: 16,
  },
  itemTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemName: {
    flex: 3,
    fontSize: 16,
    color: '#5A7EC4',
  },
  itemQuantity: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#8AA6D6',
    textAlign: 'right',
    marginRight: 16,
  },
  checkedText: {
    textDecorationLine: 'line-through',
    color: '#C1D2F0', // Azul bem claro
  },
  deleteButton: {
    padding: 4,
  },
});
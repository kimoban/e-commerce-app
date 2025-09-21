import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addProduct, updateProduct, deleteProduct } from '../store/productsSlice';

const AdminProductManagementScreen = () => {
  const products = useSelector((state: RootState) => (state.products as any).items);
  const user = useSelector((state: RootState) => (state.user as any).user);
  const dispatch = useDispatch();
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', image: '', category: '', description: '' });

  if (!user || user.role !== 'admin') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red' }}>Access denied. Admins only.</Text>
      </View>
    );
  }

  const handleEdit = (product: any) => {
    setEditingProduct(product.id);
    setForm({ ...product });
  };

  const handleSave = () => {
    if (!form.name || !form.price || !form.image || !form.category) {
      Alert.alert('Please fill all fields');
      return;
    }
    dispatch(updateProduct({ ...form, id: editingProduct }));
    setEditingProduct(null);
    setForm({ name: '', price: '', image: '', category: '', description: '' });
    Alert.alert('Product updated!');
  };

  const handleDelete = (id: string) => {
    dispatch(deleteProduct(id));
    Alert.alert('Product deleted!');
  };

  const handleAdd = () => {
    if (!form.name || !form.price || !form.image || !form.category) {
      Alert.alert('Please fill all fields');
      return;
    }
    const newProduct = {
      ...form,
      id: Math.random().toString(36).substr(2, 9),
    };
    dispatch(addProduct(newProduct));
    setForm({ name: '', price: '', image: '', category: '', description: '' });
    Alert.alert('Product added!');
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>Admin Product Management</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 12, borderWidth: 1, borderColor: '#eee', borderRadius: 8, padding: 8 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
            <Text>Price: GH₵{item.price}</Text>
            <Text>Category: {item.category}</Text>
            <Button title="Edit" onPress={() => handleEdit(item)} />
            <Button title="Delete" onPress={() => handleDelete(item.id)} color="red" />
          </View>
        )}
        ListEmptyComponent={<Text>No products found.</Text>}
      />
      <View style={{ marginTop: 16 }}>
        <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>{editingProduct ? 'Edit Product' : 'Add Product'}</Text>
        <TextInput placeholder="Name" value={form.name} onChangeText={v => setForm(f => ({ ...f, name: v }))} style={{ borderWidth: 1, marginBottom: 4 }} />
        <TextInput placeholder="Price" value={form.price} onChangeText={v => setForm(f => ({ ...f, price: v }))} style={{ borderWidth: 1, marginBottom: 4 }} />
        <TextInput placeholder="Image URL" value={form.image} onChangeText={v => setForm(f => ({ ...f, image: v }))} style={{ borderWidth: 1, marginBottom: 4 }} />
        <TextInput placeholder="Category" value={form.category} onChangeText={v => setForm(f => ({ ...f, category: v }))} style={{ borderWidth: 1, marginBottom: 4 }} />
        <TextInput placeholder="Description" value={form.description} onChangeText={v => setForm(f => ({ ...f, description: v }))} style={{ borderWidth: 1, marginBottom: 4 }} />
        {editingProduct ? (
          <Button title="Save Changes" onPress={handleSave} />
        ) : (
          <Button title="Add Product" onPress={handleAdd} />
        )}
      </View>
    </View>
  );
};

export default AdminProductManagementScreen;

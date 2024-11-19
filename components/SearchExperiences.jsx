import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { searchByUsername } from '../services/experienceService';

const SearchExperiences = () => {
    const [username, setUsername] = useState('');
    const [experiences, setExperiences] = useState([]);

    const handleSearch = async () => {
        console.log('Username being searched:', username);
        if (!username) {
            alert('Please enter a username');
            return;
        }
        try {
            const result = await searchByUsername(username);
            console.log('Experiences received:', result);
            setExperiences(result); // Update the experiences state with the search results
        } catch (error) {
            console.error('Error fetching experiences:', error);
        }
    };

    const handleClear = () => {
        setUsername('');
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Pon un nombre de usuario"
                    placeholderTextColor="#ccc"
                    value={username}
                    onChangeText={(text) => {
                        console.log('Username updated to:', text);
                        setUsername(text);
                    }}
                />
                <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
                    <Text style={styles.clearButtonText}>✕</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.searchButtonContainer}>
                <Button title="Buscar" onPress={handleSearch} />
            </View>
            <FlatList
                data={experiences}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.experience}>
                        <Text style={styles.title}>Descripción: {item.description}</Text>
                        <Text style={styles.owner}>Propietario: {item.owner?.name || 'Unknown'}</Text>
                        <Text style={styles.participantsTitle}>Participantes:</Text>
                        {item.participants?.map((participant) => (
                            <Text key={participant._id} style={styles.participant}>
                                - {participant.name}
                            </Text>
                        ))}
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.noResults}>No experiences found</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: '#8B0000', flex: 1 }, // Fondo rojo
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: { 
        flex: 1,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        borderColor: '#ccc',
        color: '#fff',
    },
    clearButton: {
        marginLeft: 8,
        padding: 10,
        backgroundColor: '#555',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    clearButtonText: {
        fontSize: 16,
        color: '#fff',
    },
    searchButtonContainer: { marginBottom: 20 }, // Marge inferior per al contenedor del botó de buscar
    experience: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ddd', backgroundColor: '#fff', marginBottom: 10, borderRadius: 5 },
    title: { fontWeight: 'bold', fontSize: 18, marginBottom: 5, color: '#333' },
    owner: { fontSize: 16, marginBottom: 5, color: '#555' },
    participantsTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 5, color: '#333' },
    participant: { marginLeft: 10, fontSize: 14, color: '#666' },
    noResults: { textAlign: 'center', marginTop: 20, fontSize: 16, color: 'gray' },
});

export default SearchExperiences;
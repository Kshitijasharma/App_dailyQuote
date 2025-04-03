/**import { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

interface Quote {
  q: string; // Quote text
  a: string; // Author
  h?: string; // Optional HTML version
}

export default function QuoteListScreen() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    fetchQuotes();
    loadFavorites();
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await axios.get("https://zenquotes.io/api/quotes");
      setQuotes(response.data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching quotes:", error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };

  const loadFavorites = async () => {
    const savedFavorites = await AsyncStorage.getItem("favorites");
    setFavorites(savedFavorites ? JSON.parse(savedFavorites) : []);
  };

  const toggleFavorite = async (quote: string) => {
    let updatedFavorites = [...favorites];
    if (updatedFavorites.includes(quote)) {
      updatedFavorites = updatedFavorites.filter((q) => q !== quote);
    } else {
      updatedFavorites.push(quote);
    }
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={quotes}
        keyExtractor={(item) => item.q}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleFavorite(item.q)}>
            <Text style={[styles.quote, favorites.includes(item.q) && styles.favorite]}>
              {item.q} - {item.a}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  quote: { fontSize: 16, marginBottom: 10 },
  favorite: { color: "red" },
});
**/

/** 
import { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  Button, 
  Alert 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function QuoteListScreen() {  // No "export default" here!
  const [quotes, setQuotes] = useState<string[]>([]);

  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = async () => {
    try {
      const storedQuotes = await AsyncStorage.getItem("exploreQuotes");
      setQuotes(storedQuotes ? JSON.parse(storedQuotes) : []);
    } catch (error) {
      console.error("Error loading quotes:", error);
    }
  };

  const restartList = async () => {
    try {
      await AsyncStorage.removeItem("exploreQuotes"); // Clear storage
      setQuotes([]); // Clear state
      Alert.alert("Success", "The list has been restarted!");
    } catch (error) {
      console.error("Error resetting quotes:", error);
      Alert.alert("Error", "Could not restart the list.");
    }
  };

  return (
    <View style={styles.container}>
      {quotes.length > 0 ? (
        <FlatList
          data={quotes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text style={styles.quote}>{item}</Text>}
        />
      ) : (
        <Text style={styles.noQuotes}>No quotes available.</Text>
      )}
      <Button title="Restart List" onPress={restartList} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  quote: { fontSize: 16, marginBottom: 10 },
  noQuotes: { fontSize: 16, textAlign: "center", marginBottom: 20 },
});

// ✅ Only one export default
export default QuoteListScreen;
**/

import { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  Button, 
  Alert, 
  ImageBackground 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function QuoteListScreen() {  
  const [quotes, setQuotes] = useState<string[]>([]);

  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = async () => {
    try {
      const storedQuotes = await AsyncStorage.getItem("exploreQuotes");
      setQuotes(storedQuotes ? JSON.parse(storedQuotes) : []);
    } catch (error) {
      console.error("Error loading quotes:", error);
    }
  };

  const restartList = async () => {
    try {
      await AsyncStorage.removeItem("exploreQuotes"); 
      setQuotes([]); 
      Alert.alert("Success", "The list has been restarted!");
    } catch (error) {
      console.error("Error resetting quotes:", error);
      Alert.alert("Error", "Could not restart the list.");
    }
  };

  return (
    <ImageBackground 
      source={{ uri: "https://images.pexels.com/photos/5708064/pexels-photo-5708064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" }} 
      style={styles.background}
    >
      <View style={styles.overlay}>
        <FlatList
          data={quotes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text style={styles.quote}>{item}</Text>}
          ListEmptyComponent={<Text style={styles.noQuotes}>No quotes available.</Text>}
        />
        <Button title="Restart List" onPress={restartList} color="red" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { 
    flex: 1, 
    resizeMode: "cover", 
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for better readability
  },
  quote: { 
    fontSize: 16, 
    marginBottom: 10, 
    color: "white" 
  },
  noQuotes: { 
    fontSize: 16, 
    textAlign: "center", 
    marginBottom: 20, 
    color: "white" 
  },
});



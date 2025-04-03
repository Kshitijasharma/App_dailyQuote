/**
import { useState, useEffect } from "react";
import { 
  View, 
  FlatList, 
  Text, 
  StyleSheet, 
  Button, 
  Alert 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favs = await AsyncStorage.getItem("favorites");
      setFavorites(favs ? JSON.parse(favs) : []);
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  };

  const restartFavorites = async () => {
    try {
      await AsyncStorage.removeItem("favorites"); // Clear storage
      setFavorites([]); // Clear state
      Alert.alert("Success", "Favorites list has been restarted!");
    } catch (error) {
      console.error("Error resetting favorites:", error);
      Alert.alert("Error", "Could not restart favorites list.");
    }
  };

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.text}>No favorite quotes yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text style={styles.text}>{item}</Text>}
        />
      )}
      <Button title="Restart Favorites" onPress={restartFavorites} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  text: { fontSize: 16, marginBottom: 10 },
});
**/

import { useState, useEffect } from "react";
import { 
  View, 
  FlatList, 
  Text, 
  StyleSheet, 
  Button, 
  Alert, 
  ImageBackground 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favs = await AsyncStorage.getItem("favorites");
      setFavorites(favs ? JSON.parse(favs) : []);
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  };

  const restartFavorites = async () => {
    try {
      await AsyncStorage.removeItem("favorites"); // Clear storage
      setFavorites([]); // Clear state
      Alert.alert("Success", "Favorites list has been restarted!");
    } catch (error) {
      console.error("Error resetting favorites:", error);
      Alert.alert("Error", "Could not restart favorites list.");
    }
  };

  return (
    <ImageBackground
      source={{ uri: "https://images.pexels.com/photos/17356710/pexels-photo-17356710/free-photo-of-rainbow-against-a-cloudy-sky.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" }} 
      style={styles.background}
    >
      <View style={styles.container}>
        {favorites.length === 0 ? (
          <Text style={styles.text}>No favorite quotes yet.</Text>
        ) : (
          <FlatList
            data={favorites}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Text style={styles.text}>{item}</Text>}
          />
        )}
        <Button title="Restart Favorites" onPress={restartFavorites} color="red" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: "cover", justifyContent: "center" },
  container: { 
    flex: 1, 
    padding: 20, 
    justifyContent: "center", 
    backgroundColor: "rgba(0, 0, 0, 0.5)" // Dark overlay for readability
  },
  text: { fontSize: 16, marginBottom: 10, color: "white", textAlign: "center" },
});

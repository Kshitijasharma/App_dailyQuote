/**import { useState, useEffect } from "react";
import { View, Text, Button, ActivityIndicator, StyleSheet, Alert } from "react-native";
import axios from "axios";

export default function HomeScreen() {
  const [quote, setQuote] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      console.log("Fetching quote...");
      const response = await axios.get("https://zenquotes.io/api/today");
      console.log("API Response:", response.data);

      if (response.data && response.data.length > 0) {
        setQuote(`${response.data[0].q} - ${response.data[0].a}`);
      } else {
        throw new Error("No quote available.");
      }
    } catch (error: any) {
      console.error("Error fetching quote:", error.message);
      Alert.alert("Error", "Could not fetch quote. Trying a backup API...");
      fetchBackupQuote(); // Try backup API
    } finally {
      setLoading(false);
    }
  };

  const fetchBackupQuote = async () => {
    try {
      console.log("Fetching backup quote...");
      const response = await fetch("http://api.quotable.io/random");
      const data = await response.json();
      console.log("Backup API Response:", data);

      if (data.content) {
        setQuote(`${data.content} - ${data.author}`);
      } else {
        throw new Error("No quote available from backup API.");
      }
    } catch (error: any) {
      console.error("Backup API error:", error.message);
      setQuote("Failed to fetch a quote.");
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Text style={styles.quote}>{quote}</Text>
      )}
      <Button title="Refresh Quote" onPress={fetchQuote} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  quote: { fontSize: 18, textAlign: "center", marginBottom: 20 },
});
**/

/** 
import { useState, useEffect } from "react";
import { View, Text, Button, ActivityIndicator, StyleSheet, Alert, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function HomeScreen() {
  const [quote, setQuote] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      console.log("Fetching quote...");
      const response = await axios.get("https://zenquotes.io/api/today");
      console.log("API Response:", response.data);

      if (response.data && response.data.length > 0) {
        const newQuote = `${response.data[0].q} - ${response.data[0].a}`;
        setQuote(newQuote);
        checkIfFavorite(newQuote);
        saveToExplore(newQuote);
      } else {
        throw new Error("No quote available.");
      }
    } catch (error: any) {
      console.error("Error fetching quote:", error.message);
      Alert.alert("Error", "Could not fetch quote. Trying a backup API...");
      fetchBackupQuote();
    } finally {
      setLoading(false);
    }
  };

  const fetchBackupQuote = async () => {
    try {
      console.log("Fetching backup quote...");
      const response = await fetch("http://api.quotable.io/random");
      const data = await response.json();
      console.log("Backup API Response:", data);

      if (data.content) {
        const backupQuote = `${data.content} - ${data.author}`;
        setQuote(backupQuote);
        checkIfFavorite(backupQuote);
        saveToExplore(backupQuote);
      } else {
        throw new Error("No quote available from backup API.");
      }
    } catch (error: any) {
      console.error("Backup API error:", error.message);
      setQuote("Failed to fetch a quote.");
    }
  };

  const saveToExplore = async (newQuote: string) => {
    try {
      const existingQuotes = await AsyncStorage.getItem("exploreQuotes");
      const quotesArray = existingQuotes ? JSON.parse(existingQuotes) : [];

      if (!quotesArray.includes(newQuote)) {
        quotesArray.push(newQuote);
        await AsyncStorage.setItem("exploreQuotes", JSON.stringify(quotesArray));
      }
    } catch (error) {
      console.error("Error saving quote to explore:", error);
    }
  };

  const toggleFavorite = async () => {
    if (!quote) return;

    try {
      const existingFavorites = await AsyncStorage.getItem("favorites");
      let favoritesArray = existingFavorites ? JSON.parse(existingFavorites) : [];

      if (isFavorite) {
        favoritesArray = favoritesArray.filter((q: string) => q !== quote);
      } else {
        favoritesArray.push(quote);
      }

      await AsyncStorage.setItem("favorites", JSON.stringify(favoritesArray));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  const checkIfFavorite = async (currentQuote: string) => {
    try {
      const existingFavorites = await AsyncStorage.getItem("favorites");
      const favoritesArray = existingFavorites ? JSON.parse(existingFavorites) : [];
      setIsFavorite(favoritesArray.includes(currentQuote));
    } catch (error) {
      console.error("Error checking favorites:", error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={styles.quoteContainer}>
          <Text style={styles.quote}>{quote}</Text>
          <TouchableOpacity onPress={toggleFavorite}>
            <Text style={[styles.heart, isFavorite && styles.heartActive]}>
              {isFavorite ? "❤️" : "🤍"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <Button title="Refresh Quote" onPress={fetchQuote} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  quoteContainer: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  quote: { fontSize: 18, textAlign: "center", flex: 1 },
  heart: { fontSize: 24, marginLeft: 10 },
  heartActive: { color: "red" },
});
**/


import { useState, useEffect, useRef } from "react";
import { 
  View, Text, Button, ActivityIndicator, StyleSheet, Alert, TouchableOpacity, 
  ImageBackground, Animated 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function HomeScreen() {
  const [quote, setQuote] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity is 0

  const fetchQuote = async () => {
    setLoading(true);
    try {
      console.log("Fetching quote...");
      const response = await axios.get("https://zenquotes.io/api/today");
      console.log("API Response:", response.data);

      if (response.data && response.data.length > 0) {
        const newQuote = `${response.data[0].q} - ${response.data[0].a}`;
        setQuote(newQuote);
        checkIfFavorite(newQuote);
        saveToExplore(newQuote);
      } else {
        throw new Error("No quote available.");
      }
    } catch (error: any) {
      console.error("Error fetching quote:", error.message);
      Alert.alert("Error", "Could not fetch quote. Trying a backup API...");
      fetchBackupQuote();
    } finally {
      setLoading(false);
    }
  };

  const fetchBackupQuote = async () => {
    try {
      console.log("Fetching backup quote...");
      const response = await fetch("http://api.quotable.io/random");
      const data = await response.json();
      console.log("Backup API Response:", data);

      if (data.content) {
        const backupQuote = `${data.content} - ${data.author}`;
        setQuote(backupQuote);
        checkIfFavorite(backupQuote);
        saveToExplore(backupQuote);
      } else {
        throw new Error("No quote available from backup API.");
      }
    } catch (error: any) {
      console.error("Backup API error:", error.message);
      setQuote("Failed to fetch a quote.");
    }
  };

  const saveToExplore = async (newQuote: string) => {
    try {
      const existingQuotes = await AsyncStorage.getItem("exploreQuotes");
      const quotesArray = existingQuotes ? JSON.parse(existingQuotes) : [];

      if (!quotesArray.includes(newQuote)) {
        quotesArray.push(newQuote);
        await AsyncStorage.setItem("exploreQuotes", JSON.stringify(quotesArray));
      }
    } catch (error) {
      console.error("Error saving quote to explore:", error);
    }
  };

  const toggleFavorite = async () => {
    if (!quote) return;

    try {
      const existingFavorites = await AsyncStorage.getItem("favorites");
      let favoritesArray = existingFavorites ? JSON.parse(existingFavorites) : [];

      if (isFavorite) {
        favoritesArray = favoritesArray.filter((q: string) => q !== quote);
      } else {
        favoritesArray.push(quote);
      }

      await AsyncStorage.setItem("favorites", JSON.stringify(favoritesArray));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  const checkIfFavorite = async (currentQuote: string) => {
    try {
      const existingFavorites = await AsyncStorage.getItem("favorites");
      const favoritesArray = existingFavorites ? JSON.parse(existingFavorites) : [];
      setIsFavorite(favoritesArray.includes(currentQuote));
    } catch (error) {
      console.error("Error checking favorites:", error);
    }
  };

  useEffect(() => {
    fetchQuote();
    
    // Start fade-in animation when the component mounts
    Animated.timing(fadeAnim, {
      toValue: 1, // Fully visible
      duration: 2000, // 2 seconds fade-in
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ImageBackground
      source={{ uri: "https://images.pexels.com/photos/1616516/pexels-photo-1616516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" }} // Random nature image from Unsplash
      style={styles.background}
    >
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <View style={styles.quoteContainer}>
            <Text style={styles.quote}>{quote}</Text>
            <TouchableOpacity onPress={toggleFavorite}>
              <Text style={[styles.heart, isFavorite && styles.heartActive]}>
                {isFavorite ? "❤️" : "🤍"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <Button title="Refresh Quote" onPress={fetchQuote} />
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
  },
  quoteContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  quote: {
    fontSize: 24,
    textAlign: "center",
    flex: 1,
    color: "white",
  },
  heart: {
    fontSize: 24,
    marginLeft: 10,
    color: "white",
  },
  heartActive: {
    color: "red",
  },
});


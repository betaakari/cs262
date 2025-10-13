import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView, View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

// Movies (React Native tutorial; static JSON)
const MOVIES_URL = "https://reactnative.dev/movies.json";

// Products (public demo API; no Lab 5 needed)
const PRODUCTS_URL = "https://dummyjson.com/products?limit=10&select=title,price";

const DATASETS = { MOVIES: "movies", PRODUCTS: "products" };

export default function App() {
  const [dataset, setDataset] = useState(DATASETS.MOVIES);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUrl, setLastUrl] = useState("");

  const url = useMemo(() => (dataset === DATASETS.MOVIES ? MOVIES_URL : PRODUCTS_URL), [dataset]);

  function normalize(json, which) {
    if (which === DATASETS.MOVIES) {
      // { title, description, movies: [{ id, title, releaseYear }] }
      return (json?.movies ?? []).map((m) => ({
        id: String(m.id),
        title: m.title,
        subtitle: `Year: ${m.releaseYear}`,
      }));
    }
    // dummyjson: { products: [{ id, title, price }, ...] }
    return (json?.products ?? []).map((p) => ({
      id: String(p.id),
      title: p.title,
      subtitle: `Price: $${p.price}`,
    }));
  }

  async function fetchData() {
    setLoading(true);
    setError(null);
    setLastUrl(url);
    try {
      const res = await fetch(url, { method: "GET" });
      if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
      const json = await res.json();
      setData(normalize(json, dataset));
    } catch (e) {
      setError(String(e?.message || e));
      setData([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [dataset]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      {!!item.subtitle && <Text style={styles.subtitle}>{item.subtitle}</Text>}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.header}>Fetch Example (Movies & Products)</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.tab, dataset === DATASETS.MOVIES && styles.tabActive]}
          onPress={() => setDataset(DATASETS.MOVIES)}
        >
          <Text style={styles.tabText}>Movies</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, dataset === DATASETS.PRODUCTS && styles.tabActive]}
          onPress={() => setDataset(DATASETS.PRODUCTS)}
        >
          <Text style={styles.tabText}>Products</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.small}>URL: {lastUrl || url}</Text>

      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text>Loading...</Text>
        </View>
      )}

      {!!error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>Fetch failed: {error}</Text>
          <Text style={styles.small}>Tip: switch tabs or fix the URL above.</Text>
        </View>
      )}

      {!loading && !error && (
        <FlatList
          data={data}
          keyExtractor={(it) => it.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.small}>No items.</Text>}
        />
      )}

      <Text style={[styles.small, { marginTop: 8 }]}>Try breaking the URL to test error handling.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  row: { flexDirection: "row", gap: 8, marginBottom: 8 },
  tab: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 12, backgroundColor: "#eee" },
  tabActive: { backgroundColor: "#cde5ff" },
  tabText: { fontWeight: "600" },
  small: { fontSize: 12, color: "#444", marginBottom: 8 },
  center: { alignItems: "center", gap: 8, marginTop: 16 },
  errorBox: { backgroundColor: "#ffe5e5", padding: 12, borderRadius: 12, marginVertical: 8 },
  errorText: { color: "#b00020", fontWeight: "600", marginBottom: 4 },
  list: { gap: 8, paddingVertical: 8 },
  card: { padding: 14, borderRadius: 12, backgroundColor: "#f7f7f7" },
  title: { fontSize: 16, fontWeight: "700" },
  subtitle: { marginTop: 4, color: "#555" },
});

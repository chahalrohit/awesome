// App.tsx
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { initDatabase } from '../../sqlite/db/bootstrap';
import { sumByCategory } from '../../sqlite/expenses/repo';

const App: React.FC = () => {
  const [ready, setReady] = useState(false);
  const [summary, setSummary] = useState<{ name: string; total: number }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const didRun = useRef(false); // dev double-run guard

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    (async () => {
      try {
        setError(null);

        // 1) Open DB + versioned migrations (fresh DB => seed ek demo expense)
        const result = await initDatabase();
        console.log('DB MIGRATION RESULT:', result);

        // 2) Load summary
        const now = new Date();
        const s = await sumByCategory(now.getFullYear(), now.getMonth());
        setSummary(s);
      } catch (e: any) {
        console.error('App init error:', e);
        setError(e?.message ?? String(e));
      } finally {
        setReady(true);
      }
    })();
  }, []);

  if (!ready) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text style={styles.note}>Preparing local database…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.center, { padding: 16 }]}>
        <Text style={[styles.note, { marginBottom: 8 }]}>
          Something went wrong initializing the app.
        </Text>
        <Text style={{ color: 'crimson', textAlign: 'center' }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={styles.header}>Category Totals (this month)</Text>
      {summary.length === 0 ? (
        <Text style={styles.note}>No expenses yet.</Text>
      ) : (
        summary.map(row => (
          <Text key={row.name}>
            {row.name}: ₹{row.total.toFixed(2)}
          </Text>
        ))
      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  note: { marginTop: 8, color: '#666' },
  header: { fontWeight: 'bold', fontSize: 18, marginBottom: 8 },
});

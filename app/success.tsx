import React from "react";
import { Pressable, StatusBar, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { useEventInventory } from "../src/context/EventContext";
import { styles } from "../src/styles/styles";

export default function SuccessPage() {
  const router = useRouter();
  const { events } = useEventInventory();
  const { eventId, name } = useLocalSearchParams<{
    eventId?: string | string[];
    name?: string | string[];
  }>();

  const finalEventId = Array.isArray(eventId) ? eventId[0] : eventId;
  const participantName = Array.isArray(name) ? name[0] : name;
  const event = events.find((item) => String(item.id) === String(finalEventId));

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F7FC" />

      <View style={styles.successPage}>
        <View style={styles.successIconBox}>
          <Text style={styles.successIcon}>✓</Text>
        </View>

        <Text style={styles.successEyebrow}>REGISTRATION SUCCESS</Text>
        <Text style={styles.successTitle}>You are on the list!</Text>
        <Text style={styles.successText}>
          {participantName || "Participant"}, pendaftaran untuk
          {event ? ` “${event.title}”` : " event ini"} berhasil disimpan pada
          simulasi aplikasi.
        </Text>

        <View style={styles.successInfoCard}>
          <Text style={styles.successInfoLabel}>SEATS UPDATED</Text>
          <Text style={styles.successInfoValue}>
            {event ? `${event.seats} seats remaining` : "Data event tidak ditemukan"}
          </Text>
          <Text style={styles.successInfoText}>
            Jumlah kursi sudah berkurang 1 pada state bersama.
          </Text>
          <Text style={styles.successInfoLabel}>NAVIGATION METHOD</Text>
          <Text style={styles.successInfoValue}>router.replace()</Text>
          <Text style={styles.successInfoText}>
            Halaman registration diganti oleh halaman success, sesuai konsep
            replace pada Expo Router.
          </Text>
        </View>

        <Pressable
          style={styles.primaryWideButton}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.primaryWideButtonText}>Back to Home</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

import React, { useMemo, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { useEventInventory } from "../../src/context/EventContext";
import { styles } from "../../src/styles/styles";

export default function RegistrationPage() {
  const router = useRouter();
  const { events, reserveSeat } = useEventInventory();
  const submittedRef = useRef(false);
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const [name, setName] = useState("");
  const [nim, setNim] = useState("");

  const eventId = Array.isArray(id) ? id[0] : id;
  const event = useMemo(
    () => events.find((item) => String(item.id) === String(eventId)),
    [eventId, events]
  );

  const canSubmit =
    name.trim().length > 2 &&
    nim.trim().length > 4 &&
    Boolean(event && event.seats > 0);

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  const submitRegistration = () => {
    if (!event || !canSubmit || submittedRef.current) {
      return;
    }

    // Hanya kurangi satu kursi per satu konfirmasi pendaftaran.
    submittedRef.current = true;
    reserveSeat(event.id);

    router.replace({
      pathname: "/success",
      params: {
        eventId: String(event.id),
        name: name.trim(),
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F7FC" />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.formPage}
      >
        <View style={styles.navRow}>
          <Pressable style={styles.backButton} onPress={goBack}>
            <Text style={styles.backButtonText}>‹</Text>
          </Pressable>
          <Text style={styles.navTitle}>Registration</Text>
          <View style={styles.navSpacer} />
        </View>

        <View style={styles.formHero}>
          <Text style={styles.formHeroEmoji}>📝</Text>
          <Text style={styles.formHeroTitle}>Reserve your seat</Text>
          <Text style={styles.formHeroText}>
            {event?.title ?? "Campus Event"}
          </Text>
          <Text style={styles.formHeroText}>
            {event ? `${event.seats} seats available` : "Event tidak ditemukan"}
          </Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.inputLabel}>FULL NAME</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Masukkan nama lengkap"
            placeholderTextColor="#AAA1B4"
            style={styles.formInput}
          />

          <Text style={[styles.inputLabel, styles.inputLabelSpacing]}>NIM</Text>
          <TextInput
            value={nim}
            onChangeText={setNim}
            placeholder="Masukkan NIM"
            placeholderTextColor="#AAA1B4"
            keyboardType="number-pad"
            style={styles.formInput}
          />

          <View style={styles.formStateBox}>
            <Text style={styles.formStateTitle}>State aktif</Text>
            <Text style={styles.formStateText}>
              name = {name || "(kosong)"} | nim = {nim || "(kosong)"}
            </Text>
          </View>
        </View>

        <Pressable
          disabled={!canSubmit}
          onPress={submitRegistration}
          style={({ pressed }) => [
            styles.primaryWideButton,
            !canSubmit && styles.disabledButton,
            pressed && canSubmit && { opacity: 0.8 },
          ]}
        >
          <Text style={styles.primaryWideButtonText}>
            Confirm Registration
          </Text>
        </Pressable>

        <Text style={styles.formHint}>
          Setelah konfirmasi, useState pada EventProvider mengurangi seat sebanyak 1,
          lalu router.replace() membuka halaman Success. Kembali ke Home untuk melihat
          jumlah kursi terbaru.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

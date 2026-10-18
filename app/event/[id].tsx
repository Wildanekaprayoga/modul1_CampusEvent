import React, { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { EventItem } from "../../src/data/events";
import { useEventInventory } from "../../src/context/EventContext";
import { styles } from "../../src/styles/styles";

export default function EventDetailPage() {
  const router = useRouter();
  const { events } = useEventInventory();
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const eventId = Array.isArray(id) ? id[0] : id;

  useEffect(() => {
    const selectedEvent = events.find(
      (item) => String(item.id) === String(eventId)
    );

    setEvent(selectedEvent ?? null);
  }, [eventId, events]);

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  if (!event) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#F7F7FC" />
        <View style={styles.centerState}>
          <Text style={styles.centerEmoji}>⏳</Text>
          <Text style={styles.centerTitle}>Loading event...</Text>
          <Text style={styles.centerText}>
            Data event dicari berdasarkan dynamic route /event/[id].
          </Text>
          <Pressable style={styles.secondaryWideButton} onPress={goBack}>
            <Text style={styles.secondaryWideButtonText}>Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F7FC" />

      <ScrollView contentContainerStyle={styles.detailPage}>
        <View style={styles.navRow}>
          <Pressable style={styles.backButton} onPress={goBack}>
            <Text style={styles.backButtonText}>‹</Text>
          </Pressable>

          <Text style={styles.navTitle}>Event Detail</Text>

          <Pressable
            style={[
              styles.favoriteButton,
              isFavorite && { backgroundColor: "#FCE7F3" },
            ]}
            onPress={() => setIsFavorite((current) => !current)}
          >
            <Text style={styles.favoriteIcon}>{isFavorite ? "♥" : "♡"}</Text>
          </Pressable>
        </View>

        <View
          style={[
            styles.detailHero,
            { backgroundColor: event.softColor },
          ]}
        >
          <View
            style={[
              styles.detailHeroIcon,
              { backgroundColor: event.accentColor },
            ]}
          >
            <Text style={styles.detailHeroEmoji}>{event.emoji}</Text>
          </View>

          <View style={styles.detailCategoryBadge}>
            <Text style={styles.detailCategoryText}>{event.category}</Text>
          </View>
        </View>

        <Text style={styles.detailTitle}>{event.title}</Text>
        <Text style={styles.detailDescription}>{event.description}</Text>

        <View style={styles.detailInfoCard}>
          <View style={styles.detailInfoItem}>
            <Text style={styles.detailInfoEmoji}>📅</Text>
            <View style={styles.detailInfoContent}>
              <Text style={styles.detailInfoLabel}>DATE & TIME</Text>
              <Text style={styles.detailInfoValue}>
                {event.date} • {event.time}
              </Text>
            </View>
          </View>

          <View style={styles.detailInfoDivider} />

          <View style={styles.detailInfoItem}>
            <Text style={styles.detailInfoEmoji}>📍</Text>
            <View style={styles.detailInfoContent}>
              <Text style={styles.detailInfoLabel}>LOCATION</Text>
              <Text style={styles.detailInfoValue}>{event.location}</Text>
            </View>
          </View>

          <View style={styles.detailInfoDivider} />

          <View style={styles.detailInfoItem}>
            <Text style={styles.detailInfoEmoji}>🎟️</Text>
            <View style={styles.detailInfoContent}>
              <Text style={styles.detailInfoLabel}>AVAILABLE SEATS</Text>
              <Text style={styles.detailInfoValue}>{event.seats} seats</Text>
            </View>
          </View>
        </View>

        <View style={styles.moduleProofCard}>
          <Text style={styles.moduleProofTitle}>Modul 2 proof</Text>
          <Text style={styles.moduleProofText}>
            useLocalSearchParams mengambil id route, useEffect mencari data event,
            dan useState menyimpan event serta status favorite.
          </Text>
        </View>

        <Pressable
          onPress={() =>
            router.push({
              pathname: "/register/[id]",
              params: { id: String(event.id) },
            })
          }
          disabled={event.seats <= 0}
          style={({ pressed }) => [
            styles.primaryWideButton,
            { backgroundColor: event.accentColor },
            event.seats <= 0 && styles.disabledButton,
            pressed && { opacity: 0.8 },
          ]}
        >
          <Text style={styles.primaryWideButtonText}>
            {event.seats > 0 ? "Join This Event →" : "Seats Full"}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

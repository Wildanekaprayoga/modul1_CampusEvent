import React, { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { EventItem } from "../src/data/events";
import { useEventInventory } from "../src/context/EventContext";
import { styles } from "../src/styles/styles";

type CategoryFilter = "All" | EventItem["category"];

export default function HomePage() {
  const router = useRouter();
  const { events } = useEventInventory();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("All");

  const categories: CategoryFilter[] = [
    "All",
    "Technology",
    "Music",
    "Sport",
    "Creative",
  ];

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const sameCategory =
        selectedCategory === "All" || event.category === selectedCategory;

      const sameSearch = event.title
        .toLowerCase()
        .includes(search.toLowerCase().trim());

      return sameCategory && sameSearch;
    });
  }, [events, search, selectedCategory]);

  const openEventDetail = (event: EventItem) => {
    router.push({
      pathname: "/event/[id]",
      params: { id: String(event.id) },
    });
  };

  const joinEvent = (event: EventItem) => {
    router.push({
      pathname: "/register/[id]",
      params: { id: String(event.id) },
    });
  };

  const renderEventCard = (event: EventItem) => {
    return (
      <View key={event.id} style={styles.eventCard}>
        <View
          style={[
            styles.eventAccent,
            { backgroundColor: event.accentColor },
          ]}
        />

        <View style={styles.eventBody}>
          <View style={styles.eventTopRow}>
            <View
              style={[
                styles.eventIcon,
                { backgroundColor: event.softColor },
              ]}
            >
              <Text style={styles.eventEmoji}>{event.emoji}</Text>
            </View>

            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>{event.category}</Text>
            </View>
          </View>

          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.eventDescription}>{event.description}</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>📅</Text>
            <Text style={styles.infoText}>
              {event.date} • {event.time}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>📍</Text>
            <Text style={styles.infoText}>{event.location}</Text>
          </View>

          <View style={styles.eventFooter}>
            <View>
              <Text style={styles.seatCaption}>AVAILABLE</Text>
              <Text style={styles.seatValue}>{event.seats} seats</Text>
            </View>

            <View style={styles.actionRow}>
              <Pressable
                onPress={() => openEventDetail(event)}
                style={({ pressed }) => [
                  styles.detailButton,
                  pressed && { opacity: 0.6 },
                ]}
              >
                <Text style={styles.detailButtonText}>Details</Text>
              </Pressable>

              <Pressable
                onPress={() => joinEvent(event)}
                style={({ pressed }) => [
                  styles.joinButton,
                  { backgroundColor: event.accentColor },
                  pressed && { transform: [{ scale: 0.97 }] },
                ]}
              >
                <Text style={styles.joinButtonText}>Join Event →</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F7FC" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.page}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>WELCOME TO</Text>
            <Text style={styles.brand}>CampusEvent</Text>
          </View>

          <View style={styles.profileButton}>
            <Text style={styles.profileEmoji}>🎓</Text>
            <View style={styles.notificationDot} />
          </View>
        </View>

        <View style={styles.moduleBadge}>
          <Text style={styles.moduleBadgeText}>
            MODUL 2 • STATE, HOOKS & NAVIGATION
          </Text>
        </View>

        <View style={styles.hero}>
          <View style={styles.heroBubbleOne} />
          <View style={styles.heroBubbleTwo} />

          <View style={styles.heroTag}>
            <Text style={styles.heroTagText}>✨ CAMPUS EXPERIENCE</Text>
          </View>

          <Text style={styles.heroTitle}>
            Make every campus moment unforgettable.
          </Text>

          <Text style={styles.heroSubtitle}>
            Discover seminars, competitions, festivals, communities, and
            exciting activities around campus.
          </Text>

          <View style={styles.heroStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{events.length}</Text>
              <Text style={styles.statLabel}>Events</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Categories</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>24+</Text>
              <Text style={styles.statLabel}>Communities</Text>
            </View>
          </View>
        </View>

        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search campus events..."
            placeholderTextColor="#A49CAD"
            style={styles.searchInput}
          />
          <View style={styles.filterIconBox}>
            <Text style={styles.filterIcon}>☷</Text>
          </View>
        </View>

        <View style={styles.sectionHeading}>
          <View>
            <Text style={styles.sectionEyebrow}>EXPLORE</Text>
            <Text style={styles.sectionTitle}>Categories</Text>
          </View>
          <Text style={styles.sectionHint}>Choose one</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        >
          {categories.map((category) => {
            const active = selectedCategory === category;

            return (
              <Pressable
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={[
                  styles.categoryChip,
                  active && styles.categoryChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    active && styles.categoryChipTextActive,
                  ]}
                >
                  {category}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.featuredCard}>
          <View style={styles.featuredLeft}>
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredBadgeText}>★ FEATURED EVENT</Text>
            </View>

            <Text style={styles.featuredTitle}>UMM Creative Week 2026</Text>
            <Text style={styles.featuredDescription}>
              A celebration of ideas, design, technology and student creativity.
            </Text>

            <Text style={styles.featuredDate}>📅 20 October • 09:00</Text>
          </View>

          <View style={styles.featuredArtwork}>
            <View style={styles.artCircleOuter}>
              <View style={styles.artCircleInner}>
                <Text style={styles.artEmoji}>🎨</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.sectionHeading}>
          <View>
            <Text style={styles.sectionEyebrow}>DON'T MISS</Text>
            <Text style={styles.sectionTitle}>Upcoming Events</Text>
          </View>

          <View style={styles.resultCount}>
            <Text style={styles.resultCountText}>{filteredEvents.length}</Text>
          </View>
        </View>

        <View style={styles.eventList}>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => renderEventCard(event))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>🔎</Text>
              <Text style={styles.emptyTitle}>Event not found</Text>
              <Text style={styles.emptyText}>
                Coba kata kunci atau kategori yang berbeda.
              </Text>
            </View>
          )}
        </View>

        <View style={styles.cta}>
          <View style={styles.ctaIcon}>
            <Text style={styles.ctaEmoji}>🧭</Text>
          </View>
          <View style={styles.ctaContent}>
            <Text style={styles.ctaTitle}>Now with multi-page navigation.</Text>
            <Text style={styles.ctaText}>
              Open detail, registration, then return through the Expo Router
              navigation flow.
            </Text>
          </View>
        </View>

        <Text style={styles.footer}>
          CampusEvent • Pemrograman Mobile • Modul 2
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { ThemeContext } from "../src/context/ThemeContext";

export const TodoItem = React.memo(({ item, onToggle, onRemove, onDetails }) => {
  const { theme } = useContext(ThemeContext);

  const styles = createStyles(theme);

  return (
    <View style={styles.itemRow}>
      <Text
        style={[
          styles.todoItem,
          item.completed && styles.completedText,
        ]}
        onPress={() => onToggle(item.id)}
      >
        {item.title}
      </Text>

      <Pressable onPress={() => onDetails(item.id)}>
        <MaterialCommunityIcons
          name="information-outline"
          size={24}
          color={theme.text}
        />
      </Pressable>

      <Pressable onPress={() => onRemove(item.id)}>
        <MaterialCommunityIcons
          name="delete"
          size={24}
          color={theme.text}
        />
      </Pressable>
    </View>
  );
});

function createStyles(theme) {
  return StyleSheet.create({
    itemRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10,
      padding: 10,
      borderBottomColor: theme.text,
      borderBottomWidth: 1,
      width: "100%",
      maxWidth: 1024,
      marginHorizontal: "auto",
    },
    todoItem: {
      color: theme.text,
      flex: 1,
      fontSize: 18,
    },
    completedText: {
      color: theme.completedText,
      textDecorationLine: "line-through",
    },
  });
}

import { useState, useContext } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { TodoItem } from "../../components/Todoitem";
import { useTodos } from "../../hooks/useTodos";
import { ThemeContext } from "../context/ThemeContext";

export default function Index() {
  const [text, setText] = useState("");

  const router = useRouter();

  const {
    todos,
    addTodo,
    toggleTodo,
    removeTodo,
  } = useTodos();

  const {
    colorScheme,
    setColorScheme,
    theme,
  } = useContext(ThemeContext);

  const styles = createStyles(theme);

  // Open todo details
  const handlePress = (id: number) => {
    router.push(`/details/${id}`);
  };

  // Add todo
  const handleAddTodo = () => {
    if (text.trim()) {
      addTodo(text);
      setText("");
    }
  };

  // Change theme
  const handleTheme = () => {
    setColorScheme(
      colorScheme === "light" ? "dark" : "light"
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Input text here"
          placeholderTextColor={theme.text}
          value={text}
          onChangeText={setText}
        />

        <Pressable
          style={styles.button}
          onPress={handleAddTodo}
        >
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>

        {/* Theme button */}
        <Pressable
          style={styles.button}
          onPress={handleTheme}
        >
          {colorScheme === "light" ? (
            <MaterialCommunityIcons
              name="weather-sunny"
              size={24}
              color={theme.buttonText}
              style={styles.themeIcon}
            />
          ) : (
            <MaterialCommunityIcons
              name="moon-waning-crescent"
              size={24}
              color={theme.buttonText}
              style={styles.themeIcon}
            />
          )}
        </Pressable>
      </View>

      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            onToggle={toggleTodo}
            onRemove={removeTodo}
            onDetails={handlePress}
          />
        )}
        keyExtractor={(todo) => todo.id.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </SafeAreaView>
  );
}

// Styles

function createStyles(theme: any) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    inputContainer: {
      flexDirection: "row",
      marginBottom: 10,
      padding: 10,
      width: "100%",
      maxWidth: 1024,
      marginHorizontal: "auto",
    },
    input: {
      flex: 1,
      borderWidth: 2,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      fontSize: 18,
      minWidth: 0,
      borderColor: theme.text,
      color: theme.text,
    },
    button: {
      backgroundColor: theme.primary,
      borderColor: theme.text,
      padding: 10,
      borderWidth: 2,
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      color: theme.buttonText,
    },
    themeIcon: {
      color: theme.buttonText,
    },
  });
}
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native";

export default function Details() {
    const {id} = useLocalSearchParams();

    return(
        <SafeAreaView>
            <Text>{id}</Text>
        </SafeAreaView>
    )
}
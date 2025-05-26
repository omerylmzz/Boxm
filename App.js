import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import Route from "./src/screens/Route";
import { StatusBar } from "react-native";
import LightTheme from "./src/themes/LightTheme";
import { SQLiteProvider } from "expo-sqlite";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <SQLiteProvider
          databaseName="boxm.db"
          onInit={async (db) => {
            await db.execAsync(
              `CREATE TABLE IF NOT EXISTS collections (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              icon TEXT NOT NULL);`
            );
            await db.execAsync(
              `CREATE TABLE IF NOT EXISTS applications (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              collection_id INTEGER NOT NULL,
              application_name TEXT NOT NULL,
              first_name TEXT,
              last_name TEXT,
              user_name TEXT,
              email_address TEXT,
              first_password TEXT NOT NULL,
              second_password TEXT,
              third_password TEXT,
              FOREIGN KEY (collection_id) REFERENCES collections(id) ON DELETE CASCADE);`
            );
          }}
        >
          <StatusBar
            barStyle="dark-content"
            backgroundColor={LightTheme.colors.background}
          />
          <Route />
        </SQLiteProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

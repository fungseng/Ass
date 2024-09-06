import React from "react";
import { Dimensions, View, TouchableNativeFeedback } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeStack from "./AssFolder/Home Screen"; // Update with your actual path
import AdminLoginScreen from "./AssFolder/AdminLoginScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DirectoryStack from "./AssFolder/DirectoryStack"; // Import the DirectoryStack
const bottom = createBottomTabNavigator();

const CustomBottom = ({ children, onPress }: any) => {
  return (
    <TouchableNativeFeedback
      style={{ justifyContent: "center", alignItems: "center" }}
      onPress={onPress}
    >
      <View
        style={{
          width: 130,
          backgroundColor: "#c85757",
        }}
      >
        {children}
      </View>
    </TouchableNativeFeedback>
  );
};

const App = () => {
  const winHeight = Dimensions.get("window").height;

  return (
    <NavigationContainer>
      <bottom.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            height: winHeight * 0.1,
            position: "absolute",
            backgroundColor: "#b3bab5",
            borderTopWidth: 2,
            borderTopColor: "black",
          },
        }}
      >
        <bottom.Screen
          name="home"
          component={HomeStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="greenhouse"
                size={50}
                color={focused ? "#9d1807" : "white"}
              />
            ),
          }}
        />
        <bottom.Screen
          name="directory"
          component={DirectoryStack} // Use DirectoryStack here
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="book"
                size={50}
                color={focused ? "#364d2a" : "white"}
              />
            ),
            tabBarButton: (props: any) => <CustomBottom {...props} />,
          }}
        />
        <bottom.Screen
          name="admin"
          component={AdminLoginScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon name="account-box" size={50} color={focused ? "#9d1807" : "white"} />
            ),
          }}
        />
      </bottom.Navigator>
    </NavigationContainer>
  );
};

export default App;

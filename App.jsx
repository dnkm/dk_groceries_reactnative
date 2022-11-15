import { Text, View, TouchableOpacity, Modal, TextInput } from "react-native";
import { NativeRouter, Routes, Route, Link } from "react-router-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { useState, useEffect, useCallback } from "react";
import { fdb } from "./fb";
import Icon from "react-native-vector-icons/Feather";

import Home from "./pages/home";
import RecentViews from "./pages/recent-views";
import Stores from "./pages/stores";
import Store from "./pages/store";
import Goods from "./pages/goods";
import Good from "./pages/good";

export default function App() {
  let [zipCode, setZipCode] = useState(undefined);

  const ROUTES = [
    {
      element: <Home zipCode={zipCode} />,
      path: "/",
    },
    { element: <Stores />, path: "/stores" },
    { element: <Store />, path: "/store/:id" },
    { element: <Goods />, path: "/goods" },
    { element: <Good />, path: `/good/:id` },
    { element: <RecentViews />, path: "/recentviews" },
  ];

  const getZipCode = useCallback(async () => {
    const code = await AsyncStorage.getItem("zip-code");
    if (code !== null) setZipCode(code);
  }, [setZipCode]);

  useEffect(() => {
    if (zipCode) AsyncStorage.setItem("zip-code", zipCode);
  }, [zipCode]);

  useEffect(() => {
    getZipCode();
  }, []);

  return (
    <NativeRouter>
      <View className="h-full flex">
        <Header zipCode={zipCode} />
        <View className="flex-1">
          <Routes>
            {ROUTES.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
                exact
              />
            ))}
          </Routes>
        </View>
        <Footer zipCode={zipCode} setZipCode={setZipCode} />
      </View>
    </NativeRouter>
  );
}

const MENU = [
  { title: "Essential Goods", path: "/goods" },
  { title: "Local Stores", path: "/stores" },
  { title: "Recent Views", path: "/recentviews" },
];

function Header() {
  let [menu, setMenu] = useState(false);

  return (
    <View
      className="bg-slate-100 flex flex-row justify-between py-2 px-5 shadow-lg items-center"
      style={{ marginTop: Constants.statusBarHeight }}
    >
      <Link to="/">
        <Text className="text-cgreen text-3xl font-bold">GrocerEZ</Text>
      </Link>
      <TouchableOpacity onPress={() => setMenu(true)}>
        <Icon name="menu" size={30} />
      </TouchableOpacity>
      <Modal
        onDismiss={() => setMenu(false)}
        animationType="fade"
        transparent={true}
        visible={menu}
      >
        <View
          className="flex-1 flex items-end"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}
        >
          <View className="bg-white w-1/2 h-full p-2 flex shadow-lg">
            <TouchableOpacity onPress={() => setMenu(false)}>
              <Icon name="menu" size={30} />
            </TouchableOpacity>
            <View className="p-2">
              {MENU.map((m) => (
                <Link
                  key={m.path}
                  to={m.path}
                  onPress={() => setMenu(false)}
                  className="mt-2"
                >
                  <Text className="text-xl">{m.title}</Text>
                </Link>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function Footer({ zipCode, setZipCode }) {
  let [editCode, setEditCode] = useState("");
  let [edit, setEdit] = useState(false);

  return (
    <View className="flex flex-row justify-end bg-slate-100">
      <TouchableOpacity onPress={() => setEdit(true)}>
        <Text className="text-cwhite bg-cgreen px-5 py-5">
          {zipCode ? zipCode : "Enter Zip Code"}
        </Text>
      </TouchableOpacity>
      <Modal
        onDismiss={() => setEdit(false)}
        animationType="fade"
        transparent={true}
        visible={edit}
      >
        <View
          className="flex-1 flex items-center p-20"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}
        >
          <View className="bg-white w-full rounded-xl p-5 flex items-center shadow-lg">
            <Text className="text-3xl text-green-500">Enter Zip Code</Text>
            <TextInput
              className="bg-gray-200 w-full p-2 my-5"
              placeholder="Zip Code"
              value={editCode}
              onChangeText={setEditCode}
            ></TextInput>
            <View className="flex flex-row justify-around w-full">
              <TouchableOpacity
                onPress={() => {
                  setZipCode(editCode);
                  setEdit(false);
                }}
                className="py-2 px-5 bg-green-200 rounded-xl"
              >
                <Text>Set</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setEditCode("");
                  setEdit(false);
                }}
                className="py-2 px-5 bg-red-200 rounded-xl"
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

import { Text, View, TouchableOpacity, Modal, TextInput } from "react-native";
import { NativeRouter, Routes, Route, Link } from "react-router-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { useState, useEffect, useCallback } from "react";
import { fdb } from "./fb";
import Icon from "react-native-vector-icons/Feather";

import RecentViews from "./pages/recent-views";
import Stores from "./pages/stores";
import Store from "./pages/store";
import Goods from "./pages/goods";

export default function App() {
  let [zipCode, setZipCode] = useState(undefined);
  let [viewModal, setviewModal] = useState(false);
  let [editCode, setEditCode] = useState("");

  const ROUTES = [
    {
      element: <Home zipCode={zipCode} setviewModal={setviewModal} />,
      path: "/",
    },
    { element: <Stores />, path: "/stores" },
    { element: <Store />, path: "/store" },
    { element: <Goods />, path: "/goods" },
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
        <Header zipCode={zipCode} setviewModal={setviewModal} />
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
        <Footer></Footer>
        <Modal
          onDismiss={() => setviewModal(false)}
          animationType="fade"
          transparent={true}
          visible={viewModal}
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
                    setviewModal(false);
                  }}
                  className="py-2 px-5 bg-green-200 rounded-xl"
                >
                  <Text>Set</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setEditCode("");
                    setviewModal(false);
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
    </NativeRouter>
  );
}

function Header({ zipCode, setviewModal }) {
  return (
    <View
      className="bg-slate-100 flex flex-row justify-between py-2 px-5 shadow-lg items-center"
      style={{ marginTop: Constants.statusBarHeight }}
    >
      <Link to="/">
        <Text className="text-cgreen text-3xl font-bold">GrocerEZ</Text>
      </Link>
      <Icon name="menu" size={30} onPress={() => setviewModal(true)} />
    </View>
  );
}

function Footer() {
  return (
    <View className="flex flex-row justify-end bg-slate-100">
      <Text className="text-cwhite bg-cgreen px-5 py-5">Set Zip Code</Text>
    </View>
  );
}

const MENU = [
  { title: "Essential Goods", path: "/goods" },
  { title: "Local Stores", path: "/stores" },
  { title: "Recent Views", path: "/recentviews" },
];

function Home({ zipCode, setviewModal }) {
  return (
    <View>
      <View className="flex items-center">
        <Text className="mt-20 text-3xl font-bold text-cgreen">
          Groceries Made Easy
        </Text>
      </View>
      <View className="flex flex-row flex-wrap justify-evenly">
        {MENU.map((m) => (
          <Link
            key={m.title}
            to={m.path}
            className="w-2/5 rounded-xl py-10 flex justify-center items-center mt-20 bg-gray-100 shadow-lg"
          >
            <Text className="text-3xl font-bold text-center text-gray-600">
              {m.title}
            </Text>
          </Link>
        ))}
        {zipCode ? (
          <Link
            to="/store"
            className="w-2/5 rounded-xl py-10 flex justify-center items-center mt-20 bg-gray-100 shadow-lg"
          >
            <Text className="text-3xl font-bold text-center text-gray-600">
              Your Local Store
            </Text>
          </Link>
        ) : (
          <TouchableOpacity
            onPress={() => setviewModal(true)}
            className="w-2/5 rounded-xl py-10 flex justify-center items-center mt-20 bg-gray-100 shadow-lg"
          >
            <Text className="text-3xl font-bold text-center text-gray-600">
              Set Zip Code
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  Alert,
  StatusBar,
} from "react-native";
import { NativeRouter, Routes, Route, Link } from "react-router-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect, useCallback } from "react";
import { fdb } from "./fb";
import Icon from "react-native-vector-icons/Feather";
import SelectDropdown from "react-native-select-dropdown";

import Home from "./pages/home";
import RecentViews from "./pages/recent-views";
import Stores from "./pages/stores";
import Store from "./pages/store";
import Goods from "./pages/goods";
import Good from "./pages/good";
import AddItem from "./pages/add-item";

export default function App() {
  let [state, setState] = useState(undefined);
  let [title, setTitle] = useState("");

  const ROUTES = [
    {
      element: <Home state={state} setTitle={setTitle} />,
      path: "/",
    },
    { element: <Stores setTitle={setTitle} />, path: "/stores" },
    { element: <Store setTitle={setTitle} />, path: "/store/:id" },
    { element: <Goods setTitle={setTitle} />, path: "/goods" },
    { element: <Good setTitle={setTitle} />, path: `/good/:id` },
    { element: <RecentViews setTitle={setTitle} />, path: "/recentviews" },
    { element: <AddItem setTitle={setTitle} />, path: "/additem" },
  ];

  const getState = useCallback(async () => {
    const s = await AsyncStorage.getItem("state");
    if (s !== null) setState(JSON.parse(s));
  }, [setState]);

  useEffect(() => {
    if (state) AsyncStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    getState();
  }, []);

  return (
    <NativeRouter>
      <StatusBar hidden={false} backgroundColor="#06ac80" />
      <View className="h-full flex">
        <Header title={title} />
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
        <Footer state={state} setState={setState} />
      </View>
    </NativeRouter>
  );
}

const MENU = [
  { title: "Essential Goods", path: "/goods" },
  { title: "Local Stores", path: "/stores" },
  { title: "Recent Views", path: "/recentviews" },
  { title: "Add Item", path: "/additem" },
];

function Header({ title }) {
  let [menu, setMenu] = useState(false);

  return (
    <View className="bg-slate-100 flex flex-row justify-between py-2 px-5 shadow-lg items-center">
      <Link to="/" className="w-1/3">
        <Text className="text-cgreen text-xl font-bold">GrocerEZ</Text>
      </Link>
      <View className="w-1/3 flex justify-center items-center">
        <Text className="text-cdarkgray font-bold">{title}</Text>
      </View>
      <TouchableOpacity
        className="w-1/3 flex items-end"
        onPress={() => setMenu(true)}
      >
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

const STATES = [
  { ready: true, name: "CALIFORNIA", abbreviation: "CA" },
  { ready: false, name: "ALABAMA", abbreviation: "AL" },
  { ready: false, name: "ALASKA", abbreviation: "AK" },
  { ready: false, name: "AMERICAN SAMOA", abbreviation: "AS" },
  { ready: false, name: "ARIZONA", abbreviation: "AZ" },
  { ready: false, name: "ARKANSAS", abbreviation: "AR" },
  { ready: false, name: "COLORADO", abbreviation: "CO" },
  { ready: false, name: "CONNECTICUT", abbreviation: "CT" },
  { ready: false, name: "DELAWARE", abbreviation: "DE" },
  { ready: false, name: "DISTRICT OF COLUMBIA", abbreviation: "DC" },
  { ready: false, name: "FEDERATED STATES OF MICRONESIA", abbreviation: "FM" },
  { ready: false, name: "FLORIDA", abbreviation: "FL" },
  { ready: false, name: "GEORGIA", abbreviation: "GA" },
  { ready: false, name: "GUAM", abbreviation: "GU" },
  { ready: false, name: "HAWAII", abbreviation: "HI" },
  { ready: false, name: "IDAHO", abbreviation: "ID" },
  { ready: false, name: "ILLINOIS", abbreviation: "IL" },
  { ready: false, name: "INDIANA", abbreviation: "IN" },
  { ready: false, name: "IOWA", abbreviation: "IA" },
  { ready: false, name: "KANSAS", abbreviation: "KS" },
  { ready: false, name: "KENTUCKY", abbreviation: "KY" },
  { ready: false, name: "LOUISIANA", abbreviation: "LA" },
  { ready: false, name: "MAINE", abbreviation: "ME" },
  { ready: false, name: "MARSHALL ISLANDS", abbreviation: "MH" },
  { ready: false, name: "MARYLAND", abbreviation: "MD" },
  { ready: false, name: "MASSACHUSETTS", abbreviation: "MA" },
  { ready: false, name: "MICHIGAN", abbreviation: "MI" },
  { ready: false, name: "MINNESOTA", abbreviation: "MN" },
  { ready: false, name: "MISSISSIPPI", abbreviation: "MS" },
  { ready: false, name: "MISSOURI", abbreviation: "MO" },
  { ready: false, name: "MONTANA", abbreviation: "MT" },
  { ready: false, name: "NEBRASKA", abbreviation: "NE" },
  { ready: false, name: "NEVADA", abbreviation: "NV" },
  { ready: false, name: "NEW HAMPSHIRE", abbreviation: "NH" },
  { ready: false, name: "NEW JERSEY", abbreviation: "NJ" },
  { ready: false, name: "NEW MEXICO", abbreviation: "NM" },
  { ready: false, name: "NEW YORK", abbreviation: "NY" },
  { ready: false, name: "NORTH CAROLINA", abbreviation: "NC" },
  { ready: false, name: "NORTH DAKOTA", abbreviation: "ND" },
  { ready: false, name: "NORTHERN MARIANA ISLANDS", abbreviation: "MP" },
  { ready: false, name: "OHIO", abbreviation: "OH" },
  { ready: false, name: "OKLAHOMA", abbreviation: "OK" },
  { ready: false, name: "OREGON", abbreviation: "OR" },
  { ready: false, name: "PALAU", abbreviation: "PW" },
  { ready: false, name: "PENNSYLVANIA", abbreviation: "PA" },
  { ready: false, name: "PUERTO RICO", abbreviation: "PR" },
  { ready: false, name: "RHODE ISLAND", abbreviation: "RI" },
  { ready: false, name: "SOUTH CAROLINA", abbreviation: "SC" },
  { ready: false, name: "SOUTH DAKOTA", abbreviation: "SD" },
  { ready: false, name: "TENNESSEE", abbreviation: "TN" },
  { ready: false, name: "TEXAS", abbreviation: "TX" },
  { ready: false, name: "UTAH", abbreviation: "UT" },
  { ready: false, name: "VERMONT", abbreviation: "VT" },
  { ready: false, name: "VIRGIN ISLANDS", abbreviation: "VI" },
  { ready: false, name: "VIRGINIA", abbreviation: "VA" },
  { ready: false, name: "WASHINGTON", abbreviation: "WA" },
  { ready: false, name: "WEST VIRGINIA", abbreviation: "WV" },
  { ready: false, name: "WISCONSIN", abbreviation: "WI" },
  { ready: false, name: "WYOMING", abbreviation: "WY" },
];

function Footer({ state, setState }) {
  let [edit, setEdit] = useState(false);

  return (
    <View className="flex flex-row justify-end bg-slate-100">
      {state && (
        <View className="bg-cgreen flex-1 flex justify-center">
          <Text className="text-cwhite text-lg font-bold text-center">
            Your State: <Text className="text-yellow-300">{state.name}</Text>
          </Text>
        </View>
      )}
      <TouchableOpacity onPress={() => setEdit(true)}>
        <Text
          className={
            "text-cwhite px-5 py-5 font-bold " +
            (state ? "bg-cgray" : "bg-cgreen")
          }
        >
          Select State
        </Text>
      </TouchableOpacity>
      <Modal
        onDismiss={() => setEdit(false)}
        animationType="fade"
        transparent={true}
        visible={edit}
      >
        <View
          className="flex-1 flex items-center px-10"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.25)", paddingTop: "60%" }}
        >
          <View className="bg-white w-full rounded-xl p-5 flex items-center shadow-lg">
            <Text className="text-3xl text-cgreen mb-5">Select State</Text>
            <SelectDropdown
              data={STATES}
              defaultValue={state}
              defaultButtonText="Select State"
              onSelect={(selectedItem, index) => {
                if (selectedItem.ready) {
                  setState(selectedItem);
                  setEdit(false);
                } else {
                  Alert.alert(
                    "This State Is Not Ready Yet",
                    "Your state will be available soon!",
                    [
                      {
                        text: "Confirm",
                        onPress: () => console.log("confirmed"),
                        style: "cancel",
                      },
                    ]
                  );
                }
              }}
              buttonTextAfterSelection={(selectedItem, index) =>
                selectedItem.name + " (" + selectedItem.abbreviation + ")"
              }
              rowTextForSelection={(item, index) =>
                item.name + " (" + item.abbreviation + ")"
              }
              renderCustomizedRowChild={(item) => <RenderRow state={item} />}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

function RenderRow({ state }) {
  return (
    <View
      className={
        "px-2 w-full h-full flex justify-center" +
        (!state.ready ? " bg-gray-200 opacity-50" : "")
      }
    >
      <Text className="">
        {state.name}
        <Text className="font-bold">({state.abbreviation})</Text>
      </Text>
      {!state.ready && <Text>Available soon...</Text>}
    </View>
  );
}

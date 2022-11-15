import {
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-native";
import { fdb } from "../fb.js";
import { collection, getDocs } from "firebase/firestore";
import Icon from "react-native-vector-icons/Feather";

export default function Stores({ setTitle }) {
  let [stores, setStores] = useState([]);
  let [filtered, setFiltered] = useState([]);
  let [search, setSearch] = useState("");

  const loadStores = useCallback(async () => {
    let c = await collection(fdb, "stores");
    let ss = await getDocs(c);
    setStores(ss.docs);
    setFiltered(ss.docs);
  }, [setStores]);

  useEffect(() => {
    setTitle("Stores");
    loadStores();
  }, [loadStores]);

  function filterStores() {
    setFiltered(
      stores.filter((s) =>
        s.data().name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }

  return (
    <ScrollView>
      <View className="flex-1 flex flex-row flex-wrap justify-between p-5">
        <View className="w-full flex flex-row mb-5">
          <TextInput
            value={search}
            onChangeText={setSearch}
            className="border border-cgreen rounded-l-xl flex-1 px-5"
            placeholder="search stores..."
          />
          <TouchableOpacity
            onPress={filterStores}
            className="bg-cgreen rounded-r-xl p-3"
          >
            <Icon color="#FFF" name="search" size={24} />
          </TouchableOpacity>
        </View>
        {filtered.map((s, i) => (
          <Store key={s.id} s={s} />
        ))}
      </View>
    </ScrollView>
  );
}

function Store({ s }) {
  return (
    <View
      className="flex flex-col bg-slate-100 rounded-xl mb-5 px-2 py-5"
      style={{ width: "48%" }}
    >
      <Image
        className="h-16 rounded-xl"
        resizeMode="stretch"
        source={{ uri: s.data().img }}
      />
      <Text className="self-center text-cdarkgray font-bold text-lg">
        {s.data().name}
      </Text>
      <Text className="self-center text-cgray font-bold text-sm">
        {s.data().address}
      </Text>
      <Link
        to={`/store/${s.id}`}
        className="self-center bg-cgreen w-4/5 flex flex-row justify-center items-center py-2 rounded-xl mt-2"
      >
        <Text className="font-bold text-cwhite">View Store</Text>
      </Link>
    </View>
  );
}

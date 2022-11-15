import { View, ScrollView, Image, Text } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-native";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { fdb } from "../fb";

export default function Stores({ setTitle }) {
  const param = useParams();
  let [goods, setGoods] = useState([]);
  let [store, setStore] = useState(undefined);

  const loadGoods = useCallback(async () => {
    let q = await query(
      collection(fdb, "items"),
      where("store_id", "==", param.id)
    );
    let ss = await getDocs(q);
    setGoods(ss.docs);
    let d = await doc(collection(fdb, "stores"), param.id);
    ss = await getDoc(d);
    setStore(ss.data());
    setTitle(ss.data().name);
  }, [setGoods]);

  useEffect(() => {
    setTitle("");
    loadGoods();
  }, [loadGoods]);

  return (
    <ScrollView>
      <View className="flex-1 flex flex-row flex-wrap justify-between p-5">
        {store && (
          <View className="w-full bg-slate-100 rounded-xl p-5 flex flex-row mb-5">
            <Image
              resizeMode="stretch"
              className="w-1/2"
              source={{ uri: store.img }}
            />
            <View className="w-1/2 px-5">
              <Text className="text-2xl font-bold">{store.name}</Text>
              <Text className="font-bold text-cgray">{store.address}</Text>
            </View>
          </View>
        )}
        {goods.map((g, i) => (
          <Good key={i} g={g.data()} />
        ))}
      </View>
    </ScrollView>
  );
}

function Good({ g }) {
  return (
    <View
      className="flex flex-col bg-slate-100 rounded-xl mb-5 pb-5"
      style={{ width: "48%" }}
    >
      <Image
        className="h-32 rounded-xl"
        resizeMode="stretch"
        source={{ uri: g.img }}
      />
      <Text className="text-cdarkgray font-bold text-lg ml-5">{g.product}</Text>
      <Text className="text-cgray font-bold ml-5">
        ${g.price}/{g.unit}
      </Text>
    </View>
  );
}

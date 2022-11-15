import { View, Text, Image, ScrollView } from "react-native";
import { Link, useParams } from "react-router-native";
import { useCallback, useState, useEffect } from "react";
import { fdb } from "../fb";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function Good() {
  const params = useParams();
  let [stores, setStores] = useState([]);

  const loadStores = useCallback(async () => {
    if (!params) return;
    let q = await query(
      collection(fdb, "items"),
      where("product", "==", params.id)
    );
    let ss = await getDocs(q);
    setStores(ss.docs);
  }, [params]);

  useEffect(() => {
    loadStores();
  }, [loadStores]);

  return (
    <ScrollView>
      <View className="flex-1 p-5">
        <Text className="text-2xl font-bold text-center">{params.id}</Text>
        {stores.map((s, i) => (
          <Store key={i} s={s.data()} />
        ))}
      </View>
    </ScrollView>
  );
}

function Store({ s }) {
  console.log(s);
  return (
    <View className="w-full bg-slate-100 rounded-xl mt-4 flex flex-row items-center">
      <Link
        to={`/store/${s.store_id}`}
        className="bg-cgreen py-5 px-5 rounded-xl"
      >
        <Text className="text-cwhite font-bold">View Store</Text>
      </Link>
      <Text className="text-lg font-bold text-cdarkgray w-2/5 pl-5">
        {s.store_name}
      </Text>
      <Text className="text-sm font-bold text-cgray w-2/5">
        ${s.price}/{s.unit}
      </Text>
    </View>
  );
}

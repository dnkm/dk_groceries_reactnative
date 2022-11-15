import { View, Text, Image, ScrollView } from "react-native";
import { Link } from "react-router-native";
import { useCallback, useState, useEffect } from "react";
import { fdb } from "../fb";
import { collection, getDocs } from "firebase/firestore";

export default function Goods() {
  let [goods, setGoods] = useState([]);

  const loadGoods = useCallback(async () => {
    let c = await collection(fdb, "products");
    let ss = await getDocs(c);
    setGoods(ss.docs);
  }, [setGoods]);

  useEffect(() => {
    loadGoods();
  }, [loadGoods]);

  return (
    <ScrollView>
      <View className="flex-1 flex flex-row flex-wrap justify-between p-5">
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
        resizeMode="cover"
        source={{ uri: g.img }}
      />
      <Text className="text-cgray font-bold text-lg ml-5">{g.product}</Text>
      <Link
        to={`/good/${g.product}`}
        className="self-center bg-cgreen w-4/5 flex flex-row justify-center items-center py-2 rounded-xl"
      >
        <Text className="font-bold text-cwhite">Search Stores</Text>
      </Link>
    </View>
  );
}

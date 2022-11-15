import { ScrollView, View, Text, Image } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { fdb } from "../fb";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-native";

export default function RecentViews({ setTitle }) {
  let [goods, setGoods] = useState([]);
  let [times, setTimes] = useState([]);

  const loadGoods = useCallback(async () => {
    let c = await collection(fdb, "products");
    let ss = await getDocs(c);
    setGoods(shuffleGoods(ss.docs));
    randomTimes(ss.docs.length);
  }, [setGoods]);

  useEffect(() => {
    setTitle("Recent Views");
    loadGoods();
  }, [loadGoods]);

  function shuffleGoods(g) {
    let t = [...g];
    for (let i = 0; i < 1000; i++) {
      let r = Math.floor(Math.random() * g.length);
      let temp = t[0];
      t[0] = t[r];
      t[r] = temp;
    }
    return t;
  }

  function randomTimes(length) {
    let r = [];
    for (let i = 0; i < length; i++)
      r.push(Math.floor(Math.random() * 100 + 1));
    r = r.sort();
    r = r.map((r) =>
      r <= 30
        ? r === 1
          ? r + " day ago"
          : r + " days ago"
        : Math.floor(r / 30) === 1
        ? Math.floor(r / 30) + " month ago"
        : Math.floor(r / 30) + " months ago"
    );
    console.log(r);
    setTimes(r);
  }

  return (
    <ScrollView>
      <View className="flex-1 p-5">
        {goods.map((g, i) => (
          <Good key={i} g={g.data()} time={times[i]} />
        ))}
      </View>
    </ScrollView>
  );
}

function Good({ g, time }) {
  return (
    <View className="w-full bg-slate-100 rounded-xl mt-4 flex flex-row items-center">
      <Link to={`/good/${g.product}`} className="h-16 w-2/5">
        <Image className="h-16 rounded-xl" source={{ uri: g.img }} />
      </Link>
      <Text className="text-sm font-bold text-cdarkgraypl-5 w-1/3 pl-5">
        {g.product}
      </Text>
      <Text className="text-sm font-bold text-cgray">{time} </Text>
    </View>
  );
}

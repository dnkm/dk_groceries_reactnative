import { View, Text, Image } from "react-native";
import { Link } from "react-router-native";

const POPULAR_GOODS = [
  { name: "Tomato", color: "border-red-500" },
  { name: "Bananas", color: "border-yellow-500" },
  { name: "Spinach", color: "border-cgreen" },
  { name: "Cherries", color: "border-red-500" },
  { name: "Asparagus", color: "border-cgreen" },
];

export default function Home({ zipCode }) {
  return (
    <View className="flex-1 flex items-center">
      <Text className="mt-10 text-3xl font-bold text-cgreen">
        Groceries Made Easy
      </Text>
      <View className="bg-slate-100 w-4/5 py-5 px-10 mt-10 rounded-xl flex">
        <Text className="text-2xl font-bold self-center">Popular Goods</Text>
        {POPULAR_GOODS.map((p) => (
          <View
            key={p.name}
            className="flex flex-row space-x-2 items-center mt-2"
          >
            <View className={"rounded-full border-8 p-2 " + p.color}></View>
            <Text className="font-bold text-lg text-cgray">{p.name}</Text>
          </View>
        ))}
      </View>
      {zipCode && (
        <View className="bg-slate-100 w-4/5 py-5 px-10 mt-10 rounded-xl flex">
          <Text className="text-2xl font-bold self-center">
            Your Local Store
          </Text>
          <Image
            className="h-16 my-2"
            resizeMode="cover"
            source={{ uri: "https://i.imgur.com/eXGfOCd.png" }}
          />
          <Text className="text-2xl font-bold self-center">Albertsons</Text>
          <Text className="font-bold text-cgray self-center">
            14201 Jeffrey Rd
          </Text>
          <Link className="mt-2 w-full bg-cgreen flex flex-row justify-center py-2 rounded-xl">
            <Text className="text-cwhite font-bold">View Store</Text>
          </Link>
        </View>
      )}
    </View>
  );
}

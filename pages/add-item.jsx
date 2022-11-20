import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import SelectDropdown from "react-native-select-dropdown";

export default function AddItem({ setTitle }) {
  let [item, setItem] = useState(undefined);

  useEffect(() => {
    setTitle("Add Item");
  }, []);

  return (
    <View className="flex-1 p-5 flex items-center">
      <View className="w-4/5 flex items-center space-y-5">
        <TouchableOpacity
          onPress={() => setItem(1)}
          className="bg-cgreen w-full"
        >
          <Text className="font-bold text-white text-2xl text-center px-5 py-2">
            Add Store Listing
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setItem(2)}
          className="bg-cgreen w-full"
        >
          <Text className="font-bold text-white text-2xl text-center px-5 py-2">
            Add Product
          </Text>
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView>
        <Modal
          onDismiss={() => setItem(false)}
          animationType="fade"
          transparent={true}
          visible={item !== undefined}
        >
          <View
            className="flex-1 flex items-center px-10"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.25)",
              paddingTop: "20%",
            }}
          >
            {item === 1 && <StoreListing setItem={setItem} />}
            {item === 2 && <Product setItem={setItem} />}
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </View>
  );
}

const PRODUCTS = [
  "Asparagus",
  "Bananas",
  "Blueberries",
  "Broccoli",
  "Cauliflower",
  "Cherries",
  "Lettuce",
  "Spinach",
  "Strawberries",
  "Tomato",
];

const STORES = [
  { name: "Albertson's", address: "14201 Jeffrey Rd" },
  { name: "Amazon Fresh", address: "13672 Jamboree Rd" },
  { name: "Ralphs", address: "14400 Culver Dr" },
  { name: "Target", address: "3750 Barranca Pkwy" },
  { name: "Trader Joe's", address: "14443 Culver Dr" },
];

function StoreListing({ setItem }) {
  let [product, setProduct] = useState("");
  let [price, setPrice] = useState("");
  let [unit, setUnit] = useState("");
  let [store, setStore] = useState("");

  async function submitListing() {
    Alert.alert(
      "Are you sure?",
      "You are submitting " +
        `${product} priced at ${price}/${unit} to ${store.name}.`,
      [
        {
          text: "Confirm",
          onPress: () =>
            Alert.alert(
              "Thank you for your submission!",
              "We will process your listing and post it once verified.",
              [
                {
                  text: "Confirm",
                  onPress: () => setItem(undefined),
                  style: "cancel",
                },
              ]
            ),
          style: "default",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  }

  return (
    <View className="bg-white w-full rounded-xl p-5 flex items-center shadow-lg">
      <Text className="text-cgreen font-bold text-3xl">Store Listing</Text>
      <View className="mt-5 w-full">
        <SelectDropdown
          data={PRODUCTS}
          buttonStyle={{ width: "100%" }}
          defaultButtonText="Product"
          onSelect={(selectedItem, index) => {
            setProduct(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => selectedItem}
          rowTextForSelection={(item, index) => item}
        />
      </View>
      <View className="mt-5 w-full">
        <SelectDropdown
          style={{ width: "100%" }}
          buttonStyle={{ width: "100%" }}
          data={STORES}
          defaultButtonText="Store"
          onSelect={(selectedItem, index) => {
            setStore(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => selectedItem.name}
          rowTextForSelection={(item, index) => item.name + "-" + item.address}
          renderCustomizedRowChild={(item, index) => (
            <RenderRow name={item.name} address={item.address} />
          )}
        />
      </View>
      <View className="w-full flex flex-row mt-5">
        <TextInput
          keyboardType="numeric"
          placeholder="price"
          value={price}
          onChangeText={setPrice}
          className="bg-gray-100 rounded-l w-1/2 border-r border-cwhite p-2"
        ></TextInput>
        <TextInput
          placeholder="unit"
          value={unit}
          onChangeText={setUnit}
          className="bg-gray-100 rounded-r w-1/2 border-l border-cwhite p-2"
        ></TextInput>
      </View>
      <View className="flex flex-row mt-5">
        <View className="w-1/2 flex items-end">
          <TouchableOpacity
            className="bg-cgreen px-5 py-2 border-r border-cwhite"
            onPress={submitListing}
          >
            <Text className="font-bold text-xl text-white">Submit</Text>
          </TouchableOpacity>
        </View>
        <View className="w-1/2 flex items-start">
          <TouchableOpacity
            className="bg-red-500 px-5 py-2 border-l border-cwhite"
            onPress={() => setItem(undefined)}
          >
            <Text className="font-bold text-xl text-white">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function RenderRow({ name, address }) {
  return (
    <View className="w-full px-2">
      <Text className="text-xl">{name}</Text>
      <Text>{address}</Text>
    </View>
  );
}

function Product({ setItem }) {
  let [product, setProduct] = useState("");

  async function submitProduct() {
    Alert.alert("Are you sure?", "You are submitting: " + product, [
      {
        text: "Confirm",
        onPress: () =>
          Alert.alert(
            "Thank you for your submission!",
            "We will check your request and add it once verified.",
            [
              {
                text: "Confirm",
                onPress: () => setItem(undefined),
                style: "cancel",
              },
            ]
          ),
        style: "default",
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  }

  return (
    <View className="bg-white w-full rounded-xl p-5 flex items-center shadow-lg">
      <Text className="text-cgreen font-bold text-3xl">Request Product</Text>
      <View className="w-4/5 flex items-center border-b pb-2">
        <Text className="text-lg">Can't find a product? </Text>
        <Text className="text-sm text-center text-cgray">
          Request the product here and we will add it to our list of products
        </Text>
      </View>
      <ScrollView className="w-4/5 h-32 border-b py-2">
        {product === "" && (
          <View className="w-full">
            <Text className="text-center">
              Matching Products Will Show Here
            </Text>
          </View>
        )}
        {PRODUCTS.filter(
          (p, i) =>
            product !== "" && p.toLowerCase().includes(product.toLowerCase())
        ).map((v) => (
          <View key={v} className="w-full">
            <Text className="text-center">{v}</Text>
          </View>
        ))}
      </ScrollView>
      <TextInput
        value={product}
        onChangeText={setProduct}
        placeholder="product"
        className="bg-gray-100 rounded-r w-1/2 border-l border-cwhite p-2 mt-5"
      ></TextInput>
      <View className="flex flex-row mt-5">
        <View className="w-1/2 flex items-end">
          <TouchableOpacity
            className="bg-cgreen px-5 py-2 border-r border-cwhite"
            onPress={submitProduct}
          >
            <Text className="font-bold text-xl text-white">Submit</Text>
          </TouchableOpacity>
        </View>
        <View className="w-1/2 flex items-start">
          <TouchableOpacity
            className="bg-red-500 px-5 py-2 border-l border-cwhite"
            onPress={() => setItem(undefined)}
          >
            <Text className="font-bold text-xl text-white">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

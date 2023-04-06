import React, { useRef, useState } from "react";
import {
  FlatList, Image,
  SafeAreaView,
  StyleSheet, View,
  Dimensions, TouchableOpacity,
} from "react-native";

const IMG_WIDTH = Dimensions.get("window").width;
const IMG_HEIGHT = Dimensions.get("window").height;
const IMAGES_SIZE = 100;
const SPACING = 20;

const images = [
  "https://images6.alphacoders.com/111/thumb-1920-1114513.jpg",
  "https://mobimg.b-cdn.net/v3/fetch/52/52145e5c2a2f192748e3c3b773a37251.jpeg",
  "https://thypix.com/wp-content/uploads/2018/05/Sommerlandschaft-Bilder-7.jpg",
  "https://image.winudf.com/v2/image/bWUud2FsbHBhcGEubmF0dXJlX3NjcmVlbl8xXzE1MzIzNzgxNThfMDE3/screen-1.jpg?fakeurl=1&type=.jpg",
  "https://w-dog.ru/wallpapers/9/14/558562629262098/norvegiya-lofoten-gory-voda-mostik-lodka-korabl.jpg",
  "https://cultmall.com.ua/image/catalog/diy/tn1095.jpg",
  'https://i.pinimg.com/originals/99/f4/99/99f499cbb56bfb802cfee5a95e6e6bf5.jpg',
  'https://cdn1.ozone.ru/s3/multimedia-v/6297302683.jpg'
];

const App = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const topRef = useRef();
  const thumbRef = useRef();
  const getActiveIndexScroll = (index) => {
    setActiveIndex(index);
    topRef?.current?.scrollToOffset({
      offset: index * IMG_WIDTH,
      animated: true,
    });
    thumbRef?.current?.scrollToOffset({
      offset: index * (IMAGES_SIZE + SPACING) - IMG_WIDTH / 2 + IMAGES_SIZE / 2,
      animated: true,
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={topRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={ev => {
          getActiveIndexScroll(Math.ceil(ev.nativeEvent.contentOffset.x / IMG_WIDTH));
        }}
        data={images}
        renderItem={({ item, index }) =>
          <Image source={{ uri: item }} style={styles.images} />
        }
        keyExtractor={(_, index) => index} />
      <View style={styles.bottom_images_block}>
        <FlatList
          ref={thumbRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={images}
          renderItem={({ item, index }) =>
            <TouchableOpacity onPress={() => getActiveIndexScroll(index)}>
              <Image source={{ uri: item }} style={[styles.btn_img, {
                borderWidth: 2,
                borderColor: activeIndex === index ? "#fff" : null,
              }]} />
            </TouchableOpacity>
          }
          keyExtractor={(_, index) => index} />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",

  },
  images: {
    width: IMG_WIDTH,
    height: IMG_HEIGHT,
    resizeMode: "cover",

  },
  bottom_images_block: {
    position: "absolute",
    paddingLeft: 15,
    left: 0,
    bottom: 15,
  },
  btn_img: {
    width: IMAGES_SIZE,
    height: IMAGES_SIZE,
    resizeMode: "cover",
    marginRight: SPACING,
    borderRadius: 10,
  },
});
export default App;

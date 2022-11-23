import React, { Component } from "react";
import { Text, View, Image, Dimensions, StyleSheet, ImageBackground } from "react-native";
import { Grid, Col, Row } from "react-native-easy-grid";
import { magnetometer, SensorTypes, setUpdateIntervalForType } from "react-native-sensors";
import LPF from "lpf";
import AnimatedLinearGradient from 'react-native-animated-linear-gradient'
import Footer from "./Footer";
import HeaderTop from "./Header";
import { AsyncStorage } from 'react-native';
import i18n from "../i18n";
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Animated: `useNativeDriver`']);

const { height, width } = Dimensions.get("window");
const presetColors = {
  instagram: [
    '#D7AD00',
    '#549871',
    '#DF5655',
    '#5D66A3',
  ],
};
export default class Compass extends Component {
  constructor() {
    super();
    this.state = {
      magnetometer: "0",
      city: "Dubai",
      qiblah_img: require("../assets/compass_y.png"),
      qiblah_img_c: 1,
    };
    LPF.init([]);
    LPF.smoothing = 0.2;
    // Run f1 every 500ms ?

  }

  componentDidMount() {
    this._toggle();
    this.getCity();
    setInterval(() => {
      this.changeBg()
    }, 3000);
  }
  getCity = async () => {
    let lang = await AsyncStorage.getItem("@moqc:location");
    this.setState({ city: lang });
  }
  componentWillUnmount() {
    this._unsubscribe();
  }

  _toggle = () => {
    if (this._subscription) {
      this._unsubscribe();
    } else {
      this._subscribe();
    }
  };


  changeBg = () => {
    // console.log("TIMER")

    // console.log(this.state.qiblah_img_c)

    if (this.state.qiblah_img_c == '1') {

      this.setState({
        qiblah_img: require("../assets/compass_g.png"),
        qiblah_img_c: 2,
      })
    }
    if (this.state.qiblah_img_c == 2) {
      this.setState({
        qiblah_img: require("../assets/compass_r.png"),
        qiblah_img_c: 3,
      })
    }
    if (this.state.qiblah_img_c == 3) {
      this.setState({
        qiblah_img: require("../assets/compass_b.png"),
        qiblah_img_c: 4,
      })
    }
    if (this.state.qiblah_img_c == 4) {
      this.setState({
        qiblah_img: require("../assets/compass_y.png"),
        qiblah_img_c: 1,
      })
    }
  }
  _subscribe = async () => {
    setUpdateIntervalForType(SensorTypes.magnetometer, 16);
    this._subscription = magnetometer.subscribe(
      sensorData => this.setState({ magnetometer: this._angle(sensorData) }),
      error => console.log("Gyro sensor is not available"),
    );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.unsubscribe();
    this._subscription = null;
  };

  _angle = magnetometer => {
    let angle = 0;
    if (magnetometer) {
      let { x, y } = magnetometer;
      if (Math.atan2(y, x) >= 0) {
        angle = Math.atan2(y, x) * (180 / Math.PI);
      } else {
        angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
      }
    }
    return Math.round(LPF.next(angle));
  };

  _direction = degree => {
    if (degree >= 22.5 && degree < 67.5) {
      return "NE";
    } else if (degree >= 67.5 && degree < 112.5) {
      return "E";
    } else if (degree >= 112.5 && degree < 157.5) {
      return "SE";
    } else if (degree >= 157.5 && degree < 202.5) {
      return "S";
    } else if (degree >= 202.5 && degree < 247.5) {
      return "SW";
    } else if (degree >= 247.5 && degree < 292.5) {
      return "W";
    } else if (degree >= 292.5 && degree < 337.5) {
      return "NW";
    } else {
      return "N";
    }
  };

  // Match the device top with pointer 0° degree. (By default 0° starts from the right of the device.)
  _degree = magnetometer => {
    return magnetometer - 90 >= 0
      ? magnetometer - 90
      : magnetometer + 271;
  };

  render() {
    // console.log(this.state.qiblah_img)
    return (
      <View style={{ flex: 10, backgroundColor: "white" }}>
        <HeaderTop pagename={i18n.t("Qiblah")} navigation={this.props.navigation} back={false} />



        <View style={{ flex: 1 }}>
          <AnimatedLinearGradient customColors={presetColors.instagram} speed={1000}
          useN>
            <ImageBackground
              source={require("../assets/qiblah.png")}
              style={{
                height: '100%',
                resizeMode: "cover",
              }}>
              <View style={{ flex: 10 }}>

                <View style={{ backgroundColor: "transparent", justifyContent: "center", alignContent: "center", marginTop: 65 }}>
                  <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20, color: "white" }} >{i18n.t('QIBLAH DIRECTION')}</Text>
                </View>
                <View style={{ flex: 1.5, backgroundColor: "orange", backgroundColor: "trnsparent", justifyContent: "center", alignContent: "center", flexDirection: "row" }}>
                  <View
                    style={{ backgroundColor: "white", marginTop: 20, width: 220, height: 55, borderRadius: 10, flexDirection: "row", justifyContent: "center", alignContent: "center", alignItems: "center" }}
                  >
                    <Image
                      onPress={() => this.setState({ user: 1 })}
                      source={this.state.qiblah_img}
                      style={{
                        height: 65,
                        width: 60,
                        marginTop: -15,
                        resizeMode: "cover"
                      }} />
                    <Text style={{ fontWeight: '500', fontSize: 22, textTransform: 'uppercase' }}>{this.state.city}</Text>
                  </View>
                </View>
                <View style={{ flex: 5, backgroundColor: "transparent", alignContent: "center", justifyContent: "center", alignItems: "center" }}>
                  <Image
                    source={require("../assets/needle.png")}
                    style={{
                      height: width - 100,
                      justifyContent: "center",
                      alignItems: "center",
                      resizeMode: "contain",
                      transform: [
                        { rotate: 360 - this.state.magnetometer + "deg" },
                      ],
                    }}
                  />
                </View>
                <View style={{ flex: 2, justifyContent: "center", alignItems: "center", alignContent: "center" }}>
                  <Text style={{ fontWeight: "bold", color: "white", fontSize: 24 }}>{360 - this.state.magnetometer}°</Text>

                </View>


              </View>
            </ImageBackground>

          </AnimatedLinearGradient>
        </View>
        {/* <Footer location={"qiblah"} navigation={this.props.navigation}/> */}
      </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 200,
    width: 350,
  },
})
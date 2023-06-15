import React, { Component } from "react";
import { View,
  Text,
  StyleSheet,
  Alert,
  Image,
  ImageBackground, } from "react-native";
import { Card, Icon } from "react-native-elements";
import axios from "axios";

export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      imagePath: "",
      url: `https://2645-106-214-190-252.ngrok.io/stars?name=${this.props.navigation.getParam("stars_name")}`
    };
  }

  componentDidMount() {
      //call getDetails function here so that the data is fetched as soon as the screen is mounted
      this.getDetails();
    }
  getDetails = () => {
    //write the codee to fetch the specific planet's data from the API
    axios.get(this.state.url).then((response)=>{
      this.setState({details:response.data.data})
    }).catch((error)=>{
      console.log(error)
    })
  };
  /*this function will determine the imagePath state depending on the planetType*/
  setDetails = (starDetails) => {
    const starType = starDetails.star_type;
    let imagePath = "";
    switch (starType) {
      case "Gas Giant":
        imagePath = require("../assets/Gas_Giant.png");
        break;
      case "Terrestrial":
        imagePath = require("../assets/Terrestrial.png");
        break;
      case "Super Earth":
        imagePath = require("../assets/Super_Earth.png");
        break;
      case "Neptune Like":
        imagePath = require("../assets/Neptune-like.png");
        break;
      default:
        imagePath = require("../assets/Gas_Giant.png");
    }

  this.setState({
    details: starDetails,
    imagePath: imagePath,
  });
};
  render() {
    if(this.state.details.specifications){
      return(
        <ImageBackground source={require("../assets/bg.png")} style={{ flex: 1, paddingTop: 20 }}>
          <Image source={this.state.imagePath} style={{
                height: 250,
                width: 250,
                marginTop: 50,
                alignSelf: "center",
              }}
            />
            <View style={{ marginTop: 50 }}>
            <Text style={styles.planetName}>{this.state.details.name}</Text>
            <View style={{ alignSelf: "center" }}>
            <Text
                  style={styles.starData}
                > {`Distance from earth: ${this.state.details.distance_from_earth}`}</Text>
                <Text
                  style={styles.starData}
                >{`Distance from Sun : ${this.state.details.distance_from_their_sun}`}</Text>
                <Text
                  style={styles.starData}
                >{`Gravity : ${this.state.details.gravity}`}</Text>
                <Text
                  style={styles.starData}
                >{`Orbital Period : ${this.state.details.orbital_period}`}</Text>
                <Text
                  style={styles.starData}
                >{`Orbital Speed : ${this.state.details.orbital_speed.toFixed(8)}`}</Text>
                <Text
                  style={styles.starData}
                >{`Star Mass : ${this.state.details.star_mass}`}</Text>
                <Text
                  style={styles.starData}
                >{`Star Radius : ${this.state.details.star_radius}`}</Text>
                <Text
                  style={styles.starData}
                >{`Star Type : ${this.state.details.star_type}`}</Text>
               <View style={{ flexDirection: "row",alignSelf:"center" }}>
                <Text style={styles.planetData}>
                  {this.state.details.specifications ? `Specifications: ` : ""}
                </Text>
                {this.state.details.specifications.map((item,index)=>{
                    <Text key={index.toString()} style={styles.starData}>{item}</Text>
                })}
               </View>
            </View>
            
            </View>
        </ImageBackground>
      )
    }
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardItem: {
    marginBottom: 10
  },
  planetName: {
    fontSize: 45,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
    width: "80%",
    alignSelf: "center",
    fontFamily:"monospace"
  },
  planetData: {
    fontSize: 15,
    color: "white",
    textAlign:"center",
    fontFamily:"monospace"
  },
});

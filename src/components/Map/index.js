import React, { Component } from "react";
import { connect } from "react-redux";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import { fetchItems } from "../../store/actions/aircraftActions";
import L from "leaflet";
import airplane from "../assets/airplane.png";

var icons = L.icon({
  iconUrl: airplane,
  iconSize: [24, 24],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76]
});

export class index extends Component {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
    markers: []
  };

  setMap = () => {
    let map = L.map("map").setView([47.361181, 8.5742363], 8);
    L.tileLayer(
      "https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=rHaACyLnRP8c24uMfwUK",
      {
        attribution:
          '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      }
    ).addTo(map);
    setInterval(() => {
      let { states } = this.props.posts;
      let arr = [];
      let mark = [];
      if (states !== undefined) {
        if (this.state.markers.length > 0) {
          mark = this.state.markers;
          mark.map(item => {
            try {
              return map.removeLayer(item);
            } catch (error) {
              console.log("Could not delete Marker. Error: " + error);
              return "Could not delete Marker. Error: " + error;
            }
          });
        }
        states.map((item, key) => {
          key = L.marker([item[6], item[5]], { icon: icons }) // .bindPopup()
            .addTo(map);
          arr.push(key);
          return key;
        });
        this.setState({ markers: arr });
      }
    });
  };

  componentWillMount() {
    this.props.fetchItems();
  }
  componentDidMount() {
    this.setMap();
  }
  render() {
    let { time } = this.props.posts;
    return (
      <div style={{ padding: "1%" }}>
        <div style={{ textAlign: "center", marginTop: "1%" }}>
          <h2>{time === undefined ? "Yükleniyor..." : "TIME: " + time}</h2>
        </div>
        <div
          style={{
            textAlign: "left",
            marginTop: "-40px",
            float: "left",
            textDecoration: "none"
          }}
        >
          <Link style={{}} to="/">
            <button
              style={{
                borderTopLeftRadius: "25px",
                borderBottomLeftRadius: "25px",
                textDecoration: "none",
                outline: "none"
              }}
            >
              Tablo Görünümüne Geç
            </button>
          </Link>
        </div>
        <div
          style={{ height: "86vh", marginTop: "1%", borderRadius: "20px" }}
          id="map"
        ></div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  posts: state.posts.items
});

export default connect(
  mapStateToProps,
  { fetchItems }
)(index);

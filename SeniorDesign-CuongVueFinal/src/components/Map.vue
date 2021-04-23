<template>
  <l-map
    ref="map"
    style="z-index: 0; height: 100%; width: 100%"
    :zoom="zoom"
    :center="center"
    @update:zoom="zoomUpdated"
    @update:center="centerUpdated"
    @update:bounds="boundsUpdated"
  >
    <l-tile-layer :url="tileLayerUrl"></l-tile-layer>
    <l-geo-json :geojson="geojson" :options="options" ></l-geo-json>
  </l-map>
</template>

<script>
import { LMap, LTileLayer, LGeoJson } from "vue2-leaflet";
import { mapState } from "vuex";
// import test1 from "./usa.json";
// import axios from 'axios';
// import data2 from "../USA/TX.geo.json";
// import test1 from "./test.json";
import API from "../API";
// const sss = () => {
//     // let data ;
//     const url = 'https://raw.githubusercontent.com/BiKunTin/datastore/main/usa.json';
//     const res = [];
//     axios.get(url).then(resp => {
//             const data = resp.data.features;
//             data.map(item => {
//                 const obj = {};
//                 Object.keys(item).map(key => {
//                     if (key !== 'geometry') {
//                         obj[key] = item[key];
//                     }
//                     return [];
//                 })
//                 res.push(obj);
//                 return [];
//             });
//         })
//         .catch(err => console.log(err));

//     console.log(res);
//     return res;
// };
export default {
  name: "Map",
  props: ["data"],
  data: () => ({
    url:
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    id: "mapbox/light-v10",
    accessToken:
      "pk.eyJ1IjoiY3Vvbmd0Y3UiLCJhIjoiY2tsbWw5aWh5MGE3YzJubzhrNXZjcDljZyJ9.FtSgLpflpNxcdYKlZwFrNg",
    maxZoom: 18,
    zoom: 4,
    minZoom: 3,
    center: [35.000074, 104.999927],
    curr: [35.000074, 104.999927],
    bounds: null,
    geojson: null,
  }),
   async created () {

    const response = await fetch('https://raw.githubusercontent.com/BiKunTin/datastore/main/usa.json');
    this.geojson = await response.json();
  },
  computed: {
    ...mapState(["isDarkTheme"]),
    tileLayerUrl() {
      const darkTheme = "https://{s}.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}.png";
      const lightTheme = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png";
      return this.isDarkTheme ? darkTheme : lightTheme;
    },
    options() {
      return {
        onEachFeature: this.onEachFeatureFunction
      };
    },
    onEachFeatureFunction() {
      return (feature, layer) => {
      if (feature.properties && feature.properties.name) {
        layer.bindPopup(`State: ${  feature.properties.name  }<br/>` +
                        `Total Cases: ${  feature.properties.cases  }<br/>` +
                        `Total Deaths: ${  feature.properties.deaths  }<br/>`+
                        `Confirmed Cases: ${  feature.properties.confirmed_cases  }<br/>`+
                        `Confirmed Death: ${  feature.properties.confirmed_deaths  }<br/>`);
        // this.map.doubleClickZoom.disable(); 
        layer.on('mouseout', () => { layer.closePopup(); });
        layer.on('click', () => {
          // this.geojson= data2;
          // this.createdstate(); 
          // const data1 = 
          // const res ={};
          // API.sk(API.sss);
          API.sss();
          setTimeout(() => {console.log('done');}, 2000);
          // API.converts(data1, test1);
          this.jumpto(layer.getBounds());
          });
        layer.on('mouseover', () => { layer.openPopup(); });
        layer.on('contextmenu', () => {
          // this.created();
          // this.geojson= data1;
          // this.geojson= API.getUS();
          this.centerUpdated(this.curr);
          this.zoomUpdated(4);
          });
      }
      };
    }
  },
  mounted() {
    this.getUserLocation();
  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
    boundsUpdated(bounds) {
      this.bounds = bounds;
    },
    jumpto(x)
    {
      this.$refs.map.fitBounds(x);
    },
    flyTo(lat, lon) {
      this.$refs.map.mapObject.flyTo([lat, lon]);
    },
    scale(d) {
      const min = 1;
      const factor = 5;
      const zoomFactor = this.zoom >= 5 ? 1 : this.zoom / 10; // adjust divisor for best optics
      return Math.floor(Math.log(d) * factor * zoomFactor) + min;
    },
    getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          this.flyTo(coords.latitude, coords.longitude);
          this.curr=[coords.latitude, coords.longitude];
        });
      }
    },
  },
  components: {
    LMap,
    LTileLayer,
    // LCircleMarker,
    LGeoJson,
    // API
  },
};
</script>

import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: [125.80954336542787, 7.453918732409208],
    zoom: 4
  })
});

console.log(map); // Use the map variable to avoid the compile error

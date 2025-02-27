import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import Link from 'ol/interaction/Link';
import DragAndDrop from 'ol/interaction/DragAndDrop';
import Modify from 'ol/interaction/Modify';
import Draw from 'ol/interaction/Draw';
import Snap from 'ol/interaction/Snap';
import {Style, Fill, Stroke} from 'ol/style';
import colormap from 'colormap';
import {getArea} from 'ol/sphere';

// assign to a variable named `map` for later use
const map = new Map({
  target: 'map-container',
  // layers: [
  //   new VectorLayer({
  //     source: new VectorSource({
  //       format: new GeoJSON(),
  //       url: './data/countries.json',
  //     }),
  //   }),
  // ],
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});


map.addInteraction(new Link());

const source = new VectorSource();
//vector 

// //static styling
// const layer = new VectorLayer({
//   source: source,
//   style: new Style ({
//     fill: new Fill({
//       color: 'red',
//     }),
//     stroke: new Stroke({
//       color: 'white',
//     }),
//   }),
// });

//dynamic sttyuling
const layer = new VectorLayer({
  source: source,
  style: function (feature) {
    return new Style ({
      fill: new Fill({
        color: getColor(feature),
    }),
    stroke: new Stroke({
      color: 'rgba(255,255,255,0.8)',
    }),
    });
  },
});


// const layer = new VectorLayer({
//   source: source,
//   style: function (feature, resolution) {
//     const name = feature.get('name').toUpperCase();
//     return name < 'N' ? style1 : style2;
//   },
// });


map.addLayer(layer);

map.addInteraction(
  new DragAndDrop({
    source: source,
    formatConstructors: [GeoJSON],
  }),
);

//modify
map.addInteraction(
  new Modify({
    source: source,
  }),
);

////draw
// map.addInteraction(
//   new Draw({
//     type: 'Polygon',
//     source: source,
//   }),
// );

////snap
// map.addInteraction(
//   new Snap({
//     source: source,
//   }),
// );

//clear
const clear = document.getElementById('clear');
clear.addEventListener('click', function () {
  source.clear();
});

//download
const format = new GeoJSON({featureProjection: 'EPSG:3857'});
const download = document.getElementById('download');
source.on('change', function () {
  const features = source.getFeatures();
  const json = format.writeFeatures(features);
  download.href =
    'data:application/json;charset=utf-8,' + encodeURIComponent(json);
});

// dynamic styling
const min = 1e8; // the smallest area
const max = 2e13; // the biggest area
const steps = 50;
const ramp = colormap({
  colormap: 'blackbody',
  nshades: steps,
});

function clamp(value, low, high) {
  return Math.max(low, Math.min(value, high));
}

function getColor(feature) {
  const area = getArea(feature.getGeometry());
  const f = Math.pow(clamp((area - min) / (max - min), 0, 1), 1 / 2);
  const index = Math.round(f * (steps - 1));
  return ramp[index];
}



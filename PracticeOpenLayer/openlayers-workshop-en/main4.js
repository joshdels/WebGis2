import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import {Map, View} from 'ol';
import {StadiaMaps, Vector as VectorSource} from 'ol/source';
import {fromLonLat} from 'ol/proj';
import {parse} from 'papaparse'; //mao ni na module mo change sa csv to readable js
import WebGLVectorLayer from 'ol/layer/WebGLVector'; // to read dynamic styling 

// mao ni ang source na csv na gi parse
const source = new VectorSource();
parse('./data/meteorites.csv', {
  download: true,
  header: true,
  complete(result) {
    source.addFeatures(
      result.data.map(
        (row) =>
          new Feature({
            mass: parseFloat(row.mass) || 0,
            year: parseInt(row.year) || 0,
            geometry: new Point(
              fromLonLat([parseFloat(row.reclong), parseFloat(row.reclat)]),
            ),
          }),
      ),
    );
  },
});

// styling sa parsed na data
const meteorites = new WebGLVectorLayer({
  source: source,
  style: {
    'circle-radius': [
        '+',
        ['*', ['clamp', ['*', ['get', 'mass'], 1 / 20000], 0, 1], 9],
        4,
      ],
    'circle-fill-color': 'rgba(255, 0, 0, 0.5)',
  },
});


// Map
new Map({
  target: 'map-container',
  layers: [
    new TileLayer({
      source: new StadiaMaps({
        layer: 'stamen_toner',
      }),
    }),
    meteorites,
  ],
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import {Map, View} from 'ol';
import {StadiaMaps, Vector as VectorSource} from 'ol/source';
import {fromLonLat} from 'ol/proj';
import {parse} from 'papaparse'; //mao ni na module mo change sa csv to readable js
import WebGLVectorLayer from 'ol/layer/WebGLVector'; // to read dynamic styling 
import { V } from 'ol/renderer/webgl/FlowLayer';

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

const minYear = 1850;
const maxYear = 2015;
const span = maxYear - minYear;
const rate = 10; // years per second

const start = Date.now();

// Time filteres
const period = 10;
const periodStart = ['-', ['var', 'currentYear'], period];
const decay = [
  'interpolate',
  ['linear'],
  ['get', 'year'],
  periodStart,
  0,
  ['var', 'currentYear'],
  1,
];

// styling sa parsed na data
const meteorites = new WebGLVectorLayer({
  filter: ['between', ['get', 'year'], periodStart, ['var', 'currentYear']],
  source: source,
  style: {
    'circle-radius': [
      '*',
      decay,
      ['+', ['*', ['clamp', ['*', ['get', 'mass'], 1 / 20000], 0, 1], 9], 4],
    ],
    'circle-fill-color': ['color', 255, 0, 0, ['*', 0.5, decay]],
  },
  variables: {
    currentYear: minYear,
  },
  
  disableHitDetection: true,
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



// This is the time frame area
const yearElement = document.getElementById('year');

// Create a legend element
const legendElement = document.getElementById('legend');

function updateLegend() {
  legendElement.innerHTML = `
    <h1>Legend</h1>
    <div style="display: flex; align-items: center;">
      <div style="width: 20px; height: 20px; background-color: rgba(255, 0, 0, 0.5); border-radius: 50%; margin-right: 10px;"></div>
      <span>Meteorite</span>
    </div>
  `;
}

function render() {
  const elapsed = (rate * (Date.now() - start)) / 1000;
  const currentYear = Math.round(minYear + (elapsed % span));
  meteorites.updateStyleVariables({currentYear: currentYear});
  yearElement.innerText = currentYear;
  
  updateLegend();
  requestAnimationFrame(render);


}



render();





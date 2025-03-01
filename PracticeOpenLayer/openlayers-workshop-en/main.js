import MVT from 'ol/format/MVT';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import {Map, View} from 'ol';
import {fromLonLat} from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

//interaction to the map
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';



const map = new Map({
    target: 'map-container',
    view: new View({
      center: fromLonLat([0, 0]),
      zoom: 2,
    }),
  });


  const layer = new VectorTileLayer({
    source: new VectorTileSource({
      format: new MVT(),
      url:
        'https://ahocevar.com/geoserver/gwc/service/tms/1.0.0/' +
        'ne:ne_10m_admin_0_countries@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf',
      maxZoom: 14,
    }),
  });

map.addLayer(layer);


const source = new VectorSource();
const info = new VectorLayer({
  source: source,
  style: {
    'stroke-color': 'red',
    'stroke-width': 4,
    'text-value': ['coalesce', ['get', 'layers'], ''],
    'text-padding': [2, 2, 2, 2],
    'text-offset-y': -15,
    'text-font': '16px sans-serif',
    'text-background-fill-color': 'gray',
  },
});
map.addLayer(info);

//Function of showing the data di pako ka sabot ani pero sige ra hehehehehe
map.on('pointermove', function (event) {
    source.clear();

    //! [get-features] this show the feature
    const features = map.getFeaturesAtPixel(event.pixel, {
      layerFilter: (layer) => layer !== info,
    });

    //! [get-features] 
    source.addFeatures(features);

    //! [layers-label] source
    const layers = features.map((feature) => feature.get('layer'));
    source.addFeature(
      new Feature({
        geometry: new Point(event.coordinate),
        layers: Array.from(new Set(layers)).join(', '),
      })
    );
    //! [layers-label]
  });
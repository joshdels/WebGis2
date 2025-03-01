import GeoTIFF from 'ol/source/GeoTIFF.js';
import Map from 'ol/Map.js';
import TileLayer from 'ol/layer/WebGLTile.js';
import View from 'ol/View.js';
import colormap from 'colormap';

// const source = new GeoTIFF({
//     sources: [
//       {
//         // near-infrared reflectance
//         url: 'https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/21/H/UB/2021/9/S2B_21HUB_20210915_0_L2A/B08.tif',
//         max: 5000,
//       },
//       {
//         // red reflectance
//         url: 'https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/21/H/UB/2021/9/S2B_21HUB_20210915_0_L2A/B04.tif',
//         max: 5000,
//       },
//       {
//         // green reflectance
//         url: 'https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/21/H/UB/2021/9/S2B_21HUB_20210915_0_L2A/B03.tif',
//         max: 5000,
//       },
//     ],
//   });

  //// This is MATH
//near-infrared is the second band from above
// const nir = ['band', 2];

// // near-infrared is the first band from above
//     const red = ['band', 1];

//     const difference = ['-', nir, red];
//     const sum = ['+', nir, red];

//     const ndvi = ['/', difference, sum];


//     const layer = new TileLayer({
//         source: source,
//     })


//   new Map ({
//     target: 'map-container',
//     layers: [layer],
//     view: source.getView()
//   })

// //   const source1 = new GeoTIFF({
// //     sources: [
// //       {
// //         url: 'https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/21/H/UB/2021/9/S2B_21HUB_20210915_0_L2A/TCI.tif',
// //       },
// //     ],
// //   });

// //   const layer1 = new TileLayer({
// //     source: source1,
// //   });

// //   new Map({
// //     target: 'map-container',
// //     layers: [layer1],
// //     view: source1.getView(),
// //   });


// // 



// function getColorStops(name, min, max, steps, reverse) {
//     const delta = (max - min) / (steps - 1);
//     const stops = new Array(steps * 2);
//     const colors = colormap({colormap: name, nshades: steps, format: 'rgba'});
//     if (reverse) {
//       colors;
//     }
//     for (let i = 0; i < steps; i++) {
//       stops[i * 2] = min + i * delta;
//       stops[i * 2 + 1] = colors[i];
//     }
//     return stops;
//   }

//   const layer = new TileLayer({
//     source: source,
//     style: {
//       color: [
//         'interpolate',
//         ['linear'],
//         ndvi,
//         // color ramp for NDVI values
//         ...getColorStops('earth', -0.5, 1, 10, true),
//       ],
//     },
//   });


//   // new Map({
//   //   target: 'map-container',
//   //   layers: [layer],
//   //   view: source.getView(),
//   // });

//   //add visualization

//   const visualizations = [
//     {
//       name: 'True Color',
//       sources: ['TCI'],
//     },
//     {
//       name: 'False Color',
//       sources: ['B08', 'B04', 'B03'],
//       max: 5000,
//     },
//     {
//       name: 'NDVI',
//       sources: ['B04', 'B08'],
//       max: 10000,
//       style: {
//         color: [
//           'interpolate',
//           ['linear'],
//           ['/', ['-', ['band', 2], ['band', 1]], ['+', ['band', 2], ['band', 1]]],
//           ...getColorStops('earth', -0.5, 1, 10, true),
//         ],
//       },
//     },
//     {
//       name: 'NDWI',
//       sources: ['B03', 'B08'],
//       max: 10000,
//       style: {
//         color: [
//           'interpolate',
//           ['linear'],
//           ['/', ['-', ['band', 1], ['band', 2]], ['+', ['band', 1], ['band', 2]]],
//           ...getColorStops('viridis', -1, 1, 10, true),
//         ],
//       },
//     },
//   ];

//   const visualizationSelector = document.getElementById('visualization');
//   visualizations.forEach((visualization) => {
//     const option = document.createElement('option');
//     option.textContent = visualization.name;
//     visualizationSelector.appendChild(option);
// });

//   //function for chosing 
//   function createLayer(base, visualization) {
//     const source = new GeoTIFF({
//       sources: visualization.sources.map((id) => ({
//         url: `${base}/${id}.tif`,
//         max: visualization.max,
//       })),
//     });
  
//     return new TileLayer({
//       source: source,
//       style: visualization.style,
//     });
//   }

//   const map = new Map({
//     target: 'map-container',
//   });


//   function updateVisualization() {
//     const visualization = visualizations[visualizationSelector.selectedIndex];
//     const base =
//       'https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/21/H/UB/2021/9/S2B_21HUB_20210915_0_L2A';
  
//     const layer = createLayer(base, visualization);
//     map.setLayers([layer]);
  
//     map.setView(layer.getSource().getView());
//   }
  
//   visualizationSelector.addEventListener('change', updateVisualization);
//   updateVisualization();


// import GeoTIFF from 'ol/source/GeoTIFF.js';
// import Map from 'ol/Map.js';
// import TileLayer from 'ol/layer/WebGLTile.js';
// import View from 'ol/View.js';
// import colormap from 'colormap';

function getColorStops(name, min, max, steps, reverse) {
  const delta = (max - min) / (steps - 1);
  const stops = new Array(steps * 2);
  const colors = colormap({ colormap: name, nshades: steps, format: 'rgba' });
  if (reverse) {
    colors.reverse();
  }
  for (let i = 0; i < steps; i++) {
    stops[i * 2] = min + i * delta;
    stops[i * 2 + 1] = colors[i];
  }
  return stops;
}


//color selector according to needs
const visualizations = [
  {
    name: 'True Color',
    sources: ['TCI'],
  },
  {
    name: 'False Color',
    sources: ['B08', 'B04', 'B03'],
    max: 5000,
  },
  {
    name: 'NDVI',
    sources: ['B04', 'B08'],
    max: 10000,
    style: {
      color: [
        'interpolate',
        ['linear'],
        ['/', ['-', ['band', 2], ['band', 1]], ['+', ['band', 2], ['band', 1]]],
        ...getColorStops('earth', -0.5, 1, 10, true),
      ],
    },
  },
  {
    name: 'NDWI',
    sources: ['B03', 'B08'],
    max: 10000,
    style: {
      color: [
        'interpolate',
        ['linear'],
        ['/', ['-', ['band', 1], ['band', 2]], ['+', ['band', 1], ['band', 2]]],
        ...getColorStops('viridis', -1, 1, 10, true),
      ],
    },
  },
];

const images = [
  {
    name: 'Buenos Aires',
    base: 'https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/21/H/UB/2021/9/S2B_21HUB_20210915_0_L2A',
  },
  {
    name: 'Minneapolis',
    base: 'https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/15/T/WK/2021/9/S2B_15TWK_20210918_0_L2A',
  },
  {
    name: 'Cape Town',
    base: 'https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/34/H/BH/2021/9/S2B_34HBH_20210922_0_L2A',
  },
];

//once selected, mu pop out ni sya, sweet
function createLayer(base, visualization) {
  const source = new GeoTIFF({
    sources: visualization.sources.map((id) => ({
      url: `${base}/${id}.tif`,
      max: visualization.max,
    })),
  });

  return new TileLayer({
    source: source,
    style: visualization.style,
  });
}

const map = new Map({
  target: 'map-container',
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});


const visualizationSelector = document.getElementById('visualization');
visualizations.forEach((visualization) => {
  const option = document.createElement('option');
  option.textContent = visualization.name;
  visualizationSelector.appendChild(option);
});

const imageSelector = document.getElementById('image');
images.forEach((image) => {
  const option = document.createElement('option');
  option.textContent = image.name;
  imageSelector.appendChild(option);
});


let previousBase;
function updateVisualization() {
  const visualization = visualizations[visualizationSelector.selectedIndex];
  const base = images[imageSelector.selectedIndex].base;
  const newBase = base !== previousBase;
  previousBase = base;

  const layer = createLayer(base, visualization);
  map.setLayers([layer]);

  if (newBase) {
    map.setView(
      new View ({
        center: [0, 0],
        zoom: 2,
      })
    );
  }
}

visualizationSelector.addEventListener('change', updateVisualization);
imageSelector.addEventListener('change', updateVisualization);
updateVisualization();
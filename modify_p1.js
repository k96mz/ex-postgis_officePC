const preProcess = f => {
  f.tippecanoe = {
    layer: 'other',
    minzoom: 15,
    maxzoom: 15,
  };
  return f;
};

const postProcess = f => {
  delete f.properties['_database'];
  delete f.properties['_view'];
  return f;
};

const layerEdit = {
  // unmap_popp_p: f => {
  baea_nests: f => {
    f.tippecanoe = {
      layer: 'baea_nests-point',
      minzoom: 3,
      maxzoom: 6,
    };
    //write someting to adjust properties, if needed
    return f;
  },
  //   unmap_bndl25_l: f => {
  linear_projects: f => {
    f.tippecanoe = {
      layer: 'testLayer2-line',
      minzoom: 4,
      maxzoom: 5,
    };
    //write someting to adjust properties, if needed
    return f;
  },
  custom_planet_ocean_08_a: f => {
    f.tippecanoe = {
      layer: 'ocean',
      minzoom: 3,
      maxzoom: 6,
    };
    //write someting to adjust properties, if needed
    return f;
  },
  unmap_wbya10_a: f => {
    f.tippecanoe = {
      layer: 'wbya10',
      minzoom: 3,
      maxzoom: 6,
    };
    //write someting to adjust properties, if needed
    return f;
  },
  unmap_dral10_l: f => {
    f.tippecanoe = {
      layer: 'dral10',
      minzoom: 3,
      maxzoom: 6,
    };
    //write someting to adjust properties, if needed
    return f;
  },
};

module.exports = f => {
  return postProcess(layerEdit[f.properties._view](preProcess(f)));
  //   return preProcess(f);
};

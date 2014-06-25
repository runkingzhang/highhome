//
optimizelyGeo = {
  'city': "HANGZHOU",
  'continent': "AS",
  'country': "CN",
  'region': "ZJ",
  'ip': "123.158.50.83"
};
if (typeof window['optimizely'] !== "undefined" &&
    window['optimizely'] !== null) {
  try {
    var visitorObj = window['optimizely']['data']['visitor'];
    visitorObj['location']['city'] = optimizelyGeo['city'];
    visitorObj['location']['continent'] = optimizelyGeo['continent'];
    visitorObj['location']['country'] = optimizelyGeo['country'];
    visitorObj['location']['region'] = optimizelyGeo['region'];
    visitorObj['ip'] = optimizelyGeo['ip'];
  }
  catch(error) {}
  if (typeof window['optimizely']['activateGeoDelayedExperiments'] !== "undefined") {
    window['optimizely']['activateGeoDelayedExperiments']();
  }
  else {
    optimizelyGeo = {};
  }
}

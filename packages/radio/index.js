import LRadio from './src/radio';

LRadio.install = function(Vue) {
    Vue.component(LRadio.name, LRadio);
};

export default LRadio;
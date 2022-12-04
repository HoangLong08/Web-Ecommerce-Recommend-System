const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#FF6A00',
              '@border-radius-base': '8px',
              '@btn-border-width': '1.5px',
              '@table-border-radius-base': '4px',
              '@select-border-color': '4px',
              '@tooltip-border-radius': '4px',
              '@checkbox-border-radius': '4px',
              '@tooltip-border-radius:': '4px',
            },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
};

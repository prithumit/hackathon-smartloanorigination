const requireDir = require('require-dir');

const forms = requireDir(`../src/config/features/forms/`);
const custom = requireDir(`../src/config/features/custom/`);
const locale = requireDir(`../src/config/locale/`);

module.exports = () => ({
  forms,
  custom,
  locale,
});

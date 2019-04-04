'use strict';

const path = require('path');

const concat = require('broccoli-concat');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const replace = require('broccoli-string-replace');

module.exports = {
  included() {
    this._super.included.apply(this, arguments);
    this._findHost().import('vendor/ember-novnc-shim.js');
  },

  name: require('./package').name,

  treeForVendor(tree) {
    const novncPath = path.join(require.resolve('@novnc/novnc/core/rfb'), '..', '..');
    const babelAddon = this.addons.find(addon => addon.name === 'ember-cli-babel');
    const novncTree = concat(
      babelAddon.transpileTree(
        replace(
          new Funnel(this.treeGenerator(novncPath), {
            destDir: '@novnc/novnc',
            include: ['core/**/*.js', 'vendor/pako/**/*.js']
          }),
          {
            files: ['**/*.js'],
            patterns: [
              { match: /\bfrom\s+(['"])(.*?)\.js\1/g, replacement: 'from $1$2$1' },
              { match: /\bimport\s+(['"])(.*?)\.js\1/g, replacement: 'import $1$2$1' }
            ]
          }
        )
      ),
      { outputFile: 'ember-novnc-shim.js' }
    );

    if (!tree) {
      return this._super.treeForVendor.call(this, novncTree);
    }

    const trees = mergeTrees([novncTree, tree], {
      overwrite: true
    });

    return this._super.treeForVendor.call(this, trees);
  }
};

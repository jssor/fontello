// Inject Puncher info into page
// 1. only when no errors
// 2. Immediately after http renderer
//

'use strict';


var render = require('../../../../system/render/common');


var MACRO = '<!--{{PUNCHER_STATS}}-->';


////////////////////////////////////////////////////////////////////////////////


module.exports = function (N) {
  N.wire.after('responder:http', { priority: 21 }, function http_puncher_render(env) {
    var result, data;

    // Do nothing on errors, that relax puncher scopes pairing
    if (env.err) return;

    if (env.res.puncher_stats &&
        env.body &&
        env.body.indexOf(MACRO) !== -1) {

      data = {
        stats: env.res.puncher_stats
      };

      result = render(N, 'common.blocks.debug_timeline', data, env.helpers);

      env.body = env.body.replace(MACRO, result);
    }
  });
};

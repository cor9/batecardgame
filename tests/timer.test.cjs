const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '../script.js'), 'utf8');
const method = source.slice(source.indexOf('    extractTimerDuration('), source.indexOf('    startTimer()'));
const parser = vm.runInNewContext(`({${method}})`);

test('timer units convert abbreviated and full minutes to seconds', () => {
    for (const [text, seconds] of [['3 min', 180], ['2 mins', 120], ['2mins', 120],
        ['3 MIN', 180], ['max 5 min', 300], ['2 minutes', 120], ['1 minute', 60],
        ['30 sec', 30], ['90 seconds', 90], ['45 secs', 45], ['3 repetitions', 0]]) {
        assert.equal(parser.extractTimerDuration(text), seconds, text);
    }
});

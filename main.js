var blessed = require('blessed');
var contrib = require('blessed-contrib');

var screen = blessed.screen({
    smartCSR: true
});

screen.title = 'Hi Title';

var box = blessed.box({
    top: 'center',
    left: 'center',
    width: '50%',
    height: '50%',
    content: 'Hello {bold}world{/bold}, now we\'re cooking with {black-fg}magenta{/black-fg}!',
    tags: true,
    border: {
	type: 'line'
    },
    style: {
	fg: 'white',
	bg: 'magenta',
	border: {
	    fg: '#f0f0f0'
	},
	hover: {
	    bg: 'green'
	},
    },
});

screen.append(box);

var donut = contrib.donut({
    label: 'Test',
    radius: 16,
    arcWidth: 1,
    remainColor: 'black',
    yPadding: 2,
    data: [
	{percent: 80, label: 'web1', color: 'green'}
    ]
});

screen.append(donut);

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
});

box.key('enter', function(ch, key) {
    box.setContent('{center}Centered?!{/center}');

    screen.render();
});

box.focus();

screen.render();

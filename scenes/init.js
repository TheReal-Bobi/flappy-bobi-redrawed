const PIPE_OPEN = 80;
const PIPE_MIN_HEIGHT = 16;
const JUMP_POWER = 320;
const SPEED = 120;

// Sets gravity
gravity(1200);

// Draw layers
layers([
  'background',
  'obj',
  'ui',
], 'obj')

// Adds background
add([
  sprite('background'),
  scale(10),
	layer('background'),
])

// Adds bird
const bird = add([
  sprite('bird'),
  pos(120, 0),
  body()
])

// Checks for fall death
bird.action(() => {
  if (bird.pos.y >= height()) {
    // Goes to death scene
    go('death', {score: score.value})
  }
})

// Allows bird to jump
keyPress('space', () => {
  bird.jump(JUMP_POWER)
  play('swoosh')
})

function spawnPipe() {
  // Calculates pipe position
  const h1 = rand(PIPE_MIN_HEIGHT, height() - PIPE_MIN_HEIGHT - PIPE_OPEN);
	const h2 = h1 + PIPE_OPEN;

  add([
    sprite('pipe'),
		origin('botleft'),
		pos(width(), h1),
		'pipe',
  ])

  add([
		sprite('pipe'),
		origin('botleft'),
		scale(1, -1),
		pos(width(), h2),
		'pipe',
		{ passed: false, },
	]);
}

// Checks if bird collides with pipe
bird.collides('pipe', () => {
	go('death', {
		score: score.value,
	});
  play('hit')
});

action("pipe", (p) => {
	p.move(-SPEED, 0);
	// Checks if bird passed pipe
	if (p.pos.x + p.width <= bird.pos.x && p.passed === false) {
		addScore();
		p.passed = true;
	}
	if (p.pos.x < -width() / 2) {
		destroy(p);
	}
});

// Spawns pipe every second
loop(1, () => {
	spawnPipe();
});

// Displays score
const score = add([
	text('0', 16),
	layer('ui'),
	pos(9, 9),
	{
		value: 0,
	},
]);

// Updates score
function addScore() {
	score.value++;
	score.text = score.value;
  play('point')
}

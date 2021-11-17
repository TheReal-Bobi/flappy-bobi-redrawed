// Displays score
add([
  text('Puntos: ' + `${args.score}`),
  pos(width() / 2, height() / 2),
  origin('center')
])

add([
  text('Press space to try again!'),
  pos(130, 100),
  origin('center')
])

// Returns to main scene
keyPress('space', () => {
  go('main')
})
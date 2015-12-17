# Monster Arena

Spawn a legion of monsters to destroy the lone hero! Use your resources wisely, and fight to upgrade your monster army. Battle for a wide array of distinct monsters, and useful power-ups.

This game is built using vanilla HTML5, Javascript, the [less css framework](http://lesscss.org), [bootstrap](http://getbootstrap.com/getting-started/), and [jquery](https://jquery.com/).

It serves as the final project for [Fundementals of Game Programming](http://catalog.k-state.edu/preview_course_nopop.php?catoid=2&coid=4202) at [Kansas State University](http://www.k-state.edu). Course instruction provided by [Nathan Bean](http://people.cis.ksu.edu/~nhb7817/).

## Contributors
* David Barnes III (dbarnes3@ksu.edu)
	* <i>Physics/Math calculations for movment of monsters accross screen</i>
	* <i>Helped set up the webpage(espically set background image for arena), and align all the elements</i>
	* <i>Debugged multiple small issues in game, while trying to "break" it</i>
* Kyle Brown (kyle16@ksu.edu)
	* <i>Implemented Audio Manager</i>
	* <i>Audio files</i>
* Christian Hughes (cjhughes255@ksu.edu)
	* <i>Implemented general animation framework/individual monster animations.</i>
	* <i>Processed non-HTML entity rendering and frame updating.</i>
	* <i>Sourced and formatted artwork into monster sprite sheets.</i>
	* <i>Did a variety of debug tasks & HTML tidbits.</i>
* Nic Johnson (njj@ksu.edu)
	* <i>Implemented Shop interface and functionality</i>
	* <i>Implemented Stats interface and functionality</i>
	* <i>Debugging</i>
		* <i>Catching Richard's misuse of < and ></i>
		* <i>Other sneaky bugs</i>
	* <i>Implementation of Credits & Game Over gamestates</i>
* Nate Kellogg (leeroyjenkins@ksu.edu)
* Richard Petrie (rap1011@ksu.edu)
* E.N. Speer (ispeer@ksu.edu)
	* <i>Drew multiple arena images and created the help screen.</i>
	* <i>Helped with implementation of Credits.</i>
	* <i>Implemented game states.</i>
	* <i>And debug tasks like everyone else.</i>

# Development Notes
## Compiling

Keep compiling simple!

```browserify src/main.js -o MonsterArena.js```  
```lessc less/main.less main.css```

## TODO

- [ ] Menu states
    - [x] Help state
		- [x] Basic HTML/CSS
		- [x] Javascript class
	- [x] ~~Recompile main.js into MonsterArena.js once the above are done.~~
- [ ] Hero animations
- [ ] Implement AudioManager calls
	- [x] ~~Shop Manager~~
	- [x] ~~Stats Manager~~
	- [x] ~~Win music~~
- [ ] Test Specials
- [ ] General balance fixes
- [ ] Mute buttons

## Audio Manager
Added audio containers in HTML. Add to molule via

```AudioManager = require('./AudioManager.js')```

Public Functions:
* playIdleMusic
* playBattleMusic
* playWinMusic
* playLoseMusic
* playLevelUpSFX
* playUpgradeSFX
* playBuffSFX
* playDebuffSFX
* playClickSFX
* toggleMusic
* toggleEffects

Added 4 svg images, in img folder for icons for toggling sound.

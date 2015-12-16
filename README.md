# MonsterArena

Final project for CIS580

## Compiling

Keep compiling simple!

```browserify src/main.js -o MonsterArena.js```  
```lessc less/main.less main.css```

## TODO

- [ ] Menu states
	- [x] ~~Credits state~~
		- [x] ~~Basic HTML/CSS~~
		- [x] ~~Javascript class~~
	- [x] ~~Game over state~~
		- [x] ~~Basic HTML/CSS~~
		- [x] ~~Javascript class~~
    - [ ] Help state
		- [ ] Basic HTML/CSS
		- [ ] Javascript class
	- [x] ~~Recompile main.js into MonsterArena.js once the above are done.~~
- [ ] Hero animations
- [ ] Implement AudioManager calls
	- [x] ~~Shop Manager~~
	- [x] ~~Stats Manager~~
- [ ] Test Specials
- [ ] Game over logic
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

## Contributors

* Kyle Brown (kyle16@ksu.edu)
* Christian Hughes (cjhughes255@ksu.edu)
* Nic Johnson (njj@ksu.edu)
* Richard Petrie (rap1011@ksu.edu)
* David Barnes III (dbarnes3@ksu.edu)
* E.N. Speer (ispeer@ksu.edu)

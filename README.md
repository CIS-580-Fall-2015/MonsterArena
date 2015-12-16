# MonsterArena

Final project for CIS580

## Compiling

Keep compiling simple!

```browserify src/game.js -o MonsterArena.js```  
```lessc less/main.less main.css```

## TODO

* Index page  
    * arena/canvas work for rendering
* Menu states
* Shop UI (95% finished)
    * Assign delegates for boss/door upgrades
* Monster sprites
   * ~~Monster Movement~~
   * ~~Monster Animation~~
   * ~~Monster Updating/Rendering~~
   * Hero Rendering/Animation
   * ~~Monster Spawning~~
* **Monster/Hero interaction**
* ~~Hero Spawning~~

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

TO BE IMPLEMENTED...
* add icons for music and sound effects toggling in UI and call functions toggleMusic() and toggleEffects() on click.
* Wherever the wave starts, call playBattleMusic(), and ends call playIdleMusic().
* Wherever sound effects need to be implemented, call that sound effect function.


## Contributors

* Kyle Brown (kyle16@ksu.edu)
* Christian Hughes (cjhughes255@ksu.edu)
* Nic Johnson (njj@ksu.edu)
* Richard Petrie (rap1011@ksu.edu)
* David Barnes III (dbarnes3@ksu.edu)
* E.N. Speer (ispeer@ksu.edu)

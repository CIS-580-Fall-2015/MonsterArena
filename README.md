# MonsterArena

Final project for CIS580

## Compiling

Keep compiling simple!

```browserify src/game.js -o MonsterArena.js```  
```lessc src/main.less main.css```

## TODO

* Index page  
    * ~~Need to incorporate arena area between menus~~
    * fix arena sizing
* Menu states
* ~~Stats UI~~
* ~~Shop UI~~ (mostly)  
    * ~~Selection highlighting~~
    * ~~Assigning delegates to handle updating~~ (paritally)
    * Final two upgrade options
    * Cost grey/available
* ~~UI Design~~
* UI Icons
* Monster sprites
   * Monster Movment
   * Monster Animation
   * Monster Updating/Rendering
   * Monster Spawning
* Monster/Hero interaction
* ~~Hero Spawning~~

## Audio Manager README
Added audio containers in HTML.
Added in game.js:
AudioManager = require('./AudioManager.js')
Simply call functions like AudioManager.playIdleMusic().
Functions:
playIdleMusic, playBattleMusic,playWinMusic,playLoseMusic,
playLevelUpSFX, playUpgradeSFX, playBuffSFX, playDebuffSFX, playClickSFX,
toggleMusic, toggleEffects
 
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



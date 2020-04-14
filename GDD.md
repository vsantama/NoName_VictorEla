# GDD Tibu-run
v0.1 - by Víctor & Ela 
13 Feb 2020

## 1. Description
Our game is a Mario-type scroller game (that doesn't automatically scroll), where you control a character escaping a monster
following them from the side of the screen.

Apart from that, there are other enemies and obstacles that you either have to avoid or defeat by completing mini-puzzles.
The objective is to end the route without getting killed.      

## 2. Scope & Target Audience

Our target audience is a young audience, with an age range of 14 to 30 year old.
            
## 3. Game Style

We'll do our game in a colourful, fun, pixelart style. The backgrounds will range from a beach to a forest, and our character will either be a human or a big-headed dog. 

## 4. Game content

### 4.1 Storyline

Our main character, a dog (or human depending on the character chosen) is at the beach and catches a fish. A shark notices from afar and gets angry, because that's their fish, not the dog's. 

The shark swims to the shore and starts running towards your character (oh my god, a running shark!!) and your character starts running away.

If you finish the game, your character gets home safe and the shark is bummed. 
            
### 4.2 Levels

There are no levels as such, but the background of the game changes to give a sensation of progress.
                  
### 4.3 Characters and enemies

At the beggining of the game there's a default character to play (shiba dog), there are other two unlockable characters (german shepherd and human) that can be unlocked with points from the game.
Also, players can upload a png to use as a customized character.

The main enemy is a monster following your character from the left side of the main screen. The slower you are avoiding and defeating obstacles the closer the monster gets to you, and as soon as it touches (or eats) you, you die.

There are other smaller enemies that act as obstacles.
                    
### 4.4 Obstacles

There are three main obstacles: small enemies, boulders and rocks.

**Small enemies** block the way, and can only be defeated by solving word puzzles. If you fail, the enemy strikes your character and removes life points.

**Boulders** are similar to small enemies, but don't attack you. There are three types: bronze
boulders, silver boulders and gold boulders. The more valuable the material is, the more puzzles you have to complete to destroy the boulder. 

**Rocks** fall from the ceiling, and remove some life points if they hit your character. To avoid this you must move your character to dodge them. There are also rocks on the ground, which you must jump over.  

### 4.5 Other elements

As you move along the scrolling map you'll find different powerups. These powerups appear on-screen when we move, and you'll be able to reach them by jumping.

**Heart:** This powerup gives life points to the character.
**Question mark:** A word in a word puzzle will appear fully for one second (mechanic explained down below).
**Bomb:** All enemies/obstacles (except the main monster) that appear on-screen are destroyed. 

Also, at the top of the screen we'll be able to see our characters life points, the total points accumulated in that round and a small map indicating where the monster is relative to us (if we don't see it when it's far away).
                    
## 5. Mechanics and Gameplay

There are two main mechanics in our game: one is in the main scroll screen, and the other is the puzzle mechanic, that appears in a bar below the main screen when our character collides with a boulder or a small enemy. 

At the top we have our character and our 2D scroll screen. As we move we'll find different obstacles and will have to jump over them or dodge them. Here we also find powerups. At the far lest of the screen we might see the tip of the monsters mouth (or we don't see it at all). The closer it gets to us the more we see of it, until it eats us.

When we encounter a certain obstacle, we won't be able to move, but the bar (or word pad) at the bottom of the screen will start working.
The bar will show a word (picked form a text file that users can upload, or use a standard one) and will start flashing, allowing little time to read it. The player will then have to write the word correctly, as quickly as possible, to be able to advance destroying the boulder or defeating the enemy. In the case we fail against an enemy, we will get hit and get penalized by it.
The dificulty curve of this mechanic is based on speed and word complexity. Words will be shown for less time and they will tend to become longer and less common, being more likely to need more time or fail in your attempt.

X 1. Fix the 'DRAW' function by refactoring code making it simpler to read and make sure all functionality works correctly.

X 2. check all functionality is working fix anything that isnt

X 2. change functionality of aces to make it auto select the best use (see old vanilla JS app)

X 2.4 if both players bust active player = 0

X 3. in playerWin stop it being able to draw with player first and then player wins when dealer busts playing against second player

X 3. fix dealer not showing as won when they win

X 3.1. fix players showing as lost if they have a low hand and the dealer busts
eg player with 12 dealer hits 15 (not suitable as needs to be 17 or over) dealer then busts -- player wins

X 4. add in betting into the game
each player has an amount of money stored in state

dealer will match all bets with a double stake payout if you win
if you draw you get back your stake
add an input field below each player for how much they woudl like to bet

5. add a add money button which has a pop up model
   --amount to deposit
   --account to deposit to ie player 1 or player 2

   - add mode that if playerOne has no coins active player starts as player 2

   - grey out entire player when either has no coins left or is player 2 on 1 player game

   X 6. refactor newGame in reducer to use iniitial state and change the values that remain such as total, number of players, coins

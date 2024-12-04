import random

def guessing_game():
    trials = int(input("How many times do you want to play this guessing game?: "))
    counter = trials
    
    animals = ["dog",
               "cat",
               "lion",
               "cheetah",
               "elephant",
               "giraffe",
               "zebra",
               "kangaroo",
               "panda",
               "koala",
               "dolphin",
               "whale",
               "penguin"]

    print("You are to guess a name of an animal from this range of animals: \ncat,\n lion,\n cheetah,\n elephant,\n giraffe,\n zebra,\n kangaroo,\n panda,\n koala,\n dolphin,\n whale,\n penguin.\n")
    
    for i in range(counter):
        words = random.choice(animals)


        user_guess = input("Enter your guess: ")
        if user_guess == words:
            print("Correct")
        else:
            print(f"Missed!, the correct answer is {words}, try again.")
    
    print("You've exhausted your time, reload the game to try again.")
    user_rating = float(input("Rate this game out of 100%: "))
    if user_rating < 60: 
        print(input("Thanks for the feedback and input what you think we could improve on: "))
        print("Thanks for the feedback, bye.")
    else:
        print("Thanks for the feedback.😊")
       
guessing_game()

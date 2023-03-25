import pygame
import time

def play_mp3(file_path):
    pygame.mixer.init()
    pygame.mixer.music.load(file_path)
    pygame.mixer.music.play()

    while pygame.mixer.music.get_busy():
        # Wait for the music to finish playing
        time.sleep(1)

    pygame.mixer.quit() 

# Example usage:
# file_path = "hello_world.mp3"
# play_mp3(file_path)

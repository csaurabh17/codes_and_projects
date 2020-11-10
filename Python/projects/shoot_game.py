# -*- coding: utf-8 -*-
"""
Created on Mon Nov  9 19:04:38 2020

@author: Saurabh
"""

import pygame, random, sys, time
pygame.init()

class Crosshair(pygame.sprite.Sprite):
    
    def __init__(self, pos_x,pos_y):
        super().__init__()
        self.image = pygame.image.load('resource\\sprites\\crosshair.png')
        self.image = pygame.transform.scale(self.image, (150,150))
        self.rect = self.image.get_rect()
        self.gunshot = pygame.mixer.Sound('resource\\sounds\\gunshot.mp3')
   
    def shoot(self):
        self.gunshot.play() 
    def update(self):
        self.rect.center = pygame.mouse.get_pos()
        
class Thief(pygame.sprite.Sprite):
    
    def __init__(self,pos_x,pos_y):
        super().__init__()
        self.image = pygame.image.load('resource\\sprites\\thief_steal1.png')
        self.image = pygame.transform.scale(self.image, (200,200))
        self.rect = self.image.get_rect()
    
    def update(self):
        self.rect.center = random.randint(100,1200),random.randint(100,600);
    
pygame.display.set_caption("Shoot the thief")
my_font = pygame.font.SysFont("monospace", 50, True)
size = w,h = 1280,720
screen = pygame.display.set_mode(size)
background = pygame.image.load('resource\\forest_background.jpg')
background =  pygame.transform.scale(background, (1280, 720))
pygame.mouse.set_visible(False)
THIEF_APPEARS = pygame.USEREVENT+1
PAUSE = pygame.USEREVENT + 2
is_paused = False
# thief = pygame.image.load('resource\\thief.jpg')
# thief_rect = thief.get_rect()
# thief = pygame.transform.scale(thief, (200, 100))
bg_rect = background.get_rect()
crosshair = Crosshair(100, 100)
crosshair_group = pygame.sprite.Group()
crosshair_group.add(crosshair)

thief = Thief(200,300)
thief_group = pygame.sprite.Group()
thief_group.add(thief)
pygame.time.set_timer(THIEF_APPEARS, 2500)
current_time = pygame.time.get_ticks()
start_time =0
score = 0
while True:
    print('inside while')
    e = pygame.event.wait()
 
    if e.type == pygame.QUIT:
            pygame.quit(); sys.exit()
    if e.type == pygame.MOUSEBUTTONDOWN:
        crosshair.shoot()
        if thief.rect.collidepoint(e.pos):
            print('Thief shot')
            score +=1
    if e.type == THIEF_APPEARS and is_paused == False:
        print('appears')
        is_paused = True
        start_time = int(round(time.time() * 1000))
    screen.blit(background, bg_rect)
    crosshair_group.draw(screen)
    crosshair_group.update()
    scoretext = my_font.render("Score = "+str(score), 1, (0,0,0))
    screen.blit(scoretext, (500, 600))
    if is_paused:
        print(int(round(time.time() * 1000)) - start_time)
        if int(round(time.time() * 1000)) - start_time >= 2000:
            pygame.time.set_timer(THIEF_APPEARS, 0)
            # thief_group.draw(screen)
            thief_group.update()
            pygame.display.flip()
            is_paused = False
            pygame.time.set_timer(THIEF_APPEARS, 2500)
            # start_time = int(round(time.time() * 1000))
        else:
            pygame.display.flip()
    else:
        thief_group.draw(screen)
        crosshair_group.draw(screen)
        crosshair_group.update()
        pygame.display.flip()
    
pygame.quit()



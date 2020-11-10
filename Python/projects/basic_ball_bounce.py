# -*- coding: utf-8 -*-
"""
Created on Mon Nov  9 09:40:36 2020

@author: Saurabh
"""

import sys, pygame
pygame.init()

size = width, height= 800,600
speed = [1.05,1.05]
black= 0,0,0
score_font = pygame.font.SysFont("monospace", 24)
screen= pygame.display.set_mode(size)
score = 0
clicked = False
ball = pygame.image.load("Intro_ball.gif")
ballrect = ball.get_rect()

while 1:
    for event in pygame.event.get():
        if event.type == pygame.QUIT: sys.exit()
    
    ballrect = ballrect.move(speed)
    
    if ballrect.left <0 or ballrect.right > width:
        speed[0] = -speed[0]
    
    if ballrect.top<0 or ballrect.bottom > height:
        speed[1] = -speed[1]
   
    
    screen.fill(black)
    screen.blit(ball,ballrect)
    
   
    pygame.display.flip()
    
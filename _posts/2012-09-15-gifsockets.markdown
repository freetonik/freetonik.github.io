---
layout: post
title: gifsockets
category: Notes
---
Сегодня узнал о существовании gifsockets – фреймворка для передачи браузеру текстовых данных с помощью анимированных gif-файлов. У таких файлов есть особенность: если браузер начал загружать его, то он будет продолжать это делать пока не закончатся кадры. Получается, можно бесконечно долго посылать их клиенту, постоянно поддерживая соединение новыми кадрами. Такое будет работать даже в IE6.

В действии этим фреймворком можно насладиться на видео:

<div class="video-container mb3"><iframe src="http://player.vimeo.com/video/49447841?title=0&amp;byline=0&amp;portrait=0&amp;color=000000" width="500" height="313" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>

Мне кажется, это чудовищно смешно и гениально. [Проект на GitHub'е](https://github.com/videlalvaro/gifsockets).

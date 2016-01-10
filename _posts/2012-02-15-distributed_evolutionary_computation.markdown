---
layout: post
title: "Распределенные эволюционные вычисления"
category: Lectures
summary: Сегодня я постараюсь объяснить генетические алгоритмы проще и нагляднее, а заодно рассказать вкратце о прототипе очень простого JavaScript-фреймворка для распределенных генетических вычислений.
video_id: 35937629
video_provider: vimeo
minutes: 48
---
<div class="video-container"><iframe width="560" height="420" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen src="https://player.vimeo.com/video/35937629?color=2980b9&title=0&byline=0&portrait=0"></iframe></div>

Одна из моих любимых тем в программировании – эволюционные вычисления и генетические алгоритмы в частности. Пару лет назад я <a href="http://habrahabr.ru/blogs/study/86777/">поднимал</a> эту (в целом уже заезженную) тему на Хабре, но сейчас глядя на то видео немного стыдно – слишком уж туманно и сумбурно было объяснение.

Сегодня я постараюсь объяснить генетические алгоритмы проще и нагляднее, а заодно рассказать вкратце о прототипе очень простого JavaScript-фреймворка для распределенных генетических вычислений <a href="http://degas.freetonik.com">degas.js</a>. В двух словах – degas.js запускает генетический алгоритм в виде "треда" в браузере клиента используя <a href="http://en.wikipedia.org/wiki/Web_worker">web workers</a> и обменивается информацией о полученных в ходе эволюции индивидуумах с сервером и другими клиентами с помощью <a href="http://en.wikipedia.org/wiki/WebSocket">web sockets</a>. Сервер использует <a href="http://nodejs.org">node.js</a>.

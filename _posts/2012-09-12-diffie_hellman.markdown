---
layout: post
title: "Алгоритм Диффи — Хеллмана"
category: Translations
subcat: Science_short
original_url: http://habrahabr.ru/post/151599/
original_url_source: Habrahabr
minutes: 6
video_id: 139918244
video_provider: vimeo
summary: "Одна из фундаментальных проблем криптографии – безопасное общение по прослушиваемому каналу. Сообщения нужно зашифровывать и расшифровывать, но для этого обеим сторонам нужно иметь общий ключ. Если этот ключ передавать по тому же каналу, то прослушивающая сторона тоже получит его, и смысл шифрования исчезнет."
---

Одна из фундаментальных проблем криптографии – безопасное общение по прослушиваемому каналу. Сообщения нужно зашифровывать и расшифровывать, но для этого обеим сторонам нужно иметь общий ключ. Если этот ключ передавать по тому же каналу, то прослушивающая сторона тоже получит его, и смысл шифрования исчезнет.

<a href="http://en.wikipedia.org/wiki/Diffie–Hellman_key_exchange">Алгоритм Диффи — Хеллмана</a> позволяет двум сторонам получить общий секретный ключ, используя незащищенный от прослушивания, но защищённый от подмены канал связи. Полученный ключ можно использовать для обмена сообщениями с помощью <a href="http://en.wikipedia.org/wiki/Symmetric_key">симметричного шифрования</a>.

Предлагаю ознакомиться с принципом работы алгоритма Диффи – Хеллмана в замечательном видео от <a href="http://www.artoftheproblem.net">Art of the Problem</a> в моем переводе.

<div class="video-container"><iframe width="560" height="420" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen src="https://player.vimeo.com/video/139918244?color=2980b9&title=0&byline=0&portrait=0"></iframe></div>

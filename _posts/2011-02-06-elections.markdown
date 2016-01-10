---
layout: post
title: "Прозрачные и проверяемые выборы"
original_url: http://geektimes.ru/post/113877/
original_url_source: Geektimes
category: Translations
subcat: Science_short
minutes: 20
summary: "Экономисты и политики твердят о необходимости роста, ускорения, увеличения. Нужно строить больше всего, нужно покупать больше всего, ловить и поедать больше всего. Рост и увеличение – наша чуть ли не основная цель, но если наше движение трезво оценить с научной точки зрения, то становится по-настоящему страшно."
video_id: wmj0qjTLakc
video_provider: youtube
---

Сегодня я хочу рассказать вам о том, как можно сделать процедуру голосования лучше и надежнее. Во-первых, советую <a href="http://www.ted.com/talks/david_bismark_e_voting_without_fraud.html">посмотреть</a> речь <a href="http://evoting.bismark.se/verifiable-electronic-voting/">Дэвида Бисмарка</a> на TED или здесь в моей озвучке (перевод Андрея Новика):

<div class="video-container mb3"><iframe width="560" height="420" frameborder="0" allowfullscreen src="https://www.youtube.com/embed/wmj0qjTLakc?color=white&theme=light&rel=0&amp;showinfo=0"></iframe></div>

<strong>Как это работает?</strong>

Я расскажу о системе электронного голосования на примере системы <a href="http://adida.net/">Бена Адида</a>, которая отличается от системы Дэвида Бисмарка, но в конечном итоге обладает всеми теми же важными для людей свойствами. Оба варианта — лишь примеры, подобных систем можно придумать огромное количество.

Проблема современных систем голосования (как классических, так и компьютеризованных): человек не может удостовериться в том, что его голос учтен. Объясняется это, обычно, принципом анонимности голосования, но это сугубо техническая причина. Если хорошенько подумать, то можно найти способ проверки собственного голоса без нарушения принятых норм. Хорошее сравнение — банкоматы. Мы все ими пользуемся и доверяем, при этом наши деньги остаются в сохранности, и, что самое главное, мы всегда можем проверить каждую операцию (на сайте или в банке). Хорошая система электронных выборов должна быть проверяема на всех стадиях.

Для такой системы были определены следующие требования:
<ul>
	<li>система публичных/частных ключей: голосующие зашифровывают голос, кандидаты — расшифровывают</li>
	<li>легко-генерируемые случайные ключи: для каждого голосующего генерируется случайный ключ, так что голоса за одного кандидата от разных людей не являются идентичными в зашифрованном виде</li>
	<li>гомоморфизм</li>
</ul>
Про последний пункт мы поговорим чуть позже.

В такой системе можно использовать любой алгоритм шифрования, подобный RSA, который основан на использовании пары публичный-частный ключ. В этом примере мы будем использовать схему <a href="http://ru.wikipedia.org/wiki/%D0%A1%D1%85%D0%B5%D0%BC%D0%B0_%D0%AD%D0%BB%D1%8C-%D0%93%D0%B0%D0%BC%D0%B0%D0%BB%D1%8F">Эль-Гамаля</a>.
<ol>
	<li>Каждый кандидат генерирует и публикует следующую информацию:
<ul>
	<li>Большое <a href="http://ru.wikipedia.org/wiki/%D0%9F%D1%80%D0%BE%D1%81%D1%82%D0%BE%D0%B5_%D1%87%D0%B8%D1%81%D0%BB%D0%BE">простое</a> число <strong>p</strong></li>
	<li>Число <strong>a<sub>b</sub></strong> (по <a href="http://ru.wikipedia.org/wiki/%D0%A1%D1%80%D0%B0%D0%B2%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5_%D0%BF%D0%BE_%D0%BC%D0%BE%D0%B4%D1%83%D0%BB%D1%8E_%D0%BD%D0%B0%D1%82%D1%83%D1%80%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%B3%D0%BE_%D1%87%D0%B8%D1%81%D0%BB%D0%B0">модулю</a> p)</li>
	<li>Публичный ключ <strong>y<sub>b</sub></strong> (y<sub>b</sub> = a<sup>x<sub>b</sub></sup> mod p)
<ul>
	<li>Частный ключ x<sub>b</sub> (случайное число от 1 до p-1; <span style="text-decoration: underline;">не публикуется!</span>)</li>
</ul>
</li>
</ul>
</li>
	<li>Голосующий должен зашифровать свой голос — некое сообщение m (-1&lt;m&lt;p). Каждый голосующий имеет свои публичный и частный ключи —<strong> y<sub>a</sub></strong> и <strong>x<sub>a</sub></strong>, соответственно.
<ul>
	<li>Формируется общий ключ SK (shared key): <strong>SK</strong> = (y<sub>b</sub>)<sup>x<sub>a</sub></sup> = (y<sub>a</sub>)<sup>x<sub>b</sub></sup></li>
	<li>Голос это пара (c1, c2) = (ya, m*SK) mod p</li>
</ul>
</li>
	<li>Только тот кандидат, за которого был отдан голос, сможет его расшифровать:
<ul>
	<li>(m * SK * SK<sup>-1</sup>) mod p = (m * a<sup>x<sub>a</sub>x<sub>b </sub></sup>* a<sup>-x<sub>a</sub>x<sub>b</sub></sup>) mod p = m</li>
</ul>
</li>
</ol>
Вот простой пример:

1. p = 13, a = 2, y<sub>b</sub> = 7, x<sub>b</sub> = 11 (7 = 2<sup>11</sup> mod p).
2. m = 7, (c1, c2) = (2<sup>6</sup>, 7*(2<sup>11</sup>)<sup>6</sup>) mod 13 = (12, 6)
3. (7*2<sup>66</sup> * 2<sup>-66</sup>) mod 13 = 7 = m.

Теперь немного о последнем пункте списка требований: <a href="http://ru.wikipedia.org/wiki/%D0%93%D0%BE%D0%BC%D0%BE%D0%BC%D0%BE%D1%80%D1%84%D0%B8%D0%B7%D0%BC">гомоморфизм</a> (в нашем случае — гомоморфизм групп). Если вы знакомы с теорией групп из математики, то должны вспомнить это свойство. Если коротко: группа это математический объект, «замкнутый» относительно некоторой операции. Например, целые числа относительно сложения — группа, так как взяв два любые элемента из этой группы (два целых числа) и применив операцию сложения (сложив эти числа) мы получим другое целое число — другой элемент той же группы. Это и есть «замкнутость». Такую группу обозначили бы как (Z, +).

Пусть у нас есть две такие группы: (G, \*) и (H, ·). Гомоморфизмом будет являться функция h: G → H, если h(u*v) = h(u) · h(v). В нашем случае функцией является зашифровка:

enc(u·v) = enc(u)·enc(v).

Это свойство системы необходимо для обеспечения возможности подсчета голосов публикой без нарушения анонимности голосования. В нашем случае гомоморфизм таков:

enc(m1) · enc(m2) = (y<sub>x<sub>1</sub></sub>, m1 · SK1) · (y<sub>x<sub>2</sub></sub>, m · SK2) mod p = (y<sub>x<sub>1</sub></sub>, · (m1 · m2)(SK1 · SK2)) mod p = enc(m1 · m2).

<strong>Как происходит голосование?</strong>
<ol>
	<li>Избиратель проверяет бюллетень. Используется принцип <a href="http://ru.wikipedia.org/wiki/%D0%94%D0%BE%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D1%81%D1%82%D0%B2%D0%BE_%D1%81_%D0%BD%D1%83%D0%BB%D0%B5%D0%B2%D1%8B%D0%BC_%D1%80%D0%B0%D0%B7%D0%B3%D0%BB%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D0%B5%D0%BC">доказательства с нулевым разглашением</a>. Голосующий выбирает два любых бюллетеня, соскребает случайные числа (публичный ключ) с одного из них (как в лотерее) и сканирует двумерный штрих-код чтобы удостовериться, что указанный там порядок кандидатов соответствует зашифрованной информации. Этот бюллетень перестает быть действительным, а избиратель использует второй.</li>
	<li>Избиратель делает выбор.</li>
	<li>Отрывает левую часть.</li>
	<li>Уничтожает публичный ключ.</li>
	<li>Сканирует бюллетень, уходит домой.</li>
</ol>
Отсканированные бюллетени публикуются на вебсайте. Проголосовавший может проверить, был ли его голос учтен, и если был — все ли прошло без ошибок.

<strong>Испытания</strong>

Данная система была опробована на выборах в локальные органы самоуправления в университетах MIT, Harvard, Unversite Catholique de Louvain (25000 избирателей), University of Ottawa. 3 ноября 2009 года эта система применялась на выборах в Takoma Park, Maryland, USA.

<strong>К прочтению</strong>

[1] Ben Adida. <a href="http://groups.csail.mit.edu/cis/theses/adida-phd.pdf">Advances in Cryptographic Voting Systems</a>. MIT. (2006).
[2] Avi Rubin. <a href="http://avirubin.com/vote/op-ed.html">An Election Day clouded by doubt</a>, October 2004.
[3] Blakley, G. R. Safeguarding cryptographic keys. Proceedings of the National Computer Conference 48: 313-317, (1979).
[4] Josh D. Cohen and Michael J. Fischer. A robust and verifiable cryptographically secure election scheme. In FOCS, pages 372–382. IEEE Computer Society, 1985.
[5] S. Poblig and M. Hellman, An improved algorithm for computing logarithms over GF(p) and its cryptographic significance, IEEE, Transaction on Information Theory It-24:106-110, (1978).
[6] T. El Gamal. A Public Key Cryptosystem and a Signature Scheme Based on Discrete Logarithms. IEEE Transactions on Information Theory, 31, pg. 469-472. (1985)
[7] Презентация Jimin Park, Applied Cryptography class, Carleton University, Feb. 2011

---
layout: post
title: "Введение в параллельные вычисления"
category: Articles
summary: "Параллельной машиной называют, грубо говоря, набор процессоров, памяти и некоторые методы коммуникации между ними. Это может быть двухядерный процессор в вашем (уже не новом) ноутбуке, многопроцессорный сервер или, например, кластер (суперкомпьютер). Вы можете ничего не знать о таких компьютерах, но вы точно знаете, зачем их строят: скорость, скорость и еще раз скорость. Однако скорость - не единственное преимущество."
---
Параллельной машиной называют, грубо говоря, набор процессоров, памяти и некоторые методы коммуникации между ними. Это может быть двухядерный процессор в вашем (уже не новом) ноутбуке, многопроцессорный сервер или, например, кластер (суперкомпьютер). Вы можете ничего не знать о таких компьютерах, но вы точно знаете, зачем их строят: скорость, скорость и еще раз скорость. Однако скорость - не единственное преимущество.

После выполнения не самой тривиальной задачи по созданию такого аппарата, дизайнерам и разработчикам приходится еще думать о том, его заставить работать. Ведь приемы и алгоритмы, применяемые для старых, однопроцессорных однопотоковых машин, как правило, не подходят.

Что самое удивительное, в университетах пока не спешат переводить программы обучения в русло параллельных вычислений! При этом сегодня нужно постараться, чтобы найти компьютер с одним ядром. В моем родном Carleton University курсы по параллельным вычислениям не входят в обязательную программу Bachelor of Computer Science, и доступны лишь для тех, кто прошел основные курсы первых трех лет. На том же уровне находятся курсы по распределенным вычислениям, и некоторых могут сбить с толку.

В чем разница? В параллельных вычислениях участвует оборудование, находящееся, как правило, в одном физическом месте, они тесно соединены между собой и все параметры их работы известны программисту. В распределенных вычислениях нет тесной постоянной связи между узлами, соответственно названию, они распределены по некоторой территории и параметры работы этой системы динамичны и не всегда известны.

Классические алгоритмы, которым обучают последние пол века, уже не подойдут для параллельных систем. Как можно догадаться, алгоритм для параллельной машины называют параллельным алгоритмом. Он зачастую сильно зависит от архитектуры конкретной машины и не так универсален, как его классический предок.

Вы можете спросить: а зачем нужно было придумывать новую структуру, потом корпеть над новыми алгоритмами, и нельзя ли было продолжать ускорять обычные компьютеры? Во-первых, пока нет возможности сделать один супер-быстрый процессор, который можно было бы сравнить с современными параллельными супер-компьютерами; а если и есть, то ресурсов на это уйдет уйма. К тому же, многие задачи хорошо решаются паралелльными машинами в первую очередь благодаря такой структуре! Расчет сложных хаотических систем вроде погоды, симуляции взаимодействий элементарных частиц в физике, моделирование на нано-уровне (да, да, нанотехнологии!), data mining, криптография... список можно долго продолжать.

Для программиста, как конечного “пользователя” параллельной машины, возможны два варианта: параллельность ему может быть “видна”, а может и нет. В первом случае программист пишет программы с расчетом на архитектуру компьютера, берет в расчет параметры этой конкретной машины. Во втором программист может и не знать, что перед ним не-классический компьютер, а все его классические методы умудряются работать благодаря продуманности самой системы.

Вот пример многоядерного процессора - любимый многими SUN UltraSPARC T1/T2:

![SUN UltraSPARC T1/T2](/images/posts/ultrasparc.gif)

8 ядер, каждое поддерживает 4 (у Т1) или 8 (у Т2) аппаратных потоков (thread), что простым умножением дает нам 32/64 (соответственно) потоков в процессоре. Теоретически это означает, что такой процессор может выполнять 32/64 задачи однопотокового процессора за то же время. Но, конечно же, много ресурсов тратится на переключение между потоками и прочую “внутреннюю кухню”.

А вот, например, знаменитые крутейшие графические юниты вроде nVidia GeForce 9600 GT, на борту которого 64 ядра.

![nVidia GeForce 9600 GT](/images/posts/9600gt.png)

Последние GPU имеют до тысячи ядер! О том, почему у графических юнитов так много ядер мы поговорим чуть позже. А сейчас посмотрите лучше на пример иерархии параллельности в суперкомпьютерах:

![](/images/posts/c4b714.png)

Понятно, что набрать кучу мощных компьютеров - не проблема. Проблема заставить их работать вместе, то есть соединить в быструю сеть. Часто в таких кластерах используют высокоскоростной свитч и все компьютеры просто соединяются в быструю локальную сеть. Вот такой, например, стоит в нашем университете: 256 ядер: 64 юнита, в каждом 4 ядра по 2.2 Ггц и по 8 гигабайт ОЗУ. Для соединения используется свитч Foundry SuperX и гигабитная сеть. ОС - Linux Rocks.

Самым дорогим элементом часто является именно свитч: попробуйте найти быстрый свитч на 64 порта! Это пример одной из самых больших проблем параллельных компьютеров: скорость обмена информацией. Процессоры стали очень быстрыми, а память и шины все еще медленные. Не говоря уже о жестких дисках - по сравнению с процессорами они выглядят как орудия каменного века!

## Классификация

Давайте наконец разберемся в типах паралельных машин. Они различаются по типу памяти - общая (shared) или распределенная (distributed), и по типу управления - SIMD и MIMD. Получается, четыре типа параллельных машин.

### Общая память

Классический компьютер выглядит так:

![](/images/posts/784283.png)

И самый очевидный способ расширить эту схему с учетом нескольких процессоров таков:

![](/images/posts/2cb46c.png)

Вместо одного процессора - несколько, памяти соответственно больше, но в целом - та же схема. Получается, все процессоры делят общую память и если процессору 2 нужна какая-то информация, над которой работает процессор 3, то он получит ее из общей памяти с той же скоростью.

Вот как выглядит построенный по такой схеме Quad Pentium:

![](/images/posts/dd967b.png)

### Распределенная память

Как вы наверное и сами догадались, в этом случае у каждого процессора “своя” память (напомню, что речь идет не о внутренней памяти процессора).

Примером может служить описанный выше кластер: он по сути является кучей отдельных компьютеров, каждый из которых имеет свою память. В таком случае если процессору (или компьютеру) 2 нужна информация от компьютера 3, то это займет уже больше времени: нужно будет запросить информацию и передать ее (в случае кластера - по локальной сети). Топология сети будет влиять на скорость обмена информацией, поэтому были разработаны разные типы структур.

Самый простой вариант, который приходит на ум, это простой двумерный массив (mesh). Или куб:

![](/images/posts/pccube.png)

Похожей структурой обладает IBM Blue Gene, потомок знаменитого IBM Deep Blue, обыгравшего человека в шахматы. Похожей, потому что на самом деле Blue Gene это не куб, а тор - крайние элементы соединены. Кстати, его назвали Gene, потому что он активно применяется в генетических исследованиях.

Другая интересная структура, которая должна была придти кому-то в голову, это любимое всеми дерево:

![](/images/posts/btree.png)

Так как глубина (или высота) бинарного дерева это logn, передача информации от двух наиболее удаленных узлов будет проходить расстояние 2*logn, что очень хорошо, но такая структура все равно используется не часто. Во-первых, чтобы разделить такую сеть на две изолированные подсети достаточно разрезать один провод (помните проблему min-cut?) В случае двумерного массива нужно разрезать sqrt(n) проводов! У куба посчитайте сами. А во-вторых, через корневой узел проходит слишком много трафика!

В 80е были популярны четырехмерные гиперкубы:

![](/images/posts/hcube.png)

Это два трехмерных куба с соединенными соответственными вершинами. Строили кубы и еще большей размерности, однако сейчас почти не используются, в том числе и потому что это огромное количество проводов!

Вообще, дизайн сети для решения какой-то задачи - тема интересная. Вот, например, так называемая Omega Network:

![omega network](/images/posts/omage_network.jpg)

С памятью разобрались, теперь об управлении.

## SIMD vs. MIMD

SIMD - Singe Instruction stream, Multiple Data stream. Управляющий узел один, он отправляет инструкции всем остальным процессорам. Каждый процессор имеет свой набор данных для работы.
MIMD - Multiple Instruction stream, Multiple Data Stream. Каждый процессор имеет свой собственный управляющий юнит, каждый процессор может выполнять разные инструкции.

SIMD-системы обычно используются для конкретных задач, требующих, как правило, не столько гибкости и универсальности вычислительной машины, сколько самой вычислительной силы. Обработка медиа, научные исследования (те же симуляции и моделирование), или, например, трансформации Фурье гигантских матриц. Поэтому в графических юнитах такое бешенное количество ядер: это SIMD-системы, и по-настоящему “умный” процессор (такой, как в вашем компьютере) там как правило один: он управляет кучей простых и не-универсальных ядер.

![](/images/posts/simd_vs_mimd.png)

Так как “управляющий” процессор отправляет одни и те же инструкции всем “рабочим” процессорам, программирование таких систем требует некоторой сноровки. Вот простой пример:

    if (B == 0)
    then C = A
    else C = A/B

Начальное состоянии памяти процессоров такое:

![](/images/posts/2838f2.png)

Первая строчка выполнилась, данные считались, теперь запускается вторая строка: then

![](/images/posts/20d4af.png)

При этом второй и третий процессоры ничего не делают, потому что переменная B у них не подходит под условие. Соответственно, далее выполняется третья строка, и на этот раз “отдыхают” другие два процессора.

Примеры SIMD-машин это старые ILLiac IV, MPP, DAP, Connection Machine CM-1/2, современные векторные юниты, специфичные сопроцессоры и графические юниты вроде nVidia GPU.

MIMD-машины обладают более широким функционалом, поэтому в наших пользовательских компьютерах используются именно они. Если у вас хотя бы двухядерный процессор в лаптопе - вы счастливый обладатель MIMD-машины с общей памятью! MIMD распределенной памятью это суперкомпьютеры вроде IBM Blue Gene, о которых мы говорили выше, или кластеры.

На этом введение в тему можно считать завершенным. В следующий раз мы поговорим о том, как расчитываются скорости параллельных машин, напишем свою первую параллельную программу с использованием рекурсии, запустим ее в небольшом кластере и научимся анализировать ее скорость и ресурсоемкость.

---
title: Hyper Key и навигация через IJKL
date: 2018-01-22
layout: post
category: Notes
summary: Как превратить CapsLock в полезную Hyper Key и как сделать навигацию через буквы вместо стрелок.
cover_url: "/images/posts/karabiner.png"
---

Никита [написал](http://tonsky.me/blog/cursor-keys/) зачем и как сделать навигацию через CapsLock + I/J/K/L вместо обычных стрелок. У него Caps Lock превратился в Fn, а комбинация Fn + I/J/K/L стала стрелочками.

![](/images/posts/tonsky_remap.png)  
_Картинка из [англоязычного блога Никиты](http://tonsky.me/). Подпишитесь на него, крутейший блог с качественными статьями._

У меня немного другая конфигурация: CapsLock выполняет роль Hyper Key: комбинации command+control+option+shift (⌘⇧⌥⌃). Идея проста — шорткаты с такой комбинацией практически не встречаются «в природе» (по умолчанию), поэтому я могу спокойно вешать на Hyper+символ разные глобальные штуки.

Несколько примеров из моей текущей конфигурации:

- Hyper + D вызывает виджет [DayOne](http://dayoneapp.com/) для быстрой записи в дневник
- Hyper + T — терминал ([iTerm](https://www.iterm2.com/))
- Hyper + N — окно [nvALT](https://rakh.im/notational-velocity/)
- Hyper + M — почта ([Airmail](http://airmailapp.com/))
- Hyper + C — календарь ([Fantastical](https://flexibits.com/fantastical))
- Hyper + ←/→ прилепляет окно в левую или правую половину экрана, Hyper + ↑ разворачивает окно на весь экран, Hyper + ↓ располагает окно по центру ([BetterSnapTool](https://itunes.apple.com/us/app/bettersnaptool/id417375580?mt=12))

Чтобы сделать навигацию I/J/K/L в такой схеме нужно повесить эти кнопки на Hyper + I/J/K/L вместо Fn + I/J/K/L. 

Вот полная инструкция с нуля (macOS):

1. Установите [Karabiner Elements](https://pqrs.org/osx/karabiner/index.html).
2. Запустите и в разделе Complex Modifications нажмите Add rule,  далее среди Examples нажмите Enable рядом со строкой "Change caps_lock to command+control+option+shift".   ![](/images/posts/karabiner.png)  Супер, теперь у вас есть Hyper key.

3. [Нажмите на эту ссылку](karabiner://karabiner/assets/complex_modifications/import?url=https://rakh.im/files/hyper-ijkl-navigation.json) и импортируйте мой конфиг.
4. Включите "Change Hyper + I/J/K/L to Arrow Keys, X to forward delete". Стрелки работают!
5. По желанию можете включить еще два правила: одно добавит Home/PageUp/PageDown/End на те же стрелки, но с зажатым Fn; второе превратит Tab в Fn.

Никита также правильно советует отключить стрелки чтобы форсировать новую привычку. Используйте правила из [его конфигурации](karabiner://karabiner/assets/complex_modifications/import?url=https://s.tonsky.me/karabiner/capslock_ijkl_fn.json) чтобы сделать это.


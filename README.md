simple-round-player
===================

A simple script that finds audio tags and wraps them with a graphical round player interface

## Requirements
 * jQuery


## Installation

Install with Bower or checkout this repository.

```sh
    bower install simple-round-player
```
## How to use

To use, include the javascript file on your page and add a <code>data-srp</code> attribute to any <code>audio</code> tags. Afterwards, launch the script using the init() command.

```html
    <audio data-srp="true" src="./The Ameoba - Showtime (Intro).mp3"></audio>
```

```js
    $(function(){
        SimpleRoundPlayer.init();
    });
```

Customize the colors of the player using basic CSS. For the progress bar, which is rendered in a <code>canvas</code>, you can pass variables as an optional configuration hash :

```js
    $(function(){
        SimpleRoundPlayer.init({
            containerColor : "#ff0000",
            ringColor : "#00ff00",
            ringProgressColor : "#0000ff",
            strokeWidth : 6
        });
    });
```

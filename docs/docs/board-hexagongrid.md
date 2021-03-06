## Introduction

Hexagon grid object of Board system.

- Author: Rex
- Grid object of board

## Source code

Included in [board plugin](board.md#source-code).

## Usage

See [board examples](board.md#usage).

### Install scene plugin

Included in board plugin.

### Create instance

```javascript
var grid = scene.rexBoard.add.hexagonGrid({
    x: 0,
    y: 0,
    cellWidth: 0,
    cellHeight: 0,
    staggeraxis: 1,
    staggerindex: 1
});
```

- `x`, `y` : World position of origin tile (i.e. tileX = 0, tileY = 0)
- `cellWidth` : The width of the cell, in pixels.
- `cellHeight` : The height of the cell, in pixels.
- `staggeraxis`
    - `0`, or `y`
    - `1`, or `x`
- `staggerindex`
    - `0`, or `even`
    - `1`, or `odd`

### Get world position

```javascript
var worldX = grid.getWorldX(tileX, tileY);
var worldY = grid.getWorldY(tileX, tileY);
```

### Get tile position

```javascript
var tileX = grid.getTileX(worldX, worldY);
var tileY = grid.getTileY(worldX, worldY);
```
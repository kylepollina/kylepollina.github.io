/* grid.js */

class Grid {
    constructor(x, y, width, height, nCols, nRows) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.nCols = nCols;
        this.nRows = nRows;
        this.tileWidth = this.width / this.nCols;
        this.tileHeight = this.height / this.nRows;
        this.tiles = [];
        this.singleSelect = false;

        this.setupTiles();
    }

    setupTiles() {
        let tileNum = 0;
        for(let y = 0; y < this.nRows; y++) {
            for(let x = 0; x < this.nCols; x++) {
                let tileX = x * this.tileWidth + this.x;
                let tileY = y * this.tileHeight + this.y;
                let tile = new Tile(tileX, tileY, this.tileWidth, this.tileHeight, tileNum);
                this.tiles.push(tile);
                tileNum++;
            }
        }
    }

    resize(newXPos, newYPos, newWidth, newHeight) {
        this.x = newXPos;
        this.y = newYPos;
        this.width = newWidth;
        this.height = newHeight;
        this.tileWidth = this.width / this.nCols;
        this.tileHeight = this.height / this.nRows;

        this.resizeTiles();
    }

    resizeTiles() {
        for(let x = 0; x < this.nCols; x++) {
            for(let y = 0; y < this.nRows; y++) {
                let tileX = x * this.tileWidth + this.x;
                let tileY = y * this.tileHeight + this.y;

                let tileIndex = x + y * this.nCols;
                this.tiles[tileIndex].resize(tileX, tileY, this.tileWidth, this.tileHeight);
            }
        }
    }

    show() {
        for(let i = 0; i < this.tiles.length; i++) {
            this.tiles[i].show();
        }
    }

    getTile(x, y) {
        let index = y * this.nCols + x;
        return this.tiles[index];
    }

    getItem(x, y) {
        let index = y * this.nCols + x;
        return this.tiles[index].item;
    }
    
    setItem(x, y, item) {
        let index = y * this.nCols + x;
        this.tiles.item = item;
    }

    setSingleSelect(bool) {
        this.singleSelect = bool;
    }

    hasSelectedTiles() {
        for(let i = 0; i < this.tiles.length; i++) {
            let tile = this.tiles[i];
            if(tile.isSelected) return true;
        }
    }

    getSelectedTiles() {
        let selectedTiles = [];
        for(let i = 0; i < this.tiles.length; i++) {
            let tile = this.tiles[i];
            if(tile.isSelected) selectedTiles.push(tile);
        }
        if(selectedTiles.length <= 1) return selectedTiles[0];
        else return selectedTiles;
    }

    clearSelectedTiles() {
        for(let i = 0; i < this.tiles.length; i++) {
            this.tiles[i].isSelected = false;
        }
    }

    isMouseInside() {
        return (this.x <= mouseX && mouseX < this.x + this.width 
                && this.y <= mouseY && mouseY < this.y + this.height);
    }

    tileUnderMouse() {
        let relativeX = mouseX - this.x;
        let relativeY = mouseY - this.y;
        let col = floor(relativeX / this.tileWidth);
        let row = floor(relativeY / this.tileHeight);

        return this.getTile(col, row);
    }
}

class Tile {
    constructor(x, y, width, height, tileNum) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.centerX = this.x + this.width / 2;
        this.centerY = this.y + this.height / 2;
        this.isSelected = false;
        this.tileNum = tileNum;
        this.item = null;
    }

    resize(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.centerX = this.x + this.width / 2;
        this.centerY = this.y + this.height / 2;
    }

    setItem(item) {
        this.item = item;
    }

    isMouseInside() {
        return (this.x <= mouseX && mouseX < this.x + this.width 
                && this.y <= mouseY && mouseY < this.y + this.height);
    }

    toggleSelect() {
        if(this.isSelected) this.isSelected = false;
        else this.isSelected = true;
    }
    
    show() {
        noFill();
        rect(this.x, this.y, this.width. this.height);
    }
}

define(function () {

    function Board(model, options) {
        options = options || {};
        this.model = model;
        if (options.doRender === true) {
            this.render();
        }
    }

    function createTableHead(numCols) {
        var $thead = $('<thead>'),
            $tr = $('<tr>');

        for (var colIdx = 0; colIdx < numCols; colIdx++) {
            $tr.append($('<th>'+colIdx+'</th>'));
        }

        $thead.append($tr);

        return $thead;
    }

    Board.prototype.render = function() {
        this.$el = $('<table>');

        this.$el.append(createTableHead(this.model.size));

        for (var rowIdx = 0; rowIdx < this.model.size; rowIdx++) {
            var $tr = $('<tr>');
            this.$el.append($tr);
            for (var colIdx = 0; colIdx < this.model.size; colIdx++) {
                var tile = this.model.tiles[rowIdx][colIdx];
                $tr.append($('<td>').attr({'id': tile.id, 'class': tile.terrain.name}));
            } 
            $('body').append(this.$el);
        }

        for (var key in this.model.objects) { 
            var tokens = this.model.objects[key].split('-'),
                type = tokens[0],
                row = parseInt(tokens[1], 10),
                col = parseInt(tokens[2], 10),
                $tile = this.getTile(row, col);

                $tile.hide();
            $tile.addClass('player');
            $tile.fadeIn();
        }

        /*
        for (var rowIdx = 0; rowIdx < this.model.size; rowIdx++) {
            for (var colIdx = 0; colIdx < this.model.size; colIdx++) {
                var tile = this.model.tiles[rowIdx][colIdx];
                console.log(tile);
            } 
        }*/
    };

    Board.prototype.setModel = function(model) {
        this.model = model;
        this.render();
    };

    Board.prototype.getTile = function(row, col) {
        var selector = 'tr:nth-child({row}) td:nth-child({col})'.replace('{row}', row + 1).replace('{col}', col + 1);

        return this.$el.find(selector);
    };

    return Board;
});

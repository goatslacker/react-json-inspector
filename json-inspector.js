var React = require('react');
var D = React.DOM;

var Leaf = require('./lib/leaf');
var leaf = React.createFactory(Leaf);
var SearchBar = require('./lib/search-bar');
var searchBar = React.createFactory(SearchBar);

var filterer = require('./lib/filterer');
var isEmpty = require('./lib/is-empty');
var lens = require('./lib/lens');
var noop = require('./lib/noop');

module.exports = React.createClass({
    getDefaultProps: function() {
        return {
            data: null,
            search: searchBar,
            className: '',
            id: 'json-' + Date.now(),
            onClick: noop,
            validateQuery: function(query) {
                return query.length >= 2;
            }
        };
    },
    render: function() {
        var p = this.props;
        var data = p.data;

        var rootNode = leaf({
            data: data,
            onClick: p.onClick,
            id: p.id,
            getOriginal: this.getOriginal,
            query: '',
            label: 'root',
            isRoot: true
        });

        var notFound = D.div({ className: 'json-inspector__not-found' }, 'Nothing found');

        return D.div({ className: 'json-inspector ' + p.className },
            isEmpty(data) ? notFound : rootNode);
    },
    getOriginal: function(path) {
        return lens(this.props.data, path);
    }
});

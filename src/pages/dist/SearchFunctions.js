"use strict";
exports.__esModule = true;
exports.Trie = exports.getSuggestion = exports.findFirstOccurance = void 0;
exports.findFirstOccurance = function (searchQuery, data) {
    var low = 0;
    var high = data.length - 1;
    var searchQueryLength = searchQuery.length;
    searchQuery = searchQuery.toLocaleLowerCase();
    while (low <= high) {
        var mid = Math.floor((low + high) / 2);
        var currentMid = data[mid]
            .slice(0, searchQueryLength)
            .toLocaleLowerCase();
        if (currentMid === searchQuery) {
            return mid;
        }
        if (currentMid.localeCompare(searchQuery) !== -1) {
            high = mid - 1;
        }
        else {
            low = mid + 1;
        }
    }
    return -1;
};
exports.getSuggestion = function (searchQuery, data) {
    if (!searchQuery)
        return [];
    searchQuery = searchQuery.toLocaleLowerCase();
    var firstIndex = exports.findFirstOccurance(searchQuery, data);
    var suggestionVal = [];
    if (firstIndex >= 0) {
        suggestionVal.push(data[firstIndex]);
        var maxIndex = Math.min(firstIndex + 6, data.length);
        for (var i = firstIndex + 1; i < maxIndex; i++) {
            var current = data[i].toLocaleLowerCase();
            if (current.startsWith(searchQuery)) {
                suggestionVal.push(data[i]);
            }
            else {
                break;
            }
        }
    }
    return suggestionVal;
};
var Trie = /** @class */ (function () {
    function Trie() {
        this.trie = null;
        this.suggestions = [];
    }
    Trie.prototype.newNode = function () {
        return {
            isLeaf: false,
            children: {}
        };
    };
    Trie.prototype.add = function (word) {
        if (!this.trie)
            this.trie = this.newNode();
        var root = this.trie;
        for (var _i = 0, word_1 = word; _i < word_1.length; _i++) {
            var letter = word_1[_i];
            if (!(letter in root.children)) {
                root.children[letter] = this.newNode();
            }
            root = root.children[letter];
        }
        root.isLeaf = true;
    };
    Trie.prototype.find = function (word) {
        var root = this.trie;
        for (var _i = 0, word_2 = word; _i < word_2.length; _i++) {
            var letter = word_2[_i];
            if (letter in root.children) {
                root = root.children[letter];
            }
            else {
                return null;
            }
        }
        return root;
    };
    Trie.prototype.traverse = function (root, word) {
        if (root.isLeaf) {
            this.suggestions.push(word);
            if (Object.keys(root.children).length === 0)
                return;
        }
        for (var letter in root.children) {
            this.traverse(root.children[letter], word + letter);
        }
    };
    Trie.prototype.complete = function (word) {
        if (word === "")
            return this.suggestions; // cannot suggest anything
        var root = this.find(word);
        if (!root)
            return this.suggestions; // cannot suggest anything
        if (root.isLeaf) { // if root is leaf add to suggestion
            this.suggestions.push(word);
        }
        //now traverse the child of root and add suggestions
        var children = root.children;
        for (var letter in children) {
            this.traverse(children[letter], word + letter);
        }
        return this.suggestions;
    };
    Trie.prototype.clear = function () {
        this.suggestions = [];
    };
    Trie.prototype.print = function () {
        console.log(this.trie);
    };
    return Trie;
}());
exports.Trie = Trie;

(function($) {
    // TODO: make the node ID configurable
    var treeNode = $('#jsdoc-toc-nav');

    // initialize the tree
    treeNode.tree({
        autoEscape: false,
        closedIcon: '&#x21e2;',
        data: [{"label":"<a href=\"global.html\">Globals</a>","id":"global","children":[]},{"label":"<a href=\"AI.html\">AI</a>","id":"AI","children":[]},{"label":"<a href=\"API.html\">API</a>","id":"API","children":[]},{"label":"<a href=\"Bing.html\">Bing</a>","id":"Bing","children":[]},{"label":"<a href=\"Chess.html\">Chess</a>","id":"Chess","children":[]},{"label":"<a href=\"Client.html\">Client</a>","id":"Client","children":[]},{"label":"<a href=\"Dev.html\">Dev</a>","id":"Dev","children":[]},{"label":"<a href=\"Games.html\">Games</a>","id":"Games","children":[]},{"label":"<a href=\"General.html\">General</a>","id":"General","children":[]},{"label":"<a href=\"HuggingFace.html\">HuggingFace</a>","id":"HuggingFace","children":[]},{"label":"<a href=\"Image.html\">Image</a>","id":"Image","children":[]},{"label":"<a href=\"InfiniteCraft.html\">InfiniteCraft</a>","id":"InfiniteCraft","children":[]},{"label":"<a href=\"Monopoly.html\">Monopoly</a>","id":"Monopoly","children":[]},{"label":"<a href=\"Pokemon.html\">Pokemon</a>","id":"Pokemon","children":[]},{"label":"<a href=\"Shazam.html\">Shazam</a>","id":"Shazam","children":[]},{"label":"<a href=\"UNO.html\">UNO</a>","id":"UNO","children":[]},{"label":"<a href=\"module.html\">module</a>","id":"module","children":[{"label":"<a href=\"module.html#.exports\">exports</a>","id":"module.exports","children":[]}]}],
        openedIcon: ' &#x21e3;',
        saveState: false,
        useContextMenu: false
    });

    // add event handlers
    // TODO
})(jQuery);

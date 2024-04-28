(function($) {
    // TODO: make the node ID configurable
    var treeNode = $('#jsdoc-toc-nav');

    // initialize the tree
    treeNode.tree({
        autoEscape: false,
        closedIcon: '&#x21e2;',
        data: [{"label":"<a href=\"global.html\">Globals</a>","id":"global","children":[]},{"label":"<a href=\"module.html\">module</a>","id":"module","children":[{"label":"<a href=\"module.html#.exports\">exports</a>","id":"module.exports","children":[]}]},{"label":"<a href=\"module-AI.html\">AI</a>","id":"module:AI","children":[]}],
        openedIcon: ' &#x21e3;',
        saveState: false,
        useContextMenu: false
    });

    // add event handlers
    // TODO
})(jQuery);

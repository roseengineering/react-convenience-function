
function r(selector, attrs){
    attrs = attrs == null ? {} : attrs;
    var children,
        tag = selector;

    if (typeof attrs === 'object' && !attrs.props && !Array.isArray(attrs)){
        children = [].slice.call(arguments, 2);
    } else {
        children = [].slice.call(arguments, 1);
        attrs = {};
    }

    if (typeof selector === 'string'){
        tag = 'div';

        var parser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[.+?\])/g, 
            attrParser = /\[(.+?)(?:=("|'|)(.*?)\2)?\]/,
            match, classes = [];

        while ((match = parser.exec(selector)) != null){
            if (match[1] === '' && match[2]) tag = match[2];
            else if (match[1] === '#') attrs.id = match[2];
            else if (match[1] === '.') classes.push(match[2]);
            else if (match[3][0] === '[') {
                var pair = attrParser.exec(match[3]);
                attrs[pair[1]] = pair[3] || (pair[2] ? '' :true);
            }
        }
        if (classes.length) attrs['className'] = classes.join(' ');
    }

    return React.createElement.apply(React, [].concat(tag, attrs, children));
};


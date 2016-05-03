/*!
 * jQuery JavaScript Library v2.1.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:01Z
 */

(function( global, factory ) {

    if ( typeof module === "object" && typeof module.exports === "object" ) {
        // For CommonJS and CommonJS-like environments where a proper `window`
        // is present, execute the factory and get jQuery.
        // For environments that do not have a `window` with a `document`
        // (such as Node.js), expose a factory as module.exports.
        // This accentuates the need for the creation of a real `window`.
        // e.g. var jQuery = require("jquery")(window);
        // See ticket #14549 for more info.
        module.exports = global.document ?
            factory( global, true ) :
            function( w ) {
                if ( !w.document ) {
                    throw new Error( "jQuery requires a window with a document" );
                }
                return factory( w );
            };
    } else {
        factory( global );
    }

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//

    var arr = [];

    var slice = arr.slice;

    var concat = arr.concat;

    var push = arr.push;

    var indexOf = arr.indexOf;

    var class2type = {};

    var toString = class2type.toString;

    var hasOwn = class2type.hasOwnProperty;

    var support = {};



    var
    // Use the correct document accordingly with window argument (sandbox)
        document = window.document,

        version = "2.1.4",

    // Define a local copy of jQuery
        jQuery = function( selector, context ) {
            // The jQuery object is actually just the init constructor 'enhanced'
            // Need init if jQuery is called (just allow error to be thrown if not included)
            return new jQuery.fn.init( selector, context );
        },

    // Support: Android<4.1
    // Make sure we trim BOM and NBSP
        rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

    // Matches dashed string for camelizing
        rmsPrefix = /^-ms-/,
        rdashAlpha = /-([\da-z])/gi,

    // Used by jQuery.camelCase as callback to replace()
        fcamelCase = function( all, letter ) {
            return letter.toUpperCase();
        };

    jQuery.fn = jQuery.prototype = {
        // The current version of jQuery being used
        jquery: version,

        constructor: jQuery,

        // Start with an empty selector
        selector: "",

        // The default length of a jQuery object is 0
        length: 0,

        toArray: function() {
            return slice.call( this );
        },

        // Get the Nth element in the matched element set OR
        // Get the whole matched element set as a clean array
        get: function( num ) {
            return num != null ?

                // Return just the one element from the set
                ( num < 0 ? this[ num + this.length ] : this[ num ] ) :

                // Return all the elements in a clean array
                slice.call( this );
        },

        // Take an array of elements and push it onto the stack
        // (returning the new matched element set)
        pushStack: function( elems ) {

            // Build a new jQuery matched element set
            var ret = jQuery.merge( this.constructor(), elems );

            // Add the old object onto the stack (as a reference)
            ret.prevObject = this;
            ret.context = this.context;

            // Return the newly-formed element set
            return ret;
        },

        // Execute a callback for every element in the matched set.
        // (You can seed the arguments with an array of args, but this is
        // only used internally.)
        each: function( callback, args ) {
            return jQuery.each( this, callback, args );
        },

        map: function( callback ) {
            return this.pushStack( jQuery.map(this, function( elem, i ) {
                return callback.call( elem, i, elem );
            }));
        },

        slice: function() {
            return this.pushStack( slice.apply( this, arguments ) );
        },

        first: function() {
            return this.eq( 0 );
        },

        last: function() {
            return this.eq( -1 );
        },

        eq: function( i ) {
            var len = this.length,
                j = +i + ( i < 0 ? len : 0 );
            return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
        },

        end: function() {
            return this.prevObject || this.constructor(null);
        },

        // For internal use only.
        // Behaves like an Array's method, not like a jQuery method.
        push: push,
        sort: arr.sort,
        splice: arr.splice
    };

    jQuery.extend = jQuery.fn.extend = function() {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if ( typeof target === "boolean" ) {
            deep = target;

            // Skip the boolean and the target
            target = arguments[ i ] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
            target = {};
        }

        // Extend jQuery itself if only one argument is passed
        if ( i === length ) {
            target = this;
            i--;
        }

        for ( ; i < length; i++ ) {
            // Only deal with non-null/undefined values
            if ( (options = arguments[ i ]) != null ) {
                // Extend the base object
                for ( name in options ) {
                    src = target[ name ];
                    copy = options[ name ];

                    // Prevent never-ending loop
                    if ( target === copy ) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
                        if ( copyIsArray ) {
                            copyIsArray = false;
                            clone = src && jQuery.isArray(src) ? src : [];

                        } else {
                            clone = src && jQuery.isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[ name ] = jQuery.extend( deep, clone, copy );

                        // Don't bring in undefined values
                    } else if ( copy !== undefined ) {
                        target[ name ] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    };

    jQuery.extend({
        // Unique for each copy of jQuery on the page
        expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

        // Assume jQuery is ready without the ready module
        isReady: true,

        error: function( msg ) {
            throw new Error( msg );
        },

        noop: function() {},

        isFunction: function( obj ) {
            return jQuery.type(obj) === "function";
        },

        isArray: Array.isArray,

        isWindow: function( obj ) {
            return obj != null && obj === obj.window;
        },

        isNumeric: function( obj ) {
            // parseFloat NaNs numeric-cast false positives (null|true|false|"")
            // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
            // subtraction forces infinities to NaN
            // adding 1 corrects loss of precision from parseFloat (#15100)
            return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
        },

        isPlainObject: function( obj ) {
            // Not plain objects:
            // - Any object or value whose internal [[Class]] property is not "[object Object]"
            // - DOM nodes
            // - window
            if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
                return false;
            }

            if ( obj.constructor &&
                !hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
                return false;
            }

            // If the function hasn't returned already, we're confident that
            // |obj| is a plain object, created by {} or constructed with new Object
            return true;
        },

        isEmptyObject: function( obj ) {
            var name;
            for ( name in obj ) {
                return false;
            }
            return true;
        },

        type: function( obj ) {
            if ( obj == null ) {
                return obj + "";
            }
            // Support: Android<4.0, iOS<6 (functionish RegExp)
            return typeof obj === "object" || typeof obj === "function" ?
            class2type[ toString.call(obj) ] || "object" :
                typeof obj;
        },

        // Evaluates a script in a global context
        globalEval: function( code ) {
            var script,
                indirect = eval;

            code = jQuery.trim( code );

            if ( code ) {
                // If the code includes a valid, prologue position
                // strict mode pragma, execute code by injecting a
                // script tag into the document.
                if ( code.indexOf("use strict") === 1 ) {
                    script = document.createElement("script");
                    script.text = code;
                    document.head.appendChild( script ).parentNode.removeChild( script );
                } else {
                    // Otherwise, avoid the DOM node creation, insertion
                    // and removal by using an indirect global eval
                    indirect( code );
                }
            }
        },

        // Convert dashed to camelCase; used by the css and data modules
        // Support: IE9-11+
        // Microsoft forgot to hump their vendor prefix (#9572)
        camelCase: function( string ) {
            return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
        },

        nodeName: function( elem, name ) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },

        // args is for internal usage only
        each: function( obj, callback, args ) {
            var value,
                i = 0,
                length = obj.length,
                isArray = isArraylike( obj );

            if ( args ) {
                if ( isArray ) {
                    for ( ; i < length; i++ ) {
                        value = callback.apply( obj[ i ], args );

                        if ( value === false ) {
                            break;
                        }
                    }
                } else {
                    for ( i in obj ) {
                        value = callback.apply( obj[ i ], args );

                        if ( value === false ) {
                            break;
                        }
                    }
                }

                // A special, fast, case for the most common use of each
            } else {
                if ( isArray ) {
                    for ( ; i < length; i++ ) {
                        value = callback.call( obj[ i ], i, obj[ i ] );

                        if ( value === false ) {
                            break;
                        }
                    }
                } else {
                    for ( i in obj ) {
                        value = callback.call( obj[ i ], i, obj[ i ] );

                        if ( value === false ) {
                            break;
                        }
                    }
                }
            }

            return obj;
        },

        // Support: Android<4.1
        trim: function( text ) {
            return text == null ?
                "" :
                ( text + "" ).replace( rtrim, "" );
        },

        // results is for internal usage only
        makeArray: function( arr, results ) {
            var ret = results || [];

            if ( arr != null ) {
                if ( isArraylike( Object(arr) ) ) {
                    jQuery.merge( ret,
                        typeof arr === "string" ?
                            [ arr ] : arr
                    );
                } else {
                    push.call( ret, arr );
                }
            }

            return ret;
        },

        inArray: function( elem, arr, i ) {
            return arr == null ? -1 : indexOf.call( arr, elem, i );
        },

        merge: function( first, second ) {
            var len = +second.length,
                j = 0,
                i = first.length;

            for ( ; j < len; j++ ) {
                first[ i++ ] = second[ j ];
            }

            first.length = i;

            return first;
        },

        grep: function( elems, callback, invert ) {
            var callbackInverse,
                matches = [],
                i = 0,
                length = elems.length,
                callbackExpect = !invert;

            // Go through the array, only saving the items
            // that pass the validator function
            for ( ; i < length; i++ ) {
                callbackInverse = !callback( elems[ i ], i );
                if ( callbackInverse !== callbackExpect ) {
                    matches.push( elems[ i ] );
                }
            }

            return matches;
        },

        // arg is for internal usage only
        map: function( elems, callback, arg ) {
            var value,
                i = 0,
                length = elems.length,
                isArray = isArraylike( elems ),
                ret = [];

            // Go through the array, translating each of the items to their new values
            if ( isArray ) {
                for ( ; i < length; i++ ) {
                    value = callback( elems[ i ], i, arg );

                    if ( value != null ) {
                        ret.push( value );
                    }
                }

                // Go through every key on the object,
            } else {
                for ( i in elems ) {
                    value = callback( elems[ i ], i, arg );

                    if ( value != null ) {
                        ret.push( value );
                    }
                }
            }

            // Flatten any nested arrays
            return concat.apply( [], ret );
        },

        // A global GUID counter for objects
        guid: 1,

        // Bind a function to a context, optionally partially applying any
        // arguments.
        proxy: function( fn, context ) {
            var tmp, args, proxy;

            if ( typeof context === "string" ) {
                tmp = fn[ context ];
                context = fn;
                fn = tmp;
            }

            // Quick check to determine if target is callable, in the spec
            // this throws a TypeError, but we will just return undefined.
            if ( !jQuery.isFunction( fn ) ) {
                return undefined;
            }

            // Simulated bind
            args = slice.call( arguments, 2 );
            proxy = function() {
                return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
            };

            // Set the guid of unique handler to the same of original handler, so it can be removed
            proxy.guid = fn.guid = fn.guid || jQuery.guid++;

            return proxy;
        },

        now: Date.now,

        // jQuery.support is not used in Core but other projects attach their
        // properties to it so it needs to exist.
        support: support
    });

// Populate the class2type map
    jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
        class2type[ "[object " + name + "]" ] = name.toLowerCase();
    });

    function isArraylike( obj ) {

        // Support: iOS 8.2 (not reproducible in simulator)
        // `in` check used to prevent JIT error (gh-2145)
        // hasOwn isn't used here due to false negatives
        // regarding Nodelist length in IE
        var length = "length" in obj && obj.length,
            type = jQuery.type( obj );

        if ( type === "function" || jQuery.isWindow( obj ) ) {
            return false;
        }

        if ( obj.nodeType === 1 && length ) {
            return true;
        }

        return type === "array" || length === 0 ||
            typeof length === "number" && length > 0 && ( length - 1 ) in obj;
    }
    var Sizzle =
        /*!
         * Sizzle CSS Selector Engine v2.2.0-pre
         * http://sizzlejs.com/
         *
         * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
         * Released under the MIT license
         * http://jquery.org/license
         *
         * Date: 2014-12-16
         */
        (function( window ) {

            var i,
                support,
                Expr,
                getText,
                isXML,
                tokenize,
                compile,
                select,
                outermostContext,
                sortInput,
                hasDuplicate,

            // Local document vars
                setDocument,
                document,
                docElem,
                documentIsHTML,
                rbuggyQSA,
                rbuggyMatches,
                matches,
                contains,

            // Instance-specific data
                expando = "sizzle" + 1 * new Date(),
                preferredDoc = window.document,
                dirruns = 0,
                done = 0,
                classCache = createCache(),
                tokenCache = createCache(),
                compilerCache = createCache(),
                sortOrder = function( a, b ) {
                    if ( a === b ) {
                        hasDuplicate = true;
                    }
                    return 0;
                },

            // General-purpose constants
                MAX_NEGATIVE = 1 << 31,

            // Instance methods
                hasOwn = ({}).hasOwnProperty,
                arr = [],
                pop = arr.pop,
                push_native = arr.push,
                push = arr.push,
                slice = arr.slice,
            // Use a stripped-down indexOf as it's faster than native
            // http://jsperf.com/thor-indexof-vs-for/5
                indexOf = function( list, elem ) {
                    var i = 0,
                        len = list.length;
                    for ( ; i < len; i++ ) {
                        if ( list[i] === elem ) {
                            return i;
                        }
                    }
                    return -1;
                },

                booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

            // Regular expressions

            // Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
                whitespace = "[\\x20\\t\\r\\n\\f]",
            // http://www.w3.org/TR/css3-syntax/#characters
                characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

            // Loosely modeled on CSS identifier characters
            // An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
            // Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
                identifier = characterEncoding.replace( "w", "w#" ),

            // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
                attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
                        // Operator (capture 2)
                    "*([*^$|!~]?=)" + whitespace +
                        // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
                    "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
                    "*\\]",

                pseudos = ":(" + characterEncoding + ")(?:\\((" +
                        // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
                        // 1. quoted (capture 3; capture 4 or capture 5)
                    "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
                        // 2. simple (capture 6)
                    "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
                        // 3. anything else (capture 2)
                    ".*" +
                    ")\\)|)",

            // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
                rwhitespace = new RegExp( whitespace + "+", "g" ),
                rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

                rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
                rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

                rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

                rpseudo = new RegExp( pseudos ),
                ridentifier = new RegExp( "^" + identifier + "$" ),

                matchExpr = {
                    "ID": new RegExp( "^#(" + characterEncoding + ")" ),
                    "CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
                    "TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
                    "ATTR": new RegExp( "^" + attributes ),
                    "PSEUDO": new RegExp( "^" + pseudos ),
                    "CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
                    "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
                    "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
                    "bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
                    // For use in libraries implementing .is()
                    // We use this for POS matching in `select`
                    "needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                    whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
                },

                rinputs = /^(?:input|select|textarea|button)$/i,
                rheader = /^h\d$/i,

                rnative = /^[^{]+\{\s*\[native \w/,

            // Easily-parseable/retrievable ID or TAG or CLASS selectors
                rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

                rsibling = /[+~]/,
                rescape = /'|\\/g,

            // CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
                runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
                funescape = function( _, escaped, escapedWhitespace ) {
                    var high = "0x" + escaped - 0x10000;
                    // NaN means non-codepoint
                    // Support: Firefox<24
                    // Workaround erroneous numeric interpretation of +"0x"
                    return high !== high || escapedWhitespace ?
                        escaped :
                        high < 0 ?
                            // BMP codepoint
                            String.fromCharCode( high + 0x10000 ) :
                            // Supplemental Plane codepoint (surrogate pair)
                            String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
                },

            // Used for iframes
            // See setDocument()
            // Removing the function wrapper causes a "Permission Denied"
            // error in IE
                unloadHandler = function() {
                    setDocument();
                };

// Optimize for push.apply( _, NodeList )
            try {
                push.apply(
                    (arr = slice.call( preferredDoc.childNodes )),
                    preferredDoc.childNodes
                );
                // Support: Android<4.0
                // Detect silently failing push.apply
                arr[ preferredDoc.childNodes.length ].nodeType;
            } catch ( e ) {
                push = { apply: arr.length ?

                    // Leverage slice if possible
                    function( target, els ) {
                        push_native.apply( target, slice.call(els) );
                    } :

                    // Support: IE<9
                    // Otherwise append directly
                    function( target, els ) {
                        var j = target.length,
                            i = 0;
                        // Can't trust NodeList.length
                        while ( (target[j++] = els[i++]) ) {}
                        target.length = j - 1;
                    }
                };
            }

            function Sizzle( selector, context, results, seed ) {
                var match, elem, m, nodeType,
                // QSA vars
                    i, groups, old, nid, newContext, newSelector;

                if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
                    setDocument( context );
                }

                context = context || document;
                results = results || [];
                nodeType = context.nodeType;

                if ( typeof selector !== "string" || !selector ||
                    nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

                    return results;
                }

                if ( !seed && documentIsHTML ) {

                    // Try to shortcut find operations when possible (e.g., not under DocumentFragment)
                    if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
                        // Speed-up: Sizzle("#ID")
                        if ( (m = match[1]) ) {
                            if ( nodeType === 9 ) {
                                elem = context.getElementById( m );
                                // Check parentNode to catch when Blackberry 4.6 returns
                                // nodes that are no longer in the document (jQuery #6963)
                                if ( elem && elem.parentNode ) {
                                    // Handle the case where IE, Opera, and Webkit return items
                                    // by name instead of ID
                                    if ( elem.id === m ) {
                                        results.push( elem );
                                        return results;
                                    }
                                } else {
                                    return results;
                                }
                            } else {
                                // Context is not a document
                                if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
                                    contains( context, elem ) && elem.id === m ) {
                                    results.push( elem );
                                    return results;
                                }
                            }

                            // Speed-up: Sizzle("TAG")
                        } else if ( match[2] ) {
                            push.apply( results, context.getElementsByTagName( selector ) );
                            return results;

                            // Speed-up: Sizzle(".CLASS")
                        } else if ( (m = match[3]) && support.getElementsByClassName ) {
                            push.apply( results, context.getElementsByClassName( m ) );
                            return results;
                        }
                    }

                    // QSA path
                    if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
                        nid = old = expando;
                        newContext = context;
                        newSelector = nodeType !== 1 && selector;

                        // qSA works strangely on Element-rooted queries
                        // We can work around this by specifying an extra ID on the root
                        // and working up from there (Thanks to Andrew Dupont for the technique)
                        // IE 8 doesn't work on object elements
                        if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
                            groups = tokenize( selector );

                            if ( (old = context.getAttribute("id")) ) {
                                nid = old.replace( rescape, "\\$&" );
                            } else {
                                context.setAttribute( "id", nid );
                            }
                            nid = "[id='" + nid + "'] ";

                            i = groups.length;
                            while ( i-- ) {
                                groups[i] = nid + toSelector( groups[i] );
                            }
                            newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
                            newSelector = groups.join(",");
                        }

                        if ( newSelector ) {
                            try {
                                push.apply( results,
                                    newContext.querySelectorAll( newSelector )
                                );
                                return results;
                            } catch(qsaError) {
                            } finally {
                                if ( !old ) {
                                    context.removeAttribute("id");
                                }
                            }
                        }
                    }
                }

                // All others
                return select( selector.replace( rtrim, "$1" ), context, results, seed );
            }

            /**
             * Create key-value caches of limited size
             * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
             *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
             *	deleting the oldest entry
             */
            function createCache() {
                var keys = [];

                function cache( key, value ) {
                    // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
                    if ( keys.push( key + " " ) > Expr.cacheLength ) {
                        // Only keep the most recent entries
                        delete cache[ keys.shift() ];
                    }
                    return (cache[ key + " " ] = value);
                }
                return cache;
            }

            /**
             * Mark a function for special use by Sizzle
             * @param {Function} fn The function to mark
             */
            function markFunction( fn ) {
                fn[ expando ] = true;
                return fn;
            }

            /**
             * Support testing using an element
             * @param {Function} fn Passed the created div and expects a boolean result
             */
            function assert( fn ) {
                var div = document.createElement("div");

                try {
                    return !!fn( div );
                } catch (e) {
                    return false;
                } finally {
                    // Remove from its parent by default
                    if ( div.parentNode ) {
                        div.parentNode.removeChild( div );
                    }
                    // release memory in IE
                    div = null;
                }
            }

            /**
             * Adds the same handler for all of the specified attrs
             * @param {String} attrs Pipe-separated list of attributes
             * @param {Function} handler The method that will be applied
             */
            function addHandle( attrs, handler ) {
                var arr = attrs.split("|"),
                    i = attrs.length;

                while ( i-- ) {
                    Expr.attrHandle[ arr[i] ] = handler;
                }
            }

            /**
             * Checks document order of two siblings
             * @param {Element} a
             * @param {Element} b
             * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
             */
            function siblingCheck( a, b ) {
                var cur = b && a,
                    diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
                        ( ~b.sourceIndex || MAX_NEGATIVE ) -
                        ( ~a.sourceIndex || MAX_NEGATIVE );

                // Use IE sourceIndex if available on both nodes
                if ( diff ) {
                    return diff;
                }

                // Check if b follows a
                if ( cur ) {
                    while ( (cur = cur.nextSibling) ) {
                        if ( cur === b ) {
                            return -1;
                        }
                    }
                }

                return a ? 1 : -1;
            }

            /**
             * Returns a function to use in pseudos for input types
             * @param {String} type
             */
            function createInputPseudo( type ) {
                return function( elem ) {
                    var name = elem.nodeName.toLowerCase();
                    return name === "input" && elem.type === type;
                };
            }

            /**
             * Returns a function to use in pseudos for buttons
             * @param {String} type
             */
            function createButtonPseudo( type ) {
                return function( elem ) {
                    var name = elem.nodeName.toLowerCase();
                    return (name === "input" || name === "button") && elem.type === type;
                };
            }

            /**
             * Returns a function to use in pseudos for positionals
             * @param {Function} fn
             */
            function createPositionalPseudo( fn ) {
                return markFunction(function( argument ) {
                    argument = +argument;
                    return markFunction(function( seed, matches ) {
                        var j,
                            matchIndexes = fn( [], seed.length, argument ),
                            i = matchIndexes.length;

                        // Match elements found at the specified indexes
                        while ( i-- ) {
                            if ( seed[ (j = matchIndexes[i]) ] ) {
                                seed[j] = !(matches[j] = seed[j]);
                            }
                        }
                    });
                });
            }

            /**
             * Checks a node for validity as a Sizzle context
             * @param {Element|Object=} context
             * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
             */
            function testContext( context ) {
                return context && typeof context.getElementsByTagName !== "undefined" && context;
            }

// Expose support vars for convenience
            support = Sizzle.support = {};

            /**
             * Detects XML nodes
             * @param {Element|Object} elem An element or a document
             * @returns {Boolean} True iff elem is a non-HTML XML node
             */
            isXML = Sizzle.isXML = function( elem ) {
                // documentElement is verified for cases where it doesn't yet exist
                // (such as loading iframes in IE - #4833)
                var documentElement = elem && (elem.ownerDocument || elem).documentElement;
                return documentElement ? documentElement.nodeName !== "HTML" : false;
            };

            /**
             * Sets document-related variables once based on the current document
             * @param {Element|Object} [doc] An element or document object to use to set the document
             * @returns {Object} Returns the current document
             */
            setDocument = Sizzle.setDocument = function( node ) {
                var hasCompare, parent,
                    doc = node ? node.ownerDocument || node : preferredDoc;

                // If no document and documentElement is available, return
                if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
                    return document;
                }

                // Set our document
                document = doc;
                docElem = doc.documentElement;
                parent = doc.defaultView;

                // Support: IE>8
                // If iframe document is assigned to "document" variable and if iframe has been reloaded,
                // IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
                // IE6-8 do not support the defaultView property so parent will be undefined
                if ( parent && parent !== parent.top ) {
                    // IE11 does not have attachEvent, so all must suffer
                    if ( parent.addEventListener ) {
                        parent.addEventListener( "unload", unloadHandler, false );
                    } else if ( parent.attachEvent ) {
                        parent.attachEvent( "onunload", unloadHandler );
                    }
                }

                /* Support tests
                 ---------------------------------------------------------------------- */
                documentIsHTML = !isXML( doc );

                /* Attributes
                 ---------------------------------------------------------------------- */

                // Support: IE<8
                // Verify that getAttribute really returns attributes and not properties
                // (excepting IE8 booleans)
                support.attributes = assert(function( div ) {
                    div.className = "i";
                    return !div.getAttribute("className");
                });

                /* getElement(s)By*
                 ---------------------------------------------------------------------- */

                // Check if getElementsByTagName("*") returns only elements
                support.getElementsByTagName = assert(function( div ) {
                    div.appendChild( doc.createComment("") );
                    return !div.getElementsByTagName("*").length;
                });

                // Support: IE<9
                support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

                // Support: IE<10
                // Check if getElementById returns elements by name
                // The broken getElementById methods don't pick up programatically-set names,
                // so use a roundabout getElementsByName test
                support.getById = assert(function( div ) {
                    docElem.appendChild( div ).id = expando;
                    return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
                });

                // ID find and filter
                if ( support.getById ) {
                    Expr.find["ID"] = function( id, context ) {
                        if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
                            var m = context.getElementById( id );
                            // Check parentNode to catch when Blackberry 4.6 returns
                            // nodes that are no longer in the document #6963
                            return m && m.parentNode ? [ m ] : [];
                        }
                    };
                    Expr.filter["ID"] = function( id ) {
                        var attrId = id.replace( runescape, funescape );
                        return function( elem ) {
                            return elem.getAttribute("id") === attrId;
                        };
                    };
                } else {
                    // Support: IE6/7
                    // getElementById is not reliable as a find shortcut
                    delete Expr.find["ID"];

                    Expr.filter["ID"] =  function( id ) {
                        var attrId = id.replace( runescape, funescape );
                        return function( elem ) {
                            var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
                            return node && node.value === attrId;
                        };
                    };
                }

                // Tag
                Expr.find["TAG"] = support.getElementsByTagName ?
                    function( tag, context ) {
                        if ( typeof context.getElementsByTagName !== "undefined" ) {
                            return context.getElementsByTagName( tag );

                            // DocumentFragment nodes don't have gEBTN
                        } else if ( support.qsa ) {
                            return context.querySelectorAll( tag );
                        }
                    } :

                    function( tag, context ) {
                        var elem,
                            tmp = [],
                            i = 0,
                        // By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
                            results = context.getElementsByTagName( tag );

                        // Filter out possible comments
                        if ( tag === "*" ) {
                            while ( (elem = results[i++]) ) {
                                if ( elem.nodeType === 1 ) {
                                    tmp.push( elem );
                                }
                            }

                            return tmp;
                        }
                        return results;
                    };

                // Class
                Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
                    if ( documentIsHTML ) {
                        return context.getElementsByClassName( className );
                    }
                };

                /* QSA/matchesSelector
                 ---------------------------------------------------------------------- */

                // QSA and matchesSelector support

                // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
                rbuggyMatches = [];

                // qSa(:focus) reports false when true (Chrome 21)
                // We allow this because of a bug in IE8/9 that throws an error
                // whenever `document.activeElement` is accessed on an iframe
                // So, we allow :focus to pass through QSA all the time to avoid the IE error
                // See http://bugs.jquery.com/ticket/13378
                rbuggyQSA = [];

                if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
                    // Build QSA regex
                    // Regex strategy adopted from Diego Perini
                    assert(function( div ) {
                        // Select is set to empty string on purpose
                        // This is to test IE's treatment of not explicitly
                        // setting a boolean content attribute,
                        // since its presence should be enough
                        // http://bugs.jquery.com/ticket/12359
                        docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
                        "<select id='" + expando + "-\f]' msallowcapture=''>" +
                        "<option selected=''></option></select>";

                        // Support: IE8, Opera 11-12.16
                        // Nothing should be selected when empty strings follow ^= or $= or *=
                        // The test attribute must be unknown in Opera but "safe" for WinRT
                        // http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
                        if ( div.querySelectorAll("[msallowcapture^='']").length ) {
                            rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
                        }

                        // Support: IE8
                        // Boolean attributes and "value" are not treated correctly
                        if ( !div.querySelectorAll("[selected]").length ) {
                            rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
                        }

                        // Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
                        if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
                            rbuggyQSA.push("~=");
                        }

                        // Webkit/Opera - :checked should return selected option elements
                        // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                        // IE8 throws error here and will not see later tests
                        if ( !div.querySelectorAll(":checked").length ) {
                            rbuggyQSA.push(":checked");
                        }

                        // Support: Safari 8+, iOS 8+
                        // https://bugs.webkit.org/show_bug.cgi?id=136851
                        // In-page `selector#id sibing-combinator selector` fails
                        if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
                            rbuggyQSA.push(".#.+[+~]");
                        }
                    });

                    assert(function( div ) {
                        // Support: Windows 8 Native Apps
                        // The type and name attributes are restricted during .innerHTML assignment
                        var input = doc.createElement("input");
                        input.setAttribute( "type", "hidden" );
                        div.appendChild( input ).setAttribute( "name", "D" );

                        // Support: IE8
                        // Enforce case-sensitivity of name attribute
                        if ( div.querySelectorAll("[name=d]").length ) {
                            rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
                        }

                        // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
                        // IE8 throws error here and will not see later tests
                        if ( !div.querySelectorAll(":enabled").length ) {
                            rbuggyQSA.push( ":enabled", ":disabled" );
                        }

                        // Opera 10-11 does not throw on post-comma invalid pseudos
                        div.querySelectorAll("*,:x");
                        rbuggyQSA.push(",.*:");
                    });
                }

                if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
                    docElem.webkitMatchesSelector ||
                    docElem.mozMatchesSelector ||
                    docElem.oMatchesSelector ||
                    docElem.msMatchesSelector) )) ) {

                    assert(function( div ) {
                        // Check to see if it's possible to do matchesSelector
                        // on a disconnected node (IE 9)
                        support.disconnectedMatch = matches.call( div, "div" );

                        // This should fail with an exception
                        // Gecko does not error, returns false instead
                        matches.call( div, "[s!='']:x" );
                        rbuggyMatches.push( "!=", pseudos );
                    });
                }

                rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
                rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

                /* Contains
                 ---------------------------------------------------------------------- */
                hasCompare = rnative.test( docElem.compareDocumentPosition );

                // Element contains another
                // Purposefully does not implement inclusive descendent
                // As in, an element does not contain itself
                contains = hasCompare || rnative.test( docElem.contains ) ?
                    function( a, b ) {
                        var adown = a.nodeType === 9 ? a.documentElement : a,
                            bup = b && b.parentNode;
                        return a === bup || !!( bup && bup.nodeType === 1 && (
                                adown.contains ?
                                    adown.contains( bup ) :
                                a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
                            ));
                    } :
                    function( a, b ) {
                        if ( b ) {
                            while ( (b = b.parentNode) ) {
                                if ( b === a ) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    };

                /* Sorting
                 ---------------------------------------------------------------------- */

                // Document order sorting
                sortOrder = hasCompare ?
                    function( a, b ) {

                        // Flag for duplicate removal
                        if ( a === b ) {
                            hasDuplicate = true;
                            return 0;
                        }

                        // Sort on method existence if only one input has compareDocumentPosition
                        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                        if ( compare ) {
                            return compare;
                        }

                        // Calculate position if both inputs belong to the same document
                        compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
                            a.compareDocumentPosition( b ) :

                            // Otherwise we know they are disconnected
                            1;

                        // Disconnected nodes
                        if ( compare & 1 ||
                            (!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

                            // Choose the first element that is related to our preferred document
                            if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
                                return -1;
                            }
                            if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
                                return 1;
                            }

                            // Maintain original order
                            return sortInput ?
                                ( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
                                0;
                        }

                        return compare & 4 ? -1 : 1;
                    } :
                    function( a, b ) {
                        // Exit early if the nodes are identical
                        if ( a === b ) {
                            hasDuplicate = true;
                            return 0;
                        }

                        var cur,
                            i = 0,
                            aup = a.parentNode,
                            bup = b.parentNode,
                            ap = [ a ],
                            bp = [ b ];

                        // Parentless nodes are either documents or disconnected
                        if ( !aup || !bup ) {
                            return a === doc ? -1 :
                                b === doc ? 1 :
                                    aup ? -1 :
                                        bup ? 1 :
                                            sortInput ?
                                                ( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
                                                0;

                            // If the nodes are siblings, we can do a quick check
                        } else if ( aup === bup ) {
                            return siblingCheck( a, b );
                        }

                        // Otherwise we need full lists of their ancestors for comparison
                        cur = a;
                        while ( (cur = cur.parentNode) ) {
                            ap.unshift( cur );
                        }
                        cur = b;
                        while ( (cur = cur.parentNode) ) {
                            bp.unshift( cur );
                        }

                        // Walk down the tree looking for a discrepancy
                        while ( ap[i] === bp[i] ) {
                            i++;
                        }

                        return i ?
                            // Do a sibling check if the nodes have a common ancestor
                            siblingCheck( ap[i], bp[i] ) :

                            // Otherwise nodes in our document sort first
                            ap[i] === preferredDoc ? -1 :
                                bp[i] === preferredDoc ? 1 :
                                    0;
                    };

                return doc;
            };

            Sizzle.matches = function( expr, elements ) {
                return Sizzle( expr, null, null, elements );
            };

            Sizzle.matchesSelector = function( elem, expr ) {
                // Set document vars if needed
                if ( ( elem.ownerDocument || elem ) !== document ) {
                    setDocument( elem );
                }

                // Make sure that attribute selectors are quoted
                expr = expr.replace( rattributeQuotes, "='$1']" );

                if ( support.matchesSelector && documentIsHTML &&
                    ( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
                    ( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

                    try {
                        var ret = matches.call( elem, expr );

                        // IE 9's matchesSelector returns false on disconnected nodes
                        if ( ret || support.disconnectedMatch ||
                                // As well, disconnected nodes are said to be in a document
                                // fragment in IE 9
                            elem.document && elem.document.nodeType !== 11 ) {
                            return ret;
                        }
                    } catch (e) {}
                }

                return Sizzle( expr, document, null, [ elem ] ).length > 0;
            };

            Sizzle.contains = function( context, elem ) {
                // Set document vars if needed
                if ( ( context.ownerDocument || context ) !== document ) {
                    setDocument( context );
                }
                return contains( context, elem );
            };

            Sizzle.attr = function( elem, name ) {
                // Set document vars if needed
                if ( ( elem.ownerDocument || elem ) !== document ) {
                    setDocument( elem );
                }

                var fn = Expr.attrHandle[ name.toLowerCase() ],
                // Don't get fooled by Object.prototype properties (jQuery #13807)
                    val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
                        fn( elem, name, !documentIsHTML ) :
                        undefined;

                return val !== undefined ?
                    val :
                    support.attributes || !documentIsHTML ?
                        elem.getAttribute( name ) :
                        (val = elem.getAttributeNode(name)) && val.specified ?
                            val.value :
                            null;
            };

            Sizzle.error = function( msg ) {
                throw new Error( "Syntax error, unrecognized expression: " + msg );
            };

            /**
             * Document sorting and removing duplicates
             * @param {ArrayLike} results
             */
            Sizzle.uniqueSort = function( results ) {
                var elem,
                    duplicates = [],
                    j = 0,
                    i = 0;

                // Unless we *know* we can detect duplicates, assume their presence
                hasDuplicate = !support.detectDuplicates;
                sortInput = !support.sortStable && results.slice( 0 );
                results.sort( sortOrder );

                if ( hasDuplicate ) {
                    while ( (elem = results[i++]) ) {
                        if ( elem === results[ i ] ) {
                            j = duplicates.push( i );
                        }
                    }
                    while ( j-- ) {
                        results.splice( duplicates[ j ], 1 );
                    }
                }

                // Clear input after sorting to release objects
                // See https://github.com/jquery/sizzle/pull/225
                sortInput = null;

                return results;
            };

            /**
             * Utility function for retrieving the text value of an array of DOM nodes
             * @param {Array|Element} elem
             */
            getText = Sizzle.getText = function( elem ) {
                var node,
                    ret = "",
                    i = 0,
                    nodeType = elem.nodeType;

                if ( !nodeType ) {
                    // If no nodeType, this is expected to be an array
                    while ( (node = elem[i++]) ) {
                        // Do not traverse comment nodes
                        ret += getText( node );
                    }
                } else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
                    // Use textContent for elements
                    // innerText usage removed for consistency of new lines (jQuery #11153)
                    if ( typeof elem.textContent === "string" ) {
                        return elem.textContent;
                    } else {
                        // Traverse its children
                        for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
                            ret += getText( elem );
                        }
                    }
                } else if ( nodeType === 3 || nodeType === 4 ) {
                    return elem.nodeValue;
                }
                // Do not include comment or processing instruction nodes

                return ret;
            };

            Expr = Sizzle.selectors = {

                // Can be adjusted by the user
                cacheLength: 50,

                createPseudo: markFunction,

                match: matchExpr,

                attrHandle: {},

                find: {},

                relative: {
                    ">": { dir: "parentNode", first: true },
                    " ": { dir: "parentNode" },
                    "+": { dir: "previousSibling", first: true },
                    "~": { dir: "previousSibling" }
                },

                preFilter: {
                    "ATTR": function( match ) {
                        match[1] = match[1].replace( runescape, funescape );

                        // Move the given value to match[3] whether quoted or unquoted
                        match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

                        if ( match[2] === "~=" ) {
                            match[3] = " " + match[3] + " ";
                        }

                        return match.slice( 0, 4 );
                    },

                    "CHILD": function( match ) {
                        /* matches from matchExpr["CHILD"]
                         1 type (only|nth|...)
                         2 what (child|of-type)
                         3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
                         4 xn-component of xn+y argument ([+-]?\d*n|)
                         5 sign of xn-component
                         6 x of xn-component
                         7 sign of y-component
                         8 y of y-component
                         */
                        match[1] = match[1].toLowerCase();

                        if ( match[1].slice( 0, 3 ) === "nth" ) {
                            // nth-* requires argument
                            if ( !match[3] ) {
                                Sizzle.error( match[0] );
                            }

                            // numeric x and y parameters for Expr.filter.CHILD
                            // remember that false/true cast respectively to 0/1
                            match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
                            match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

                            // other types prohibit arguments
                        } else if ( match[3] ) {
                            Sizzle.error( match[0] );
                        }

                        return match;
                    },

                    "PSEUDO": function( match ) {
                        var excess,
                            unquoted = !match[6] && match[2];

                        if ( matchExpr["CHILD"].test( match[0] ) ) {
                            return null;
                        }

                        // Accept quoted arguments as-is
                        if ( match[3] ) {
                            match[2] = match[4] || match[5] || "";

                            // Strip excess characters from unquoted arguments
                        } else if ( unquoted && rpseudo.test( unquoted ) &&
                                // Get excess from tokenize (recursively)
                            (excess = tokenize( unquoted, true )) &&
                                // advance to the next closing parenthesis
                            (excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

                            // excess is a negative index
                            match[0] = match[0].slice( 0, excess );
                            match[2] = unquoted.slice( 0, excess );
                        }

                        // Return only captures needed by the pseudo filter method (type and argument)
                        return match.slice( 0, 3 );
                    }
                },

                filter: {

                    "TAG": function( nodeNameSelector ) {
                        var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
                        return nodeNameSelector === "*" ?
                            function() { return true; } :
                            function( elem ) {
                                return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                            };
                    },

                    "CLASS": function( className ) {
                        var pattern = classCache[ className + " " ];

                        return pattern ||
                            (pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
                            classCache( className, function( elem ) {
                                return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
                            });
                    },

                    "ATTR": function( name, operator, check ) {
                        return function( elem ) {
                            var result = Sizzle.attr( elem, name );

                            if ( result == null ) {
                                return operator === "!=";
                            }
                            if ( !operator ) {
                                return true;
                            }

                            result += "";

                            return operator === "=" ? result === check :
                                operator === "!=" ? result !== check :
                                    operator === "^=" ? check && result.indexOf( check ) === 0 :
                                        operator === "*=" ? check && result.indexOf( check ) > -1 :
                                            operator === "$=" ? check && result.slice( -check.length ) === check :
                                                operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
                                                    operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
                                                        false;
                        };
                    },

                    "CHILD": function( type, what, argument, first, last ) {
                        var simple = type.slice( 0, 3 ) !== "nth",
                            forward = type.slice( -4 ) !== "last",
                            ofType = what === "of-type";

                        return first === 1 && last === 0 ?

                            // Shortcut for :nth-*(n)
                            function( elem ) {
                                return !!elem.parentNode;
                            } :

                            function( elem, context, xml ) {
                                var cache, outerCache, node, diff, nodeIndex, start,
                                    dir = simple !== forward ? "nextSibling" : "previousSibling",
                                    parent = elem.parentNode,
                                    name = ofType && elem.nodeName.toLowerCase(),
                                    useCache = !xml && !ofType;

                                if ( parent ) {

                                    // :(first|last|only)-(child|of-type)
                                    if ( simple ) {
                                        while ( dir ) {
                                            node = elem;
                                            while ( (node = node[ dir ]) ) {
                                                if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
                                                    return false;
                                                }
                                            }
                                            // Reverse direction for :only-* (if we haven't yet done so)
                                            start = dir = type === "only" && !start && "nextSibling";
                                        }
                                        return true;
                                    }

                                    start = [ forward ? parent.firstChild : parent.lastChild ];

                                    // non-xml :nth-child(...) stores cache data on `parent`
                                    if ( forward && useCache ) {
                                        // Seek `elem` from a previously-cached index
                                        outerCache = parent[ expando ] || (parent[ expando ] = {});
                                        cache = outerCache[ type ] || [];
                                        nodeIndex = cache[0] === dirruns && cache[1];
                                        diff = cache[0] === dirruns && cache[2];
                                        node = nodeIndex && parent.childNodes[ nodeIndex ];

                                        while ( (node = ++nodeIndex && node && node[ dir ] ||

                                            // Fallback to seeking `elem` from the start
                                        (diff = nodeIndex = 0) || start.pop()) ) {

                                            // When found, cache indexes on `parent` and break
                                            if ( node.nodeType === 1 && ++diff && node === elem ) {
                                                outerCache[ type ] = [ dirruns, nodeIndex, diff ];
                                                break;
                                            }
                                        }

                                        // Use previously-cached element index if available
                                    } else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
                                        diff = cache[1];

                                        // xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
                                    } else {
                                        // Use the same loop as above to seek `elem` from the start
                                        while ( (node = ++nodeIndex && node && node[ dir ] ||
                                        (diff = nodeIndex = 0) || start.pop()) ) {

                                            if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
                                                // Cache the index of each encountered element
                                                if ( useCache ) {
                                                    (node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
                                                }

                                                if ( node === elem ) {
                                                    break;
                                                }
                                            }
                                        }
                                    }

                                    // Incorporate the offset, then check against cycle size
                                    diff -= last;
                                    return diff === first || ( diff % first === 0 && diff / first >= 0 );
                                }
                            };
                    },

                    "PSEUDO": function( pseudo, argument ) {
                        // pseudo-class names are case-insensitive
                        // http://www.w3.org/TR/selectors/#pseudo-classes
                        // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
                        // Remember that setFilters inherits from pseudos
                        var args,
                            fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
                                Sizzle.error( "unsupported pseudo: " + pseudo );

                        // The user may use createPseudo to indicate that
                        // arguments are needed to create the filter function
                        // just as Sizzle does
                        if ( fn[ expando ] ) {
                            return fn( argument );
                        }

                        // But maintain support for old signatures
                        if ( fn.length > 1 ) {
                            args = [ pseudo, pseudo, "", argument ];
                            return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
                                markFunction(function( seed, matches ) {
                                    var idx,
                                        matched = fn( seed, argument ),
                                        i = matched.length;
                                    while ( i-- ) {
                                        idx = indexOf( seed, matched[i] );
                                        seed[ idx ] = !( matches[ idx ] = matched[i] );
                                    }
                                }) :
                                function( elem ) {
                                    return fn( elem, 0, args );
                                };
                        }

                        return fn;
                    }
                },

                pseudos: {
                    // Potentially complex pseudos
                    "not": markFunction(function( selector ) {
                        // Trim the selector passed to compile
                        // to avoid treating leading and trailing
                        // spaces as combinators
                        var input = [],
                            results = [],
                            matcher = compile( selector.replace( rtrim, "$1" ) );

                        return matcher[ expando ] ?
                            markFunction(function( seed, matches, context, xml ) {
                                var elem,
                                    unmatched = matcher( seed, null, xml, [] ),
                                    i = seed.length;

                                // Match elements unmatched by `matcher`
                                while ( i-- ) {
                                    if ( (elem = unmatched[i]) ) {
                                        seed[i] = !(matches[i] = elem);
                                    }
                                }
                            }) :
                            function( elem, context, xml ) {
                                input[0] = elem;
                                matcher( input, null, xml, results );
                                // Don't keep the element (issue #299)
                                input[0] = null;
                                return !results.pop();
                            };
                    }),

                    "has": markFunction(function( selector ) {
                        return function( elem ) {
                            return Sizzle( selector, elem ).length > 0;
                        };
                    }),

                    "contains": markFunction(function( text ) {
                        text = text.replace( runescape, funescape );
                        return function( elem ) {
                            return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
                        };
                    }),

                    // "Whether an element is represented by a :lang() selector
                    // is based solely on the element's language value
                    // being equal to the identifier C,
                    // or beginning with the identifier C immediately followed by "-".
                    // The matching of C against the element's language value is performed case-insensitively.
                    // The identifier C does not have to be a valid language name."
                    // http://www.w3.org/TR/selectors/#lang-pseudo
                    "lang": markFunction( function( lang ) {
                        // lang value must be a valid identifier
                        if ( !ridentifier.test(lang || "") ) {
                            Sizzle.error( "unsupported lang: " + lang );
                        }
                        lang = lang.replace( runescape, funescape ).toLowerCase();
                        return function( elem ) {
                            var elemLang;
                            do {
                                if ( (elemLang = documentIsHTML ?
                                        elem.lang :
                                    elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

                                    elemLang = elemLang.toLowerCase();
                                    return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
                                }
                            } while ( (elem = elem.parentNode) && elem.nodeType === 1 );
                            return false;
                        };
                    }),

                    // Miscellaneous
                    "target": function( elem ) {
                        var hash = window.location && window.location.hash;
                        return hash && hash.slice( 1 ) === elem.id;
                    },

                    "root": function( elem ) {
                        return elem === docElem;
                    },

                    "focus": function( elem ) {
                        return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                    },

                    // Boolean properties
                    "enabled": function( elem ) {
                        return elem.disabled === false;
                    },

                    "disabled": function( elem ) {
                        return elem.disabled === true;
                    },

                    "checked": function( elem ) {
                        // In CSS3, :checked should return both checked and selected elements
                        // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                        var nodeName = elem.nodeName.toLowerCase();
                        return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
                    },

                    "selected": function( elem ) {
                        // Accessing this property makes selected-by-default
                        // options in Safari work properly
                        if ( elem.parentNode ) {
                            elem.parentNode.selectedIndex;
                        }

                        return elem.selected === true;
                    },

                    // Contents
                    "empty": function( elem ) {
                        // http://www.w3.org/TR/selectors/#empty-pseudo
                        // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
                        //   but not by others (comment: 8; processing instruction: 7; etc.)
                        // nodeType < 6 works because attributes (2) do not appear as children
                        for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
                            if ( elem.nodeType < 6 ) {
                                return false;
                            }
                        }
                        return true;
                    },

                    "parent": function( elem ) {
                        return !Expr.pseudos["empty"]( elem );
                    },

                    // Element/input types
                    "header": function( elem ) {
                        return rheader.test( elem.nodeName );
                    },

                    "input": function( elem ) {
                        return rinputs.test( elem.nodeName );
                    },

                    "button": function( elem ) {
                        var name = elem.nodeName.toLowerCase();
                        return name === "input" && elem.type === "button" || name === "button";
                    },

                    "text": function( elem ) {
                        var attr;
                        return elem.nodeName.toLowerCase() === "input" &&
                            elem.type === "text" &&

                                // Support: IE<8
                                // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
                            ( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
                    },

                    // Position-in-collection
                    "first": createPositionalPseudo(function() {
                        return [ 0 ];
                    }),

                    "last": createPositionalPseudo(function( matchIndexes, length ) {
                        return [ length - 1 ];
                    }),

                    "eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
                        return [ argument < 0 ? argument + length : argument ];
                    }),

                    "even": createPositionalPseudo(function( matchIndexes, length ) {
                        var i = 0;
                        for ( ; i < length; i += 2 ) {
                            matchIndexes.push( i );
                        }
                        return matchIndexes;
                    }),

                    "odd": createPositionalPseudo(function( matchIndexes, length ) {
                        var i = 1;
                        for ( ; i < length; i += 2 ) {
                            matchIndexes.push( i );
                        }
                        return matchIndexes;
                    }),

                    "lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
                        var i = argument < 0 ? argument + length : argument;
                        for ( ; --i >= 0; ) {
                            matchIndexes.push( i );
                        }
                        return matchIndexes;
                    }),

                    "gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
                        var i = argument < 0 ? argument + length : argument;
                        for ( ; ++i < length; ) {
                            matchIndexes.push( i );
                        }
                        return matchIndexes;
                    })
                }
            };

            Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
            for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
                Expr.pseudos[ i ] = createInputPseudo( i );
            }
            for ( i in { submit: true, reset: true } ) {
                Expr.pseudos[ i ] = createButtonPseudo( i );
            }

// Easy API for creating new setFilters
            function setFilters() {}
            setFilters.prototype = Expr.filters = Expr.pseudos;
            Expr.setFilters = new setFilters();

            tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
                var matched, match, tokens, type,
                    soFar, groups, preFilters,
                    cached = tokenCache[ selector + " " ];

                if ( cached ) {
                    return parseOnly ? 0 : cached.slice( 0 );
                }

                soFar = selector;
                groups = [];
                preFilters = Expr.preFilter;

                while ( soFar ) {

                    // Comma and first run
                    if ( !matched || (match = rcomma.exec( soFar )) ) {
                        if ( match ) {
                            // Don't consume trailing commas as valid
                            soFar = soFar.slice( match[0].length ) || soFar;
                        }
                        groups.push( (tokens = []) );
                    }

                    matched = false;

                    // Combinators
                    if ( (match = rcombinators.exec( soFar )) ) {
                        matched = match.shift();
                        tokens.push({
                            value: matched,
                            // Cast descendant combinators to space
                            type: match[0].replace( rtrim, " " )
                        });
                        soFar = soFar.slice( matched.length );
                    }

                    // Filters
                    for ( type in Expr.filter ) {
                        if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
                            (match = preFilters[ type ]( match ))) ) {
                            matched = match.shift();
                            tokens.push({
                                value: matched,
                                type: type,
                                matches: match
                            });
                            soFar = soFar.slice( matched.length );
                        }
                    }

                    if ( !matched ) {
                        break;
                    }
                }

                // Return the length of the invalid excess
                // if we're just parsing
                // Otherwise, throw an error or return tokens
                return parseOnly ?
                    soFar.length :
                    soFar ?
                        Sizzle.error( selector ) :
                        // Cache the tokens
                        tokenCache( selector, groups ).slice( 0 );
            };

            function toSelector( tokens ) {
                var i = 0,
                    len = tokens.length,
                    selector = "";
                for ( ; i < len; i++ ) {
                    selector += tokens[i].value;
                }
                return selector;
            }

            function addCombinator( matcher, combinator, base ) {
                var dir = combinator.dir,
                    checkNonElements = base && dir === "parentNode",
                    doneName = done++;

                return combinator.first ?
                    // Check against closest ancestor/preceding element
                    function( elem, context, xml ) {
                        while ( (elem = elem[ dir ]) ) {
                            if ( elem.nodeType === 1 || checkNonElements ) {
                                return matcher( elem, context, xml );
                            }
                        }
                    } :

                    // Check against all ancestor/preceding elements
                    function( elem, context, xml ) {
                        var oldCache, outerCache,
                            newCache = [ dirruns, doneName ];

                        // We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
                        if ( xml ) {
                            while ( (elem = elem[ dir ]) ) {
                                if ( elem.nodeType === 1 || checkNonElements ) {
                                    if ( matcher( elem, context, xml ) ) {
                                        return true;
                                    }
                                }
                            }
                        } else {
                            while ( (elem = elem[ dir ]) ) {
                                if ( elem.nodeType === 1 || checkNonElements ) {
                                    outerCache = elem[ expando ] || (elem[ expando ] = {});
                                    if ( (oldCache = outerCache[ dir ]) &&
                                        oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

                                        // Assign to newCache so results back-propagate to previous elements
                                        return (newCache[ 2 ] = oldCache[ 2 ]);
                                    } else {
                                        // Reuse newcache so results back-propagate to previous elements
                                        outerCache[ dir ] = newCache;

                                        // A match means we're done; a fail means we have to keep checking
                                        if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
                                            return true;
                                        }
                                    }
                                }
                            }
                        }
                    };
            }

            function elementMatcher( matchers ) {
                return matchers.length > 1 ?
                    function( elem, context, xml ) {
                        var i = matchers.length;
                        while ( i-- ) {
                            if ( !matchers[i]( elem, context, xml ) ) {
                                return false;
                            }
                        }
                        return true;
                    } :
                    matchers[0];
            }

            function multipleContexts( selector, contexts, results ) {
                var i = 0,
                    len = contexts.length;
                for ( ; i < len; i++ ) {
                    Sizzle( selector, contexts[i], results );
                }
                return results;
            }

            function condense( unmatched, map, filter, context, xml ) {
                var elem,
                    newUnmatched = [],
                    i = 0,
                    len = unmatched.length,
                    mapped = map != null;

                for ( ; i < len; i++ ) {
                    if ( (elem = unmatched[i]) ) {
                        if ( !filter || filter( elem, context, xml ) ) {
                            newUnmatched.push( elem );
                            if ( mapped ) {
                                map.push( i );
                            }
                        }
                    }
                }

                return newUnmatched;
            }

            function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
                if ( postFilter && !postFilter[ expando ] ) {
                    postFilter = setMatcher( postFilter );
                }
                if ( postFinder && !postFinder[ expando ] ) {
                    postFinder = setMatcher( postFinder, postSelector );
                }
                return markFunction(function( seed, results, context, xml ) {
                    var temp, i, elem,
                        preMap = [],
                        postMap = [],
                        preexisting = results.length,

                    // Get initial elements from seed or context
                        elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

                    // Prefilter to get matcher input, preserving a map for seed-results synchronization
                        matcherIn = preFilter && ( seed || !selector ) ?
                            condense( elems, preMap, preFilter, context, xml ) :
                            elems,

                        matcherOut = matcher ?
                            // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
                            postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

                                // ...intermediate processing is necessary
                                [] :

                                // ...otherwise use results directly
                                results :
                            matcherIn;

                    // Find primary matches
                    if ( matcher ) {
                        matcher( matcherIn, matcherOut, context, xml );
                    }

                    // Apply postFilter
                    if ( postFilter ) {
                        temp = condense( matcherOut, postMap );
                        postFilter( temp, [], context, xml );

                        // Un-match failing elements by moving them back to matcherIn
                        i = temp.length;
                        while ( i-- ) {
                            if ( (elem = temp[i]) ) {
                                matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
                            }
                        }
                    }

                    if ( seed ) {
                        if ( postFinder || preFilter ) {
                            if ( postFinder ) {
                                // Get the final matcherOut by condensing this intermediate into postFinder contexts
                                temp = [];
                                i = matcherOut.length;
                                while ( i-- ) {
                                    if ( (elem = matcherOut[i]) ) {
                                        // Restore matcherIn since elem is not yet a final match
                                        temp.push( (matcherIn[i] = elem) );
                                    }
                                }
                                postFinder( null, (matcherOut = []), temp, xml );
                            }

                            // Move matched elements from seed to results to keep them synchronized
                            i = matcherOut.length;
                            while ( i-- ) {
                                if ( (elem = matcherOut[i]) &&
                                    (temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

                                    seed[temp] = !(results[temp] = elem);
                                }
                            }
                        }

                        // Add elements to results, through postFinder if defined
                    } else {
                        matcherOut = condense(
                            matcherOut === results ?
                                matcherOut.splice( preexisting, matcherOut.length ) :
                                matcherOut
                        );
                        if ( postFinder ) {
                            postFinder( null, results, matcherOut, xml );
                        } else {
                            push.apply( results, matcherOut );
                        }
                    }
                });
            }

            function matcherFromTokens( tokens ) {
                var checkContext, matcher, j,
                    len = tokens.length,
                    leadingRelative = Expr.relative[ tokens[0].type ],
                    implicitRelative = leadingRelative || Expr.relative[" "],
                    i = leadingRelative ? 1 : 0,

                // The foundational matcher ensures that elements are reachable from top-level context(s)
                    matchContext = addCombinator( function( elem ) {
                        return elem === checkContext;
                    }, implicitRelative, true ),
                    matchAnyContext = addCombinator( function( elem ) {
                        return indexOf( checkContext, elem ) > -1;
                    }, implicitRelative, true ),
                    matchers = [ function( elem, context, xml ) {
                        var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
                                (checkContext = context).nodeType ?
                                    matchContext( elem, context, xml ) :
                                    matchAnyContext( elem, context, xml ) );
                        // Avoid hanging onto element (issue #299)
                        checkContext = null;
                        return ret;
                    } ];

                for ( ; i < len; i++ ) {
                    if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
                        matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
                    } else {
                        matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

                        // Return special upon seeing a positional matcher
                        if ( matcher[ expando ] ) {
                            // Find the next relative operator (if any) for proper handling
                            j = ++i;
                            for ( ; j < len; j++ ) {
                                if ( Expr.relative[ tokens[j].type ] ) {
                                    break;
                                }
                            }
                            return setMatcher(
                                i > 1 && elementMatcher( matchers ),
                                i > 1 && toSelector(
                                    // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                                    tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
                                ).replace( rtrim, "$1" ),
                                matcher,
                                i < j && matcherFromTokens( tokens.slice( i, j ) ),
                                j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
                                j < len && toSelector( tokens )
                            );
                        }
                        matchers.push( matcher );
                    }
                }

                return elementMatcher( matchers );
            }

            function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
                var bySet = setMatchers.length > 0,
                    byElement = elementMatchers.length > 0,
                    superMatcher = function( seed, context, xml, results, outermost ) {
                        var elem, j, matcher,
                            matchedCount = 0,
                            i = "0",
                            unmatched = seed && [],
                            setMatched = [],
                            contextBackup = outermostContext,
                        // We must always have either seed elements or outermost context
                            elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
                        // Use integer dirruns iff this is the outermost matcher
                            dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
                            len = elems.length;

                        if ( outermost ) {
                            outermostContext = context !== document && context;
                        }

                        // Add elements passing elementMatchers directly to results
                        // Keep `i` a string if there are no elements so `matchedCount` will be "00" below
                        // Support: IE<9, Safari
                        // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
                        for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
                            if ( byElement && elem ) {
                                j = 0;
                                while ( (matcher = elementMatchers[j++]) ) {
                                    if ( matcher( elem, context, xml ) ) {
                                        results.push( elem );
                                        break;
                                    }
                                }
                                if ( outermost ) {
                                    dirruns = dirrunsUnique;
                                }
                            }

                            // Track unmatched elements for set filters
                            if ( bySet ) {
                                // They will have gone through all possible matchers
                                if ( (elem = !matcher && elem) ) {
                                    matchedCount--;
                                }

                                // Lengthen the array for every element, matched or not
                                if ( seed ) {
                                    unmatched.push( elem );
                                }
                            }
                        }

                        // Apply set filters to unmatched elements
                        matchedCount += i;
                        if ( bySet && i !== matchedCount ) {
                            j = 0;
                            while ( (matcher = setMatchers[j++]) ) {
                                matcher( unmatched, setMatched, context, xml );
                            }

                            if ( seed ) {
                                // Reintegrate element matches to eliminate the need for sorting
                                if ( matchedCount > 0 ) {
                                    while ( i-- ) {
                                        if ( !(unmatched[i] || setMatched[i]) ) {
                                            setMatched[i] = pop.call( results );
                                        }
                                    }
                                }

                                // Discard index placeholder values to get only actual matches
                                setMatched = condense( setMatched );
                            }

                            // Add matches to results
                            push.apply( results, setMatched );

                            // Seedless set matches succeeding multiple successful matchers stipulate sorting
                            if ( outermost && !seed && setMatched.length > 0 &&
                                ( matchedCount + setMatchers.length ) > 1 ) {

                                Sizzle.uniqueSort( results );
                            }
                        }

                        // Override manipulation of globals by nested matchers
                        if ( outermost ) {
                            dirruns = dirrunsUnique;
                            outermostContext = contextBackup;
                        }

                        return unmatched;
                    };

                return bySet ?
                    markFunction( superMatcher ) :
                    superMatcher;
            }

            compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
                var i,
                    setMatchers = [],
                    elementMatchers = [],
                    cached = compilerCache[ selector + " " ];

                if ( !cached ) {
                    // Generate a function of recursive functions that can be used to check each element
                    if ( !match ) {
                        match = tokenize( selector );
                    }
                    i = match.length;
                    while ( i-- ) {
                        cached = matcherFromTokens( match[i] );
                        if ( cached[ expando ] ) {
                            setMatchers.push( cached );
                        } else {
                            elementMatchers.push( cached );
                        }
                    }

                    // Cache the compiled function
                    cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

                    // Save selector and tokenization
                    cached.selector = selector;
                }
                return cached;
            };

            /**
             * A low-level selection function that works with Sizzle's compiled
             *  selector functions
             * @param {String|Function} selector A selector or a pre-compiled
             *  selector function built with Sizzle.compile
             * @param {Element} context
             * @param {Array} [results]
             * @param {Array} [seed] A set of elements to match against
             */
            select = Sizzle.select = function( selector, context, results, seed ) {
                var i, tokens, token, type, find,
                    compiled = typeof selector === "function" && selector,
                    match = !seed && tokenize( (selector = compiled.selector || selector) );

                results = results || [];

                // Try to minimize operations if there is no seed and only one group
                if ( match.length === 1 ) {

                    // Take a shortcut and set the context if the root selector is an ID
                    tokens = match[0] = match[0].slice( 0 );
                    if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
                        support.getById && context.nodeType === 9 && documentIsHTML &&
                        Expr.relative[ tokens[1].type ] ) {

                        context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
                        if ( !context ) {
                            return results;

                            // Precompiled matchers will still verify ancestry, so step up a level
                        } else if ( compiled ) {
                            context = context.parentNode;
                        }

                        selector = selector.slice( tokens.shift().value.length );
                    }

                    // Fetch a seed set for right-to-left matching
                    i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
                    while ( i-- ) {
                        token = tokens[i];

                        // Abort if we hit a combinator
                        if ( Expr.relative[ (type = token.type) ] ) {
                            break;
                        }
                        if ( (find = Expr.find[ type ]) ) {
                            // Search, expanding context for leading sibling combinators
                            if ( (seed = find(
                                    token.matches[0].replace( runescape, funescape ),
                                    rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
                                )) ) {

                                // If seed is empty or no tokens remain, we can return early
                                tokens.splice( i, 1 );
                                selector = seed.length && toSelector( tokens );
                                if ( !selector ) {
                                    push.apply( results, seed );
                                    return results;
                                }

                                break;
                            }
                        }
                    }
                }

                // Compile and execute a filtering function if one is not provided
                // Provide `match` to avoid retokenization if we modified the selector above
                ( compiled || compile( selector, match ) )(
                    seed,
                    context,
                    !documentIsHTML,
                    results,
                    rsibling.test( selector ) && testContext( context.parentNode ) || context
                );
                return results;
            };

// One-time assignments

// Sort stability
            support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
            support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
            setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
            support.sortDetached = assert(function( div1 ) {
                // Should return 1, but returns 4 (following)
                return div1.compareDocumentPosition( document.createElement("div") ) & 1;
            });

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
            if ( !assert(function( div ) {
                    div.innerHTML = "<a href='#'></a>";
                    return div.firstChild.getAttribute("href") === "#" ;
                }) ) {
                addHandle( "type|href|height|width", function( elem, name, isXML ) {
                    if ( !isXML ) {
                        return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
                    }
                });
            }

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
            if ( !support.attributes || !assert(function( div ) {
                    div.innerHTML = "<input/>";
                    div.firstChild.setAttribute( "value", "" );
                    return div.firstChild.getAttribute( "value" ) === "";
                }) ) {
                addHandle( "value", function( elem, name, isXML ) {
                    if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
                        return elem.defaultValue;
                    }
                });
            }

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
            if ( !assert(function( div ) {
                    return div.getAttribute("disabled") == null;
                }) ) {
                addHandle( booleans, function( elem, name, isXML ) {
                    var val;
                    if ( !isXML ) {
                        return elem[ name ] === true ? name.toLowerCase() :
                            (val = elem.getAttributeNode( name )) && val.specified ?
                                val.value :
                                null;
                    }
                });
            }

            return Sizzle;

        })( window );



    jQuery.find = Sizzle;
    jQuery.expr = Sizzle.selectors;
    jQuery.expr[":"] = jQuery.expr.pseudos;
    jQuery.unique = Sizzle.uniqueSort;
    jQuery.text = Sizzle.getText;
    jQuery.isXMLDoc = Sizzle.isXML;
    jQuery.contains = Sizzle.contains;



    var rneedsContext = jQuery.expr.match.needsContext;

    var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



    var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
    function winnow( elements, qualifier, not ) {
        if ( jQuery.isFunction( qualifier ) ) {
            return jQuery.grep( elements, function( elem, i ) {
                /* jshint -W018 */
                return !!qualifier.call( elem, i, elem ) !== not;
            });

        }

        if ( qualifier.nodeType ) {
            return jQuery.grep( elements, function( elem ) {
                return ( elem === qualifier ) !== not;
            });

        }

        if ( typeof qualifier === "string" ) {
            if ( risSimple.test( qualifier ) ) {
                return jQuery.filter( qualifier, elements, not );
            }

            qualifier = jQuery.filter( qualifier, elements );
        }

        return jQuery.grep( elements, function( elem ) {
            return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
        });
    }

    jQuery.filter = function( expr, elems, not ) {
        var elem = elems[ 0 ];

        if ( not ) {
            expr = ":not(" + expr + ")";
        }

        return elems.length === 1 && elem.nodeType === 1 ?
            jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
            jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
                return elem.nodeType === 1;
            }));
    };

    jQuery.fn.extend({
        find: function( selector ) {
            var i,
                len = this.length,
                ret = [],
                self = this;

            if ( typeof selector !== "string" ) {
                return this.pushStack( jQuery( selector ).filter(function() {
                    for ( i = 0; i < len; i++ ) {
                        if ( jQuery.contains( self[ i ], this ) ) {
                            return true;
                        }
                    }
                }) );
            }

            for ( i = 0; i < len; i++ ) {
                jQuery.find( selector, self[ i ], ret );
            }

            // Needed because $( selector, context ) becomes $( context ).find( selector )
            ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
            ret.selector = this.selector ? this.selector + " " + selector : selector;
            return ret;
        },
        filter: function( selector ) {
            return this.pushStack( winnow(this, selector || [], false) );
        },
        not: function( selector ) {
            return this.pushStack( winnow(this, selector || [], true) );
        },
        is: function( selector ) {
            return !!winnow(
                this,

                // If this is a positional/relative selector, check membership in the returned set
                // so $("p:first").is("p:last") won't return true for a doc with two "p".
                typeof selector === "string" && rneedsContext.test( selector ) ?
                    jQuery( selector ) :
                selector || [],
                false
            ).length;
        }
    });


// Initialize a jQuery object


// A central reference to the root jQuery(document)
    var rootjQuery,

    // A simple way to check for HTML strings
    // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
    // Strict HTML recognition (#11290: must start with <)
        rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

        init = jQuery.fn.init = function( selector, context ) {
            var match, elem;

            // HANDLE: $(""), $(null), $(undefined), $(false)
            if ( !selector ) {
                return this;
            }

            // Handle HTML strings
            if ( typeof selector === "string" ) {
                if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
                    // Assume that strings that start and end with <> are HTML and skip the regex check
                    match = [ null, selector, null ];

                } else {
                    match = rquickExpr.exec( selector );
                }

                // Match html or make sure no context is specified for #id
                if ( match && (match[1] || !context) ) {

                    // HANDLE: $(html) -> $(array)
                    if ( match[1] ) {
                        context = context instanceof jQuery ? context[0] : context;

                        // Option to run scripts is true for back-compat
                        // Intentionally let the error be thrown if parseHTML is not present
                        jQuery.merge( this, jQuery.parseHTML(
                            match[1],
                            context && context.nodeType ? context.ownerDocument || context : document,
                            true
                        ) );

                        // HANDLE: $(html, props)
                        if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
                            for ( match in context ) {
                                // Properties of context are called as methods if possible
                                if ( jQuery.isFunction( this[ match ] ) ) {
                                    this[ match ]( context[ match ] );

                                    // ...and otherwise set as attributes
                                } else {
                                    this.attr( match, context[ match ] );
                                }
                            }
                        }

                        return this;

                        // HANDLE: $(#id)
                    } else {
                        elem = document.getElementById( match[2] );

                        // Support: Blackberry 4.6
                        // gEBID returns nodes no longer in the document (#6963)
                        if ( elem && elem.parentNode ) {
                            // Inject the element directly into the jQuery object
                            this.length = 1;
                            this[0] = elem;
                        }

                        this.context = document;
                        this.selector = selector;
                        return this;
                    }

                    // HANDLE: $(expr, $(...))
                } else if ( !context || context.jquery ) {
                    return ( context || rootjQuery ).find( selector );

                    // HANDLE: $(expr, context)
                    // (which is just equivalent to: $(context).find(expr)
                } else {
                    return this.constructor( context ).find( selector );
                }

                // HANDLE: $(DOMElement)
            } else if ( selector.nodeType ) {
                this.context = this[0] = selector;
                this.length = 1;
                return this;

                // HANDLE: $(function)
                // Shortcut for document ready
            } else if ( jQuery.isFunction( selector ) ) {
                return typeof rootjQuery.ready !== "undefined" ?
                    rootjQuery.ready( selector ) :
                    // Execute immediately if ready is not present
                    selector( jQuery );
            }

            if ( selector.selector !== undefined ) {
                this.selector = selector.selector;
                this.context = selector.context;
            }

            return jQuery.makeArray( selector, this );
        };

// Give the init function the jQuery prototype for later instantiation
    init.prototype = jQuery.fn;

// Initialize central reference
    rootjQuery = jQuery( document );


    var rparentsprev = /^(?:parents|prev(?:Until|All))/,
    // Methods guaranteed to produce a unique set when starting from a unique set
        guaranteedUnique = {
            children: true,
            contents: true,
            next: true,
            prev: true
        };

    jQuery.extend({
        dir: function( elem, dir, until ) {
            var matched = [],
                truncate = until !== undefined;

            while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
                if ( elem.nodeType === 1 ) {
                    if ( truncate && jQuery( elem ).is( until ) ) {
                        break;
                    }
                    matched.push( elem );
                }
            }
            return matched;
        },

        sibling: function( n, elem ) {
            var matched = [];

            for ( ; n; n = n.nextSibling ) {
                if ( n.nodeType === 1 && n !== elem ) {
                    matched.push( n );
                }
            }

            return matched;
        }
    });

    jQuery.fn.extend({
        has: function( target ) {
            var targets = jQuery( target, this ),
                l = targets.length;

            return this.filter(function() {
                var i = 0;
                for ( ; i < l; i++ ) {
                    if ( jQuery.contains( this, targets[i] ) ) {
                        return true;
                    }
                }
            });
        },

        closest: function( selectors, context ) {
            var cur,
                i = 0,
                l = this.length,
                matched = [],
                pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
                    jQuery( selectors, context || this.context ) :
                    0;

            for ( ; i < l; i++ ) {
                for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
                    // Always skip document fragments
                    if ( cur.nodeType < 11 && (pos ?
                        pos.index(cur) > -1 :

                            // Don't pass non-elements to Sizzle
                        cur.nodeType === 1 &&
                        jQuery.find.matchesSelector(cur, selectors)) ) {

                        matched.push( cur );
                        break;
                    }
                }
            }

            return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
        },

        // Determine the position of an element within the set
        index: function( elem ) {

            // No argument, return index in parent
            if ( !elem ) {
                return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
            }

            // Index in selector
            if ( typeof elem === "string" ) {
                return indexOf.call( jQuery( elem ), this[ 0 ] );
            }

            // Locate the position of the desired element
            return indexOf.call( this,

                // If it receives a jQuery object, the first element is used
                elem.jquery ? elem[ 0 ] : elem
            );
        },

        add: function( selector, context ) {
            return this.pushStack(
                jQuery.unique(
                    jQuery.merge( this.get(), jQuery( selector, context ) )
                )
            );
        },

        addBack: function( selector ) {
            return this.add( selector == null ?
                    this.prevObject : this.prevObject.filter(selector)
            );
        }
    });

    function sibling( cur, dir ) {
        while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
        return cur;
    }

    jQuery.each({
        parent: function( elem ) {
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null;
        },
        parents: function( elem ) {
            return jQuery.dir( elem, "parentNode" );
        },
        parentsUntil: function( elem, i, until ) {
            return jQuery.dir( elem, "parentNode", until );
        },
        next: function( elem ) {
            return sibling( elem, "nextSibling" );
        },
        prev: function( elem ) {
            return sibling( elem, "previousSibling" );
        },
        nextAll: function( elem ) {
            return jQuery.dir( elem, "nextSibling" );
        },
        prevAll: function( elem ) {
            return jQuery.dir( elem, "previousSibling" );
        },
        nextUntil: function( elem, i, until ) {
            return jQuery.dir( elem, "nextSibling", until );
        },
        prevUntil: function( elem, i, until ) {
            return jQuery.dir( elem, "previousSibling", until );
        },
        siblings: function( elem ) {
            return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
        },
        children: function( elem ) {
            return jQuery.sibling( elem.firstChild );
        },
        contents: function( elem ) {
            return elem.contentDocument || jQuery.merge( [], elem.childNodes );
        }
    }, function( name, fn ) {
        jQuery.fn[ name ] = function( until, selector ) {
            var matched = jQuery.map( this, fn, until );

            if ( name.slice( -5 ) !== "Until" ) {
                selector = until;
            }

            if ( selector && typeof selector === "string" ) {
                matched = jQuery.filter( selector, matched );
            }

            if ( this.length > 1 ) {
                // Remove duplicates
                if ( !guaranteedUnique[ name ] ) {
                    jQuery.unique( matched );
                }

                // Reverse order for parents* and prev-derivatives
                if ( rparentsprev.test( name ) ) {
                    matched.reverse();
                }
            }

            return this.pushStack( matched );
        };
    });
    var rnotwhite = (/\S+/g);



// String to Object options format cache
    var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
    function createOptions( options ) {
        var object = optionsCache[ options ] = {};
        jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
            object[ flag ] = true;
        });
        return object;
    }

    /*
     * Create a callback list using the following parameters:
     *
     *	options: an optional list of space-separated options that will change how
     *			the callback list behaves or a more traditional option object
     *
     * By default a callback list will act like an event callback list and can be
     * "fired" multiple times.
     *
     * Possible options:
     *
     *	once:			will ensure the callback list can only be fired once (like a Deferred)
     *
     *	memory:			will keep track of previous values and will call any callback added
     *					after the list has been fired right away with the latest "memorized"
     *					values (like a Deferred)
     *
     *	unique:			will ensure a callback can only be added once (no duplicate in the list)
     *
     *	stopOnFalse:	interrupt callings when a callback returns false
     *
     */
    jQuery.Callbacks = function( options ) {

        // Convert options from String-formatted to Object-formatted if needed
        // (we check in cache first)
        options = typeof options === "string" ?
            ( optionsCache[ options ] || createOptions( options ) ) :
            jQuery.extend( {}, options );

        var // Last fire value (for non-forgettable lists)
            memory,
        // Flag to know if list was already fired
            fired,
        // Flag to know if list is currently firing
            firing,
        // First callback to fire (used internally by add and fireWith)
            firingStart,
        // End of the loop when firing
            firingLength,
        // Index of currently firing callback (modified by remove if needed)
            firingIndex,
        // Actual callback list
            list = [],
        // Stack of fire calls for repeatable lists
            stack = !options.once && [],
        // Fire callbacks
            fire = function( data ) {
                memory = options.memory && data;
                fired = true;
                firingIndex = firingStart || 0;
                firingStart = 0;
                firingLength = list.length;
                firing = true;
                for ( ; list && firingIndex < firingLength; firingIndex++ ) {
                    if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
                        memory = false; // To prevent further calls using add
                        break;
                    }
                }
                firing = false;
                if ( list ) {
                    if ( stack ) {
                        if ( stack.length ) {
                            fire( stack.shift() );
                        }
                    } else if ( memory ) {
                        list = [];
                    } else {
                        self.disable();
                    }
                }
            },
        // Actual Callbacks object
            self = {
                // Add a callback or a collection of callbacks to the list
                add: function() {
                    if ( list ) {
                        // First, we save the current length
                        var start = list.length;
                        (function add( args ) {
                            jQuery.each( args, function( _, arg ) {
                                var type = jQuery.type( arg );
                                if ( type === "function" ) {
                                    if ( !options.unique || !self.has( arg ) ) {
                                        list.push( arg );
                                    }
                                } else if ( arg && arg.length && type !== "string" ) {
                                    // Inspect recursively
                                    add( arg );
                                }
                            });
                        })( arguments );
                        // Do we need to add the callbacks to the
                        // current firing batch?
                        if ( firing ) {
                            firingLength = list.length;
                            // With memory, if we're not firing then
                            // we should call right away
                        } else if ( memory ) {
                            firingStart = start;
                            fire( memory );
                        }
                    }
                    return this;
                },
                // Remove a callback from the list
                remove: function() {
                    if ( list ) {
                        jQuery.each( arguments, function( _, arg ) {
                            var index;
                            while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
                                list.splice( index, 1 );
                                // Handle firing indexes
                                if ( firing ) {
                                    if ( index <= firingLength ) {
                                        firingLength--;
                                    }
                                    if ( index <= firingIndex ) {
                                        firingIndex--;
                                    }
                                }
                            }
                        });
                    }
                    return this;
                },
                // Check if a given callback is in the list.
                // If no argument is given, return whether or not list has callbacks attached.
                has: function( fn ) {
                    return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
                },
                // Remove all callbacks from the list
                empty: function() {
                    list = [];
                    firingLength = 0;
                    return this;
                },
                // Have the list do nothing anymore
                disable: function() {
                    list = stack = memory = undefined;
                    return this;
                },
                // Is it disabled?
                disabled: function() {
                    return !list;
                },
                // Lock the list in its current state
                lock: function() {
                    stack = undefined;
                    if ( !memory ) {
                        self.disable();
                    }
                    return this;
                },
                // Is it locked?
                locked: function() {
                    return !stack;
                },
                // Call all callbacks with the given context and arguments
                fireWith: function( context, args ) {
                    if ( list && ( !fired || stack ) ) {
                        args = args || [];
                        args = [ context, args.slice ? args.slice() : args ];
                        if ( firing ) {
                            stack.push( args );
                        } else {
                            fire( args );
                        }
                    }
                    return this;
                },
                // Call all the callbacks with the given arguments
                fire: function() {
                    self.fireWith( this, arguments );
                    return this;
                },
                // To know if the callbacks have already been called at least once
                fired: function() {
                    return !!fired;
                }
            };

        return self;
    };


    jQuery.extend({

        Deferred: function( func ) {
            var tuples = [
                    // action, add listener, listener list, final state
                    [ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
                    [ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
                    [ "notify", "progress", jQuery.Callbacks("memory") ]
                ],
                state = "pending",
                promise = {
                    state: function() {
                        return state;
                    },
                    always: function() {
                        deferred.done( arguments ).fail( arguments );
                        return this;
                    },
                    then: function( /* fnDone, fnFail, fnProgress */ ) {
                        var fns = arguments;
                        return jQuery.Deferred(function( newDefer ) {
                            jQuery.each( tuples, function( i, tuple ) {
                                var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
                                // deferred[ done | fail | progress ] for forwarding actions to newDefer
                                deferred[ tuple[1] ](function() {
                                    var returned = fn && fn.apply( this, arguments );
                                    if ( returned && jQuery.isFunction( returned.promise ) ) {
                                        returned.promise()
                                            .done( newDefer.resolve )
                                            .fail( newDefer.reject )
                                            .progress( newDefer.notify );
                                    } else {
                                        newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
                                    }
                                });
                            });
                            fns = null;
                        }).promise();
                    },
                    // Get a promise for this deferred
                    // If obj is provided, the promise aspect is added to the object
                    promise: function( obj ) {
                        return obj != null ? jQuery.extend( obj, promise ) : promise;
                    }
                },
                deferred = {};

            // Keep pipe for back-compat
            promise.pipe = promise.then;

            // Add list-specific methods
            jQuery.each( tuples, function( i, tuple ) {
                var list = tuple[ 2 ],
                    stateString = tuple[ 3 ];

                // promise[ done | fail | progress ] = list.add
                promise[ tuple[1] ] = list.add;

                // Handle state
                if ( stateString ) {
                    list.add(function() {
                        // state = [ resolved | rejected ]
                        state = stateString;

                        // [ reject_list | resolve_list ].disable; progress_list.lock
                    }, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
                }

                // deferred[ resolve | reject | notify ]
                deferred[ tuple[0] ] = function() {
                    deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
                    return this;
                };
                deferred[ tuple[0] + "With" ] = list.fireWith;
            });

            // Make the deferred a promise
            promise.promise( deferred );

            // Call given func if any
            if ( func ) {
                func.call( deferred, deferred );
            }

            // All done!
            return deferred;
        },

        // Deferred helper
        when: function( subordinate /* , ..., subordinateN */ ) {
            var i = 0,
                resolveValues = slice.call( arguments ),
                length = resolveValues.length,

            // the count of uncompleted subordinates
                remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

            // the master Deferred. If resolveValues consist of only a single Deferred, just use that.
                deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

            // Update function for both resolve and progress values
                updateFunc = function( i, contexts, values ) {
                    return function( value ) {
                        contexts[ i ] = this;
                        values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
                        if ( values === progressValues ) {
                            deferred.notifyWith( contexts, values );
                        } else if ( !( --remaining ) ) {
                            deferred.resolveWith( contexts, values );
                        }
                    };
                },

                progressValues, progressContexts, resolveContexts;

            // Add listeners to Deferred subordinates; treat others as resolved
            if ( length > 1 ) {
                progressValues = new Array( length );
                progressContexts = new Array( length );
                resolveContexts = new Array( length );
                for ( ; i < length; i++ ) {
                    if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
                        resolveValues[ i ].promise()
                            .done( updateFunc( i, resolveContexts, resolveValues ) )
                            .fail( deferred.reject )
                            .progress( updateFunc( i, progressContexts, progressValues ) );
                    } else {
                        --remaining;
                    }
                }
            }

            // If we're not waiting on anything, resolve the master
            if ( !remaining ) {
                deferred.resolveWith( resolveContexts, resolveValues );
            }

            return deferred.promise();
        }
    });


// The deferred used on DOM ready
    var readyList;

    jQuery.fn.ready = function( fn ) {
        // Add the callback
        jQuery.ready.promise().done( fn );

        return this;
    };

    jQuery.extend({
        // Is the DOM ready to be used? Set to true once it occurs.
        isReady: false,

        // A counter to track how many items to wait for before
        // the ready event fires. See #6781
        readyWait: 1,

        // Hold (or release) the ready event
        holdReady: function( hold ) {
            if ( hold ) {
                jQuery.readyWait++;
            } else {
                jQuery.ready( true );
            }
        },

        // Handle when the DOM is ready
        ready: function( wait ) {

            // Abort if there are pending holds or we're already ready
            if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
                return;
            }

            // Remember that the DOM is ready
            jQuery.isReady = true;

            // If a normal DOM Ready event fired, decrement, and wait if need be
            if ( wait !== true && --jQuery.readyWait > 0 ) {
                return;
            }

            // If there are functions bound, to execute
            readyList.resolveWith( document, [ jQuery ] );

            // Trigger any bound ready events
            if ( jQuery.fn.triggerHandler ) {
                jQuery( document ).triggerHandler( "ready" );
                jQuery( document ).off( "ready" );
            }
        }
    });

    /**
     * The ready event handler and self cleanup method
     */
    function completed() {
        document.removeEventListener( "DOMContentLoaded", completed, false );
        window.removeEventListener( "load", completed, false );
        jQuery.ready();
    }

    jQuery.ready.promise = function( obj ) {
        if ( !readyList ) {

            readyList = jQuery.Deferred();

            // Catch cases where $(document).ready() is called after the browser event has already occurred.
            // We once tried to use readyState "interactive" here, but it caused issues like the one
            // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
            if ( document.readyState === "complete" ) {
                // Handle it asynchronously to allow scripts the opportunity to delay ready
                setTimeout( jQuery.ready );

            } else {

                // Use the handy event callback
                document.addEventListener( "DOMContentLoaded", completed, false );

                // A fallback to window.onload, that will always work
                window.addEventListener( "load", completed, false );
            }
        }
        return readyList.promise( obj );
    };

// Kick off the DOM ready check even if the user does not
    jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
    var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
        var i = 0,
            len = elems.length,
            bulk = key == null;

        // Sets many values
        if ( jQuery.type( key ) === "object" ) {
            chainable = true;
            for ( i in key ) {
                jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
            }

            // Sets one value
        } else if ( value !== undefined ) {
            chainable = true;

            if ( !jQuery.isFunction( value ) ) {
                raw = true;
            }

            if ( bulk ) {
                // Bulk operations run against the entire set
                if ( raw ) {
                    fn.call( elems, value );
                    fn = null;

                    // ...except when executing function values
                } else {
                    bulk = fn;
                    fn = function( elem, key, value ) {
                        return bulk.call( jQuery( elem ), value );
                    };
                }
            }

            if ( fn ) {
                for ( ; i < len; i++ ) {
                    fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
                }
            }
        }

        return chainable ?
            elems :

            // Gets
            bulk ?
                fn.call( elems ) :
                len ? fn( elems[0], key ) : emptyGet;
    };


    /**
     * Determines whether an object can have data
     */
    jQuery.acceptData = function( owner ) {
        // Accepts only:
        //  - Node
        //    - Node.ELEMENT_NODE
        //    - Node.DOCUMENT_NODE
        //  - Object
        //    - Any
        /* jshint -W018 */
        return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
    };


    function Data() {
        // Support: Android<4,
        // Old WebKit does not have Object.preventExtensions/freeze method,
        // return new empty object instead with no [[set]] accessor
        Object.defineProperty( this.cache = {}, 0, {
            get: function() {
                return {};
            }
        });

        this.expando = jQuery.expando + Data.uid++;
    }

    Data.uid = 1;
    Data.accepts = jQuery.acceptData;

    Data.prototype = {
        key: function( owner ) {
            // We can accept data for non-element nodes in modern browsers,
            // but we should not, see #8335.
            // Always return the key for a frozen object.
            if ( !Data.accepts( owner ) ) {
                return 0;
            }

            var descriptor = {},
            // Check if the owner object already has a cache key
                unlock = owner[ this.expando ];

            // If not, create one
            if ( !unlock ) {
                unlock = Data.uid++;

                // Secure it in a non-enumerable, non-writable property
                try {
                    descriptor[ this.expando ] = { value: unlock };
                    Object.defineProperties( owner, descriptor );

                    // Support: Android<4
                    // Fallback to a less secure definition
                } catch ( e ) {
                    descriptor[ this.expando ] = unlock;
                    jQuery.extend( owner, descriptor );
                }
            }

            // Ensure the cache object
            if ( !this.cache[ unlock ] ) {
                this.cache[ unlock ] = {};
            }

            return unlock;
        },
        set: function( owner, data, value ) {
            var prop,
            // There may be an unlock assigned to this node,
            // if there is no entry for this "owner", create one inline
            // and set the unlock as though an owner entry had always existed
                unlock = this.key( owner ),
                cache = this.cache[ unlock ];

            // Handle: [ owner, key, value ] args
            if ( typeof data === "string" ) {
                cache[ data ] = value;

                // Handle: [ owner, { properties } ] args
            } else {
                // Fresh assignments by object are shallow copied
                if ( jQuery.isEmptyObject( cache ) ) {
                    jQuery.extend( this.cache[ unlock ], data );
                    // Otherwise, copy the properties one-by-one to the cache object
                } else {
                    for ( prop in data ) {
                        cache[ prop ] = data[ prop ];
                    }
                }
            }
            return cache;
        },
        get: function( owner, key ) {
            // Either a valid cache is found, or will be created.
            // New caches will be created and the unlock returned,
            // allowing direct access to the newly created
            // empty data object. A valid owner object must be provided.
            var cache = this.cache[ this.key( owner ) ];

            return key === undefined ?
                cache : cache[ key ];
        },
        access: function( owner, key, value ) {
            var stored;
            // In cases where either:
            //
            //   1. No key was specified
            //   2. A string key was specified, but no value provided
            //
            // Take the "read" path and allow the get method to determine
            // which value to return, respectively either:
            //
            //   1. The entire cache object
            //   2. The data stored at the key
            //
            if ( key === undefined ||
                ((key && typeof key === "string") && value === undefined) ) {

                stored = this.get( owner, key );

                return stored !== undefined ?
                    stored : this.get( owner, jQuery.camelCase(key) );
            }

            // [*]When the key is not a string, or both a key and value
            // are specified, set or extend (existing objects) with either:
            //
            //   1. An object of properties
            //   2. A key and value
            //
            this.set( owner, key, value );

            // Since the "set" path can have two possible entry points
            // return the expected data based on which path was taken[*]
            return value !== undefined ? value : key;
        },
        remove: function( owner, key ) {
            var i, name, camel,
                unlock = this.key( owner ),
                cache = this.cache[ unlock ];

            if ( key === undefined ) {
                this.cache[ unlock ] = {};

            } else {
                // Support array or space separated string of keys
                if ( jQuery.isArray( key ) ) {
                    // If "name" is an array of keys...
                    // When data is initially created, via ("key", "val") signature,
                    // keys will be converted to camelCase.
                    // Since there is no way to tell _how_ a key was added, remove
                    // both plain key and camelCase key. #12786
                    // This will only penalize the array argument path.
                    name = key.concat( key.map( jQuery.camelCase ) );
                } else {
                    camel = jQuery.camelCase( key );
                    // Try the string as a key before any manipulation
                    if ( key in cache ) {
                        name = [ key, camel ];
                    } else {
                        // If a key with the spaces exists, use it.
                        // Otherwise, create an array by matching non-whitespace
                        name = camel;
                        name = name in cache ?
                            [ name ] : ( name.match( rnotwhite ) || [] );
                    }
                }

                i = name.length;
                while ( i-- ) {
                    delete cache[ name[ i ] ];
                }
            }
        },
        hasData: function( owner ) {
            return !jQuery.isEmptyObject(
                this.cache[ owner[ this.expando ] ] || {}
            );
        },
        discard: function( owner ) {
            if ( owner[ this.expando ] ) {
                delete this.cache[ owner[ this.expando ] ];
            }
        }
    };
    var data_priv = new Data();

    var data_user = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        rmultiDash = /([A-Z])/g;

    function dataAttr( elem, key, data ) {
        var name;

        // If nothing was found internally, try to fetch any
        // data from the HTML5 data-* attribute
        if ( data === undefined && elem.nodeType === 1 ) {
            name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
            data = elem.getAttribute( name );

            if ( typeof data === "string" ) {
                try {
                    data = data === "true" ? true :
                        data === "false" ? false :
                            data === "null" ? null :
                                // Only convert to a number if it doesn't change the string
                                +data + "" === data ? +data :
                                    rbrace.test( data ) ? jQuery.parseJSON( data ) :
                                        data;
                } catch( e ) {}

                // Make sure we set the data so it isn't changed later
                data_user.set( elem, key, data );
            } else {
                data = undefined;
            }
        }
        return data;
    }

    jQuery.extend({
        hasData: function( elem ) {
            return data_user.hasData( elem ) || data_priv.hasData( elem );
        },

        data: function( elem, name, data ) {
            return data_user.access( elem, name, data );
        },

        removeData: function( elem, name ) {
            data_user.remove( elem, name );
        },

        // TODO: Now that all calls to _data and _removeData have been replaced
        // with direct calls to data_priv methods, these can be deprecated.
        _data: function( elem, name, data ) {
            return data_priv.access( elem, name, data );
        },

        _removeData: function( elem, name ) {
            data_priv.remove( elem, name );
        }
    });

    jQuery.fn.extend({
        data: function( key, value ) {
            var i, name, data,
                elem = this[ 0 ],
                attrs = elem && elem.attributes;

            // Gets all values
            if ( key === undefined ) {
                if ( this.length ) {
                    data = data_user.get( elem );

                    if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
                        i = attrs.length;
                        while ( i-- ) {

                            // Support: IE11+
                            // The attrs elements can be null (#14894)
                            if ( attrs[ i ] ) {
                                name = attrs[ i ].name;
                                if ( name.indexOf( "data-" ) === 0 ) {
                                    name = jQuery.camelCase( name.slice(5) );
                                    dataAttr( elem, name, data[ name ] );
                                }
                            }
                        }
                        data_priv.set( elem, "hasDataAttrs", true );
                    }
                }

                return data;
            }

            // Sets multiple values
            if ( typeof key === "object" ) {
                return this.each(function() {
                    data_user.set( this, key );
                });
            }

            return access( this, function( value ) {
                var data,
                    camelKey = jQuery.camelCase( key );

                // The calling jQuery object (element matches) is not empty
                // (and therefore has an element appears at this[ 0 ]) and the
                // `value` parameter was not undefined. An empty jQuery object
                // will result in `undefined` for elem = this[ 0 ] which will
                // throw an exception if an attempt to read a data cache is made.
                if ( elem && value === undefined ) {
                    // Attempt to get data from the cache
                    // with the key as-is
                    data = data_user.get( elem, key );
                    if ( data !== undefined ) {
                        return data;
                    }

                    // Attempt to get data from the cache
                    // with the key camelized
                    data = data_user.get( elem, camelKey );
                    if ( data !== undefined ) {
                        return data;
                    }

                    // Attempt to "discover" the data in
                    // HTML5 custom data-* attrs
                    data = dataAttr( elem, camelKey, undefined );
                    if ( data !== undefined ) {
                        return data;
                    }

                    // We tried really hard, but the data doesn't exist.
                    return;
                }

                // Set the data...
                this.each(function() {
                    // First, attempt to store a copy or reference of any
                    // data that might've been store with a camelCased key.
                    var data = data_user.get( this, camelKey );

                    // For HTML5 data-* attribute interop, we have to
                    // store property names with dashes in a camelCase form.
                    // This might not apply to all properties...*
                    data_user.set( this, camelKey, value );

                    // *... In the case of properties that might _actually_
                    // have dashes, we need to also store a copy of that
                    // unchanged property.
                    if ( key.indexOf("-") !== -1 && data !== undefined ) {
                        data_user.set( this, key, value );
                    }
                });
            }, null, value, arguments.length > 1, null, true );
        },

        removeData: function( key ) {
            return this.each(function() {
                data_user.remove( this, key );
            });
        }
    });


    jQuery.extend({
        queue: function( elem, type, data ) {
            var queue;

            if ( elem ) {
                type = ( type || "fx" ) + "queue";
                queue = data_priv.get( elem, type );

                // Speed up dequeue by getting out quickly if this is just a lookup
                if ( data ) {
                    if ( !queue || jQuery.isArray( data ) ) {
                        queue = data_priv.access( elem, type, jQuery.makeArray(data) );
                    } else {
                        queue.push( data );
                    }
                }
                return queue || [];
            }
        },

        dequeue: function( elem, type ) {
            type = type || "fx";

            var queue = jQuery.queue( elem, type ),
                startLength = queue.length,
                fn = queue.shift(),
                hooks = jQuery._queueHooks( elem, type ),
                next = function() {
                    jQuery.dequeue( elem, type );
                };

            // If the fx queue is dequeued, always remove the progress sentinel
            if ( fn === "inprogress" ) {
                fn = queue.shift();
                startLength--;
            }

            if ( fn ) {

                // Add a progress sentinel to prevent the fx queue from being
                // automatically dequeued
                if ( type === "fx" ) {
                    queue.unshift( "inprogress" );
                }

                // Clear up the last queue stop function
                delete hooks.stop;
                fn.call( elem, next, hooks );
            }

            if ( !startLength && hooks ) {
                hooks.empty.fire();
            }
        },

        // Not public - generate a queueHooks object, or return the current one
        _queueHooks: function( elem, type ) {
            var key = type + "queueHooks";
            return data_priv.get( elem, key ) || data_priv.access( elem, key, {
                    empty: jQuery.Callbacks("once memory").add(function() {
                        data_priv.remove( elem, [ type + "queue", key ] );
                    })
                });
        }
    });

    jQuery.fn.extend({
        queue: function( type, data ) {
            var setter = 2;

            if ( typeof type !== "string" ) {
                data = type;
                type = "fx";
                setter--;
            }

            if ( arguments.length < setter ) {
                return jQuery.queue( this[0], type );
            }

            return data === undefined ?
                this :
                this.each(function() {
                    var queue = jQuery.queue( this, type, data );

                    // Ensure a hooks for this queue
                    jQuery._queueHooks( this, type );

                    if ( type === "fx" && queue[0] !== "inprogress" ) {
                        jQuery.dequeue( this, type );
                    }
                });
        },
        dequeue: function( type ) {
            return this.each(function() {
                jQuery.dequeue( this, type );
            });
        },
        clearQueue: function( type ) {
            return this.queue( type || "fx", [] );
        },
        // Get a promise resolved when queues of a certain type
        // are emptied (fx is the type by default)
        promise: function( type, obj ) {
            var tmp,
                count = 1,
                defer = jQuery.Deferred(),
                elements = this,
                i = this.length,
                resolve = function() {
                    if ( !( --count ) ) {
                        defer.resolveWith( elements, [ elements ] );
                    }
                };

            if ( typeof type !== "string" ) {
                obj = type;
                type = undefined;
            }
            type = type || "fx";

            while ( i-- ) {
                tmp = data_priv.get( elements[ i ], type + "queueHooks" );
                if ( tmp && tmp.empty ) {
                    count++;
                    tmp.empty.add( resolve );
                }
            }
            resolve();
            return defer.promise( obj );
        }
    });
    var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

    var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

    var isHidden = function( elem, el ) {
        // isHidden might be called from jQuery#filter function;
        // in that case, element will be second argument
        elem = el || elem;
        return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
    };

    var rcheckableType = (/^(?:checkbox|radio)$/i);



    (function() {
        var fragment = document.createDocumentFragment(),
            div = fragment.appendChild( document.createElement( "div" ) ),
            input = document.createElement( "input" );

        // Support: Safari<=5.1
        // Check state lost if the name is set (#11217)
        // Support: Windows Web Apps (WWA)
        // `name` and `type` must use .setAttribute for WWA (#14901)
        input.setAttribute( "type", "radio" );
        input.setAttribute( "checked", "checked" );
        input.setAttribute( "name", "t" );

        div.appendChild( input );

        // Support: Safari<=5.1, Android<4.2
        // Older WebKit doesn't clone checked state correctly in fragments
        support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

        // Support: IE<=11+
        // Make sure textarea (and checkbox) defaultValue is properly cloned
        div.innerHTML = "<textarea>x</textarea>";
        support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
    })();
    var strundefined = typeof undefined;



    support.focusinBubbles = "onfocusin" in window;


    var
        rkeyEvent = /^key/,
        rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
        rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
        rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

    function returnTrue() {
        return true;
    }

    function returnFalse() {
        return false;
    }

    function safeActiveElement() {
        try {
            return document.activeElement;
        } catch ( err ) { }
    }

    /*
     * Helper functions for managing events -- not part of the public interface.
     * Props to Dean Edwards' addEvent library for many of the ideas.
     */
    jQuery.event = {

        global: {},

        add: function( elem, types, handler, data, selector ) {

            var handleObjIn, eventHandle, tmp,
                events, t, handleObj,
                special, handlers, type, namespaces, origType,
                elemData = data_priv.get( elem );

            // Don't attach events to noData or text/comment nodes (but allow plain objects)
            if ( !elemData ) {
                return;
            }

            // Caller can pass in an object of custom data in lieu of the handler
            if ( handler.handler ) {
                handleObjIn = handler;
                handler = handleObjIn.handler;
                selector = handleObjIn.selector;
            }

            // Make sure that the handler has a unique ID, used to find/remove it later
            if ( !handler.guid ) {
                handler.guid = jQuery.guid++;
            }

            // Init the element's event structure and main handler, if this is the first
            if ( !(events = elemData.events) ) {
                events = elemData.events = {};
            }
            if ( !(eventHandle = elemData.handle) ) {
                eventHandle = elemData.handle = function( e ) {
                    // Discard the second event of a jQuery.event.trigger() and
                    // when an event is called after a page has unloaded
                    return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
                        jQuery.event.dispatch.apply( elem, arguments ) : undefined;
                };
            }

            // Handle multiple events separated by a space
            types = ( types || "" ).match( rnotwhite ) || [ "" ];
            t = types.length;
            while ( t-- ) {
                tmp = rtypenamespace.exec( types[t] ) || [];
                type = origType = tmp[1];
                namespaces = ( tmp[2] || "" ).split( "." ).sort();

                // There *must* be a type, no attaching namespace-only handlers
                if ( !type ) {
                    continue;
                }

                // If event changes its type, use the special event handlers for the changed type
                special = jQuery.event.special[ type ] || {};

                // If selector defined, determine special event api type, otherwise given type
                type = ( selector ? special.delegateType : special.bindType ) || type;

                // Update special based on newly reset type
                special = jQuery.event.special[ type ] || {};

                // handleObj is passed to all event handlers
                handleObj = jQuery.extend({
                    type: type,
                    origType: origType,
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
                    namespace: namespaces.join(".")
                }, handleObjIn );

                // Init the event handler queue if we're the first
                if ( !(handlers = events[ type ]) ) {
                    handlers = events[ type ] = [];
                    handlers.delegateCount = 0;

                    // Only use addEventListener if the special events handler returns false
                    if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
                        if ( elem.addEventListener ) {
                            elem.addEventListener( type, eventHandle, false );
                        }
                    }
                }

                if ( special.add ) {
                    special.add.call( elem, handleObj );

                    if ( !handleObj.handler.guid ) {
                        handleObj.handler.guid = handler.guid;
                    }
                }

                // Add to the element's handler list, delegates in front
                if ( selector ) {
                    handlers.splice( handlers.delegateCount++, 0, handleObj );
                } else {
                    handlers.push( handleObj );
                }

                // Keep track of which events have ever been used, for event optimization
                jQuery.event.global[ type ] = true;
            }

        },

        // Detach an event or set of events from an element
        remove: function( elem, types, handler, selector, mappedTypes ) {

            var j, origCount, tmp,
                events, t, handleObj,
                special, handlers, type, namespaces, origType,
                elemData = data_priv.hasData( elem ) && data_priv.get( elem );

            if ( !elemData || !(events = elemData.events) ) {
                return;
            }

            // Once for each type.namespace in types; type may be omitted
            types = ( types || "" ).match( rnotwhite ) || [ "" ];
            t = types.length;
            while ( t-- ) {
                tmp = rtypenamespace.exec( types[t] ) || [];
                type = origType = tmp[1];
                namespaces = ( tmp[2] || "" ).split( "." ).sort();

                // Unbind all events (on this namespace, if provided) for the element
                if ( !type ) {
                    for ( type in events ) {
                        jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
                    }
                    continue;
                }

                special = jQuery.event.special[ type ] || {};
                type = ( selector ? special.delegateType : special.bindType ) || type;
                handlers = events[ type ] || [];
                tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

                // Remove matching events
                origCount = j = handlers.length;
                while ( j-- ) {
                    handleObj = handlers[ j ];

                    if ( ( mappedTypes || origType === handleObj.origType ) &&
                        ( !handler || handler.guid === handleObj.guid ) &&
                        ( !tmp || tmp.test( handleObj.namespace ) ) &&
                        ( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
                        handlers.splice( j, 1 );

                        if ( handleObj.selector ) {
                            handlers.delegateCount--;
                        }
                        if ( special.remove ) {
                            special.remove.call( elem, handleObj );
                        }
                    }
                }

                // Remove generic event handler if we removed something and no more handlers exist
                // (avoids potential for endless recursion during removal of special event handlers)
                if ( origCount && !handlers.length ) {
                    if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
                        jQuery.removeEvent( elem, type, elemData.handle );
                    }

                    delete events[ type ];
                }
            }

            // Remove the expando if it's no longer used
            if ( jQuery.isEmptyObject( events ) ) {
                delete elemData.handle;
                data_priv.remove( elem, "events" );
            }
        },

        trigger: function( event, data, elem, onlyHandlers ) {

            var i, cur, tmp, bubbleType, ontype, handle, special,
                eventPath = [ elem || document ],
                type = hasOwn.call( event, "type" ) ? event.type : event,
                namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

            cur = tmp = elem = elem || document;

            // Don't do events on text and comment nodes
            if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
                return;
            }

            // focus/blur morphs to focusin/out; ensure we're not firing them right now
            if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
                return;
            }

            if ( type.indexOf(".") >= 0 ) {
                // Namespaced trigger; create a regexp to match event type in handle()
                namespaces = type.split(".");
                type = namespaces.shift();
                namespaces.sort();
            }
            ontype = type.indexOf(":") < 0 && "on" + type;

            // Caller can pass in a jQuery.Event object, Object, or just an event type string
            event = event[ jQuery.expando ] ?
                event :
                new jQuery.Event( type, typeof event === "object" && event );

            // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
            event.isTrigger = onlyHandlers ? 2 : 3;
            event.namespace = namespaces.join(".");
            event.namespace_re = event.namespace ?
                new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
                null;

            // Clean up the event in case it is being reused
            event.result = undefined;
            if ( !event.target ) {
                event.target = elem;
            }

            // Clone any incoming data and prepend the event, creating the handler arg list
            data = data == null ?
                [ event ] :
                jQuery.makeArray( data, [ event ] );

            // Allow special events to draw outside the lines
            special = jQuery.event.special[ type ] || {};
            if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
                return;
            }

            // Determine event propagation path in advance, per W3C events spec (#9951)
            // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
            if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

                bubbleType = special.delegateType || type;
                if ( !rfocusMorph.test( bubbleType + type ) ) {
                    cur = cur.parentNode;
                }
                for ( ; cur; cur = cur.parentNode ) {
                    eventPath.push( cur );
                    tmp = cur;
                }

                // Only add window if we got to document (e.g., not plain obj or detached DOM)
                if ( tmp === (elem.ownerDocument || document) ) {
                    eventPath.push( tmp.defaultView || tmp.parentWindow || window );
                }
            }

            // Fire handlers on the event path
            i = 0;
            while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

                event.type = i > 1 ?
                    bubbleType :
                special.bindType || type;

                // jQuery handler
                handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
                if ( handle ) {
                    handle.apply( cur, data );
                }

                // Native handler
                handle = ontype && cur[ ontype ];
                if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
                    event.result = handle.apply( cur, data );
                    if ( event.result === false ) {
                        event.preventDefault();
                    }
                }
            }
            event.type = type;

            // If nobody prevented the default action, do it now
            if ( !onlyHandlers && !event.isDefaultPrevented() ) {

                if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
                    jQuery.acceptData( elem ) ) {

                    // Call a native DOM method on the target with the same name name as the event.
                    // Don't do default actions on window, that's where global variables be (#6170)
                    if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

                        // Don't re-trigger an onFOO event when we call its FOO() method
                        tmp = elem[ ontype ];

                        if ( tmp ) {
                            elem[ ontype ] = null;
                        }

                        // Prevent re-triggering of the same event, since we already bubbled it above
                        jQuery.event.triggered = type;
                        elem[ type ]();
                        jQuery.event.triggered = undefined;

                        if ( tmp ) {
                            elem[ ontype ] = tmp;
                        }
                    }
                }
            }

            return event.result;
        },

        dispatch: function( event ) {

            // Make a writable jQuery.Event from the native event object
            event = jQuery.event.fix( event );

            var i, j, ret, matched, handleObj,
                handlerQueue = [],
                args = slice.call( arguments ),
                handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
                special = jQuery.event.special[ event.type ] || {};

            // Use the fix-ed jQuery.Event rather than the (read-only) native event
            args[0] = event;
            event.delegateTarget = this;

            // Call the preDispatch hook for the mapped type, and let it bail if desired
            if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
                return;
            }

            // Determine handlers
            handlerQueue = jQuery.event.handlers.call( this, event, handlers );

            // Run delegates first; they may want to stop propagation beneath us
            i = 0;
            while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
                event.currentTarget = matched.elem;

                j = 0;
                while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

                    // Triggered event must either 1) have no namespace, or 2) have namespace(s)
                    // a subset or equal to those in the bound event (both can have no namespace).
                    if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

                        event.handleObj = handleObj;
                        event.data = handleObj.data;

                        ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
                            .apply( matched.elem, args );

                        if ( ret !== undefined ) {
                            if ( (event.result = ret) === false ) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                        }
                    }
                }
            }

            // Call the postDispatch hook for the mapped type
            if ( special.postDispatch ) {
                special.postDispatch.call( this, event );
            }

            return event.result;
        },

        handlers: function( event, handlers ) {
            var i, matches, sel, handleObj,
                handlerQueue = [],
                delegateCount = handlers.delegateCount,
                cur = event.target;

            // Find delegate handlers
            // Black-hole SVG <use> instance trees (#13180)
            // Avoid non-left-click bubbling in Firefox (#3861)
            if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

                for ( ; cur !== this; cur = cur.parentNode || this ) {

                    // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
                    if ( cur.disabled !== true || event.type !== "click" ) {
                        matches = [];
                        for ( i = 0; i < delegateCount; i++ ) {
                            handleObj = handlers[ i ];

                            // Don't conflict with Object.prototype properties (#13203)
                            sel = handleObj.selector + " ";

                            if ( matches[ sel ] === undefined ) {
                                matches[ sel ] = handleObj.needsContext ?
                                jQuery( sel, this ).index( cur ) >= 0 :
                                    jQuery.find( sel, this, null, [ cur ] ).length;
                            }
                            if ( matches[ sel ] ) {
                                matches.push( handleObj );
                            }
                        }
                        if ( matches.length ) {
                            handlerQueue.push({ elem: cur, handlers: matches });
                        }
                    }
                }
            }

            // Add the remaining (directly-bound) handlers
            if ( delegateCount < handlers.length ) {
                handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
            }

            return handlerQueue;
        },

        // Includes some event props shared by KeyEvent and MouseEvent
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

        fixHooks: {},

        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function( event, original ) {

                // Add which for key events
                if ( event.which == null ) {
                    event.which = original.charCode != null ? original.charCode : original.keyCode;
                }

                return event;
            }
        },

        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function( event, original ) {
                var eventDoc, doc, body,
                    button = original.button;

                // Calculate pageX/Y if missing and clientX/Y available
                if ( event.pageX == null && original.clientX != null ) {
                    eventDoc = event.target.ownerDocument || document;
                    doc = eventDoc.documentElement;
                    body = eventDoc.body;

                    event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
                    event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
                }

                // Add which for click: 1 === left; 2 === middle; 3 === right
                // Note: button is not normalized, so don't use it
                if ( !event.which && button !== undefined ) {
                    event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
                }

                return event;
            }
        },

        fix: function( event ) {
            if ( event[ jQuery.expando ] ) {
                return event;
            }

            // Create a writable copy of the event object and normalize some properties
            var i, prop, copy,
                type = event.type,
                originalEvent = event,
                fixHook = this.fixHooks[ type ];

            if ( !fixHook ) {
                this.fixHooks[ type ] = fixHook =
                    rmouseEvent.test( type ) ? this.mouseHooks :
                        rkeyEvent.test( type ) ? this.keyHooks :
                        {};
            }
            copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

            event = new jQuery.Event( originalEvent );

            i = copy.length;
            while ( i-- ) {
                prop = copy[ i ];
                event[ prop ] = originalEvent[ prop ];
            }

            // Support: Cordova 2.5 (WebKit) (#13255)
            // All events should have a target; Cordova deviceready doesn't
            if ( !event.target ) {
                event.target = document;
            }

            // Support: Safari 6.0+, Chrome<28
            // Target should not be a text node (#504, #13143)
            if ( event.target.nodeType === 3 ) {
                event.target = event.target.parentNode;
            }

            return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
        },

        special: {
            load: {
                // Prevent triggered image.load events from bubbling to window.load
                noBubble: true
            },
            focus: {
                // Fire native event if possible so blur/focus sequence is correct
                trigger: function() {
                    if ( this !== safeActiveElement() && this.focus ) {
                        this.focus();
                        return false;
                    }
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if ( this === safeActiveElement() && this.blur ) {
                        this.blur();
                        return false;
                    }
                },
                delegateType: "focusout"
            },
            click: {
                // For checkbox, fire native event so checked state will be right
                trigger: function() {
                    if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
                        this.click();
                        return false;
                    }
                },

                // For cross-browser consistency, don't fire native .click() on links
                _default: function( event ) {
                    return jQuery.nodeName( event.target, "a" );
                }
            },

            beforeunload: {
                postDispatch: function( event ) {

                    // Support: Firefox 20+
                    // Firefox doesn't alert if the returnValue field is not set.
                    if ( event.result !== undefined && event.originalEvent ) {
                        event.originalEvent.returnValue = event.result;
                    }
                }
            }
        },

        simulate: function( type, elem, event, bubble ) {
            // Piggyback on a donor event to simulate a different one.
            // Fake originalEvent to avoid donor's stopPropagation, but if the
            // simulated event prevents default then we do the same on the donor.
            var e = jQuery.extend(
                new jQuery.Event(),
                event,
                {
                    type: type,
                    isSimulated: true,
                    originalEvent: {}
                }
            );
            if ( bubble ) {
                jQuery.event.trigger( e, null, elem );
            } else {
                jQuery.event.dispatch.call( elem, e );
            }
            if ( e.isDefaultPrevented() ) {
                event.preventDefault();
            }
        }
    };

    jQuery.removeEvent = function( elem, type, handle ) {
        if ( elem.removeEventListener ) {
            elem.removeEventListener( type, handle, false );
        }
    };

    jQuery.Event = function( src, props ) {
        // Allow instantiation without the 'new' keyword
        if ( !(this instanceof jQuery.Event) ) {
            return new jQuery.Event( src, props );
        }

        // Event object
        if ( src && src.type ) {
            this.originalEvent = src;
            this.type = src.type;

            // Events bubbling up the document may have been marked as prevented
            // by a handler lower down the tree; reflect the correct value.
            this.isDefaultPrevented = src.defaultPrevented ||
            src.defaultPrevented === undefined &&
                // Support: Android<4.0
            src.returnValue === false ?
                returnTrue :
                returnFalse;

            // Event type
        } else {
            this.type = src;
        }

        // Put explicitly provided properties onto the event object
        if ( props ) {
            jQuery.extend( this, props );
        }

        // Create a timestamp if incoming event doesn't have one
        this.timeStamp = src && src.timeStamp || jQuery.now();

        // Mark it as fixed
        this[ jQuery.expando ] = true;
    };

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
    jQuery.Event.prototype = {
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,

        preventDefault: function() {
            var e = this.originalEvent;

            this.isDefaultPrevented = returnTrue;

            if ( e && e.preventDefault ) {
                e.preventDefault();
            }
        },
        stopPropagation: function() {
            var e = this.originalEvent;

            this.isPropagationStopped = returnTrue;

            if ( e && e.stopPropagation ) {
                e.stopPropagation();
            }
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;

            this.isImmediatePropagationStopped = returnTrue;

            if ( e && e.stopImmediatePropagation ) {
                e.stopImmediatePropagation();
            }

            this.stopPropagation();
        }
    };

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
    jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function( orig, fix ) {
        jQuery.event.special[ orig ] = {
            delegateType: fix,
            bindType: fix,

            handle: function( event ) {
                var ret,
                    target = this,
                    related = event.relatedTarget,
                    handleObj = event.handleObj;

                // For mousenter/leave call the handler if related is outside the target.
                // NB: No relatedTarget if the mouse left/entered the browser window
                if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
                    event.type = handleObj.origType;
                    ret = handleObj.handler.apply( this, arguments );
                    event.type = fix;
                }
                return ret;
            }
        };
    });

// Support: Firefox, Chrome, Safari
// Create "bubbling" focus and blur events
    if ( !support.focusinBubbles ) {
        jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

            // Attach a single capturing handler on the document while someone wants focusin/focusout
            var handler = function( event ) {
                jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
            };

            jQuery.event.special[ fix ] = {
                setup: function() {
                    var doc = this.ownerDocument || this,
                        attaches = data_priv.access( doc, fix );

                    if ( !attaches ) {
                        doc.addEventListener( orig, handler, true );
                    }
                    data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
                },
                teardown: function() {
                    var doc = this.ownerDocument || this,
                        attaches = data_priv.access( doc, fix ) - 1;

                    if ( !attaches ) {
                        doc.removeEventListener( orig, handler, true );
                        data_priv.remove( doc, fix );

                    } else {
                        data_priv.access( doc, fix, attaches );
                    }
                }
            };
        });
    }

    jQuery.fn.extend({

        on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
            var origFn, type;

            // Types can be a map of types/handlers
            if ( typeof types === "object" ) {
                // ( types-Object, selector, data )
                if ( typeof selector !== "string" ) {
                    // ( types-Object, data )
                    data = data || selector;
                    selector = undefined;
                }
                for ( type in types ) {
                    this.on( type, selector, data, types[ type ], one );
                }
                return this;
            }

            if ( data == null && fn == null ) {
                // ( types, fn )
                fn = selector;
                data = selector = undefined;
            } else if ( fn == null ) {
                if ( typeof selector === "string" ) {
                    // ( types, selector, fn )
                    fn = data;
                    data = undefined;
                } else {
                    // ( types, data, fn )
                    fn = data;
                    data = selector;
                    selector = undefined;
                }
            }
            if ( fn === false ) {
                fn = returnFalse;
            } else if ( !fn ) {
                return this;
            }

            if ( one === 1 ) {
                origFn = fn;
                fn = function( event ) {
                    // Can use an empty set, since event contains the info
                    jQuery().off( event );
                    return origFn.apply( this, arguments );
                };
                // Use same guid so caller can remove using origFn
                fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
            }
            return this.each( function() {
                jQuery.event.add( this, types, fn, data, selector );
            });
        },
        one: function( types, selector, data, fn ) {
            return this.on( types, selector, data, fn, 1 );
        },
        off: function( types, selector, fn ) {
            var handleObj, type;
            if ( types && types.preventDefault && types.handleObj ) {
                // ( event )  dispatched jQuery.Event
                handleObj = types.handleObj;
                jQuery( types.delegateTarget ).off(
                    handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
                    handleObj.selector,
                    handleObj.handler
                );
                return this;
            }
            if ( typeof types === "object" ) {
                // ( types-object [, selector] )
                for ( type in types ) {
                    this.off( type, selector, types[ type ] );
                }
                return this;
            }
            if ( selector === false || typeof selector === "function" ) {
                // ( types [, fn] )
                fn = selector;
                selector = undefined;
            }
            if ( fn === false ) {
                fn = returnFalse;
            }
            return this.each(function() {
                jQuery.event.remove( this, types, fn, selector );
            });
        },

        trigger: function( type, data ) {
            return this.each(function() {
                jQuery.event.trigger( type, data, this );
            });
        },
        triggerHandler: function( type, data ) {
            var elem = this[0];
            if ( elem ) {
                return jQuery.event.trigger( type, data, elem, true );
            }
        }
    });


    var
        rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        rtagName = /<([\w:]+)/,
        rhtml = /<|&#?\w+;/,
        rnoInnerhtml = /<(?:script|style|link)/i,
    // checked="checked" or checked
        rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
        rscriptType = /^$|\/(?:java|ecma)script/i,
        rscriptTypeMasked = /^true\/(.*)/,
        rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

    // We have to close these tags to support XHTML (#13200)
        wrapMap = {

            // Support: IE9
            option: [ 1, "<select multiple='multiple'>", "</select>" ],

            thead: [ 1, "<table>", "</table>" ],
            col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
            tr: [ 2, "<table><tbody>", "</tbody></table>" ],
            td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

            _default: [ 0, "", "" ]
        };

// Support: IE9
    wrapMap.optgroup = wrapMap.option;

    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
    function manipulationTarget( elem, content ) {
        return jQuery.nodeName( elem, "table" ) &&
        jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

        elem.getElementsByTagName("tbody")[0] ||
        elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
            elem;
    }

// Replace/restore the type attribute of script elements for safe DOM manipulation
    function disableScript( elem ) {
        elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
        return elem;
    }
    function restoreScript( elem ) {
        var match = rscriptTypeMasked.exec( elem.type );

        if ( match ) {
            elem.type = match[ 1 ];
        } else {
            elem.removeAttribute("type");
        }

        return elem;
    }

// Mark scripts as having already been evaluated
    function setGlobalEval( elems, refElements ) {
        var i = 0,
            l = elems.length;

        for ( ; i < l; i++ ) {
            data_priv.set(
                elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
            );
        }
    }

    function cloneCopyEvent( src, dest ) {
        var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

        if ( dest.nodeType !== 1 ) {
            return;
        }

        // 1. Copy private data: events, handlers, etc.
        if ( data_priv.hasData( src ) ) {
            pdataOld = data_priv.access( src );
            pdataCur = data_priv.set( dest, pdataOld );
            events = pdataOld.events;

            if ( events ) {
                delete pdataCur.handle;
                pdataCur.events = {};

                for ( type in events ) {
                    for ( i = 0, l = events[ type ].length; i < l; i++ ) {
                        jQuery.event.add( dest, type, events[ type ][ i ] );
                    }
                }
            }
        }

        // 2. Copy user data
        if ( data_user.hasData( src ) ) {
            udataOld = data_user.access( src );
            udataCur = jQuery.extend( {}, udataOld );

            data_user.set( dest, udataCur );
        }
    }

    function getAll( context, tag ) {
        var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
            context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
                [];

        return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
            jQuery.merge( [ context ], ret ) :
            ret;
    }

// Fix IE bugs, see support tests
    function fixInput( src, dest ) {
        var nodeName = dest.nodeName.toLowerCase();

        // Fails to persist the checked state of a cloned checkbox or radio button.
        if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
            dest.checked = src.checked;

            // Fails to return the selected option to the default selected state when cloning options
        } else if ( nodeName === "input" || nodeName === "textarea" ) {
            dest.defaultValue = src.defaultValue;
        }
    }

    jQuery.extend({
        clone: function( elem, dataAndEvents, deepDataAndEvents ) {
            var i, l, srcElements, destElements,
                clone = elem.cloneNode( true ),
                inPage = jQuery.contains( elem.ownerDocument, elem );

            // Fix IE cloning issues
            if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
                !jQuery.isXMLDoc( elem ) ) {

                // We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
                destElements = getAll( clone );
                srcElements = getAll( elem );

                for ( i = 0, l = srcElements.length; i < l; i++ ) {
                    fixInput( srcElements[ i ], destElements[ i ] );
                }
            }

            // Copy the events from the original to the clone
            if ( dataAndEvents ) {
                if ( deepDataAndEvents ) {
                    srcElements = srcElements || getAll( elem );
                    destElements = destElements || getAll( clone );

                    for ( i = 0, l = srcElements.length; i < l; i++ ) {
                        cloneCopyEvent( srcElements[ i ], destElements[ i ] );
                    }
                } else {
                    cloneCopyEvent( elem, clone );
                }
            }

            // Preserve script evaluation history
            destElements = getAll( clone, "script" );
            if ( destElements.length > 0 ) {
                setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
            }

            // Return the cloned set
            return clone;
        },

        buildFragment: function( elems, context, scripts, selection ) {
            var elem, tmp, tag, wrap, contains, j,
                fragment = context.createDocumentFragment(),
                nodes = [],
                i = 0,
                l = elems.length;

            for ( ; i < l; i++ ) {
                elem = elems[ i ];

                if ( elem || elem === 0 ) {

                    // Add nodes directly
                    if ( jQuery.type( elem ) === "object" ) {
                        // Support: QtWebKit, PhantomJS
                        // push.apply(_, arraylike) throws on ancient WebKit
                        jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

                        // Convert non-html into a text node
                    } else if ( !rhtml.test( elem ) ) {
                        nodes.push( context.createTextNode( elem ) );

                        // Convert html into DOM nodes
                    } else {
                        tmp = tmp || fragment.appendChild( context.createElement("div") );

                        // Deserialize a standard representation
                        tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
                        wrap = wrapMap[ tag ] || wrapMap._default;
                        tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

                        // Descend through wrappers to the right content
                        j = wrap[ 0 ];
                        while ( j-- ) {
                            tmp = tmp.lastChild;
                        }

                        // Support: QtWebKit, PhantomJS
                        // push.apply(_, arraylike) throws on ancient WebKit
                        jQuery.merge( nodes, tmp.childNodes );

                        // Remember the top-level container
                        tmp = fragment.firstChild;

                        // Ensure the created nodes are orphaned (#12392)
                        tmp.textContent = "";
                    }
                }
            }

            // Remove wrapper from fragment
            fragment.textContent = "";

            i = 0;
            while ( (elem = nodes[ i++ ]) ) {

                // #4087 - If origin and destination elements are the same, and this is
                // that element, do not do anything
                if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
                    continue;
                }

                contains = jQuery.contains( elem.ownerDocument, elem );

                // Append to fragment
                tmp = getAll( fragment.appendChild( elem ), "script" );

                // Preserve script evaluation history
                if ( contains ) {
                    setGlobalEval( tmp );
                }

                // Capture executables
                if ( scripts ) {
                    j = 0;
                    while ( (elem = tmp[ j++ ]) ) {
                        if ( rscriptType.test( elem.type || "" ) ) {
                            scripts.push( elem );
                        }
                    }
                }
            }

            return fragment;
        },

        cleanData: function( elems ) {
            var data, elem, type, key,
                special = jQuery.event.special,
                i = 0;

            for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
                if ( jQuery.acceptData( elem ) ) {
                    key = elem[ data_priv.expando ];

                    if ( key && (data = data_priv.cache[ key ]) ) {
                        if ( data.events ) {
                            for ( type in data.events ) {
                                if ( special[ type ] ) {
                                    jQuery.event.remove( elem, type );

                                    // This is a shortcut to avoid jQuery.event.remove's overhead
                                } else {
                                    jQuery.removeEvent( elem, type, data.handle );
                                }
                            }
                        }
                        if ( data_priv.cache[ key ] ) {
                            // Discard any remaining `private` data
                            delete data_priv.cache[ key ];
                        }
                    }
                }
                // Discard any remaining `user` data
                delete data_user.cache[ elem[ data_user.expando ] ];
            }
        }
    });

    jQuery.fn.extend({
        text: function( value ) {
            return access( this, function( value ) {
                return value === undefined ?
                    jQuery.text( this ) :
                    this.empty().each(function() {
                        if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
                            this.textContent = value;
                        }
                    });
            }, null, value, arguments.length );
        },

        append: function() {
            return this.domManip( arguments, function( elem ) {
                if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
                    var target = manipulationTarget( this, elem );
                    target.appendChild( elem );
                }
            });
        },

        prepend: function() {
            return this.domManip( arguments, function( elem ) {
                if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
                    var target = manipulationTarget( this, elem );
                    target.insertBefore( elem, target.firstChild );
                }
            });
        },

        before: function() {
            return this.domManip( arguments, function( elem ) {
                if ( this.parentNode ) {
                    this.parentNode.insertBefore( elem, this );
                }
            });
        },

        after: function() {
            return this.domManip( arguments, function( elem ) {
                if ( this.parentNode ) {
                    this.parentNode.insertBefore( elem, this.nextSibling );
                }
            });
        },

        remove: function( selector, keepData /* Internal Use Only */ ) {
            var elem,
                elems = selector ? jQuery.filter( selector, this ) : this,
                i = 0;

            for ( ; (elem = elems[i]) != null; i++ ) {
                if ( !keepData && elem.nodeType === 1 ) {
                    jQuery.cleanData( getAll( elem ) );
                }

                if ( elem.parentNode ) {
                    if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
                        setGlobalEval( getAll( elem, "script" ) );
                    }
                    elem.parentNode.removeChild( elem );
                }
            }

            return this;
        },

        empty: function() {
            var elem,
                i = 0;

            for ( ; (elem = this[i]) != null; i++ ) {
                if ( elem.nodeType === 1 ) {

                    // Prevent memory leaks
                    jQuery.cleanData( getAll( elem, false ) );

                    // Remove any remaining nodes
                    elem.textContent = "";
                }
            }

            return this;
        },

        clone: function( dataAndEvents, deepDataAndEvents ) {
            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
            deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

            return this.map(function() {
                return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
            });
        },

        html: function( value ) {
            return access( this, function( value ) {
                var elem = this[ 0 ] || {},
                    i = 0,
                    l = this.length;

                if ( value === undefined && elem.nodeType === 1 ) {
                    return elem.innerHTML;
                }

                // See if we can take a shortcut and just use innerHTML
                if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
                    !wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

                    value = value.replace( rxhtmlTag, "<$1></$2>" );

                    try {
                        for ( ; i < l; i++ ) {
                            elem = this[ i ] || {};

                            // Remove element nodes and prevent memory leaks
                            if ( elem.nodeType === 1 ) {
                                jQuery.cleanData( getAll( elem, false ) );
                                elem.innerHTML = value;
                            }
                        }

                        elem = 0;

                        // If using innerHTML throws an exception, use the fallback method
                    } catch( e ) {}
                }

                if ( elem ) {
                    this.empty().append( value );
                }
            }, null, value, arguments.length );
        },

        replaceWith: function() {
            var arg = arguments[ 0 ];

            // Make the changes, replacing each context element with the new content
            this.domManip( arguments, function( elem ) {
                arg = this.parentNode;

                jQuery.cleanData( getAll( this ) );

                if ( arg ) {
                    arg.replaceChild( elem, this );
                }
            });

            // Force removal if there was no new content (e.g., from empty arguments)
            return arg && (arg.length || arg.nodeType) ? this : this.remove();
        },

        detach: function( selector ) {
            return this.remove( selector, true );
        },

        domManip: function( args, callback ) {

            // Flatten any nested arrays
            args = concat.apply( [], args );

            var fragment, first, scripts, hasScripts, node, doc,
                i = 0,
                l = this.length,
                set = this,
                iNoClone = l - 1,
                value = args[ 0 ],
                isFunction = jQuery.isFunction( value );

            // We can't cloneNode fragments that contain checked, in WebKit
            if ( isFunction ||
                ( l > 1 && typeof value === "string" &&
                !support.checkClone && rchecked.test( value ) ) ) {
                return this.each(function( index ) {
                    var self = set.eq( index );
                    if ( isFunction ) {
                        args[ 0 ] = value.call( this, index, self.html() );
                    }
                    self.domManip( args, callback );
                });
            }

            if ( l ) {
                fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
                first = fragment.firstChild;

                if ( fragment.childNodes.length === 1 ) {
                    fragment = first;
                }

                if ( first ) {
                    scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
                    hasScripts = scripts.length;

                    // Use the original fragment for the last item instead of the first because it can end up
                    // being emptied incorrectly in certain situations (#8070).
                    for ( ; i < l; i++ ) {
                        node = fragment;

                        if ( i !== iNoClone ) {
                            node = jQuery.clone( node, true, true );

                            // Keep references to cloned scripts for later restoration
                            if ( hasScripts ) {
                                // Support: QtWebKit
                                // jQuery.merge because push.apply(_, arraylike) throws
                                jQuery.merge( scripts, getAll( node, "script" ) );
                            }
                        }

                        callback.call( this[ i ], node, i );
                    }

                    if ( hasScripts ) {
                        doc = scripts[ scripts.length - 1 ].ownerDocument;

                        // Reenable scripts
                        jQuery.map( scripts, restoreScript );

                        // Evaluate executable scripts on first document insertion
                        for ( i = 0; i < hasScripts; i++ ) {
                            node = scripts[ i ];
                            if ( rscriptType.test( node.type || "" ) &&
                                !data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

                                if ( node.src ) {
                                    // Optional AJAX dependency, but won't run scripts if not present
                                    if ( jQuery._evalUrl ) {
                                        jQuery._evalUrl( node.src );
                                    }
                                } else {
                                    jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
                                }
                            }
                        }
                    }
                }
            }

            return this;
        }
    });

    jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function( name, original ) {
        jQuery.fn[ name ] = function( selector ) {
            var elems,
                ret = [],
                insert = jQuery( selector ),
                last = insert.length - 1,
                i = 0;

            for ( ; i <= last; i++ ) {
                elems = i === last ? this : this.clone( true );
                jQuery( insert[ i ] )[ original ]( elems );

                // Support: QtWebKit
                // .get() because push.apply(_, arraylike) throws
                push.apply( ret, elems.get() );
            }

            return this.pushStack( ret );
        };
    });


    var iframe,
        elemdisplay = {};

    /**
     * Retrieve the actual display of a element
     * @param {String} name nodeName of the element
     * @param {Object} doc Document object
     */
// Called only from within defaultDisplay
    function actualDisplay( name, doc ) {
        var style,
            elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

        // getDefaultComputedStyle might be reliably used only on attached element
            display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

                // Use of this method is a temporary fix (more like optimization) until something better comes along,
                // since it was removed from specification and supported only in FF
                style.display : jQuery.css( elem[ 0 ], "display" );

        // We don't have any data stored on the element,
        // so use "detach" method as fast way to get rid of the element
        elem.detach();

        return display;
    }

    /**
     * Try to determine the default display value of an element
     * @param {String} nodeName
     */
    function defaultDisplay( nodeName ) {
        var doc = document,
            display = elemdisplay[ nodeName ];

        if ( !display ) {
            display = actualDisplay( nodeName, doc );

            // If the simple way fails, read from inside an iframe
            if ( display === "none" || !display ) {

                // Use the already-created iframe if possible
                iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

                // Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
                doc = iframe[ 0 ].contentDocument;

                // Support: IE
                doc.write();
                doc.close();

                display = actualDisplay( nodeName, doc );
                iframe.detach();
            }

            // Store the correct default display
            elemdisplay[ nodeName ] = display;
        }

        return display;
    }
    var rmargin = (/^margin/);

    var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

    var getStyles = function( elem ) {
        // Support: IE<=11+, Firefox<=30+ (#15098, #14150)
        // IE throws on elements created in popups
        // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
        if ( elem.ownerDocument.defaultView.opener ) {
            return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
        }

        return window.getComputedStyle( elem, null );
    };



    function curCSS( elem, name, computed ) {
        var width, minWidth, maxWidth, ret,
            style = elem.style;

        computed = computed || getStyles( elem );

        // Support: IE9
        // getPropertyValue is only needed for .css('filter') (#12537)
        if ( computed ) {
            ret = computed.getPropertyValue( name ) || computed[ name ];
        }

        if ( computed ) {

            if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
                ret = jQuery.style( elem, name );
            }

            // Support: iOS < 6
            // A tribute to the "awesome hack by Dean Edwards"
            // iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
            // this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
            if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

                // Remember the original values
                width = style.width;
                minWidth = style.minWidth;
                maxWidth = style.maxWidth;

                // Put in the new values to get a computed value out
                style.minWidth = style.maxWidth = style.width = ret;
                ret = computed.width;

                // Revert the changed values
                style.width = width;
                style.minWidth = minWidth;
                style.maxWidth = maxWidth;
            }
        }

        return ret !== undefined ?
            // Support: IE
            // IE returns zIndex value as an integer.
        ret + "" :
            ret;
    }


    function addGetHookIf( conditionFn, hookFn ) {
        // Define the hook, we'll check on the first run if it's really needed.
        return {
            get: function() {
                if ( conditionFn() ) {
                    // Hook not needed (or it's not possible to use it due
                    // to missing dependency), remove it.
                    delete this.get;
                    return;
                }

                // Hook needed; redefine it so that the support test is not executed again.
                return (this.get = hookFn).apply( this, arguments );
            }
        };
    }


    (function() {
        var pixelPositionVal, boxSizingReliableVal,
            docElem = document.documentElement,
            container = document.createElement( "div" ),
            div = document.createElement( "div" );

        if ( !div.style ) {
            return;
        }

        // Support: IE9-11+
        // Style of cloned element affects source element cloned (#8908)
        div.style.backgroundClip = "content-box";
        div.cloneNode( true ).style.backgroundClip = "";
        support.clearCloneStyle = div.style.backgroundClip === "content-box";

        container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
        "position:absolute";
        container.appendChild( div );

        // Executing both pixelPosition & boxSizingReliable tests require only one layout
        // so they're executed at the same time to save the second computation.
        function computePixelPositionAndBoxSizingReliable() {
            div.style.cssText =
                // Support: Firefox<29, Android 2.3
                // Vendor-prefix box-sizing
                "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
                "box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
                "border:1px;padding:1px;width:4px;position:absolute";
            div.innerHTML = "";
            docElem.appendChild( container );

            var divStyle = window.getComputedStyle( div, null );
            pixelPositionVal = divStyle.top !== "1%";
            boxSizingReliableVal = divStyle.width === "4px";

            docElem.removeChild( container );
        }

        // Support: node.js jsdom
        // Don't assume that getComputedStyle is a property of the global object
        if ( window.getComputedStyle ) {
            jQuery.extend( support, {
                pixelPosition: function() {

                    // This test is executed only once but we still do memoizing
                    // since we can use the boxSizingReliable pre-computing.
                    // No need to check if the test was already performed, though.
                    computePixelPositionAndBoxSizingReliable();
                    return pixelPositionVal;
                },
                boxSizingReliable: function() {
                    if ( boxSizingReliableVal == null ) {
                        computePixelPositionAndBoxSizingReliable();
                    }
                    return boxSizingReliableVal;
                },
                reliableMarginRight: function() {

                    // Support: Android 2.3
                    // Check if div with explicit width and no margin-right incorrectly
                    // gets computed margin-right based on width of container. (#3333)
                    // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
                    // This support function is only executed once so no memoizing is needed.
                    var ret,
                        marginDiv = div.appendChild( document.createElement( "div" ) );

                    // Reset CSS: box-sizing; display; margin; border; padding
                    marginDiv.style.cssText = div.style.cssText =
                        // Support: Firefox<29, Android 2.3
                        // Vendor-prefix box-sizing
                        "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
                        "box-sizing:content-box;display:block;margin:0;border:0;padding:0";
                    marginDiv.style.marginRight = marginDiv.style.width = "0";
                    div.style.width = "1px";
                    docElem.appendChild( container );

                    ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

                    docElem.removeChild( container );
                    div.removeChild( marginDiv );

                    return ret;
                }
            });
        }
    })();


// A method for quickly swapping in/out CSS properties to get correct calculations.
    jQuery.swap = function( elem, options, callback, args ) {
        var ret, name,
            old = {};

        // Remember the old values, and insert the new ones
        for ( name in options ) {
            old[ name ] = elem.style[ name ];
            elem.style[ name ] = options[ name ];
        }

        ret = callback.apply( elem, args || [] );

        // Revert the old values
        for ( name in options ) {
            elem.style[ name ] = old[ name ];
        }

        return ret;
    };


    var
    // Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
    // See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
        rdisplayswap = /^(none|table(?!-c[ea]).+)/,
        rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
        rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

        cssShow = { position: "absolute", visibility: "hidden", display: "block" },
        cssNormalTransform = {
            letterSpacing: "0",
            fontWeight: "400"
        },

        cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// Return a css property mapped to a potentially vendor prefixed property
    function vendorPropName( style, name ) {

        // Shortcut for names that are not vendor prefixed
        if ( name in style ) {
            return name;
        }

        // Check for vendor prefixed names
        var capName = name[0].toUpperCase() + name.slice(1),
            origName = name,
            i = cssPrefixes.length;

        while ( i-- ) {
            name = cssPrefixes[ i ] + capName;
            if ( name in style ) {
                return name;
            }
        }

        return origName;
    }

    function setPositiveNumber( elem, value, subtract ) {
        var matches = rnumsplit.exec( value );
        return matches ?
            // Guard against undefined "subtract", e.g., when used as in cssHooks
        Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
            value;
    }

    function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
        var i = extra === ( isBorderBox ? "border" : "content" ) ?
                // If we already have the right measurement, avoid augmentation
                4 :
                // Otherwise initialize for horizontal or vertical properties
                name === "width" ? 1 : 0,

            val = 0;

        for ( ; i < 4; i += 2 ) {
            // Both box models exclude margin, so add it if we want it
            if ( extra === "margin" ) {
                val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
            }

            if ( isBorderBox ) {
                // border-box includes padding, so remove it if we want content
                if ( extra === "content" ) {
                    val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
                }

                // At this point, extra isn't border nor margin, so remove border
                if ( extra !== "margin" ) {
                    val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
                }
            } else {
                // At this point, extra isn't content, so add padding
                val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

                // At this point, extra isn't content nor padding, so add border
                if ( extra !== "padding" ) {
                    val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
                }
            }
        }

        return val;
    }

    function getWidthOrHeight( elem, name, extra ) {

        // Start with offset property, which is equivalent to the border-box value
        var valueIsBorderBox = true,
            val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
            styles = getStyles( elem ),
            isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

        // Some non-html elements return undefined for offsetWidth, so check for null/undefined
        // svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
        // MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
        if ( val <= 0 || val == null ) {
            // Fall back to computed then uncomputed css if necessary
            val = curCSS( elem, name, styles );
            if ( val < 0 || val == null ) {
                val = elem.style[ name ];
            }

            // Computed unit is not pixels. Stop here and return.
            if ( rnumnonpx.test(val) ) {
                return val;
            }

            // Check for style in case a browser which returns unreliable values
            // for getComputedStyle silently falls back to the reliable elem.style
            valueIsBorderBox = isBorderBox &&
            ( support.boxSizingReliable() || val === elem.style[ name ] );

            // Normalize "", auto, and prepare for extra
            val = parseFloat( val ) || 0;
        }

        // Use the active box-sizing model to add/subtract irrelevant styles
        return ( val +
            augmentWidthOrHeight(
                elem,
                name,
                extra || ( isBorderBox ? "border" : "content" ),
                valueIsBorderBox,
                styles
            )
            ) + "px";
    }

    function showHide( elements, show ) {
        var display, elem, hidden,
            values = [],
            index = 0,
            length = elements.length;

        for ( ; index < length; index++ ) {
            elem = elements[ index ];
            if ( !elem.style ) {
                continue;
            }

            values[ index ] = data_priv.get( elem, "olddisplay" );
            display = elem.style.display;
            if ( show ) {
                // Reset the inline display of this element to learn if it is
                // being hidden by cascaded rules or not
                if ( !values[ index ] && display === "none" ) {
                    elem.style.display = "";
                }

                // Set elements which have been overridden with display: none
                // in a stylesheet to whatever the default browser style is
                // for such an element
                if ( elem.style.display === "" && isHidden( elem ) ) {
                    values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
                }
            } else {
                hidden = isHidden( elem );

                if ( display !== "none" || !hidden ) {
                    data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
                }
            }
        }

        // Set the display of most of the elements in a second loop
        // to avoid the constant reflow
        for ( index = 0; index < length; index++ ) {
            elem = elements[ index ];
            if ( !elem.style ) {
                continue;
            }
            if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
                elem.style.display = show ? values[ index ] || "" : "none";
            }
        }

        return elements;
    }

    jQuery.extend({

        // Add in style property hooks for overriding the default
        // behavior of getting and setting a style property
        cssHooks: {
            opacity: {
                get: function( elem, computed ) {
                    if ( computed ) {

                        // We should always get a number back from opacity
                        var ret = curCSS( elem, "opacity" );
                        return ret === "" ? "1" : ret;
                    }
                }
            }
        },

        // Don't automatically add "px" to these possibly-unitless properties
        cssNumber: {
            "columnCount": true,
            "fillOpacity": true,
            "flexGrow": true,
            "flexShrink": true,
            "fontWeight": true,
            "lineHeight": true,
            "opacity": true,
            "order": true,
            "orphans": true,
            "widows": true,
            "zIndex": true,
            "zoom": true
        },

        // Add in properties whose names you wish to fix before
        // setting or getting the value
        cssProps: {
            "float": "cssFloat"
        },

        // Get and set the style property on a DOM Node
        style: function( elem, name, value, extra ) {

            // Don't set styles on text and comment nodes
            if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
                return;
            }

            // Make sure that we're working with the right name
            var ret, type, hooks,
                origName = jQuery.camelCase( name ),
                style = elem.style;

            name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

            // Gets hook for the prefixed version, then unprefixed version
            hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

            // Check if we're setting a value
            if ( value !== undefined ) {
                type = typeof value;

                // Convert "+=" or "-=" to relative numbers (#7345)
                if ( type === "string" && (ret = rrelNum.exec( value )) ) {
                    value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
                    // Fixes bug #9237
                    type = "number";
                }

                // Make sure that null and NaN values aren't set (#7116)
                if ( value == null || value !== value ) {
                    return;
                }

                // If a number, add 'px' to the (except for certain CSS properties)
                if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
                    value += "px";
                }

                // Support: IE9-11+
                // background-* props affect original clone's values
                if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
                    style[ name ] = "inherit";
                }

                // If a hook was provided, use that value, otherwise just set the specified value
                if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
                    style[ name ] = value;
                }

            } else {
                // If a hook was provided get the non-computed value from there
                if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
                    return ret;
                }

                // Otherwise just get the value from the style object
                return style[ name ];
            }
        },

        css: function( elem, name, extra, styles ) {
            var val, num, hooks,
                origName = jQuery.camelCase( name );

            // Make sure that we're working with the right name
            name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

            // Try prefixed name followed by the unprefixed name
            hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

            // If a hook was provided get the computed value from there
            if ( hooks && "get" in hooks ) {
                val = hooks.get( elem, true, extra );
            }

            // Otherwise, if a way to get the computed value exists, use that
            if ( val === undefined ) {
                val = curCSS( elem, name, styles );
            }

            // Convert "normal" to computed value
            if ( val === "normal" && name in cssNormalTransform ) {
                val = cssNormalTransform[ name ];
            }

            // Make numeric if forced or a qualifier was provided and val looks numeric
            if ( extra === "" || extra ) {
                num = parseFloat( val );
                return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
            }
            return val;
        }
    });

    jQuery.each([ "height", "width" ], function( i, name ) {
        jQuery.cssHooks[ name ] = {
            get: function( elem, computed, extra ) {
                if ( computed ) {

                    // Certain elements can have dimension info if we invisibly show them
                    // but it must have a current display style that would benefit
                    return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
                        jQuery.swap( elem, cssShow, function() {
                            return getWidthOrHeight( elem, name, extra );
                        }) :
                        getWidthOrHeight( elem, name, extra );
                }
            },

            set: function( elem, value, extra ) {
                var styles = extra && getStyles( elem );
                return setPositiveNumber( elem, value, extra ?
                        augmentWidthOrHeight(
                            elem,
                            name,
                            extra,
                            jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
                            styles
                        ) : 0
                );
            }
        };
    });

// Support: Android 2.3
    jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
        function( elem, computed ) {
            if ( computed ) {
                return jQuery.swap( elem, { "display": "inline-block" },
                    curCSS, [ elem, "marginRight" ] );
            }
        }
    );

// These hooks are used by animate to expand properties
    jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function( prefix, suffix ) {
        jQuery.cssHooks[ prefix + suffix ] = {
            expand: function( value ) {
                var i = 0,
                    expanded = {},

                // Assumes a single number if not a string
                    parts = typeof value === "string" ? value.split(" ") : [ value ];

                for ( ; i < 4; i++ ) {
                    expanded[ prefix + cssExpand[ i ] + suffix ] =
                        parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
                }

                return expanded;
            }
        };

        if ( !rmargin.test( prefix ) ) {
            jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
        }
    });

    jQuery.fn.extend({
        css: function( name, value ) {
            return access( this, function( elem, name, value ) {
                var styles, len,
                    map = {},
                    i = 0;

                if ( jQuery.isArray( name ) ) {
                    styles = getStyles( elem );
                    len = name.length;

                    for ( ; i < len; i++ ) {
                        map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
                    }

                    return map;
                }

                return value !== undefined ?
                    jQuery.style( elem, name, value ) :
                    jQuery.css( elem, name );
            }, name, value, arguments.length > 1 );
        },
        show: function() {
            return showHide( this, true );
        },
        hide: function() {
            return showHide( this );
        },
        toggle: function( state ) {
            if ( typeof state === "boolean" ) {
                return state ? this.show() : this.hide();
            }

            return this.each(function() {
                if ( isHidden( this ) ) {
                    jQuery( this ).show();
                } else {
                    jQuery( this ).hide();
                }
            });
        }
    });


    function Tween( elem, options, prop, end, easing ) {
        return new Tween.prototype.init( elem, options, prop, end, easing );
    }
    jQuery.Tween = Tween;

    Tween.prototype = {
        constructor: Tween,
        init: function( elem, options, prop, end, easing, unit ) {
            this.elem = elem;
            this.prop = prop;
            this.easing = easing || "swing";
            this.options = options;
            this.start = this.now = this.cur();
            this.end = end;
            this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
        },
        cur: function() {
            var hooks = Tween.propHooks[ this.prop ];

            return hooks && hooks.get ?
                hooks.get( this ) :
                Tween.propHooks._default.get( this );
        },
        run: function( percent ) {
            var eased,
                hooks = Tween.propHooks[ this.prop ];

            if ( this.options.duration ) {
                this.pos = eased = jQuery.easing[ this.easing ](
                    percent, this.options.duration * percent, 0, 1, this.options.duration
                );
            } else {
                this.pos = eased = percent;
            }
            this.now = ( this.end - this.start ) * eased + this.start;

            if ( this.options.step ) {
                this.options.step.call( this.elem, this.now, this );
            }

            if ( hooks && hooks.set ) {
                hooks.set( this );
            } else {
                Tween.propHooks._default.set( this );
            }
            return this;
        }
    };

    Tween.prototype.init.prototype = Tween.prototype;

    Tween.propHooks = {
        _default: {
            get: function( tween ) {
                var result;

                if ( tween.elem[ tween.prop ] != null &&
                    (!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
                    return tween.elem[ tween.prop ];
                }

                // Passing an empty string as a 3rd parameter to .css will automatically
                // attempt a parseFloat and fallback to a string if the parse fails.
                // Simple values such as "10px" are parsed to Float;
                // complex values such as "rotate(1rad)" are returned as-is.
                result = jQuery.css( tween.elem, tween.prop, "" );
                // Empty strings, null, undefined and "auto" are converted to 0.
                return !result || result === "auto" ? 0 : result;
            },
            set: function( tween ) {
                // Use step hook for back compat.
                // Use cssHook if its there.
                // Use .style if available and use plain properties where available.
                if ( jQuery.fx.step[ tween.prop ] ) {
                    jQuery.fx.step[ tween.prop ]( tween );
                } else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
                    jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
                } else {
                    tween.elem[ tween.prop ] = tween.now;
                }
            }
        }
    };

// Support: IE9
// Panic based approach to setting things on disconnected nodes
    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function( tween ) {
            if ( tween.elem.nodeType && tween.elem.parentNode ) {
                tween.elem[ tween.prop ] = tween.now;
            }
        }
    };

    jQuery.easing = {
        linear: function( p ) {
            return p;
        },
        swing: function( p ) {
            return 0.5 - Math.cos( p * Math.PI ) / 2;
        }
    };

    jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
    jQuery.fx.step = {};




    var
        fxNow, timerId,
        rfxtypes = /^(?:toggle|show|hide)$/,
        rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
        rrun = /queueHooks$/,
        animationPrefilters = [ defaultPrefilter ],
        tweeners = {
            "*": [ function( prop, value ) {
                var tween = this.createTween( prop, value ),
                    target = tween.cur(),
                    parts = rfxnum.exec( value ),
                    unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

                // Starting value computation is required for potential unit mismatches
                    start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
                        rfxnum.exec( jQuery.css( tween.elem, prop ) ),
                    scale = 1,
                    maxIterations = 20;

                if ( start && start[ 3 ] !== unit ) {
                    // Trust units reported by jQuery.css
                    unit = unit || start[ 3 ];

                    // Make sure we update the tween properties later on
                    parts = parts || [];

                    // Iteratively approximate from a nonzero starting point
                    start = +target || 1;

                    do {
                        // If previous iteration zeroed out, double until we get *something*.
                        // Use string for doubling so we don't accidentally see scale as unchanged below
                        scale = scale || ".5";

                        // Adjust and apply
                        start = start / scale;
                        jQuery.style( tween.elem, prop, start + unit );

                        // Update scale, tolerating zero or NaN from tween.cur(),
                        // break the loop if scale is unchanged or perfect, or if we've just had enough
                    } while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
                }

                // Update tween properties
                if ( parts ) {
                    start = tween.start = +start || +target || 0;
                    tween.unit = unit;
                    // If a +=/-= token was provided, we're doing a relative animation
                    tween.end = parts[ 1 ] ?
                    start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
                        +parts[ 2 ];
                }

                return tween;
            } ]
        };

// Animations created synchronously will run synchronously
    function createFxNow() {
        setTimeout(function() {
            fxNow = undefined;
        });
        return ( fxNow = jQuery.now() );
    }

// Generate parameters to create a standard animation
    function genFx( type, includeWidth ) {
        var which,
            i = 0,
            attrs = { height: type };

        // If we include width, step value is 1 to do all cssExpand values,
        // otherwise step value is 2 to skip over Left and Right
        includeWidth = includeWidth ? 1 : 0;
        for ( ; i < 4 ; i += 2 - includeWidth ) {
            which = cssExpand[ i ];
            attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
        }

        if ( includeWidth ) {
            attrs.opacity = attrs.width = type;
        }

        return attrs;
    }

    function createTween( value, prop, animation ) {
        var tween,
            collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
            index = 0,
            length = collection.length;
        for ( ; index < length; index++ ) {
            if ( (tween = collection[ index ].call( animation, prop, value )) ) {

                // We're done with this property
                return tween;
            }
        }
    }

    function defaultPrefilter( elem, props, opts ) {
        /* jshint validthis: true */
        var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
            anim = this,
            orig = {},
            style = elem.style,
            hidden = elem.nodeType && isHidden( elem ),
            dataShow = data_priv.get( elem, "fxshow" );

        // Handle queue: false promises
        if ( !opts.queue ) {
            hooks = jQuery._queueHooks( elem, "fx" );
            if ( hooks.unqueued == null ) {
                hooks.unqueued = 0;
                oldfire = hooks.empty.fire;
                hooks.empty.fire = function() {
                    if ( !hooks.unqueued ) {
                        oldfire();
                    }
                };
            }
            hooks.unqueued++;

            anim.always(function() {
                // Ensure the complete handler is called before this completes
                anim.always(function() {
                    hooks.unqueued--;
                    if ( !jQuery.queue( elem, "fx" ).length ) {
                        hooks.empty.fire();
                    }
                });
            });
        }

        // Height/width overflow pass
        if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
            // Make sure that nothing sneaks out
            // Record all 3 overflow attributes because IE9-10 do not
            // change the overflow attribute when overflowX and
            // overflowY are set to the same value
            opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

            // Set display property to inline-block for height/width
            // animations on inline elements that are having width/height animated
            display = jQuery.css( elem, "display" );

            // Test default display if display is currently "none"
            checkDisplay = display === "none" ?
            data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

            if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
                style.display = "inline-block";
            }
        }

        if ( opts.overflow ) {
            style.overflow = "hidden";
            anim.always(function() {
                style.overflow = opts.overflow[ 0 ];
                style.overflowX = opts.overflow[ 1 ];
                style.overflowY = opts.overflow[ 2 ];
            });
        }

        // show/hide pass
        for ( prop in props ) {
            value = props[ prop ];
            if ( rfxtypes.exec( value ) ) {
                delete props[ prop ];
                toggle = toggle || value === "toggle";
                if ( value === ( hidden ? "hide" : "show" ) ) {

                    // If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
                    if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
                        hidden = true;
                    } else {
                        continue;
                    }
                }
                orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

                // Any non-fx value stops us from restoring the original display value
            } else {
                display = undefined;
            }
        }

        if ( !jQuery.isEmptyObject( orig ) ) {
            if ( dataShow ) {
                if ( "hidden" in dataShow ) {
                    hidden = dataShow.hidden;
                }
            } else {
                dataShow = data_priv.access( elem, "fxshow", {} );
            }

            // Store state if its toggle - enables .stop().toggle() to "reverse"
            if ( toggle ) {
                dataShow.hidden = !hidden;
            }
            if ( hidden ) {
                jQuery( elem ).show();
            } else {
                anim.done(function() {
                    jQuery( elem ).hide();
                });
            }
            anim.done(function() {
                var prop;

                data_priv.remove( elem, "fxshow" );
                for ( prop in orig ) {
                    jQuery.style( elem, prop, orig[ prop ] );
                }
            });
            for ( prop in orig ) {
                tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

                if ( !( prop in dataShow ) ) {
                    dataShow[ prop ] = tween.start;
                    if ( hidden ) {
                        tween.end = tween.start;
                        tween.start = prop === "width" || prop === "height" ? 1 : 0;
                    }
                }
            }

            // If this is a noop like .hide().hide(), restore an overwritten display value
        } else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
            style.display = display;
        }
    }

    function propFilter( props, specialEasing ) {
        var index, name, easing, value, hooks;

        // camelCase, specialEasing and expand cssHook pass
        for ( index in props ) {
            name = jQuery.camelCase( index );
            easing = specialEasing[ name ];
            value = props[ index ];
            if ( jQuery.isArray( value ) ) {
                easing = value[ 1 ];
                value = props[ index ] = value[ 0 ];
            }

            if ( index !== name ) {
                props[ name ] = value;
                delete props[ index ];
            }

            hooks = jQuery.cssHooks[ name ];
            if ( hooks && "expand" in hooks ) {
                value = hooks.expand( value );
                delete props[ name ];

                // Not quite $.extend, this won't overwrite existing keys.
                // Reusing 'index' because we have the correct "name"
                for ( index in value ) {
                    if ( !( index in props ) ) {
                        props[ index ] = value[ index ];
                        specialEasing[ index ] = easing;
                    }
                }
            } else {
                specialEasing[ name ] = easing;
            }
        }
    }

    function Animation( elem, properties, options ) {
        var result,
            stopped,
            index = 0,
            length = animationPrefilters.length,
            deferred = jQuery.Deferred().always( function() {
                // Don't match elem in the :animated selector
                delete tick.elem;
            }),
            tick = function() {
                if ( stopped ) {
                    return false;
                }
                var currentTime = fxNow || createFxNow(),
                    remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
                // Support: Android 2.3
                // Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
                    temp = remaining / animation.duration || 0,
                    percent = 1 - temp,
                    index = 0,
                    length = animation.tweens.length;

                for ( ; index < length ; index++ ) {
                    animation.tweens[ index ].run( percent );
                }

                deferred.notifyWith( elem, [ animation, percent, remaining ]);

                if ( percent < 1 && length ) {
                    return remaining;
                } else {
                    deferred.resolveWith( elem, [ animation ] );
                    return false;
                }
            },
            animation = deferred.promise({
                elem: elem,
                props: jQuery.extend( {}, properties ),
                opts: jQuery.extend( true, { specialEasing: {} }, options ),
                originalProperties: properties,
                originalOptions: options,
                startTime: fxNow || createFxNow(),
                duration: options.duration,
                tweens: [],
                createTween: function( prop, end ) {
                    var tween = jQuery.Tween( elem, animation.opts, prop, end,
                        animation.opts.specialEasing[ prop ] || animation.opts.easing );
                    animation.tweens.push( tween );
                    return tween;
                },
                stop: function( gotoEnd ) {
                    var index = 0,
                    // If we are going to the end, we want to run all the tweens
                    // otherwise we skip this part
                        length = gotoEnd ? animation.tweens.length : 0;
                    if ( stopped ) {
                        return this;
                    }
                    stopped = true;
                    for ( ; index < length ; index++ ) {
                        animation.tweens[ index ].run( 1 );
                    }

                    // Resolve when we played the last frame; otherwise, reject
                    if ( gotoEnd ) {
                        deferred.resolveWith( elem, [ animation, gotoEnd ] );
                    } else {
                        deferred.rejectWith( elem, [ animation, gotoEnd ] );
                    }
                    return this;
                }
            }),
            props = animation.props;

        propFilter( props, animation.opts.specialEasing );

        for ( ; index < length ; index++ ) {
            result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
            if ( result ) {
                return result;
            }
        }

        jQuery.map( props, createTween, animation );

        if ( jQuery.isFunction( animation.opts.start ) ) {
            animation.opts.start.call( elem, animation );
        }

        jQuery.fx.timer(
            jQuery.extend( tick, {
                elem: elem,
                anim: animation,
                queue: animation.opts.queue
            })
        );

        // attach callbacks from options
        return animation.progress( animation.opts.progress )
            .done( animation.opts.done, animation.opts.complete )
            .fail( animation.opts.fail )
            .always( animation.opts.always );
    }

    jQuery.Animation = jQuery.extend( Animation, {

        tweener: function( props, callback ) {
            if ( jQuery.isFunction( props ) ) {
                callback = props;
                props = [ "*" ];
            } else {
                props = props.split(" ");
            }

            var prop,
                index = 0,
                length = props.length;

            for ( ; index < length ; index++ ) {
                prop = props[ index ];
                tweeners[ prop ] = tweeners[ prop ] || [];
                tweeners[ prop ].unshift( callback );
            }
        },

        prefilter: function( callback, prepend ) {
            if ( prepend ) {
                animationPrefilters.unshift( callback );
            } else {
                animationPrefilters.push( callback );
            }
        }
    });

    jQuery.speed = function( speed, easing, fn ) {
        var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
            complete: fn || !fn && easing ||
            jQuery.isFunction( speed ) && speed,
            duration: speed,
            easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
        };

        opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
            opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

        // Normalize opt.queue - true/undefined/null -> "fx"
        if ( opt.queue == null || opt.queue === true ) {
            opt.queue = "fx";
        }

        // Queueing
        opt.old = opt.complete;

        opt.complete = function() {
            if ( jQuery.isFunction( opt.old ) ) {
                opt.old.call( this );
            }

            if ( opt.queue ) {
                jQuery.dequeue( this, opt.queue );
            }
        };

        return opt;
    };

    jQuery.fn.extend({
        fadeTo: function( speed, to, easing, callback ) {

            // Show any hidden elements after setting opacity to 0
            return this.filter( isHidden ).css( "opacity", 0 ).show()

                // Animate to the value specified
                .end().animate({ opacity: to }, speed, easing, callback );
        },
        animate: function( prop, speed, easing, callback ) {
            var empty = jQuery.isEmptyObject( prop ),
                optall = jQuery.speed( speed, easing, callback ),
                doAnimation = function() {
                    // Operate on a copy of prop so per-property easing won't be lost
                    var anim = Animation( this, jQuery.extend( {}, prop ), optall );

                    // Empty animations, or finishing resolves immediately
                    if ( empty || data_priv.get( this, "finish" ) ) {
                        anim.stop( true );
                    }
                };
            doAnimation.finish = doAnimation;

            return empty || optall.queue === false ?
                this.each( doAnimation ) :
                this.queue( optall.queue, doAnimation );
        },
        stop: function( type, clearQueue, gotoEnd ) {
            var stopQueue = function( hooks ) {
                var stop = hooks.stop;
                delete hooks.stop;
                stop( gotoEnd );
            };

            if ( typeof type !== "string" ) {
                gotoEnd = clearQueue;
                clearQueue = type;
                type = undefined;
            }
            if ( clearQueue && type !== false ) {
                this.queue( type || "fx", [] );
            }

            return this.each(function() {
                var dequeue = true,
                    index = type != null && type + "queueHooks",
                    timers = jQuery.timers,
                    data = data_priv.get( this );

                if ( index ) {
                    if ( data[ index ] && data[ index ].stop ) {
                        stopQueue( data[ index ] );
                    }
                } else {
                    for ( index in data ) {
                        if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
                            stopQueue( data[ index ] );
                        }
                    }
                }

                for ( index = timers.length; index--; ) {
                    if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
                        timers[ index ].anim.stop( gotoEnd );
                        dequeue = false;
                        timers.splice( index, 1 );
                    }
                }

                // Start the next in the queue if the last step wasn't forced.
                // Timers currently will call their complete callbacks, which
                // will dequeue but only if they were gotoEnd.
                if ( dequeue || !gotoEnd ) {
                    jQuery.dequeue( this, type );
                }
            });
        },
        finish: function( type ) {
            if ( type !== false ) {
                type = type || "fx";
            }
            return this.each(function() {
                var index,
                    data = data_priv.get( this ),
                    queue = data[ type + "queue" ],
                    hooks = data[ type + "queueHooks" ],
                    timers = jQuery.timers,
                    length = queue ? queue.length : 0;

                // Enable finishing flag on private data
                data.finish = true;

                // Empty the queue first
                jQuery.queue( this, type, [] );

                if ( hooks && hooks.stop ) {
                    hooks.stop.call( this, true );
                }

                // Look for any active animations, and finish them
                for ( index = timers.length; index--; ) {
                    if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
                        timers[ index ].anim.stop( true );
                        timers.splice( index, 1 );
                    }
                }

                // Look for any animations in the old queue and finish them
                for ( index = 0; index < length; index++ ) {
                    if ( queue[ index ] && queue[ index ].finish ) {
                        queue[ index ].finish.call( this );
                    }
                }

                // Turn off finishing flag
                delete data.finish;
            });
        }
    });

    jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
        var cssFn = jQuery.fn[ name ];
        jQuery.fn[ name ] = function( speed, easing, callback ) {
            return speed == null || typeof speed === "boolean" ?
                cssFn.apply( this, arguments ) :
                this.animate( genFx( name, true ), speed, easing, callback );
        };
    });

// Generate shortcuts for custom animations
    jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: { opacity: "show" },
        fadeOut: { opacity: "hide" },
        fadeToggle: { opacity: "toggle" }
    }, function( name, props ) {
        jQuery.fn[ name ] = function( speed, easing, callback ) {
            return this.animate( props, speed, easing, callback );
        };
    });

    jQuery.timers = [];
    jQuery.fx.tick = function() {
        var timer,
            i = 0,
            timers = jQuery.timers;

        fxNow = jQuery.now();

        for ( ; i < timers.length; i++ ) {
            timer = timers[ i ];
            // Checks the timer has not already been removed
            if ( !timer() && timers[ i ] === timer ) {
                timers.splice( i--, 1 );
            }
        }

        if ( !timers.length ) {
            jQuery.fx.stop();
        }
        fxNow = undefined;
    };

    jQuery.fx.timer = function( timer ) {
        jQuery.timers.push( timer );
        if ( timer() ) {
            jQuery.fx.start();
        } else {
            jQuery.timers.pop();
        }
    };

    jQuery.fx.interval = 13;

    jQuery.fx.start = function() {
        if ( !timerId ) {
            timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
        }
    };

    jQuery.fx.stop = function() {
        clearInterval( timerId );
        timerId = null;
    };

    jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        // Default speed
        _default: 400
    };


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
    jQuery.fn.delay = function( time, type ) {
        time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
        type = type || "fx";

        return this.queue( type, function( next, hooks ) {
            var timeout = setTimeout( next, time );
            hooks.stop = function() {
                clearTimeout( timeout );
            };
        });
    };


    (function() {
        var input = document.createElement( "input" ),
            select = document.createElement( "select" ),
            opt = select.appendChild( document.createElement( "option" ) );

        input.type = "checkbox";

        // Support: iOS<=5.1, Android<=4.2+
        // Default value for a checkbox should be "on"
        support.checkOn = input.value !== "";

        // Support: IE<=11+
        // Must access selectedIndex to make default options select
        support.optSelected = opt.selected;

        // Support: Android<=2.3
        // Options inside disabled selects are incorrectly marked as disabled
        select.disabled = true;
        support.optDisabled = !opt.disabled;

        // Support: IE<=11+
        // An input loses its value after becoming a radio
        input = document.createElement( "input" );
        input.value = "t";
        input.type = "radio";
        support.radioValue = input.value === "t";
    })();


    var nodeHook, boolHook,
        attrHandle = jQuery.expr.attrHandle;

    jQuery.fn.extend({
        attr: function( name, value ) {
            return access( this, jQuery.attr, name, value, arguments.length > 1 );
        },

        removeAttr: function( name ) {
            return this.each(function() {
                jQuery.removeAttr( this, name );
            });
        }
    });

    jQuery.extend({
        attr: function( elem, name, value ) {
            var hooks, ret,
                nType = elem.nodeType;

            // don't get/set attributes on text, comment and attribute nodes
            if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
                return;
            }

            // Fallback to prop when attributes are not supported
            if ( typeof elem.getAttribute === strundefined ) {
                return jQuery.prop( elem, name, value );
            }

            // All attributes are lowercase
            // Grab necessary hook if one is defined
            if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
                name = name.toLowerCase();
                hooks = jQuery.attrHooks[ name ] ||
                ( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
            }

            if ( value !== undefined ) {

                if ( value === null ) {
                    jQuery.removeAttr( elem, name );

                } else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
                    return ret;

                } else {
                    elem.setAttribute( name, value + "" );
                    return value;
                }

            } else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
                return ret;

            } else {
                ret = jQuery.find.attr( elem, name );

                // Non-existent attributes return null, we normalize to undefined
                return ret == null ?
                    undefined :
                    ret;
            }
        },

        removeAttr: function( elem, value ) {
            var name, propName,
                i = 0,
                attrNames = value && value.match( rnotwhite );

            if ( attrNames && elem.nodeType === 1 ) {
                while ( (name = attrNames[i++]) ) {
                    propName = jQuery.propFix[ name ] || name;

                    // Boolean attributes get special treatment (#10870)
                    if ( jQuery.expr.match.bool.test( name ) ) {
                        // Set corresponding property to false
                        elem[ propName ] = false;
                    }

                    elem.removeAttribute( name );
                }
            }
        },

        attrHooks: {
            type: {
                set: function( elem, value ) {
                    if ( !support.radioValue && value === "radio" &&
                        jQuery.nodeName( elem, "input" ) ) {
                        var val = elem.value;
                        elem.setAttribute( "type", value );
                        if ( val ) {
                            elem.value = val;
                        }
                        return value;
                    }
                }
            }
        }
    });

// Hooks for boolean attributes
    boolHook = {
        set: function( elem, value, name ) {
            if ( value === false ) {
                // Remove boolean attributes when set to false
                jQuery.removeAttr( elem, name );
            } else {
                elem.setAttribute( name, name );
            }
            return name;
        }
    };
    jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
        var getter = attrHandle[ name ] || jQuery.find.attr;

        attrHandle[ name ] = function( elem, name, isXML ) {
            var ret, handle;
            if ( !isXML ) {
                // Avoid an infinite loop by temporarily removing this function from the getter
                handle = attrHandle[ name ];
                attrHandle[ name ] = ret;
                ret = getter( elem, name, isXML ) != null ?
                    name.toLowerCase() :
                    null;
                attrHandle[ name ] = handle;
            }
            return ret;
        };
    });




    var rfocusable = /^(?:input|select|textarea|button)$/i;

    jQuery.fn.extend({
        prop: function( name, value ) {
            return access( this, jQuery.prop, name, value, arguments.length > 1 );
        },

        removeProp: function( name ) {
            return this.each(function() {
                delete this[ jQuery.propFix[ name ] || name ];
            });
        }
    });

    jQuery.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },

        prop: function( elem, name, value ) {
            var ret, hooks, notxml,
                nType = elem.nodeType;

            // Don't get/set properties on text, comment and attribute nodes
            if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
                return;
            }

            notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

            if ( notxml ) {
                // Fix name and attach hooks
                name = jQuery.propFix[ name ] || name;
                hooks = jQuery.propHooks[ name ];
            }

            if ( value !== undefined ) {
                return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
                    ret :
                    ( elem[ name ] = value );

            } else {
                return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
                    ret :
                    elem[ name ];
            }
        },

        propHooks: {
            tabIndex: {
                get: function( elem ) {
                    return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
                        elem.tabIndex :
                        -1;
                }
            }
        }
    });

    if ( !support.optSelected ) {
        jQuery.propHooks.selected = {
            get: function( elem ) {
                var parent = elem.parentNode;
                if ( parent && parent.parentNode ) {
                    parent.parentNode.selectedIndex;
                }
                return null;
            }
        };
    }

    jQuery.each([
        "tabIndex",
        "readOnly",
        "maxLength",
        "cellSpacing",
        "cellPadding",
        "rowSpan",
        "colSpan",
        "useMap",
        "frameBorder",
        "contentEditable"
    ], function() {
        jQuery.propFix[ this.toLowerCase() ] = this;
    });




    var rclass = /[\t\r\n\f]/g;

    jQuery.fn.extend({
        addClass: function( value ) {
            var classes, elem, cur, clazz, j, finalValue,
                proceed = typeof value === "string" && value,
                i = 0,
                len = this.length;

            if ( jQuery.isFunction( value ) ) {
                return this.each(function( j ) {
                    jQuery( this ).addClass( value.call( this, j, this.className ) );
                });
            }

            if ( proceed ) {
                // The disjunction here is for better compressibility (see removeClass)
                classes = ( value || "" ).match( rnotwhite ) || [];

                for ( ; i < len; i++ ) {
                    elem = this[ i ];
                    cur = elem.nodeType === 1 && ( elem.className ?
                        ( " " + elem.className + " " ).replace( rclass, " " ) :
                        " "
                    );

                    if ( cur ) {
                        j = 0;
                        while ( (clazz = classes[j++]) ) {
                            if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
                                cur += clazz + " ";
                            }
                        }

                        // only assign if different to avoid unneeded rendering.
                        finalValue = jQuery.trim( cur );
                        if ( elem.className !== finalValue ) {
                            elem.className = finalValue;
                        }
                    }
                }
            }

            return this;
        },

        removeClass: function( value ) {
            var classes, elem, cur, clazz, j, finalValue,
                proceed = arguments.length === 0 || typeof value === "string" && value,
                i = 0,
                len = this.length;

            if ( jQuery.isFunction( value ) ) {
                return this.each(function( j ) {
                    jQuery( this ).removeClass( value.call( this, j, this.className ) );
                });
            }
            if ( proceed ) {
                classes = ( value || "" ).match( rnotwhite ) || [];

                for ( ; i < len; i++ ) {
                    elem = this[ i ];
                    // This expression is here for better compressibility (see addClass)
                    cur = elem.nodeType === 1 && ( elem.className ?
                        ( " " + elem.className + " " ).replace( rclass, " " ) :
                        ""
                    );

                    if ( cur ) {
                        j = 0;
                        while ( (clazz = classes[j++]) ) {
                            // Remove *all* instances
                            while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
                                cur = cur.replace( " " + clazz + " ", " " );
                            }
                        }

                        // Only assign if different to avoid unneeded rendering.
                        finalValue = value ? jQuery.trim( cur ) : "";
                        if ( elem.className !== finalValue ) {
                            elem.className = finalValue;
                        }
                    }
                }
            }

            return this;
        },

        toggleClass: function( value, stateVal ) {
            var type = typeof value;

            if ( typeof stateVal === "boolean" && type === "string" ) {
                return stateVal ? this.addClass( value ) : this.removeClass( value );
            }

            if ( jQuery.isFunction( value ) ) {
                return this.each(function( i ) {
                    jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
                });
            }

            return this.each(function() {
                if ( type === "string" ) {
                    // Toggle individual class names
                    var className,
                        i = 0,
                        self = jQuery( this ),
                        classNames = value.match( rnotwhite ) || [];

                    while ( (className = classNames[ i++ ]) ) {
                        // Check each className given, space separated list
                        if ( self.hasClass( className ) ) {
                            self.removeClass( className );
                        } else {
                            self.addClass( className );
                        }
                    }

                    // Toggle whole class name
                } else if ( type === strundefined || type === "boolean" ) {
                    if ( this.className ) {
                        // store className if set
                        data_priv.set( this, "__className__", this.className );
                    }

                    // If the element has a class name or if we're passed `false`,
                    // then remove the whole classname (if there was one, the above saved it).
                    // Otherwise bring back whatever was previously saved (if anything),
                    // falling back to the empty string if nothing was stored.
                    this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
                }
            });
        },

        hasClass: function( selector ) {
            var className = " " + selector + " ",
                i = 0,
                l = this.length;
            for ( ; i < l; i++ ) {
                if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
                    return true;
                }
            }

            return false;
        }
    });




    var rreturn = /\r/g;

    jQuery.fn.extend({
        val: function( value ) {
            var hooks, ret, isFunction,
                elem = this[0];

            if ( !arguments.length ) {
                if ( elem ) {
                    hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

                    if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
                        return ret;
                    }

                    ret = elem.value;

                    return typeof ret === "string" ?
                        // Handle most common string cases
                        ret.replace(rreturn, "") :
                        // Handle cases where value is null/undef or number
                        ret == null ? "" : ret;
                }

                return;
            }

            isFunction = jQuery.isFunction( value );

            return this.each(function( i ) {
                var val;

                if ( this.nodeType !== 1 ) {
                    return;
                }

                if ( isFunction ) {
                    val = value.call( this, i, jQuery( this ).val() );
                } else {
                    val = value;
                }

                // Treat null/undefined as ""; convert numbers to string
                if ( val == null ) {
                    val = "";

                } else if ( typeof val === "number" ) {
                    val += "";

                } else if ( jQuery.isArray( val ) ) {
                    val = jQuery.map( val, function( value ) {
                        return value == null ? "" : value + "";
                    });
                }

                hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

                // If set returns undefined, fall back to normal setting
                if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
                    this.value = val;
                }
            });
        }
    });

    jQuery.extend({
        valHooks: {
            option: {
                get: function( elem ) {
                    var val = jQuery.find.attr( elem, "value" );
                    return val != null ?
                        val :
                        // Support: IE10-11+
                        // option.text throws exceptions (#14686, #14858)
                        jQuery.trim( jQuery.text( elem ) );
                }
            },
            select: {
                get: function( elem ) {
                    var value, option,
                        options = elem.options,
                        index = elem.selectedIndex,
                        one = elem.type === "select-one" || index < 0,
                        values = one ? null : [],
                        max = one ? index + 1 : options.length,
                        i = index < 0 ?
                            max :
                            one ? index : 0;

                    // Loop through all the selected options
                    for ( ; i < max; i++ ) {
                        option = options[ i ];

                        // IE6-9 doesn't update selected after form reset (#2551)
                        if ( ( option.selected || i === index ) &&
                                // Don't return options that are disabled or in a disabled optgroup
                            ( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
                            ( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

                            // Get the specific value for the option
                            value = jQuery( option ).val();

                            // We don't need an array for one selects
                            if ( one ) {
                                return value;
                            }

                            // Multi-Selects return an array
                            values.push( value );
                        }
                    }

                    return values;
                },

                set: function( elem, value ) {
                    var optionSet, option,
                        options = elem.options,
                        values = jQuery.makeArray( value ),
                        i = options.length;

                    while ( i-- ) {
                        option = options[ i ];
                        if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
                            optionSet = true;
                        }
                    }

                    // Force browsers to behave consistently when non-matching value is set
                    if ( !optionSet ) {
                        elem.selectedIndex = -1;
                    }
                    return values;
                }
            }
        }
    });

// Radios and checkboxes getter/setter
    jQuery.each([ "radio", "checkbox" ], function() {
        jQuery.valHooks[ this ] = {
            set: function( elem, value ) {
                if ( jQuery.isArray( value ) ) {
                    return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
                }
            }
        };
        if ( !support.checkOn ) {
            jQuery.valHooks[ this ].get = function( elem ) {
                return elem.getAttribute("value") === null ? "on" : elem.value;
            };
        }
    });




// Return jQuery for attributes-only inclusion


    jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
    "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
    "change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

        // Handle event binding
        jQuery.fn[ name ] = function( data, fn ) {
            return arguments.length > 0 ?
                this.on( name, null, data, fn ) :
                this.trigger( name );
        };
    });

    jQuery.fn.extend({
        hover: function( fnOver, fnOut ) {
            return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
        },

        bind: function( types, data, fn ) {
            return this.on( types, null, data, fn );
        },
        unbind: function( types, fn ) {
            return this.off( types, null, fn );
        },

        delegate: function( selector, types, data, fn ) {
            return this.on( types, selector, data, fn );
        },
        undelegate: function( selector, types, fn ) {
            // ( namespace ) or ( selector, types [, fn] )
            return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
        }
    });


    var nonce = jQuery.now();

    var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
    jQuery.parseJSON = function( data ) {
        return JSON.parse( data + "" );
    };


// Cross-browser xml parsing
    jQuery.parseXML = function( data ) {
        var xml, tmp;
        if ( !data || typeof data !== "string" ) {
            return null;
        }

        // Support: IE9
        try {
            tmp = new DOMParser();
            xml = tmp.parseFromString( data, "text/xml" );
        } catch ( e ) {
            xml = undefined;
        }

        if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
            jQuery.error( "Invalid XML: " + data );
        }
        return xml;
    };


    var
        rhash = /#.*$/,
        rts = /([?&])_=[^&]*/,
        rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
    // #7653, #8125, #8152: local protocol detection
        rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        rnoContent = /^(?:GET|HEAD)$/,
        rprotocol = /^\/\//,
        rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

    /* Prefilters
     * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
     * 2) These are called:
     *    - BEFORE asking for a transport
     *    - AFTER param serialization (s.data is a string if s.processData is true)
     * 3) key is the dataType
     * 4) the catchall symbol "*" can be used
     * 5) execution will start with transport dataType and THEN continue down to "*" if needed
     */
        prefilters = {},

    /* Transports bindings
     * 1) key is the dataType
     * 2) the catchall symbol "*" can be used
     * 3) selection will start with transport dataType and THEN go to "*" if needed
     */
        transports = {},

    // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
        allTypes = "*/".concat( "*" ),

    // Document location
        ajaxLocation = window.location.href,

    // Segment location into parts
        ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
    function addToPrefiltersOrTransports( structure ) {

        // dataTypeExpression is optional and defaults to "*"
        return function( dataTypeExpression, func ) {

            if ( typeof dataTypeExpression !== "string" ) {
                func = dataTypeExpression;
                dataTypeExpression = "*";
            }

            var dataType,
                i = 0,
                dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

            if ( jQuery.isFunction( func ) ) {
                // For each dataType in the dataTypeExpression
                while ( (dataType = dataTypes[i++]) ) {
                    // Prepend if requested
                    if ( dataType[0] === "+" ) {
                        dataType = dataType.slice( 1 ) || "*";
                        (structure[ dataType ] = structure[ dataType ] || []).unshift( func );

                        // Otherwise append
                    } else {
                        (structure[ dataType ] = structure[ dataType ] || []).push( func );
                    }
                }
            }
        };
    }

// Base inspection function for prefilters and transports
    function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

        var inspected = {},
            seekingTransport = ( structure === transports );

        function inspect( dataType ) {
            var selected;
            inspected[ dataType ] = true;
            jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
                var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
                if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
                    options.dataTypes.unshift( dataTypeOrTransport );
                    inspect( dataTypeOrTransport );
                    return false;
                } else if ( seekingTransport ) {
                    return !( selected = dataTypeOrTransport );
                }
            });
            return selected;
        }

        return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
    }

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
    function ajaxExtend( target, src ) {
        var key, deep,
            flatOptions = jQuery.ajaxSettings.flatOptions || {};

        for ( key in src ) {
            if ( src[ key ] !== undefined ) {
                ( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
            }
        }
        if ( deep ) {
            jQuery.extend( true, target, deep );
        }

        return target;
    }

    /* Handles responses to an ajax request:
     * - finds the right dataType (mediates between content-type and expected dataType)
     * - returns the corresponding response
     */
    function ajaxHandleResponses( s, jqXHR, responses ) {

        var ct, type, finalDataType, firstDataType,
            contents = s.contents,
            dataTypes = s.dataTypes;

        // Remove auto dataType and get content-type in the process
        while ( dataTypes[ 0 ] === "*" ) {
            dataTypes.shift();
            if ( ct === undefined ) {
                ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
            }
        }

        // Check if we're dealing with a known content-type
        if ( ct ) {
            for ( type in contents ) {
                if ( contents[ type ] && contents[ type ].test( ct ) ) {
                    dataTypes.unshift( type );
                    break;
                }
            }
        }

        // Check to see if we have a response for the expected dataType
        if ( dataTypes[ 0 ] in responses ) {
            finalDataType = dataTypes[ 0 ];
        } else {
            // Try convertible dataTypes
            for ( type in responses ) {
                if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
                    finalDataType = type;
                    break;
                }
                if ( !firstDataType ) {
                    firstDataType = type;
                }
            }
            // Or just use first one
            finalDataType = finalDataType || firstDataType;
        }

        // If we found a dataType
        // We add the dataType to the list if needed
        // and return the corresponding response
        if ( finalDataType ) {
            if ( finalDataType !== dataTypes[ 0 ] ) {
                dataTypes.unshift( finalDataType );
            }
            return responses[ finalDataType ];
        }
    }

    /* Chain conversions given the request and the original response
     * Also sets the responseXXX fields on the jqXHR instance
     */
    function ajaxConvert( s, response, jqXHR, isSuccess ) {
        var conv2, current, conv, tmp, prev,
            converters = {},
        // Work with a copy of dataTypes in case we need to modify it for conversion
            dataTypes = s.dataTypes.slice();

        // Create converters map with lowercased keys
        if ( dataTypes[ 1 ] ) {
            for ( conv in s.converters ) {
                converters[ conv.toLowerCase() ] = s.converters[ conv ];
            }
        }

        current = dataTypes.shift();

        // Convert to each sequential dataType
        while ( current ) {

            if ( s.responseFields[ current ] ) {
                jqXHR[ s.responseFields[ current ] ] = response;
            }

            // Apply the dataFilter if provided
            if ( !prev && isSuccess && s.dataFilter ) {
                response = s.dataFilter( response, s.dataType );
            }

            prev = current;
            current = dataTypes.shift();

            if ( current ) {

                // There's only work to do if current dataType is non-auto
                if ( current === "*" ) {

                    current = prev;

                    // Convert response if prev dataType is non-auto and differs from current
                } else if ( prev !== "*" && prev !== current ) {

                    // Seek a direct converter
                    conv = converters[ prev + " " + current ] || converters[ "* " + current ];

                    // If none found, seek a pair
                    if ( !conv ) {
                        for ( conv2 in converters ) {

                            // If conv2 outputs current
                            tmp = conv2.split( " " );
                            if ( tmp[ 1 ] === current ) {

                                // If prev can be converted to accepted input
                                conv = converters[ prev + " " + tmp[ 0 ] ] ||
                                converters[ "* " + tmp[ 0 ] ];
                                if ( conv ) {
                                    // Condense equivalence converters
                                    if ( conv === true ) {
                                        conv = converters[ conv2 ];

                                        // Otherwise, insert the intermediate dataType
                                    } else if ( converters[ conv2 ] !== true ) {
                                        current = tmp[ 0 ];
                                        dataTypes.unshift( tmp[ 1 ] );
                                    }
                                    break;
                                }
                            }
                        }
                    }

                    // Apply converter (if not an equivalence)
                    if ( conv !== true ) {

                        // Unless errors are allowed to bubble, catch and return them
                        if ( conv && s[ "throws" ] ) {
                            response = conv( response );
                        } else {
                            try {
                                response = conv( response );
                            } catch ( e ) {
                                return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
                            }
                        }
                    }
                }
            }
        }

        return { state: "success", data: response };
    }

    jQuery.extend({

        // Counter for holding the number of active queries
        active: 0,

        // Last-Modified header cache for next request
        lastModified: {},
        etag: {},

        ajaxSettings: {
            url: ajaxLocation,
            type: "GET",
            isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
            global: true,
            processData: true,
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            /*
             timeout: 0,
             data: null,
             dataType: null,
             username: null,
             password: null,
             cache: null,
             throws: false,
             traditional: false,
             headers: {},
             */

            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },

            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },

            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },

            // Data converters
            // Keys separate source (or catchall "*") and destination types with a single space
            converters: {

                // Convert anything to text
                "* text": String,

                // Text to html (true = no transformation)
                "text html": true,

                // Evaluate text as a json expression
                "text json": jQuery.parseJSON,

                // Parse text as xml
                "text xml": jQuery.parseXML
            },

            // For options that shouldn't be deep extended:
            // you can add your own custom options here if
            // and when you create one that shouldn't be
            // deep extended (see ajaxExtend)
            flatOptions: {
                url: true,
                context: true
            }
        },

        // Creates a full fledged settings object into target
        // with both ajaxSettings and settings fields.
        // If target is omitted, writes into ajaxSettings.
        ajaxSetup: function( target, settings ) {
            return settings ?

                // Building a settings object
                ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

                // Extending ajaxSettings
                ajaxExtend( jQuery.ajaxSettings, target );
        },

        ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
        ajaxTransport: addToPrefiltersOrTransports( transports ),

        // Main method
        ajax: function( url, options ) {

            // If url is an object, simulate pre-1.5 signature
            if ( typeof url === "object" ) {
                options = url;
                url = undefined;
            }

            // Force options to be an object
            options = options || {};

            var transport,
            // URL without anti-cache param
                cacheURL,
            // Response headers
                responseHeadersString,
                responseHeaders,
            // timeout handle
                timeoutTimer,
            // Cross-domain detection vars
                parts,
            // To know if global events are to be dispatched
                fireGlobals,
            // Loop variable
                i,
            // Create the final options object
                s = jQuery.ajaxSetup( {}, options ),
            // Callbacks context
                callbackContext = s.context || s,
            // Context for global events is callbackContext if it is a DOM node or jQuery collection
                globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
                    jQuery( callbackContext ) :
                    jQuery.event,
            // Deferreds
                deferred = jQuery.Deferred(),
                completeDeferred = jQuery.Callbacks("once memory"),
            // Status-dependent callbacks
                statusCode = s.statusCode || {},
            // Headers (they are sent all at once)
                requestHeaders = {},
                requestHeadersNames = {},
            // The jqXHR state
                state = 0,
            // Default abort message
                strAbort = "canceled",
            // Fake xhr
                jqXHR = {
                    readyState: 0,

                    // Builds headers hashtable if needed
                    getResponseHeader: function( key ) {
                        var match;
                        if ( state === 2 ) {
                            if ( !responseHeaders ) {
                                responseHeaders = {};
                                while ( (match = rheaders.exec( responseHeadersString )) ) {
                                    responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
                                }
                            }
                            match = responseHeaders[ key.toLowerCase() ];
                        }
                        return match == null ? null : match;
                    },

                    // Raw string
                    getAllResponseHeaders: function() {
                        return state === 2 ? responseHeadersString : null;
                    },

                    // Caches the header
                    setRequestHeader: function( name, value ) {
                        var lname = name.toLowerCase();
                        if ( !state ) {
                            name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
                            requestHeaders[ name ] = value;
                        }
                        return this;
                    },

                    // Overrides response content-type header
                    overrideMimeType: function( type ) {
                        if ( !state ) {
                            s.mimeType = type;
                        }
                        return this;
                    },

                    // Status-dependent callbacks
                    statusCode: function( map ) {
                        var code;
                        if ( map ) {
                            if ( state < 2 ) {
                                for ( code in map ) {
                                    // Lazy-add the new callback in a way that preserves old ones
                                    statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
                                }
                            } else {
                                // Execute the appropriate callbacks
                                jqXHR.always( map[ jqXHR.status ] );
                            }
                        }
                        return this;
                    },

                    // Cancel the request
                    abort: function( statusText ) {
                        var finalText = statusText || strAbort;
                        if ( transport ) {
                            transport.abort( finalText );
                        }
                        done( 0, finalText );
                        return this;
                    }
                };

            // Attach deferreds
            deferred.promise( jqXHR ).complete = completeDeferred.add;
            jqXHR.success = jqXHR.done;
            jqXHR.error = jqXHR.fail;

            // Remove hash character (#7531: and string promotion)
            // Add protocol if not provided (prefilters might expect it)
            // Handle falsy url in the settings object (#10093: consistency with old signature)
            // We also use the url parameter if available
            s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
                .replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

            // Alias method option to type as per ticket #12004
            s.type = options.method || options.type || s.method || s.type;

            // Extract dataTypes list
            s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

            // A cross-domain request is in order when we have a protocol:host:port mismatch
            if ( s.crossDomain == null ) {
                parts = rurl.exec( s.url.toLowerCase() );
                s.crossDomain = !!( parts &&
                ( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
                ( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
                ( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
                );
            }

            // Convert data if not already a string
            if ( s.data && s.processData && typeof s.data !== "string" ) {
                s.data = jQuery.param( s.data, s.traditional );
            }

            // Apply prefilters
            inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

            // If request was aborted inside a prefilter, stop there
            if ( state === 2 ) {
                return jqXHR;
            }

            // We can fire global events as of now if asked to
            // Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
            fireGlobals = jQuery.event && s.global;

            // Watch for a new set of requests
            if ( fireGlobals && jQuery.active++ === 0 ) {
                jQuery.event.trigger("ajaxStart");
            }

            // Uppercase the type
            s.type = s.type.toUpperCase();

            // Determine if request has content
            s.hasContent = !rnoContent.test( s.type );

            // Save the URL in case we're toying with the If-Modified-Since
            // and/or If-None-Match header later on
            cacheURL = s.url;

            // More options handling for requests with no content
            if ( !s.hasContent ) {

                // If data is available, append data to url
                if ( s.data ) {
                    cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
                    // #9682: remove data so that it's not used in an eventual retry
                    delete s.data;
                }

                // Add anti-cache in url if needed
                if ( s.cache === false ) {
                    s.url = rts.test( cacheURL ) ?

                        // If there is already a '_' parameter, set its value
                        cacheURL.replace( rts, "$1_=" + nonce++ ) :

                        // Otherwise add one to the end
                    cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
                }
            }

            // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
            if ( s.ifModified ) {
                if ( jQuery.lastModified[ cacheURL ] ) {
                    jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
                }
                if ( jQuery.etag[ cacheURL ] ) {
                    jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
                }
            }

            // Set the correct header, if data is being sent
            if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
                jqXHR.setRequestHeader( "Content-Type", s.contentType );
            }

            // Set the Accepts header for the server, depending on the dataType
            jqXHR.setRequestHeader(
                "Accept",
                s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
                s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
                    s.accepts[ "*" ]
            );

            // Check for headers option
            for ( i in s.headers ) {
                jqXHR.setRequestHeader( i, s.headers[ i ] );
            }

            // Allow custom headers/mimetypes and early abort
            if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
                // Abort if not done already and return
                return jqXHR.abort();
            }

            // Aborting is no longer a cancellation
            strAbort = "abort";

            // Install callbacks on deferreds
            for ( i in { success: 1, error: 1, complete: 1 } ) {
                jqXHR[ i ]( s[ i ] );
            }

            // Get transport
            transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

            // If no transport, we auto-abort
            if ( !transport ) {
                done( -1, "No Transport" );
            } else {
                jqXHR.readyState = 1;

                // Send global event
                if ( fireGlobals ) {
                    globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
                }
                // Timeout
                if ( s.async && s.timeout > 0 ) {
                    timeoutTimer = setTimeout(function() {
                        jqXHR.abort("timeout");
                    }, s.timeout );
                }

                try {
                    state = 1;
                    transport.send( requestHeaders, done );
                } catch ( e ) {
                    // Propagate exception as error if not done
                    if ( state < 2 ) {
                        done( -1, e );
                        // Simply rethrow otherwise
                    } else {
                        throw e;
                    }
                }
            }

            // Callback for when everything is done
            function done( status, nativeStatusText, responses, headers ) {
                var isSuccess, success, error, response, modified,
                    statusText = nativeStatusText;

                // Called once
                if ( state === 2 ) {
                    return;
                }

                // State is "done" now
                state = 2;

                // Clear timeout if it exists
                if ( timeoutTimer ) {
                    clearTimeout( timeoutTimer );
                }

                // Dereference transport for early garbage collection
                // (no matter how long the jqXHR object will be used)
                transport = undefined;

                // Cache response headers
                responseHeadersString = headers || "";

                // Set readyState
                jqXHR.readyState = status > 0 ? 4 : 0;

                // Determine if successful
                isSuccess = status >= 200 && status < 300 || status === 304;

                // Get response data
                if ( responses ) {
                    response = ajaxHandleResponses( s, jqXHR, responses );
                }

                // Convert no matter what (that way responseXXX fields are always set)
                response = ajaxConvert( s, response, jqXHR, isSuccess );

                // If successful, handle type chaining
                if ( isSuccess ) {

                    // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
                    if ( s.ifModified ) {
                        modified = jqXHR.getResponseHeader("Last-Modified");
                        if ( modified ) {
                            jQuery.lastModified[ cacheURL ] = modified;
                        }
                        modified = jqXHR.getResponseHeader("etag");
                        if ( modified ) {
                            jQuery.etag[ cacheURL ] = modified;
                        }
                    }

                    // if no content
                    if ( status === 204 || s.type === "HEAD" ) {
                        statusText = "nocontent";

                        // if not modified
                    } else if ( status === 304 ) {
                        statusText = "notmodified";

                        // If we have data, let's convert it
                    } else {
                        statusText = response.state;
                        success = response.data;
                        error = response.error;
                        isSuccess = !error;
                    }
                } else {
                    // Extract error from statusText and normalize for non-aborts
                    error = statusText;
                    if ( status || !statusText ) {
                        statusText = "error";
                        if ( status < 0 ) {
                            status = 0;
                        }
                    }
                }

                // Set data for the fake xhr object
                jqXHR.status = status;
                jqXHR.statusText = ( nativeStatusText || statusText ) + "";

                // Success/Error
                if ( isSuccess ) {
                    deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
                } else {
                    deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
                }

                // Status-dependent callbacks
                jqXHR.statusCode( statusCode );
                statusCode = undefined;

                if ( fireGlobals ) {
                    globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
                        [ jqXHR, s, isSuccess ? success : error ] );
                }

                // Complete
                completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

                if ( fireGlobals ) {
                    globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
                    // Handle the global AJAX counter
                    if ( !( --jQuery.active ) ) {
                        jQuery.event.trigger("ajaxStop");
                    }
                }
            }

            return jqXHR;
        },

        getJSON: function( url, data, callback ) {
            return jQuery.get( url, data, callback, "json" );
        },

        getScript: function( url, callback ) {
            return jQuery.get( url, undefined, callback, "script" );
        }
    });

    jQuery.each( [ "get", "post" ], function( i, method ) {
        jQuery[ method ] = function( url, data, callback, type ) {
            // Shift arguments if data argument was omitted
            if ( jQuery.isFunction( data ) ) {
                type = type || callback;
                callback = data;
                data = undefined;
            }

            return jQuery.ajax({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            });
        };
    });


    jQuery._evalUrl = function( url ) {
        return jQuery.ajax({
            url: url,
            type: "GET",
            dataType: "script",
            async: false,
            global: false,
            "throws": true
        });
    };


    jQuery.fn.extend({
        wrapAll: function( html ) {
            var wrap;

            if ( jQuery.isFunction( html ) ) {
                return this.each(function( i ) {
                    jQuery( this ).wrapAll( html.call(this, i) );
                });
            }

            if ( this[ 0 ] ) {

                // The elements to wrap the target around
                wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

                if ( this[ 0 ].parentNode ) {
                    wrap.insertBefore( this[ 0 ] );
                }

                wrap.map(function() {
                    var elem = this;

                    while ( elem.firstElementChild ) {
                        elem = elem.firstElementChild;
                    }

                    return elem;
                }).append( this );
            }

            return this;
        },

        wrapInner: function( html ) {
            if ( jQuery.isFunction( html ) ) {
                return this.each(function( i ) {
                    jQuery( this ).wrapInner( html.call(this, i) );
                });
            }

            return this.each(function() {
                var self = jQuery( this ),
                    contents = self.contents();

                if ( contents.length ) {
                    contents.wrapAll( html );

                } else {
                    self.append( html );
                }
            });
        },

        wrap: function( html ) {
            var isFunction = jQuery.isFunction( html );

            return this.each(function( i ) {
                jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
            });
        },

        unwrap: function() {
            return this.parent().each(function() {
                if ( !jQuery.nodeName( this, "body" ) ) {
                    jQuery( this ).replaceWith( this.childNodes );
                }
            }).end();
        }
    });


    jQuery.expr.filters.hidden = function( elem ) {
        // Support: Opera <= 12.12
        // Opera reports offsetWidths and offsetHeights less than zero on some elements
        return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
    };
    jQuery.expr.filters.visible = function( elem ) {
        return !jQuery.expr.filters.hidden( elem );
    };




    var r20 = /%20/g,
        rbracket = /\[\]$/,
        rCRLF = /\r?\n/g,
        rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
        rsubmittable = /^(?:input|select|textarea|keygen)/i;

    function buildParams( prefix, obj, traditional, add ) {
        var name;

        if ( jQuery.isArray( obj ) ) {
            // Serialize array item.
            jQuery.each( obj, function( i, v ) {
                if ( traditional || rbracket.test( prefix ) ) {
                    // Treat each array item as a scalar.
                    add( prefix, v );

                } else {
                    // Item is non-scalar (array or object), encode its numeric index.
                    buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
                }
            });

        } else if ( !traditional && jQuery.type( obj ) === "object" ) {
            // Serialize object item.
            for ( name in obj ) {
                buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
            }

        } else {
            // Serialize scalar item.
            add( prefix, obj );
        }
    }

// Serialize an array of form elements or a set of
// key/values into a query string
    jQuery.param = function( a, traditional ) {
        var prefix,
            s = [],
            add = function( key, value ) {
                // If value is a function, invoke it and return its value
                value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
                s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
            };

        // Set traditional to true for jQuery <= 1.3.2 behavior.
        if ( traditional === undefined ) {
            traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
        }

        // If an array was passed in, assume that it is an array of form elements.
        if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
            // Serialize the form elements
            jQuery.each( a, function() {
                add( this.name, this.value );
            });

        } else {
            // If traditional, encode the "old" way (the way 1.3.2 or older
            // did it), otherwise encode params recursively.
            for ( prefix in a ) {
                buildParams( prefix, a[ prefix ], traditional, add );
            }
        }

        // Return the resulting serialization
        return s.join( "&" ).replace( r20, "+" );
    };

    jQuery.fn.extend({
        serialize: function() {
            return jQuery.param( this.serializeArray() );
        },
        serializeArray: function() {
            return this.map(function() {
                // Can add propHook for "elements" to filter or add form elements
                var elements = jQuery.prop( this, "elements" );
                return elements ? jQuery.makeArray( elements ) : this;
            })
                .filter(function() {
                    var type = this.type;

                    // Use .is( ":disabled" ) so that fieldset[disabled] works
                    return this.name && !jQuery( this ).is( ":disabled" ) &&
                        rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
                        ( this.checked || !rcheckableType.test( type ) );
                })
                .map(function( i, elem ) {
                    var val = jQuery( this ).val();

                    return val == null ?
                        null :
                        jQuery.isArray( val ) ?
                            jQuery.map( val, function( val ) {
                                return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
                            }) :
                        { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
                }).get();
        }
    });


    jQuery.ajaxSettings.xhr = function() {
        try {
            return new XMLHttpRequest();
        } catch( e ) {}
    };

    var xhrId = 0,
        xhrCallbacks = {},
        xhrSuccessStatus = {
            // file protocol always yields status code 0, assume 200
            0: 200,
            // Support: IE9
            // #1450: sometimes IE returns 1223 when it should be 204
            1223: 204
        },
        xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
    if ( window.attachEvent ) {
        window.attachEvent( "onunload", function() {
            for ( var key in xhrCallbacks ) {
                xhrCallbacks[ key ]();
            }
        });
    }

    support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
    support.ajax = xhrSupported = !!xhrSupported;

    jQuery.ajaxTransport(function( options ) {
        var callback;

        // Cross domain only allowed if supported through XMLHttpRequest
        if ( support.cors || xhrSupported && !options.crossDomain ) {
            return {
                send: function( headers, complete ) {
                    var i,
                        xhr = options.xhr(),
                        id = ++xhrId;

                    xhr.open( options.type, options.url, options.async, options.username, options.password );

                    // Apply custom fields if provided
                    if ( options.xhrFields ) {
                        for ( i in options.xhrFields ) {
                            xhr[ i ] = options.xhrFields[ i ];
                        }
                    }

                    // Override mime type if needed
                    if ( options.mimeType && xhr.overrideMimeType ) {
                        xhr.overrideMimeType( options.mimeType );
                    }

                    // X-Requested-With header
                    // For cross-domain requests, seeing as conditions for a preflight are
                    // akin to a jigsaw puzzle, we simply never set it to be sure.
                    // (it can always be set on a per-request basis or even using ajaxSetup)
                    // For same-domain requests, won't change header if already provided.
                    if ( !options.crossDomain && !headers["X-Requested-With"] ) {
                        headers["X-Requested-With"] = "XMLHttpRequest";
                    }

                    // Set headers
                    for ( i in headers ) {
                        xhr.setRequestHeader( i, headers[ i ] );
                    }

                    // Callback
                    callback = function( type ) {
                        return function() {
                            if ( callback ) {
                                delete xhrCallbacks[ id ];
                                callback = xhr.onload = xhr.onerror = null;

                                if ( type === "abort" ) {
                                    xhr.abort();
                                } else if ( type === "error" ) {
                                    complete(
                                        // file: protocol always yields status 0; see #8605, #14207
                                        xhr.status,
                                        xhr.statusText
                                    );
                                } else {
                                    complete(
                                        xhrSuccessStatus[ xhr.status ] || xhr.status,
                                        xhr.statusText,
                                        // Support: IE9
                                        // Accessing binary-data responseText throws an exception
                                        // (#11426)
                                        typeof xhr.responseText === "string" ? {
                                            text: xhr.responseText
                                        } : undefined,
                                        xhr.getAllResponseHeaders()
                                    );
                                }
                            }
                        };
                    };

                    // Listen to events
                    xhr.onload = callback();
                    xhr.onerror = callback("error");

                    // Create the abort callback
                    callback = xhrCallbacks[ id ] = callback("abort");

                    try {
                        // Do send the request (this may raise an exception)
                        xhr.send( options.hasContent && options.data || null );
                    } catch ( e ) {
                        // #14683: Only rethrow if this hasn't been notified as an error yet
                        if ( callback ) {
                            throw e;
                        }
                    }
                },

                abort: function() {
                    if ( callback ) {
                        callback();
                    }
                }
            };
        }
    });




// Install script dataType
    jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function( text ) {
                jQuery.globalEval( text );
                return text;
            }
        }
    });

// Handle cache's special case and crossDomain
    jQuery.ajaxPrefilter( "script", function( s ) {
        if ( s.cache === undefined ) {
            s.cache = false;
        }
        if ( s.crossDomain ) {
            s.type = "GET";
        }
    });

// Bind script tag hack transport
    jQuery.ajaxTransport( "script", function( s ) {
        // This transport only deals with cross domain requests
        if ( s.crossDomain ) {
            var script, callback;
            return {
                send: function( _, complete ) {
                    script = jQuery("<script>").prop({
                        async: true,
                        charset: s.scriptCharset,
                        src: s.url
                    }).on(
                        "load error",
                        callback = function( evt ) {
                            script.remove();
                            callback = null;
                            if ( evt ) {
                                complete( evt.type === "error" ? 404 : 200, evt.type );
                            }
                        }
                    );
                    document.head.appendChild( script[ 0 ] );
                },
                abort: function() {
                    if ( callback ) {
                        callback();
                    }
                }
            };
        }
    });




    var oldCallbacks = [],
        rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
            this[ callback ] = true;
            return callback;
        }
    });

// Detect, normalize options and install callbacks for jsonp requests
    jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

        var callbackName, overwritten, responseContainer,
            jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
                    "url" :
                typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
                );

        // Handle iff the expected data type is "jsonp" or we have a parameter to set
        if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

            // Get callback name, remembering preexisting value associated with it
            callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
                s.jsonpCallback() :
                s.jsonpCallback;

            // Insert callback into url or form data
            if ( jsonProp ) {
                s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
            } else if ( s.jsonp !== false ) {
                s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
            }

            // Use data converter to retrieve json after script execution
            s.converters["script json"] = function() {
                if ( !responseContainer ) {
                    jQuery.error( callbackName + " was not called" );
                }
                return responseContainer[ 0 ];
            };

            // force json dataType
            s.dataTypes[ 0 ] = "json";

            // Install callback
            overwritten = window[ callbackName ];
            window[ callbackName ] = function() {
                responseContainer = arguments;
            };

            // Clean-up function (fires after converters)
            jqXHR.always(function() {
                // Restore preexisting value
                window[ callbackName ] = overwritten;

                // Save back as free
                if ( s[ callbackName ] ) {
                    // make sure that re-using the options doesn't screw things around
                    s.jsonpCallback = originalSettings.jsonpCallback;

                    // save the callback name for future use
                    oldCallbacks.push( callbackName );
                }

                // Call if it was a function and we have a response
                if ( responseContainer && jQuery.isFunction( overwritten ) ) {
                    overwritten( responseContainer[ 0 ] );
                }

                responseContainer = overwritten = undefined;
            });

            // Delegate to script
            return "script";
        }
    });




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
    jQuery.parseHTML = function( data, context, keepScripts ) {
        if ( !data || typeof data !== "string" ) {
            return null;
        }
        if ( typeof context === "boolean" ) {
            keepScripts = context;
            context = false;
        }
        context = context || document;

        var parsed = rsingleTag.exec( data ),
            scripts = !keepScripts && [];

        // Single tag
        if ( parsed ) {
            return [ context.createElement( parsed[1] ) ];
        }

        parsed = jQuery.buildFragment( [ data ], context, scripts );

        if ( scripts && scripts.length ) {
            jQuery( scripts ).remove();
        }

        return jQuery.merge( [], parsed.childNodes );
    };


// Keep a copy of the old load method
    var _load = jQuery.fn.load;

    /**
     * Load a url into a page
     */
    jQuery.fn.load = function( url, params, callback ) {
        if ( typeof url !== "string" && _load ) {
            return _load.apply( this, arguments );
        }

        var selector, type, response,
            self = this,
            off = url.indexOf(" ");

        if ( off >= 0 ) {
            selector = jQuery.trim( url.slice( off ) );
            url = url.slice( 0, off );
        }

        // If it's a function
        if ( jQuery.isFunction( params ) ) {

            // We assume that it's the callback
            callback = params;
            params = undefined;

            // Otherwise, build a param string
        } else if ( params && typeof params === "object" ) {
            type = "POST";
        }

        // If we have elements to modify, make the request
        if ( self.length > 0 ) {
            jQuery.ajax({
                url: url,

                // if "type" variable is undefined, then "GET" method will be used
                type: type,
                dataType: "html",
                data: params
            }).done(function( responseText ) {

                // Save response for use in complete callback
                response = arguments;

                self.html( selector ?

                    // If a selector was specified, locate the right elements in a dummy div
                    // Exclude scripts to avoid IE 'Permission Denied' errors
                    jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

                    // Otherwise use the full result
                    responseText );

            }).complete( callback && function( jqXHR, status ) {
                self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
            });
        }

        return this;
    };




// Attach a bunch of functions for handling common AJAX events
    jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
        jQuery.fn[ type ] = function( fn ) {
            return this.on( type, fn );
        };
    });




    jQuery.expr.filters.animated = function( elem ) {
        return jQuery.grep(jQuery.timers, function( fn ) {
            return elem === fn.elem;
        }).length;
    };




    var docElem = window.document.documentElement;

    /**
     * Gets a window from an element
     */
    function getWindow( elem ) {
        return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
    }

    jQuery.offset = {
        setOffset: function( elem, options, i ) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
                position = jQuery.css( elem, "position" ),
                curElem = jQuery( elem ),
                props = {};

            // Set position first, in-case top/left are set even on static elem
            if ( position === "static" ) {
                elem.style.position = "relative";
            }

            curOffset = curElem.offset();
            curCSSTop = jQuery.css( elem, "top" );
            curCSSLeft = jQuery.css( elem, "left" );
            calculatePosition = ( position === "absolute" || position === "fixed" ) &&
            ( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

            // Need to be able to calculate position if either
            // top or left is auto and position is either absolute or fixed
            if ( calculatePosition ) {
                curPosition = curElem.position();
                curTop = curPosition.top;
                curLeft = curPosition.left;

            } else {
                curTop = parseFloat( curCSSTop ) || 0;
                curLeft = parseFloat( curCSSLeft ) || 0;
            }

            if ( jQuery.isFunction( options ) ) {
                options = options.call( elem, i, curOffset );
            }

            if ( options.top != null ) {
                props.top = ( options.top - curOffset.top ) + curTop;
            }
            if ( options.left != null ) {
                props.left = ( options.left - curOffset.left ) + curLeft;
            }

            if ( "using" in options ) {
                options.using.call( elem, props );

            } else {
                curElem.css( props );
            }
        }
    };

    jQuery.fn.extend({
        offset: function( options ) {
            if ( arguments.length ) {
                return options === undefined ?
                    this :
                    this.each(function( i ) {
                        jQuery.offset.setOffset( this, options, i );
                    });
            }

            var docElem, win,
                elem = this[ 0 ],
                box = { top: 0, left: 0 },
                doc = elem && elem.ownerDocument;

            if ( !doc ) {
                return;
            }

            docElem = doc.documentElement;

            // Make sure it's not a disconnected DOM node
            if ( !jQuery.contains( docElem, elem ) ) {
                return box;
            }

            // Support: BlackBerry 5, iOS 3 (original iPhone)
            // If we don't have gBCR, just use 0,0 rather than error
            if ( typeof elem.getBoundingClientRect !== strundefined ) {
                box = elem.getBoundingClientRect();
            }
            win = getWindow( doc );
            return {
                top: box.top + win.pageYOffset - docElem.clientTop,
                left: box.left + win.pageXOffset - docElem.clientLeft
            };
        },

        position: function() {
            if ( !this[ 0 ] ) {
                return;
            }

            var offsetParent, offset,
                elem = this[ 0 ],
                parentOffset = { top: 0, left: 0 };

            // Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
            if ( jQuery.css( elem, "position" ) === "fixed" ) {
                // Assume getBoundingClientRect is there when computed position is fixed
                offset = elem.getBoundingClientRect();

            } else {
                // Get *real* offsetParent
                offsetParent = this.offsetParent();

                // Get correct offsets
                offset = this.offset();
                if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
                    parentOffset = offsetParent.offset();
                }

                // Add offsetParent borders
                parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
                parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
            }

            // Subtract parent offsets and element margins
            return {
                top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
                left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
            };
        },

        offsetParent: function() {
            return this.map(function() {
                var offsetParent = this.offsetParent || docElem;

                while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
                    offsetParent = offsetParent.offsetParent;
                }

                return offsetParent || docElem;
            });
        }
    });

// Create scrollLeft and scrollTop methods
    jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
        var top = "pageYOffset" === prop;

        jQuery.fn[ method ] = function( val ) {
            return access( this, function( elem, method, val ) {
                var win = getWindow( elem );

                if ( val === undefined ) {
                    return win ? win[ prop ] : elem[ method ];
                }

                if ( win ) {
                    win.scrollTo(
                        !top ? val : window.pageXOffset,
                        top ? val : window.pageYOffset
                    );

                } else {
                    elem[ method ] = val;
                }
            }, method, val, arguments.length, null );
        };
    });

// Support: Safari<7+, Chrome<37+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
    jQuery.each( [ "top", "left" ], function( i, prop ) {
        jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
            function( elem, computed ) {
                if ( computed ) {
                    computed = curCSS( elem, prop );
                    // If curCSS returns percentage, fallback to offset
                    return rnumnonpx.test( computed ) ?
                    jQuery( elem ).position()[ prop ] + "px" :
                        computed;
                }
            }
        );
    });


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
    jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
        jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
            // Margin is only for outerHeight, outerWidth
            jQuery.fn[ funcName ] = function( margin, value ) {
                var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
                    extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

                return access( this, function( elem, type, value ) {
                    var doc;

                    if ( jQuery.isWindow( elem ) ) {
                        // As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
                        // isn't a whole lot we can do. See pull request at this URL for discussion:
                        // https://github.com/jquery/jquery/pull/764
                        return elem.document.documentElement[ "client" + name ];
                    }

                    // Get document width or height
                    if ( elem.nodeType === 9 ) {
                        doc = elem.documentElement;

                        // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
                        // whichever is greatest
                        return Math.max(
                            elem.body[ "scroll" + name ], doc[ "scroll" + name ],
                            elem.body[ "offset" + name ], doc[ "offset" + name ],
                            doc[ "client" + name ]
                        );
                    }

                    return value === undefined ?
                        // Get width or height on the element, requesting but not forcing parseFloat
                        jQuery.css( elem, type, extra ) :

                        // Set width or height on the element
                        jQuery.style( elem, type, value, extra );
                }, type, chainable ? margin : undefined, chainable, null );
            };
        });
    });


// The number of elements contained in the matched element set
    jQuery.fn.size = function() {
        return this.length;
    };

    jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

    if ( typeof define === "function" && define.amd ) {
        define( "jquery", [], function() {
            return jQuery;
        });
    }




    var
    // Map over jQuery in case of overwrite
        _jQuery = window.jQuery,

    // Map over the $ in case of overwrite
        _$ = window.$;

    jQuery.noConflict = function( deep ) {
        if ( window.$ === jQuery ) {
            window.$ = _$;
        }

        if ( deep && window.jQuery === jQuery ) {
            window.jQuery = _jQuery;
        }

        return jQuery;
    };

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
    if ( typeof noGlobal === strundefined ) {
        window.jQuery = window.$ = jQuery;
    }




    return jQuery;

}));
/*!
 * Bootstrap v3.3.4 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
    throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
    'use strict';
    var version = $.fn.jquery.split(' ')[0].split('.')
    if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
        throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher')
    }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.4
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
    'use strict';

    // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
    // ============================================================

    function transitionEnd() {
        var el = document.createElement('bootstrap')

        var transEndEventNames = {
            WebkitTransition : 'webkitTransitionEnd',
            MozTransition    : 'transitionend',
            OTransition      : 'oTransitionEnd otransitionend',
            transition       : 'transitionend'
        }

        for (var name in transEndEventNames) {
            if (el.style[name] !== undefined) {
                return { end: transEndEventNames[name] }
            }
        }

        return false // explicit for ie8 (  ._.)
    }

    // http://blog.alexmaccaw.com/css-transitions
    $.fn.emulateTransitionEnd = function (duration) {
        var called = false
        var $el = this
        $(this).one('bsTransitionEnd', function () { called = true })
        var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
        setTimeout(callback, duration)
        return this
    }

    $(function () {
        $.support.transition = transitionEnd()

        if (!$.support.transition) return

        $.event.special.bsTransitionEnd = {
            bindType: $.support.transition.end,
            delegateType: $.support.transition.end,
            handle: function (e) {
                if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
            }
        }
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.4
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
    'use strict';

    // ALERT CLASS DEFINITION
    // ======================

    var dismiss = '[data-dismiss="alert"]'
    var Alert   = function (el) {
        $(el).on('click', dismiss, this.close)
    }

    Alert.VERSION = '3.3.4'

    Alert.TRANSITION_DURATION = 150

    Alert.prototype.close = function (e) {
        var $this    = $(this)
        var selector = $this.attr('data-target')

        if (!selector) {
            selector = $this.attr('href')
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
        }

        var $parent = $(selector)

        if (e) e.preventDefault()

        if (!$parent.length) {
            $parent = $this.closest('.alert')
        }

        $parent.trigger(e = $.Event('close.bs.alert'))

        if (e.isDefaultPrevented()) return

        $parent.removeClass('in')

        function removeElement() {
            // detach from parent, fire event then clean up data
            $parent.detach().trigger('closed.bs.alert').remove()
        }

        $.support.transition && $parent.hasClass('fade') ?
            $parent
                .one('bsTransitionEnd', removeElement)
                .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
            removeElement()
    }


    // ALERT PLUGIN DEFINITION
    // =======================

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this)
            var data  = $this.data('bs.alert')

            if (!data) $this.data('bs.alert', (data = new Alert(this)))
            if (typeof option == 'string') data[option].call($this)
        })
    }

    var old = $.fn.alert

    $.fn.alert             = Plugin
    $.fn.alert.Constructor = Alert


    // ALERT NO CONFLICT
    // =================

    $.fn.alert.noConflict = function () {
        $.fn.alert = old
        return this
    }


    // ALERT DATA-API
    // ==============

    $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.4
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
    'use strict';

    // BUTTON PUBLIC CLASS DEFINITION
    // ==============================

    var Button = function (element, options) {
        this.$element  = $(element)
        this.options   = $.extend({}, Button.DEFAULTS, options)
        this.isLoading = false
    }

    Button.VERSION  = '3.3.4'

    Button.DEFAULTS = {
        loadingText: 'loading...'
    }

    Button.prototype.setState = function (state) {
        var d    = 'disabled'
        var $el  = this.$element
        var val  = $el.is('input') ? 'val' : 'html'
        var data = $el.data()

        state += 'Text'

        if (data.resetText == null) $el.data('resetText', $el[val]())

        // push to event loop to allow forms to submit
        setTimeout($.proxy(function () {
            $el[val](data[state] == null ? this.options[state] : data[state])

            if (state == 'loadingText') {
                this.isLoading = true
                $el.addClass(d).attr(d, d)
            } else if (this.isLoading) {
                this.isLoading = false
                $el.removeClass(d).removeAttr(d)
            }
        }, this), 0)
    }

    Button.prototype.toggle = function () {
        var changed = true
        var $parent = this.$element.closest('[data-toggle="buttons"]')

        if ($parent.length) {
            var $input = this.$element.find('input')
            if ($input.prop('type') == 'radio') {
                if ($input.prop('checked')) changed = false
                $parent.find('.active').removeClass('active')
                this.$element.addClass('active')
            } else if ($input.prop('type') == 'checkbox') {
                if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
                this.$element.toggleClass('active')
            }
            $input.prop('checked', this.$element.hasClass('active'))
            if (changed) $input.trigger('change')
        } else {
            this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
            this.$element.toggleClass('active')
        }
    }


    // BUTTON PLUGIN DEFINITION
    // ========================

    function Plugin(option) {
        return this.each(function () {
            var $this   = $(this)
            var data    = $this.data('bs.button')
            var options = typeof option == 'object' && option

            if (!data) $this.data('bs.button', (data = new Button(this, options)))

            if (option == 'toggle') data.toggle()
            else if (option) data.setState(option)
        })
    }

    var old = $.fn.button

    $.fn.button             = Plugin
    $.fn.button.Constructor = Button


    // BUTTON NO CONFLICT
    // ==================

    $.fn.button.noConflict = function () {
        $.fn.button = old
        return this
    }


    // BUTTON DATA-API
    // ===============

    $(document)
        .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
            var $btn = $(e.target)
            if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
            Plugin.call($btn, 'toggle')
            if (!($(e.target).is('input[type="radio"]') || $(e.target).is('input[type="checkbox"]'))) e.preventDefault()
        })
        .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
            $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
        })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.4
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
    'use strict';

    // CAROUSEL CLASS DEFINITION
    // =========================

    var Carousel = function (element, options) {
        this.$element    = $(element)
        this.$indicators = this.$element.find('.carousel-indicators')
        this.options     = options
        this.paused      = null
        this.sliding     = null
        this.interval    = null
        this.$active     = null
        this.$items      = null

        this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

        this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
            .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
            .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
    }

    Carousel.VERSION  = '3.3.4'

    Carousel.TRANSITION_DURATION = 600

    Carousel.DEFAULTS = {
        interval: 5000,
        pause: 'hover',
        wrap: true,
        keyboard: true
    }

    Carousel.prototype.keydown = function (e) {
        if (/input|textarea/i.test(e.target.tagName)) return
        switch (e.which) {
            case 37: this.prev(); break
            case 39: this.next(); break
            default: return
        }

        e.preventDefault()
    }

    Carousel.prototype.cycle = function (e) {
        e || (this.paused = false)

        this.interval && clearInterval(this.interval)

        this.options.interval
        && !this.paused
        && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

        return this
    }

    Carousel.prototype.getItemIndex = function (item) {
        this.$items = item.parent().children('.item')
        return this.$items.index(item || this.$active)
    }

    Carousel.prototype.getItemForDirection = function (direction, active) {
        var activeIndex = this.getItemIndex(active)
        var willWrap = (direction == 'prev' && activeIndex === 0)
            || (direction == 'next' && activeIndex == (this.$items.length - 1))
        if (willWrap && !this.options.wrap) return active
        var delta = direction == 'prev' ? -1 : 1
        var itemIndex = (activeIndex + delta) % this.$items.length
        return this.$items.eq(itemIndex)
    }

    Carousel.prototype.to = function (pos) {
        var that        = this
        var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

        if (pos > (this.$items.length - 1) || pos < 0) return

        if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
        if (activeIndex == pos) return this.pause().cycle()

        return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
    }

    Carousel.prototype.pause = function (e) {
        e || (this.paused = true)

        if (this.$element.find('.next, .prev').length && $.support.transition) {
            this.$element.trigger($.support.transition.end)
            this.cycle(true)
        }

        this.interval = clearInterval(this.interval)

        return this
    }

    Carousel.prototype.next = function () {
        if (this.sliding) return
        return this.slide('next')
    }

    Carousel.prototype.prev = function () {
        if (this.sliding) return
        return this.slide('prev')
    }

    Carousel.prototype.slide = function (type, next) {
        var $active   = this.$element.find('.item.active')
        var $next     = next || this.getItemForDirection(type, $active)
        var isCycling = this.interval
        var direction = type == 'next' ? 'left' : 'right'
        var that      = this

        if ($next.hasClass('active')) return (this.sliding = false)

        var relatedTarget = $next[0]
        var slideEvent = $.Event('slide.bs.carousel', {
            relatedTarget: relatedTarget,
            direction: direction
        })
        this.$element.trigger(slideEvent)
        if (slideEvent.isDefaultPrevented()) return

        this.sliding = true

        isCycling && this.pause()

        if (this.$indicators.length) {
            this.$indicators.find('.active').removeClass('active')
            var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
            $nextIndicator && $nextIndicator.addClass('active')
        }

        var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
        if ($.support.transition && this.$element.hasClass('slide')) {
            $next.addClass(type)
            $next[0].offsetWidth // force reflow
            $active.addClass(direction)
            $next.addClass(direction)
            $active
                .one('bsTransitionEnd', function () {
                    $next.removeClass([type, direction].join(' ')).addClass('active')
                    $active.removeClass(['active', direction].join(' '))
                    that.sliding = false
                    setTimeout(function () {
                        that.$element.trigger(slidEvent)
                    }, 0)
                })
                .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
        } else {
            $active.removeClass('active')
            $next.addClass('active')
            this.sliding = false
            this.$element.trigger(slidEvent)
        }

        isCycling && this.cycle()

        return this
    }


    // CAROUSEL PLUGIN DEFINITION
    // ==========================

    function Plugin(option) {
        return this.each(function () {
            var $this   = $(this)
            var data    = $this.data('bs.carousel')
            var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
            var action  = typeof option == 'string' ? option : options.slide

            if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
            if (typeof option == 'number') data.to(option)
            else if (action) data[action]()
            else if (options.interval) data.pause().cycle()
        })
    }

    var old = $.fn.carousel

    $.fn.carousel             = Plugin
    $.fn.carousel.Constructor = Carousel


    // CAROUSEL NO CONFLICT
    // ====================

    $.fn.carousel.noConflict = function () {
        $.fn.carousel = old
        return this
    }


    // CAROUSEL DATA-API
    // =================

    var clickHandler = function (e) {
        var href
        var $this   = $(this)
        var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
        if (!$target.hasClass('carousel')) return
        var options = $.extend({}, $target.data(), $this.data())
        var slideIndex = $this.attr('data-slide-to')
        if (slideIndex) options.interval = false

        Plugin.call($target, options)

        if (slideIndex) {
            $target.data('bs.carousel').to(slideIndex)
        }

        e.preventDefault()
    }

    $(document)
        .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
        .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

    $(window).on('load', function () {
        $('[data-ride="carousel"]').each(function () {
            var $carousel = $(this)
            Plugin.call($carousel, $carousel.data())
        })
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.4
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
    'use strict';

    // COLLAPSE PUBLIC CLASS DEFINITION
    // ================================

    var Collapse = function (element, options) {
        this.$element      = $(element)
        this.options       = $.extend({}, Collapse.DEFAULTS, options)
        this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
        '[data-toggle="collapse"][data-target="#' + element.id + '"]')
        this.transitioning = null

        if (this.options.parent) {
            this.$parent = this.getParent()
        } else {
            this.addAriaAndCollapsedClass(this.$element, this.$trigger)
        }

        if (this.options.toggle) this.toggle()
    }

    Collapse.VERSION  = '3.3.4'

    Collapse.TRANSITION_DURATION = 350

    Collapse.DEFAULTS = {
        toggle: true
    }

    Collapse.prototype.dimension = function () {
        var hasWidth = this.$element.hasClass('width')
        return hasWidth ? 'width' : 'height'
    }

    Collapse.prototype.show = function () {
        if (this.transitioning || this.$element.hasClass('in')) return

        var activesData
        var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

        if (actives && actives.length) {
            activesData = actives.data('bs.collapse')
            if (activesData && activesData.transitioning) return
        }

        var startEvent = $.Event('show.bs.collapse')
        this.$element.trigger(startEvent)
        if (startEvent.isDefaultPrevented()) return

        if (actives && actives.length) {
            Plugin.call(actives, 'hide')
            activesData || actives.data('bs.collapse', null)
        }

        var dimension = this.dimension()

        this.$element
            .removeClass('collapse')
            .addClass('collapsing')[dimension](0)
            .attr('aria-expanded', true)

        this.$trigger
            .removeClass('collapsed')
            .attr('aria-expanded', true)

        this.transitioning = 1

        var complete = function () {
            this.$element
                .removeClass('collapsing')
                .addClass('collapse in')[dimension]('')
            this.transitioning = 0
            this.$element
                .trigger('shown.bs.collapse')
        }

        if (!$.support.transition) return complete.call(this)

        var scrollSize = $.camelCase(['scroll', dimension].join('-'))

        this.$element
            .one('bsTransitionEnd', $.proxy(complete, this))
            .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
    }

    Collapse.prototype.hide = function () {
        if (this.transitioning || !this.$element.hasClass('in')) return

        var startEvent = $.Event('hide.bs.collapse')
        this.$element.trigger(startEvent)
        if (startEvent.isDefaultPrevented()) return

        var dimension = this.dimension()

        this.$element[dimension](this.$element[dimension]())[0].offsetHeight

        this.$element
            .addClass('collapsing')
            .removeClass('collapse in')
            .attr('aria-expanded', false)

        this.$trigger
            .addClass('collapsed')
            .attr('aria-expanded', false)

        this.transitioning = 1

        var complete = function () {
            this.transitioning = 0
            this.$element
                .removeClass('collapsing')
                .addClass('collapse')
                .trigger('hidden.bs.collapse')
        }

        if (!$.support.transition) return complete.call(this)

        this.$element
            [dimension](0)
            .one('bsTransitionEnd', $.proxy(complete, this))
            .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
    }

    Collapse.prototype.toggle = function () {
        this[this.$element.hasClass('in') ? 'hide' : 'show']()
    }

    Collapse.prototype.getParent = function () {
        return $(this.options.parent)
            .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
            .each($.proxy(function (i, element) {
                var $element = $(element)
                this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
            }, this))
            .end()
    }

    Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
        var isOpen = $element.hasClass('in')

        $element.attr('aria-expanded', isOpen)
        $trigger
            .toggleClass('collapsed', !isOpen)
            .attr('aria-expanded', isOpen)
    }

    function getTargetFromTrigger($trigger) {
        var href
        var target = $trigger.attr('data-target')
            || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

        return $(target)
    }


    // COLLAPSE PLUGIN DEFINITION
    // ==========================

    function Plugin(option) {
        return this.each(function () {
            var $this   = $(this)
            var data    = $this.data('bs.collapse')
            var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

            if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
            if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    var old = $.fn.collapse

    $.fn.collapse             = Plugin
    $.fn.collapse.Constructor = Collapse


    // COLLAPSE NO CONFLICT
    // ====================

    $.fn.collapse.noConflict = function () {
        $.fn.collapse = old
        return this
    }


    // COLLAPSE DATA-API
    // =================

    $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
        var $this   = $(this)

        if (!$this.attr('data-target')) e.preventDefault()

        var $target = getTargetFromTrigger($this)
        var data    = $target.data('bs.collapse')
        var option  = data ? 'toggle' : $this.data()

        Plugin.call($target, option)
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.4
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
    'use strict';

    // DROPDOWN CLASS DEFINITION
    // =========================

    var backdrop = '.dropdown-backdrop'
    var toggle   = '[data-toggle="dropdown"]'
    var Dropdown = function (element) {
        $(element).on('click.bs.dropdown', this.toggle)
    }

    Dropdown.VERSION = '3.3.4'

    function getParent($this) {
        var selector = $this.attr('data-target')

        if (!selector) {
            selector = $this.attr('href')
            selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
        }

        var $parent = selector && $(selector)

        return $parent && $parent.length ? $parent : $this.parent()
    }

    function clearMenus(e) {
        if (e && e.which === 3) return
        $(backdrop).remove()
        $(toggle).each(function () {
            var $this         = $(this)
            var $parent       = getParent($this)
            var relatedTarget = { relatedTarget: this }

            if (!$parent.hasClass('open')) return

            if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

            $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

            if (e.isDefaultPrevented()) return

            $this.attr('aria-expanded', 'false')
            $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
        })
    }

    Dropdown.prototype.toggle = function (e) {
        var $this = $(this)

        if ($this.is('.disabled, :disabled')) return

        var $parent  = getParent($this)
        var isActive = $parent.hasClass('open')

        clearMenus()

        if (!isActive) {
            if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
                // if mobile we use a backdrop because click events don't delegate
                $(document.createElement('div'))
                    .addClass('dropdown-backdrop')
                    .insertAfter($(this))
                    .on('click', clearMenus)
            }

            var relatedTarget = { relatedTarget: this }
            $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

            if (e.isDefaultPrevented()) return

            $this
                .trigger('focus')
                .attr('aria-expanded', 'true')

            $parent
                .toggleClass('open')
                .trigger('shown.bs.dropdown', relatedTarget)
        }

        return false
    }

    Dropdown.prototype.keydown = function (e) {
        if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

        var $this = $(this)

        e.preventDefault()
        e.stopPropagation()

        if ($this.is('.disabled, :disabled')) return

        var $parent  = getParent($this)
        var isActive = $parent.hasClass('open')

        if (!isActive && e.which != 27 || isActive && e.which == 27) {
            if (e.which == 27) $parent.find(toggle).trigger('focus')
            return $this.trigger('click')
        }

        var desc = ' li:not(.disabled):visible a'
        var $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc)

        if (!$items.length) return

        var index = $items.index(e.target)

        if (e.which == 38 && index > 0)                 index--         // up
        if (e.which == 40 && index < $items.length - 1) index++         // down
        if (!~index)                                    index = 0

        $items.eq(index).trigger('focus')
    }


    // DROPDOWN PLUGIN DEFINITION
    // ==========================

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this)
            var data  = $this.data('bs.dropdown')

            if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
            if (typeof option == 'string') data[option].call($this)
        })
    }

    var old = $.fn.dropdown

    $.fn.dropdown             = Plugin
    $.fn.dropdown.Constructor = Dropdown


    // DROPDOWN NO CONFLICT
    // ====================

    $.fn.dropdown.noConflict = function () {
        $.fn.dropdown = old
        return this
    }


    // APPLY TO STANDARD DROPDOWN ELEMENTS
    // ===================================

    $(document)
        .on('click.bs.dropdown.data-api', clearMenus)
        .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
        .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
        .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
        .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.4
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
    'use strict';

    // MODAL CLASS DEFINITION
    // ======================

    var Modal = function (element, options) {
        this.options             = options
        this.$body               = $(document.body)
        this.$element            = $(element)
        this.$dialog             = this.$element.find('.modal-dialog')
        this.$backdrop           = null
        this.isShown             = null
        this.originalBodyPad     = null
        this.scrollbarWidth      = 0
        this.ignoreBackdropClick = false

        if (this.options.remote) {
            this.$element
                .find('.modal-content')
                .load(this.options.remote, $.proxy(function () {
                    this.$element.trigger('loaded.bs.modal')
                }, this))
        }
    }

    Modal.VERSION  = '3.3.4'

    Modal.TRANSITION_DURATION = 300
    Modal.BACKDROP_TRANSITION_DURATION = 150

    Modal.DEFAULTS = {
        backdrop: true,
        keyboard: true,
        show: true
    }

    Modal.prototype.toggle = function (_relatedTarget) {
        return this.isShown ? this.hide() : this.show(_relatedTarget)
    }

    Modal.prototype.show = function (_relatedTarget) {
        var that = this
        var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

        this.$element.trigger(e)

        if (this.isShown || e.isDefaultPrevented()) return

        this.isShown = true

        this.checkScrollbar()
        this.setScrollbar()
        this.$body.addClass('modal-open')

        this.escape()
        this.resize()

        this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

        this.$dialog.on('mousedown.dismiss.bs.modal', function () {
            that.$element.one('mouseup.dismiss.bs.modal', function (e) {
                if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
            })
        })

        this.backdrop(function () {
            var transition = $.support.transition && that.$element.hasClass('fade')

            if (!that.$element.parent().length) {
                that.$element.appendTo(that.$body) // don't move modals dom position
            }

            that.$element
                .show()
                .scrollTop(0)

            that.adjustDialog()

            if (transition) {
                that.$element[0].offsetWidth // force reflow
            }

            that.$element.addClass('in')

            that.enforceFocus()

            var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

            transition ?
                that.$dialog // wait for modal to slide in
                    .one('bsTransitionEnd', function () {
                        that.$element.trigger('focus').trigger(e)
                    })
                    .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
                that.$element.trigger('focus').trigger(e)
        })
    }

    Modal.prototype.hide = function (e) {
        if (e) e.preventDefault()

        e = $.Event('hide.bs.modal')

        this.$element.trigger(e)

        if (!this.isShown || e.isDefaultPrevented()) return

        this.isShown = false

        this.escape()
        this.resize()

        $(document).off('focusin.bs.modal')

        this.$element
            .removeClass('in')
            .off('click.dismiss.bs.modal')
            .off('mouseup.dismiss.bs.modal')

        this.$dialog.off('mousedown.dismiss.bs.modal')

        $.support.transition && this.$element.hasClass('fade') ?
            this.$element
                .one('bsTransitionEnd', $.proxy(this.hideModal, this))
                .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
            this.hideModal()
    }

    Modal.prototype.enforceFocus = function () {
        $(document)
            .off('focusin.bs.modal') // guard against infinite focus loop
            .on('focusin.bs.modal', $.proxy(function (e) {
                if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
                    this.$element.trigger('focus')
                }
            }, this))
    }

    Modal.prototype.escape = function () {
        if (this.isShown && this.options.keyboard) {
            this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
                e.which == 27 && this.hide()
            }, this))
        } else if (!this.isShown) {
            this.$element.off('keydown.dismiss.bs.modal')
        }
    }

    Modal.prototype.resize = function () {
        if (this.isShown) {
            $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
        } else {
            $(window).off('resize.bs.modal')
        }
    }

    Modal.prototype.hideModal = function () {
        var that = this
        this.$element.hide()
        this.backdrop(function () {
            that.$body.removeClass('modal-open')
            that.resetAdjustments()
            that.resetScrollbar()
            that.$element.trigger('hidden.bs.modal')
        })
    }

    Modal.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove()
        this.$backdrop = null
    }

    Modal.prototype.backdrop = function (callback) {
        var that = this
        var animate = this.$element.hasClass('fade') ? 'fade' : ''

        if (this.isShown && this.options.backdrop) {
            var doAnimate = $.support.transition && animate

            this.$backdrop = $(document.createElement('div'))
                .addClass('modal-backdrop ' + animate)
                .appendTo(this.$body)

            this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
                if (this.ignoreBackdropClick) {
                    this.ignoreBackdropClick = false
                    return
                }
                if (e.target !== e.currentTarget) return
                this.options.backdrop == 'static'
                    ? this.$element[0].focus()
                    : this.hide()
            }, this))

            if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

            this.$backdrop.addClass('in')

            if (!callback) return

            doAnimate ?
                this.$backdrop
                    .one('bsTransitionEnd', callback)
                    .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
                callback()

        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass('in')

            var callbackRemove = function () {
                that.removeBackdrop()
                callback && callback()
            }
            $.support.transition && this.$element.hasClass('fade') ?
                this.$backdrop
                    .one('bsTransitionEnd', callbackRemove)
                    .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
                callbackRemove()

        } else if (callback) {
            callback()
        }
    }

    // these following methods are used to handle overflowing modals

    Modal.prototype.handleUpdate = function () {
        this.adjustDialog()
    }

    Modal.prototype.adjustDialog = function () {
        var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

        this.$element.css({
            paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
            paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
        })
    }

    Modal.prototype.resetAdjustments = function () {
        this.$element.css({
            paddingLeft: '',
            paddingRight: ''
        })
    }

    Modal.prototype.checkScrollbar = function () {
        var fullWindowWidth = window.innerWidth
        if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
            var documentElementRect = document.documentElement.getBoundingClientRect()
            fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
        this.scrollbarWidth = this.measureScrollbar()
    }

    Modal.prototype.setScrollbar = function () {
        var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
        this.originalBodyPad = document.body.style.paddingRight || ''
        if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
    }

    Modal.prototype.resetScrollbar = function () {
        this.$body.css('padding-right', this.originalBodyPad)
    }

    Modal.prototype.measureScrollbar = function () { // thx walsh
        var scrollDiv = document.createElement('div')
        scrollDiv.className = 'modal-scrollbar-measure'
        this.$body.append(scrollDiv)
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
        this.$body[0].removeChild(scrollDiv)
        return scrollbarWidth
    }


    // MODAL PLUGIN DEFINITION
    // =======================

    function Plugin(option, _relatedTarget) {
        return this.each(function () {
            var $this   = $(this)
            var data    = $this.data('bs.modal')
            var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

            if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
            if (typeof option == 'string') data[option](_relatedTarget)
            else if (options.show) data.show(_relatedTarget)
        })
    }

    var old = $.fn.modal

    $.fn.modal             = Plugin
    $.fn.modal.Constructor = Modal


    // MODAL NO CONFLICT
    // =================

    $.fn.modal.noConflict = function () {
        $.fn.modal = old
        return this
    }


    // MODAL DATA-API
    // ==============

    $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
        var $this   = $(this)
        var href    = $this.attr('href')
        var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
        var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

        if ($this.is('a')) e.preventDefault()

        $target.one('show.bs.modal', function (showEvent) {
            if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
            $target.one('hidden.bs.modal', function () {
                $this.is(':visible') && $this.trigger('focus')
            })
        })
        Plugin.call($target, option, this)
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.4
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
    'use strict';

    // TOOLTIP PUBLIC CLASS DEFINITION
    // ===============================

    var Tooltip = function (element, options) {
        this.type       = null
        this.options    = null
        this.enabled    = null
        this.timeout    = null
        this.hoverState = null
        this.$element   = null
        this.inState    = null

        this.init('tooltip', element, options)
    }

    Tooltip.VERSION  = '3.3.4'

    Tooltip.TRANSITION_DURATION = 150

    Tooltip.DEFAULTS = {
        animation: true,
        placement: 'top',
        selector: false,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: 'hover focus',
        title: '',
        delay: 0,
        html: false,
        container: false,
        viewport: {
            selector: 'body',
            padding: 0
        }
    }

    Tooltip.prototype.init = function (type, element, options) {
        this.enabled   = true
        this.type      = type
        this.$element  = $(element)
        this.options   = this.getOptions(options)
        this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
        this.inState   = { click: false, hover: false, focus: false }

        if (this.$element[0] instanceof document.constructor && !this.options.selector) {
            throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
        }

        var triggers = this.options.trigger.split(' ')

        for (var i = triggers.length; i--;) {
            var trigger = triggers[i]

            if (trigger == 'click') {
                this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
            } else if (trigger != 'manual') {
                var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
                var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

                this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
                this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
            }
        }

        this.options.selector ?
            (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
            this.fixTitle()
    }

    Tooltip.prototype.getDefaults = function () {
        return Tooltip.DEFAULTS
    }

    Tooltip.prototype.getOptions = function (options) {
        options = $.extend({}, this.getDefaults(), this.$element.data(), options)

        if (options.delay && typeof options.delay == 'number') {
            options.delay = {
                show: options.delay,
                hide: options.delay
            }
        }

        return options
    }

    Tooltip.prototype.getDelegateOptions = function () {
        var options  = {}
        var defaults = this.getDefaults()

        this._options && $.each(this._options, function (key, value) {
            if (defaults[key] != value) options[key] = value
        })

        return options
    }

    Tooltip.prototype.enter = function (obj) {
        var self = obj instanceof this.constructor ?
            obj : $(obj.currentTarget).data('bs.' + this.type)

        if (!self) {
            self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
            $(obj.currentTarget).data('bs.' + this.type, self)
        }

        if (obj instanceof $.Event) {
            self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
        }

        if (self.tip().hasClass('in') || self.hoverState == 'in') {
            self.hoverState = 'in'
            return
        }

        clearTimeout(self.timeout)

        self.hoverState = 'in'

        if (!self.options.delay || !self.options.delay.show) return self.show()

        self.timeout = setTimeout(function () {
            if (self.hoverState == 'in') self.show()
        }, self.options.delay.show)
    }

    Tooltip.prototype.isInStateTrue = function () {
        for (var key in this.inState) {
            if (this.inState[key]) return true
        }

        return false
    }

    Tooltip.prototype.leave = function (obj) {
        var self = obj instanceof this.constructor ?
            obj : $(obj.currentTarget).data('bs.' + this.type)

        if (!self) {
            self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
            $(obj.currentTarget).data('bs.' + this.type, self)
        }

        if (obj instanceof $.Event) {
            self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
        }

        if (self.isInStateTrue()) return

        clearTimeout(self.timeout)

        self.hoverState = 'out'

        if (!self.options.delay || !self.options.delay.hide) return self.hide()

        self.timeout = setTimeout(function () {
            if (self.hoverState == 'out') self.hide()
        }, self.options.delay.hide)
    }

    Tooltip.prototype.show = function () {
        var e = $.Event('show.bs.' + this.type)

        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e)

            var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
            if (e.isDefaultPrevented() || !inDom) return
            var that = this

            var $tip = this.tip()

            var tipId = this.getUID(this.type)

            this.setContent()
            $tip.attr('id', tipId)
            this.$element.attr('aria-describedby', tipId)

            if (this.options.animation) $tip.addClass('fade')

            var placement = typeof this.options.placement == 'function' ?
                this.options.placement.call(this, $tip[0], this.$element[0]) :
                this.options.placement

            var autoToken = /\s?auto?\s?/i
            var autoPlace = autoToken.test(placement)
            if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

            $tip
                .detach()
                .css({ top: 0, left: 0, display: 'block' })
                .addClass(placement)
                .data('bs.' + this.type, this)

            this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
            this.$element.trigger('inserted.bs.' + this.type)

            var pos          = this.getPosition()
            var actualWidth  = $tip[0].offsetWidth
            var actualHeight = $tip[0].offsetHeight

            if (autoPlace) {
                var orgPlacement = placement
                var viewportDim = this.getPosition(this.$viewport)

                placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                        placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                            placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                                placement

                $tip
                    .removeClass(orgPlacement)
                    .addClass(placement)
            }

            var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

            this.applyPlacement(calculatedOffset, placement)

            var complete = function () {
                var prevHoverState = that.hoverState
                that.$element.trigger('shown.bs.' + that.type)
                that.hoverState = null

                if (prevHoverState == 'out') that.leave(that)
            }

            $.support.transition && this.$tip.hasClass('fade') ?
                $tip
                    .one('bsTransitionEnd', complete)
                    .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
                complete()
        }
    }

    Tooltip.prototype.applyPlacement = function (offset, placement) {
        var $tip   = this.tip()
        var width  = $tip[0].offsetWidth
        var height = $tip[0].offsetHeight

        // manually read margins because getBoundingClientRect includes difference
        var marginTop = parseInt($tip.css('margin-top'), 10)
        var marginLeft = parseInt($tip.css('margin-left'), 10)

        // we must check for NaN for ie 8/9
        if (isNaN(marginTop))  marginTop  = 0
        if (isNaN(marginLeft)) marginLeft = 0

        offset.top  += marginTop
        offset.left += marginLeft

        // $.fn.offset doesn't round pixel values
        // so we use setOffset directly with our own function B-0
        $.offset.setOffset($tip[0], $.extend({
            using: function (props) {
                $tip.css({
                    top: Math.round(props.top),
                    left: Math.round(props.left)
                })
            }
        }, offset), 0)

        $tip.addClass('in')

        // check to see if placing tip in new offset caused the tip to resize itself
        var actualWidth  = $tip[0].offsetWidth
        var actualHeight = $tip[0].offsetHeight

        if (placement == 'top' && actualHeight != height) {
            offset.top = offset.top + height - actualHeight
        }

        var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

        if (delta.left) offset.left += delta.left
        else offset.top += delta.top

        var isVertical          = /top|bottom/.test(placement)
        var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
        var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

        $tip.offset(offset)
        this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
    }

    Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
        this.arrow()
            .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
            .css(isVertical ? 'top' : 'left', '')
    }

    Tooltip.prototype.setContent = function () {
        var $tip  = this.tip()
        var title = this.getTitle()

        $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
        $tip.removeClass('fade in top bottom left right')
    }

    Tooltip.prototype.hide = function (callback) {
        var that = this
        var $tip = $(this.$tip)
        var e    = $.Event('hide.bs.' + this.type)

        function complete() {
            if (that.hoverState != 'in') $tip.detach()
            that.$element
                .removeAttr('aria-describedby')
                .trigger('hidden.bs.' + that.type)
            callback && callback()
        }

        this.$element.trigger(e)

        if (e.isDefaultPrevented()) return

        $tip.removeClass('in')

        $.support.transition && $tip.hasClass('fade') ?
            $tip
                .one('bsTransitionEnd', complete)
                .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
            complete()

        this.hoverState = null

        return this
    }

    Tooltip.prototype.fixTitle = function () {
        var $e = this.$element
        if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
            $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
        }
    }

    Tooltip.prototype.hasContent = function () {
        return this.getTitle()
    }

    Tooltip.prototype.getPosition = function ($element) {
        $element   = $element || this.$element

        var el     = $element[0]
        var isBody = el.tagName == 'BODY'

        var elRect    = el.getBoundingClientRect()
        if (elRect.width == null) {
            // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
            elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
        }
        var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
        var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
        var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

        return $.extend({}, elRect, scroll, outerDims, elOffset)
    }

    Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
        return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
            placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
                placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
                    /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

    }

    Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
        var delta = { top: 0, left: 0 }
        if (!this.$viewport) return delta

        var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
        var viewportDimensions = this.getPosition(this.$viewport)

        if (/right|left/.test(placement)) {
            var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
            var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
            if (topEdgeOffset < viewportDimensions.top) { // top overflow
                delta.top = viewportDimensions.top - topEdgeOffset
            } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
                delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
            }
        } else {
            var leftEdgeOffset  = pos.left - viewportPadding
            var rightEdgeOffset = pos.left + viewportPadding + actualWidth
            if (leftEdgeOffset < viewportDimensions.left) { // left overflow
                delta.left = viewportDimensions.left - leftEdgeOffset
            } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
                delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
            }
        }

        return delta
    }

    Tooltip.prototype.getTitle = function () {
        var title
        var $e = this.$element
        var o  = this.options

        title = $e.attr('data-original-title')
        || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

        return title
    }

    Tooltip.prototype.getUID = function (prefix) {
        do prefix += ~~(Math.random() * 1000000)
        while (document.getElementById(prefix))
        return prefix
    }

    Tooltip.prototype.tip = function () {
        if (!this.$tip) {
            this.$tip = $(this.options.template)
            if (this.$tip.length != 1) {
                throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
            }
        }
        return this.$tip
    }

    Tooltip.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
    }

    Tooltip.prototype.enable = function () {
        this.enabled = true
    }

    Tooltip.prototype.disable = function () {
        this.enabled = false
    }

    Tooltip.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled
    }

    Tooltip.prototype.toggle = function (e) {
        var self = this
        if (e) {
            self = $(e.currentTarget).data('bs.' + this.type)
            if (!self) {
                self = new this.constructor(e.currentTarget, this.getDelegateOptions())
                $(e.currentTarget).data('bs.' + this.type, self)
            }
        }

        if (e) {
            self.inState.click = !self.inState.click
            if (self.isInStateTrue()) self.enter(self)
            else self.leave(self)
        } else {
            self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
        }
    }

    Tooltip.prototype.destroy = function () {
        var that = this
        clearTimeout(this.timeout)
        this.hide(function () {
            that.$element.off('.' + that.type).removeData('bs.' + that.type)
            if (that.$tip) {
                that.$tip.detach()
            }
            that.$tip = null
            that.$arrow = null
            that.$viewport = null
        })
    }


    // TOOLTIP PLUGIN DEFINITION
    // =========================

    function Plugin(option) {
        return this.each(function () {
            var $this   = $(this)
            var data    = $this.data('bs.tooltip')
            var options = typeof option == 'object' && option

            if (!data && /destroy|hide/.test(option)) return
            if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    var old = $.fn.tooltip

    $.fn.tooltip             = Plugin
    $.fn.tooltip.Constructor = Tooltip


    // TOOLTIP NO CONFLICT
    // ===================

    $.fn.tooltip.noConflict = function () {
        $.fn.tooltip = old
        return this
    }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.4
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
    'use strict';

    // POPOVER PUBLIC CLASS DEFINITION
    // ===============================

    var Popover = function (element, options) {
        this.init('popover', element, options)
    }

    if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

    Popover.VERSION  = '3.3.4'

    Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
        placement: 'right',
        trigger: 'click',
        content: '',
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    })


    // NOTE: POPOVER EXTENDS tooltip.js
    // ================================

    Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

    Popover.prototype.constructor = Popover

    Popover.prototype.getDefaults = function () {
        return Popover.DEFAULTS
    }

    Popover.prototype.setContent = function () {
        var $tip    = this.tip()
        var title   = this.getTitle()
        var content = this.getContent()

        $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
        $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
            this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
            ](content)

        $tip.removeClass('fade top bottom left right in')

        // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
        // this manually by checking the contents.
        if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
    }

    Popover.prototype.hasContent = function () {
        return this.getTitle() || this.getContent()
    }

    Popover.prototype.getContent = function () {
        var $e = this.$element
        var o  = this.options

        return $e.attr('data-content')
            || (typeof o.content == 'function' ?
                o.content.call($e[0]) :
                o.content)
    }

    Popover.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
    }


    // POPOVER PLUGIN DEFINITION
    // =========================

    function Plugin(option) {
        return this.each(function () {
            var $this   = $(this)
            var data    = $this.data('bs.popover')
            var options = typeof option == 'object' && option

            if (!data && /destroy|hide/.test(option)) return
            if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    var old = $.fn.popover

    $.fn.popover             = Plugin
    $.fn.popover.Constructor = Popover


    // POPOVER NO CONFLICT
    // ===================

    $.fn.popover.noConflict = function () {
        $.fn.popover = old
        return this
    }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.4
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
    'use strict';

    // SCROLLSPY CLASS DEFINITION
    // ==========================

    function ScrollSpy(element, options) {
        this.$body          = $(document.body)
        this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
        this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
        this.selector       = (this.options.target || '') + ' .nav li > a'
        this.offsets        = []
        this.targets        = []
        this.activeTarget   = null
        this.scrollHeight   = 0

        this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
        this.refresh()
        this.process()
    }

    ScrollSpy.VERSION  = '3.3.4'

    ScrollSpy.DEFAULTS = {
        offset: 10
    }

    ScrollSpy.prototype.getScrollHeight = function () {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }

    ScrollSpy.prototype.refresh = function () {
        var that          = this
        var offsetMethod  = 'offset'
        var offsetBase    = 0

        this.offsets      = []
        this.targets      = []
        this.scrollHeight = this.getScrollHeight()

        if (!$.isWindow(this.$scrollElement[0])) {
            offsetMethod = 'position'
            offsetBase   = this.$scrollElement.scrollTop()
        }

        this.$body
            .find(this.selector)
            .map(function () {
                var $el   = $(this)
                var href  = $el.data('target') || $el.attr('href')
                var $href = /^#./.test(href) && $(href)

                return ($href
                    && $href.length
                    && $href.is(':visible')
                    && [[$href[offsetMethod]().top + offsetBase, href]]) || null
            })
            .sort(function (a, b) { return a[0] - b[0] })
            .each(function () {
                that.offsets.push(this[0])
                that.targets.push(this[1])
            })
    }

    ScrollSpy.prototype.process = function () {
        var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
        var scrollHeight = this.getScrollHeight()
        var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
        var offsets      = this.offsets
        var targets      = this.targets
        var activeTarget = this.activeTarget
        var i

        if (this.scrollHeight != scrollHeight) {
            this.refresh()
        }

        if (scrollTop >= maxScroll) {
            return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
        }

        if (activeTarget && scrollTop < offsets[0]) {
            this.activeTarget = null
            return this.clear()
        }

        for (i = offsets.length; i--;) {
            activeTarget != targets[i]
            && scrollTop >= offsets[i]
            && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
            && this.activate(targets[i])
        }
    }

    ScrollSpy.prototype.activate = function (target) {
        this.activeTarget = target

        this.clear()

        var selector = this.selector +
            '[data-target="' + target + '"],' +
            this.selector + '[href="' + target + '"]'

        var active = $(selector)
            .parents('li')
            .addClass('active')

        if (active.parent('.dropdown-menu').length) {
            active = active
                .closest('li.dropdown')
                .addClass('active')
        }

        active.trigger('activate.bs.scrollspy')
    }

    ScrollSpy.prototype.clear = function () {
        $(this.selector)
            .parentsUntil(this.options.target, '.active')
            .removeClass('active')
    }


    // SCROLLSPY PLUGIN DEFINITION
    // ===========================

    function Plugin(option) {
        return this.each(function () {
            var $this   = $(this)
            var data    = $this.data('bs.scrollspy')
            var options = typeof option == 'object' && option

            if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    var old = $.fn.scrollspy

    $.fn.scrollspy             = Plugin
    $.fn.scrollspy.Constructor = ScrollSpy


    // SCROLLSPY NO CONFLICT
    // =====================

    $.fn.scrollspy.noConflict = function () {
        $.fn.scrollspy = old
        return this
    }


    // SCROLLSPY DATA-API
    // ==================

    $(window).on('load.bs.scrollspy.data-api', function () {
        $('[data-spy="scroll"]').each(function () {
            var $spy = $(this)
            Plugin.call($spy, $spy.data())
        })
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.4
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
    'use strict';

    // TAB CLASS DEFINITION
    // ====================

    var Tab = function (element) {
        // jscs:disable requireDollarBeforejQueryAssignment
        this.element = $(element)
        // jscs:enable requireDollarBeforejQueryAssignment
    }

    Tab.VERSION = '3.3.4'

    Tab.TRANSITION_DURATION = 150

    Tab.prototype.show = function () {
        var $this    = this.element
        var $ul      = $this.closest('ul:not(.dropdown-menu)')
        var selector = $this.data('target')

        if (!selector) {
            selector = $this.attr('href')
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
        }

        if ($this.parent('li').hasClass('active')) return

        var $previous = $ul.find('.active:last a')
        var hideEvent = $.Event('hide.bs.tab', {
            relatedTarget: $this[0]
        })
        var showEvent = $.Event('show.bs.tab', {
            relatedTarget: $previous[0]
        })

        $previous.trigger(hideEvent)
        $this.trigger(showEvent)

        if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

        var $target = $(selector)

        this.activate($this.closest('li'), $ul)
        this.activate($target, $target.parent(), function () {
            $previous.trigger({
                type: 'hidden.bs.tab',
                relatedTarget: $this[0]
            })
            $this.trigger({
                type: 'shown.bs.tab',
                relatedTarget: $previous[0]
            })
        })
    }

    Tab.prototype.activate = function (element, container, callback) {
        var $active    = container.find('> .active')
        var transition = callback
            && $.support.transition
            && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

        function next() {
            $active
                .removeClass('active')
                .find('> .dropdown-menu > .active')
                .removeClass('active')
                .end()
                .find('[data-toggle="tab"]')
                .attr('aria-expanded', false)

            element
                .addClass('active')
                .find('[data-toggle="tab"]')
                .attr('aria-expanded', true)

            if (transition) {
                element[0].offsetWidth // reflow for transition
                element.addClass('in')
            } else {
                element.removeClass('fade')
            }

            if (element.parent('.dropdown-menu').length) {
                element
                    .closest('li.dropdown')
                    .addClass('active')
                    .end()
                    .find('[data-toggle="tab"]')
                    .attr('aria-expanded', true)
            }

            callback && callback()
        }

        $active.length && transition ?
            $active
                .one('bsTransitionEnd', next)
                .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
            next()

        $active.removeClass('in')
    }


    // TAB PLUGIN DEFINITION
    // =====================

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this)
            var data  = $this.data('bs.tab')

            if (!data) $this.data('bs.tab', (data = new Tab(this)))
            if (typeof option == 'string') data[option]()
        })
    }

    var old = $.fn.tab

    $.fn.tab             = Plugin
    $.fn.tab.Constructor = Tab


    // TAB NO CONFLICT
    // ===============

    $.fn.tab.noConflict = function () {
        $.fn.tab = old
        return this
    }


    // TAB DATA-API
    // ============

    var clickHandler = function (e) {
        e.preventDefault()
        Plugin.call($(this), 'show')
    }

    $(document)
        .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
        .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.4
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
    'use strict';

    // AFFIX CLASS DEFINITION
    // ======================

    var Affix = function (element, options) {
        this.options = $.extend({}, Affix.DEFAULTS, options)

        this.$target = $(this.options.target)
            .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
            .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

        this.$element     = $(element)
        this.affixed      = null
        this.unpin        = null
        this.pinnedOffset = null

        this.checkPosition()
    }

    Affix.VERSION  = '3.3.4'

    Affix.RESET    = 'affix affix-top affix-bottom'

    Affix.DEFAULTS = {
        offset: 0,
        target: window
    }

    Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
        var scrollTop    = this.$target.scrollTop()
        var position     = this.$element.offset()
        var targetHeight = this.$target.height()

        if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

        if (this.affixed == 'bottom') {
            if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
            return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
        }

        var initializing   = this.affixed == null
        var colliderTop    = initializing ? scrollTop : position.top
        var colliderHeight = initializing ? targetHeight : height

        if (offsetTop != null && scrollTop <= offsetTop) return 'top'
        if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

        return false
    }

    Affix.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset) return this.pinnedOffset
        this.$element.removeClass(Affix.RESET).addClass('affix')
        var scrollTop = this.$target.scrollTop()
        var position  = this.$element.offset()
        return (this.pinnedOffset = position.top - scrollTop)
    }

    Affix.prototype.checkPositionWithEventLoop = function () {
        setTimeout($.proxy(this.checkPosition, this), 1)
    }

    Affix.prototype.checkPosition = function () {
        if (!this.$element.is(':visible')) return

        var height       = this.$element.height()
        var offset       = this.options.offset
        var offsetTop    = offset.top
        var offsetBottom = offset.bottom
        var scrollHeight = Math.max($(document).height(), $(document.body).height())

        if (typeof offset != 'object')         offsetBottom = offsetTop = offset
        if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
        if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

        var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

        if (this.affixed != affix) {
            if (this.unpin != null) this.$element.css('top', '')

            var affixType = 'affix' + (affix ? '-' + affix : '')
            var e         = $.Event(affixType + '.bs.affix')

            this.$element.trigger(e)

            if (e.isDefaultPrevented()) return

            this.affixed = affix
            this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

            this.$element
                .removeClass(Affix.RESET)
                .addClass(affixType)
                .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
        }

        if (affix == 'bottom') {
            this.$element.offset({
                top: scrollHeight - height - offsetBottom
            })
        }
    }


    // AFFIX PLUGIN DEFINITION
    // =======================

    function Plugin(option) {
        return this.each(function () {
            var $this   = $(this)
            var data    = $this.data('bs.affix')
            var options = typeof option == 'object' && option

            if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    var old = $.fn.affix

    $.fn.affix             = Plugin
    $.fn.affix.Constructor = Affix


    // AFFIX NO CONFLICT
    // =================

    $.fn.affix.noConflict = function () {
        $.fn.affix = old
        return this
    }


    // AFFIX DATA-API
    // ==============

    $(window).on('load', function () {
        $('[data-spy="affix"]').each(function () {
            var $spy = $(this)
            var data = $spy.data()

            data.offset = data.offset || {}

            if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
            if (data.offsetTop    != null) data.offset.top    = data.offsetTop

            Plugin.call($spy, data)
        })
    })

}(jQuery);
/*
 * Project: Bootstrap Notify = v3.1.3
 * Description: Turns standard Bootstrap alerts into "Growl-like" notifications.
 * Author: Mouse0270 aka Robert McIntosh
 * License: MIT License
 * Website: https://github.com/mouse0270/bootstrap-growl
 */
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function ($) {
  // Create the defaults once
  var defaults = {
    element: 'body',
    position: null,
    type: "info",
    allow_dismiss: true,
    newest_on_top: false,
    showProgressbar: false,
    placement: {
      from: "top",
      align: "right"
    },
    offset: 20,
    spacing: 10,
    z_index: 1031,
    delay: 5000,
    timer: 1000,
    url_target: '_blank',
    mouse_over: null,
    animate: {
      enter: 'animated fadeInDown',
      exit: 'animated fadeOutUp'
    },
    onShow: null,
    onShown: null,
    onClose: null,
    onClosed: null,
    icon_type: 'class',
    template: '<div data-notify="container" class="col-xs-11 col-sm-4 alert alert-{0}" role="alert"><button type="button" aria-hidden="true" class="close" data-notify="dismiss">&times;</button><span data-notify="icon"></span> <span data-notify="title">{1}</span> <span data-notify="message">{2}</span><div class="progress" data-notify="progressbar"><div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><a href="{3}" target="{4}" data-notify="url"></a></div>'
  };

  String.format = function() {
    var str = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
      str = str.replace(RegExp("\\{" + (i - 1) + "\\}", "gm"), arguments[i]);
    }
    return str;
  };

  function Notify ( element, content, options ) {
    // Setup Content of Notify
    var content = {
      content: {
        message: typeof content == 'object' ? content.message : content,
        title: content.title ? content.title : '',
        icon: content.icon ? content.icon : '',
        url: content.url ? content.url : '#',
        target: content.target ? content.target : '-'
      }
    };

    options = $.extend(true, {}, content, options);
    this.settings = $.extend(true, {}, defaults, options);
    this._defaults = defaults;
    if (this.settings.content.target == "-") {
      this.settings.content.target = this.settings.url_target;
    }
    this.animations = {
      start: 'webkitAnimationStart oanimationstart MSAnimationStart animationstart',
      end: 'webkitAnimationEnd oanimationend MSAnimationEnd animationend'
    }

    if (typeof this.settings.offset == 'number') {
      this.settings.offset = {
        x: this.settings.offset,
        y: this.settings.offset
      };
    }

    this.init();
  };

  $.extend(Notify.prototype, {
    init: function () {
      var self = this;

      this.buildNotify();
      if (this.settings.content.icon) {
        this.setIcon();
      }
      if (this.settings.content.url != "#") {
        this.styleURL();
      }
      this.styleDismiss();
      this.placement();
      this.bind();

      this.notify = {
        $ele: this.$ele,
        update: function(command, update) {
          var commands = {};
          if (typeof command == "string") {
            commands[command] = update;
          }else{
            commands = command;
          }
          for (var command in commands) {
            switch (command) {
              case "type":
                this.$ele.removeClass('alert-' + self.settings.type);
                this.$ele.find('[data-notify="progressbar"] > .progress-bar').removeClass('progress-bar-' + self.settings.type);
                self.settings.type = commands[command];
                this.$ele.addClass('alert-' + commands[command]).find('[data-notify="progressbar"] > .progress-bar').addClass('progress-bar-' + commands[command]);
                break;
              case "icon":
                var $icon = this.$ele.find('[data-notify="icon"]');
                if (self.settings.icon_type.toLowerCase() == 'class') {
                  $icon.removeClass(self.settings.content.icon).addClass(commands[command]);
                }else{
                  if (!$icon.is('img')) {
                    $icon.find('img');
                  }
                  $icon.attr('src', commands[command]);
                }
                break;
              case "progress":
                var newDelay = self.settings.delay - (self.settings.delay * (commands[command] / 100));
                this.$ele.data('notify-delay', newDelay);
                this.$ele.find('[data-notify="progressbar"] > div').attr('aria-valuenow', commands[command]).css('width', commands[command] + '%');
                break;
              case "url":
                this.$ele.find('[data-notify="url"]').attr('href', commands[command]);
                break;
              case "target":
                this.$ele.find('[data-notify="url"]').attr('target', commands[command]);
                break;
              default:
                this.$ele.find('[data-notify="' + command +'"]').html(commands[command]);
            };
          }
          var posX = this.$ele.outerHeight() + parseInt(self.settings.spacing) + parseInt(self.settings.offset.y);
          self.reposition(posX);
        },
        close: function() {
          self.close();
        }
      };
    },
    buildNotify: function () {
      var content = this.settings.content;
      this.$ele = $(String.format(this.settings.template, this.settings.type, content.title, content.message, content.url, content.target));
      this.$ele.attr('data-notify-position', this.settings.placement.from + '-' + this.settings.placement.align);
      if (!this.settings.allow_dismiss) {
        this.$ele.find('[data-notify="dismiss"]').css('display', 'none');
      }
      if ((this.settings.delay <= 0 && !this.settings.showProgressbar) || !this.settings.showProgressbar) {
        this.$ele.find('[data-notify="progressbar"]').remove();
      }
    },
    setIcon: function() {
      if (this.settings.icon_type.toLowerCase() == 'class') {
        this.$ele.find('[data-notify="icon"]').addClass(this.settings.content.icon);
      }else{
        if (this.$ele.find('[data-notify="icon"]').is('img')) {
          this.$ele.find('[data-notify="icon"]').attr('src', this.settings.content.icon);
        }else{
          this.$ele.find('[data-notify="icon"]').append('<img src="'+this.settings.content.icon+'" alt="Notify Icon" />');
        }
      }
    },
    styleDismiss: function() {
      this.$ele.find('[data-notify="dismiss"]').css({
        position: 'absolute',
        right: '10px',
        top: '5px',
        zIndex: this.settings.z_index + 2
      });
    },
    styleURL: function() {
      this.$ele.find('[data-notify="url"]').css({
        backgroundImage: 'url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)',
        height: '100%',
        left: '0px',
        position: 'absolute',
        top: '0px',
        width: '100%',
        zIndex: this.settings.z_index + 1
      });
    },
    placement: function() {
      var self = this,
          offsetAmt = this.settings.offset.y,
          css = {
            display: 'inline-block',
            margin: '0px auto',
            position: this.settings.position ?  this.settings.position : (this.settings.element === 'body' ? 'fixed' : 'absolute'),
            transition: 'all .5s ease-in-out',
            zIndex: this.settings.z_index
          },
          hasAnimation = false,
          settings = this.settings;

      $('[data-notify-position="' + this.settings.placement.from + '-' + this.settings.placement.align + '"]:not([data-closing="true"])').each(function() {
        return offsetAmt = Math.max(offsetAmt, parseInt($(this).css(settings.placement.from)) +  parseInt($(this).outerHeight()) +  parseInt(settings.spacing));
      });
      if (this.settings.newest_on_top == true) {
        offsetAmt = this.settings.offset.y;
      }
      css[this.settings.placement.from] = offsetAmt+'px';

      switch (this.settings.placement.align) {
        case "left":
        case "right":
          css[this.settings.placement.align] = this.settings.offset.x+'px';
          break;
        case "center":
          css.left = 0;
          css.right = 0;
          break;
      }
      this.$ele.css(css).addClass(this.settings.animate.enter);
      $.each(Array('webkit-', 'moz-', 'o-', 'ms-', ''), function(index, prefix) {
        self.$ele[0].style[prefix+'AnimationIterationCount'] = 1;
      });

      $(this.settings.element).append(this.$ele);

      if (this.settings.newest_on_top == true) {
        offsetAmt = (parseInt(offsetAmt)+parseInt(this.settings.spacing)) + this.$ele.outerHeight();
        this.reposition(offsetAmt);
      }

      if ($.isFunction(self.settings.onShow)) {
        self.settings.onShow.call(this.$ele);
      }

      this.$ele.one(this.animations.start, function(event) {
        hasAnimation = true;
      }).one(this.animations.end, function(event) {
        if ($.isFunction(self.settings.onShown)) {
          self.settings.onShown.call(this);
        }
      });

      setTimeout(function() {
        if (!hasAnimation) {
          if ($.isFunction(self.settings.onShown)) {
            self.settings.onShown.call(this);
          }
        }
      }, 600);
    },
    bind: function() {
      var self = this;

      this.$ele.find('[data-notify="dismiss"]').on('click', function() {
        self.close();
      })

      this.$ele.mouseover(function(e) {
        $(this).data('data-hover', "true");
      }).mouseout(function(e) {
        $(this).data('data-hover', "false");
      });
      this.$ele.data('data-hover', "false");

      if (this.settings.delay > 0) {
        self.$ele.data('notify-delay', self.settings.delay);
        var timer = setInterval(function() {
          var delay = parseInt(self.$ele.data('notify-delay')) - self.settings.timer;
          if ((self.$ele.data('data-hover') === 'false' && self.settings.mouse_over == "pause") || self.settings.mouse_over != "pause") {
            var percent = ((self.settings.delay - delay) / self.settings.delay) * 100;
            self.$ele.data('notify-delay', delay);
            self.$ele.find('[data-notify="progressbar"] > div').attr('aria-valuenow', percent).css('width', percent + '%');
          }
          if (delay <= -(self.settings.timer)) {
            clearInterval(timer);
            self.close();
          }
        }, self.settings.timer);
      }
    },
    close: function() {
      var self = this,
          $successors = null,
          posX = parseInt(this.$ele.css(this.settings.placement.from)),
          hasAnimation = false;

      this.$ele.data('closing', 'true').addClass(this.settings.animate.exit);
      self.reposition(posX);

      if ($.isFunction(self.settings.onClose)) {
        self.settings.onClose.call(this.$ele);
      }

      this.$ele.one(this.animations.start, function(event) {
        hasAnimation = true;
      }).one(this.animations.end, function(event) {
        $(this).remove();
        if ($.isFunction(self.settings.onClosed)) {
          self.settings.onClosed.call(this);
        }
      });

      setTimeout(function() {
        if (!hasAnimation) {
          self.$ele.remove();
          if (self.settings.onClosed) {
            self.settings.onClosed(self.$ele);
          }
        }
      }, 600);
    },
    reposition: function(posX) {
      var self = this,
          notifies = '[data-notify-position="' + this.settings.placement.from + '-' + this.settings.placement.align + '"]:not([data-closing="true"])',
          $elements = this.$ele.nextAll(notifies);
      if (this.settings.newest_on_top == true) {
        $elements = this.$ele.prevAll(notifies);
      }
      $elements.each(function() {
        $(this).css(self.settings.placement.from, posX);
        posX = (parseInt(posX)+parseInt(self.settings.spacing)) + $(this).outerHeight();
      });
    }
  });

  $.notify = function ( content, options ) {
    var plugin = new Notify( this, content, options );
    return plugin.notify;
  };
  $.notifyDefaults = function( options ) {
    defaults = $.extend(true, {}, defaults, options);
    return defaults;
  };
  $.notifyClose = function( command ) {
    if (typeof command === "undefined" || command == "all") {
      $('[data-notify]').find('[data-notify="dismiss"]').trigger('click');
    }else{
      $('[data-notify-position="'+command+'"]').find('[data-notify="dismiss"]').trigger('click');
    }
  };

}));
/*global jQuery */
/*!
 * Lettering.JS 0.7.0
 *
 * Copyright 2010, Dave Rupert http://daverupert.com
 * Released under the WTFPL license
 * http://sam.zoy.org/wtfpl/
 *
 * Thanks to Paul Irish - http://paulirish.com - for the feedback.
 *
 * Date: Mon Sep 20 17:14:00 2010 -0600
 */
(function($){
    function injector(t, splitter, klass, after) {
        var text = t.text()
            , a = text.split(splitter)
            , inject = '';
        if (a.length) {
            $(a).each(function(i, item) {
                inject += '<span class="'+klass+(i+1)+'" aria-hidden="true">'+item+'</span>'+after;
            });
            t.attr('aria-label',text)
                .empty()
                .append(inject)

        }
    }


    var methods = {
        init : function() {

            return this.each(function() {
                injector($(this), '', 'char', '');
            });

        },

        words : function() {

            return this.each(function() {
                injector($(this), ' ', 'word', ' ');
            });

        },

        lines : function() {

            return this.each(function() {
                var r = "eefec303079ad17405c889e092e105b0";
                // Because it's hard to split a <br/> tag consistently across browsers,
                // (*ahem* IE *ahem*), we replace all <br/> instances with an md5 hash
                // (of the word "split").  If you're trying to use this plugin on that
                // md5 hash string, it will fail because you're being ridiculous.
                injector($(this).children("br").replaceWith(r).end(), r, 'line', '');
            });

        }
    };

    $.fn.lettering = function( method ) {
        // Method calling logic
        if ( method && methods[method] ) {
            return methods[ method ].apply( this, [].slice.call( arguments, 1 ));
        } else if ( method === 'letters' || ! method ) {
            return methods.init.apply( this, [].slice.call( arguments, 0 ) ); // always pass an array
        }
        $.error( 'Method ' +  method + ' does not exist on jQuery.lettering' );
        return this;
    };

})(jQuery);
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.io=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){

module.exports = _dereq_('./lib/');

},{"./lib/":2}],2:[function(_dereq_,module,exports){

/**
 * Module dependencies.
 */

var url = _dereq_('./url');
var parser = _dereq_('socket.io-parser');
var Manager = _dereq_('./manager');
var debug = _dereq_('debug')('socket.io-client');

/**
 * Module exports.
 */

module.exports = exports = lookup;

/**
 * Managers cache.
 */

var cache = exports.managers = {};

/**
 * Looks up an existing `Manager` for multiplexing.
 * If the user summons:
 *
 *   `io('http://localhost/a');`
 *   `io('http://localhost/b');`
 *
 * We reuse the existing instance based on same scheme/port/host,
 * and we initialize sockets for each namespace.
 *
 * @api public
 */

function lookup(uri, opts) {
  if (typeof uri == 'object') {
    opts = uri;
    uri = undefined;
  }

  opts = opts || {};

  var parsed = url(uri);
  var source = parsed.source;
  var id = parsed.id;
  var io;

  if (opts.forceNew || opts['force new connection'] || false === opts.multiplex) {
    debug('ignoring socket cache for %s', source);
    io = Manager(source, opts);
  } else {
    if (!cache[id]) {
      debug('new io instance for %s', source);
      cache[id] = Manager(source, opts);
    }
    io = cache[id];
  }

  return io.socket(parsed.path);
}

/**
 * Protocol version.
 *
 * @api public
 */

exports.protocol = parser.protocol;

/**
 * `connect`.
 *
 * @param {String} uri
 * @api public
 */

exports.connect = lookup;

/**
 * Expose constructors for standalone build.
 *
 * @api public
 */

exports.Manager = _dereq_('./manager');
exports.Socket = _dereq_('./socket');

},{"./manager":3,"./socket":5,"./url":6,"debug":10,"socket.io-parser":46}],3:[function(_dereq_,module,exports){

/**
 * Module dependencies.
 */

var url = _dereq_('./url');
var eio = _dereq_('engine.io-client');
var Socket = _dereq_('./socket');
var Emitter = _dereq_('component-emitter');
var parser = _dereq_('socket.io-parser');
var on = _dereq_('./on');
var bind = _dereq_('component-bind');
var object = _dereq_('object-component');
var debug = _dereq_('debug')('socket.io-client:manager');
var indexOf = _dereq_('indexof');
var Backoff = _dereq_('backo2');

/**
 * Module exports
 */

module.exports = Manager;

/**
 * `Manager` constructor.
 *
 * @param {String} engine instance or engine uri/opts
 * @param {Object} options
 * @api public
 */

function Manager(uri, opts){
  if (!(this instanceof Manager)) return new Manager(uri, opts);
  if (uri && ('object' == typeof uri)) {
    opts = uri;
    uri = undefined;
  }
  opts = opts || {};

  opts.path = opts.path || '/socket.io';
  this.nsps = {};
  this.subs = [];
  this.opts = opts;
  this.reconnection(opts.reconnection !== false);
  this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
  this.reconnectionDelay(opts.reconnectionDelay || 1000);
  this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
  this.randomizationFactor(opts.randomizationFactor || 0.5);
  this.backoff = new Backoff({
    min: this.reconnectionDelay(),
    max: this.reconnectionDelayMax(),
    jitter: this.randomizationFactor()
  });
  this.timeout(null == opts.timeout ? 20000 : opts.timeout);
  this.readyState = 'closed';
  this.uri = uri;
  this.connected = [];
  this.encoding = false;
  this.packetBuffer = [];
  this.encoder = new parser.Encoder();
  this.decoder = new parser.Decoder();
  this.autoConnect = opts.autoConnect !== false;
  if (this.autoConnect) this.open();
}

/**
 * Propagate given event to sockets and emit on `this`
 *
 * @api private
 */

Manager.prototype.emitAll = function() {
  this.emit.apply(this, arguments);
  for (var nsp in this.nsps) {
    this.nsps[nsp].emit.apply(this.nsps[nsp], arguments);
  }
};

/**
 * Update `socket.id` of all sockets
 *
 * @api private
 */

Manager.prototype.updateSocketIds = function(){
  for (var nsp in this.nsps) {
    this.nsps[nsp].id = this.engine.id;
  }
};

/**
 * Mix in `Emitter`.
 */

Emitter(Manager.prototype);

/**
 * Sets the `reconnection` config.
 *
 * @param {Boolean} true/false if it should automatically reconnect
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnection = function(v){
  if (!arguments.length) return this._reconnection;
  this._reconnection = !!v;
  return this;
};

/**
 * Sets the reconnection attempts config.
 *
 * @param {Number} max reconnection attempts before giving up
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionAttempts = function(v){
  if (!arguments.length) return this._reconnectionAttempts;
  this._reconnectionAttempts = v;
  return this;
};

/**
 * Sets the delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionDelay = function(v){
  if (!arguments.length) return this._reconnectionDelay;
  this._reconnectionDelay = v;
  this.backoff && this.backoff.setMin(v);
  return this;
};

Manager.prototype.randomizationFactor = function(v){
  if (!arguments.length) return this._randomizationFactor;
  this._randomizationFactor = v;
  this.backoff && this.backoff.setJitter(v);
  return this;
};

/**
 * Sets the maximum delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionDelayMax = function(v){
  if (!arguments.length) return this._reconnectionDelayMax;
  this._reconnectionDelayMax = v;
  this.backoff && this.backoff.setMax(v);
  return this;
};

/**
 * Sets the connection timeout. `false` to disable
 *
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.timeout = function(v){
  if (!arguments.length) return this._timeout;
  this._timeout = v;
  return this;
};

/**
 * Starts trying to reconnect if reconnection is enabled and we have not
 * started reconnecting yet
 *
 * @api private
 */

Manager.prototype.maybeReconnectOnOpen = function() {
  // Only try to reconnect if it's the first time we're connecting
  if (!this.reconnecting && this._reconnection && this.backoff.attempts === 0) {
    // keeps reconnection from firing twice for the same reconnection loop
    this.reconnect();
  }
};


/**
 * Sets the current transport `socket`.
 *
 * @param {Function} optional, callback
 * @return {Manager} self
 * @api public
 */

Manager.prototype.open =
Manager.prototype.connect = function(fn){
  debug('readyState %s', this.readyState);
  if (~this.readyState.indexOf('open')) return this;

  debug('opening %s', this.uri);
  this.engine = eio(this.uri, this.opts);
  var socket = this.engine;
  var self = this;
  this.readyState = 'opening';
  this.skipReconnect = false;

  // emit `open`
  var openSub = on(socket, 'open', function() {
    self.onopen();
    fn && fn();
  });

  // emit `connect_error`
  var errorSub = on(socket, 'error', function(data){
    debug('connect_error');
    self.cleanup();
    self.readyState = 'closed';
    self.emitAll('connect_error', data);
    if (fn) {
      var err = new Error('Connection error');
      err.data = data;
      fn(err);
    } else {
      // Only do this if there is no fn to handle the error
      self.maybeReconnectOnOpen();
    }
  });

  // emit `connect_timeout`
  if (false !== this._timeout) {
    var timeout = this._timeout;
    debug('connect attempt will timeout after %d', timeout);

    // set timer
    var timer = setTimeout(function(){
      debug('connect attempt timed out after %d', timeout);
      openSub.destroy();
      socket.close();
      socket.emit('error', 'timeout');
      self.emitAll('connect_timeout', timeout);
    }, timeout);

    this.subs.push({
      destroy: function(){
        clearTimeout(timer);
      }
    });
  }

  this.subs.push(openSub);
  this.subs.push(errorSub);

  return this;
};

/**
 * Called upon transport open.
 *
 * @api private
 */

Manager.prototype.onopen = function(){
  debug('open');

  // clear old subs
  this.cleanup();

  // mark as open
  this.readyState = 'open';
  this.emit('open');

  // add new subs
  var socket = this.engine;
  this.subs.push(on(socket, 'data', bind(this, 'ondata')));
  this.subs.push(on(this.decoder, 'decoded', bind(this, 'ondecoded')));
  this.subs.push(on(socket, 'error', bind(this, 'onerror')));
  this.subs.push(on(socket, 'close', bind(this, 'onclose')));
};

/**
 * Called with data.
 *
 * @api private
 */

Manager.prototype.ondata = function(data){
  this.decoder.add(data);
};

/**
 * Called when parser fully decodes a packet.
 *
 * @api private
 */

Manager.prototype.ondecoded = function(packet) {
  this.emit('packet', packet);
};

/**
 * Called upon socket error.
 *
 * @api private
 */

Manager.prototype.onerror = function(err){
  debug('error', err);
  this.emitAll('error', err);
};

/**
 * Creates a new socket for the given `nsp`.
 *
 * @return {Socket}
 * @api public
 */

Manager.prototype.socket = function(nsp){
  var socket = this.nsps[nsp];
  if (!socket) {
    socket = new Socket(this, nsp);
    this.nsps[nsp] = socket;
    var self = this;
    socket.on('connect', function(){
      socket.id = self.engine.id;
      if (!~indexOf(self.connected, socket)) {
        self.connected.push(socket);
      }
    });
  }
  return socket;
};

/**
 * Called upon a socket close.
 *
 * @param {Socket} socket
 */

Manager.prototype.destroy = function(socket){
  var index = indexOf(this.connected, socket);
  if (~index) this.connected.splice(index, 1);
  if (this.connected.length) return;

  this.close();
};

/**
 * Writes a packet.
 *
 * @param {Object} packet
 * @api private
 */

Manager.prototype.packet = function(packet){
  debug('writing packet %j', packet);
  var self = this;

  if (!self.encoding) {
    // encode, then write to engine with result
    self.encoding = true;
    this.encoder.encode(packet, function(encodedPackets) {
      for (var i = 0; i < encodedPackets.length; i++) {
        self.engine.write(encodedPackets[i]);
      }
      self.encoding = false;
      self.processPacketQueue();
    });
  } else { // add packet to the queue
    self.packetBuffer.push(packet);
  }
};

/**
 * If packet buffer is non-empty, begins encoding the
 * next packet in line.
 *
 * @api private
 */

Manager.prototype.processPacketQueue = function() {
  if (this.packetBuffer.length > 0 && !this.encoding) {
    var pack = this.packetBuffer.shift();
    this.packet(pack);
  }
};

/**
 * Clean up transport subscriptions and packet buffer.
 *
 * @api private
 */

Manager.prototype.cleanup = function(){
  var sub;
  while (sub = this.subs.shift()) sub.destroy();

  this.packetBuffer = [];
  this.encoding = false;

  this.decoder.destroy();
};

/**
 * Close the current socket.
 *
 * @api private
 */

Manager.prototype.close =
Manager.prototype.disconnect = function(){
  this.skipReconnect = true;
  this.backoff.reset();
  this.readyState = 'closed';
  this.engine && this.engine.close();
};

/**
 * Called upon engine close.
 *
 * @api private
 */

Manager.prototype.onclose = function(reason){
  debug('close');
  this.cleanup();
  this.backoff.reset();
  this.readyState = 'closed';
  this.emit('close', reason);
  if (this._reconnection && !this.skipReconnect) {
    this.reconnect();
  }
};

/**
 * Attempt a reconnection.
 *
 * @api private
 */

Manager.prototype.reconnect = function(){
  if (this.reconnecting || this.skipReconnect) return this;

  var self = this;

  if (this.backoff.attempts >= this._reconnectionAttempts) {
    debug('reconnect failed');
    this.backoff.reset();
    this.emitAll('reconnect_failed');
    this.reconnecting = false;
  } else {
    var delay = this.backoff.duration();
    debug('will wait %dms before reconnect attempt', delay);

    this.reconnecting = true;
    var timer = setTimeout(function(){
      if (self.skipReconnect) return;

      debug('attempting reconnect');
      self.emitAll('reconnect_attempt', self.backoff.attempts);
      self.emitAll('reconnecting', self.backoff.attempts);

      // check again for the case socket closed in above events
      if (self.skipReconnect) return;

      self.open(function(err){
        if (err) {
          debug('reconnect attempt error');
          self.reconnecting = false;
          self.reconnect();
          self.emitAll('reconnect_error', err.data);
        } else {
          debug('reconnect success');
          self.onreconnect();
        }
      });
    }, delay);

    this.subs.push({
      destroy: function(){
        clearTimeout(timer);
      }
    });
  }
};

/**
 * Called upon successful reconnect.
 *
 * @api private
 */

Manager.prototype.onreconnect = function(){
  var attempt = this.backoff.attempts;
  this.reconnecting = false;
  this.backoff.reset();
  this.updateSocketIds();
  this.emitAll('reconnect', attempt);
};

},{"./on":4,"./socket":5,"./url":6,"backo2":7,"component-bind":8,"component-emitter":9,"debug":10,"engine.io-client":11,"indexof":42,"object-component":43,"socket.io-parser":46}],4:[function(_dereq_,module,exports){

/**
 * Module exports.
 */

module.exports = on;

/**
 * Helper for subscriptions.
 *
 * @param {Object|EventEmitter} obj with `Emitter` mixin or `EventEmitter`
 * @param {String} event name
 * @param {Function} callback
 * @api public
 */

function on(obj, ev, fn) {
  obj.on(ev, fn);
  return {
    destroy: function(){
      obj.removeListener(ev, fn);
    }
  };
}

},{}],5:[function(_dereq_,module,exports){

/**
 * Module dependencies.
 */

var parser = _dereq_('socket.io-parser');
var Emitter = _dereq_('component-emitter');
var toArray = _dereq_('to-array');
var on = _dereq_('./on');
var bind = _dereq_('component-bind');
var debug = _dereq_('debug')('socket.io-client:socket');
var hasBin = _dereq_('has-binary');

/**
 * Module exports.
 */

module.exports = exports = Socket;

/**
 * Internal events (blacklisted).
 * These events can't be emitted by the user.
 *
 * @api private
 */

var events = {
  connect: 1,
  connect_error: 1,
  connect_timeout: 1,
  disconnect: 1,
  error: 1,
  reconnect: 1,
  reconnect_attempt: 1,
  reconnect_failed: 1,
  reconnect_error: 1,
  reconnecting: 1
};

/**
 * Shortcut to `Emitter#emit`.
 */

var emit = Emitter.prototype.emit;

/**
 * `Socket` constructor.
 *
 * @api public
 */

function Socket(io, nsp){
  this.io = io;
  this.nsp = nsp;
  this.json = this; // compat
  this.ids = 0;
  this.acks = {};
  if (this.io.autoConnect) this.open();
  this.receiveBuffer = [];
  this.sendBuffer = [];
  this.connected = false;
  this.disconnected = true;
}

/**
 * Mix in `Emitter`.
 */

Emitter(Socket.prototype);

/**
 * Subscribe to open, close and packet events
 *
 * @api private
 */

Socket.prototype.subEvents = function() {
  if (this.subs) return;

  var io = this.io;
  this.subs = [
    on(io, 'open', bind(this, 'onopen')),
    on(io, 'packet', bind(this, 'onpacket')),
    on(io, 'close', bind(this, 'onclose'))
  ];
};

/**
 * "Opens" the socket.
 *
 * @api public
 */

Socket.prototype.open =
Socket.prototype.connect = function(){
  if (this.connected) return this;

  this.subEvents();
  this.io.open(); // ensure open
  if ('open' == this.io.readyState) this.onopen();
  return this;
};

/**
 * Sends a `message` event.
 *
 * @return {Socket} self
 * @api public
 */

Socket.prototype.send = function(){
  var args = toArray(arguments);
  args.unshift('message');
  this.emit.apply(this, args);
  return this;
};

/**
 * Override `emit`.
 * If the event is in `events`, it's emitted normally.
 *
 * @param {String} event name
 * @return {Socket} self
 * @api public
 */

Socket.prototype.emit = function(ev){
  if (events.hasOwnProperty(ev)) {
    emit.apply(this, arguments);
    return this;
  }

  var args = toArray(arguments);
  var parserType = parser.EVENT; // default
  if (hasBin(args)) { parserType = parser.BINARY_EVENT; } // binary
  var packet = { type: parserType, data: args };

  // event ack callback
  if ('function' == typeof args[args.length - 1]) {
    debug('emitting packet with ack id %d', this.ids);
    this.acks[this.ids] = args.pop();
    packet.id = this.ids++;
  }

  if (this.connected) {
    this.packet(packet);
  } else {
    this.sendBuffer.push(packet);
  }

  return this;
};

/**
 * Sends a packet.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.packet = function(packet){
  packet.nsp = this.nsp;
  this.io.packet(packet);
};

/**
 * Called upon engine `open`.
 *
 * @api private
 */

Socket.prototype.onopen = function(){
  debug('transport is open - connecting');

  // write connect packet if necessary
  if ('/' != this.nsp) {
    this.packet({ type: parser.CONNECT });
  }
};

/**
 * Called upon engine `close`.
 *
 * @param {String} reason
 * @api private
 */

Socket.prototype.onclose = function(reason){
  debug('close (%s)', reason);
  this.connected = false;
  this.disconnected = true;
  delete this.id;
  this.emit('disconnect', reason);
};

/**
 * Called with socket packet.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onpacket = function(packet){
  if (packet.nsp != this.nsp) return;

  switch (packet.type) {
    case parser.CONNECT:
      this.onconnect();
      break;

    case parser.EVENT:
      this.onevent(packet);
      break;

    case parser.BINARY_EVENT:
      this.onevent(packet);
      break;

    case parser.ACK:
      this.onack(packet);
      break;

    case parser.BINARY_ACK:
      this.onack(packet);
      break;

    case parser.DISCONNECT:
      this.ondisconnect();
      break;

    case parser.ERROR:
      this.emit('error', packet.data);
      break;
  }
};

/**
 * Called upon a server event.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onevent = function(packet){
  var args = packet.data || [];
  debug('emitting event %j', args);

  if (null != packet.id) {
    debug('attaching ack callback to event');
    args.push(this.ack(packet.id));
  }

  if (this.connected) {
    emit.apply(this, args);
  } else {
    this.receiveBuffer.push(args);
  }
};

/**
 * Produces an ack callback to emit with an event.
 *
 * @api private
 */

Socket.prototype.ack = function(id){
  var self = this;
  var sent = false;
  return function(){
    // prevent double callbacks
    if (sent) return;
    sent = true;
    var args = toArray(arguments);
    debug('sending ack %j', args);

    var type = hasBin(args) ? parser.BINARY_ACK : parser.ACK;
    self.packet({
      type: type,
      id: id,
      data: args
    });
  };
};

/**
 * Called upon a server acknowlegement.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onack = function(packet){
  debug('calling ack %s with %j', packet.id, packet.data);
  var fn = this.acks[packet.id];
  fn.apply(this, packet.data);
  delete this.acks[packet.id];
};

/**
 * Called upon server connect.
 *
 * @api private
 */

Socket.prototype.onconnect = function(){
  this.connected = true;
  this.disconnected = false;
  this.emit('connect');
  this.emitBuffered();
};

/**
 * Emit buffered events (received and emitted).
 *
 * @api private
 */

Socket.prototype.emitBuffered = function(){
  var i;
  for (i = 0; i < this.receiveBuffer.length; i++) {
    emit.apply(this, this.receiveBuffer[i]);
  }
  this.receiveBuffer = [];

  for (i = 0; i < this.sendBuffer.length; i++) {
    this.packet(this.sendBuffer[i]);
  }
  this.sendBuffer = [];
};

/**
 * Called upon server disconnect.
 *
 * @api private
 */

Socket.prototype.ondisconnect = function(){
  debug('server disconnect (%s)', this.nsp);
  this.destroy();
  this.onclose('io server disconnect');
};

/**
 * Called upon forced client/server side disconnections,
 * this method ensures the manager stops tracking us and
 * that reconnections don't get triggered for this.
 *
 * @api private.
 */

Socket.prototype.destroy = function(){
  if (this.subs) {
    // clean subscriptions to avoid reconnections
    for (var i = 0; i < this.subs.length; i++) {
      this.subs[i].destroy();
    }
    this.subs = null;
  }

  this.io.destroy(this);
};

/**
 * Disconnects the socket manually.
 *
 * @return {Socket} self
 * @api public
 */

Socket.prototype.close =
Socket.prototype.disconnect = function(){
  if (this.connected) {
    debug('performing disconnect (%s)', this.nsp);
    this.packet({ type: parser.DISCONNECT });
  }

  // remove socket from pool
  this.destroy();

  if (this.connected) {
    // fire events
    this.onclose('io client disconnect');
  }
  return this;
};

},{"./on":4,"component-bind":8,"component-emitter":9,"debug":10,"has-binary":38,"socket.io-parser":46,"to-array":50}],6:[function(_dereq_,module,exports){
(function (global){

/**
 * Module dependencies.
 */

var parseuri = _dereq_('parseuri');
var debug = _dereq_('debug')('socket.io-client:url');

/**
 * Module exports.
 */

module.exports = url;

/**
 * URL parser.
 *
 * @param {String} url
 * @param {Object} An object meant to mimic window.location.
 *                 Defaults to window.location.
 * @api public
 */

function url(uri, loc){
  var obj = uri;

  // default to window.location
  var loc = loc || global.location;
  if (null == uri) uri = loc.protocol + '//' + loc.host;

  // relative path support
  if ('string' == typeof uri) {
    if ('/' == uri.charAt(0)) {
      if ('/' == uri.charAt(1)) {
        uri = loc.protocol + uri;
      } else {
        uri = loc.hostname + uri;
      }
    }

    if (!/^(https?|wss?):\/\//.test(uri)) {
      debug('protocol-less url %s', uri);
      if ('undefined' != typeof loc) {
        uri = loc.protocol + '//' + uri;
      } else {
        uri = 'https://' + uri;
      }
    }

    // parse
    debug('parse %s', uri);
    obj = parseuri(uri);
  }

  // make sure we treat `localhost:80` and `localhost` equally
  if (!obj.port) {
    if (/^(http|ws)$/.test(obj.protocol)) {
      obj.port = '80';
    }
    else if (/^(http|ws)s$/.test(obj.protocol)) {
      obj.port = '443';
    }
  }

  obj.path = obj.path || '/';

  // define unique id
  obj.id = obj.protocol + '://' + obj.host + ':' + obj.port;
  // define href
  obj.href = obj.protocol + '://' + obj.host + (loc && loc.port == obj.port ? '' : (':' + obj.port));

  return obj;
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"debug":10,"parseuri":44}],7:[function(_dereq_,module,exports){

/**
 * Expose `Backoff`.
 */

module.exports = Backoff;

/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */

function Backoff(opts) {
  opts = opts || {};
  this.ms = opts.min || 100;
  this.max = opts.max || 10000;
  this.factor = opts.factor || 2;
  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
  this.attempts = 0;
}

/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */

Backoff.prototype.duration = function(){
  var ms = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var rand =  Math.random();
    var deviation = Math.floor(rand * this.jitter * ms);
    ms = (Math.floor(rand * 10) & 1) == 0  ? ms - deviation : ms + deviation;
  }
  return Math.min(ms, this.max) | 0;
};

/**
 * Reset the number of attempts.
 *
 * @api public
 */

Backoff.prototype.reset = function(){
  this.attempts = 0;
};

/**
 * Set the minimum duration
 *
 * @api public
 */

Backoff.prototype.setMin = function(min){
  this.ms = min;
};

/**
 * Set the maximum duration
 *
 * @api public
 */

Backoff.prototype.setMax = function(max){
  this.max = max;
};

/**
 * Set the jitter
 *
 * @api public
 */

Backoff.prototype.setJitter = function(jitter){
  this.jitter = jitter;
};


},{}],8:[function(_dereq_,module,exports){
/**
 * Slice reference.
 */

var slice = [].slice;

/**
 * Bind `obj` to `fn`.
 *
 * @param {Object} obj
 * @param {Function|String} fn or string
 * @return {Function}
 * @api public
 */

module.exports = function(obj, fn){
  if ('string' == typeof fn) fn = obj[fn];
  if ('function' != typeof fn) throw new Error('bind() requires a function');
  var args = slice.call(arguments, 2);
  return function(){
    return fn.apply(obj, args.concat(slice.call(arguments)));
  }
};

},{}],9:[function(_dereq_,module,exports){

/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks[event] = this._callbacks[event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  var self = this;
  this._callbacks = this._callbacks || {};

  function on() {
    self.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks[event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks[event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks[event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks[event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],10:[function(_dereq_,module,exports){

/**
 * Expose `debug()` as the module.
 */

module.exports = debug;

/**
 * Create a debugger with the given `name`.
 *
 * @param {String} name
 * @return {Type}
 * @api public
 */

function debug(name) {
  if (!debug.enabled(name)) return function(){};

  return function(fmt){
    fmt = coerce(fmt);

    var curr = new Date;
    var ms = curr - (debug[name] || curr);
    debug[name] = curr;

    fmt = name
      + ' '
      + fmt
      + ' +' + debug.humanize(ms);

    // This hackery is required for IE8
    // where `console.log` doesn't have 'apply'
    window.console
      && console.log
      && Function.prototype.apply.call(console.log, console, arguments);
  }
}

/**
 * The currently active debug mode names.
 */

debug.names = [];
debug.skips = [];

/**
 * Enables a debug mode by name. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} name
 * @api public
 */

debug.enable = function(name) {
  try {
    localStorage.debug = name;
  } catch(e){}

  var split = (name || '').split(/[\s,]+/)
    , len = split.length;

  for (var i = 0; i < len; i++) {
    name = split[i].replace('*', '.*?');
    if (name[0] === '-') {
      debug.skips.push(new RegExp('^' + name.substr(1) + '$'));
    }
    else {
      debug.names.push(new RegExp('^' + name + '$'));
    }
  }
};

/**
 * Disable debug output.
 *
 * @api public
 */

debug.disable = function(){
  debug.enable('');
};

/**
 * Humanize the given `ms`.
 *
 * @param {Number} m
 * @return {String}
 * @api private
 */

debug.humanize = function(ms) {
  var sec = 1000
    , min = 60 * 1000
    , hour = 60 * min;

  if (ms >= hour) return (ms / hour).toFixed(1) + 'h';
  if (ms >= min) return (ms / min).toFixed(1) + 'm';
  if (ms >= sec) return (ms / sec | 0) + 's';
  return ms + 'ms';
};

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

debug.enabled = function(name) {
  for (var i = 0, len = debug.skips.length; i < len; i++) {
    if (debug.skips[i].test(name)) {
      return false;
    }
  }
  for (var i = 0, len = debug.names.length; i < len; i++) {
    if (debug.names[i].test(name)) {
      return true;
    }
  }
  return false;
};

/**
 * Coerce `val`.
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

// persist

try {
  if (window.localStorage) debug.enable(localStorage.debug);
} catch(e){}

},{}],11:[function(_dereq_,module,exports){

module.exports =  _dereq_('./lib/');

},{"./lib/":12}],12:[function(_dereq_,module,exports){

module.exports = _dereq_('./socket');

/**
 * Exports parser
 *
 * @api public
 *
 */
module.exports.parser = _dereq_('engine.io-parser');

},{"./socket":13,"engine.io-parser":25}],13:[function(_dereq_,module,exports){
(function (global){
/**
 * Module dependencies.
 */

var transports = _dereq_('./transports');
var Emitter = _dereq_('component-emitter');
var debug = _dereq_('debug')('engine.io-client:socket');
var index = _dereq_('indexof');
var parser = _dereq_('engine.io-parser');
var parseuri = _dereq_('parseuri');
var parsejson = _dereq_('parsejson');
var parseqs = _dereq_('parseqs');

/**
 * Module exports.
 */

module.exports = Socket;

/**
 * Noop function.
 *
 * @api private
 */

function noop(){}

/**
 * Socket constructor.
 *
 * @param {String|Object} uri or options
 * @param {Object} options
 * @api public
 */

function Socket(uri, opts){
  if (!(this instanceof Socket)) return new Socket(uri, opts);

  opts = opts || {};

  if (uri && 'object' == typeof uri) {
    opts = uri;
    uri = null;
  }

  if (uri) {
    uri = parseuri(uri);
    opts.host = uri.host;
    opts.secure = uri.protocol == 'https' || uri.protocol == 'wss';
    opts.port = uri.port;
    if (uri.query) opts.query = uri.query;
  }

  this.secure = null != opts.secure ? opts.secure :
    (global.location && 'https:' == location.protocol);

  if (opts.host) {
    var pieces = opts.host.split(':');
    opts.hostname = pieces.shift();
    if (pieces.length) {
      opts.port = pieces.pop();
    } else if (!opts.port) {
      // if no port is specified manually, use the protocol default
      opts.port = this.secure ? '443' : '80';
    }
  }

  this.agent = opts.agent || false;
  this.hostname = opts.hostname ||
    (global.location ? location.hostname : 'localhost');
  this.port = opts.port || (global.location && location.port ?
       location.port :
       (this.secure ? 443 : 80));
  this.query = opts.query || {};
  if ('string' == typeof this.query) this.query = parseqs.decode(this.query);
  this.upgrade = false !== opts.upgrade;
  this.path = (opts.path || '/engine.io').replace(/\/$/, '') + '/';
  this.forceJSONP = !!opts.forceJSONP;
  this.jsonp = false !== opts.jsonp;
  this.forceBase64 = !!opts.forceBase64;
  this.enablesXDR = !!opts.enablesXDR;
  this.timestampParam = opts.timestampParam || 't';
  this.timestampRequests = opts.timestampRequests;
  this.transports = opts.transports || ['polling', 'websocket'];
  this.readyState = '';
  this.writeBuffer = [];
  this.callbackBuffer = [];
  this.policyPort = opts.policyPort || 843;
  this.rememberUpgrade = opts.rememberUpgrade || false;
  this.binaryType = null;
  this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;

  // SSL options for Node.js client
  this.pfx = opts.pfx || null;
  this.key = opts.key || null;
  this.passphrase = opts.passphrase || null;
  this.cert = opts.cert || null;
  this.ca = opts.ca || null;
  this.ciphers = opts.ciphers || null;
  this.rejectUnauthorized = opts.rejectUnauthorized || null;

  this.open();
}

Socket.priorWebsocketSuccess = false;

/**
 * Mix in `Emitter`.
 */

Emitter(Socket.prototype);

/**
 * Protocol version.
 *
 * @api public
 */

Socket.protocol = parser.protocol; // this is an int

/**
 * Expose deps for legacy compatibility
 * and standalone browser access.
 */

Socket.Socket = Socket;
Socket.Transport = _dereq_('./transport');
Socket.transports = _dereq_('./transports');
Socket.parser = _dereq_('engine.io-parser');

/**
 * Creates transport of the given type.
 *
 * @param {String} transport name
 * @return {Transport}
 * @api private
 */

Socket.prototype.createTransport = function (name) {
  debug('creating transport "%s"', name);
  var query = clone(this.query);

  // append engine.io protocol identifier
  query.EIO = parser.protocol;

  // transport name
  query.transport = name;

  // session id if we already have one
  if (this.id) query.sid = this.id;

  var transport = new transports[name]({
    agent: this.agent,
    hostname: this.hostname,
    port: this.port,
    secure: this.secure,
    path: this.path,
    query: query,
    forceJSONP: this.forceJSONP,
    jsonp: this.jsonp,
    forceBase64: this.forceBase64,
    enablesXDR: this.enablesXDR,
    timestampRequests: this.timestampRequests,
    timestampParam: this.timestampParam,
    policyPort: this.policyPort,
    socket: this,
    pfx: this.pfx,
    key: this.key,
    passphrase: this.passphrase,
    cert: this.cert,
    ca: this.ca,
    ciphers: this.ciphers,
    rejectUnauthorized: this.rejectUnauthorized
  });

  return transport;
};

function clone (obj) {
  var o = {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = obj[i];
    }
  }
  return o;
}

/**
 * Initializes transport to use and starts probe.
 *
 * @api private
 */
Socket.prototype.open = function () {
  var transport;
  if (this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf('websocket') != -1) {
    transport = 'websocket';
  } else if (0 == this.transports.length) {
    // Emit error on next tick so it can be listened to
    var self = this;
    setTimeout(function() {
      self.emit('error', 'No transports available');
    }, 0);
    return;
  } else {
    transport = this.transports[0];
  }
  this.readyState = 'opening';

  // Retry with the next transport if the transport is disabled (jsonp: false)
  var transport;
  try {
    transport = this.createTransport(transport);
  } catch (e) {
    this.transports.shift();
    this.open();
    return;
  }

  transport.open();
  this.setTransport(transport);
};

/**
 * Sets the current transport. Disables the existing one (if any).
 *
 * @api private
 */

Socket.prototype.setTransport = function(transport){
  debug('setting transport %s', transport.name);
  var self = this;

  if (this.transport) {
    debug('clearing existing transport %s', this.transport.name);
    this.transport.removeAllListeners();
  }

  // set up transport
  this.transport = transport;

  // set up transport listeners
  transport
  .on('drain', function(){
    self.onDrain();
  })
  .on('packet', function(packet){
    self.onPacket(packet);
  })
  .on('error', function(e){
    self.onError(e);
  })
  .on('close', function(){
    self.onClose('transport close');
  });
};

/**
 * Probes a transport.
 *
 * @param {String} transport name
 * @api private
 */

Socket.prototype.probe = function (name) {
  debug('probing transport "%s"', name);
  var transport = this.createTransport(name, { probe: 1 })
    , failed = false
    , self = this;

  Socket.priorWebsocketSuccess = false;

  function onTransportOpen(){
    if (self.onlyBinaryUpgrades) {
      var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
      failed = failed || upgradeLosesBinary;
    }
    if (failed) return;

    debug('probe transport "%s" opened', name);
    transport.send([{ type: 'ping', data: 'probe' }]);
    transport.once('packet', function (msg) {
      if (failed) return;
      if ('pong' == msg.type && 'probe' == msg.data) {
        debug('probe transport "%s" pong', name);
        self.upgrading = true;
        self.emit('upgrading', transport);
        if (!transport) return;
        Socket.priorWebsocketSuccess = 'websocket' == transport.name;

        debug('pausing current transport "%s"', self.transport.name);
        self.transport.pause(function () {
          if (failed) return;
          if ('closed' == self.readyState) return;
          debug('changing transport and sending upgrade packet');

          cleanup();

          self.setTransport(transport);
          transport.send([{ type: 'upgrade' }]);
          self.emit('upgrade', transport);
          transport = null;
          self.upgrading = false;
          self.flush();
        });
      } else {
        debug('probe transport "%s" failed', name);
        var err = new Error('probe error');
        err.transport = transport.name;
        self.emit('upgradeError', err);
      }
    });
  }

  function freezeTransport() {
    if (failed) return;

    // Any callback called by transport should be ignored since now
    failed = true;

    cleanup();

    transport.close();
    transport = null;
  }

  //Handle any error that happens while probing
  function onerror(err) {
    var error = new Error('probe error: ' + err);
    error.transport = transport.name;

    freezeTransport();

    debug('probe transport "%s" failed because of error: %s', name, err);

    self.emit('upgradeError', error);
  }

  function onTransportClose(){
    onerror("transport closed");
  }

  //When the socket is closed while we're probing
  function onclose(){
    onerror("socket closed");
  }

  //When the socket is upgraded while we're probing
  function onupgrade(to){
    if (transport && to.name != transport.name) {
      debug('"%s" works - aborting "%s"', to.name, transport.name);
      freezeTransport();
    }
  }

  //Remove all listeners on the transport and on self
  function cleanup(){
    transport.removeListener('open', onTransportOpen);
    transport.removeListener('error', onerror);
    transport.removeListener('close', onTransportClose);
    self.removeListener('close', onclose);
    self.removeListener('upgrading', onupgrade);
  }

  transport.once('open', onTransportOpen);
  transport.once('error', onerror);
  transport.once('close', onTransportClose);

  this.once('close', onclose);
  this.once('upgrading', onupgrade);

  transport.open();

};

/**
 * Called when connection is deemed open.
 *
 * @api public
 */

Socket.prototype.onOpen = function () {
  debug('socket open');
  this.readyState = 'open';
  Socket.priorWebsocketSuccess = 'websocket' == this.transport.name;
  this.emit('open');
  this.flush();

  // we check for `readyState` in case an `open`
  // listener already closed the socket
  if ('open' == this.readyState && this.upgrade && this.transport.pause) {
    debug('starting upgrade probes');
    for (var i = 0, l = this.upgrades.length; i < l; i++) {
      this.probe(this.upgrades[i]);
    }
  }
};

/**
 * Handles a packet.
 *
 * @api private
 */

Socket.prototype.onPacket = function (packet) {
  if ('opening' == this.readyState || 'open' == this.readyState) {
    debug('socket receive: type "%s", data "%s"', packet.type, packet.data);

    this.emit('packet', packet);

    // Socket is live - any packet counts
    this.emit('heartbeat');

    switch (packet.type) {
      case 'open':
        this.onHandshake(parsejson(packet.data));
        break;

      case 'pong':
        this.setPing();
        break;

      case 'error':
        var err = new Error('server error');
        err.code = packet.data;
        this.emit('error', err);
        break;

      case 'message':
        this.emit('data', packet.data);
        this.emit('message', packet.data);
        break;
    }
  } else {
    debug('packet received with socket readyState "%s"', this.readyState);
  }
};

/**
 * Called upon handshake completion.
 *
 * @param {Object} handshake obj
 * @api private
 */

Socket.prototype.onHandshake = function (data) {
  this.emit('handshake', data);
  this.id = data.sid;
  this.transport.query.sid = data.sid;
  this.upgrades = this.filterUpgrades(data.upgrades);
  this.pingInterval = data.pingInterval;
  this.pingTimeout = data.pingTimeout;
  this.onOpen();
  // In case open handler closes socket
  if  ('closed' == this.readyState) return;
  this.setPing();

  // Prolong liveness of socket on heartbeat
  this.removeListener('heartbeat', this.onHeartbeat);
  this.on('heartbeat', this.onHeartbeat);
};

/**
 * Resets ping timeout.
 *
 * @api private
 */

Socket.prototype.onHeartbeat = function (timeout) {
  clearTimeout(this.pingTimeoutTimer);
  var self = this;
  self.pingTimeoutTimer = setTimeout(function () {
    if ('closed' == self.readyState) return;
    self.onClose('ping timeout');
  }, timeout || (self.pingInterval + self.pingTimeout));
};

/**
 * Pings server every `this.pingInterval` and expects response
 * within `this.pingTimeout` or closes connection.
 *
 * @api private
 */

Socket.prototype.setPing = function () {
  var self = this;
  clearTimeout(self.pingIntervalTimer);
  self.pingIntervalTimer = setTimeout(function () {
    debug('writing ping packet - expecting pong within %sms', self.pingTimeout);
    self.ping();
    self.onHeartbeat(self.pingTimeout);
  }, self.pingInterval);
};

/**
* Sends a ping packet.
*
* @api public
*/

Socket.prototype.ping = function () {
  this.sendPacket('ping');
};

/**
 * Called on `drain` event
 *
 * @api private
 */

Socket.prototype.onDrain = function() {
  for (var i = 0; i < this.prevBufferLen; i++) {
    if (this.callbackBuffer[i]) {
      this.callbackBuffer[i]();
    }
  }

  this.writeBuffer.splice(0, this.prevBufferLen);
  this.callbackBuffer.splice(0, this.prevBufferLen);

  // setting prevBufferLen = 0 is very important
  // for example, when upgrading, upgrade packet is sent over,
  // and a nonzero prevBufferLen could cause problems on `drain`
  this.prevBufferLen = 0;

  if (this.writeBuffer.length == 0) {
    this.emit('drain');
  } else {
    this.flush();
  }
};

/**
 * Flush write buffers.
 *
 * @api private
 */

Socket.prototype.flush = function () {
  if ('closed' != this.readyState && this.transport.writable &&
    !this.upgrading && this.writeBuffer.length) {
    debug('flushing %d packets in socket', this.writeBuffer.length);
    this.transport.send(this.writeBuffer);
    // keep track of current length of writeBuffer
    // splice writeBuffer and callbackBuffer on `drain`
    this.prevBufferLen = this.writeBuffer.length;
    this.emit('flush');
  }
};

/**
 * Sends a message.
 *
 * @param {String} message.
 * @param {Function} callback function.
 * @return {Socket} for chaining.
 * @api public
 */

Socket.prototype.write =
Socket.prototype.send = function (msg, fn) {
  this.sendPacket('message', msg, fn);
  return this;
};

/**
 * Sends a packet.
 *
 * @param {String} packet type.
 * @param {String} data.
 * @param {Function} callback function.
 * @api private
 */

Socket.prototype.sendPacket = function (type, data, fn) {
  if ('closing' == this.readyState || 'closed' == this.readyState) {
    return;
  }

  var packet = { type: type, data: data };
  this.emit('packetCreate', packet);
  this.writeBuffer.push(packet);
  this.callbackBuffer.push(fn);
  this.flush();
};

/**
 * Closes the connection.
 *
 * @api private
 */

Socket.prototype.close = function () {
  if ('opening' == this.readyState || 'open' == this.readyState) {
    this.readyState = 'closing';

    var self = this;

    function close() {
      self.onClose('forced close');
      debug('socket closing - telling transport to close');
      self.transport.close();
    }

    function cleanupAndClose() {
      self.removeListener('upgrade', cleanupAndClose);
      self.removeListener('upgradeError', cleanupAndClose);
      close();
    }

    function waitForUpgrade() {
      // wait for upgrade to finish since we can't send packets while pausing a transport
      self.once('upgrade', cleanupAndClose);
      self.once('upgradeError', cleanupAndClose);
    }

    if (this.writeBuffer.length) {
      this.once('drain', function() {
        if (this.upgrading) {
          waitForUpgrade();
        } else {
          close();
        }
      });
    } else if (this.upgrading) {
      waitForUpgrade();
    } else {
      close();
    }
  }

  return this;
};

/**
 * Called upon transport error
 *
 * @api private
 */

Socket.prototype.onError = function (err) {
  debug('socket error %j', err);
  Socket.priorWebsocketSuccess = false;
  this.emit('error', err);
  this.onClose('transport error', err);
};

/**
 * Called upon transport close.
 *
 * @api private
 */

Socket.prototype.onClose = function (reason, desc) {
  if ('opening' == this.readyState || 'open' == this.readyState || 'closing' == this.readyState) {
    debug('socket close with reason: "%s"', reason);
    var self = this;

    // clear timers
    clearTimeout(this.pingIntervalTimer);
    clearTimeout(this.pingTimeoutTimer);

    // clean buffers in next tick, so developers can still
    // grab the buffers on `close` event
    setTimeout(function() {
      self.writeBuffer = [];
      self.callbackBuffer = [];
      self.prevBufferLen = 0;
    }, 0);

    // stop event from firing again for transport
    this.transport.removeAllListeners('close');

    // ensure transport won't stay open
    this.transport.close();

    // ignore further transport communication
    this.transport.removeAllListeners();

    // set ready state
    this.readyState = 'closed';

    // clear session id
    this.id = null;

    // emit close event
    this.emit('close', reason, desc);
  }
};

/**
 * Filters upgrades, returning only those matching client transports.
 *
 * @param {Array} server upgrades
 * @api private
 *
 */

Socket.prototype.filterUpgrades = function (upgrades) {
  var filteredUpgrades = [];
  for (var i = 0, j = upgrades.length; i<j; i++) {
    if (~index(this.transports, upgrades[i])) filteredUpgrades.push(upgrades[i]);
  }
  return filteredUpgrades;
};

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./transport":14,"./transports":15,"component-emitter":9,"debug":22,"engine.io-parser":25,"indexof":42,"parsejson":34,"parseqs":35,"parseuri":36}],14:[function(_dereq_,module,exports){
/**
 * Module dependencies.
 */

var parser = _dereq_('engine.io-parser');
var Emitter = _dereq_('component-emitter');

/**
 * Module exports.
 */

module.exports = Transport;

/**
 * Transport abstract constructor.
 *
 * @param {Object} options.
 * @api private
 */

function Transport (opts) {
  this.path = opts.path;
  this.hostname = opts.hostname;
  this.port = opts.port;
  this.secure = opts.secure;
  this.query = opts.query;
  this.timestampParam = opts.timestampParam;
  this.timestampRequests = opts.timestampRequests;
  this.readyState = '';
  this.agent = opts.agent || false;
  this.socket = opts.socket;
  this.enablesXDR = opts.enablesXDR;

  // SSL options for Node.js client
  this.pfx = opts.pfx;
  this.key = opts.key;
  this.passphrase = opts.passphrase;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.ciphers = opts.ciphers;
  this.rejectUnauthorized = opts.rejectUnauthorized;
}

/**
 * Mix in `Emitter`.
 */

Emitter(Transport.prototype);

/**
 * A counter used to prevent collisions in the timestamps used
 * for cache busting.
 */

Transport.timestamps = 0;

/**
 * Emits an error.
 *
 * @param {String} str
 * @return {Transport} for chaining
 * @api public
 */

Transport.prototype.onError = function (msg, desc) {
  var err = new Error(msg);
  err.type = 'TransportError';
  err.description = desc;
  this.emit('error', err);
  return this;
};

/**
 * Opens the transport.
 *
 * @api public
 */

Transport.prototype.open = function () {
  if ('closed' == this.readyState || '' == this.readyState) {
    this.readyState = 'opening';
    this.doOpen();
  }

  return this;
};

/**
 * Closes the transport.
 *
 * @api private
 */

Transport.prototype.close = function () {
  if ('opening' == this.readyState || 'open' == this.readyState) {
    this.doClose();
    this.onClose();
  }

  return this;
};

/**
 * Sends multiple packets.
 *
 * @param {Array} packets
 * @api private
 */

Transport.prototype.send = function(packets){
  if ('open' == this.readyState) {
    this.write(packets);
  } else {
    throw new Error('Transport not open');
  }
};

/**
 * Called upon open
 *
 * @api private
 */

Transport.prototype.onOpen = function () {
  this.readyState = 'open';
  this.writable = true;
  this.emit('open');
};

/**
 * Called with data.
 *
 * @param {String} data
 * @api private
 */

Transport.prototype.onData = function(data){
  var packet = parser.decodePacket(data, this.socket.binaryType);
  this.onPacket(packet);
};

/**
 * Called with a decoded packet.
 */

Transport.prototype.onPacket = function (packet) {
  this.emit('packet', packet);
};

/**
 * Called upon close.
 *
 * @api private
 */

Transport.prototype.onClose = function () {
  this.readyState = 'closed';
  this.emit('close');
};

},{"component-emitter":9,"engine.io-parser":25}],15:[function(_dereq_,module,exports){
(function (global){
/**
 * Module dependencies
 */

var XMLHttpRequest = _dereq_('xmlhttprequest');
var XHR = _dereq_('./polling-xhr');
var JSONP = _dereq_('./polling-jsonp');
var websocket = _dereq_('./websocket');

/**
 * Export transports.
 */

exports.polling = polling;
exports.websocket = websocket;

/**
 * Polling transport polymorphic constructor.
 * Decides on xhr vs jsonp based on feature detection.
 *
 * @api private
 */

function polling(opts){
  var xhr;
  var xd = false;
  var xs = false;
  var jsonp = false !== opts.jsonp;

  if (global.location) {
    var isSSL = 'https:' == location.protocol;
    var port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    xd = opts.hostname != location.hostname || port != opts.port;
    xs = opts.secure != isSSL;
  }

  opts.xdomain = xd;
  opts.xscheme = xs;
  xhr = new XMLHttpRequest(opts);

  if ('open' in xhr && !opts.forceJSONP) {
    return new XHR(opts);
  } else {
    if (!jsonp) throw new Error('JSONP disabled');
    return new JSONP(opts);
  }
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./polling-jsonp":16,"./polling-xhr":17,"./websocket":19,"xmlhttprequest":20}],16:[function(_dereq_,module,exports){
(function (global){

/**
 * Module requirements.
 */

var Polling = _dereq_('./polling');
var inherit = _dereq_('component-inherit');

/**
 * Module exports.
 */

module.exports = JSONPPolling;

/**
 * Cached regular expressions.
 */

var rNewline = /\n/g;
var rEscapedNewline = /\\n/g;

/**
 * Global JSONP callbacks.
 */

var callbacks;

/**
 * Callbacks count.
 */

var index = 0;

/**
 * Noop.
 */

function empty () { }

/**
 * JSONP Polling constructor.
 *
 * @param {Object} opts.
 * @api public
 */

function JSONPPolling (opts) {
  Polling.call(this, opts);

  this.query = this.query || {};

  // define global callbacks array if not present
  // we do this here (lazily) to avoid unneeded global pollution
  if (!callbacks) {
    // we need to consider multiple engines in the same page
    if (!global.___eio) global.___eio = [];
    callbacks = global.___eio;
  }

  // callback identifier
  this.index = callbacks.length;

  // add callback to jsonp global
  var self = this;
  callbacks.push(function (msg) {
    self.onData(msg);
  });

  // append to query string
  this.query.j = this.index;

  // prevent spurious errors from being emitted when the window is unloaded
  if (global.document && global.addEventListener) {
    global.addEventListener('beforeunload', function () {
      if (self.script) self.script.onerror = empty;
    }, false);
  }
}

/**
 * Inherits from Polling.
 */

inherit(JSONPPolling, Polling);

/*
 * JSONP only supports binary as base64 encoded strings
 */

JSONPPolling.prototype.supportsBinary = false;

/**
 * Closes the socket.
 *
 * @api private
 */

JSONPPolling.prototype.doClose = function () {
  if (this.script) {
    this.script.parentNode.removeChild(this.script);
    this.script = null;
  }

  if (this.form) {
    this.form.parentNode.removeChild(this.form);
    this.form = null;
    this.iframe = null;
  }

  Polling.prototype.doClose.call(this);
};

/**
 * Starts a poll cycle.
 *
 * @api private
 */

JSONPPolling.prototype.doPoll = function () {
  var self = this;
  var script = document.createElement('script');

  if (this.script) {
    this.script.parentNode.removeChild(this.script);
    this.script = null;
  }

  script.async = true;
  script.src = this.uri();
  script.onerror = function(e){
    self.onError('jsonp poll error',e);
  };

  var insertAt = document.getElementsByTagName('script')[0];
  insertAt.parentNode.insertBefore(script, insertAt);
  this.script = script;

  var isUAgecko = 'undefined' != typeof navigator && /gecko/i.test(navigator.userAgent);
  
  if (isUAgecko) {
    setTimeout(function () {
      var iframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      document.body.removeChild(iframe);
    }, 100);
  }
};

/**
 * Writes with a hidden iframe.
 *
 * @param {String} data to send
 * @param {Function} called upon flush.
 * @api private
 */

JSONPPolling.prototype.doWrite = function (data, fn) {
  var self = this;

  if (!this.form) {
    var form = document.createElement('form');
    var area = document.createElement('textarea');
    var id = this.iframeId = 'eio_iframe_' + this.index;
    var iframe;

    form.className = 'socketio';
    form.style.position = 'absolute';
    form.style.top = '-1000px';
    form.style.left = '-1000px';
    form.target = id;
    form.method = 'POST';
    form.setAttribute('accept-charset', 'utf-8');
    area.name = 'd';
    form.appendChild(area);
    document.body.appendChild(form);

    this.form = form;
    this.area = area;
  }

  this.form.action = this.uri();

  function complete () {
    initIframe();
    fn();
  }

  function initIframe () {
    if (self.iframe) {
      try {
        self.form.removeChild(self.iframe);
      } catch (e) {
        self.onError('jsonp polling iframe removal error', e);
      }
    }

    try {
      // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
      var html = '<iframe src="javascript:0" name="'+ self.iframeId +'">';
      iframe = document.createElement(html);
    } catch (e) {
      iframe = document.createElement('iframe');
      iframe.name = self.iframeId;
      iframe.src = 'javascript:0';
    }

    iframe.id = self.iframeId;

    self.form.appendChild(iframe);
    self.iframe = iframe;
  }

  initIframe();

  // escape \n to prevent it from being converted into \r\n by some UAs
  // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
  data = data.replace(rEscapedNewline, '\\\n');
  this.area.value = data.replace(rNewline, '\\n');

  try {
    this.form.submit();
  } catch(e) {}

  if (this.iframe.attachEvent) {
    this.iframe.onreadystatechange = function(){
      if (self.iframe.readyState == 'complete') {
        complete();
      }
    };
  } else {
    this.iframe.onload = complete;
  }
};

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./polling":18,"component-inherit":21}],17:[function(_dereq_,module,exports){
(function (global){
/**
 * Module requirements.
 */

var XMLHttpRequest = _dereq_('xmlhttprequest');
var Polling = _dereq_('./polling');
var Emitter = _dereq_('component-emitter');
var inherit = _dereq_('component-inherit');
var debug = _dereq_('debug')('engine.io-client:polling-xhr');

/**
 * Module exports.
 */

module.exports = XHR;
module.exports.Request = Request;

/**
 * Empty function
 */

function empty(){}

/**
 * XHR Polling constructor.
 *
 * @param {Object} opts
 * @api public
 */

function XHR(opts){
  Polling.call(this, opts);

  if (global.location) {
    var isSSL = 'https:' == location.protocol;
    var port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    this.xd = opts.hostname != global.location.hostname ||
      port != opts.port;
    this.xs = opts.secure != isSSL;
  }
}

/**
 * Inherits from Polling.
 */

inherit(XHR, Polling);

/**
 * XHR supports binary
 */

XHR.prototype.supportsBinary = true;

/**
 * Creates a request.
 *
 * @param {String} method
 * @api private
 */

XHR.prototype.request = function(opts){
  opts = opts || {};
  opts.uri = this.uri();
  opts.xd = this.xd;
  opts.xs = this.xs;
  opts.agent = this.agent || false;
  opts.supportsBinary = this.supportsBinary;
  opts.enablesXDR = this.enablesXDR;

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;

  return new Request(opts);
};

/**
 * Sends data.
 *
 * @param {String} data to send.
 * @param {Function} called upon flush.
 * @api private
 */

XHR.prototype.doWrite = function(data, fn){
  var isBinary = typeof data !== 'string' && data !== undefined;
  var req = this.request({ method: 'POST', data: data, isBinary: isBinary });
  var self = this;
  req.on('success', fn);
  req.on('error', function(err){
    self.onError('xhr post error', err);
  });
  this.sendXhr = req;
};

/**
 * Starts a poll cycle.
 *
 * @api private
 */

XHR.prototype.doPoll = function(){
  debug('xhr poll');
  var req = this.request();
  var self = this;
  req.on('data', function(data){
    self.onData(data);
  });
  req.on('error', function(err){
    self.onError('xhr poll error', err);
  });
  this.pollXhr = req;
};

/**
 * Request constructor
 *
 * @param {Object} options
 * @api public
 */

function Request(opts){
  this.method = opts.method || 'GET';
  this.uri = opts.uri;
  this.xd = !!opts.xd;
  this.xs = !!opts.xs;
  this.async = false !== opts.async;
  this.data = undefined != opts.data ? opts.data : null;
  this.agent = opts.agent;
  this.isBinary = opts.isBinary;
  this.supportsBinary = opts.supportsBinary;
  this.enablesXDR = opts.enablesXDR;

  // SSL options for Node.js client
  this.pfx = opts.pfx;
  this.key = opts.key;
  this.passphrase = opts.passphrase;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.ciphers = opts.ciphers;
  this.rejectUnauthorized = opts.rejectUnauthorized;

  this.create();
}

/**
 * Mix in `Emitter`.
 */

Emitter(Request.prototype);

/**
 * Creates the XHR object and sends the request.
 *
 * @api private
 */

Request.prototype.create = function(){
  var opts = { agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR };

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;

  var xhr = this.xhr = new XMLHttpRequest(opts);
  var self = this;

  try {
    debug('xhr open %s: %s', this.method, this.uri);
    xhr.open(this.method, this.uri, this.async);
    if (this.supportsBinary) {
      // This has to be done after open because Firefox is stupid
      // http://stackoverflow.com/questions/13216903/get-binary-data-with-xmlhttprequest-in-a-firefox-extension
      xhr.responseType = 'arraybuffer';
    }

    if ('POST' == this.method) {
      try {
        if (this.isBinary) {
          xhr.setRequestHeader('Content-type', 'application/octet-stream');
        } else {
          xhr.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
        }
      } catch (e) {}
    }

    // ie6 check
    if ('withCredentials' in xhr) {
      xhr.withCredentials = true;
    }

    if (this.hasXDR()) {
      xhr.onload = function(){
        self.onLoad();
      };
      xhr.onerror = function(){
        self.onError(xhr.responseText);
      };
    } else {
      xhr.onreadystatechange = function(){
        if (4 != xhr.readyState) return;
        if (200 == xhr.status || 1223 == xhr.status) {
          self.onLoad();
        } else {
          // make sure the `error` event handler that's user-set
          // does not throw in the same tick and gets caught here
          setTimeout(function(){
            self.onError(xhr.status);
          }, 0);
        }
      };
    }

    debug('xhr data %s', this.data);
    xhr.send(this.data);
  } catch (e) {
    // Need to defer since .create() is called directly fhrom the constructor
    // and thus the 'error' event can only be only bound *after* this exception
    // occurs.  Therefore, also, we cannot throw here at all.
    setTimeout(function() {
      self.onError(e);
    }, 0);
    return;
  }

  if (global.document) {
    this.index = Request.requestsCount++;
    Request.requests[this.index] = this;
  }
};

/**
 * Called upon successful response.
 *
 * @api private
 */

Request.prototype.onSuccess = function(){
  this.emit('success');
  this.cleanup();
};

/**
 * Called if we have data.
 *
 * @api private
 */

Request.prototype.onData = function(data){
  this.emit('data', data);
  this.onSuccess();
};

/**
 * Called upon error.
 *
 * @api private
 */

Request.prototype.onError = function(err){
  this.emit('error', err);
  this.cleanup(true);
};

/**
 * Cleans up house.
 *
 * @api private
 */

Request.prototype.cleanup = function(fromError){
  if ('undefined' == typeof this.xhr || null === this.xhr) {
    return;
  }
  // xmlhttprequest
  if (this.hasXDR()) {
    this.xhr.onload = this.xhr.onerror = empty;
  } else {
    this.xhr.onreadystatechange = empty;
  }

  if (fromError) {
    try {
      this.xhr.abort();
    } catch(e) {}
  }

  if (global.document) {
    delete Request.requests[this.index];
  }

  this.xhr = null;
};

/**
 * Called upon load.
 *
 * @api private
 */

Request.prototype.onLoad = function(){
  var data;
  try {
    var contentType;
    try {
      contentType = this.xhr.getResponseHeader('Content-Type').split(';')[0];
    } catch (e) {}
    if (contentType === 'application/octet-stream') {
      data = this.xhr.response;
    } else {
      if (!this.supportsBinary) {
        data = this.xhr.responseText;
      } else {
        data = 'ok';
      }
    }
  } catch (e) {
    this.onError(e);
  }
  if (null != data) {
    this.onData(data);
  }
};

/**
 * Check if it has XDomainRequest.
 *
 * @api private
 */

Request.prototype.hasXDR = function(){
  return 'undefined' !== typeof global.XDomainRequest && !this.xs && this.enablesXDR;
};

/**
 * Aborts the request.
 *
 * @api public
 */

Request.prototype.abort = function(){
  this.cleanup();
};

/**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */

if (global.document) {
  Request.requestsCount = 0;
  Request.requests = {};
  if (global.attachEvent) {
    global.attachEvent('onunload', unloadHandler);
  } else if (global.addEventListener) {
    global.addEventListener('beforeunload', unloadHandler, false);
  }
}

function unloadHandler() {
  for (var i in Request.requests) {
    if (Request.requests.hasOwnProperty(i)) {
      Request.requests[i].abort();
    }
  }
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./polling":18,"component-emitter":9,"component-inherit":21,"debug":22,"xmlhttprequest":20}],18:[function(_dereq_,module,exports){
/**
 * Module dependencies.
 */

var Transport = _dereq_('../transport');
var parseqs = _dereq_('parseqs');
var parser = _dereq_('engine.io-parser');
var inherit = _dereq_('component-inherit');
var debug = _dereq_('debug')('engine.io-client:polling');

/**
 * Module exports.
 */

module.exports = Polling;

/**
 * Is XHR2 supported?
 */

var hasXHR2 = (function() {
  var XMLHttpRequest = _dereq_('xmlhttprequest');
  var xhr = new XMLHttpRequest({ xdomain: false });
  return null != xhr.responseType;
})();

/**
 * Polling interface.
 *
 * @param {Object} opts
 * @api private
 */

function Polling(opts){
  var forceBase64 = (opts && opts.forceBase64);
  if (!hasXHR2 || forceBase64) {
    this.supportsBinary = false;
  }
  Transport.call(this, opts);
}

/**
 * Inherits from Transport.
 */

inherit(Polling, Transport);

/**
 * Transport name.
 */

Polling.prototype.name = 'polling';

/**
 * Opens the socket (triggers polling). We write a PING message to determine
 * when the transport is open.
 *
 * @api private
 */

Polling.prototype.doOpen = function(){
  this.poll();
};

/**
 * Pauses polling.
 *
 * @param {Function} callback upon buffers are flushed and transport is paused
 * @api private
 */

Polling.prototype.pause = function(onPause){
  var pending = 0;
  var self = this;

  this.readyState = 'pausing';

  function pause(){
    debug('paused');
    self.readyState = 'paused';
    onPause();
  }

  if (this.polling || !this.writable) {
    var total = 0;

    if (this.polling) {
      debug('we are currently polling - waiting to pause');
      total++;
      this.once('pollComplete', function(){
        debug('pre-pause polling complete');
        --total || pause();
      });
    }

    if (!this.writable) {
      debug('we are currently writing - waiting to pause');
      total++;
      this.once('drain', function(){
        debug('pre-pause writing complete');
        --total || pause();
      });
    }
  } else {
    pause();
  }
};

/**
 * Starts polling cycle.
 *
 * @api public
 */

Polling.prototype.poll = function(){
  debug('polling');
  this.polling = true;
  this.doPoll();
  this.emit('poll');
};

/**
 * Overloads onData to detect payloads.
 *
 * @api private
 */

Polling.prototype.onData = function(data){
  var self = this;
  debug('polling got data %s', data);
  var callback = function(packet, index, total) {
    // if its the first message we consider the transport open
    if ('opening' == self.readyState) {
      self.onOpen();
    }

    // if its a close packet, we close the ongoing requests
    if ('close' == packet.type) {
      self.onClose();
      return false;
    }

    // otherwise bypass onData and handle the message
    self.onPacket(packet);
  };

  // decode payload
  parser.decodePayload(data, this.socket.binaryType, callback);

  // if an event did not trigger closing
  if ('closed' != this.readyState) {
    // if we got data we're not polling
    this.polling = false;
    this.emit('pollComplete');

    if ('open' == this.readyState) {
      this.poll();
    } else {
      debug('ignoring poll - transport state "%s"', this.readyState);
    }
  }
};

/**
 * For polling, send a close packet.
 *
 * @api private
 */

Polling.prototype.doClose = function(){
  var self = this;

  function close(){
    debug('writing close packet');
    self.write([{ type: 'close' }]);
  }

  if ('open' == this.readyState) {
    debug('transport open - closing');
    close();
  } else {
    // in case we're trying to close while
    // handshaking is in progress (GH-164)
    debug('transport not open - deferring close');
    this.once('open', close);
  }
};

/**
 * Writes a packets payload.
 *
 * @param {Array} data packets
 * @param {Function} drain callback
 * @api private
 */

Polling.prototype.write = function(packets){
  var self = this;
  this.writable = false;
  var callbackfn = function() {
    self.writable = true;
    self.emit('drain');
  };

  var self = this;
  parser.encodePayload(packets, this.supportsBinary, function(data) {
    self.doWrite(data, callbackfn);
  });
};

/**
 * Generates uri for connection.
 *
 * @api private
 */

Polling.prototype.uri = function(){
  var query = this.query || {};
  var schema = this.secure ? 'https' : 'http';
  var port = '';

  // cache busting is forced
  if (false !== this.timestampRequests) {
    query[this.timestampParam] = +new Date + '-' + Transport.timestamps++;
  }

  if (!this.supportsBinary && !query.sid) {
    query.b64 = 1;
  }

  query = parseqs.encode(query);

  // avoid port if default for schema
  if (this.port && (('https' == schema && this.port != 443) ||
     ('http' == schema && this.port != 80))) {
    port = ':' + this.port;
  }

  // prepend ? to query
  if (query.length) {
    query = '?' + query;
  }

  return schema + '://' + this.hostname + port + this.path + query;
};

},{"../transport":14,"component-inherit":21,"debug":22,"engine.io-parser":25,"parseqs":35,"xmlhttprequest":20}],19:[function(_dereq_,module,exports){
/**
 * Module dependencies.
 */

var Transport = _dereq_('../transport');
var parser = _dereq_('engine.io-parser');
var parseqs = _dereq_('parseqs');
var inherit = _dereq_('component-inherit');
var debug = _dereq_('debug')('engine.io-client:websocket');

/**
 * `ws` exposes a WebSocket-compatible interface in
 * Node, or the `WebSocket` or `MozWebSocket` globals
 * in the browser.
 */

var WebSocket = _dereq_('ws');

/**
 * Module exports.
 */

module.exports = WS;

/**
 * WebSocket transport constructor.
 *
 * @api {Object} connection options
 * @api public
 */

function WS(opts){
  var forceBase64 = (opts && opts.forceBase64);
  if (forceBase64) {
    this.supportsBinary = false;
  }
  Transport.call(this, opts);
}

/**
 * Inherits from Transport.
 */

inherit(WS, Transport);

/**
 * Transport name.
 *
 * @api public
 */

WS.prototype.name = 'websocket';

/*
 * WebSockets support binary
 */

WS.prototype.supportsBinary = true;

/**
 * Opens socket.
 *
 * @api private
 */

WS.prototype.doOpen = function(){
  if (!this.check()) {
    // let probe timeout
    return;
  }

  var self = this;
  var uri = this.uri();
  var protocols = void(0);
  var opts = { agent: this.agent };

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;

  this.ws = new WebSocket(uri, protocols, opts);

  if (this.ws.binaryType === undefined) {
    this.supportsBinary = false;
  }

  this.ws.binaryType = 'arraybuffer';
  this.addEventListeners();
};

/**
 * Adds event listeners to the socket
 *
 * @api private
 */

WS.prototype.addEventListeners = function(){
  var self = this;

  this.ws.onopen = function(){
    self.onOpen();
  };
  this.ws.onclose = function(){
    self.onClose();
  };
  this.ws.onmessage = function(ev){
    self.onData(ev.data);
  };
  this.ws.onerror = function(e){
    self.onError('websocket error', e);
  };
};

/**
 * Override `onData` to use a timer on iOS.
 * See: https://gist.github.com/mloughran/2052006
 *
 * @api private
 */

if ('undefined' != typeof navigator
  && /iPad|iPhone|iPod/i.test(navigator.userAgent)) {
  WS.prototype.onData = function(data){
    var self = this;
    setTimeout(function(){
      Transport.prototype.onData.call(self, data);
    }, 0);
  };
}

/**
 * Writes data to socket.
 *
 * @param {Array} array of packets.
 * @api private
 */

WS.prototype.write = function(packets){
  var self = this;
  this.writable = false;
  // encodePacket efficient as it uses WS framing
  // no need for encodePayload
  for (var i = 0, l = packets.length; i < l; i++) {
    parser.encodePacket(packets[i], this.supportsBinary, function(data) {
      //Sometimes the websocket has already been closed but the browser didn't
      //have a chance of informing us about it yet, in that case send will
      //throw an error
      try {
        self.ws.send(data);
      } catch (e){
        debug('websocket closed before onclose event');
      }
    });
  }

  function ondrain() {
    self.writable = true;
    self.emit('drain');
  }
  // fake drain
  // defer to next tick to allow Socket to clear writeBuffer
  setTimeout(ondrain, 0);
};

/**
 * Called upon close
 *
 * @api private
 */

WS.prototype.onClose = function(){
  Transport.prototype.onClose.call(this);
};

/**
 * Closes socket.
 *
 * @api private
 */

WS.prototype.doClose = function(){
  if (typeof this.ws !== 'undefined') {
    this.ws.close();
  }
};

/**
 * Generates uri for connection.
 *
 * @api private
 */

WS.prototype.uri = function(){
  var query = this.query || {};
  var schema = this.secure ? 'wss' : 'ws';
  var port = '';

  // avoid port if default for schema
  if (this.port && (('wss' == schema && this.port != 443)
    || ('ws' == schema && this.port != 80))) {
    port = ':' + this.port;
  }

  // append timestamp to URI
  if (this.timestampRequests) {
    query[this.timestampParam] = +new Date;
  }

  // communicate binary support capabilities
  if (!this.supportsBinary) {
    query.b64 = 1;
  }

  query = parseqs.encode(query);

  // prepend ? to query
  if (query.length) {
    query = '?' + query;
  }

  return schema + '://' + this.hostname + port + this.path + query;
};

/**
 * Feature detection for WebSocket.
 *
 * @return {Boolean} whether this transport is available.
 * @api public
 */

WS.prototype.check = function(){
  return !!WebSocket && !('__initialize' in WebSocket && this.name === WS.prototype.name);
};

},{"../transport":14,"component-inherit":21,"debug":22,"engine.io-parser":25,"parseqs":35,"ws":37}],20:[function(_dereq_,module,exports){
// browser shim for xmlhttprequest module
var hasCORS = _dereq_('has-cors');

module.exports = function(opts) {
  var xdomain = opts.xdomain;

  // scheme must be same when usign XDomainRequest
  // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
  var xscheme = opts.xscheme;

  // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
  // https://github.com/Automattic/engine.io-client/pull/217
  var enablesXDR = opts.enablesXDR;

  // XMLHttpRequest can be disabled on IE
  try {
    if ('undefined' != typeof XMLHttpRequest && (!xdomain || hasCORS)) {
      return new XMLHttpRequest();
    }
  } catch (e) { }

  // Use XDomainRequest for IE8 if enablesXDR is true
  // because loading bar keeps flashing when using jsonp-polling
  // https://github.com/yujiosaka/socke.io-ie8-loading-example
  try {
    if ('undefined' != typeof XDomainRequest && !xscheme && enablesXDR) {
      return new XDomainRequest();
    }
  } catch (e) { }

  if (!xdomain) {
    try {
      return new ActiveXObject('Microsoft.XMLHTTP');
    } catch(e) { }
  }
}

},{"has-cors":40}],21:[function(_dereq_,module,exports){

module.exports = function(a, b){
  var fn = function(){};
  fn.prototype = b.prototype;
  a.prototype = new fn;
  a.prototype.constructor = a;
};
},{}],22:[function(_dereq_,module,exports){

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = _dereq_('./debug');
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // is webkit? http://stackoverflow.com/a/16459606/376773
  return ('WebkitAppearance' in document.documentElement.style) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (window.console && (console.firebug || (console.exception && console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  return JSON.stringify(v);
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs() {
  var args = arguments;
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return args;

  var c = 'color: ' + this.color;
  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-z%]/g, function(match) {
    if ('%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
  return args;
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // This hackery is required for IE8,
  // where the `console.log` function doesn't have 'apply'
  return 'object' == typeof console
    && 'function' == typeof console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      localStorage.removeItem('debug');
    } else {
      localStorage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = localStorage.debug;
  } catch(e) {}
  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

},{"./debug":23}],23:[function(_dereq_,module,exports){

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = debug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = _dereq_('ms');

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lowercased letter, i.e. "n".
 */

exports.formatters = {};

/**
 * Previously assigned color.
 */

var prevColor = 0;

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 *
 * @return {Number}
 * @api private
 */

function selectColor() {
  return exports.colors[prevColor++ % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function debug(namespace) {

  // define the `disabled` version
  function disabled() {
  }
  disabled.enabled = false;

  // define the `enabled` version
  function enabled() {

    var self = enabled;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // add the `color` if not set
    if (null == self.useColors) self.useColors = exports.useColors();
    if (null == self.color && self.useColors) self.color = selectColor();

    var args = Array.prototype.slice.call(arguments);

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %o
      args = ['%o'].concat(args);
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    if ('function' === typeof exports.formatArgs) {
      args = exports.formatArgs.apply(self, args);
    }
    var logFn = enabled.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }
  enabled.enabled = true;

  var fn = exports.enabled(namespace) ? enabled : disabled;

  fn.namespace = namespace;

  return fn;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  var split = (namespaces || '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

},{"ms":24}],24:[function(_dereq_,module,exports){
/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} options
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options){
  options = options || {};
  if ('string' == typeof val) return parse(val);
  return options.long
    ? long(val)
    : short(val);
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  var match = /^((?:\d+)?\.?\d+) *(ms|seconds?|s|minutes?|m|hours?|h|days?|d|years?|y)?$/i.exec(str);
  if (!match) return;
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 's':
      return n * s;
    case 'ms':
      return n;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function short(ms) {
  if (ms >= d) return Math.round(ms / d) + 'd';
  if (ms >= h) return Math.round(ms / h) + 'h';
  if (ms >= m) return Math.round(ms / m) + 'm';
  if (ms >= s) return Math.round(ms / s) + 's';
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function long(ms) {
  return plural(ms, d, 'day')
    || plural(ms, h, 'hour')
    || plural(ms, m, 'minute')
    || plural(ms, s, 'second')
    || ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) return;
  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
  return Math.ceil(ms / n) + ' ' + name + 's';
}

},{}],25:[function(_dereq_,module,exports){
(function (global){
/**
 * Module dependencies.
 */

var keys = _dereq_('./keys');
var hasBinary = _dereq_('has-binary');
var sliceBuffer = _dereq_('arraybuffer.slice');
var base64encoder = _dereq_('base64-arraybuffer');
var after = _dereq_('after');
var utf8 = _dereq_('utf8');

/**
 * Check if we are running an android browser. That requires us to use
 * ArrayBuffer with polling transports...
 *
 * http://ghinda.net/jpeg-blob-ajax-android/
 */

var isAndroid = navigator.userAgent.match(/Android/i);

/**
 * Check if we are running in PhantomJS.
 * Uploading a Blob with PhantomJS does not work correctly, as reported here:
 * https://github.com/ariya/phantomjs/issues/11395
 * @type boolean
 */
var isPhantomJS = /PhantomJS/i.test(navigator.userAgent);

/**
 * When true, avoids using Blobs to encode payloads.
 * @type boolean
 */
var dontSendBlobs = isAndroid || isPhantomJS;

/**
 * Current protocol version.
 */

exports.protocol = 3;

/**
 * Packet types.
 */

var packets = exports.packets = {
    open:     0    // non-ws
  , close:    1    // non-ws
  , ping:     2
  , pong:     3
  , message:  4
  , upgrade:  5
  , noop:     6
};

var packetslist = keys(packets);

/**
 * Premade error packet.
 */

var err = { type: 'error', data: 'parser error' };

/**
 * Create a blob api even for blob builder when vendor prefixes exist
 */

var Blob = _dereq_('blob');

/**
 * Encodes a packet.
 *
 *     <packet type id> [ <data> ]
 *
 * Example:
 *
 *     5hello world
 *     3
 *     4
 *
 * Binary is encoded in an identical principle
 *
 * @api private
 */

exports.encodePacket = function (packet, supportsBinary, utf8encode, callback) {
  if ('function' == typeof supportsBinary) {
    callback = supportsBinary;
    supportsBinary = false;
  }

  if ('function' == typeof utf8encode) {
    callback = utf8encode;
    utf8encode = null;
  }

  var data = (packet.data === undefined)
    ? undefined
    : packet.data.buffer || packet.data;

  if (global.ArrayBuffer && data instanceof ArrayBuffer) {
    return encodeArrayBuffer(packet, supportsBinary, callback);
  } else if (Blob && data instanceof global.Blob) {
    return encodeBlob(packet, supportsBinary, callback);
  }

  // might be an object with { base64: true, data: dataAsBase64String }
  if (data && data.base64) {
    return encodeBase64Object(packet, callback);
  }

  // Sending data as a utf-8 string
  var encoded = packets[packet.type];

  // data fragment is optional
  if (undefined !== packet.data) {
    encoded += utf8encode ? utf8.encode(String(packet.data)) : String(packet.data);
  }

  return callback('' + encoded);

};

function encodeBase64Object(packet, callback) {
  // packet data is an object { base64: true, data: dataAsBase64String }
  var message = 'b' + exports.packets[packet.type] + packet.data.data;
  return callback(message);
}

/**
 * Encode packet helpers for binary types
 */

function encodeArrayBuffer(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  var data = packet.data;
  var contentArray = new Uint8Array(data);
  var resultBuffer = new Uint8Array(1 + data.byteLength);

  resultBuffer[0] = packets[packet.type];
  for (var i = 0; i < contentArray.length; i++) {
    resultBuffer[i+1] = contentArray[i];
  }

  return callback(resultBuffer.buffer);
}

function encodeBlobAsArrayBuffer(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  var fr = new FileReader();
  fr.onload = function() {
    packet.data = fr.result;
    exports.encodePacket(packet, supportsBinary, true, callback);
  };
  return fr.readAsArrayBuffer(packet.data);
}

function encodeBlob(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  if (dontSendBlobs) {
    return encodeBlobAsArrayBuffer(packet, supportsBinary, callback);
  }

  var length = new Uint8Array(1);
  length[0] = packets[packet.type];
  var blob = new Blob([length.buffer, packet.data]);

  return callback(blob);
}

/**
 * Encodes a packet with binary data in a base64 string
 *
 * @param {Object} packet, has `type` and `data`
 * @return {String} base64 encoded message
 */

exports.encodeBase64Packet = function(packet, callback) {
  var message = 'b' + exports.packets[packet.type];
  if (Blob && packet.data instanceof Blob) {
    var fr = new FileReader();
    fr.onload = function() {
      var b64 = fr.result.split(',')[1];
      callback(message + b64);
    };
    return fr.readAsDataURL(packet.data);
  }

  var b64data;
  try {
    b64data = String.fromCharCode.apply(null, new Uint8Array(packet.data));
  } catch (e) {
    // iPhone Safari doesn't let you apply with typed arrays
    var typed = new Uint8Array(packet.data);
    var basic = new Array(typed.length);
    for (var i = 0; i < typed.length; i++) {
      basic[i] = typed[i];
    }
    b64data = String.fromCharCode.apply(null, basic);
  }
  message += global.btoa(b64data);
  return callback(message);
};

/**
 * Decodes a packet. Changes format to Blob if requested.
 *
 * @return {Object} with `type` and `data` (if any)
 * @api private
 */

exports.decodePacket = function (data, binaryType, utf8decode) {
  // String data
  if (typeof data == 'string' || data === undefined) {
    if (data.charAt(0) == 'b') {
      return exports.decodeBase64Packet(data.substr(1), binaryType);
    }

    if (utf8decode) {
      try {
        data = utf8.decode(data);
      } catch (e) {
        return err;
      }
    }
    var type = data.charAt(0);

    if (Number(type) != type || !packetslist[type]) {
      return err;
    }

    if (data.length > 1) {
      return { type: packetslist[type], data: data.substring(1) };
    } else {
      return { type: packetslist[type] };
    }
  }

  var asArray = new Uint8Array(data);
  var type = asArray[0];
  var rest = sliceBuffer(data, 1);
  if (Blob && binaryType === 'blob') {
    rest = new Blob([rest]);
  }
  return { type: packetslist[type], data: rest };
};

/**
 * Decodes a packet encoded in a base64 string
 *
 * @param {String} base64 encoded message
 * @return {Object} with `type` and `data` (if any)
 */

exports.decodeBase64Packet = function(msg, binaryType) {
  var type = packetslist[msg.charAt(0)];
  if (!global.ArrayBuffer) {
    return { type: type, data: { base64: true, data: msg.substr(1) } };
  }

  var data = base64encoder.decode(msg.substr(1));

  if (binaryType === 'blob' && Blob) {
    data = new Blob([data]);
  }

  return { type: type, data: data };
};

/**
 * Encodes multiple messages (payload).
 *
 *     <length>:data
 *
 * Example:
 *
 *     11:hello world2:hi
 *
 * If any contents are binary, they will be encoded as base64 strings. Base64
 * encoded strings are marked with a b before the length specifier
 *
 * @param {Array} packets
 * @api private
 */

exports.encodePayload = function (packets, supportsBinary, callback) {
  if (typeof supportsBinary == 'function') {
    callback = supportsBinary;
    supportsBinary = null;
  }

  var isBinary = hasBinary(packets);

  if (supportsBinary && isBinary) {
    if (Blob && !dontSendBlobs) {
      return exports.encodePayloadAsBlob(packets, callback);
    }

    return exports.encodePayloadAsArrayBuffer(packets, callback);
  }

  if (!packets.length) {
    return callback('0:');
  }

  function setLengthHeader(message) {
    return message.length + ':' + message;
  }

  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, !isBinary ? false : supportsBinary, true, function(message) {
      doneCallback(null, setLengthHeader(message));
    });
  }

  map(packets, encodeOne, function(err, results) {
    return callback(results.join(''));
  });
};

/**
 * Async array map using after
 */

function map(ary, each, done) {
  var result = new Array(ary.length);
  var next = after(ary.length, done);

  var eachWithIndex = function(i, el, cb) {
    each(el, function(error, msg) {
      result[i] = msg;
      cb(error, result);
    });
  };

  for (var i = 0; i < ary.length; i++) {
    eachWithIndex(i, ary[i], next);
  }
}

/*
 * Decodes data when a payload is maybe expected. Possible binary contents are
 * decoded from their base64 representation
 *
 * @param {String} data, callback method
 * @api public
 */

exports.decodePayload = function (data, binaryType, callback) {
  if (typeof data != 'string') {
    return exports.decodePayloadAsBinary(data, binaryType, callback);
  }

  if (typeof binaryType === 'function') {
    callback = binaryType;
    binaryType = null;
  }

  var packet;
  if (data == '') {
    // parser error - ignoring payload
    return callback(err, 0, 1);
  }

  var length = ''
    , n, msg;

  for (var i = 0, l = data.length; i < l; i++) {
    var chr = data.charAt(i);

    if (':' != chr) {
      length += chr;
    } else {
      if ('' == length || (length != (n = Number(length)))) {
        // parser error - ignoring payload
        return callback(err, 0, 1);
      }

      msg = data.substr(i + 1, n);

      if (length != msg.length) {
        // parser error - ignoring payload
        return callback(err, 0, 1);
      }

      if (msg.length) {
        packet = exports.decodePacket(msg, binaryType, true);

        if (err.type == packet.type && err.data == packet.data) {
          // parser error in individual packet - ignoring payload
          return callback(err, 0, 1);
        }

        var ret = callback(packet, i + n, l);
        if (false === ret) return;
      }

      // advance cursor
      i += n;
      length = '';
    }
  }

  if (length != '') {
    // parser error - ignoring payload
    return callback(err, 0, 1);
  }

};

/**
 * Encodes multiple messages (payload) as binary.
 *
 * <1 = binary, 0 = string><number from 0-9><number from 0-9>[...]<number
 * 255><data>
 *
 * Example:
 * 1 3 255 1 2 3, if the binary contents are interpreted as 8 bit integers
 *
 * @param {Array} packets
 * @return {ArrayBuffer} encoded payload
 * @api private
 */

exports.encodePayloadAsArrayBuffer = function(packets, callback) {
  if (!packets.length) {
    return callback(new ArrayBuffer(0));
  }

  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, true, true, function(data) {
      return doneCallback(null, data);
    });
  }

  map(packets, encodeOne, function(err, encodedPackets) {
    var totalLength = encodedPackets.reduce(function(acc, p) {
      var len;
      if (typeof p === 'string'){
        len = p.length;
      } else {
        len = p.byteLength;
      }
      return acc + len.toString().length + len + 2; // string/binary identifier + separator = 2
    }, 0);

    var resultArray = new Uint8Array(totalLength);

    var bufferIndex = 0;
    encodedPackets.forEach(function(p) {
      var isString = typeof p === 'string';
      var ab = p;
      if (isString) {
        var view = new Uint8Array(p.length);
        for (var i = 0; i < p.length; i++) {
          view[i] = p.charCodeAt(i);
        }
        ab = view.buffer;
      }

      if (isString) { // not true binary
        resultArray[bufferIndex++] = 0;
      } else { // true binary
        resultArray[bufferIndex++] = 1;
      }

      var lenStr = ab.byteLength.toString();
      for (var i = 0; i < lenStr.length; i++) {
        resultArray[bufferIndex++] = parseInt(lenStr[i]);
      }
      resultArray[bufferIndex++] = 255;

      var view = new Uint8Array(ab);
      for (var i = 0; i < view.length; i++) {
        resultArray[bufferIndex++] = view[i];
      }
    });

    return callback(resultArray.buffer);
  });
};

/**
 * Encode as Blob
 */

exports.encodePayloadAsBlob = function(packets, callback) {
  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, true, true, function(encoded) {
      var binaryIdentifier = new Uint8Array(1);
      binaryIdentifier[0] = 1;
      if (typeof encoded === 'string') {
        var view = new Uint8Array(encoded.length);
        for (var i = 0; i < encoded.length; i++) {
          view[i] = encoded.charCodeAt(i);
        }
        encoded = view.buffer;
        binaryIdentifier[0] = 0;
      }

      var len = (encoded instanceof ArrayBuffer)
        ? encoded.byteLength
        : encoded.size;

      var lenStr = len.toString();
      var lengthAry = new Uint8Array(lenStr.length + 1);
      for (var i = 0; i < lenStr.length; i++) {
        lengthAry[i] = parseInt(lenStr[i]);
      }
      lengthAry[lenStr.length] = 255;

      if (Blob) {
        var blob = new Blob([binaryIdentifier.buffer, lengthAry.buffer, encoded]);
        doneCallback(null, blob);
      }
    });
  }

  map(packets, encodeOne, function(err, results) {
    return callback(new Blob(results));
  });
};

/*
 * Decodes data when a payload is maybe expected. Strings are decoded by
 * interpreting each byte as a key code for entries marked to start with 0. See
 * description of encodePayloadAsBinary
 *
 * @param {ArrayBuffer} data, callback method
 * @api public
 */

exports.decodePayloadAsBinary = function (data, binaryType, callback) {
  if (typeof binaryType === 'function') {
    callback = binaryType;
    binaryType = null;
  }

  var bufferTail = data;
  var buffers = [];

  var numberTooLong = false;
  while (bufferTail.byteLength > 0) {
    var tailArray = new Uint8Array(bufferTail);
    var isString = tailArray[0] === 0;
    var msgLength = '';

    for (var i = 1; ; i++) {
      if (tailArray[i] == 255) break;

      if (msgLength.length > 310) {
        numberTooLong = true;
        break;
      }

      msgLength += tailArray[i];
    }

    if(numberTooLong) return callback(err, 0, 1);

    bufferTail = sliceBuffer(bufferTail, 2 + msgLength.length);
    msgLength = parseInt(msgLength);

    var msg = sliceBuffer(bufferTail, 0, msgLength);
    if (isString) {
      try {
        msg = String.fromCharCode.apply(null, new Uint8Array(msg));
      } catch (e) {
        // iPhone Safari doesn't let you apply to typed arrays
        var typed = new Uint8Array(msg);
        msg = '';
        for (var i = 0; i < typed.length; i++) {
          msg += String.fromCharCode(typed[i]);
        }
      }
    }

    buffers.push(msg);
    bufferTail = sliceBuffer(bufferTail, msgLength);
  }

  var total = buffers.length;
  buffers.forEach(function(buffer, i) {
    callback(exports.decodePacket(buffer, binaryType, true), i, total);
  });
};

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./keys":26,"after":27,"arraybuffer.slice":28,"base64-arraybuffer":29,"blob":30,"has-binary":31,"utf8":33}],26:[function(_dereq_,module,exports){

/**
 * Gets the keys for an object.
 *
 * @return {Array} keys
 * @api private
 */

module.exports = Object.keys || function keys (obj){
  var arr = [];
  var has = Object.prototype.hasOwnProperty;

  for (var i in obj) {
    if (has.call(obj, i)) {
      arr.push(i);
    }
  }
  return arr;
};

},{}],27:[function(_dereq_,module,exports){
module.exports = after

function after(count, callback, err_cb) {
    var bail = false
    err_cb = err_cb || noop
    proxy.count = count

    return (count === 0) ? callback() : proxy

    function proxy(err, result) {
        if (proxy.count <= 0) {
            throw new Error('after called too many times')
        }
        --proxy.count

        // after first error, rest are passed to err_cb
        if (err) {
            bail = true
            callback(err)
            // future error callbacks will go to error handler
            callback = err_cb
        } else if (proxy.count === 0 && !bail) {
            callback(null, result)
        }
    }
}

function noop() {}

},{}],28:[function(_dereq_,module,exports){
/**
 * An abstraction for slicing an arraybuffer even when
 * ArrayBuffer.prototype.slice is not supported
 *
 * @api public
 */

module.exports = function(arraybuffer, start, end) {
  var bytes = arraybuffer.byteLength;
  start = start || 0;
  end = end || bytes;

  if (arraybuffer.slice) { return arraybuffer.slice(start, end); }

  if (start < 0) { start += bytes; }
  if (end < 0) { end += bytes; }
  if (end > bytes) { end = bytes; }

  if (start >= bytes || start >= end || bytes === 0) {
    return new ArrayBuffer(0);
  }

  var abv = new Uint8Array(arraybuffer);
  var result = new Uint8Array(end - start);
  for (var i = start, ii = 0; i < end; i++, ii++) {
    result[ii] = abv[i];
  }
  return result.buffer;
};

},{}],29:[function(_dereq_,module,exports){
/*
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */
(function(chars){
  "use strict";

  exports.encode = function(arraybuffer) {
    var bytes = new Uint8Array(arraybuffer),
    i, len = bytes.length, base64 = "";

    for (i = 0; i < len; i+=3) {
      base64 += chars[bytes[i] >> 2];
      base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
      base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
      base64 += chars[bytes[i + 2] & 63];
    }

    if ((len % 3) === 2) {
      base64 = base64.substring(0, base64.length - 1) + "=";
    } else if (len % 3 === 1) {
      base64 = base64.substring(0, base64.length - 2) + "==";
    }

    return base64;
  };

  exports.decode =  function(base64) {
    var bufferLength = base64.length * 0.75,
    len = base64.length, i, p = 0,
    encoded1, encoded2, encoded3, encoded4;

    if (base64[base64.length - 1] === "=") {
      bufferLength--;
      if (base64[base64.length - 2] === "=") {
        bufferLength--;
      }
    }

    var arraybuffer = new ArrayBuffer(bufferLength),
    bytes = new Uint8Array(arraybuffer);

    for (i = 0; i < len; i+=4) {
      encoded1 = chars.indexOf(base64[i]);
      encoded2 = chars.indexOf(base64[i+1]);
      encoded3 = chars.indexOf(base64[i+2]);
      encoded4 = chars.indexOf(base64[i+3]);

      bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
      bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
      bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }

    return arraybuffer;
  };
})("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");

},{}],30:[function(_dereq_,module,exports){
(function (global){
/**
 * Create a blob builder even when vendor prefixes exist
 */

var BlobBuilder = global.BlobBuilder
  || global.WebKitBlobBuilder
  || global.MSBlobBuilder
  || global.MozBlobBuilder;

/**
 * Check if Blob constructor is supported
 */

var blobSupported = (function() {
  try {
    var b = new Blob(['hi']);
    return b.size == 2;
  } catch(e) {
    return false;
  }
})();

/**
 * Check if BlobBuilder is supported
 */

var blobBuilderSupported = BlobBuilder
  && BlobBuilder.prototype.append
  && BlobBuilder.prototype.getBlob;

function BlobBuilderConstructor(ary, options) {
  options = options || {};

  var bb = new BlobBuilder();
  for (var i = 0; i < ary.length; i++) {
    bb.append(ary[i]);
  }
  return (options.type) ? bb.getBlob(options.type) : bb.getBlob();
};

module.exports = (function() {
  if (blobSupported) {
    return global.Blob;
  } else if (blobBuilderSupported) {
    return BlobBuilderConstructor;
  } else {
    return undefined;
  }
})();

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],31:[function(_dereq_,module,exports){
(function (global){

/*
 * Module requirements.
 */

var isArray = _dereq_('isarray');

/**
 * Module exports.
 */

module.exports = hasBinary;

/**
 * Checks for binary data.
 *
 * Right now only Buffer and ArrayBuffer are supported..
 *
 * @param {Object} anything
 * @api public
 */

function hasBinary(data) {

  function _hasBinary(obj) {
    if (!obj) return false;

    if ( (global.Buffer && global.Buffer.isBuffer(obj)) ||
         (global.ArrayBuffer && obj instanceof ArrayBuffer) ||
         (global.Blob && obj instanceof Blob) ||
         (global.File && obj instanceof File)
        ) {
      return true;
    }

    if (isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
          if (_hasBinary(obj[i])) {
              return true;
          }
      }
    } else if (obj && 'object' == typeof obj) {
      if (obj.toJSON) {
        obj = obj.toJSON();
      }

      for (var key in obj) {
        if (obj.hasOwnProperty(key) && _hasBinary(obj[key])) {
          return true;
        }
      }
    }

    return false;
  }

  return _hasBinary(data);
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"isarray":32}],32:[function(_dereq_,module,exports){
module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

},{}],33:[function(_dereq_,module,exports){
(function (global){
/*! http://mths.be/utf8js v2.0.0 by @mathias */
;(function(root) {

	// Detect free variables `exports`
	var freeExports = typeof exports == 'object' && exports;

	// Detect free variable `module`
	var freeModule = typeof module == 'object' && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code,
	// and use it as `root`
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	var stringFromCharCode = String.fromCharCode;

	// Taken from http://mths.be/punycode
	function ucs2decode(string) {
		var output = [];
		var counter = 0;
		var length = string.length;
		var value;
		var extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	// Taken from http://mths.be/punycode
	function ucs2encode(array) {
		var length = array.length;
		var index = -1;
		var value;
		var output = '';
		while (++index < length) {
			value = array[index];
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
		}
		return output;
	}

	/*--------------------------------------------------------------------------*/

	function createByte(codePoint, shift) {
		return stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
	}

	function encodeCodePoint(codePoint) {
		if ((codePoint & 0xFFFFFF80) == 0) { // 1-byte sequence
			return stringFromCharCode(codePoint);
		}
		var symbol = '';
		if ((codePoint & 0xFFFFF800) == 0) { // 2-byte sequence
			symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
		}
		else if ((codePoint & 0xFFFF0000) == 0) { // 3-byte sequence
			symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
			symbol += createByte(codePoint, 6);
		}
		else if ((codePoint & 0xFFE00000) == 0) { // 4-byte sequence
			symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
			symbol += createByte(codePoint, 12);
			symbol += createByte(codePoint, 6);
		}
		symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
		return symbol;
	}

	function utf8encode(string) {
		var codePoints = ucs2decode(string);

		// console.log(JSON.stringify(codePoints.map(function(x) {
		// 	return 'U+' + x.toString(16).toUpperCase();
		// })));

		var length = codePoints.length;
		var index = -1;
		var codePoint;
		var byteString = '';
		while (++index < length) {
			codePoint = codePoints[index];
			byteString += encodeCodePoint(codePoint);
		}
		return byteString;
	}

	/*--------------------------------------------------------------------------*/

	function readContinuationByte() {
		if (byteIndex >= byteCount) {
			throw Error('Invalid byte index');
		}

		var continuationByte = byteArray[byteIndex] & 0xFF;
		byteIndex++;

		if ((continuationByte & 0xC0) == 0x80) {
			return continuationByte & 0x3F;
		}

		// If we end up here, it’s not a continuation byte
		throw Error('Invalid continuation byte');
	}

	function decodeSymbol() {
		var byte1;
		var byte2;
		var byte3;
		var byte4;
		var codePoint;

		if (byteIndex > byteCount) {
			throw Error('Invalid byte index');
		}

		if (byteIndex == byteCount) {
			return false;
		}

		// Read first byte
		byte1 = byteArray[byteIndex] & 0xFF;
		byteIndex++;

		// 1-byte sequence (no continuation bytes)
		if ((byte1 & 0x80) == 0) {
			return byte1;
		}

		// 2-byte sequence
		if ((byte1 & 0xE0) == 0xC0) {
			var byte2 = readContinuationByte();
			codePoint = ((byte1 & 0x1F) << 6) | byte2;
			if (codePoint >= 0x80) {
				return codePoint;
			} else {
				throw Error('Invalid continuation byte');
			}
		}

		// 3-byte sequence (may include unpaired surrogates)
		if ((byte1 & 0xF0) == 0xE0) {
			byte2 = readContinuationByte();
			byte3 = readContinuationByte();
			codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
			if (codePoint >= 0x0800) {
				return codePoint;
			} else {
				throw Error('Invalid continuation byte');
			}
		}

		// 4-byte sequence
		if ((byte1 & 0xF8) == 0xF0) {
			byte2 = readContinuationByte();
			byte3 = readContinuationByte();
			byte4 = readContinuationByte();
			codePoint = ((byte1 & 0x0F) << 0x12) | (byte2 << 0x0C) |
				(byte3 << 0x06) | byte4;
			if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
				return codePoint;
			}
		}

		throw Error('Invalid UTF-8 detected');
	}

	var byteArray;
	var byteCount;
	var byteIndex;
	function utf8decode(byteString) {
		byteArray = ucs2decode(byteString);
		byteCount = byteArray.length;
		byteIndex = 0;
		var codePoints = [];
		var tmp;
		while ((tmp = decodeSymbol()) !== false) {
			codePoints.push(tmp);
		}
		return ucs2encode(codePoints);
	}

	/*--------------------------------------------------------------------------*/

	var utf8 = {
		'version': '2.0.0',
		'encode': utf8encode,
		'decode': utf8decode
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define(function() {
			return utf8;
		});
	}	else if (freeExports && !freeExports.nodeType) {
		if (freeModule) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = utf8;
		} else { // in Narwhal or RingoJS v0.7.0-
			var object = {};
			var hasOwnProperty = object.hasOwnProperty;
			for (var key in utf8) {
				hasOwnProperty.call(utf8, key) && (freeExports[key] = utf8[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.utf8 = utf8;
	}

}(this));

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],34:[function(_dereq_,module,exports){
(function (global){
/**
 * JSON parse.
 *
 * @see Based on jQuery#parseJSON (MIT) and JSON2
 * @api private
 */

var rvalidchars = /^[\],:{}\s]*$/;
var rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
var rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
var rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;
var rtrimLeft = /^\s+/;
var rtrimRight = /\s+$/;

module.exports = function parsejson(data) {
  if ('string' != typeof data || !data) {
    return null;
  }

  data = data.replace(rtrimLeft, '').replace(rtrimRight, '');

  // Attempt to parse using the native JSON parser first
  if (global.JSON && JSON.parse) {
    return JSON.parse(data);
  }

  if (rvalidchars.test(data.replace(rvalidescape, '@')
      .replace(rvalidtokens, ']')
      .replace(rvalidbraces, ''))) {
    return (new Function('return ' + data))();
  }
};
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],35:[function(_dereq_,module,exports){
/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */

exports.encode = function (obj) {
  var str = '';

  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (str.length) str += '&';
      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
    }
  }

  return str;
};

/**
 * Parses a simple querystring into an object
 *
 * @param {String} qs
 * @api private
 */

exports.decode = function(qs){
  var qry = {};
  var pairs = qs.split('&');
  for (var i = 0, l = pairs.length; i < l; i++) {
    var pair = pairs[i].split('=');
    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return qry;
};

},{}],36:[function(_dereq_,module,exports){
/**
 * Parses an URI
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */

var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

var parts = [
    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
];

module.exports = function parseuri(str) {
    var src = str,
        b = str.indexOf('['),
        e = str.indexOf(']');

    if (b != -1 && e != -1) {
        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
    }

    var m = re.exec(str || ''),
        uri = {},
        i = 14;

    while (i--) {
        uri[parts[i]] = m[i] || '';
    }

    if (b != -1 && e != -1) {
        uri.source = src;
        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
        uri.ipv6uri = true;
    }

    return uri;
};

},{}],37:[function(_dereq_,module,exports){

/**
 * Module dependencies.
 */

var global = (function() { return this; })();

/**
 * WebSocket constructor.
 */

var WebSocket = global.WebSocket || global.MozWebSocket;

/**
 * Module exports.
 */

module.exports = WebSocket ? ws : null;

/**
 * WebSocket constructor.
 *
 * The third `opts` options object gets ignored in web browsers, since it's
 * non-standard, and throws a TypeError if passed to the constructor.
 * See: https://github.com/einaros/ws/issues/227
 *
 * @param {String} uri
 * @param {Array} protocols (optional)
 * @param {Object) opts (optional)
 * @api public
 */

function ws(uri, protocols, opts) {
  var instance;
  if (protocols) {
    instance = new WebSocket(uri, protocols);
  } else {
    instance = new WebSocket(uri);
  }
  return instance;
}

if (WebSocket) ws.prototype = WebSocket.prototype;

},{}],38:[function(_dereq_,module,exports){
(function (global){

/*
 * Module requirements.
 */

var isArray = _dereq_('isarray');

/**
 * Module exports.
 */

module.exports = hasBinary;

/**
 * Checks for binary data.
 *
 * Right now only Buffer and ArrayBuffer are supported..
 *
 * @param {Object} anything
 * @api public
 */

function hasBinary(data) {

  function _hasBinary(obj) {
    if (!obj) return false;

    if ( (global.Buffer && global.Buffer.isBuffer(obj)) ||
         (global.ArrayBuffer && obj instanceof ArrayBuffer) ||
         (global.Blob && obj instanceof Blob) ||
         (global.File && obj instanceof File)
        ) {
      return true;
    }

    if (isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
          if (_hasBinary(obj[i])) {
              return true;
          }
      }
    } else if (obj && 'object' == typeof obj) {
      if (obj.toJSON) {
        obj = obj.toJSON();
      }

      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && _hasBinary(obj[key])) {
          return true;
        }
      }
    }

    return false;
  }

  return _hasBinary(data);
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"isarray":39}],39:[function(_dereq_,module,exports){
module.exports=_dereq_(32)
},{}],40:[function(_dereq_,module,exports){

/**
 * Module dependencies.
 */

var global = _dereq_('global');

/**
 * Module exports.
 *
 * Logic borrowed from Modernizr:
 *
 *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
 */

try {
  module.exports = 'XMLHttpRequest' in global &&
    'withCredentials' in new global.XMLHttpRequest();
} catch (err) {
  // if XMLHttp support is disabled in IE then it will throw
  // when trying to create
  module.exports = false;
}

},{"global":41}],41:[function(_dereq_,module,exports){

/**
 * Returns `this`. Execute this without a "context" (i.e. without it being
 * attached to an object of the left-hand side), and `this` points to the
 * "global" scope of the current JS execution.
 */

module.exports = (function () { return this; })();

},{}],42:[function(_dereq_,module,exports){

var indexOf = [].indexOf;

module.exports = function(arr, obj){
  if (indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};
},{}],43:[function(_dereq_,module,exports){

/**
 * HOP ref.
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Return own keys in `obj`.
 *
 * @param {Object} obj
 * @return {Array}
 * @api public
 */

exports.keys = Object.keys || function(obj){
  var keys = [];
  for (var key in obj) {
    if (has.call(obj, key)) {
      keys.push(key);
    }
  }
  return keys;
};

/**
 * Return own values in `obj`.
 *
 * @param {Object} obj
 * @return {Array}
 * @api public
 */

exports.values = function(obj){
  var vals = [];
  for (var key in obj) {
    if (has.call(obj, key)) {
      vals.push(obj[key]);
    }
  }
  return vals;
};

/**
 * Merge `b` into `a`.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api public
 */

exports.merge = function(a, b){
  for (var key in b) {
    if (has.call(b, key)) {
      a[key] = b[key];
    }
  }
  return a;
};

/**
 * Return length of `obj`.
 *
 * @param {Object} obj
 * @return {Number}
 * @api public
 */

exports.length = function(obj){
  return exports.keys(obj).length;
};

/**
 * Check if `obj` is empty.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api public
 */

exports.isEmpty = function(obj){
  return 0 == exports.length(obj);
};
},{}],44:[function(_dereq_,module,exports){
/**
 * Parses an URI
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */

var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

var parts = [
    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host'
  , 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
];

module.exports = function parseuri(str) {
  var m = re.exec(str || '')
    , uri = {}
    , i = 14;

  while (i--) {
    uri[parts[i]] = m[i] || '';
  }

  return uri;
};

},{}],45:[function(_dereq_,module,exports){
(function (global){
/*global Blob,File*/

/**
 * Module requirements
 */

var isArray = _dereq_('isarray');
var isBuf = _dereq_('./is-buffer');

/**
 * Replaces every Buffer | ArrayBuffer in packet with a numbered placeholder.
 * Anything with blobs or files should be fed through removeBlobs before coming
 * here.
 *
 * @param {Object} packet - socket.io event packet
 * @return {Object} with deconstructed packet and list of buffers
 * @api public
 */

exports.deconstructPacket = function(packet){
  var buffers = [];
  var packetData = packet.data;

  function _deconstructPacket(data) {
    if (!data) return data;

    if (isBuf(data)) {
      var placeholder = { _placeholder: true, num: buffers.length };
      buffers.push(data);
      return placeholder;
    } else if (isArray(data)) {
      var newData = new Array(data.length);
      for (var i = 0; i < data.length; i++) {
        newData[i] = _deconstructPacket(data[i]);
      }
      return newData;
    } else if ('object' == typeof data && !(data instanceof Date)) {
      var newData = {};
      for (var key in data) {
        newData[key] = _deconstructPacket(data[key]);
      }
      return newData;
    }
    return data;
  }

  var pack = packet;
  pack.data = _deconstructPacket(packetData);
  pack.attachments = buffers.length; // number of binary 'attachments'
  return {packet: pack, buffers: buffers};
};

/**
 * Reconstructs a binary packet from its placeholder packet and buffers
 *
 * @param {Object} packet - event packet with placeholders
 * @param {Array} buffers - binary buffers to put in placeholder positions
 * @return {Object} reconstructed packet
 * @api public
 */

exports.reconstructPacket = function(packet, buffers) {
  var curPlaceHolder = 0;

  function _reconstructPacket(data) {
    if (data && data._placeholder) {
      var buf = buffers[data.num]; // appropriate buffer (should be natural order anyway)
      return buf;
    } else if (isArray(data)) {
      for (var i = 0; i < data.length; i++) {
        data[i] = _reconstructPacket(data[i]);
      }
      return data;
    } else if (data && 'object' == typeof data) {
      for (var key in data) {
        data[key] = _reconstructPacket(data[key]);
      }
      return data;
    }
    return data;
  }

  packet.data = _reconstructPacket(packet.data);
  packet.attachments = undefined; // no longer useful
  return packet;
};

/**
 * Asynchronously removes Blobs or Files from data via
 * FileReader's readAsArrayBuffer method. Used before encoding
 * data as msgpack. Calls callback with the blobless data.
 *
 * @param {Object} data
 * @param {Function} callback
 * @api private
 */

exports.removeBlobs = function(data, callback) {
  function _removeBlobs(obj, curKey, containingObject) {
    if (!obj) return obj;

    // convert any blob
    if ((global.Blob && obj instanceof Blob) ||
        (global.File && obj instanceof File)) {
      pendingBlobs++;

      // async filereader
      var fileReader = new FileReader();
      fileReader.onload = function() { // this.result == arraybuffer
        if (containingObject) {
          containingObject[curKey] = this.result;
        }
        else {
          bloblessData = this.result;
        }

        // if nothing pending its callback time
        if(! --pendingBlobs) {
          callback(bloblessData);
        }
      };

      fileReader.readAsArrayBuffer(obj); // blob -> arraybuffer
    } else if (isArray(obj)) { // handle array
      for (var i = 0; i < obj.length; i++) {
        _removeBlobs(obj[i], i, obj);
      }
    } else if (obj && 'object' == typeof obj && !isBuf(obj)) { // and object
      for (var key in obj) {
        _removeBlobs(obj[key], key, obj);
      }
    }
  }

  var pendingBlobs = 0;
  var bloblessData = data;
  _removeBlobs(bloblessData);
  if (!pendingBlobs) {
    callback(bloblessData);
  }
};

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./is-buffer":47,"isarray":48}],46:[function(_dereq_,module,exports){

/**
 * Module dependencies.
 */

var debug = _dereq_('debug')('socket.io-parser');
var json = _dereq_('json3');
var isArray = _dereq_('isarray');
var Emitter = _dereq_('component-emitter');
var binary = _dereq_('./binary');
var isBuf = _dereq_('./is-buffer');

/**
 * Protocol version.
 *
 * @api public
 */

exports.protocol = 4;

/**
 * Packet types.
 *
 * @api public
 */

exports.types = [
  'CONNECT',
  'DISCONNECT',
  'EVENT',
  'BINARY_EVENT',
  'ACK',
  'BINARY_ACK',
  'ERROR'
];

/**
 * Packet type `connect`.
 *
 * @api public
 */

exports.CONNECT = 0;

/**
 * Packet type `disconnect`.
 *
 * @api public
 */

exports.DISCONNECT = 1;

/**
 * Packet type `event`.
 *
 * @api public
 */

exports.EVENT = 2;

/**
 * Packet type `ack`.
 *
 * @api public
 */

exports.ACK = 3;

/**
 * Packet type `error`.
 *
 * @api public
 */

exports.ERROR = 4;

/**
 * Packet type 'binary event'
 *
 * @api public
 */

exports.BINARY_EVENT = 5;

/**
 * Packet type `binary ack`. For acks with binary arguments.
 *
 * @api public
 */

exports.BINARY_ACK = 6;

/**
 * Encoder constructor.
 *
 * @api public
 */

exports.Encoder = Encoder;

/**
 * Decoder constructor.
 *
 * @api public
 */

exports.Decoder = Decoder;

/**
 * A socket.io Encoder instance
 *
 * @api public
 */

function Encoder() {}

/**
 * Encode a packet as a single string if non-binary, or as a
 * buffer sequence, depending on packet type.
 *
 * @param {Object} obj - packet object
 * @param {Function} callback - function to handle encodings (likely engine.write)
 * @return Calls callback with Array of encodings
 * @api public
 */

Encoder.prototype.encode = function(obj, callback){
  debug('encoding packet %j', obj);

  if (exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) {
    encodeAsBinary(obj, callback);
  }
  else {
    var encoding = encodeAsString(obj);
    callback([encoding]);
  }
};

/**
 * Encode packet as string.
 *
 * @param {Object} packet
 * @return {String} encoded
 * @api private
 */

function encodeAsString(obj) {
  var str = '';
  var nsp = false;

  // first is type
  str += obj.type;

  // attachments if we have them
  if (exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) {
    str += obj.attachments;
    str += '-';
  }

  // if we have a namespace other than `/`
  // we append it followed by a comma `,`
  if (obj.nsp && '/' != obj.nsp) {
    nsp = true;
    str += obj.nsp;
  }

  // immediately followed by the id
  if (null != obj.id) {
    if (nsp) {
      str += ',';
      nsp = false;
    }
    str += obj.id;
  }

  // json data
  if (null != obj.data) {
    if (nsp) str += ',';
    str += json.stringify(obj.data);
  }

  debug('encoded %j as %s', obj, str);
  return str;
}

/**
 * Encode packet as 'buffer sequence' by removing blobs, and
 * deconstructing packet into object with placeholders and
 * a list of buffers.
 *
 * @param {Object} packet
 * @return {Buffer} encoded
 * @api private
 */

function encodeAsBinary(obj, callback) {

  function writeEncoding(bloblessData) {
    var deconstruction = binary.deconstructPacket(bloblessData);
    var pack = encodeAsString(deconstruction.packet);
    var buffers = deconstruction.buffers;

    buffers.unshift(pack); // add packet info to beginning of data list
    callback(buffers); // write all the buffers
  }

  binary.removeBlobs(obj, writeEncoding);
}

/**
 * A socket.io Decoder instance
 *
 * @return {Object} decoder
 * @api public
 */

function Decoder() {
  this.reconstructor = null;
}

/**
 * Mix in `Emitter` with Decoder.
 */

Emitter(Decoder.prototype);

/**
 * Decodes an ecoded packet string into packet JSON.
 *
 * @param {String} obj - encoded packet
 * @return {Object} packet
 * @api public
 */

Decoder.prototype.add = function(obj) {
  var packet;
  if ('string' == typeof obj) {
    packet = decodeString(obj);
    if (exports.BINARY_EVENT == packet.type || exports.BINARY_ACK == packet.type) { // binary packet's json
      this.reconstructor = new BinaryReconstructor(packet);

      // no attachments, labeled binary but no binary data to follow
      if (this.reconstructor.reconPack.attachments === 0) {
        this.emit('decoded', packet);
      }
    } else { // non-binary full packet
      this.emit('decoded', packet);
    }
  }
  else if (isBuf(obj) || obj.base64) { // raw binary data
    if (!this.reconstructor) {
      throw new Error('got binary data when not reconstructing a packet');
    } else {
      packet = this.reconstructor.takeBinaryData(obj);
      if (packet) { // received final buffer
        this.reconstructor = null;
        this.emit('decoded', packet);
      }
    }
  }
  else {
    throw new Error('Unknown type: ' + obj);
  }
};

/**
 * Decode a packet String (JSON data)
 *
 * @param {String} str
 * @return {Object} packet
 * @api private
 */

function decodeString(str) {
  var p = {};
  var i = 0;

  // look up type
  p.type = Number(str.charAt(0));
  if (null == exports.types[p.type]) return error();

  // look up attachments if type binary
  if (exports.BINARY_EVENT == p.type || exports.BINARY_ACK == p.type) {
    var buf = '';
    while (str.charAt(++i) != '-') {
      buf += str.charAt(i);
      if (i == str.length) break;
    }
    if (buf != Number(buf) || str.charAt(i) != '-') {
      throw new Error('Illegal attachments');
    }
    p.attachments = Number(buf);
  }

  // look up namespace (if any)
  if ('/' == str.charAt(i + 1)) {
    p.nsp = '';
    while (++i) {
      var c = str.charAt(i);
      if (',' == c) break;
      p.nsp += c;
      if (i == str.length) break;
    }
  } else {
    p.nsp = '/';
  }

  // look up id
  var next = str.charAt(i + 1);
  if ('' !== next && Number(next) == next) {
    p.id = '';
    while (++i) {
      var c = str.charAt(i);
      if (null == c || Number(c) != c) {
        --i;
        break;
      }
      p.id += str.charAt(i);
      if (i == str.length) break;
    }
    p.id = Number(p.id);
  }

  // look up json data
  if (str.charAt(++i)) {
    try {
      p.data = json.parse(str.substr(i));
    } catch(e){
      return error();
    }
  }

  debug('decoded %s as %j', str, p);
  return p;
}

/**
 * Deallocates a parser's resources
 *
 * @api public
 */

Decoder.prototype.destroy = function() {
  if (this.reconstructor) {
    this.reconstructor.finishedReconstruction();
  }
};

/**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 * @api private
 */

function BinaryReconstructor(packet) {
  this.reconPack = packet;
  this.buffers = [];
}

/**
 * Method to be called when binary data received from connection
 * after a BINARY_EVENT packet.
 *
 * @param {Buffer | ArrayBuffer} binData - the raw binary data received
 * @return {null | Object} returns null if more binary data is expected or
 *   a reconstructed packet object if all buffers have been received.
 * @api private
 */

BinaryReconstructor.prototype.takeBinaryData = function(binData) {
  this.buffers.push(binData);
  if (this.buffers.length == this.reconPack.attachments) { // done with buffer list
    var packet = binary.reconstructPacket(this.reconPack, this.buffers);
    this.finishedReconstruction();
    return packet;
  }
  return null;
};

/**
 * Cleans up binary packet reconstruction variables.
 *
 * @api private
 */

BinaryReconstructor.prototype.finishedReconstruction = function() {
  this.reconPack = null;
  this.buffers = [];
};

function error(data){
  return {
    type: exports.ERROR,
    data: 'parser error'
  };
}

},{"./binary":45,"./is-buffer":47,"component-emitter":9,"debug":10,"isarray":48,"json3":49}],47:[function(_dereq_,module,exports){
(function (global){

module.exports = isBuf;

/**
 * Returns true if obj is a buffer or an arraybuffer.
 *
 * @api private
 */

function isBuf(obj) {
  return (global.Buffer && global.Buffer.isBuffer(obj)) ||
         (global.ArrayBuffer && obj instanceof ArrayBuffer);
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],48:[function(_dereq_,module,exports){
module.exports=_dereq_(32)
},{}],49:[function(_dereq_,module,exports){
/*! JSON v3.2.6 | http://bestiejs.github.io/json3 | Copyright 2012-2013, Kit Cambridge | http://kit.mit-license.org */
;(function (window) {
  // Convenience aliases.
  var getClass = {}.toString, isProperty, forEach, undef;

  // Detect the `define` function exposed by asynchronous module loaders. The
  // strict `define` check is necessary for compatibility with `r.js`.
  var isLoader = typeof define === "function" && define.amd;

  // Detect native implementations.
  var nativeJSON = typeof JSON == "object" && JSON;

  // Set up the JSON 3 namespace, preferring the CommonJS `exports` object if
  // available.
  var JSON3 = typeof exports == "object" && exports && !exports.nodeType && exports;

  if (JSON3 && nativeJSON) {
    // Explicitly delegate to the native `stringify` and `parse`
    // implementations in CommonJS environments.
    JSON3.stringify = nativeJSON.stringify;
    JSON3.parse = nativeJSON.parse;
  } else {
    // Export for web browsers, JavaScript engines, and asynchronous module
    // loaders, using the global `JSON` object if available.
    JSON3 = window.JSON = nativeJSON || {};
  }

  // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
  var isExtended = new Date(-3509827334573292);
  try {
    // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
    // results for certain dates in Opera >= 10.53.
    isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
      // Safari < 2.0.2 stores the internal millisecond time value correctly,
      // but clips the values returned by the date methods to the range of
      // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
      isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
  } catch (exception) {}

  // Internal: Determines whether the native `JSON.stringify` and `parse`
  // implementations are spec-compliant. Based on work by Ken Snyder.
  function has(name) {
    if (has[name] !== undef) {
      // Return cached feature test result.
      return has[name];
    }

    var isSupported;
    if (name == "bug-string-char-index") {
      // IE <= 7 doesn't support accessing string characters using square
      // bracket notation. IE 8 only supports this for primitives.
      isSupported = "a"[0] != "a";
    } else if (name == "json") {
      // Indicates whether both `JSON.stringify` and `JSON.parse` are
      // supported.
      isSupported = has("json-stringify") && has("json-parse");
    } else {
      var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
      // Test `JSON.stringify`.
      if (name == "json-stringify") {
        var stringify = JSON3.stringify, stringifySupported = typeof stringify == "function" && isExtended;
        if (stringifySupported) {
          // A test function object with a custom `toJSON` method.
          (value = function () {
            return 1;
          }).toJSON = value;
          try {
            stringifySupported =
              // Firefox 3.1b1 and b2 serialize string, number, and boolean
              // primitives as object literals.
              stringify(0) === "0" &&
              // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
              // literals.
              stringify(new Number()) === "0" &&
              stringify(new String()) == '""' &&
              // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
              // does not define a canonical JSON representation (this applies to
              // objects with `toJSON` properties as well, *unless* they are nested
              // within an object or array).
              stringify(getClass) === undef &&
              // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
              // FF 3.1b3 pass this test.
              stringify(undef) === undef &&
              // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
              // respectively, if the value is omitted entirely.
              stringify() === undef &&
              // FF 3.1b1, 2 throw an error if the given value is not a number,
              // string, array, object, Boolean, or `null` literal. This applies to
              // objects with custom `toJSON` methods as well, unless they are nested
              // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
              // methods entirely.
              stringify(value) === "1" &&
              stringify([value]) == "[1]" &&
              // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
              // `"[null]"`.
              stringify([undef]) == "[null]" &&
              // YUI 3.0.0b1 fails to serialize `null` literals.
              stringify(null) == "null" &&
              // FF 3.1b1, 2 halts serialization if an array contains a function:
              // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
              // elides non-JSON values from objects and arrays, unless they
              // define custom `toJSON` methods.
              stringify([undef, getClass, null]) == "[null,null,null]" &&
              // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
              // where character escape codes are expected (e.g., `\b` => `\u0008`).
              stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
              // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
              stringify(null, value) === "1" &&
              stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" &&
              // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
              // serialize extended years.
              stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
              // The milliseconds are optional in ES 5, but required in 5.1.
              stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
              // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
              // four-digit years instead of six-digit years. Credits: @Yaffle.
              stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
              // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
              // values less than 1000. Credits: @Yaffle.
              stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
          } catch (exception) {
            stringifySupported = false;
          }
        }
        isSupported = stringifySupported;
      }
      // Test `JSON.parse`.
      if (name == "json-parse") {
        var parse = JSON3.parse;
        if (typeof parse == "function") {
          try {
            // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
            // Conforming implementations should also coerce the initial argument to
            // a string prior to parsing.
            if (parse("0") === 0 && !parse(false)) {
              // Simple parsing test.
              value = parse(serialized);
              var parseSupported = value["a"].length == 5 && value["a"][0] === 1;
              if (parseSupported) {
                try {
                  // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
                  parseSupported = !parse('"\t"');
                } catch (exception) {}
                if (parseSupported) {
                  try {
                    // FF 4.0 and 4.0.1 allow leading `+` signs and leading
                    // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
                    // certain octal literals.
                    parseSupported = parse("01") !== 1;
                  } catch (exception) {}
                }
                if (parseSupported) {
                  try {
                    // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
                    // points. These environments, along with FF 3.1b1 and 2,
                    // also allow trailing commas in JSON objects and arrays.
                    parseSupported = parse("1.") !== 1;
                  } catch (exception) {}
                }
              }
            }
          } catch (exception) {
            parseSupported = false;
          }
        }
        isSupported = parseSupported;
      }
    }
    return has[name] = !!isSupported;
  }

  if (!has("json")) {
    // Common `[[Class]]` name aliases.
    var functionClass = "[object Function]";
    var dateClass = "[object Date]";
    var numberClass = "[object Number]";
    var stringClass = "[object String]";
    var arrayClass = "[object Array]";
    var booleanClass = "[object Boolean]";

    // Detect incomplete support for accessing string characters by index.
    var charIndexBuggy = has("bug-string-char-index");

    // Define additional utility methods if the `Date` methods are buggy.
    if (!isExtended) {
      var floor = Math.floor;
      // A mapping between the months of the year and the number of days between
      // January 1st and the first of the respective month.
      var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
      // Internal: Calculates the number of days between the Unix epoch and the
      // first day of the given month.
      var getDay = function (year, month) {
        return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
      };
    }

    // Internal: Determines if a property is a direct property of the given
    // object. Delegates to the native `Object#hasOwnProperty` method.
    if (!(isProperty = {}.hasOwnProperty)) {
      isProperty = function (property) {
        var members = {}, constructor;
        if ((members.__proto__ = null, members.__proto__ = {
          // The *proto* property cannot be set multiple times in recent
          // versions of Firefox and SeaMonkey.
          "toString": 1
        }, members).toString != getClass) {
          // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
          // supports the mutable *proto* property.
          isProperty = function (property) {
            // Capture and break the object's prototype chain (see section 8.6.2
            // of the ES 5.1 spec). The parenthesized expression prevents an
            // unsafe transformation by the Closure Compiler.
            var original = this.__proto__, result = property in (this.__proto__ = null, this);
            // Restore the original prototype chain.
            this.__proto__ = original;
            return result;
          };
        } else {
          // Capture a reference to the top-level `Object` constructor.
          constructor = members.constructor;
          // Use the `constructor` property to simulate `Object#hasOwnProperty` in
          // other environments.
          isProperty = function (property) {
            var parent = (this.constructor || constructor).prototype;
            return property in this && !(property in parent && this[property] === parent[property]);
          };
        }
        members = null;
        return isProperty.call(this, property);
      };
    }

    // Internal: A set of primitive types used by `isHostType`.
    var PrimitiveTypes = {
      'boolean': 1,
      'number': 1,
      'string': 1,
      'undefined': 1
    };

    // Internal: Determines if the given object `property` value is a
    // non-primitive.
    var isHostType = function (object, property) {
      var type = typeof object[property];
      return type == 'object' ? !!object[property] : !PrimitiveTypes[type];
    };

    // Internal: Normalizes the `for...in` iteration algorithm across
    // environments. Each enumerated key is yielded to a `callback` function.
    forEach = function (object, callback) {
      var size = 0, Properties, members, property;

      // Tests for bugs in the current environment's `for...in` algorithm. The
      // `valueOf` property inherits the non-enumerable flag from
      // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
      (Properties = function () {
        this.valueOf = 0;
      }).prototype.valueOf = 0;

      // Iterate over a new instance of the `Properties` class.
      members = new Properties();
      for (property in members) {
        // Ignore all properties inherited from `Object.prototype`.
        if (isProperty.call(members, property)) {
          size++;
        }
      }
      Properties = members = null;

      // Normalize the iteration algorithm.
      if (!size) {
        // A list of non-enumerable properties inherited from `Object.prototype`.
        members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
        // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
        // properties.
        forEach = function (object, callback) {
          var isFunction = getClass.call(object) == functionClass, property, length;
          var hasProperty = !isFunction && typeof object.constructor != 'function' && isHostType(object, 'hasOwnProperty') ? object.hasOwnProperty : isProperty;
          for (property in object) {
            // Gecko <= 1.0 enumerates the `prototype` property of functions under
            // certain conditions; IE does not.
            if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
              callback(property);
            }
          }
          // Manually invoke the callback for each non-enumerable property.
          for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property));
        };
      } else if (size == 2) {
        // Safari <= 2.0.4 enumerates shadowed properties twice.
        forEach = function (object, callback) {
          // Create a set of iterated properties.
          var members = {}, isFunction = getClass.call(object) == functionClass, property;
          for (property in object) {
            // Store each property name to prevent double enumeration. The
            // `prototype` property of functions is not enumerated due to cross-
            // environment inconsistencies.
            if (!(isFunction && property == "prototype") && !isProperty.call(members, property) && (members[property] = 1) && isProperty.call(object, property)) {
              callback(property);
            }
          }
        };
      } else {
        // No bugs detected; use the standard `for...in` algorithm.
        forEach = function (object, callback) {
          var isFunction = getClass.call(object) == functionClass, property, isConstructor;
          for (property in object) {
            if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
              callback(property);
            }
          }
          // Manually invoke the callback for the `constructor` property due to
          // cross-environment inconsistencies.
          if (isConstructor || isProperty.call(object, (property = "constructor"))) {
            callback(property);
          }
        };
      }
      return forEach(object, callback);
    };

    // Public: Serializes a JavaScript `value` as a JSON string. The optional
    // `filter` argument may specify either a function that alters how object and
    // array members are serialized, or an array of strings and numbers that
    // indicates which properties should be serialized. The optional `width`
    // argument may be either a string or number that specifies the indentation
    // level of the output.
    if (!has("json-stringify")) {
      // Internal: A map of control characters and their escaped equivalents.
      var Escapes = {
        92: "\\\\",
        34: '\\"',
        8: "\\b",
        12: "\\f",
        10: "\\n",
        13: "\\r",
        9: "\\t"
      };

      // Internal: Converts `value` into a zero-padded string such that its
      // length is at least equal to `width`. The `width` must be <= 6.
      var leadingZeroes = "000000";
      var toPaddedString = function (width, value) {
        // The `|| 0` expression is necessary to work around a bug in
        // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
        return (leadingZeroes + (value || 0)).slice(-width);
      };

      // Internal: Double-quotes a string `value`, replacing all ASCII control
      // characters (characters with code unit values between 0 and 31) with
      // their escaped equivalents. This is an implementation of the
      // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
      var unicodePrefix = "\\u00";
      var quote = function (value) {
        var result = '"', index = 0, length = value.length, isLarge = length > 10 && charIndexBuggy, symbols;
        if (isLarge) {
          symbols = value.split("");
        }
        for (; index < length; index++) {
          var charCode = value.charCodeAt(index);
          // If the character is a control character, append its Unicode or
          // shorthand escape sequence; otherwise, append the character as-is.
          switch (charCode) {
            case 8: case 9: case 10: case 12: case 13: case 34: case 92:
              result += Escapes[charCode];
              break;
            default:
              if (charCode < 32) {
                result += unicodePrefix + toPaddedString(2, charCode.toString(16));
                break;
              }
              result += isLarge ? symbols[index] : charIndexBuggy ? value.charAt(index) : value[index];
          }
        }
        return result + '"';
      };

      // Internal: Recursively serializes an object. Implements the
      // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
      var serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
        var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;
        try {
          // Necessary for host object support.
          value = object[property];
        } catch (exception) {}
        if (typeof value == "object" && value) {
          className = getClass.call(value);
          if (className == dateClass && !isProperty.call(value, "toJSON")) {
            if (value > -1 / 0 && value < 1 / 0) {
              // Dates are serialized according to the `Date#toJSON` method
              // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
              // for the ISO 8601 date time string format.
              if (getDay) {
                // Manually compute the year, month, date, hours, minutes,
                // seconds, and milliseconds if the `getUTC*` methods are
                // buggy. Adapted from @Yaffle's `date-shim` project.
                date = floor(value / 864e5);
                for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
                for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
                date = 1 + date - getDay(year, month);
                // The `time` value specifies the time within the day (see ES
                // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
                // to compute `A modulo B`, as the `%` operator does not
                // correspond to the `modulo` operation for negative numbers.
                time = (value % 864e5 + 864e5) % 864e5;
                // The hours, minutes, seconds, and milliseconds are obtained by
                // decomposing the time within the day. See section 15.9.1.10.
                hours = floor(time / 36e5) % 24;
                minutes = floor(time / 6e4) % 60;
                seconds = floor(time / 1e3) % 60;
                milliseconds = time % 1e3;
              } else {
                year = value.getUTCFullYear();
                month = value.getUTCMonth();
                date = value.getUTCDate();
                hours = value.getUTCHours();
                minutes = value.getUTCMinutes();
                seconds = value.getUTCSeconds();
                milliseconds = value.getUTCMilliseconds();
              }
              // Serialize extended years correctly.
              value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) +
                "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
                // Months, dates, hours, minutes, and seconds should have two
                // digits; milliseconds should have three.
                "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
                // Milliseconds are optional in ES 5.0, but required in 5.1.
                "." + toPaddedString(3, milliseconds) + "Z";
            } else {
              value = null;
            }
          } else if (typeof value.toJSON == "function" && ((className != numberClass && className != stringClass && className != arrayClass) || isProperty.call(value, "toJSON"))) {
            // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
            // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
            // ignores all `toJSON` methods on these objects unless they are
            // defined directly on an instance.
            value = value.toJSON(property);
          }
        }
        if (callback) {
          // If a replacement function was provided, call it to obtain the value
          // for serialization.
          value = callback.call(object, property, value);
        }
        if (value === null) {
          return "null";
        }
        className = getClass.call(value);
        if (className == booleanClass) {
          // Booleans are represented literally.
          return "" + value;
        } else if (className == numberClass) {
          // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
          // `"null"`.
          return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
        } else if (className == stringClass) {
          // Strings are double-quoted and escaped.
          return quote("" + value);
        }
        // Recursively serialize objects and arrays.
        if (typeof value == "object") {
          // Check for cyclic structures. This is a linear search; performance
          // is inversely proportional to the number of unique nested objects.
          for (length = stack.length; length--;) {
            if (stack[length] === value) {
              // Cyclic structures cannot be serialized by `JSON.stringify`.
              throw TypeError();
            }
          }
          // Add the object to the stack of traversed objects.
          stack.push(value);
          results = [];
          // Save the current indentation level and indent one additional level.
          prefix = indentation;
          indentation += whitespace;
          if (className == arrayClass) {
            // Recursively serialize array elements.
            for (index = 0, length = value.length; index < length; index++) {
              element = serialize(index, value, callback, properties, whitespace, indentation, stack);
              results.push(element === undef ? "null" : element);
            }
            result = results.length ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
          } else {
            // Recursively serialize object members. Members are selected from
            // either a user-specified list of property names, or the object
            // itself.
            forEach(properties || value, function (property) {
              var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
              if (element !== undef) {
                // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
                // is not the empty string, let `member` {quote(property) + ":"}
                // be the concatenation of `member` and the `space` character."
                // The "`space` character" refers to the literal space
                // character, not the `space` {width} argument provided to
                // `JSON.stringify`.
                results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
              }
            });
            result = results.length ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
          }
          // Remove the object from the traversed object stack.
          stack.pop();
          return result;
        }
      };

      // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
      JSON3.stringify = function (source, filter, width) {
        var whitespace, callback, properties, className;
        if (typeof filter == "function" || typeof filter == "object" && filter) {
          if ((className = getClass.call(filter)) == functionClass) {
            callback = filter;
          } else if (className == arrayClass) {
            // Convert the property names array into a makeshift set.
            properties = {};
            for (var index = 0, length = filter.length, value; index < length; value = filter[index++], ((className = getClass.call(value)), className == stringClass || className == numberClass) && (properties[value] = 1));
          }
        }
        if (width) {
          if ((className = getClass.call(width)) == numberClass) {
            // Convert the `width` to an integer and create a string containing
            // `width` number of space characters.
            if ((width -= width % 1) > 0) {
              for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ");
            }
          } else if (className == stringClass) {
            whitespace = width.length <= 10 ? width : width.slice(0, 10);
          }
        }
        // Opera <= 7.54u2 discards the values associated with empty string keys
        // (`""`) only if they are used directly within an object member list
        // (e.g., `!("" in { "": 1})`).
        return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
      };
    }

    // Public: Parses a JSON source string.
    if (!has("json-parse")) {
      var fromCharCode = String.fromCharCode;

      // Internal: A map of escaped control characters and their unescaped
      // equivalents.
      var Unescapes = {
        92: "\\",
        34: '"',
        47: "/",
        98: "\b",
        116: "\t",
        110: "\n",
        102: "\f",
        114: "\r"
      };

      // Internal: Stores the parser state.
      var Index, Source;

      // Internal: Resets the parser state and throws a `SyntaxError`.
      var abort = function() {
        Index = Source = null;
        throw SyntaxError();
      };

      // Internal: Returns the next token, or `"$"` if the parser has reached
      // the end of the source string. A token may be a string, number, `null`
      // literal, or Boolean literal.
      var lex = function () {
        var source = Source, length = source.length, value, begin, position, isSigned, charCode;
        while (Index < length) {
          charCode = source.charCodeAt(Index);
          switch (charCode) {
            case 9: case 10: case 13: case 32:
              // Skip whitespace tokens, including tabs, carriage returns, line
              // feeds, and space characters.
              Index++;
              break;
            case 123: case 125: case 91: case 93: case 58: case 44:
              // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
              // the current position.
              value = charIndexBuggy ? source.charAt(Index) : source[Index];
              Index++;
              return value;
            case 34:
              // `"` delimits a JSON string; advance to the next character and
              // begin parsing the string. String tokens are prefixed with the
              // sentinel `@` character to distinguish them from punctuators and
              // end-of-string tokens.
              for (value = "@", Index++; Index < length;) {
                charCode = source.charCodeAt(Index);
                if (charCode < 32) {
                  // Unescaped ASCII control characters (those with a code unit
                  // less than the space character) are not permitted.
                  abort();
                } else if (charCode == 92) {
                  // A reverse solidus (`\`) marks the beginning of an escaped
                  // control character (including `"`, `\`, and `/`) or Unicode
                  // escape sequence.
                  charCode = source.charCodeAt(++Index);
                  switch (charCode) {
                    case 92: case 34: case 47: case 98: case 116: case 110: case 102: case 114:
                      // Revive escaped control characters.
                      value += Unescapes[charCode];
                      Index++;
                      break;
                    case 117:
                      // `\u` marks the beginning of a Unicode escape sequence.
                      // Advance to the first character and validate the
                      // four-digit code point.
                      begin = ++Index;
                      for (position = Index + 4; Index < position; Index++) {
                        charCode = source.charCodeAt(Index);
                        // A valid sequence comprises four hexdigits (case-
                        // insensitive) that form a single hexadecimal value.
                        if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                          // Invalid Unicode escape sequence.
                          abort();
                        }
                      }
                      // Revive the escaped character.
                      value += fromCharCode("0x" + source.slice(begin, Index));
                      break;
                    default:
                      // Invalid escape sequence.
                      abort();
                  }
                } else {
                  if (charCode == 34) {
                    // An unescaped double-quote character marks the end of the
                    // string.
                    break;
                  }
                  charCode = source.charCodeAt(Index);
                  begin = Index;
                  // Optimize for the common case where a string is valid.
                  while (charCode >= 32 && charCode != 92 && charCode != 34) {
                    charCode = source.charCodeAt(++Index);
                  }
                  // Append the string as-is.
                  value += source.slice(begin, Index);
                }
              }
              if (source.charCodeAt(Index) == 34) {
                // Advance to the next character and return the revived string.
                Index++;
                return value;
              }
              // Unterminated string.
              abort();
            default:
              // Parse numbers and literals.
              begin = Index;
              // Advance past the negative sign, if one is specified.
              if (charCode == 45) {
                isSigned = true;
                charCode = source.charCodeAt(++Index);
              }
              // Parse an integer or floating-point value.
              if (charCode >= 48 && charCode <= 57) {
                // Leading zeroes are interpreted as octal literals.
                if (charCode == 48 && ((charCode = source.charCodeAt(Index + 1)), charCode >= 48 && charCode <= 57)) {
                  // Illegal octal literal.
                  abort();
                }
                isSigned = false;
                // Parse the integer component.
                for (; Index < length && ((charCode = source.charCodeAt(Index)), charCode >= 48 && charCode <= 57); Index++);
                // Floats cannot contain a leading decimal point; however, this
                // case is already accounted for by the parser.
                if (source.charCodeAt(Index) == 46) {
                  position = ++Index;
                  // Parse the decimal component.
                  for (; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
                  if (position == Index) {
                    // Illegal trailing decimal.
                    abort();
                  }
                  Index = position;
                }
                // Parse exponents. The `e` denoting the exponent is
                // case-insensitive.
                charCode = source.charCodeAt(Index);
                if (charCode == 101 || charCode == 69) {
                  charCode = source.charCodeAt(++Index);
                  // Skip past the sign following the exponent, if one is
                  // specified.
                  if (charCode == 43 || charCode == 45) {
                    Index++;
                  }
                  // Parse the exponential component.
                  for (position = Index; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
                  if (position == Index) {
                    // Illegal empty exponent.
                    abort();
                  }
                  Index = position;
                }
                // Coerce the parsed value to a JavaScript number.
                return +source.slice(begin, Index);
              }
              // A negative sign may only precede numbers.
              if (isSigned) {
                abort();
              }
              // `true`, `false`, and `null` literals.
              if (source.slice(Index, Index + 4) == "true") {
                Index += 4;
                return true;
              } else if (source.slice(Index, Index + 5) == "false") {
                Index += 5;
                return false;
              } else if (source.slice(Index, Index + 4) == "null") {
                Index += 4;
                return null;
              }
              // Unrecognized token.
              abort();
          }
        }
        // Return the sentinel `$` character if the parser has reached the end
        // of the source string.
        return "$";
      };

      // Internal: Parses a JSON `value` token.
      var get = function (value) {
        var results, hasMembers;
        if (value == "$") {
          // Unexpected end of input.
          abort();
        }
        if (typeof value == "string") {
          if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
            // Remove the sentinel `@` character.
            return value.slice(1);
          }
          // Parse object and array literals.
          if (value == "[") {
            // Parses a JSON array, returning a new JavaScript array.
            results = [];
            for (;; hasMembers || (hasMembers = true)) {
              value = lex();
              // A closing square bracket marks the end of the array literal.
              if (value == "]") {
                break;
              }
              // If the array literal contains elements, the current token
              // should be a comma separating the previous element from the
              // next.
              if (hasMembers) {
                if (value == ",") {
                  value = lex();
                  if (value == "]") {
                    // Unexpected trailing `,` in array literal.
                    abort();
                  }
                } else {
                  // A `,` must separate each array element.
                  abort();
                }
              }
              // Elisions and leading commas are not permitted.
              if (value == ",") {
                abort();
              }
              results.push(get(value));
            }
            return results;
          } else if (value == "{") {
            // Parses a JSON object, returning a new JavaScript object.
            results = {};
            for (;; hasMembers || (hasMembers = true)) {
              value = lex();
              // A closing curly brace marks the end of the object literal.
              if (value == "}") {
                break;
              }
              // If the object literal contains members, the current token
              // should be a comma separator.
              if (hasMembers) {
                if (value == ",") {
                  value = lex();
                  if (value == "}") {
                    // Unexpected trailing `,` in object literal.
                    abort();
                  }
                } else {
                  // A `,` must separate each object member.
                  abort();
                }
              }
              // Leading commas are not permitted, object property names must be
              // double-quoted strings, and a `:` must separate each property
              // name and value.
              if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
                abort();
              }
              results[value.slice(1)] = get(lex());
            }
            return results;
          }
          // Unexpected token encountered.
          abort();
        }
        return value;
      };

      // Internal: Updates a traversed object member.
      var update = function(source, property, callback) {
        var element = walk(source, property, callback);
        if (element === undef) {
          delete source[property];
        } else {
          source[property] = element;
        }
      };

      // Internal: Recursively traverses a parsed JSON object, invoking the
      // `callback` function for each value. This is an implementation of the
      // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
      var walk = function (source, property, callback) {
        var value = source[property], length;
        if (typeof value == "object" && value) {
          // `forEach` can't be used to traverse an array in Opera <= 8.54
          // because its `Object#hasOwnProperty` implementation returns `false`
          // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
          if (getClass.call(value) == arrayClass) {
            for (length = value.length; length--;) {
              update(value, length, callback);
            }
          } else {
            forEach(value, function (property) {
              update(value, property, callback);
            });
          }
        }
        return callback.call(source, property, value);
      };

      // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
      JSON3.parse = function (source, callback) {
        var result, value;
        Index = 0;
        Source = "" + source;
        result = get(lex());
        // If a JSON string contains multiple tokens, it is invalid.
        if (lex() != "$") {
          abort();
        }
        // Reset the parser state.
        Index = Source = null;
        return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
      };
    }
  }

  // Export for asynchronous module loaders.
  if (isLoader) {
    define(function () {
      return JSON3;
    });
  }
}(this));

},{}],50:[function(_dereq_,module,exports){
module.exports = toArray

function toArray(list, index) {
    var array = []

    index = index || 0

    for (var i = index || 0; i < list.length; i++) {
        array[i - index] = list[i]
    }

    return array
}

},{}]},{},[1])
(1)
});

/*
 * textillate.js
 * http://jschr.github.com/textillate
 * MIT licensed
 *
 * Copyright (C) 2012-2013 Jordan Schroter
 */

(function ($) {
    "use strict";

    function isInEffect (effect) {
        return /In/.test(effect) || $.inArray(effect, $.fn.textillate.defaults.inEffects) >= 0;
    };

    function isOutEffect (effect) {
        return /Out/.test(effect) || $.inArray(effect, $.fn.textillate.defaults.outEffects) >= 0;
    };


    function stringToBoolean(str) {
        if (str !== "true" && str !== "false") return str;
        return (str === "true");
    };

    // custom get data api method
    function getData (node) {
        var attrs = node.attributes || []
            , data = {};

        if (!attrs.length) return data;

        $.each(attrs, function (i, attr) {
            var nodeName = attr.nodeName.replace(/delayscale/, 'delayScale');
            if (/^data-in-*/.test(nodeName)) {
                data.in = data.in || {};
                data.in[nodeName.replace(/data-in-/, '')] = stringToBoolean(attr.nodeValue);
            } else if (/^data-out-*/.test(nodeName)) {
                data.out = data.out || {};
                data.out[nodeName.replace(/data-out-/, '')] =stringToBoolean(attr.nodeValue);
            } else if (/^data-*/.test(nodeName)) {
                data[nodeName.replace(/data-/, '')] = stringToBoolean(attr.nodeValue);
            }
        })

        return data;
    }

    function shuffle (o) {
        for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    function animate ($t, effect, cb) {
        $t.addClass('animated ' + effect)
            .css('visibility', 'visible')
            .show();

        $t.one('animationend webkitAnimationEnd oAnimationEnd', function () {
            $t.removeClass('animated ' + effect);
            cb && cb();
        });
    }

    function animateTokens ($tokens, options, cb) {
        var that = this
            , count = $tokens.length;

        if (!count) {
            cb && cb();
            return;
        }

        if (options.shuffle) $tokens = shuffle($tokens);
        if (options.reverse) $tokens = $tokens.toArray().reverse();

        $.each($tokens, function (i, t) {
            var $token = $(t);

            function complete () {
                if (isInEffect(options.effect)) {
                    $token.css('visibility', 'visible');
                } else if (isOutEffect(options.effect)) {
                    $token.css('visibility', 'hidden');
                }
                count -= 1;
                if (!count && cb) cb();
            }

            var delay = options.sync ? options.delay : options.delay * i * options.delayScale;

            $token.text() ?
                setTimeout(function () { animate($token, options.effect, complete) }, delay) :
                complete();
        });
    };

    var Textillate = function (element, options) {
        var base = this
            , $element = $(element);

        base.init = function () {
            base.$texts = $element.find(options.selector);

            if (!base.$texts.length) {
                base.$texts = $('<ul class="texts"><li>' + $element.html() + '</li></ul>');
                $element.html(base.$texts);
            }

            base.$texts.hide();

            base.$current = $('<span>')
                .html(base.$texts.find(':first-child').html())
                .prependTo($element);

            if (isInEffect(options.in.effect)) {
                base.$current.css('visibility', 'hidden');
            } else if (isOutEffect(options.out.effect)) {
                base.$current.css('visibility', 'visible');
            }

            base.setOptions(options);

            base.timeoutRun = null;

            setTimeout(function () {
                base.options.autoStart && base.start();
            }, base.options.initialDelay)
        };

        base.setOptions = function (options) {
            base.options = options;
        };

        base.triggerEvent = function (name) {
            var e = $.Event(name + '.tlt');
            $element.trigger(e, base);
            return e;
        };

        base.in = function (index, cb) {
            index = index || 0;

            var $elem = base.$texts.find(':nth-child(' + ((index||0) + 1) + ')')
                , options = $.extend(true, {}, base.options, $elem.length ? getData($elem[0]) : {})
                , $tokens;

            $elem.addClass('current');

            base.triggerEvent('inAnimationBegin');

            base.$current
                .html($elem.html())
                .lettering('words');

            // split words to individual characters if token type is set to 'char'
            if (base.options.type == "char") {
                base.$current.find('[class^="word"]')
                    .css({
                        'display': 'inline-block',
                        // fix for poor ios performance
                        '-webkit-transform': 'translate3d(0,0,0)',
                        '-moz-transform': 'translate3d(0,0,0)',
                        '-o-transform': 'translate3d(0,0,0)',
                        'transform': 'translate3d(0,0,0)'
                    })
                    .each(function () { $(this).lettering() });
            }

            $tokens = base.$current
                .find('[class^="' + base.options.type + '"]')
                .css('display', 'inline-block');

            if (isInEffect(options.in.effect)) {
                $tokens.css('visibility', 'hidden');
            } else if (isOutEffect(options.in.effect)) {
                $tokens.css('visibility', 'visible');
            }

            base.currentIndex = index;

            animateTokens($tokens, options.in, function () {
                base.triggerEvent('inAnimationEnd');
                if (options.in.callback) options.in.callback();
                if (cb) cb(base);
            });
        };

        base.out = function (cb) {
            var $elem = base.$texts.find(':nth-child(' + ((base.currentIndex||0) + 1) + ')')
                , $tokens = base.$current.find('[class^="' + base.options.type + '"]')
                , options = $.extend(true, {}, base.options, $elem.length ? getData($elem[0]) : {})

            base.triggerEvent('outAnimationBegin');

            animateTokens($tokens, options.out, function () {
                $elem.removeClass('current');
                base.triggerEvent('outAnimationEnd');
                if (options.out.callback) options.out.callback();
                if (cb) cb(base);
            });
        };

        base.start = function (index) {
            setTimeout(function () {
                base.triggerEvent('start');

                (function run (index) {
                    base.in(index, function () {
                        var length = base.$texts.children().length;

                        index += 1;

                        if (!base.options.loop && index >= length) {
                            if (base.options.callback) base.options.callback();
                            base.triggerEvent('end');
                        } else {
                            index = index % length;

                            base.timeoutRun = setTimeout(function () {
                                base.out(function () {
                                    run(index)
                                });
                            }, base.options.minDisplayTime);
                        }
                    });
                }(index || 0));
            }, base.options.initialDelay);
        };

        base.stop = function () {
            if (base.timeoutRun) {
                clearInterval(base.timeoutRun);
                base.timeoutRun = null;
            }
        };

        base.init();
    }

    $.fn.textillate = function (settings, args) {
        return this.each(function () {
            var $this = $(this)
                , data = $this.data('textillate')
                , options = $.extend(true, {}, $.fn.textillate.defaults, getData(this), typeof settings == 'object' && settings);

            if (!data) {
                $this.data('textillate', (data = new Textillate(this, options)));
            } else if (typeof settings == 'string') {
                data[settings].apply(data, [].concat(args));
            } else {
                data.setOptions.call(data, options);
            }
        })
    };

    $.fn.textillate.defaults = {
        selector: '.texts',
        loop: false,
        minDisplayTime: 2000,
        initialDelay: 0,
        in: {
            effect: 'fadeInLeftBig',
            delayScale: 1.5,
            delay: 50,
            sync: false,
            reverse: false,
            shuffle: false,
            callback: function () {}
        },
        out: {
            effect: 'hinge',
            delayScale: 1.5,
            delay: 50,
            sync: false,
            reverse: false,
            shuffle: false,
            callback: function () {}
        },
        autoStart: true,
        inEffects: [],
        outEffects: [ 'hinge' ],
        callback: function () {},
        type: 'char'
    };

}(jQuery));
/**
 * Vue.js v0.11.10
 * (c) 2015 Evan You
 * Released under the MIT License.
 */

(function webpackUniversalModuleDefinition(root, factory) {
    if(typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if(typeof define === 'function' && define.amd)
        define(factory);
    else if(typeof exports === 'object')
        exports["Vue"] = factory();
    else
        root["Vue"] = factory();
})(this, function() {
    return /******/ (function(modules) { // webpackBootstrap
        /******/ 	// The module cache
        /******/ 	var installedModules = {};

        /******/ 	// The require function
        /******/ 	function __webpack_require__(moduleId) {

            /******/ 		// Check if module is in cache
            /******/ 		if(installedModules[moduleId])
            /******/ 			return installedModules[moduleId].exports;

            /******/ 		// Create a new module (and put it into the cache)
            /******/ 		var module = installedModules[moduleId] = {
                /******/ 			exports: {},
                /******/ 			id: moduleId,
                /******/ 			loaded: false
                /******/ 		};

            /******/ 		// Execute the module function
            /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

            /******/ 		// Flag the module as loaded
            /******/ 		module.loaded = true;

            /******/ 		// Return the exports of the module
            /******/ 		return module.exports;
            /******/ 	}


        /******/ 	// expose the modules object (__webpack_modules__)
        /******/ 	__webpack_require__.m = modules;

        /******/ 	// expose the module cache
        /******/ 	__webpack_require__.c = installedModules;

        /******/ 	// __webpack_public_path__
        /******/ 	__webpack_require__.p = "";

        /******/ 	// Load entry module and return exports
        /******/ 	return __webpack_require__(0);
        /******/ })
        /************************************************************************/
        /******/ ([
        /* 0 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)
            var extend = _.extend

            /**
             * The exposed Vue constructor.
             *
             * API conventions:
             * - public API methods/properties are prefiexed with `$`
             * - internal methods/properties are prefixed with `_`
             * - non-prefixed properties are assumed to be proxied user
             *   data.
             *
             * @constructor
             * @param {Object} [options]
             * @public
             */

            function Vue (options) {
                this._init(options)
            }

            /**
             * Mixin global API
             */

            extend(Vue, __webpack_require__(1))

            /**
             * Vue and every constructor that extends Vue has an
             * associated options object, which can be accessed during
             * compilation steps as `this.constructor.options`.
             *
             * These can be seen as the default options of every
             * Vue instance.
             */

            Vue.options = {
                directives  : __webpack_require__(12),
                filters     : __webpack_require__(13),
                partials    : {},
                transitions : {},
                components  : {}
            }

            /**
             * Build up the prototype
             */

            var p = Vue.prototype

            /**
             * $data has a setter which does a bunch of
             * teardown/setup work
             */

            Object.defineProperty(p, '$data', {
                get: function () {
                    return this._data
                },
                set: function (newData) {
                    this._setData(newData)
                }
            })

            /**
             * Mixin internal instance methods
             */

            extend(p, __webpack_require__(2))
            extend(p, __webpack_require__(3))
            extend(p, __webpack_require__(4))
            extend(p, __webpack_require__(5))

            /**
             * Mixin public API methods
             */

            extend(p, __webpack_require__(6))
            extend(p, __webpack_require__(7))
            extend(p, __webpack_require__(8))
            extend(p, __webpack_require__(9))
            extend(p, __webpack_require__(10))

            module.exports = _.Vue = Vue

            /***/ },
        /* 1 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)
            var mergeOptions = __webpack_require__(14)

            /**
             * Expose useful internals
             */

            exports.util = _
            exports.nextTick = _.nextTick
            exports.config = __webpack_require__(15)

            exports.compiler = {
                compile: __webpack_require__(16),
                transclude: __webpack_require__(17)
            }

            exports.parsers = {
                path: __webpack_require__(18),
                text: __webpack_require__(19),
                template: __webpack_require__(20),
                directive: __webpack_require__(21),
                expression: __webpack_require__(22)
            }

            /**
             * Each instance constructor, including Vue, has a unique
             * cid. This enables us to create wrapped "child
             * constructors" for prototypal inheritance and cache them.
             */

            exports.cid = 0
            var cid = 1

            /**
             * Class inehritance
             *
             * @param {Object} extendOptions
             */

            exports.extend = function (extendOptions) {
                extendOptions = extendOptions || {}
                var Super = this
                var Sub = createClass(
                    extendOptions.name ||
                    Super.options.name ||
                    'VueComponent'
                )
                Sub.prototype = Object.create(Super.prototype)
                Sub.prototype.constructor = Sub
                Sub.cid = cid++
                Sub.options = mergeOptions(
                    Super.options,
                    extendOptions
                )
                Sub['super'] = Super
                // allow further extension
                Sub.extend = Super.extend
                // create asset registers, so extended classes
                // can have their private assets too.
                createAssetRegisters(Sub)
                return Sub
            }

            /**
             * A function that returns a sub-class constructor with the
             * given name. This gives us much nicer output when
             * logging instances in the console.
             *
             * @param {String} name
             * @return {Function}
             */

            function createClass (name) {
                return new Function(
                    'return function ' + _.classify(name) +
                    ' (options) { this._init(options) }'
                )()
            }

            /**
             * Plugin system
             *
             * @param {Object} plugin
             */

            exports.use = function (plugin) {
                // additional parameters
                var args = _.toArray(arguments, 1)
                args.unshift(this)
                if (typeof plugin.install === 'function') {
                    plugin.install.apply(plugin, args)
                } else {
                    plugin.apply(null, args)
                }
                return this
            }

            /**
             * Define asset registration methods on a constructor.
             *
             * @param {Function} Constructor
             */

            var assetTypes = [
                'directive',
                'filter',
                'partial',
                'transition'
            ]

            function createAssetRegisters (Constructor) {

                /* Asset registration methods share the same signature:
                 *
                 * @param {String} id
                 * @param {*} definition
                 */

                assetTypes.forEach(function (type) {
                    Constructor[type] = function (id, definition) {
                        if (!definition) {
                            return this.options[type + 's'][id]
                        } else {
                            this.options[type + 's'][id] = definition
                        }
                    }
                })

                /**
                 * Component registration needs to automatically invoke
                 * Vue.extend on object values.
                 *
                 * @param {String} id
                 * @param {Object|Function} definition
                 */

                Constructor.component = function (id, definition) {
                    if (!definition) {
                        return this.options.components[id]
                    } else {
                        if (_.isPlainObject(definition)) {
                            definition.name = id
                            definition = _.Vue.extend(definition)
                        }
                        this.options.components[id] = definition
                    }
                }
            }

            createAssetRegisters(exports)

            /***/ },
        /* 2 */
        /***/ function(module, exports, __webpack_require__) {

            var mergeOptions = __webpack_require__(14)

            /**
             * The main init sequence. This is called for every
             * instance, including ones that are created from extended
             * constructors.
             *
             * @param {Object} options - this options object should be
             *                           the result of merging class
             *                           options and the options passed
             *                           in to the constructor.
             */

            exports._init = function (options) {

                options = options || {}

                this.$el           = null
                this.$parent       = options._parent
                this.$root         = options._root || this
                this.$             = {} // child vm references
                this.$$            = {} // element references
                this._watcherList  = [] // all watchers as an array
                this._watchers     = {} // internal watchers as a hash
                this._userWatchers = {} // user watchers as a hash
                this._directives   = [] // all directives

                // a flag to avoid this being observed
                this._isVue = true

                // events bookkeeping
                this._events         = {}    // registered callbacks
                this._eventsCount    = {}    // for $broadcast optimization
                this._eventCancelled = false // for event cancellation

                // block instance properties
                this._isBlock     = false
                this._blockStart  =          // @type {CommentNode}
                    this._blockEnd    = null     // @type {CommentNode}

                // lifecycle state
                this._isCompiled  =
                    this._isDestroyed =
                        this._isReady     =
                            this._isAttached  =
                                this._isBeingDestroyed = false

                // children
                this._children = []
                this._childCtors = {}

                // transclusion unlink functions
                this._containerUnlinkFn =
                    this._contentUnlinkFn = null

                // transcluded components that belong to the parent.
                // need to keep track of them so that we can call
                // attached/detached hooks on them.
                this._transCpnts = []
                this._host = options._host

                // push self into parent / transclusion host
                if (this.$parent) {
                    this.$parent._children.push(this)
                }
                if (this._host) {
                    this._host._transCpnts.push(this)
                }

                // props used in v-repeat diffing
                this._new = true
                this._reused = false

                // merge options.
                options = this.$options = mergeOptions(
                    this.constructor.options,
                    options,
                    this
                )

                // set data after merge.
                this._data = options.data || {}

                // initialize data observation and scope inheritance.
                this._initScope()

                // setup event system and option events.
                this._initEvents()

                // call created hook
                this._callHook('created')

                // if `el` option is passed, start compilation.
                if (options.el) {
                    this.$mount(options.el)
                }
            }

            /***/ },
        /* 3 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)
            var inDoc = _.inDoc

            /**
             * Setup the instance's option events & watchers.
             * If the value is a string, we pull it from the
             * instance's methods by name.
             */

            exports._initEvents = function () {
                var options = this.$options
                registerCallbacks(this, '$on', options.events)
                registerCallbacks(this, '$watch', options.watch)
            }

            /**
             * Register callbacks for option events and watchers.
             *
             * @param {Vue} vm
             * @param {String} action
             * @param {Object} hash
             */

            function registerCallbacks (vm, action, hash) {
                if (!hash) return
                var handlers, key, i, j
                for (key in hash) {
                    handlers = hash[key]
                    if (_.isArray(handlers)) {
                        for (i = 0, j = handlers.length; i < j; i++) {
                            register(vm, action, key, handlers[i])
                        }
                    } else {
                        register(vm, action, key, handlers)
                    }
                }
            }

            /**
             * Helper to register an event/watch callback.
             *
             * @param {Vue} vm
             * @param {String} action
             * @param {String} key
             * @param {*} handler
             */

            function register (vm, action, key, handler) {
                var type = typeof handler
                if (type === 'function') {
                    vm[action](key, handler)
                } else if (type === 'string') {
                    var methods = vm.$options.methods
                    var method = methods && methods[handler]
                    if (method) {
                        vm[action](key, method)
                    } else {
                        _.warn(
                            'Unknown method: "' + handler + '" when ' +
                            'registering callback for ' + action +
                            ': "' + key + '".'
                        )
                    }
                }
            }

            /**
             * Setup recursive attached/detached calls
             */

            exports._initDOMHooks = function () {
                this.$on('hook:attached', onAttached)
                this.$on('hook:detached', onDetached)
            }

            /**
             * Callback to recursively call attached hook on children
             */

            function onAttached () {
                this._isAttached = true
                this._children.forEach(callAttach)
                if (this._transCpnts.length) {
                    this._transCpnts.forEach(callAttach)
                }
            }

            /**
             * Iterator to call attached hook
             *
             * @param {Vue} child
             */

            function callAttach (child) {
                if (!child._isAttached && inDoc(child.$el)) {
                    child._callHook('attached')
                }
            }

            /**
             * Callback to recursively call detached hook on children
             */

            function onDetached () {
                this._isAttached = false
                this._children.forEach(callDetach)
                if (this._transCpnts.length) {
                    this._transCpnts.forEach(callDetach)
                }
            }

            /**
             * Iterator to call detached hook
             *
             * @param {Vue} child
             */

            function callDetach (child) {
                if (child._isAttached && !inDoc(child.$el)) {
                    child._callHook('detached')
                }
            }

            /**
             * Trigger all handlers for a hook
             *
             * @param {String} hook
             */

            exports._callHook = function (hook) {
                var handlers = this.$options[hook]
                if (handlers) {
                    for (var i = 0, j = handlers.length; i < j; i++) {
                        handlers[i].call(this)
                    }
                }
                this.$emit('hook:' + hook)
            }

            /***/ },
        /* 4 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)
            var Observer = __webpack_require__(49)
            var Dep = __webpack_require__(23)

            /**
             * Setup the scope of an instance, which contains:
             * - observed data
             * - computed properties
             * - user methods
             * - meta properties
             */

            exports._initScope = function () {
                this._initData()
                this._initComputed()
                this._initMethods()
                this._initMeta()
            }

            /**
             * Initialize the data.
             */

            exports._initData = function () {
                // proxy data on instance
                var data = this._data
                var keys = Object.keys(data)
                var i = keys.length
                var key
                while (i--) {
                    key = keys[i]
                    if (!_.isReserved(key)) {
                        this._proxy(key)
                    }
                }
                // observe data
                Observer.create(data).addVm(this)
            }

            /**
             * Swap the isntance's $data. Called in $data's setter.
             *
             * @param {Object} newData
             */

            exports._setData = function (newData) {
                newData = newData || {}
                var oldData = this._data
                this._data = newData
                var keys, key, i
                // unproxy keys not present in new data
                keys = Object.keys(oldData)
                i = keys.length
                while (i--) {
                    key = keys[i]
                    if (!_.isReserved(key) && !(key in newData)) {
                        this._unproxy(key)
                    }
                }
                // proxy keys not already proxied,
                // and trigger change for changed values
                keys = Object.keys(newData)
                i = keys.length
                while (i--) {
                    key = keys[i]
                    if (!this.hasOwnProperty(key) && !_.isReserved(key)) {
                        // new property
                        this._proxy(key)
                    }
                }
                oldData.__ob__.removeVm(this)
                Observer.create(newData).addVm(this)
                this._digest()
            }

            /**
             * Proxy a property, so that
             * vm.prop === vm._data.prop
             *
             * @param {String} key
             */

            exports._proxy = function (key) {
                // need to store ref to self here
                // because these getter/setters might
                // be called by child instances!
                var self = this
                Object.defineProperty(self, key, {
                    configurable: true,
                    enumerable: true,
                    get: function proxyGetter () {
                        return self._data[key]
                    },
                    set: function proxySetter (val) {
                        self._data[key] = val
                    }
                })
            }

            /**
             * Unproxy a property.
             *
             * @param {String} key
             */

            exports._unproxy = function (key) {
                delete this[key]
            }

            /**
             * Force update on every watcher in scope.
             */

            exports._digest = function () {
                var i = this._watcherList.length
                while (i--) {
                    this._watcherList[i].update()
                }
                var children = this._children
                i = children.length
                while (i--) {
                    var child = children[i]
                    if (child.$options.inherit) {
                        child._digest()
                    }
                }
            }

            /**
             * Setup computed properties. They are essentially
             * special getter/setters
             */

            function noop () {}
            exports._initComputed = function () {
                var computed = this.$options.computed
                if (computed) {
                    for (var key in computed) {
                        var userDef = computed[key]
                        var def = {
                            enumerable: true,
                            configurable: true
                        }
                        if (typeof userDef === 'function') {
                            def.get = _.bind(userDef, this)
                            def.set = noop
                        } else {
                            def.get = userDef.get
                                ? _.bind(userDef.get, this)
                                : noop
                            def.set = userDef.set
                                ? _.bind(userDef.set, this)
                                : noop
                        }
                        Object.defineProperty(this, key, def)
                    }
                }
            }

            /**
             * Setup instance methods. Methods must be bound to the
             * instance since they might be called by children
             * inheriting them.
             */

            exports._initMethods = function () {
                var methods = this.$options.methods
                if (methods) {
                    for (var key in methods) {
                        this[key] = _.bind(methods[key], this)
                    }
                }
            }

            /**
             * Initialize meta information like $index, $key & $value.
             */

            exports._initMeta = function () {
                var metas = this.$options._meta
                if (metas) {
                    for (var key in metas) {
                        this._defineMeta(key, metas[key])
                    }
                }
            }

            /**
             * Define a meta property, e.g $index, $key, $value
             * which only exists on the vm instance but not in $data.
             *
             * @param {String} key
             * @param {*} value
             */

            exports._defineMeta = function (key, value) {
                var dep = new Dep()
                Object.defineProperty(this, key, {
                    enumerable: true,
                    configurable: true,
                    get: function metaGetter () {
                        if (Observer.target) {
                            Observer.target.addDep(dep)
                        }
                        return value
                    },
                    set: function metaSetter (val) {
                        if (val !== value) {
                            value = val
                            dep.notify()
                        }
                    }
                })
            }

            /***/ },
        /* 5 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)
            var Directive = __webpack_require__(24)
            var compile = __webpack_require__(16)
            var transclude = __webpack_require__(17)

            /**
             * Transclude, compile and link element.
             *
             * If a pre-compiled linker is available, that means the
             * passed in element will be pre-transcluded and compiled
             * as well - all we need to do is to call the linker.
             *
             * Otherwise we need to call transclude/compile/link here.
             *
             * @param {Element} el
             * @return {Element}
             */

            exports._compile = function (el) {
                var options = this.$options
                if (options._linkFn) {
                    // pre-transcluded with linker, just use it
                    this._initElement(el)
                    options._linkFn(this, el)
                } else {
                    // transclude and init element
                    // transclude can potentially replace original
                    // so we need to keep reference
                    var original = el
                    el = transclude(el, options)
                    this._initElement(el)
                    // compile and link the rest
                    compile(el, options)(this, el)
                    // finally replace original
                    if (options.replace) {
                        _.replace(original, el)
                    }
                }
                return el
            }

            /**
             * Initialize instance element. Called in the public
             * $mount() method.
             *
             * @param {Element} el
             */

            exports._initElement = function (el) {
                if (el instanceof DocumentFragment) {
                    this._isBlock = true
                    this.$el = this._blockStart = el.firstChild
                    this._blockEnd = el.lastChild
                    this._blockFragment = el
                } else {
                    this.$el = el
                }
                this.$el.__vue__ = this
                this._callHook('beforeCompile')
            }

            /**
             * Create and bind a directive to an element.
             *
             * @param {String} name - directive name
             * @param {Node} node   - target node
             * @param {Object} desc - parsed directive descriptor
             * @param {Object} def  - directive definition object
             * @param {Vue|undefined} host - transclusion host component
             */

            exports._bindDir = function (name, node, desc, def, host) {
                this._directives.push(
                    new Directive(name, node, this, desc, def, host)
                )
            }

            /**
             * Teardown an instance, unobserves the data, unbind all the
             * directives, turn off all the event listeners, etc.
             *
             * @param {Boolean} remove - whether to remove the DOM node.
             * @param {Boolean} deferCleanup - if true, defer cleanup to
             *                                 be called later
             */

            exports._destroy = function (remove, deferCleanup) {
                if (this._isBeingDestroyed) {
                    return
                }
                this._callHook('beforeDestroy')
                this._isBeingDestroyed = true
                var i
                // remove self from parent. only necessary
                // if parent is not being destroyed as well.
                var parent = this.$parent
                if (parent && !parent._isBeingDestroyed) {
                    i = parent._children.indexOf(this)
                    parent._children.splice(i, 1)
                }
                // same for transclusion host.
                var host = this._host
                if (host && !host._isBeingDestroyed) {
                    i = host._transCpnts.indexOf(this)
                    host._transCpnts.splice(i, 1)
                }
                // destroy all children.
                i = this._children.length
                while (i--) {
                    this._children[i].$destroy()
                }
                // teardown all directives. this also tearsdown all
                // directive-owned watchers. intentionally check for
                // directives array length on every loop since directives
                // that manages partial compilation can splice ones out
                for (i = 0; i < this._directives.length; i++) {
                    this._directives[i]._teardown()
                }
                // teardown all user watchers.
                var watcher
                for (i in this._userWatchers) {
                    watcher = this._userWatchers[i]
                    if (watcher) {
                        watcher.teardown()
                    }
                }
                // remove reference to self on $el
                if (this.$el) {
                    this.$el.__vue__ = null
                }
                // remove DOM element
                var self = this
                if (remove && this.$el) {
                    this.$remove(function () {
                        self._cleanup()
                    })
                } else if (!deferCleanup) {
                    this._cleanup()
                }
            }

            /**
             * Clean up to ensure garbage collection.
             * This is called after the leave transition if there
             * is any.
             */

            exports._cleanup = function () {
                // remove reference from data ob
                this._data.__ob__.removeVm(this)
                this._data =
                    this._watchers =
                        this._userWatchers =
                            this._watcherList =
                                this.$el =
                                    this.$parent =
                                        this.$root =
                                            this._children =
                                                this._transCpnts =
                                                    this._directives = null
                // call the last hook...
                this._isDestroyed = true
                this._callHook('destroyed')
                // turn off all instance listeners.
                this.$off()
            }

            /***/ },
        /* 6 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)
            var Watcher = __webpack_require__(25)
            var Path = __webpack_require__(18)
            var textParser = __webpack_require__(19)
            var dirParser = __webpack_require__(21)
            var expParser = __webpack_require__(22)
            var filterRE = /[^|]\|[^|]/

            /**
             * Get the value from an expression on this vm.
             *
             * @param {String} exp
             * @return {*}
             */

            exports.$get = function (exp) {
                var res = expParser.parse(exp)
                if (res) {
                    try {
                        return res.get.call(this, this)
                    } catch (e) {}
                }
            }

            /**
             * Set the value from an expression on this vm.
             * The expression must be a valid left-hand
             * expression in an assignment.
             *
             * @param {String} exp
             * @param {*} val
             */

            exports.$set = function (exp, val) {
                var res = expParser.parse(exp, true)
                if (res && res.set) {
                    res.set.call(this, this, val)
                }
            }

            /**
             * Add a property on the VM
             *
             * @param {String} key
             * @param {*} val
             */

            exports.$add = function (key, val) {
                this._data.$add(key, val)
            }

            /**
             * Delete a property on the VM
             *
             * @param {String} key
             */

            exports.$delete = function (key) {
                this._data.$delete(key)
            }

            /**
             * Watch an expression, trigger callback when its
             * value changes.
             *
             * @param {String} exp
             * @param {Function} cb
             * @param {Boolean} [deep]
             * @param {Boolean} [immediate]
             * @return {Function} - unwatchFn
             */

            exports.$watch = function (exp, cb, deep, immediate) {
                var vm = this
                var key = deep ? exp + '**deep**' : exp
                var watcher = vm._userWatchers[key]
                var wrappedCb = function (val, oldVal) {
                    cb.call(vm, val, oldVal)
                }
                if (!watcher) {
                    watcher = vm._userWatchers[key] =
                        new Watcher(vm, exp, wrappedCb, {
                            deep: deep,
                            user: true
                        })
                } else {
                    watcher.addCb(wrappedCb)
                }
                if (immediate) {
                    wrappedCb(watcher.value)
                }
                return function unwatchFn () {
                    watcher.removeCb(wrappedCb)
                    if (!watcher.active) {
                        vm._userWatchers[key] = null
                    }
                }
            }

            /**
             * Evaluate a text directive, including filters.
             *
             * @param {String} text
             * @return {String}
             */

            exports.$eval = function (text) {
                // check for filters.
                if (filterRE.test(text)) {
                    var dir = dirParser.parse(text)[0]
                    // the filter regex check might give false positive
                    // for pipes inside strings, so it's possible that
                    // we don't get any filters here
                    return dir.filters
                        ? _.applyFilters(
                        this.$get(dir.expression),
                        _.resolveFilters(this, dir.filters).read,
                        this
                    )
                        : this.$get(dir.expression)
                } else {
                    // no filter
                    return this.$get(text)
                }
            }

            /**
             * Interpolate a piece of template text.
             *
             * @param {String} text
             * @return {String}
             */

            exports.$interpolate = function (text) {
                var tokens = textParser.parse(text)
                var vm = this
                if (tokens) {
                    return tokens.length === 1
                        ? vm.$eval(tokens[0].value)
                        : tokens.map(function (token) {
                        return token.tag
                            ? vm.$eval(token.value)
                            : token.value
                    }).join('')
                } else {
                    return text
                }
            }

            /**
             * Log instance data as a plain JS object
             * so that it is easier to inspect in console.
             * This method assumes console is available.
             *
             * @param {String} [path]
             */

            exports.$log = function (path) {
                var data = path
                    ? Path.get(this._data, path)
                    : this._data
                if (data) {
                    data = JSON.parse(JSON.stringify(data))
                }
                console.log(data)
            }

            /***/ },
        /* 7 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)
            var transition = __webpack_require__(50)

            /**
             * Append instance to target
             *
             * @param {Node} target
             * @param {Function} [cb]
             * @param {Boolean} [withTransition] - defaults to true
             */

            exports.$appendTo = function (target, cb, withTransition) {
                return insert(
                    this, target, cb, withTransition,
                    append, transition.append
                )
            }

            /**
             * Prepend instance to target
             *
             * @param {Node} target
             * @param {Function} [cb]
             * @param {Boolean} [withTransition] - defaults to true
             */

            exports.$prependTo = function (target, cb, withTransition) {
                target = query(target)
                if (target.hasChildNodes()) {
                    this.$before(target.firstChild, cb, withTransition)
                } else {
                    this.$appendTo(target, cb, withTransition)
                }
                return this
            }

            /**
             * Insert instance before target
             *
             * @param {Node} target
             * @param {Function} [cb]
             * @param {Boolean} [withTransition] - defaults to true
             */

            exports.$before = function (target, cb, withTransition) {
                return insert(
                    this, target, cb, withTransition,
                    before, transition.before
                )
            }

            /**
             * Insert instance after target
             *
             * @param {Node} target
             * @param {Function} [cb]
             * @param {Boolean} [withTransition] - defaults to true
             */

            exports.$after = function (target, cb, withTransition) {
                target = query(target)
                if (target.nextSibling) {
                    this.$before(target.nextSibling, cb, withTransition)
                } else {
                    this.$appendTo(target.parentNode, cb, withTransition)
                }
                return this
            }

            /**
             * Remove instance from DOM
             *
             * @param {Function} [cb]
             * @param {Boolean} [withTransition] - defaults to true
             */

            exports.$remove = function (cb, withTransition) {
                var inDoc = this._isAttached && _.inDoc(this.$el)
                // if we are not in document, no need to check
                // for transitions
                if (!inDoc) withTransition = false
                var op
                var self = this
                var realCb = function () {
                    if (inDoc) self._callHook('detached')
                    if (cb) cb()
                }
                if (
                    this._isBlock &&
                    !this._blockFragment.hasChildNodes()
                ) {
                    op = withTransition === false
                        ? append
                        : transition.removeThenAppend
                    blockOp(this, this._blockFragment, op, realCb)
                } else {
                    op = withTransition === false
                        ? remove
                        : transition.remove
                    op(this.$el, this, realCb)
                }
                return this
            }

            /**
             * Shared DOM insertion function.
             *
             * @param {Vue} vm
             * @param {Element} target
             * @param {Function} [cb]
             * @param {Boolean} [withTransition]
             * @param {Function} op1 - op for non-transition insert
             * @param {Function} op2 - op for transition insert
             * @return vm
             */

            function insert (vm, target, cb, withTransition, op1, op2) {
                target = query(target)
                var targetIsDetached = !_.inDoc(target)
                var op = withTransition === false || targetIsDetached
                    ? op1
                    : op2
                var shouldCallHook =
                    !targetIsDetached &&
                    !vm._isAttached &&
                    !_.inDoc(vm.$el)
                if (vm._isBlock) {
                    blockOp(vm, target, op, cb)
                } else {
                    op(vm.$el, target, vm, cb)
                }
                if (shouldCallHook) {
                    vm._callHook('attached')
                }
                return vm
            }

            /**
             * Execute a transition operation on a block instance,
             * iterating through all its block nodes.
             *
             * @param {Vue} vm
             * @param {Node} target
             * @param {Function} op
             * @param {Function} cb
             */

            function blockOp (vm, target, op, cb) {
                var current = vm._blockStart
                var end = vm._blockEnd
                var next
                while (next !== end) {
                    next = current.nextSibling
                    op(current, target, vm)
                    current = next
                }
                op(end, target, vm, cb)
            }

            /**
             * Check for selectors
             *
             * @param {String|Element} el
             */

            function query (el) {
                return typeof el === 'string'
                    ? document.querySelector(el)
                    : el
            }

            /**
             * Append operation that takes a callback.
             *
             * @param {Node} el
             * @param {Node} target
             * @param {Vue} vm - unused
             * @param {Function} [cb]
             */

            function append (el, target, vm, cb) {
                target.appendChild(el)
                if (cb) cb()
            }

            /**
             * InsertBefore operation that takes a callback.
             *
             * @param {Node} el
             * @param {Node} target
             * @param {Vue} vm - unused
             * @param {Function} [cb]
             */

            function before (el, target, vm, cb) {
                _.before(el, target)
                if (cb) cb()
            }

            /**
             * Remove operation that takes a callback.
             *
             * @param {Node} el
             * @param {Vue} vm - unused
             * @param {Function} [cb]
             */

            function remove (el, vm, cb) {
                _.remove(el)
                if (cb) cb()
            }

            /***/ },
        /* 8 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)

            /**
             * Listen on the given `event` with `fn`.
             *
             * @param {String} event
             * @param {Function} fn
             */

            exports.$on = function (event, fn) {
                (this._events[event] || (this._events[event] = []))
                    .push(fn)
                modifyListenerCount(this, event, 1)
                return this
            }

            /**
             * Adds an `event` listener that will be invoked a single
             * time then automatically removed.
             *
             * @param {String} event
             * @param {Function} fn
             */

            exports.$once = function (event, fn) {
                var self = this
                function on () {
                    self.$off(event, on)
                    fn.apply(this, arguments)
                }
                on.fn = fn
                this.$on(event, on)
                return this
            }

            /**
             * Remove the given callback for `event` or all
             * registered callbacks.
             *
             * @param {String} event
             * @param {Function} fn
             */

            exports.$off = function (event, fn) {
                var cbs
                // all
                if (!arguments.length) {
                    if (this.$parent) {
                        for (event in this._events) {
                            cbs = this._events[event]
                            if (cbs) {
                                modifyListenerCount(this, event, -cbs.length)
                            }
                        }
                    }
                    this._events = {}
                    return this
                }
                // specific event
                cbs = this._events[event]
                if (!cbs) {
                    return this
                }
                if (arguments.length === 1) {
                    modifyListenerCount(this, event, -cbs.length)
                    this._events[event] = null
                    return this
                }
                // specific handler
                var cb
                var i = cbs.length
                while (i--) {
                    cb = cbs[i]
                    if (cb === fn || cb.fn === fn) {
                        modifyListenerCount(this, event, -1)
                        cbs.splice(i, 1)
                        break
                    }
                }
                return this
            }

            /**
             * Trigger an event on self.
             *
             * @param {String} event
             */

            exports.$emit = function (event) {
                this._eventCancelled = false
                var cbs = this._events[event]
                if (cbs) {
                    // avoid leaking arguments:
                    // http://jsperf.com/closure-with-arguments
                    var i = arguments.length - 1
                    var args = new Array(i)
                    while (i--) {
                        args[i] = arguments[i + 1]
                    }
                    i = 0
                    cbs = cbs.length > 1
                        ? _.toArray(cbs)
                        : cbs
                    for (var l = cbs.length; i < l; i++) {
                        if (cbs[i].apply(this, args) === false) {
                            this._eventCancelled = true
                        }
                    }
                }
                return this
            }

            /**
             * Recursively broadcast an event to all children instances.
             *
             * @param {String} event
             * @param {...*} additional arguments
             */

            exports.$broadcast = function (event) {
                // if no child has registered for this event,
                // then there's no need to broadcast.
                if (!this._eventsCount[event]) return
                var children = this._children
                for (var i = 0, l = children.length; i < l; i++) {
                    var child = children[i]
                    child.$emit.apply(child, arguments)
                    if (!child._eventCancelled) {
                        child.$broadcast.apply(child, arguments)
                    }
                }
                return this
            }

            /**
             * Recursively propagate an event up the parent chain.
             *
             * @param {String} event
             * @param {...*} additional arguments
             */

            exports.$dispatch = function () {
                var parent = this.$parent
                while (parent) {
                    parent.$emit.apply(parent, arguments)
                    parent = parent._eventCancelled
                        ? null
                        : parent.$parent
                }
                return this
            }

            /**
             * Modify the listener counts on all parents.
             * This bookkeeping allows $broadcast to return early when
             * no child has listened to a certain event.
             *
             * @param {Vue} vm
             * @param {String} event
             * @param {Number} count
             */

            var hookRE = /^hook:/
            function modifyListenerCount (vm, event, count) {
                var parent = vm.$parent
                // hooks do not get broadcasted so no need
                // to do bookkeeping for them
                if (!parent || !count || hookRE.test(event)) return
                while (parent) {
                    parent._eventsCount[event] =
                        (parent._eventsCount[event] || 0) + count
                    parent = parent.$parent
                }
            }

            /***/ },
        /* 9 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)

            /**
             * Create a child instance that prototypally inehrits
             * data on parent. To achieve that we create an intermediate
             * constructor with its prototype pointing to parent.
             *
             * @param {Object} opts
             * @param {Function} [BaseCtor]
             * @return {Vue}
             * @public
             */

            exports.$addChild = function (opts, BaseCtor) {
                BaseCtor = BaseCtor || _.Vue
                opts = opts || {}
                var parent = this
                var ChildVue
                var inherit = opts.inherit !== undefined
                    ? opts.inherit
                    : BaseCtor.options.inherit
                if (inherit) {
                    var ctors = parent._childCtors
                    ChildVue = ctors[BaseCtor.cid]
                    if (!ChildVue) {
                        var optionName = BaseCtor.options.name
                        var className = optionName
                            ? _.classify(optionName)
                            : 'VueComponent'
                        ChildVue = new Function(
                            'return function ' + className + ' (options) {' +
                            'this.constructor = ' + className + ';' +
                            'this._init(options) }'
                        )()
                        ChildVue.options = BaseCtor.options
                        ChildVue.prototype = this
                        ctors[BaseCtor.cid] = ChildVue
                    }
                } else {
                    ChildVue = BaseCtor
                }
                opts._parent = parent
                opts._root = parent.$root
                var child = new ChildVue(opts)
                return child
            }

            /***/ },
        /* 10 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)
            var compile = __webpack_require__(16)

            /**
             * Set instance target element and kick off the compilation
             * process. The passed in `el` can be a selector string, an
             * existing Element, or a DocumentFragment (for block
             * instances).
             *
             * @param {Element|DocumentFragment|string} el
             * @public
             */

            exports.$mount = function (el) {
                if (this._isCompiled) {
                    _.warn('$mount() should be called only once.')
                    return
                }
                if (!el) {
                    el = document.createElement('div')
                } else if (typeof el === 'string') {
                    var selector = el
                    el = document.querySelector(el)
                    if (!el) {
                        _.warn('Cannot find element: ' + selector)
                        return
                    }
                }
                this._compile(el)
                this._isCompiled = true
                this._callHook('compiled')
                if (_.inDoc(this.$el)) {
                    this._callHook('attached')
                    this._initDOMHooks()
                    ready.call(this)
                } else {
                    this._initDOMHooks()
                    this.$once('hook:attached', ready)
                }
                return this
            }

            /**
             * Mark an instance as ready.
             */

            function ready () {
                this._isAttached = true
                this._isReady = true
                this._callHook('ready')
            }

            /**
             * Teardown the instance, simply delegate to the internal
             * _destroy.
             */

            exports.$destroy = function (remove, deferCleanup) {
                this._destroy(remove, deferCleanup)
            }

            /**
             * Partially compile a piece of DOM and return a
             * decompile function.
             *
             * @param {Element|DocumentFragment} el
             * @return {Function}
             */

            exports.$compile = function (el) {
                return compile(el, this.$options, true)(this, el)
            }

            /***/ },
        /* 11 */
        /***/ function(module, exports, __webpack_require__) {

            var lang   = __webpack_require__(26)
            var extend = lang.extend

            extend(exports, lang)
            extend(exports, __webpack_require__(27))
            extend(exports, __webpack_require__(28))
            extend(exports, __webpack_require__(29))
            extend(exports, __webpack_require__(30))

            /***/ },
        /* 12 */
        /***/ function(module, exports, __webpack_require__) {

            // manipulation directives
            exports.text       = __webpack_require__(31)
            exports.html       = __webpack_require__(32)
            exports.attr       = __webpack_require__(33)
            exports.show       = __webpack_require__(34)
            exports['class']   = __webpack_require__(35)
            exports.el         = __webpack_require__(36)
            exports.ref        = __webpack_require__(37)
            exports.cloak      = __webpack_require__(38)
            exports.style      = __webpack_require__(39)
            exports.partial    = __webpack_require__(40)
            exports.transition = __webpack_require__(41)

            // event listener directives
            exports.on         = __webpack_require__(42)
            exports.model      = __webpack_require__(51)

            // child vm directives
            exports.component  = __webpack_require__(43)
            exports.repeat     = __webpack_require__(44)
            exports['if']      = __webpack_require__(45)

            // child vm communication directives
            exports['with']    = __webpack_require__(46)
            exports.events     = __webpack_require__(47)

            /***/ },
        /* 13 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)

            /**
             * Stringify value.
             *
             * @param {Number} indent
             */

            exports.json = {
                read: function (value, indent) {
                    return typeof value === 'string'
                        ? value
                        : JSON.stringify(value, null, Number(indent) || 2)
                },
                write: function (value) {
                    try {
                        return JSON.parse(value)
                    } catch (e) {
                        return value
                    }
                }
            }

            /**
             * 'abc' => 'Abc'
             */

            exports.capitalize = function (value) {
                if (!value && value !== 0) return ''
                value = value.toString()
                return value.charAt(0).toUpperCase() + value.slice(1)
            }

            /**
             * 'abc' => 'ABC'
             */

            exports.uppercase = function (value) {
                return (value || value === 0)
                    ? value.toString().toUpperCase()
                    : ''
            }

            /**
             * 'AbC' => 'abc'
             */

            exports.lowercase = function (value) {
                return (value || value === 0)
                    ? value.toString().toLowerCase()
                    : ''
            }

            /**
             * 12345 => $12,345.00
             *
             * @param {String} sign
             */

            var digitsRE = /(\d{3})(?=\d)/g

            exports.currency = function (value, sign) {
                value = parseFloat(value)
                if (!isFinite(value) || (!value && value !== 0)) return ''
                sign = sign || '$'
                var s = Math.floor(Math.abs(value)).toString(),
                    i = s.length % 3,
                    h = i > 0
                        ? (s.slice(0, i) + (s.length > 3 ? ',' : ''))
                        : '',
                    v = Math.abs(parseInt((value * 100) % 100, 10)),
                    f = '.' + (v < 10 ? ('0' + v) : v)
                return (value < 0 ? '-' : '') +
                    sign + h + s.slice(i).replace(digitsRE, '$1,') + f
            }

            /**
             * 'item' => 'items'
             *
             * @params
             *  an array of strings corresponding to
             *  the single, double, triple ... forms of the word to
             *  be pluralized. When the number to be pluralized
             *  exceeds the length of the args, it will use the last
             *  entry in the array.
             *
             *  e.g. ['single', 'double', 'triple', 'multiple']
             */

            exports.pluralize = function (value) {
                var args = _.toArray(arguments, 1)
                return args.length > 1
                    ? (args[value % 10 - 1] || args[args.length - 1])
                    : (args[0] + (value === 1 ? '' : 's'))
            }

            /**
             * A special filter that takes a handler function,
             * wraps it so it only gets triggered on specific
             * keypresses. v-on only.
             *
             * @param {String} key
             */

            var keyCodes = {
                enter    : 13,
                tab      : 9,
                'delete' : 46,
                up       : 38,
                left     : 37,
                right    : 39,
                down     : 40,
                esc      : 27
            }

            exports.key = function (handler, key) {
                if (!handler) return
                var code = keyCodes[key]
                if (!code) {
                    code = parseInt(key, 10)
                }
                return function (e) {
                    if (e.keyCode === code) {
                        return handler.call(this, e)
                    }
                }
            }

            // expose keycode hash
            exports.key.keyCodes = keyCodes

            /**
             * Install special array filters
             */

            _.extend(exports, __webpack_require__(48))


            /***/ },
        /* 14 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)
            var extend = _.extend

            /**
             * Option overwriting strategies are functions that handle
             * how to merge a parent option value and a child option
             * value into the final value.
             *
             * All strategy functions follow the same signature:
             *
             * @param {*} parentVal
             * @param {*} childVal
             * @param {Vue} [vm]
             */

            var strats = Object.create(null)

            /**
             * Helper that recursively merges two data objects together.
             */

            function mergeData (to, from) {
                var key, toVal, fromVal
                for (key in from) {
                    toVal = to[key]
                    fromVal = from[key]
                    if (!to.hasOwnProperty(key)) {
                        to.$add(key, fromVal)
                    } else if (_.isObject(toVal) && _.isObject(fromVal)) {
                        mergeData(toVal, fromVal)
                    }
                }
                return to
            }

            /**
             * Data
             */

            strats.data = function (parentVal, childVal, vm) {
                if (!vm) {
                    // in a Vue.extend merge, both should be functions
                    if (!childVal) {
                        return parentVal
                    }
                    if (typeof childVal !== 'function') {
                        _.warn(
                            'The "data" option should be a function ' +
                            'that returns a per-instance value in component ' +
                            'definitions.'
                        )
                        return parentVal
                    }
                    if (!parentVal) {
                        return childVal
                    }
                    // when parentVal & childVal are both present,
                    // we need to return a function that returns the
                    // merged result of both functions... no need to
                    // check if parentVal is a function here because
                    // it has to be a function to pass previous merges.
                    return function mergedDataFn () {
                        return mergeData(
                            childVal.call(this),
                            parentVal.call(this)
                        )
                    }
                } else {
                    // instance merge, return raw object
                    var instanceData = typeof childVal === 'function'
                        ? childVal.call(vm)
                        : childVal
                    var defaultData = typeof parentVal === 'function'
                        ? parentVal.call(vm)
                        : undefined
                    if (instanceData) {
                        return mergeData(instanceData, defaultData)
                    } else {
                        return defaultData
                    }
                }
            }

            /**
             * El
             */

            strats.el = function (parentVal, childVal, vm) {
                if (!vm && childVal && typeof childVal !== 'function') {
                    _.warn(
                        'The "el" option should be a function ' +
                        'that returns a per-instance value in component ' +
                        'definitions.'
                    )
                    return
                }
                var ret = childVal || parentVal
                // invoke the element factory if this is instance merge
                return vm && typeof ret === 'function'
                    ? ret.call(vm)
                    : ret
            }

            /**
             * Hooks and param attributes are merged as arrays.
             */

            strats.created =
                strats.ready =
                    strats.attached =
                        strats.detached =
                            strats.beforeCompile =
                                strats.compiled =
                                    strats.beforeDestroy =
                                        strats.destroyed =
                                            strats.paramAttributes = function (parentVal, childVal) {
                                                return childVal
                                                    ? parentVal
                                                    ? parentVal.concat(childVal)
                                                    : _.isArray(childVal)
                                                    ? childVal
                                                    : [childVal]
                                                    : parentVal
                                            }

            /**
             * Assets
             *
             * When a vm is present (instance creation), we need to do
             * a three-way merge between constructor options, instance
             * options and parent options.
             */

            strats.directives =
                strats.filters =
                    strats.partials =
                        strats.transitions =
                            strats.components = function (parentVal, childVal, vm, key) {
                                var ret = Object.create(
                                    vm && vm.$parent
                                        ? vm.$parent.$options[key]
                                        : _.Vue.options[key]
                                )
                                if (parentVal) {
                                    var keys = Object.keys(parentVal)
                                    var i = keys.length
                                    var field
                                    while (i--) {
                                        field = keys[i]
                                        ret[field] = parentVal[field]
                                    }
                                }
                                if (childVal) extend(ret, childVal)
                                return ret
                            }

            /**
             * Events & Watchers.
             *
             * Events & watchers hashes should not overwrite one
             * another, so we merge them as arrays.
             */

            strats.watch =
                strats.events = function (parentVal, childVal) {
                    if (!childVal) return parentVal
                    if (!parentVal) return childVal
                    var ret = {}
                    extend(ret, parentVal)
                    for (var key in childVal) {
                        var parent = ret[key]
                        var child = childVal[key]
                        if (parent && !_.isArray(parent)) {
                            parent = [parent]
                        }
                        ret[key] = parent
                            ? parent.concat(child)
                            : [child]
                    }
                    return ret
                }

            /**
             * Other object hashes.
             */

            strats.methods =
                strats.computed = function (parentVal, childVal) {
                    if (!childVal) return parentVal
                    if (!parentVal) return childVal
                    var ret = Object.create(parentVal)
                    extend(ret, childVal)
                    return ret
                }

            /**
             * Default strategy.
             */

            var defaultStrat = function (parentVal, childVal) {
                return childVal === undefined
                    ? parentVal
                    : childVal
            }

            /**
             * Make sure component options get converted to actual
             * constructors.
             *
             * @param {Object} components
             */

            function guardComponents (components) {
                if (components) {
                    var def
                    for (var key in components) {
                        def = components[key]
                        if (_.isPlainObject(def)) {
                            def.name = key
                            components[key] = _.Vue.extend(def)
                        }
                    }
                }
            }

            /**
             * Merge two option objects into a new one.
             * Core utility used in both instantiation and inheritance.
             *
             * @param {Object} parent
             * @param {Object} child
             * @param {Vue} [vm] - if vm is present, indicates this is
             *                     an instantiation merge.
             */

            module.exports = function mergeOptions (parent, child, vm) {
                guardComponents(child.components)
                var options = {}
                var key
                if (child.mixins) {
                    for (var i = 0, l = child.mixins.length; i < l; i++) {
                        parent = mergeOptions(parent, child.mixins[i], vm)
                    }
                }
                for (key in parent) {
                    merge(key)
                }
                for (key in child) {
                    if (!(parent.hasOwnProperty(key))) {
                        merge(key)
                    }
                }
                function merge (key) {
                    var strat = strats[key] || defaultStrat
                    options[key] = strat(parent[key], child[key], vm, key)
                }
                return options
            }

            /***/ },
        /* 15 */
        /***/ function(module, exports, __webpack_require__) {

            module.exports = {

                /**
                 * The prefix to look for when parsing directives.
                 *
                 * @type {String}
                 */

                prefix: 'v-',

                /**
                 * Whether to print debug messages.
                 * Also enables stack trace for warnings.
                 *
                 * @type {Boolean}
                 */

                debug: false,

                /**
                 * Whether to suppress warnings.
                 *
                 * @type {Boolean}
                 */

                silent: false,

                /**
                 * Whether allow observer to alter data objects'
                 * __proto__.
                 *
                 * @type {Boolean}
                 */

                proto: true,

                /**
                 * Whether to parse mustache tags in templates.
                 *
                 * @type {Boolean}
                 */

                interpolate: true,

                /**
                 * Whether to use async rendering.
                 */

                async: true,

                /**
                 * Whether to warn against errors caught when evaluating
                 * expressions.
                 */

                warnExpressionErrors: true,

                /**
                 * Internal flag to indicate the delimiters have been
                 * changed.
                 *
                 * @type {Boolean}
                 */

                _delimitersChanged: true

            }

            /**
             * Interpolation delimiters.
             * We need to mark the changed flag so that the text parser
             * knows it needs to recompile the regex.
             *
             * @type {Array<String>}
             */

            var delimiters = ['{{', '}}']
            Object.defineProperty(module.exports, 'delimiters', {
                get: function () {
                    return delimiters
                },
                set: function (val) {
                    delimiters = val
                    this._delimitersChanged = true
                }
            })

            /***/ },
        /* 16 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)
            var config = __webpack_require__(15)
            var textParser = __webpack_require__(19)
            var dirParser = __webpack_require__(21)
            var templateParser = __webpack_require__(20)

            module.exports = compile

            /**
             * Compile a template and return a reusable composite link
             * function, which recursively contains more link functions
             * inside. This top level compile function should only be
             * called on instance root nodes.
             *
             * @param {Element|DocumentFragment} el
             * @param {Object} options
             * @param {Boolean} partial
             * @param {Boolean} transcluded
             * @return {Function}
             */

            function compile (el, options, partial, transcluded) {
                var isBlock = el.nodeType === 11
                // link function for param attributes.
                var params = options.paramAttributes
                var paramsLinkFn = params && !partial && !transcluded && !isBlock
                    ? compileParamAttributes(el, params, options)
                    : null
                // link function for the node itself.
                // if this is a block instance, we return a link function
                // for the attributes found on the container, if any.
                // options._containerAttrs are collected during transclusion.
                var nodeLinkFn = isBlock
                    ? compileBlockContainer(options._containerAttrs, params, options)
                    : compileNode(el, options)
                // link function for the childNodes
                var childLinkFn =
                    !(nodeLinkFn && nodeLinkFn.terminal) &&
                    el.tagName !== 'SCRIPT' &&
                    el.hasChildNodes()
                        ? compileNodeList(el.childNodes, options)
                        : null

                /**
                 * A composite linker function to be called on a already
                 * compiled piece of DOM, which instantiates all directive
                 * instances.
                 *
                 * @param {Vue} vm
                 * @param {Element|DocumentFragment} el
                 * @return {Function|undefined}
                 */

                function compositeLinkFn (vm, el) {
                    var originalDirCount = vm._directives.length
                    var parentOriginalDirCount =
                        vm.$parent && vm.$parent._directives.length
                    if (paramsLinkFn) {
                        paramsLinkFn(vm, el)
                    }
                    // cache childNodes before linking parent, fix #657
                    var childNodes = _.toArray(el.childNodes)
                    // if this is a transcluded compile, linkers need to be
                    // called in source scope, and the host needs to be
                    // passed down.
                    var source = transcluded ? vm.$parent : vm
                    var host = transcluded ? vm : undefined
                    // link
                    if (nodeLinkFn) nodeLinkFn(source, el, host)
                    if (childLinkFn) childLinkFn(source, childNodes, host)

                    /**
                     * If this is a partial compile, the linker function
                     * returns an unlink function that tearsdown all
                     * directives instances generated during the partial
                     * linking.
                     */

                    if (partial && !transcluded) {
                        var selfDirs = vm._directives.slice(originalDirCount)
                        var parentDirs = vm.$parent &&
                            vm.$parent._directives.slice(parentOriginalDirCount)

                        var teardownDirs = function (vm, dirs) {
                            var i = dirs.length
                            while (i--) {
                                dirs[i]._teardown()
                            }
                            i = vm._directives.indexOf(dirs[0])
                            vm._directives.splice(i, dirs.length)
                        }

                        return function unlink () {
                            teardownDirs(vm, selfDirs)
                            if (parentDirs) {
                                teardownDirs(vm.$parent, parentDirs)
                            }
                        }
                    }
                }

                // transcluded linkFns are terminal, because it takes
                // over the entire sub-tree.
                if (transcluded) {
                    compositeLinkFn.terminal = true
                }

                return compositeLinkFn
            }

            /**
             * Compile the attributes found on a "block container" -
             * i.e. the container node in the parent tempate of a block
             * instance. We are only concerned with v-with and
             * paramAttributes here.
             *
             * @param {Object} attrs - a map of attr name/value pairs
             * @param {Array} params - param attributes list
             * @param {Object} options
             * @return {Function}
             */

            function compileBlockContainer (attrs, params, options) {
                if (!attrs) return null
                var paramsLinkFn = params
                    ? compileParamAttributes(attrs, params, options)
                    : null
                var withVal = attrs[config.prefix + 'with']
                var withLinkFn = null
                if (withVal) {
                    var descriptor = dirParser.parse(withVal)[0]
                    var def = options.directives['with']
                    withLinkFn = function (vm, el) {
                        vm._bindDir('with', el, descriptor, def)
                    }
                }
                return function blockContainerLinkFn (vm) {
                    // explicitly passing null to the linkers
                    // since v-with doesn't need a real element
                    if (paramsLinkFn) paramsLinkFn(vm, null)
                    if (withLinkFn) withLinkFn(vm, null)
                }
            }

            /**
             * Compile a node and return a nodeLinkFn based on the
             * node type.
             *
             * @param {Node} node
             * @param {Object} options
             * @return {Function|null}
             */

            function compileNode (node, options) {
                var type = node.nodeType
                if (type === 1 && node.tagName !== 'SCRIPT') {
                    return compileElement(node, options)
                } else if (type === 3 && config.interpolate && node.data.trim()) {
                    return compileTextNode(node, options)
                } else {
                    return null
                }
            }

            /**
             * Compile an element and return a nodeLinkFn.
             *
             * @param {Element} el
             * @param {Object} options
             * @return {Function|null}
             */

            function compileElement (el, options) {
                if (checkTransclusion(el)) {
                    // unwrap textNode
                    if (el.hasAttribute('__vue__wrap')) {
                        el = el.firstChild
                    }
                    return compile(el, options._parent.$options, true, true)
                }
                var linkFn, tag, component
                // check custom element component, but only on non-root
                if (!el.__vue__) {
                    tag = el.tagName.toLowerCase()
                    component =
                        tag.indexOf('-') > 0 &&
                        options.components[tag]
                    if (component) {
                        el.setAttribute(config.prefix + 'component', tag)
                    }
                }
                if (component || el.hasAttributes()) {
                    // check terminal direcitves
                    linkFn = checkTerminalDirectives(el, options)
                    // if not terminal, build normal link function
                    if (!linkFn) {
                        var dirs = collectDirectives(el, options)
                        linkFn = dirs.length
                            ? makeNodeLinkFn(dirs)
                            : null
                    }
                }
                // if the element is a textarea, we need to interpolate
                // its content on initial render.
                if (el.tagName === 'TEXTAREA') {
                    var realLinkFn = linkFn
                    linkFn = function (vm, el) {
                        el.value = vm.$interpolate(el.value)
                        if (realLinkFn) realLinkFn(vm, el)
                    }
                    linkFn.terminal = true
                }
                return linkFn
            }

            /**
             * Build a link function for all directives on a single node.
             *
             * @param {Array} directives
             * @return {Function} directivesLinkFn
             */

            function makeNodeLinkFn (directives) {
                return function nodeLinkFn (vm, el, host) {
                    // reverse apply because it's sorted low to high
                    var i = directives.length
                    var dir, j, k, target
                    while (i--) {
                        dir = directives[i]
                        // a directive can be transcluded if it's written
                        // on a component's container in its parent tempalte.
                        target = dir.transcluded
                            ? vm.$parent
                            : vm
                        if (dir._link) {
                            // custom link fn
                            dir._link(target, el)
                        } else {
                            k = dir.descriptors.length
                            for (j = 0; j < k; j++) {
                                target._bindDir(dir.name, el,
                                    dir.descriptors[j], dir.def, host)
                            }
                        }
                    }
                }
            }

            /**
             * Compile a textNode and return a nodeLinkFn.
             *
             * @param {TextNode} node
             * @param {Object} options
             * @return {Function|null} textNodeLinkFn
             */

            function compileTextNode (node, options) {
                var tokens = textParser.parse(node.data)
                if (!tokens) {
                    return null
                }
                var frag = document.createDocumentFragment()
                var el, token
                for (var i = 0, l = tokens.length; i < l; i++) {
                    token = tokens[i]
                    el = token.tag
                        ? processTextToken(token, options)
                        : document.createTextNode(token.value)
                    frag.appendChild(el)
                }
                return makeTextNodeLinkFn(tokens, frag, options)
            }

            /**
             * Process a single text token.
             *
             * @param {Object} token
             * @param {Object} options
             * @return {Node}
             */

            function processTextToken (token, options) {
                var el
                if (token.oneTime) {
                    el = document.createTextNode(token.value)
                } else {
                    if (token.html) {
                        el = document.createComment('v-html')
                        setTokenType('html')
                    } else if (token.partial) {
                        el = document.createComment('v-partial')
                        setTokenType('partial')
                    } else {
                        // IE will clean up empty textNodes during
                        // frag.cloneNode(true), so we have to give it
                        // something here...
                        el = document.createTextNode(' ')
                        setTokenType('text')
                    }
                }
                function setTokenType (type) {
                    token.type = type
                    token.def = options.directives[type]
                    token.descriptor = dirParser.parse(token.value)[0]
                }
                return el
            }

            /**
             * Build a function that processes a textNode.
             *
             * @param {Array<Object>} tokens
             * @param {DocumentFragment} frag
             */

            function makeTextNodeLinkFn (tokens, frag) {
                return function textNodeLinkFn (vm, el) {
                    var fragClone = frag.cloneNode(true)
                    var childNodes = _.toArray(fragClone.childNodes)
                    var token, value, node
                    for (var i = 0, l = tokens.length; i < l; i++) {
                        token = tokens[i]
                        value = token.value
                        if (token.tag) {
                            node = childNodes[i]
                            if (token.oneTime) {
                                value = vm.$eval(value)
                                if (token.html) {
                                    _.replace(node, templateParser.parse(value, true))
                                } else {
                                    node.data = value
                                }
                            } else {
                                vm._bindDir(token.type, node,
                                    token.descriptor, token.def)
                            }
                        }
                    }
                    _.replace(el, fragClone)
                }
            }

            /**
             * Compile a node list and return a childLinkFn.
             *
             * @param {NodeList} nodeList
             * @param {Object} options
             * @return {Function|undefined}
             */

            function compileNodeList (nodeList, options) {
                var linkFns = []
                var nodeLinkFn, childLinkFn, node
                for (var i = 0, l = nodeList.length; i < l; i++) {
                    node = nodeList[i]
                    nodeLinkFn = compileNode(node, options)
                    childLinkFn =
                        !(nodeLinkFn && nodeLinkFn.terminal) &&
                        node.tagName !== 'SCRIPT' &&
                        node.hasChildNodes()
                            ? compileNodeList(node.childNodes, options)
                            : null
                    linkFns.push(nodeLinkFn, childLinkFn)
                }
                return linkFns.length
                    ? makeChildLinkFn(linkFns)
                    : null
            }

            /**
             * Make a child link function for a node's childNodes.
             *
             * @param {Array<Function>} linkFns
             * @return {Function} childLinkFn
             */

            function makeChildLinkFn (linkFns) {
                return function childLinkFn (vm, nodes, host) {
                    var node, nodeLinkFn, childrenLinkFn
                    for (var i = 0, n = 0, l = linkFns.length; i < l; n++) {
                        node = nodes[n]
                        nodeLinkFn = linkFns[i++]
                        childrenLinkFn = linkFns[i++]
                        // cache childNodes before linking parent, fix #657
                        var childNodes = _.toArray(node.childNodes)
                        if (nodeLinkFn) {
                            nodeLinkFn(vm, node, host)
                        }
                        if (childrenLinkFn) {
                            childrenLinkFn(vm, childNodes, host)
                        }
                    }
                }
            }

            /**
             * Compile param attributes on a root element and return
             * a paramAttributes link function.
             *
             * @param {Element|Object} el
             * @param {Array} attrs
             * @param {Object} options
             * @return {Function} paramsLinkFn
             */

            function compileParamAttributes (el, attrs, options) {
                var params = []
                var isEl = el.nodeType
                var i = attrs.length
                var name, value, param
                while (i--) {
                    name = attrs[i]
                    if (/[A-Z]/.test(name)) {
                        _.warn(
                            'You seem to be using camelCase for a paramAttribute, ' +
                            'but HTML doesn\'t differentiate between upper and ' +
                            'lower case. You should use hyphen-delimited ' +
                            'attribute names. For more info see ' +
                            'http://vuejs.org/api/options.html#paramAttributes'
                        )
                    }
                    value = isEl ? el.getAttribute(name) : el[name]
                    if (value !== null) {
                        param = {
                            name: name,
                            value: value
                        }
                        var tokens = textParser.parse(value)
                        if (tokens) {
                            if (isEl) el.removeAttribute(name)
                            if (tokens.length > 1) {
                                _.warn(
                                    'Invalid param attribute binding: "' +
                                    name + '="' + value + '"' +
                                    '\nDon\'t mix binding tags with plain text ' +
                                    'in param attribute bindings.'
                                )
                                continue
                            } else {
                                param.dynamic = true
                                param.value = tokens[0].value
                            }
                        }
                        params.push(param)
                    }
                }
                return makeParamsLinkFn(params, options)
            }

            /**
             * Build a function that applies param attributes to a vm.
             *
             * @param {Array} params
             * @param {Object} options
             * @return {Function} paramsLinkFn
             */

            var dataAttrRE = /^data-/

            function makeParamsLinkFn (params, options) {
                var def = options.directives['with']
                return function paramsLinkFn (vm, el) {
                    var i = params.length
                    var param, path
                    while (i--) {
                        param = params[i]
                        // params could contain dashes, which will be
                        // interpreted as minus calculations by the parser
                        // so we need to wrap the path here
                        path = _.camelize(param.name.replace(dataAttrRE, ''))
                        if (param.dynamic) {
                            // dynamic param attribtues are bound as v-with.
                            // we can directly duck the descriptor here beacuse
                            // param attributes cannot use expressions or
                            // filters.
                            vm._bindDir('with', el, {
                                arg: path,
                                expression: param.value
                            }, def)
                        } else {
                            // just set once
                            vm.$set(path, param.value)
                        }
                    }
                }
            }

            /**
             * Check an element for terminal directives in fixed order.
             * If it finds one, return a terminal link function.
             *
             * @param {Element} el
             * @param {Object} options
             * @return {Function} terminalLinkFn
             */

            var terminalDirectives = [
                'repeat',
                'if',
                'component'
            ]

            function skip () {}
            skip.terminal = true

            function checkTerminalDirectives (el, options) {
                if (_.attr(el, 'pre') !== null) {
                    return skip
                }
                var value, dirName
                /* jshint boss: true */
                for (var i = 0; i < 3; i++) {
                    dirName = terminalDirectives[i]
                    if (value = _.attr(el, dirName)) {
                        return makeTerminalNodeLinkFn(el, dirName, value, options)
                    }
                }
            }

            /**
             * Build a node link function for a terminal directive.
             * A terminal link function terminates the current
             * compilation recursion and handles compilation of the
             * subtree in the directive.
             *
             * @param {Element} el
             * @param {String} dirName
             * @param {String} value
             * @param {Object} options
             * @return {Function} terminalLinkFn
             */

            function makeTerminalNodeLinkFn (el, dirName, value, options) {
                var descriptor = dirParser.parse(value)[0]
                var def = options.directives[dirName]
                var fn = function terminalNodeLinkFn (vm, el, host) {
                    vm._bindDir(dirName, el, descriptor, def, host)
                }
                fn.terminal = true
                return fn
            }

            /**
             * Collect the directives on an element.
             *
             * @param {Element} el
             * @param {Object} options
             * @return {Array}
             */

            function collectDirectives (el, options) {
                var attrs = _.toArray(el.attributes)
                var i = attrs.length
                var dirs = []
                var attr, attrName, dir, dirName, dirDef, transcluded
                while (i--) {
                    attr = attrs[i]
                    attrName = attr.name
                    transcluded =
                        options._transcludedAttrs &&
                        options._transcludedAttrs[attrName]
                    if (attrName.indexOf(config.prefix) === 0) {
                        dirName = attrName.slice(config.prefix.length)
                        dirDef = options.directives[dirName]
                        _.assertAsset(dirDef, 'directive', dirName)
                        if (dirDef) {
                            dirs.push({
                                name: dirName,
                                descriptors: dirParser.parse(attr.value),
                                def: dirDef,
                                transcluded: transcluded
                            })
                        }
                    } else if (config.interpolate) {
                        dir = collectAttrDirective(el, attrName, attr.value,
                            options)
                        if (dir) {
                            dir.transcluded = transcluded
                            dirs.push(dir)
                        }
                    }
                }
                // sort by priority, LOW to HIGH
                dirs.sort(directiveComparator)
                return dirs
            }

            /**
             * Check an attribute for potential dynamic bindings,
             * and return a directive object.
             *
             * @param {Element} el
             * @param {String} name
             * @param {String} value
             * @param {Object} options
             * @return {Object}
             */

            function collectAttrDirective (el, name, value, options) {
                var tokens = textParser.parse(value)
                if (tokens) {
                    var def = options.directives.attr
                    var i = tokens.length
                    var allOneTime = true
                    while (i--) {
                        var token = tokens[i]
                        if (token.tag && !token.oneTime) {
                            allOneTime = false
                        }
                    }
                    return {
                        def: def,
                        _link: allOneTime
                            ? function (vm, el) {
                            el.setAttribute(name, vm.$interpolate(value))
                        }
                            : function (vm, el) {
                            var value = textParser.tokensToExp(tokens, vm)
                            var desc = dirParser.parse(name + ':' + value)[0]
                            vm._bindDir('attr', el, desc, def)
                        }
                    }
                }
            }

            /**
             * Directive priority sort comparator
             *
             * @param {Object} a
             * @param {Object} b
             */

            function directiveComparator (a, b) {
                a = a.def.priority || 0
                b = b.def.priority || 0
                return a > b ? 1 : -1
            }

            /**
             * Check whether an element is transcluded
             *
             * @param {Element} el
             * @return {Boolean}
             */

            var transcludedFlagAttr = '__vue__transcluded'
            function checkTransclusion (el) {
                if (el.nodeType === 1 && el.hasAttribute(transcludedFlagAttr)) {
                    el.removeAttribute(transcludedFlagAttr)
                    return true
                }
            }

            /***/ },
        /* 17 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)
            var config = __webpack_require__(15)
            var templateParser = __webpack_require__(20)
            var transcludedFlagAttr = '__vue__transcluded'

            /**
             * Process an element or a DocumentFragment based on a
             * instance option object. This allows us to transclude
             * a template node/fragment before the instance is created,
             * so the processed fragment can then be cloned and reused
             * in v-repeat.
             *
             * @param {Element} el
             * @param {Object} options
             * @return {Element|DocumentFragment}
             */

            module.exports = function transclude (el, options) {
                if (options && options._asComponent) {
                    // mutating the options object here assuming the same
                    // object will be used for compile right after this
                    options._transcludedAttrs = extractAttrs(el.attributes)
                    // Mark content nodes and attrs so that the compiler
                    // knows they should be compiled in parent scope.
                    var i = el.childNodes.length
                    while (i--) {
                        var node = el.childNodes[i]
                        if (node.nodeType === 1) {
                            node.setAttribute(transcludedFlagAttr, '')
                        } else if (node.nodeType === 3 && node.data.trim()) {
                            // wrap transcluded textNodes in spans, because
                            // raw textNodes can't be persisted through clones
                            // by attaching attributes.
                            var wrapper = document.createElement('span')
                            wrapper.textContent = node.data
                            wrapper.setAttribute('__vue__wrap', '')
                            wrapper.setAttribute(transcludedFlagAttr, '')
                            el.replaceChild(wrapper, node)
                        }
                    }
                }
                // for template tags, what we want is its content as
                // a documentFragment (for block instances)
                if (el.tagName === 'TEMPLATE') {
                    el = templateParser.parse(el)
                }
                if (options && options.template) {
                    el = transcludeTemplate(el, options)
                }
                if (el instanceof DocumentFragment) {
                    _.prepend(document.createComment('v-start'), el)
                    el.appendChild(document.createComment('v-end'))
                }
                return el
            }

            /**
             * Process the template option.
             * If the replace option is true this will swap the $el.
             *
             * @param {Element} el
             * @param {Object} options
             * @return {Element|DocumentFragment}
             */

            function transcludeTemplate (el, options) {
                var template = options.template
                var frag = templateParser.parse(template, true)
                if (!frag) {
                    _.warn('Invalid template option: ' + template)
                } else {
                    var rawContent = options._content || _.extractContent(el)
                    if (options.replace) {
                        if (frag.childNodes.length > 1) {
                            // this is a block instance which has no root node.
                            // however, the container in the parent template
                            // (which is replaced here) may contain v-with and
                            // paramAttributes that still need to be compiled
                            // for the child. we store all the container
                            // attributes on the options object and pass it down
                            // to the compiler.
                            var containerAttrs = options._containerAttrs = {}
                            var i = el.attributes.length
                            while (i--) {
                                var attr = el.attributes[i]
                                containerAttrs[attr.name] = attr.value
                            }
                            transcludeContent(frag, rawContent)
                            return frag
                        } else {
                            var replacer = frag.firstChild
                            _.copyAttributes(el, replacer)
                            transcludeContent(replacer, rawContent)
                            return replacer
                        }
                    } else {
                        el.appendChild(frag)
                        transcludeContent(el, rawContent)
                        return el
                    }
                }
            }

            /**
             * Resolve <content> insertion points mimicking the behavior
             * of the Shadow DOM spec:
             *
             *   http://w3c.github.io/webcomponents/spec/shadow/#insertion-points
             *
             * @param {Element|DocumentFragment} el
             * @param {Element} raw
             */

            function transcludeContent (el, raw) {
                var outlets = getOutlets(el)
                var i = outlets.length
                if (!i) return
                var outlet, select, selected, j, main

                function isDirectChild (node) {
                    return node.parentNode === raw
                }

                // first pass, collect corresponding content
                // for each outlet.
                while (i--) {
                    outlet = outlets[i]
                    if (raw) {
                        select = outlet.getAttribute('select')
                        if (select) {  // select content
                            selected = raw.querySelectorAll(select)
                            if (selected.length) {
                                // according to Shadow DOM spec, `select` can
                                // only select direct children of the host node.
                                // enforcing this also fixes #786.
                                selected = [].filter.call(selected, isDirectChild)
                            }
                            outlet.content = selected.length
                                ? selected
                                : _.toArray(outlet.childNodes)
                        } else { // default content
                            main = outlet
                        }
                    } else { // fallback content
                        outlet.content = _.toArray(outlet.childNodes)
                    }
                }
                // second pass, actually insert the contents
                for (i = 0, j = outlets.length; i < j; i++) {
                    outlet = outlets[i]
                    if (outlet !== main) {
                        insertContentAt(outlet, outlet.content)
                    }
                }
                // finally insert the main content
                if (main) {
                    insertContentAt(main, _.toArray(raw.childNodes))
                }
            }

            /**
             * Get <content> outlets from the element/list
             *
             * @param {Element|Array} el
             * @return {Array}
             */

            var concat = [].concat
            function getOutlets (el) {
                return _.isArray(el)
                    ? concat.apply([], el.map(getOutlets))
                    : el.querySelectorAll
                    ? _.toArray(el.querySelectorAll('content'))
                    : []
            }

            /**
             * Insert an array of nodes at outlet,
             * then remove the outlet.
             *
             * @param {Element} outlet
             * @param {Array} contents
             */

            function insertContentAt (outlet, contents) {
                // not using util DOM methods here because
                // parentNode can be cached
                var parent = outlet.parentNode
                for (var i = 0, j = contents.length; i < j; i++) {
                    parent.insertBefore(contents[i], outlet)
                }
                parent.removeChild(outlet)
            }

            /**
             * Helper to extract a component container's attribute names
             * into a map, and filtering out `v-with` in the process.
             * The resulting map will be used in compiler/compile to
             * determine whether an attribute is transcluded.
             *
             * @param {NameNodeMap} attrs
             */

            function extractAttrs (attrs) {
                if (!attrs) return null
                var res = {}
                var vwith = config.prefix + 'with'
                var i = attrs.length
                while (i--) {
                    var name = attrs[i].name
                    if (name !== vwith) res[name] = true
                }
                return res
            }

            /***/ },
        /* 18 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)
            var Cache = __webpack_require__(52)
            var pathCache = new Cache(1000)
            var identRE = /^[$_a-zA-Z]+[\w$]*$/

            /**
             * Path-parsing algorithm scooped from Polymer/observe-js
             */

            var pathStateMachine = {
                'beforePath': {
                    'ws': ['beforePath'],
                    'ident': ['inIdent', 'append'],
                    '[': ['beforeElement'],
                    'eof': ['afterPath']
                },

                'inPath': {
                    'ws': ['inPath'],
                    '.': ['beforeIdent'],
                    '[': ['beforeElement'],
                    'eof': ['afterPath']
                },

                'beforeIdent': {
                    'ws': ['beforeIdent'],
                    'ident': ['inIdent', 'append']
                },

                'inIdent': {
                    'ident': ['inIdent', 'append'],
                    '0': ['inIdent', 'append'],
                    'number': ['inIdent', 'append'],
                    'ws': ['inPath', 'push'],
                    '.': ['beforeIdent', 'push'],
                    '[': ['beforeElement', 'push'],
                    'eof': ['afterPath', 'push']
                },

                'beforeElement': {
                    'ws': ['beforeElement'],
                    '0': ['afterZero', 'append'],
                    'number': ['inIndex', 'append'],
                    "'": ['inSingleQuote', 'append', ''],
                    '"': ['inDoubleQuote', 'append', '']
                },

                'afterZero': {
                    'ws': ['afterElement', 'push'],
                    ']': ['inPath', 'push']
                },

                'inIndex': {
                    '0': ['inIndex', 'append'],
                    'number': ['inIndex', 'append'],
                    'ws': ['afterElement'],
                    ']': ['inPath', 'push']
                },

                'inSingleQuote': {
                    "'": ['afterElement'],
                    'eof': 'error',
                    'else': ['inSingleQuote', 'append']
                },

                'inDoubleQuote': {
                    '"': ['afterElement'],
                    'eof': 'error',
                    'else': ['inDoubleQuote', 'append']
                },

                'afterElement': {
                    'ws': ['afterElement'],
                    ']': ['inPath', 'push']
                }
            }

            function noop () {}

            /**
             * Determine the type of a character in a keypath.
             *
             * @param {Char} char
             * @return {String} type
             */

            function getPathCharType (char) {
                if (char === undefined) {
                    return 'eof'
                }

                var code = char.charCodeAt(0)

                switch(code) {
                    case 0x5B: // [
                    case 0x5D: // ]
                    case 0x2E: // .
                    case 0x22: // "
                    case 0x27: // '
                    case 0x30: // 0
                        return char

                    case 0x5F: // _
                    case 0x24: // $
                        return 'ident'

                    case 0x20: // Space
                    case 0x09: // Tab
                    case 0x0A: // Newline
                    case 0x0D: // Return
                    case 0xA0:  // No-break space
                    case 0xFEFF:  // Byte Order Mark
                    case 0x2028:  // Line Separator
                    case 0x2029:  // Paragraph Separator
                        return 'ws'
                }

                // a-z, A-Z
                if ((0x61 <= code && code <= 0x7A) ||
                    (0x41 <= code && code <= 0x5A)) {
                    return 'ident'
                }

                // 1-9
                if (0x31 <= code && code <= 0x39) {
                    return 'number'
                }

                return 'else'
            }

            /**
             * Parse a string path into an array of segments
             * Todo implement cache
             *
             * @param {String} path
             * @return {Array|undefined}
             */

            function parsePath (path) {
                var keys = []
                var index = -1
                var mode = 'beforePath'
                var c, newChar, key, type, transition, action, typeMap

                var actions = {
                    push: function() {
                        if (key === undefined) {
                            return
                        }
                        keys.push(key)
                        key = undefined
                    },
                    append: function() {
                        if (key === undefined) {
                            key = newChar
                        } else {
                            key += newChar
                        }
                    }
                }

                function maybeUnescapeQuote () {
                    var nextChar = path[index + 1]
                    if ((mode === 'inSingleQuote' && nextChar === "'") ||
                        (mode === 'inDoubleQuote' && nextChar === '"')) {
                        index++
                        newChar = nextChar
                        actions.append()
                        return true
                    }
                }

                while (mode) {
                    index++
                    c = path[index]

                    if (c === '\\' && maybeUnescapeQuote()) {
                        continue
                    }

                    type = getPathCharType(c)
                    typeMap = pathStateMachine[mode]
                    transition = typeMap[type] || typeMap['else'] || 'error'

                    if (transition === 'error') {
                        return // parse error
                    }

                    mode = transition[0]
                    action = actions[transition[1]] || noop
                    newChar = transition[2] === undefined
                        ? c
                        : transition[2]
                    action()

                    if (mode === 'afterPath') {
                        return keys
                    }
                }
            }

            /**
             * Format a accessor segment based on its type.
             *
             * @param {String} key
             * @return {Boolean}
             */

            function formatAccessor(key) {
                if (identRE.test(key)) { // identifier
                    return '.' + key
                } else if (+key === key >>> 0) { // bracket index
                    return '[' + key + ']'
                } else { // bracket string
                    return '["' + key.replace(/"/g, '\\"') + '"]'
                }
            }

            /**
             * Compiles a getter function with a fixed path.
             *
             * @param {Array} path
             * @return {Function}
             */

            exports.compileGetter = function (path) {
                var body = 'return o' + path.map(formatAccessor).join('')
                return new Function('o', body)
            }

            /**
             * External parse that check for a cache hit first
             *
             * @param {String} path
             * @return {Array|undefined}
             */

            exports.parse = function (path) {
                var hit = pathCache.get(path)
                if (!hit) {
                    hit = parsePath(path)
                    if (hit) {
                        hit.get = exports.compileGetter(hit)
                        pathCache.put(path, hit)
                    }
                }
                return hit
            }

            /**
             * Get from an object from a path string
             *
             * @param {Object} obj
             * @param {String} path
             */

            exports.get = function (obj, path) {
                path = exports.parse(path)
                if (path) {
                    return path.get(obj)
                }
            }

            /**
             * Set on an object from a path
             *
             * @param {Object} obj
             * @param {String | Array} path
             * @param {*} val
             */

            exports.set = function (obj, path, val) {
                if (typeof path === 'string') {
                    path = exports.parse(path)
                }
                if (!path || !_.isObject(obj)) {
                    return false
                }
                var last, key
                for (var i = 0, l = path.length - 1; i < l; i++) {
                    last = obj
                    key = path[i]
                    obj = obj[key]
                    if (!_.isObject(obj)) {
                        obj = {}
                        last.$add(key, obj)
                    }
                }
                key = path[i]
                if (key in obj) {
                    obj[key] = val
                } else {
                    obj.$add(key, val)
                }
                return true
            }

            /***/ },
        /* 19 */
        /***/ function(module, exports, __webpack_require__) {

            var Cache = __webpack_require__(52)
            var config = __webpack_require__(15)
            var dirParser = __webpack_require__(21)
            var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g
            var cache, tagRE, htmlRE, firstChar, lastChar

            /**
             * Escape a string so it can be used in a RegExp
             * constructor.
             *
             * @param {String} str
             */

            function escapeRegex (str) {
                return str.replace(regexEscapeRE, '\\$&')
            }

            /**
             * Compile the interpolation tag regex.
             *
             * @return {RegExp}
             */

            function compileRegex () {
                config._delimitersChanged = false
                var open = config.delimiters[0]
                var close = config.delimiters[1]
                firstChar = open.charAt(0)
                lastChar = close.charAt(close.length - 1)
                var firstCharRE = escapeRegex(firstChar)
                var lastCharRE = escapeRegex(lastChar)
                var openRE = escapeRegex(open)
                var closeRE = escapeRegex(close)
                tagRE = new RegExp(
                    firstCharRE + '?' + openRE +
                    '(.+?)' +
                    closeRE + lastCharRE + '?',
                    'g'
                )
                htmlRE = new RegExp(
                    '^' + firstCharRE + openRE +
                    '.*' +
                    closeRE + lastCharRE + '$'
                )
                // reset cache
                cache = new Cache(1000)
            }

            /**
             * Parse a template text string into an array of tokens.
             *
             * @param {String} text
             * @return {Array<Object> | null}
             *               - {String} type
             *               - {String} value
             *               - {Boolean} [html]
             *               - {Boolean} [oneTime]
             */

            exports.parse = function (text) {
                if (config._delimitersChanged) {
                    compileRegex()
                }
                var hit = cache.get(text)
                if (hit) {
                    return hit
                }
                if (!tagRE.test(text)) {
                    return null
                }
                var tokens = []
                var lastIndex = tagRE.lastIndex = 0
                var match, index, value, first, oneTime, partial
                /* jshint boss:true */
                while (match = tagRE.exec(text)) {
                    index = match.index
                    // push text token
                    if (index > lastIndex) {
                        tokens.push({
                            value: text.slice(lastIndex, index)
                        })
                    }
                    // tag token
                    first = match[1].charCodeAt(0)
                    oneTime = first === 0x2A // *
                    partial = first === 0x3E // >
                    value = (oneTime || partial)
                        ? match[1].slice(1)
                        : match[1]
                    tokens.push({
                        tag: true,
                        value: value.trim(),
                        html: htmlRE.test(match[0]),
                        oneTime: oneTime,
                        partial: partial
                    })
                    lastIndex = index + match[0].length
                }
                if (lastIndex < text.length) {
                    tokens.push({
                        value: text.slice(lastIndex)
                    })
                }
                cache.put(text, tokens)
                return tokens
            }

            /**
             * Format a list of tokens into an expression.
             * e.g. tokens parsed from 'a {{b}} c' can be serialized
             * into one single expression as '"a " + b + " c"'.
             *
             * @param {Array} tokens
             * @param {Vue} [vm]
             * @return {String}
             */

            exports.tokensToExp = function (tokens, vm) {
                return tokens.length > 1
                    ? tokens.map(function (token) {
                    return formatToken(token, vm)
                }).join('+')
                    : formatToken(tokens[0], vm, true)
            }

            /**
             * Format a single token.
             *
             * @param {Object} token
             * @param {Vue} [vm]
             * @param {Boolean} single
             * @return {String}
             */

            function formatToken (token, vm, single) {
                return token.tag
                    ? vm && token.oneTime
                    ? '"' + vm.$eval(token.value) + '"'
                    : single
                    ? token.value
                    : inlineFilters(token.value)
                    : '"' + token.value + '"'
            }

            /**
             * For an attribute with multiple interpolation tags,
             * e.g. attr="some-{{thing | filter}}", in order to combine
             * the whole thing into a single watchable expression, we
             * have to inline those filters. This function does exactly
             * that. This is a bit hacky but it avoids heavy changes
             * to directive parser and watcher mechanism.
             *
             * @param {String} exp
             * @return {String}
             */

            var filterRE = /[^|]\|[^|]/
            function inlineFilters (exp) {
                if (!filterRE.test(exp)) {
                    return '(' + exp + ')'
                } else {
                    var dir = dirParser.parse(exp)[0]
                    if (!dir.filters) {
                        return '(' + exp + ')'
                    } else {
                        exp = dir.expression
                        for (var i = 0, l = dir.filters.length; i < l; i++) {
                            var filter = dir.filters[i]
                            var args = filter.args
                                ? ',"' + filter.args.join('","') + '"'
                                : ''
                            filter = 'this.$options.filters["' + filter.name + '"]'
                            exp = '(' + filter + '.read||' + filter + ')' +
                            '.apply(this,[' + exp + args + '])'
                        }
                        return exp
                    }
                }
            }

            /***/ },
        /* 20 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)
            var Cache = __webpack_require__(52)
            var templateCache = new Cache(1000)
            var idSelectorCache = new Cache(1000)

            var map = {
                _default : [0, '', ''],
                legend   : [1, '<fieldset>', '</fieldset>'],
                tr       : [2, '<table><tbody>', '</tbody></table>'],
                col      : [
                    2,
                    '<table><tbody></tbody><colgroup>',
                    '</colgroup></table>'
                ]
            }

            map.td =
                map.th = [
                    3,
                    '<table><tbody><tr>',
                    '</tr></tbody></table>'
                ]

            map.option =
                map.optgroup = [
                    1,
                    '<select multiple="multiple">',
                    '</select>'
                ]

            map.thead =
                map.tbody =
                    map.colgroup =
                        map.caption =
                            map.tfoot = [1, '<table>', '</table>']

            map.g =
                map.defs =
                    map.symbol =
                        map.use =
                            map.image =
                                map.text =
                                    map.circle =
                                        map.ellipse =
                                            map.line =
                                                map.path =
                                                    map.polygon =
                                                        map.polyline =
                                                            map.rect = [
                                                                1,
                                                                '<svg ' +
                                                                'xmlns="http://www.w3.org/2000/svg" ' +
                                                                'xmlns:xlink="http://www.w3.org/1999/xlink" ' +
                                                                'xmlns:ev="http://www.w3.org/2001/xml-events"' +
                                                                'version="1.1">',
                                                                '</svg>'
                                                            ]

            var tagRE = /<([\w:]+)/
            var entityRE = /&\w+;/

            /**
             * Convert a string template to a DocumentFragment.
             * Determines correct wrapping by tag types. Wrapping
             * strategy found in jQuery & component/domify.
             *
             * @param {String} templateString
             * @return {DocumentFragment}
             */

            function stringToFragment (templateString) {
                // try a cache hit first
                var hit = templateCache.get(templateString)
                if (hit) {
                    return hit
                }

                var frag = document.createDocumentFragment()
                var tagMatch = templateString.match(tagRE)
                var entityMatch = entityRE.test(templateString)

                if (!tagMatch && !entityMatch) {
                    // text only, return a single text node.
                    frag.appendChild(
                        document.createTextNode(templateString)
                    )
                } else {

                    var tag    = tagMatch && tagMatch[1]
                    var wrap   = map[tag] || map._default
                    var depth  = wrap[0]
                    var prefix = wrap[1]
                    var suffix = wrap[2]
                    var node   = document.createElement('div')

                    node.innerHTML = prefix + templateString.trim() + suffix
                    while (depth--) {
                        node = node.lastChild
                    }

                    var child
                    /* jshint boss:true */
                    while (child = node.firstChild) {
                        frag.appendChild(child)
                    }
                }

                templateCache.put(templateString, frag)
                return frag
            }

            /**
             * Convert a template node to a DocumentFragment.
             *
             * @param {Node} node
             * @return {DocumentFragment}
             */

            function nodeToFragment (node) {
                var tag = node.tagName
                // if its a template tag and the browser supports it,
                // its content is already a document fragment.
                if (
                    tag === 'TEMPLATE' &&
                    node.content instanceof DocumentFragment
                ) {
                    return node.content
                }
                // script template
                if (tag === 'SCRIPT') {
                    return stringToFragment(node.textContent)
                }
                // normal node, clone it to avoid mutating the original
                var clone = exports.clone(node)
                var frag = document.createDocumentFragment()
                var child
                /* jshint boss:true */
                while (child = clone.firstChild) {
                    frag.appendChild(child)
                }
                return frag
            }

            // Test for the presence of the Safari template cloning bug
            // https://bugs.webkit.org/show_bug.cgi?id=137755
            var hasBrokenTemplate = _.inBrowser
                ? (function () {
                var a = document.createElement('div')
                a.innerHTML = '<template>1</template>'
                return !a.cloneNode(true).firstChild.innerHTML
            })()
                : false

            // Test for IE10/11 textarea placeholder clone bug
            var hasTextareaCloneBug = _.inBrowser
                ? (function () {
                var t = document.createElement('textarea')
                t.placeholder = 't'
                return t.cloneNode(true).value === 't'
            })()
                : false

            /**
             * 1. Deal with Safari cloning nested <template> bug by
             *    manually cloning all template instances.
             * 2. Deal with IE10/11 textarea placeholder bug by setting
             *    the correct value after cloning.
             *
             * @param {Element|DocumentFragment} node
             * @return {Element|DocumentFragment}
             */

            exports.clone = function (node) {
                var res = node.cloneNode(true)
                var i, original, cloned
                /* istanbul ignore if */
                if (hasBrokenTemplate) {
                    original = node.querySelectorAll('template')
                    if (original.length) {
                        cloned = res.querySelectorAll('template')
                        i = cloned.length
                        while (i--) {
                            cloned[i].parentNode.replaceChild(
                                original[i].cloneNode(true),
                                cloned[i]
                            )
                        }
                    }
                }
                /* istanbul ignore if */
                if (hasTextareaCloneBug) {
                    if (node.tagName === 'TEXTAREA') {
                        res.value = node.value
                    } else {
                        original = node.querySelectorAll('textarea')
                        if (original.length) {
                            cloned = res.querySelectorAll('textarea')
                            i = cloned.length
                            while (i--) {
                                cloned[i].value = original[i].value
                            }
                        }
                    }
                }
                return res
            }

            /**
             * Process the template option and normalizes it into a
             * a DocumentFragment that can be used as a partial or a
             * instance template.
             *
             * @param {*} template
             *    Possible values include:
             *    - DocumentFragment object
             *    - Node object of type Template
             *    - id selector: '#some-template-id'
             *    - template string: '<div><span>{{msg}}</span></div>'
             * @param {Boolean} clone
             * @param {Boolean} noSelector
             * @return {DocumentFragment|undefined}
             */

            exports.parse = function (template, clone, noSelector) {
                var node, frag

                // if the template is already a document fragment,
                // do nothing
                if (template instanceof DocumentFragment) {
                    return clone
                        ? template.cloneNode(true)
                        : template
                }

                if (typeof template === 'string') {
                    // id selector
                    if (!noSelector && template.charAt(0) === '#') {
                        // id selector can be cached too
                        frag = idSelectorCache.get(template)
                        if (!frag) {
                            node = document.getElementById(template.slice(1))
                            if (node) {
                                frag = nodeToFragment(node)
                                // save selector to cache
                                idSelectorCache.put(template, frag)
                            }
                        }
                    } else {
                        // normal string template
                        frag = stringToFragment(template)
                    }
                } else if (template.nodeType) {
                    // a direct node
                    frag = nodeToFragment(template)
                }

                return frag && clone
                    ? exports.clone(frag)
                    : frag
            }

            /***/ },
        /* 21 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)
            var Cache = __webpack_require__(52)
            var cache = new Cache(1000)
            var argRE = /^[^\{\?]+$|^'[^']*'$|^"[^"]*"$/
            var filterTokenRE = /[^\s'"]+|'[^']+'|"[^"]+"/g

            /**
             * Parser state
             */

            var str
            var c, i, l
            var inSingle
            var inDouble
            var curly
            var square
            var paren
            var begin
            var argIndex
            var dirs
            var dir
            var lastFilterIndex
            var arg

            /**
             * Push a directive object into the result Array
             */

            function pushDir () {
                dir.raw = str.slice(begin, i).trim()
                if (dir.expression === undefined) {
                    dir.expression = str.slice(argIndex, i).trim()
                } else if (lastFilterIndex !== begin) {
                    pushFilter()
                }
                if (i === 0 || dir.expression) {
                    dirs.push(dir)
                }
            }

            /**
             * Push a filter to the current directive object
             */

            function pushFilter () {
                var exp = str.slice(lastFilterIndex, i).trim()
                var filter
                if (exp) {
                    filter = {}
                    var tokens = exp.match(filterTokenRE)
                    filter.name = tokens[0]
                    filter.args = tokens.length > 1 ? tokens.slice(1) : null
                }
                if (filter) {
                    (dir.filters = dir.filters || []).push(filter)
                }
                lastFilterIndex = i + 1
            }

            /**
             * Parse a directive string into an Array of AST-like
             * objects representing directives.
             *
             * Example:
             *
             * "click: a = a + 1 | uppercase" will yield:
             * {
	 *   arg: 'click',
	 *   expression: 'a = a + 1',
	 *   filters: [
	 *     { name: 'uppercase', args: null }
	 *   ]
	 * }
             *
             * @param {String} str
             * @return {Array<Object>}
             */

            exports.parse = function (s) {

                var hit = cache.get(s)
                if (hit) {
                    return hit
                }

                // reset parser state
                str = s
                inSingle = inDouble = false
                curly = square = paren = begin = argIndex = 0
                lastFilterIndex = 0
                dirs = []
                dir = {}
                arg = null

                for (i = 0, l = str.length; i < l; i++) {
                    c = str.charCodeAt(i)
                    if (inSingle) {
                        // check single quote
                        if (c === 0x27) inSingle = !inSingle
                    } else if (inDouble) {
                        // check double quote
                        if (c === 0x22) inDouble = !inDouble
                    } else if (
                        c === 0x2C && // comma
                        !paren && !curly && !square
                    ) {
                        // reached the end of a directive
                        pushDir()
                        // reset & skip the comma
                        dir = {}
                        begin = argIndex = lastFilterIndex = i + 1
                    } else if (
                        c === 0x3A && // colon
                        !dir.expression &&
                        !dir.arg
                    ) {
                        // argument
                        arg = str.slice(begin, i).trim()
                        // test for valid argument here
                        // since we may have caught stuff like first half of
                        // an object literal or a ternary expression.
                        if (argRE.test(arg)) {
                            argIndex = i + 1
                            dir.arg = _.stripQuotes(arg) || arg
                        }
                    } else if (
                        c === 0x7C && // pipe
                        str.charCodeAt(i + 1) !== 0x7C &&
                        str.charCodeAt(i - 1) !== 0x7C
                    ) {
                        if (dir.expression === undefined) {
                            // first filter, end of expression
                            lastFilterIndex = i + 1
                            dir.expression = str.slice(argIndex, i).trim()
                        } else {
                            // already has filter
                            pushFilter()
                        }
                    } else {
                        switch (c) {
                            case 0x22: inDouble = true; break // "
                            case 0x27: inSingle = true; break // '
                            case 0x28: paren++; break         // (
                            case 0x29: paren--; break         // )
                            case 0x5B: square++; break        // [
                            case 0x5D: square--; break        // ]
                            case 0x7B: curly++; break         // {
                            case 0x7D: curly--; break         // }
                        }
                    }
                }

                if (i === 0 || begin !== i) {
                    pushDir()
                }

                cache.put(s, dirs)
                return dirs
            }

            /***/ },
        /* 22 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)
            var Path = __webpack_require__(18)
            var Cache = __webpack_require__(52)
            var expressionCache = new Cache(1000)

            var allowedKeywords =
                'Math,Date,this,true,false,null,undefined,Infinity,NaN,' +
                'isNaN,isFinite,decodeURI,decodeURIComponent,encodeURI,' +
                'encodeURIComponent,parseInt,parseFloat'
            var allowedKeywordsRE =
                new RegExp('^(' + allowedKeywords.replace(/,/g, '\\b|') + '\\b)')

            // keywords that don't make sense inside expressions
            var improperKeywords =
                'break,case,class,catch,const,continue,debugger,default,' +
                'delete,do,else,export,extends,finally,for,function,if,' +
                'import,in,instanceof,let,return,super,switch,throw,try,' +
                'var,while,with,yield,enum,await,implements,package,' +
                'proctected,static,interface,private,public'
            var improperKeywordsRE =
                new RegExp('^(' + improperKeywords.replace(/,/g, '\\b|') + '\\b)')

            var wsRE = /\s/g
            var newlineRE = /\n/g
            var saveRE = /[\{,]\s*[\w\$_]+\s*:|('[^']*'|"[^"]*")|new |typeof |void /g
            var restoreRE = /"(\d+)"/g
            var pathTestRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\])*$/
            var pathReplaceRE = /[^\w$\.]([A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\])*)/g
            var booleanLiteralRE = /^(true|false)$/

            /**
             * Save / Rewrite / Restore
             *
             * When rewriting paths found in an expression, it is
             * possible for the same letter sequences to be found in
             * strings and Object literal property keys. Therefore we
             * remove and store these parts in a temporary array, and
             * restore them after the path rewrite.
             */

            var saved = []

            /**
             * Save replacer
             *
             * The save regex can match two possible cases:
             * 1. An opening object literal
             * 2. A string
             * If matched as a plain string, we need to escape its
             * newlines, since the string needs to be preserved when
             * generating the function body.
             *
             * @param {String} str
             * @param {String} isString - str if matched as a string
             * @return {String} - placeholder with index
             */

            function save (str, isString) {
                var i = saved.length
                saved[i] = isString
                    ? str.replace(newlineRE, '\\n')
                    : str
                return '"' + i + '"'
            }

            /**
             * Path rewrite replacer
             *
             * @param {String} raw
             * @return {String}
             */

            function rewrite (raw) {
                var c = raw.charAt(0)
                var path = raw.slice(1)
                if (allowedKeywordsRE.test(path)) {
                    return raw
                } else {
                    path = path.indexOf('"') > -1
                        ? path.replace(restoreRE, restore)
                        : path
                    return c + 'scope.' + path
                }
            }

            /**
             * Restore replacer
             *
             * @param {String} str
             * @param {String} i - matched save index
             * @return {String}
             */

            function restore (str, i) {
                return saved[i]
            }

            /**
             * Rewrite an expression, prefixing all path accessors with
             * `scope.` and generate getter/setter functions.
             *
             * @param {String} exp
             * @param {Boolean} needSet
             * @return {Function}
             */

            function compileExpFns (exp, needSet) {
                if (improperKeywordsRE.test(exp)) {
                    _.warn(
                        'Avoid using reserved keywords in expression: '
                        + exp
                    )
                }
                // reset state
                saved.length = 0
                // save strings and object literal keys
                var body = exp
                    .replace(saveRE, save)
                    .replace(wsRE, '')
                // rewrite all paths
                // pad 1 space here becaue the regex matches 1 extra char
                body = (' ' + body)
                    .replace(pathReplaceRE, rewrite)
                    .replace(restoreRE, restore)
                var getter = makeGetter(body)
                if (getter) {
                    return {
                        get: getter,
                        body: body,
                        set: needSet
                            ? makeSetter(body)
                            : null
                    }
                }
            }

            /**
             * Compile getter setters for a simple path.
             *
             * @param {String} exp
             * @return {Function}
             */

            function compilePathFns (exp) {
                var getter, path
                if (exp.indexOf('[') < 0) {
                    // really simple path
                    path = exp.split('.')
                    getter = Path.compileGetter(path)
                } else {
                    // do the real parsing
                    path = Path.parse(exp)
                    getter = path.get
                }
                return {
                    get: getter,
                    // always generate setter for simple paths
                    set: function (obj, val) {
                        Path.set(obj, path, val)
                    }
                }
            }

            /**
             * Build a getter function. Requires eval.
             *
             * We isolate the try/catch so it doesn't affect the
             * optimization of the parse function when it is not called.
             *
             * @param {String} body
             * @return {Function|undefined}
             */

            function makeGetter (body) {
                try {
                    return new Function('scope', 'return ' + body + ';')
                } catch (e) {
                    _.warn(
                        'Invalid expression. ' +
                        'Generated function body: ' + body
                    )
                }
            }

            /**
             * Build a setter function.
             *
             * This is only needed in rare situations like "a[b]" where
             * a settable path requires dynamic evaluation.
             *
             * This setter function may throw error when called if the
             * expression body is not a valid left-hand expression in
             * assignment.
             *
             * @param {String} body
             * @return {Function|undefined}
             */

            function makeSetter (body) {
                try {
                    return new Function('scope', 'value', body + '=value;')
                } catch (e) {
                    _.warn('Invalid setter function body: ' + body)
                }
            }

            /**
             * Check for setter existence on a cache hit.
             *
             * @param {Function} hit
             */

            function checkSetter (hit) {
                if (!hit.set) {
                    hit.set = makeSetter(hit.body)
                }
            }

            /**
             * Parse an expression into re-written getter/setters.
             *
             * @param {String} exp
             * @param {Boolean} needSet
             * @return {Function}
             */

            exports.parse = function (exp, needSet) {
                exp = exp.trim()
                // try cache
                var hit = expressionCache.get(exp)
                if (hit) {
                    if (needSet) {
                        checkSetter(hit)
                    }
                    return hit
                }
                // we do a simple path check to optimize for them.
                // the check fails valid paths with unusal whitespaces,
                // but that's too rare and we don't care.
                // also skip boolean literals and paths that start with
                // global "Math"
                var res =
                    pathTestRE.test(exp) &&
                        // don't treat true/false as paths
                    !booleanLiteralRE.test(exp) &&
                        // Math constants e.g. Math.PI, Math.E etc.
                    exp.slice(0, 5) !== 'Math.'
                        ? compilePathFns(exp)
                        : compileExpFns(exp, needSet)
                expressionCache.put(exp, res)
                return res
            }

            // Export the pathRegex for external use
            exports.pathTestRE = pathTestRE

            /***/ },
        /* 23 */
        /***/ function(module, exports, __webpack_require__) {

            var uid = 0
            var _ = __webpack_require__(11)

            /**
             * A dep is an observable that can have multiple
             * directives subscribing to it.
             *
             * @constructor
             */

            function Dep () {
                this.id = ++uid
                this.subs = []
            }

            var p = Dep.prototype

            /**
             * Add a directive subscriber.
             *
             * @param {Directive} sub
             */

            p.addSub = function (sub) {
                this.subs.push(sub)
            }

            /**
             * Remove a directive subscriber.
             *
             * @param {Directive} sub
             */

            p.removeSub = function (sub) {
                if (this.subs.length) {
                    var i = this.subs.indexOf(sub)
                    if (i > -1) this.subs.splice(i, 1)
                }
            }

            /**
             * Notify all subscribers of a new value.
             */

            p.notify = function () {
                // stablize the subscriber list first
                var subs = _.toArray(this.subs)
                for (var i = 0, l = subs.length; i < l; i++) {
                    subs[i].update()
                }
            }

            module.exports = Dep

            /***/ },
        /* 24 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)
            var config = __webpack_require__(15)
            var Watcher = __webpack_require__(25)
            var textParser = __webpack_require__(19)
            var expParser = __webpack_require__(22)

            /**
             * A directive links a DOM element with a piece of data,
             * which is the result of evaluating an expression.
             * It registers a watcher with the expression and calls
             * the DOM update function when a change is triggered.
             *
             * @param {String} name
             * @param {Node} el
             * @param {Vue} vm
             * @param {Object} descriptor
             *                 - {String} expression
             *                 - {String} [arg]
             *                 - {Array<Object>} [filters]
             * @param {Object} def - directive definition object
             * @param {Vue|undefined} host - transclusion host target
             * @constructor
             */

            function Directive (name, el, vm, descriptor, def, host) {
                // public
                this.name = name
                this.el = el
                this.vm = vm
                // copy descriptor props
                this.raw = descriptor.raw
                this.expression = descriptor.expression
                this.arg = descriptor.arg
                this.filters = _.resolveFilters(vm, descriptor.filters)
                // private
                this._host = host
                this._locked = false
                this._bound = false
                // init
                this._bind(def)
            }

            var p = Directive.prototype

            /**
             * Initialize the directive, mixin definition properties,
             * setup the watcher, call definition bind() and update()
             * if present.
             *
             * @param {Object} def
             */

            p._bind = function (def) {
                if (this.name !== 'cloak' && this.el && this.el.removeAttribute) {
                    this.el.removeAttribute(config.prefix + this.name)
                }
                if (typeof def === 'function') {
                    this.update = def
                } else {
                    _.extend(this, def)
                }
                this._watcherExp = this.expression
                this._checkDynamicLiteral()
                if (this.bind) {
                    this.bind()
                }
                if (this._watcherExp &&
                    (this.update || this.twoWay) &&
                    (!this.isLiteral || this._isDynamicLiteral) &&
                    !this._checkStatement()) {
                    // wrapped updater for context
                    var dir = this
                    var update = this._update = this.update
                        ? function (val, oldVal) {
                        if (!dir._locked) {
                            dir.update(val, oldVal)
                        }
                    }
                        : function () {} // noop if no update is provided
                    // use raw expression as identifier because filters
                    // make them different watchers
                    var watcher = this.vm._watchers[this.raw]
                    // v-repeat always creates a new watcher because it has
                    // a special filter that's bound to its directive
                    // instance.
                    if (!watcher || this.name === 'repeat') {
                        watcher = this.vm._watchers[this.raw] = new Watcher(
                            this.vm,
                            this._watcherExp,
                            update, // callback
                            {
                                filters: this.filters,
                                twoWay: this.twoWay,
                                deep: this.deep
                            }
                        )
                    } else {
                        watcher.addCb(update)
                    }
                    this._watcher = watcher
                    if (this._initValue != null) {
                        watcher.set(this._initValue)
                    } else if (this.update) {
                        this.update(watcher.value)
                    }
                }
                this._bound = true
            }

            /**
             * check if this is a dynamic literal binding.
             *
             * e.g. v-component="{{currentView}}"
             */

            p._checkDynamicLiteral = function () {
                var expression = this.expression
                if (expression && this.isLiteral) {
                    var tokens = textParser.parse(expression)
                    if (tokens) {
                        var exp = textParser.tokensToExp(tokens)
                        this.expression = this.vm.$get(exp)
                        this._watcherExp = exp
                        this._isDynamicLiteral = true
                    }
                }
            }

            /**
             * Check if the directive is a function caller
             * and if the expression is a callable one. If both true,
             * we wrap up the expression and use it as the event
             * handler.
             *
             * e.g. v-on="click: a++"
             *
             * @return {Boolean}
             */

            p._checkStatement = function () {
                var expression = this.expression
                if (
                    expression && this.acceptStatement &&
                    !expParser.pathTestRE.test(expression)
                ) {
                    var fn = expParser.parse(expression).get
                    var vm = this.vm
                    var handler = function () {
                        fn.call(vm, vm)
                    }
                    if (this.filters) {
                        handler = _.applyFilters(
                            handler,
                            this.filters.read,
                            vm
                        )
                    }
                    this.update(handler)
                    return true
                }
            }

            /**
             * Check for an attribute directive param, e.g. lazy
             *
             * @param {String} name
             * @return {String}
             */

            p._checkParam = function (name) {
                var param = this.el.getAttribute(name)
                if (param !== null) {
                    this.el.removeAttribute(name)
                }
                return param
            }

            /**
             * Teardown the watcher and call unbind.
             */

            p._teardown = function () {
                if (this._bound) {
                    if (this.unbind) {
                        this.unbind()
                    }
                    var watcher = this._watcher
                    if (watcher && watcher.active) {
                        watcher.removeCb(this._update)
                        if (!watcher.active) {
                            this.vm._watchers[this.raw] = null
                        }
                    }
                    this._bound = false
                    this.vm = this.el = this._watcher = null
                }
            }

            /**
             * Set the corresponding value with the setter.
             * This should only be used in two-way directives
             * e.g. v-model.
             *
             * @param {*} value
             * @param {Boolean} lock - prevent wrtie triggering update.
             * @public
             */

            p.set = function (value, lock) {
                if (this.twoWay) {
                    if (lock) {
                        this._locked = true
                    }
                    this._watcher.set(value)
                    if (lock) {
                        var self = this
                        _.nextTick(function () {
                            self._locked = false
                        })
                    }
                }
            }

            module.exports = Directive

            /***/ },
        /* 25 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)
            var config = __webpack_require__(15)
            var Observer = __webpack_require__(49)
            var expParser = __webpack_require__(22)
            var batcher = __webpack_require__(53)
            var uid = 0

            /**
             * A watcher parses an expression, collects dependencies,
             * and fires callback when the expression value changes.
             * This is used for both the $watch() api and directives.
             *
             * @param {Vue} vm
             * @param {String} expression
             * @param {Function} cb
             * @param {Object} options
             *                 - {Array} filters
             *                 - {Boolean} twoWay
             *                 - {Boolean} deep
             *                 - {Boolean} user
             * @constructor
             */

            function Watcher (vm, expression, cb, options) {
                this.vm = vm
                vm._watcherList.push(this)
                this.expression = expression
                this.cbs = [cb]
                this.id = ++uid // uid for batching
                this.active = true
                options = options || {}
                this.deep = !!options.deep
                this.user = !!options.user
                this.deps = Object.create(null)
                // setup filters if any.
                // We delegate directive filters here to the watcher
                // because they need to be included in the dependency
                // collection process.
                if (options.filters) {
                    this.readFilters = options.filters.read
                    this.writeFilters = options.filters.write
                }
                // parse expression for getter/setter
                var res = expParser.parse(expression, options.twoWay)
                this.getter = res.get
                this.setter = res.set
                this.value = this.get()
            }

            var p = Watcher.prototype

            /**
             * Add a dependency to this directive.
             *
             * @param {Dep} dep
             */

            p.addDep = function (dep) {
                var id = dep.id
                if (!this.newDeps[id]) {
                    this.newDeps[id] = dep
                    if (!this.deps[id]) {
                        this.deps[id] = dep
                        dep.addSub(this)
                    }
                }
            }

            /**
             * Evaluate the getter, and re-collect dependencies.
             */

            p.get = function () {
                this.beforeGet()
                var vm = this.vm
                var value
                try {
                    value = this.getter.call(vm, vm)
                } catch (e) {
                    if (config.warnExpressionErrors) {
                        _.warn(
                            'Error when evaluating expression "' +
                            this.expression + '":\n   ' + e
                        )
                    }
                }
                // "touch" every property so they are all tracked as
                // dependencies for deep watching
                if (this.deep) {
                    traverse(value)
                }
                value = _.applyFilters(value, this.readFilters, vm)
                this.afterGet()
                return value
            }

            /**
             * Set the corresponding value with the setter.
             *
             * @param {*} value
             */

            p.set = function (value) {
                var vm = this.vm
                value = _.applyFilters(
                    value, this.writeFilters, vm, this.value
                )
                try {
                    this.setter.call(vm, vm, value)
                } catch (e) {
                    if (config.warnExpressionErrors) {
                        _.warn(
                            'Error when evaluating setter "' +
                            this.expression + '":\n   ' + e
                        )
                    }
                }
            }

            /**
             * Prepare for dependency collection.
             */

            p.beforeGet = function () {
                Observer.target = this
                this.newDeps = {}
            }

            /**
             * Clean up for dependency collection.
             */

            p.afterGet = function () {
                Observer.target = null
                for (var id in this.deps) {
                    if (!this.newDeps[id]) {
                        this.deps[id].removeSub(this)
                    }
                }
                this.deps = this.newDeps
            }

            /**
             * Subscriber interface.
             * Will be called when a dependency changes.
             */

            p.update = function () {
                if (!config.async || config.debug) {
                    this.run()
                } else {
                    batcher.push(this)
                }
            }

            /**
             * Batcher job interface.
             * Will be called by the batcher.
             */

            p.run = function () {
                if (this.active) {
                    var value = this.get()
                    if (
                        value !== this.value ||
                        Array.isArray(value) ||
                        this.deep
                    ) {
                        var oldValue = this.value
                        this.value = value
                        var cbs = this.cbs
                        for (var i = 0, l = cbs.length; i < l; i++) {
                            cbs[i](value, oldValue)
                            // if a callback also removed other callbacks,
                            // we need to adjust the loop accordingly.
                            var removed = l - cbs.length
                            if (removed) {
                                i -= removed
                                l -= removed
                            }
                        }
                    }
                }
            }

            /**
             * Add a callback.
             *
             * @param {Function} cb
             */

            p.addCb = function (cb) {
                this.cbs.push(cb)
            }

            /**
             * Remove a callback.
             *
             * @param {Function} cb
             */

            p.removeCb = function (cb) {
                var cbs = this.cbs
                if (cbs.length > 1) {
                    var i = cbs.indexOf(cb)
                    if (i > -1) {
                        cbs.splice(i, 1)
                    }
                } else if (cb === cbs[0]) {
                    this.teardown()
                }
            }

            /**
             * Remove self from all dependencies' subcriber list.
             */

            p.teardown = function () {
                if (this.active) {
                    // remove self from vm's watcher list
                    // we can skip this if the vm if being destroyed
                    // which can improve teardown performance.
                    if (!this.vm._isBeingDestroyed) {
                        var list = this.vm._watcherList
                        var i = list.indexOf(this)
                        if (i > -1) {
                            list.splice(i, 1)
                        }
                    }
                    for (var id in this.deps) {
                        this.deps[id].removeSub(this)
                    }
                    this.active = false
                    this.vm = this.cbs = this.value = null
                }
            }


            /**
             * Recrusively traverse an object to evoke all converted
             * getters, so that every nested property inside the object
             * is collected as a "deep" dependency.
             *
             * @param {Object} obj
             */

            function traverse (obj) {
                var key, val, i
                for (key in obj) {
                    val = obj[key]
                    if (_.isArray(val)) {
                        i = val.length
                        while (i--) traverse(val[i])
                    } else if (_.isObject(val)) {
                        traverse(val)
                    }
                }
            }

            module.exports = Watcher

            /***/ },
        /* 26 */
        /***/ function(module, exports, __webpack_require__) {

            /**
             * Check is a string starts with $ or _
             *
             * @param {String} str
             * @return {Boolean}
             */

            exports.isReserved = function (str) {
                var c = (str + '').charCodeAt(0)
                return c === 0x24 || c === 0x5F
            }

            /**
             * Guard text output, make sure undefined outputs
             * empty string
             *
             * @param {*} value
             * @return {String}
             */

            exports.toString = function (value) {
                return value == null
                    ? ''
                    : value.toString()
            }

            /**
             * Check and convert possible numeric numbers before
             * setting back to data
             *
             * @param {*} value
             * @return {*|Number}
             */

            exports.toNumber = function (value) {
                return (
                isNaN(value) ||
                value === null ||
                typeof value === 'boolean'
                ) ? value
                    : Number(value)
            }

            /**
             * Strip quotes from a string
             *
             * @param {String} str
             * @return {String | false}
             */

            exports.stripQuotes = function (str) {
                var a = str.charCodeAt(0)
                var b = str.charCodeAt(str.length - 1)
                return a === b && (a === 0x22 || a === 0x27)
                    ? str.slice(1, -1)
                    : false
            }

            /**
             * Replace helper
             *
             * @param {String} _ - matched delimiter
             * @param {String} c - matched char
             * @return {String}
             */
            function toUpper (_, c) {
                return c ? c.toUpperCase () : ''
            }

            /**
             * Camelize a hyphen-delmited string.
             *
             * @param {String} str
             * @return {String}
             */

            var camelRE = /-(\w)/g
            exports.camelize = function (str) {
                return str.replace(camelRE, toUpper)
            }

            /**
             * Converts hyphen/underscore/slash delimitered names into
             * camelized classNames.
             *
             * e.g. my-component => MyComponent
             *      some_else    => SomeElse
             *      some/comp    => SomeComp
             *
             * @param {String} str
             * @return {String}
             */

            var classifyRE = /(?:^|[-_\/])(\w)/g
            exports.classify = function (str) {
                return str.replace(classifyRE, toUpper)
            }

            /**
             * Simple bind, faster than native
             *
             * @param {Function} fn
             * @param {Object} ctx
             * @return {Function}
             */

            exports.bind = function (fn, ctx) {
                return function () {
                    return fn.apply(ctx, arguments)
                }
            }

            /**
             * Convert an Array-like object to a real Array.
             *
             * @param {Array-like} list
             * @param {Number} [start] - start index
             * @return {Array}
             */

            exports.toArray = function (list, start) {
                start = start || 0
                var i = list.length - start
                var ret = new Array(i)
                while (i--) {
                    ret[i] = list[i + start]
                }
                return ret
            }

            /**
             * Mix properties into target object.
             *
             * @param {Object} to
             * @param {Object} from
             */

            exports.extend = function (to, from) {
                for (var key in from) {
                    to[key] = from[key]
                }
                return to
            }

            /**
             * Quick object check - this is primarily used to tell
             * Objects from primitive values when we know the value
             * is a JSON-compliant type.
             *
             * @param {*} obj
             * @return {Boolean}
             */

            exports.isObject = function (obj) {
                return obj && typeof obj === 'object'
            }

            /**
             * Strict object type check. Only returns true
             * for plain JavaScript objects.
             *
             * @param {*} obj
             * @return {Boolean}
             */

            var toString = Object.prototype.toString
            exports.isPlainObject = function (obj) {
                return toString.call(obj) === '[object Object]'
            }

            /**
             * Array type check.
             *
             * @param {*} obj
             * @return {Boolean}
             */

            exports.isArray = function (obj) {
                return Array.isArray(obj)
            }

            /**
             * Define a non-enumerable property
             *
             * @param {Object} obj
             * @param {String} key
             * @param {*} val
             * @param {Boolean} [enumerable]
             */

            exports.define = function (obj, key, val, enumerable) {
                Object.defineProperty(obj, key, {
                    value        : val,
                    enumerable   : !!enumerable,
                    writable     : true,
                    configurable : true
                })
            }

            /**
             * Debounce a function so it only gets called after the
             * input stops arriving after the given wait period.
             *
             * @param {Function} func
             * @param {Number} wait
             * @return {Function} - the debounced function
             */

            exports.debounce = function(func, wait) {
                var timeout, args, context, timestamp, result
                var later = function() {
                    var last = Date.now() - timestamp
                    if (last < wait && last >= 0) {
                        timeout = setTimeout(later, wait - last)
                    } else {
                        timeout = null
                        result = func.apply(context, args)
                        if (!timeout) context = args = null
                    }
                }
                return function() {
                    context = this
                    args = arguments
                    timestamp = Date.now()
                    if (!timeout) {
                        timeout = setTimeout(later, wait)
                    }
                    return result
                }
            }

            /***/ },
        /* 27 */
        /***/ function(module, exports, __webpack_require__) {

            /**
             * Can we use __proto__?
             *
             * @type {Boolean}
             */

            exports.hasProto = '__proto__' in {}

            /**
             * Indicates we have a window
             *
             * @type {Boolean}
             */

            var toString = Object.prototype.toString
            var inBrowser = exports.inBrowser =
                typeof window !== 'undefined' &&
                toString.call(window) !== '[object Object]'

            /**
             * Defer a task to execute it asynchronously. Ideally this
             * should be executed as a microtask, so we leverage
             * MutationObserver if it's available, and fallback to
             * setTimeout(0).
             *
             * @param {Function} cb
             * @param {Object} ctx
             */

            exports.nextTick = (function () {
                var callbacks = []
                var pending = false
                var timerFunc
                function handle () {
                    pending = false
                    var copies = callbacks.slice(0)
                    callbacks = []
                    for (var i = 0; i < copies.length; i++) {
                        copies[i]()
                    }
                }
                /* istanbul ignore if */
                if (typeof MutationObserver !== 'undefined') {
                    var counter = 1
                    var observer = new MutationObserver(handle)
                    var textNode = document.createTextNode(counter)
                    observer.observe(textNode, {
                        characterData: true
                    })
                    timerFunc = function () {
                        counter = (counter + 1) % 2
                        textNode.data = counter
                    }
                } else {
                    timerFunc = setTimeout
                }
                return function (cb, ctx) {
                    var func = ctx
                        ? function () { cb.call(ctx) }
                        : cb
                    callbacks.push(func)
                    if (pending) return
                    pending = true
                    timerFunc(handle, 0)
                }
            })()

            /**
             * Detect if we are in IE9...
             *
             * @type {Boolean}
             */

            exports.isIE9 =
                inBrowser &&
                navigator.userAgent.indexOf('MSIE 9.0') > 0

            /**
             * Sniff transition/animation events
             */

            if (inBrowser && !exports.isIE9) {
                var isWebkitTrans =
                    window.ontransitionend === undefined &&
                    window.onwebkittransitionend !== undefined
                var isWebkitAnim =
                    window.onanimationend === undefined &&
                    window.onwebkitanimationend !== undefined
                exports.transitionProp = isWebkitTrans
                    ? 'WebkitTransition'
                    : 'transition'
                exports.transitionEndEvent = isWebkitTrans
                    ? 'webkitTransitionEnd'
                    : 'transitionend'
                exports.animationProp = isWebkitAnim
                    ? 'WebkitAnimation'
                    : 'animation'
                exports.animationEndEvent = isWebkitAnim
                    ? 'webkitAnimationEnd'
                    : 'animationend'
            }

            /***/ },
        /* 28 */
        /***/ function(module, exports, __webpack_require__) {

            var config = __webpack_require__(15)

            /**
             * Check if a node is in the document.
             * Note: document.documentElement.contains should work here
             * but always returns false for comment nodes in phantomjs,
             * making unit tests difficult. This is fixed byy doing the
             * contains() check on the node's parentNode instead of
             * the node itself.
             *
             * @param {Node} node
             * @return {Boolean}
             */

            var doc =
                typeof document !== 'undefined' &&
                document.documentElement

            exports.inDoc = function (node) {
                var parent = node && node.parentNode
                return doc === node ||
                    doc === parent ||
                    !!(parent && parent.nodeType === 1 && (doc.contains(parent)))
            }

            /**
             * Extract an attribute from a node.
             *
             * @param {Node} node
             * @param {String} attr
             */

            exports.attr = function (node, attr) {
                attr = config.prefix + attr
                var val = node.getAttribute(attr)
                if (val !== null) {
                    node.removeAttribute(attr)
                }
                return val
            }

            /**
             * Insert el before target
             *
             * @param {Element} el
             * @param {Element} target
             */

            exports.before = function (el, target) {
                target.parentNode.insertBefore(el, target)
            }

            /**
             * Insert el after target
             *
             * @param {Element} el
             * @param {Element} target
             */

            exports.after = function (el, target) {
                if (target.nextSibling) {
                    exports.before(el, target.nextSibling)
                } else {
                    target.parentNode.appendChild(el)
                }
            }

            /**
             * Remove el from DOM
             *
             * @param {Element} el
             */

            exports.remove = function (el) {
                el.parentNode.removeChild(el)
            }

            /**
             * Prepend el to target
             *
             * @param {Element} el
             * @param {Element} target
             */

            exports.prepend = function (el, target) {
                if (target.firstChild) {
                    exports.before(el, target.firstChild)
                } else {
                    target.appendChild(el)
                }
            }

            /**
             * Replace target with el
             *
             * @param {Element} target
             * @param {Element} el
             */

            exports.replace = function (target, el) {
                var parent = target.parentNode
                if (parent) {
                    parent.replaceChild(el, target)
                }
            }

            /**
             * Copy attributes from one element to another.
             *
             * @param {Element} from
             * @param {Element} to
             */

            exports.copyAttributes = function (from, to) {
                if (from.hasAttributes()) {
                    var attrs = from.attributes
                    for (var i = 0, l = attrs.length; i < l; i++) {
                        var attr = attrs[i]
                        to.setAttribute(attr.name, attr.value)
                    }
                }
            }

            /**
             * Add event listener shorthand.
             *
             * @param {Element} el
             * @param {String} event
             * @param {Function} cb
             */

            exports.on = function (el, event, cb) {
                el.addEventListener(event, cb)
            }

            /**
             * Remove event listener shorthand.
             *
             * @param {Element} el
             * @param {String} event
             * @param {Function} cb
             */

            exports.off = function (el, event, cb) {
                el.removeEventListener(event, cb)
            }

            /**
             * Add class with compatibility for IE & SVG
             *
             * @param {Element} el
             * @param {Strong} cls
             */

            exports.addClass = function (el, cls) {
                if (el.classList) {
                    el.classList.add(cls)
                } else {
                    var cur = ' ' + (el.getAttribute('class') || '') + ' '
                    if (cur.indexOf(' ' + cls + ' ') < 0) {
                        el.setAttribute('class', (cur + cls).trim())
                    }
                }
            }

            /**
             * Remove class with compatibility for IE & SVG
             *
             * @param {Element} el
             * @param {Strong} cls
             */

            exports.removeClass = function (el, cls) {
                if (el.classList) {
                    el.classList.remove(cls)
                } else {
                    var cur = ' ' + (el.getAttribute('class') || '') + ' '
                    var tar = ' ' + cls + ' '
                    while (cur.indexOf(tar) >= 0) {
                        cur = cur.replace(tar, ' ')
                    }
                    el.setAttribute('class', cur.trim())
                }
            }

            /**
             * Extract raw content inside an element into a temporary
             * container div
             *
             * @param {Element} el
             * @param {Boolean} asFragment
             * @return {Element}
             */

            exports.extractContent = function (el, asFragment) {
                var child
                var rawContent
                if (el.hasChildNodes()) {
                    rawContent = asFragment
                        ? document.createDocumentFragment()
                        : document.createElement('div')
                    /* jshint boss:true */
                    while (child = el.firstChild) {
                        rawContent.appendChild(child)
                    }
                }
                return rawContent
            }


            /***/ },
        /* 29 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(30)

            /**
             * Resolve read & write filters for a vm instance. The
             * filters descriptor Array comes from the directive parser.
             *
             * This is extracted into its own utility so it can
             * be used in multiple scenarios.
             *
             * @param {Vue} vm
             * @param {Array<Object>} filters
             * @param {Object} [target]
             * @return {Object}
             */

            exports.resolveFilters = function (vm, filters, target) {
                if (!filters) {
                    return
                }
                var res = target || {}
                // var registry = vm.$options.filters
                filters.forEach(function (f) {
                    var def = vm.$options.filters[f.name]
                    _.assertAsset(def, 'filter', f.name)
                    if (!def) return
                    var args = f.args
                    var reader, writer
                    if (typeof def === 'function') {
                        reader = def
                    } else {
                        reader = def.read
                        writer = def.write
                    }
                    if (reader) {
                        if (!res.read) res.read = []
                        res.read.push(function (value) {
                            return args
                                ? reader.apply(vm, [value].concat(args))
                                : reader.call(vm, value)
                        })
                    }
                    if (writer) {
                        if (!res.write) res.write = []
                        res.write.push(function (value, oldVal) {
                            return args
                                ? writer.apply(vm, [value, oldVal].concat(args))
                                : writer.call(vm, value, oldVal)
                        })
                    }
                })
                return res
            }

            /**
             * Apply filters to a value
             *
             * @param {*} value
             * @param {Array} filters
             * @param {Vue} vm
             * @param {*} oldVal
             * @return {*}
             */

            exports.applyFilters = function (value, filters, vm, oldVal) {
                if (!filters) {
                    return value
                }
                for (var i = 0, l = filters.length; i < l; i++) {
                    value = filters[i].call(vm, value, oldVal)
                }
                return value
            }

            /***/ },
        /* 30 */
        /***/ function(module, exports, __webpack_require__) {

            var config = __webpack_require__(15)

            /**
             * Enable debug utilities. The enableDebug() function and
             * all _.log() & _.warn() calls will be dropped in the
             * minified production build.
             */

            enableDebug()

            function enableDebug () {

                var hasConsole = typeof console !== 'undefined'

                /**
                 * Log a message.
                 *
                 * @param {String} msg
                 */

                exports.log = function (msg) {
                    if (hasConsole && config.debug) {
                        console.log('[Vue info]: ' + msg)
                    }
                }

                /**
                 * We've got a problem here.
                 *
                 * @param {String} msg
                 */

                exports.warn = function (msg) {
                    if (hasConsole && (!config.silent || config.debug)) {
                        console.warn('[Vue warn]: ' + msg)
                        /* istanbul ignore if */
                        if (config.debug) {
                            /* jshint debug: true */
                            debugger
                        }
                    }
                }

                /**
                 * Assert asset exists
                 */

                exports.assertAsset = function (val, type, id) {
                    if (!val) {
                        exports.warn('Failed to resolve ' + type + ': ' + id)
                    }
                }
            }

            /***/ },
        /* 31 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)

            module.exports = {

                bind: function () {
                    this.attr = this.el.nodeType === 3
                        ? 'nodeValue'
                        : 'textContent'
                },

                update: function (value) {
                    this.el[this.attr] = _.toString(value)
                }

            }

            /***/ },
        /* 32 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)
            var templateParser = __webpack_require__(20)

            module.exports = {

                bind: function () {
                    // a comment node means this is a binding for
                    // {{{ inline unescaped html }}}
                    if (this.el.nodeType === 8) {
                        // hold nodes
                        this.nodes = []
                    }
                },

                update: function (value) {
                    value = _.toString(value)
                    if (this.nodes) {
                        this.swap(value)
                    } else {
                        this.el.innerHTML = value
                    }
                },

                swap: function (value) {
                    // remove old nodes
                    var i = this.nodes.length
                    while (i--) {
                        _.remove(this.nodes[i])
                    }
                    // convert new value to a fragment
                    // do not attempt to retrieve from id selector
                    var frag = templateParser.parse(value, true, true)
                    // save a reference to these nodes so we can remove later
                    this.nodes = _.toArray(frag.childNodes)
                    _.before(frag, this.el)
                }

            }

            /***/ },
        /* 33 */
        /***/ function(module, exports, __webpack_require__) {

            // xlink
            var xlinkNS = 'http://www.w3.org/1999/xlink'
            var xlinkRE = /^xlink:/

            module.exports = {

                priority: 850,

                bind: function () {
                    var name = this.arg
                    this.update = xlinkRE.test(name)
                        ? xlinkHandler
                        : defaultHandler
                }

            }

            function defaultHandler (value) {
                if (value || value === 0) {
                    this.el.setAttribute(this.arg, value)
                } else {
                    this.el.removeAttribute(this.arg)
                }
            }

            function xlinkHandler (value) {
                if (value != null) {
                    this.el.setAttributeNS(xlinkNS, this.arg, value)
                } else {
                    this.el.removeAttributeNS(xlinkNS, 'href')
                }
            }

            /***/ },
        /* 34 */
        /***/ function(module, exports, __webpack_require__) {

            var transition = __webpack_require__(50)

            module.exports = function (value) {
                var el = this.el
                transition.apply(el, value ? 1 : -1, function () {
                    el.style.display = value ? '' : 'none'
                }, this.vm)
            }

            /***/ },
        /* 35 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)
            var addClass = _.addClass
            var removeClass = _.removeClass

            module.exports = function (value) {
                if (this.arg) {
                    var method = value ? addClass : removeClass
                    method(this.el, this.arg)
                } else {
                    if (this.lastVal) {
                        removeClass(this.el, this.lastVal)
                    }
                    if (value) {
                        addClass(this.el, value)
                        this.lastVal = value
                    }
                }
            }

            /***/ },
        /* 36 */
        /***/ function(module, exports, __webpack_require__) {

            module.exports = {

                isLiteral: true,

                bind: function () {
                    this.vm.$$[this.expression] = this.el
                },

                unbind: function () {
                    delete this.vm.$$[this.expression]
                }

            }

            /***/ },
        /* 37 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)

            module.exports = {

                isLiteral: true,

                bind: function () {
                    var vm = this.el.__vue__
                    if (!vm) {
                        _.warn(
                            'v-ref should only be used on a component root element.'
                        )
                        return
                    }
                    // If we get here, it means this is a `v-ref` on a
                    // child, because parent scope `v-ref` is stripped in
                    // `v-component` already. So we just record our own ref
                    // here - it will overwrite parent ref in `v-component`,
                    // if any.
                    vm._refID = this.expression
                }

            }

            /***/ },
        /* 38 */
        /***/ function(module, exports, __webpack_require__) {

            var config = __webpack_require__(15)

            module.exports = {

                bind: function () {
                    var el = this.el
                    this.vm.$once('hook:compiled', function () {
                        el.removeAttribute(config.prefix + 'cloak')
                    })
                }

            }

            /***/ },
        /* 39 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)
            var prefixes = ['-webkit-', '-moz-', '-ms-']
            var camelPrefixes = ['Webkit', 'Moz', 'ms']
            var importantRE = /!important;?$/
            var camelRE = /([a-z])([A-Z])/g
            var testEl = null
            var propCache = {}

            module.exports = {

                deep: true,

                update: function (value) {
                    if (this.arg) {
                        this.setProp(this.arg, value)
                    } else {
                        if (typeof value === 'object') {
                            // cache object styles so that only changed props
                            // are actually updated.
                            if (!this.cache) this.cache = {}
                            for (var prop in value) {
                                this.setProp(prop, value[prop])
                                /* jshint eqeqeq: false */
                                if (value[prop] != this.cache[prop]) {
                                    this.cache[prop] = value[prop]
                                    this.setProp(prop, value[prop])
                                }
                            }
                        } else {
                            this.el.style.cssText = value
                        }
                    }
                },

                setProp: function (prop, value) {
                    prop = normalize(prop)
                    if (!prop) return // unsupported prop
                    // cast possible numbers/booleans into strings
                    if (value != null) value += ''
                    if (value) {
                        var isImportant = importantRE.test(value)
                            ? 'important'
                            : ''
                        if (isImportant) {
                            value = value.replace(importantRE, '').trim()
                        }
                        this.el.style.setProperty(prop, value, isImportant)
                    } else {
                        this.el.style.removeProperty(prop)
                    }
                }

            }

            /**
             * Normalize a CSS property name.
             * - cache result
             * - auto prefix
             * - camelCase -> dash-case
             *
             * @param {String} prop
             * @return {String}
             */

            function normalize (prop) {
                if (propCache[prop]) {
                    return propCache[prop]
                }
                var res = prefix(prop)
                propCache[prop] = propCache[res] = res
                return res
            }

            /**
             * Auto detect the appropriate prefix for a CSS property.
             * https://gist.github.com/paulirish/523692
             *
             * @param {String} prop
             * @return {String}
             */

            function prefix (prop) {
                prop = prop.replace(camelRE, '$1-$2').toLowerCase()
                var camel = _.camelize(prop)
                var upper = camel.charAt(0).toUpperCase() + camel.slice(1)
                if (!testEl) {
                    testEl = document.createElement('div')
                }
                if (camel in testEl.style) {
                    return prop
                }
                var i = prefixes.length
                var prefixed
                while (i--) {
                    prefixed = camelPrefixes[i] + upper
                    if (prefixed in testEl.style) {
                        return prefixes[i] + prop
                    }
                }
            }

            /***/ },
        /* 40 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)
            var templateParser = __webpack_require__(20)
            var vIf = __webpack_require__(45)

            module.exports = {

                isLiteral: true,

                // same logic reuse from v-if
                compile: vIf.compile,
                teardown: vIf.teardown,
                getContainedComponents: vIf.getContainedComponents,
                unbind: vIf.unbind,

                bind: function () {
                    var el = this.el
                    this.start = document.createComment('v-partial-start')
                    this.end = document.createComment('v-partial-end')
                    if (el.nodeType !== 8) {
                        el.innerHTML = ''
                    }
                    if (el.tagName === 'TEMPLATE' || el.nodeType === 8) {
                        _.replace(el, this.end)
                    } else {
                        el.appendChild(this.end)
                    }
                    _.before(this.start, this.end)
                    if (!this._isDynamicLiteral) {
                        this.insert(this.expression)
                    }
                },

                update: function (id) {
                    this.teardown()
                    this.insert(id)
                },

                insert: function (id) {
                    var partial = this.vm.$options.partials[id]
                    _.assertAsset(partial, 'partial', id)
                    if (partial) {
                        var filters = this.filters && this.filters.read
                        if (filters) {
                            partial = _.applyFilters(partial, filters, this.vm)
                        }
                        this.compile(templateParser.parse(partial, true))
                    }
                }

            }

            /***/ },
        /* 41 */
        /***/ function(module, exports, __webpack_require__) {

            module.exports = {

                priority: 1000,
                isLiteral: true,

                bind: function () {
                    if (!this._isDynamicLiteral) {
                        this.update(this.expression)
                    }
                },

                update: function (id) {
                    var vm = this.el.__vue__ || this.vm
                    this.el.__v_trans = {
                        id: id,
                        // resolve the custom transition functions now
                        // so the transition module knows this is a
                        // javascript transition without having to check
                        // computed CSS.
                        fns: vm.$options.transitions[id]
                    }
                }

            }

            /***/ },
        /* 42 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)

            module.exports = {

                acceptStatement: true,
                priority: 700,

                bind: function () {
                    // deal with iframes
                    if (
                        this.el.tagName === 'IFRAME' &&
                        this.arg !== 'load'
                    ) {
                        var self = this
                        this.iframeBind = function () {
                            _.on(self.el.contentWindow, self.arg, self.handler)
                        }
                        _.on(this.el, 'load', this.iframeBind)
                    }
                },

                update: function (handler) {
                    if (typeof handler !== 'function') {
                        _.warn(
                            'Directive "v-on:' + this.expression + '" ' +
                            'expects a function value.'
                        )
                        return
                    }
                    this.reset()
                    var vm = this.vm
                    this.handler = function (e) {
                        e.targetVM = vm
                        vm.$event = e
                        var res = handler(e)
                        vm.$event = null
                        return res
                    }
                    if (this.iframeBind) {
                        this.iframeBind()
                    } else {
                        _.on(this.el, this.arg, this.handler)
                    }
                },

                reset: function () {
                    var el = this.iframeBind
                        ? this.el.contentWindow
                        : this.el
                    if (this.handler) {
                        _.off(el, this.arg, this.handler)
                    }
                },

                unbind: function () {
                    this.reset()
                    _.off(this.el, 'load', this.iframeBind)
                }
            }

            /***/ },
        /* 43 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)
            var templateParser = __webpack_require__(20)

            module.exports = {

                isLiteral: true,

                /**
                 * Setup. Two possible usages:
                 *
                 * - static:
                 *   v-component="comp"
                 *
                 * - dynamic:
                 *   v-component="{{currentView}}"
                 */

                bind: function () {
                    if (!this.el.__vue__) {
                        // create a ref anchor
                        this.ref = document.createComment('v-component')
                        _.replace(this.el, this.ref)
                        // check keep-alive options.
                        // If yes, instead of destroying the active vm when
                        // hiding (v-if) or switching (dynamic literal) it,
                        // we simply remove it from the DOM and save it in a
                        // cache object, with its constructor id as the key.
                        this.keepAlive = this._checkParam('keep-alive') != null
                        // check ref
                        this.refID = _.attr(this.el, 'ref')
                        if (this.keepAlive) {
                            this.cache = {}
                        }
                        // check inline-template
                        if (this._checkParam('inline-template') !== null) {
                            // extract inline template as a DocumentFragment
                            this.template = _.extractContent(this.el, true)
                        }
                        // if static, build right now.
                        if (!this._isDynamicLiteral) {
                            this.resolveCtor(this.expression)
                            var child = this.build()
                            child.$before(this.ref)
                            this.setCurrent(child)
                        } else {
                            // check dynamic component params
                            this.readyEvent = this._checkParam('wait-for')
                            this.transMode = this._checkParam('transition-mode')
                        }
                    } else {
                        _.warn(
                            'v-component="' + this.expression + '" cannot be ' +
                            'used on an already mounted instance.'
                        )
                    }
                },

                /**
                 * Resolve the component constructor to use when creating
                 * the child vm.
                 */

                resolveCtor: function (id) {
                    this.ctorId = id
                    this.Ctor = this.vm.$options.components[id]
                    _.assertAsset(this.Ctor, 'component', id)
                },

                /**
                 * Instantiate/insert a new child vm.
                 * If keep alive and has cached instance, insert that
                 * instance; otherwise build a new one and cache it.
                 *
                 * @return {Vue} - the created instance
                 */

                build: function () {
                    if (this.keepAlive) {
                        var cached = this.cache[this.ctorId]
                        if (cached) {
                            return cached
                        }
                    }
                    var vm = this.vm
                    var el = templateParser.clone(this.el)
                    if (this.Ctor) {
                        var child = vm.$addChild({
                            el: el,
                            template: this.template,
                            _asComponent: true,
                            _host: this._host
                        }, this.Ctor)
                        if (this.keepAlive) {
                            this.cache[this.ctorId] = child
                        }
                        return child
                    }
                },

                /**
                 * Teardown the current child, but defers cleanup so
                 * that we can separate the destroy and removal steps.
                 */

                unbuild: function () {
                    var child = this.childVM
                    if (!child || this.keepAlive) {
                        return
                    }
                    // the sole purpose of `deferCleanup` is so that we can
                    // "deactivate" the vm right now and perform DOM removal
                    // later.
                    child.$destroy(false, true)
                },

                /**
                 * Remove current destroyed child and manually do
                 * the cleanup after removal.
                 *
                 * @param {Function} cb
                 */

                remove: function (child, cb) {
                    var keepAlive = this.keepAlive
                    if (child) {
                        child.$remove(function () {
                            if (!keepAlive) child._cleanup()
                            if (cb) cb()
                        })
                    } else if (cb) {
                        cb()
                    }
                },

                /**
                 * Update callback for the dynamic literal scenario,
                 * e.g. v-component="{{view}}"
                 */

                update: function (value) {
                    if (!value) {
                        // just destroy and remove current
                        this.unbuild()
                        this.remove(this.childVM)
                        this.unsetCurrent()
                    } else {
                        this.resolveCtor(value)
                        this.unbuild()
                        var newComponent = this.build()
                        var self = this
                        if (this.readyEvent) {
                            newComponent.$once(this.readyEvent, function () {
                                self.swapTo(newComponent)
                            })
                        } else {
                            this.swapTo(newComponent)
                        }
                    }
                },

                /**
                 * Actually swap the components, depending on the
                 * transition mode. Defaults to simultaneous.
                 *
                 * @param {Vue} target
                 */

                swapTo: function (target) {
                    var self = this
                    var current = this.childVM
                    this.unsetCurrent()
                    this.setCurrent(target)
                    switch (self.transMode) {
                        case 'in-out':
                            target.$before(self.ref, function () {
                                self.remove(current)
                            })
                            break
                        case 'out-in':
                            self.remove(current, function () {
                                target.$before(self.ref)
                            })
                            break
                        default:
                            self.remove(current)
                            target.$before(self.ref)
                    }
                },

                /**
                 * Set childVM and parent ref
                 */

                setCurrent: function (child) {
                    this.childVM = child
                    var refID = child._refID || this.refID
                    if (refID) {
                        this.vm.$[refID] = child
                    }
                },

                /**
                 * Unset childVM and parent ref
                 */

                unsetCurrent: function () {
                    var child = this.childVM
                    this.childVM = null
                    var refID = (child && child._refID) || this.refID
                    if (refID) {
                        this.vm.$[refID] = null
                    }
                },

                /**
                 * Unbind.
                 */

                unbind: function () {
                    this.unbuild()
                    // destroy all keep-alive cached instances
                    if (this.cache) {
                        for (var key in this.cache) {
                            this.cache[key].$destroy()
                        }
                        this.cache = null
                    }
                }

            }

            /***/ },
        /* 44 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)
            var isObject = _.isObject
            var isPlainObject = _.isPlainObject
            var textParser = __webpack_require__(19)
            var expParser = __webpack_require__(22)
            var templateParser = __webpack_require__(20)
            var compile = __webpack_require__(16)
            var transclude = __webpack_require__(17)
            var mergeOptions = __webpack_require__(14)
            var uid = 0

            module.exports = {

                /**
                 * Setup.
                 */

                bind: function () {
                    // uid as a cache identifier
                    this.id = '__v_repeat_' + (++uid)
                    // we need to insert the objToArray converter
                    // as the first read filter, because it has to be invoked
                    // before any user filters. (can't do it in `update`)
                    if (!this.filters) {
                        this.filters = {}
                    }
                    // add the object -> array convert filter
                    var objectConverter = _.bind(objToArray, this)
                    if (!this.filters.read) {
                        this.filters.read = [objectConverter]
                    } else {
                        this.filters.read.unshift(objectConverter)
                    }
                    // setup ref node
                    this.ref = document.createComment('v-repeat')
                    _.replace(this.el, this.ref)
                    // check if this is a block repeat
                    this.template = this.el.tagName === 'TEMPLATE'
                        ? templateParser.parse(this.el, true)
                        : this.el
                    // check other directives that need to be handled
                    // at v-repeat level
                    this.checkIf()
                    this.checkRef()
                    this.checkComponent()
                    // check for trackby param
                    this.idKey =
                        this._checkParam('track-by') ||
                        this._checkParam('trackby') // 0.11.0 compat
                    this.cache = Object.create(null)
                },

                /**
                 * Warn against v-if usage.
                 */

                checkIf: function () {
                    if (_.attr(this.el, 'if') !== null) {
                        _.warn(
                            'Don\'t use v-if with v-repeat. ' +
                            'Use v-show or the "filterBy" filter instead.'
                        )
                    }
                },

                /**
                 * Check if v-ref/ v-el is also present.
                 */

                checkRef: function () {
                    var refID = _.attr(this.el, 'ref')
                    this.refID = refID
                        ? this.vm.$interpolate(refID)
                        : null
                    var elId = _.attr(this.el, 'el')
                    this.elId = elId
                        ? this.vm.$interpolate(elId)
                        : null
                },

                /**
                 * Check the component constructor to use for repeated
                 * instances. If static we resolve it now, otherwise it
                 * needs to be resolved at build time with actual data.
                 */

                checkComponent: function () {
                    var id = _.attr(this.el, 'component')
                    var options = this.vm.$options
                    if (!id) {
                        // default constructor
                        this.Ctor = _.Vue
                        // inline repeats should inherit
                        this.inherit = true
                        // important: transclude with no options, just
                        // to ensure block start and block end
                        this.template = transclude(this.template)
                        this._linkFn = compile(this.template, options)
                    } else {
                        this.asComponent = true
                        // check inline-template
                        if (this._checkParam('inline-template') !== null) {
                            // extract inline template as a DocumentFragment
                            this.inlineTempalte = _.extractContent(this.el, true)
                        }
                        var tokens = textParser.parse(id)
                        if (!tokens) { // static component
                            var Ctor = this.Ctor = options.components[id]
                            _.assertAsset(Ctor, 'component', id)
                            var merged = mergeOptions(Ctor.options, {}, {
                                $parent: this.vm
                            })
                            merged.template = this.inlineTempalte || merged.template
                            merged._asComponent = true
                            merged._parent = this.vm
                            this.template = transclude(this.template, merged)
                            // Important: mark the template as a root node so that
                            // custom element components don't get compiled twice.
                            // fixes #822
                            this.template.__vue__ = true
                            this._linkFn = compile(this.template, merged)
                        } else {
                            // to be resolved later
                            var ctorExp = textParser.tokensToExp(tokens)
                            this.ctorGetter = expParser.parse(ctorExp).get
                        }
                    }
                },

                /**
                 * Update.
                 * This is called whenever the Array mutates.
                 *
                 * @param {Array|Number|String} data
                 */

                update: function (data) {
                    data = data || []
                    var type = typeof data
                    if (type === 'number') {
                        data = range(data)
                    } else if (type === 'string') {
                        data = _.toArray(data)
                    }
                    this.vms = this.diff(data, this.vms)
                    // update v-ref
                    if (this.refID) {
                        this.vm.$[this.refID] = this.vms
                    }
                    if (this.elId) {
                        this.vm.$$[this.elId] = this.vms.map(function (vm) {
                            return vm.$el
                        })
                    }
                },

                /**
                 * Diff, based on new data and old data, determine the
                 * minimum amount of DOM manipulations needed to make the
                 * DOM reflect the new data Array.
                 *
                 * The algorithm diffs the new data Array by storing a
                 * hidden reference to an owner vm instance on previously
                 * seen data. This allows us to achieve O(n) which is
                 * better than a levenshtein distance based algorithm,
                 * which is O(m * n).
                 *
                 * @param {Array} data
                 * @param {Array} oldVms
                 * @return {Array}
                 */

                diff: function (data, oldVms) {
                    var idKey = this.idKey
                    var converted = this.converted
                    var ref = this.ref
                    var alias = this.arg
                    var init = !oldVms
                    var vms = new Array(data.length)
                    var obj, raw, vm, i, l
                    // First pass, go through the new Array and fill up
                    // the new vms array. If a piece of data has a cached
                    // instance for it, we reuse it. Otherwise build a new
                    // instance.
                    for (i = 0, l = data.length; i < l; i++) {
                        obj = data[i]
                        raw = converted ? obj.$value : obj
                        vm = !init && this.getVm(raw)
                        if (vm) { // reusable instance
                            vm._reused = true
                            vm.$index = i // update $index
                            if (converted) {
                                vm.$key = obj.$key // update $key
                            }
                            if (idKey) { // swap track by id data
                                if (alias) {
                                    vm[alias] = raw
                                } else {
                                    vm._setData(raw)
                                }
                            }
                        } else { // new instance
                            vm = this.build(obj, i, true)
                            vm._new = true
                            vm._reused = false
                        }
                        vms[i] = vm
                        // insert if this is first run
                        if (init) {
                            vm.$before(ref)
                        }
                    }
                    // if this is the first run, we're done.
                    if (init) {
                        return vms
                    }
                    // Second pass, go through the old vm instances and
                    // destroy those who are not reused (and remove them
                    // from cache)
                    for (i = 0, l = oldVms.length; i < l; i++) {
                        vm = oldVms[i]
                        if (!vm._reused) {
                            this.uncacheVm(vm)
                            vm.$destroy(true)
                        }
                    }
                    // final pass, move/insert new instances into the
                    // right place. We're going in reverse here because
                    // insertBefore relies on the next sibling to be
                    // resolved.
                    var targetNext, currentNext
                    i = vms.length
                    while (i--) {
                        vm = vms[i]
                        // this is the vm that we should be in front of
                        targetNext = vms[i + 1]
                        if (!targetNext) {
                            // This is the last item. If it's reused then
                            // everything else will eventually be in the right
                            // place, so no need to touch it. Otherwise, insert
                            // it.
                            if (!vm._reused) {
                                vm.$before(ref)
                            }
                        } else {
                            var nextEl = targetNext.$el
                            if (vm._reused) {
                                // this is the vm we are actually in front of
                                currentNext = findNextVm(vm, ref)
                                // we only need to move if we are not in the right
                                // place already.
                                if (currentNext !== targetNext) {
                                    vm.$before(nextEl, null, false)
                                }
                            } else {
                                // new instance, insert to existing next
                                vm.$before(nextEl)
                            }
                        }
                        vm._new = false
                        vm._reused = false
                    }
                    return vms
                },

                /**
                 * Build a new instance and cache it.
                 *
                 * @param {Object} data
                 * @param {Number} index
                 * @param {Boolean} needCache
                 */

                build: function (data, index, needCache) {
                    var meta = { $index: index }
                    if (this.converted) {
                        meta.$key = data.$key
                    }
                    var raw = this.converted ? data.$value : data
                    var alias = this.arg
                    if (alias) {
                        data = {}
                        data[alias] = raw
                    } else if (!isPlainObject(raw)) {
                        // non-object values
                        data = {}
                        meta.$value = raw
                    } else {
                        // default
                        data = raw
                    }
                    // resolve constructor
                    var Ctor = this.Ctor || this.resolveCtor(data, meta)
                    var vm = this.vm.$addChild({
                        el: templateParser.clone(this.template),
                        _asComponent: this.asComponent,
                        _host: this._host,
                        _linkFn: this._linkFn,
                        _meta: meta,
                        data: data,
                        inherit: this.inherit,
                        template: this.inlineTempalte
                    }, Ctor)
                    // flag this instance as a repeat instance
                    // so that we can skip it in vm._digest
                    vm._repeat = true
                    // cache instance
                    if (needCache) {
                        this.cacheVm(raw, vm)
                    }
                    // sync back changes for $value, particularly for
                    // two-way bindings of primitive values
                    var self = this
                    vm.$watch('$value', function (val) {
                        if (self.converted) {
                            self.rawValue[vm.$key] = val
                        } else {
                            self.rawValue.$set(vm.$index, val)
                        }
                    })
                    return vm
                },

                /**
                 * Resolve a contructor to use for an instance.
                 * The tricky part here is that there could be dynamic
                 * components depending on instance data.
                 *
                 * @param {Object} data
                 * @param {Object} meta
                 * @return {Function}
                 */

                resolveCtor: function (data, meta) {
                    // create a temporary context object and copy data
                    // and meta properties onto it.
                    // use _.define to avoid accidentally overwriting scope
                    // properties.
                    var context = Object.create(this.vm)
                    var key
                    for (key in data) {
                        _.define(context, key, data[key])
                    }
                    for (key in meta) {
                        _.define(context, key, meta[key])
                    }
                    var id = this.ctorGetter.call(context, context)
                    var Ctor = this.vm.$options.components[id]
                    _.assertAsset(Ctor, 'component', id)
                    return Ctor
                },

                /**
                 * Unbind, teardown everything
                 */

                unbind: function () {
                    if (this.refID) {
                        this.vm.$[this.refID] = null
                    }
                    if (this.vms) {
                        var i = this.vms.length
                        var vm
                        while (i--) {
                            vm = this.vms[i]
                            this.uncacheVm(vm)
                            vm.$destroy()
                        }
                    }
                },

                /**
                 * Cache a vm instance based on its data.
                 *
                 * If the data is an object, we save the vm's reference on
                 * the data object as a hidden property. Otherwise we
                 * cache them in an object and for each primitive value
                 * there is an array in case there are duplicates.
                 *
                 * @param {Object} data
                 * @param {Vue} vm
                 */

                cacheVm: function (data, vm) {
                    var idKey = this.idKey
                    var cache = this.cache
                    var id
                    if (idKey) {
                        id = data[idKey]
                        if (!cache[id]) {
                            cache[id] = vm
                        } else {
                            _.warn('Duplicate track-by key in v-repeat: ' + id)
                        }
                    } else if (isObject(data)) {
                        id = this.id
                        if (data.hasOwnProperty(id)) {
                            if (data[id] === null) {
                                data[id] = vm
                            } else {
                                _.warn(
                                    'Duplicate objects are not supported in v-repeat ' +
                                    'when using components or transitions.'
                                )
                            }
                        } else {
                            _.define(data, this.id, vm)
                        }
                    } else {
                        if (!cache[data]) {
                            cache[data] = [vm]
                        } else {
                            cache[data].push(vm)
                        }
                    }
                    vm._raw = data
                },

                /**
                 * Try to get a cached instance from a piece of data.
                 *
                 * @param {Object} data
                 * @return {Vue|undefined}
                 */

                getVm: function (data) {
                    if (this.idKey) {
                        return this.cache[data[this.idKey]]
                    } else if (isObject(data)) {
                        return data[this.id]
                    } else {
                        var cached = this.cache[data]
                        if (cached) {
                            var i = 0
                            var vm = cached[i]
                            // since duplicated vm instances might be a reused
                            // one OR a newly created one, we need to return the
                            // first instance that is neither of these.
                            while (vm && (vm._reused || vm._new)) {
                                vm = cached[++i]
                            }
                            return vm
                        }
                    }
                },

                /**
                 * Delete a cached vm instance.
                 *
                 * @param {Vue} vm
                 */

                uncacheVm: function (vm) {
                    var data = vm._raw
                    if (this.idKey) {
                        this.cache[data[this.idKey]] = null
                    } else if (isObject(data)) {
                        data[this.id] = null
                        vm._raw = null
                    } else {
                        this.cache[data].pop()
                    }
                }

            }

            /**
             * Helper to find the next element that is an instance
             * root node. This is necessary because a destroyed vm's
             * element could still be lingering in the DOM before its
             * leaving transition finishes, but its __vue__ reference
             * should have been removed so we can skip them.
             *
             * @param {Vue} vm
             * @param {CommentNode} ref
             * @return {Vue}
             */

            function findNextVm (vm, ref) {
                var el = (vm._blockEnd || vm.$el).nextSibling
                while (!el.__vue__ && el !== ref) {
                    el = el.nextSibling
                }
                return el.__vue__
            }

            /**
             * Attempt to convert non-Array objects to array.
             * This is the default filter installed to every v-repeat
             * directive.
             *
             * It will be called with **the directive** as `this`
             * context so that we can mark the repeat array as converted
             * from an object.
             *
             * @param {*} obj
             * @return {Array}
             * @private
             */

            function objToArray (obj) {
                // regardless of type, store the un-filtered raw value.
                this.rawValue = obj
                if (!isPlainObject(obj)) {
                    return obj
                }
                var keys = Object.keys(obj)
                var i = keys.length
                var res = new Array(i)
                var key
                while (i--) {
                    key = keys[i]
                    res[i] = {
                        $key: key,
                        $value: obj[key]
                    }
                }
                // `this` points to the repeat directive instance
                this.converted = true
                return res
            }

            /**
             * Create a range array from given number.
             *
             * @param {Number} n
             * @return {Array}
             */

            function range (n) {
                var i = -1
                var ret = new Array(n)
                while (++i < n) {
                    ret[i] = i
                }
                return ret
            }

            /***/ },
        /* 45 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)
            var compile = __webpack_require__(16)
            var templateParser = __webpack_require__(20)
            var transition = __webpack_require__(50)

            module.exports = {

                bind: function () {
                    var el = this.el
                    if (!el.__vue__) {
                        this.start = document.createComment('v-if-start')
                        this.end = document.createComment('v-if-end')
                        _.replace(el, this.end)
                        _.before(this.start, this.end)
                        if (el.tagName === 'TEMPLATE') {
                            this.template = templateParser.parse(el, true)
                        } else {
                            this.template = document.createDocumentFragment()
                            this.template.appendChild(templateParser.clone(el))
                        }
                        // compile the nested partial
                        this.linker = compile(
                            this.template,
                            this.vm.$options,
                            true
                        )
                    } else {
                        this.invalid = true
                        _.warn(
                            'v-if="' + this.expression + '" cannot be ' +
                            'used on an already mounted instance.'
                        )
                    }
                },

                update: function (value) {
                    if (this.invalid) return
                    if (value) {
                        // avoid duplicate compiles, since update() can be
                        // called with different truthy values
                        if (!this.unlink) {
                            var frag = templateParser.clone(this.template)
                            this.compile(frag)
                        }
                    } else {
                        this.teardown()
                    }
                },

                // NOTE: this function is shared in v-partial
                compile: function (frag) {
                    var vm = this.vm
                    // the linker is not guaranteed to be present because
                    // this function might get called by v-partial 
                    this.unlink = this.linker
                        ? this.linker(vm, frag)
                        : vm.$compile(frag)
                    transition.blockAppend(frag, this.end, vm)
                    // call attached for all the child components created
                    // during the compilation
                    if (_.inDoc(vm.$el)) {
                        var children = this.getContainedComponents()
                        if (children) children.forEach(callAttach)
                    }
                },

                // NOTE: this function is shared in v-partial
                teardown: function () {
                    if (!this.unlink) return
                    // collect children beforehand
                    var children
                    if (_.inDoc(this.vm.$el)) {
                        children = this.getContainedComponents()
                    }
                    transition.blockRemove(this.start, this.end, this.vm)
                    if (children) children.forEach(callDetach)
                    this.unlink()
                    this.unlink = null
                },

                // NOTE: this function is shared in v-partial
                getContainedComponents: function () {
                    var vm = this.vm
                    var start = this.start.nextSibling
                    var end = this.end
                    var selfCompoents =
                        vm._children.length &&
                        vm._children.filter(contains)
                    var transComponents =
                        vm._transCpnts &&
                        vm._transCpnts.filter(contains)

                    function contains (c) {
                        var cur = start
                        var next
                        while (next !== end) {
                            next = cur.nextSibling
                            if (cur.contains(c.$el)) {
                                return true
                            }
                            cur = next
                        }
                        return false
                    }

                    return selfCompoents
                        ? transComponents
                        ? selfCompoents.concat(transComponents)
                        : selfCompoents
                        : transComponents
                },

                // NOTE: this function is shared in v-partial
                unbind: function () {
                    if (this.unlink) this.unlink()
                }

            }

            function callAttach (child) {
                if (!child._isAttached) {
                    child._callHook('attached')
                }
            }

            function callDetach (child) {
                if (child._isAttached) {
                    child._callHook('detached')
                }
            }

            /***/ },
        /* 46 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)
            var Watcher = __webpack_require__(25)
            var expParser = __webpack_require__(22)
            var literalRE = /^(true|false|\s?('[^']*'|"[^"]")\s?)$/

            module.exports = {

                priority: 900,

                bind: function () {

                    var child = this.vm
                    var parent = child.$parent
                    var childKey = this.arg || '$data'
                    var parentKey = this.expression

                    if (this.el && this.el !== child.$el) {
                        _.warn(
                            'v-with can only be used on instance root elements.'
                        )
                    } else if (!parent) {
                        _.warn(
                            'v-with must be used on an instance with a parent.'
                        )
                    } else if (literalRE.test(parentKey)) {
                        // no need to setup watchers for literal bindings
                        if (!this.arg) {
                            _.warn(
                                'v-with cannot bind literal value as $data: ' +
                                parentKey
                            )
                        } else {
                            var value = expParser.parse(parentKey).get()
                            child.$set(childKey, value)
                        }
                    } else {

                        // simple lock to avoid circular updates.
                        // without this it would stabilize too, but this makes
                        // sure it doesn't cause other watchers to re-evaluate.
                        var locked = false
                        var lock = function () {
                            locked = true
                            _.nextTick(unlock)
                        }
                        var unlock = function () {
                            locked = false
                        }

                        this.parentWatcher = new Watcher(
                            parent,
                            parentKey,
                            function (val) {
                                if (!locked) {
                                    lock()
                                    child.$set(childKey, val)
                                }
                            }
                        )

                        // set the child initial value first, before setting
                        // up the child watcher to avoid triggering it
                        // immediately.
                        child.$set(childKey, this.parentWatcher.value)

                        this.childWatcher = new Watcher(
                            child,
                            childKey,
                            function (val) {
                                if (!locked) {
                                    lock()
                                    parent.$set(parentKey, val)
                                }
                            }
                        )
                    }
                },

                unbind: function () {
                    if (this.parentWatcher) {
                        this.parentWatcher.teardown()
                        this.childWatcher.teardown()
                    }
                }

            }

            /***/ },
        /* 47 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)

            module.exports = {

                acceptStatement: true,

                bind: function () {
                    var child = this.el.__vue__
                    if (!child || this.vm !== child.$parent) {
                        _.warn(
                            '`v-events` should only be used on a child component ' +
                            'from the parent template.'
                        )
                        return
                    }
                },

                update: function (handler, oldHandler) {
                    if (typeof handler !== 'function') {
                        _.warn(
                            'Directive "v-events:' + this.expression + '" ' +
                            'expects a function value.'
                        )
                        return
                    }
                    var child = this.el.__vue__
                    if (oldHandler) {
                        child.$off(this.arg, oldHandler)
                    }
                    child.$on(this.arg, handler)
                }

                // when child is destroyed, all events are turned off,
                // so no need for unbind here.

            }

            /***/ },
        /* 48 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)
            var Path = __webpack_require__(18)

            /**
             * Filter filter for v-repeat
             *
             * @param {String} searchKey
             * @param {String} [delimiter]
             * @param {String} dataKey
             */

            exports.filterBy = function (arr, searchKey, delimiter, dataKey) {
                // allow optional `in` delimiter
                // because why not
                if (delimiter && delimiter !== 'in') {
                    dataKey = delimiter
                }
                // get the search string
                var search =
                    _.stripQuotes(searchKey) ||
                    this.$get(searchKey)
                if (!search) {
                    return arr
                }
                search = ('' + search).toLowerCase()
                // get the optional dataKey
                dataKey =
                    dataKey &&
                    (_.stripQuotes(dataKey) || this.$get(dataKey))
                return arr.filter(function (item) {
                    return dataKey
                        ? contains(Path.get(item, dataKey), search)
                        : contains(item, search)
                })
            }

            /**
             * Filter filter for v-repeat
             *
             * @param {String} sortKey
             * @param {String} reverseKey
             */

            exports.orderBy = function (arr, sortKey, reverseKey) {
                var key =
                    _.stripQuotes(sortKey) ||
                    this.$get(sortKey)
                if (!key) {
                    return arr
                }
                var order = 1
                if (reverseKey) {
                    if (reverseKey === '-1') {
                        order = -1
                    } else if (reverseKey.charCodeAt(0) === 0x21) { // !
                        reverseKey = reverseKey.slice(1)
                        order = this.$get(reverseKey) ? 1 : -1
                    } else {
                        order = this.$get(reverseKey) ? -1 : 1
                    }
                }
                // sort on a copy to avoid mutating original array
                return arr.slice().sort(function (a, b) {
                    a = _.isObject(a) ? Path.get(a, key) : a
                    b = _.isObject(b) ? Path.get(b, key) : b
                    return a === b ? 0 : a > b ? order : -order
                })
            }

            /**
             * String contain helper
             *
             * @param {*} val
             * @param {String} search
             */

            function contains (val, search) {
                if (_.isObject(val)) {
                    for (var key in val) {
                        if (contains(val[key], search)) {
                            return true
                        }
                    }
                } else if (val != null) {
                    return val.toString().toLowerCase().indexOf(search) > -1
                }
            }

            /***/ },
        /* 49 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)
            var config = __webpack_require__(15)
            var Dep = __webpack_require__(23)
            var arrayMethods = __webpack_require__(54)
            var arrayKeys = Object.getOwnPropertyNames(arrayMethods)
            __webpack_require__(55)

            var uid = 0

            /**
             * Type enums
             */

            var ARRAY  = 0
            var OBJECT = 1

            /**
             * Augment an target Object or Array by intercepting
             * the prototype chain using __proto__
             *
             * @param {Object|Array} target
             * @param {Object} proto
             */

            function protoAugment (target, src) {
                target.__proto__ = src
            }

            /**
             * Augment an target Object or Array by defining
             * hidden properties.
             *
             * @param {Object|Array} target
             * @param {Object} proto
             */

            function copyAugment (target, src, keys) {
                var i = keys.length
                var key
                while (i--) {
                    key = keys[i]
                    _.define(target, key, src[key])
                }
            }

            /**
             * Observer class that are attached to each observed
             * object. Once attached, the observer converts target
             * object's property keys into getter/setters that
             * collect dependencies and dispatches updates.
             *
             * @param {Array|Object} value
             * @param {Number} type
             * @constructor
             */

            function Observer (value, type) {
                this.id = ++uid
                this.value = value
                this.active = true
                this.deps = []
                _.define(value, '__ob__', this)
                if (type === ARRAY) {
                    var augment = config.proto && _.hasProto
                        ? protoAugment
                        : copyAugment
                    augment(value, arrayMethods, arrayKeys)
                    this.observeArray(value)
                } else if (type === OBJECT) {
                    this.walk(value)
                }
            }

            Observer.target = null

            var p = Observer.prototype

            /**
             * Attempt to create an observer instance for a value,
             * returns the new observer if successfully observed,
             * or the existing observer if the value already has one.
             *
             * @param {*} value
             * @return {Observer|undefined}
             * @static
             */

            Observer.create = function (value) {
                if (
                    value &&
                    value.hasOwnProperty('__ob__') &&
                    value.__ob__ instanceof Observer
                ) {
                    return value.__ob__
                } else if (_.isArray(value)) {
                    return new Observer(value, ARRAY)
                } else if (
                    _.isPlainObject(value) &&
                    !value._isVue // avoid Vue instance
                ) {
                    return new Observer(value, OBJECT)
                }
            }

            /**
             * Walk through each property and convert them into
             * getter/setters. This method should only be called when
             * value type is Object. Properties prefixed with `$` or `_`
             * and accessor properties are ignored.
             *
             * @param {Object} obj
             */

            p.walk = function (obj) {
                var keys = Object.keys(obj)
                var i = keys.length
                var key, prefix
                while (i--) {
                    key = keys[i]
                    prefix = key.charCodeAt(0)
                    if (prefix !== 0x24 && prefix !== 0x5F) { // skip $ or _
                        this.convert(key, obj[key])
                    }
                }
            }

            /**
             * Try to carete an observer for a child value,
             * and if value is array, link dep to the array.
             *
             * @param {*} val
             * @return {Dep|undefined}
             */

            p.observe = function (val) {
                return Observer.create(val)
            }

            /**
             * Observe a list of Array items.
             *
             * @param {Array} items
             */

            p.observeArray = function (items) {
                var i = items.length
                while (i--) {
                    this.observe(items[i])
                }
            }

            /**
             * Convert a property into getter/setter so we can emit
             * the events when the property is accessed/changed.
             *
             * @param {String} key
             * @param {*} val
             */

            p.convert = function (key, val) {
                var ob = this
                var childOb = ob.observe(val)
                var dep = new Dep()
                if (childOb) {
                    childOb.deps.push(dep)
                }
                Object.defineProperty(ob.value, key, {
                    enumerable: true,
                    configurable: true,
                    get: function () {
                        // Observer.target is a watcher whose getter is
                        // currently being evaluated.
                        if (ob.active && Observer.target) {
                            Observer.target.addDep(dep)
                        }
                        return val
                    },
                    set: function (newVal) {
                        if (newVal === val) return
                        // remove dep from old value
                        var oldChildOb = val && val.__ob__
                        if (oldChildOb) {
                            var oldDeps = oldChildOb.deps
                            oldDeps.splice(oldDeps.indexOf(dep), 1)
                        }
                        val = newVal
                        // add dep to new value
                        var newChildOb = ob.observe(newVal)
                        if (newChildOb) {
                            newChildOb.deps.push(dep)
                        }
                        dep.notify()
                    }
                })
            }

            /**
             * Notify change on all self deps on an observer.
             * This is called when a mutable value mutates. e.g.
             * when an Array's mutating methods are called, or an
             * Object's $add/$delete are called.
             */

            p.notify = function () {
                var deps = this.deps
                for (var i = 0, l = deps.length; i < l; i++) {
                    deps[i].notify()
                }
            }

            /**
             * Add an owner vm, so that when $add/$delete mutations
             * happen we can notify owner vms to proxy the keys and
             * digest the watchers. This is only called when the object
             * is observed as an instance's root $data.
             *
             * @param {Vue} vm
             */

            p.addVm = function (vm) {
                (this.vms = this.vms || []).push(vm)
            }

            /**
             * Remove an owner vm. This is called when the object is
             * swapped out as an instance's $data object.
             *
             * @param {Vue} vm
             */

            p.removeVm = function (vm) {
                this.vms.splice(this.vms.indexOf(vm), 1)
            }

            module.exports = Observer


            /***/ },
        /* 50 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)
            var applyCSSTransition = __webpack_require__(56)
            var applyJSTransition = __webpack_require__(57)
            var doc = typeof document === 'undefined' ? null : document

            /**
             * Append with transition.
             *
             * @oaram {Element} el
             * @param {Element} target
             * @param {Vue} vm
             * @param {Function} [cb]
             */

            exports.append = function (el, target, vm, cb) {
                apply(el, 1, function () {
                    target.appendChild(el)
                }, vm, cb)
            }

            /**
             * InsertBefore with transition.
             *
             * @oaram {Element} el
             * @param {Element} target
             * @param {Vue} vm
             * @param {Function} [cb]
             */

            exports.before = function (el, target, vm, cb) {
                apply(el, 1, function () {
                    _.before(el, target)
                }, vm, cb)
            }

            /**
             * Remove with transition.
             *
             * @oaram {Element} el
             * @param {Vue} vm
             * @param {Function} [cb]
             */

            exports.remove = function (el, vm, cb) {
                apply(el, -1, function () {
                    _.remove(el)
                }, vm, cb)
            }

            /**
             * Remove by appending to another parent with transition.
             * This is only used in block operations.
             *
             * @oaram {Element} el
             * @param {Element} target
             * @param {Vue} vm
             * @param {Function} [cb]
             */

            exports.removeThenAppend = function (el, target, vm, cb) {
                apply(el, -1, function () {
                    target.appendChild(el)
                }, vm, cb)
            }

            /**
             * Append the childNodes of a fragment to target.
             *
             * @param {DocumentFragment} block
             * @param {Node} target
             * @param {Vue} vm
             */

            exports.blockAppend = function (block, target, vm) {
                var nodes = _.toArray(block.childNodes)
                for (var i = 0, l = nodes.length; i < l; i++) {
                    exports.before(nodes[i], target, vm)
                }
            }

            /**
             * Remove a block of nodes between two edge nodes.
             *
             * @param {Node} start
             * @param {Node} end
             * @param {Vue} vm
             */

            exports.blockRemove = function (start, end, vm) {
                var node = start.nextSibling
                var next
                while (node !== end) {
                    next = node.nextSibling
                    exports.remove(node, vm)
                    node = next
                }
            }

            /**
             * Apply transitions with an operation callback.
             *
             * @oaram {Element} el
             * @param {Number} direction
             *                  1: enter
             *                 -1: leave
             * @param {Function} op - the actual DOM operation
             * @param {Vue} vm
             * @param {Function} [cb]
             */

            var apply = exports.apply = function (el, direction, op, vm, cb) {
                var transData = el.__v_trans
                if (
                    !transData ||
                    !vm._isCompiled ||
                        // if the vm is being manipulated by a parent directive
                        // during the parent's compilation phase, skip the
                        // animation.
                    (vm.$parent && !vm.$parent._isCompiled)
                ) {
                    op()
                    if (cb) cb()
                    return
                }
                // determine the transition type on the element
                var jsTransition = transData.fns
                if (jsTransition) {
                    // js
                    applyJSTransition(
                        el,
                        direction,
                        op,
                        transData,
                        jsTransition,
                        vm,
                        cb
                    )
                } else if (
                    _.transitionEndEvent &&
                        // skip CSS transitions if page is not visible -
                        // this solves the issue of transitionend events not
                        // firing until the page is visible again.
                        // pageVisibility API is supported in IE10+, same as
                        // CSS transitions.
                    !(doc && doc.hidden)
                ) {
                    // css
                    applyCSSTransition(
                        el,
                        direction,
                        op,
                        transData,
                        cb
                    )
                } else {
                    // not applicable
                    op()
                    if (cb) cb()
                }
            }

            /***/ },
        /* 51 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)

            var handlers = {
                _default: __webpack_require__(58),
                radio: __webpack_require__(59),
                select: __webpack_require__(60),
                checkbox: __webpack_require__(61)
            }

            module.exports = {

                priority: 800,
                twoWay: true,
                handlers: handlers,

                /**
                 * Possible elements:
                 *   <select>
                 *   <textarea>
                 *   <input type="*">
                 *     - text
                 *     - checkbox
                 *     - radio
                 *     - number
                 *     - TODO: more types may be supplied as a plugin
                 */

                bind: function () {
                    // friendly warning...
                    var filters = this.filters
                    if (filters && filters.read && !filters.write) {
                        _.warn(
                            'It seems you are using a read-only filter with ' +
                            'v-model. You might want to use a two-way filter ' +
                            'to ensure correct behavior.'
                        )
                    }
                    var el = this.el
                    var tag = el.tagName
                    var handler
                    if (tag === 'INPUT') {
                        handler = handlers[el.type] || handlers._default
                    } else if (tag === 'SELECT') {
                        handler = handlers.select
                    } else if (tag === 'TEXTAREA') {
                        handler = handlers._default
                    } else {
                        _.warn("v-model doesn't support element type: " + tag)
                        return
                    }
                    handler.bind.call(this)
                    this.update = handler.update
                    this.unbind = handler.unbind
                }

            }

            /***/ },
        /* 52 */
        /***/ function(module, exports, __webpack_require__) {

            /**
             * A doubly linked list-based Least Recently Used (LRU)
             * cache. Will keep most recently used items while
             * discarding least recently used items when its limit is
             * reached. This is a bare-bone version of
             * Rasmus Andersson's js-lru:
             *
             *   https://github.com/rsms/js-lru
             *
             * @param {Number} limit
             * @constructor
             */

            function Cache (limit) {
                this.size = 0
                this.limit = limit
                this.head = this.tail = undefined
                this._keymap = {}
            }

            var p = Cache.prototype

            /**
             * Put <value> into the cache associated with <key>.
             * Returns the entry which was removed to make room for
             * the new entry. Otherwise undefined is returned.
             * (i.e. if there was enough room already).
             *
             * @param {String} key
             * @param {*} value
             * @return {Entry|undefined}
             */

            p.put = function (key, value) {
                var entry = {
                    key:key,
                    value:value
                }
                this._keymap[key] = entry
                if (this.tail) {
                    this.tail.newer = entry
                    entry.older = this.tail
                } else {
                    this.head = entry
                }
                this.tail = entry
                if (this.size === this.limit) {
                    return this.shift()
                } else {
                    this.size++
                }
            }

            /**
             * Purge the least recently used (oldest) entry from the
             * cache. Returns the removed entry or undefined if the
             * cache was empty.
             */

            p.shift = function () {
                var entry = this.head
                if (entry) {
                    this.head = this.head.newer
                    this.head.older = undefined
                    entry.newer = entry.older = undefined
                    this._keymap[entry.key] = undefined
                }
                return entry
            }

            /**
             * Get and register recent use of <key>. Returns the value
             * associated with <key> or undefined if not in cache.
             *
             * @param {String} key
             * @param {Boolean} returnEntry
             * @return {Entry|*}
             */

            p.get = function (key, returnEntry) {
                var entry = this._keymap[key]
                if (entry === undefined) return
                if (entry === this.tail) {
                    return returnEntry
                        ? entry
                        : entry.value
                }
                // HEAD--------------TAIL
                //   <.older   .newer>
                //  <--- add direction --
                //   A  B  C  <D>  E
                if (entry.newer) {
                    if (entry === this.head) {
                        this.head = entry.newer
                    }
                    entry.newer.older = entry.older // C <-- E.
                }
                if (entry.older) {
                    entry.older.newer = entry.newer // C. --> E
                }
                entry.newer = undefined // D --x
                entry.older = this.tail // D. --> E
                if (this.tail) {
                    this.tail.newer = entry // E. <-- D
                }
                this.tail = entry
                return returnEntry
                    ? entry
                    : entry.value
            }

            module.exports = Cache

            /***/ },
        /* 53 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)
            var MAX_UPDATE_COUNT = 10

            // we have two separate queues: one for directive updates
            // and one for user watcher registered via $watch().
            // we want to guarantee directive updates to be called
            // before user watchers so that when user watchers are
            // triggered, the DOM would have already been in updated
            // state.
            var queue = []
            var userQueue = []
            var has = {}
            var waiting = false
            var flushing = false

            /**
             * Reset the batcher's state.
             */

            function reset () {
                queue = []
                userQueue = []
                has = {}
                waiting = false
                flushing = false
            }

            /**
             * Flush both queues and run the jobs.
             */

            function flush () {
                flushing = true
                run(queue)
                run(userQueue)
                reset()
            }

            /**
             * Run the jobs in a single queue.
             *
             * @param {Array} queue
             */

            function run (queue) {
                // do not cache length because more jobs might be pushed
                // as we run existing jobs
                for (var i = 0; i < queue.length; i++) {
                    queue[i].run()
                }
            }

            /**
             * Push a job into the job queue.
             * Jobs with duplicate IDs will be skipped unless it's
             * pushed when the queue is being flushed.
             *
             * @param {Object} job
             *   properties:
             *   - {String|Number} id
             *   - {Function}      run
             */

            exports.push = function (job) {
                var id = job.id
                if (!id || !has[id] || flushing) {
                    if (!has[id]) {
                        has[id] = 1
                    } else {
                        has[id]++
                        // detect possible infinite update loops
                        if (has[id] > MAX_UPDATE_COUNT) {
                            _.warn(
                                'You may have an infinite update loop for the ' +
                                'watcher with expression: "' + job.expression + '".'
                            )
                            return
                        }
                    }
                    // A user watcher callback could trigger another
                    // directive update during the flushing; at that time
                    // the directive queue would already have been run, so
                    // we call that update immediately as it is pushed.
                    if (flushing && !job.user) {
                        job.run()
                        return
                    }
                    ;(job.user ? userQueue : queue).push(job)
                    if (!waiting) {
                        waiting = true
                        _.nextTick(flush)
                    }
                }
            }

            /***/ },
        /* 54 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)
            var arrayProto = Array.prototype
            var arrayMethods = Object.create(arrayProto)

            /**
             * Intercept mutating methods and emit events
             */

                ;[
                'push',
                'pop',
                'shift',
                'unshift',
                'splice',
                'sort',
                'reverse'
            ]
                .forEach(function (method) {
                    // cache original method
                    var original = arrayProto[method]
                    _.define(arrayMethods, method, function mutator () {
                        // avoid leaking arguments:
                        // http://jsperf.com/closure-with-arguments
                        var i = arguments.length
                        var args = new Array(i)
                        while (i--) {
                            args[i] = arguments[i]
                        }
                        var result = original.apply(this, args)
                        var ob = this.__ob__
                        var inserted
                        switch (method) {
                            case 'push':
                                inserted = args
                                break
                            case 'unshift':
                                inserted = args
                                break
                            case 'splice':
                                inserted = args.slice(2)
                                break
                        }
                        if (inserted) ob.observeArray(inserted)
                        // notify change
                        ob.notify()
                        return result
                    })
                })

            /**
             * Swap the element at the given index with a new value
             * and emits corresponding event.
             *
             * @param {Number} index
             * @param {*} val
             * @return {*} - replaced element
             */

            _.define(
                arrayProto,
                '$set',
                function $set (index, val) {
                    if (index >= this.length) {
                        this.length = index + 1
                    }
                    return this.splice(index, 1, val)[0]
                }
            )

            /**
             * Convenience method to remove the element at given index.
             *
             * @param {Number} index
             * @param {*} val
             */

            _.define(
                arrayProto,
                '$remove',
                function $remove (index) {
                    if (typeof index !== 'number') {
                        index = this.indexOf(index)
                    }
                    if (index > -1) {
                        return this.splice(index, 1)[0]
                    }
                }
            )

            module.exports = arrayMethods

            /***/ },
        /* 55 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)
            var objProto = Object.prototype

            /**
             * Add a new property to an observed object
             * and emits corresponding event
             *
             * @param {String} key
             * @param {*} val
             * @public
             */

            _.define(
                objProto,
                '$add',
                function $add (key, val) {
                    if (this.hasOwnProperty(key)) return
                    var ob = this.__ob__
                    if (!ob || _.isReserved(key)) {
                        this[key] = val
                        return
                    }
                    ob.convert(key, val)
                    if (ob.vms) {
                        var i = ob.vms.length
                        while (i--) {
                            var vm = ob.vms[i]
                            vm._proxy(key)
                            vm._digest()
                        }
                    } else {
                        ob.notify()
                    }
                }
            )

            /**
             * Set a property on an observed object, calling add to
             * ensure the property is observed.
             *
             * @param {String} key
             * @param {*} val
             * @public
             */

            _.define(
                objProto,
                '$set',
                function $set (key, val) {
                    this.$add(key, val)
                    this[key] = val
                }
            )

            /**
             * Deletes a property from an observed object
             * and emits corresponding event
             *
             * @param {String} key
             * @public
             */

            _.define(
                objProto,
                '$delete',
                function $delete (key) {
                    if (!this.hasOwnProperty(key)) return
                    delete this[key]
                    var ob = this.__ob__
                    if (!ob || _.isReserved(key)) {
                        return
                    }
                    if (ob.vms) {
                        var i = ob.vms.length
                        while (i--) {
                            var vm = ob.vms[i]
                            vm._unproxy(key)
                            vm._digest()
                        }
                    } else {
                        ob.notify()
                    }
                }
            )

            /***/ },
        /* 56 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)
            var addClass = _.addClass
            var removeClass = _.removeClass
            var transDurationProp = _.transitionProp + 'Duration'
            var animDurationProp = _.animationProp + 'Duration'

            var queue = []
            var queued = false

            /**
             * Push a job into the transition queue, which is to be
             * executed on next frame.
             *
             * @param {Element} el    - target element
             * @param {Number} dir    - 1: enter, -1: leave
             * @param {Function} op   - the actual dom operation
             * @param {String} cls    - the className to remove when the
             *                          transition is done.
             * @param {Function} [cb] - user supplied callback.
             */

            function push (el, dir, op, cls, cb) {
                queue.push({
                    el  : el,
                    dir : dir,
                    cb  : cb,
                    cls : cls,
                    op  : op
                })
                if (!queued) {
                    queued = true
                    _.nextTick(flush)
                }
            }

            /**
             * Flush the queue, and do one forced reflow before
             * triggering transitions.
             */

            function flush () {
                /* jshint unused: false */
                var f = document.documentElement.offsetHeight
                queue.forEach(run)
                queue = []
                queued = false
            }

            /**
             * Run a transition job.
             *
             * @param {Object} job
             */

            function run (job) {

                var el = job.el
                var data = el.__v_trans
                var cls = job.cls
                var cb = job.cb
                var op = job.op
                var transitionType = getTransitionType(el, data, cls)

                if (job.dir > 0) { // ENTER
                    if (transitionType === 1) {
                        // trigger transition by removing enter class
                        removeClass(el, cls)
                        // only need to listen for transitionend if there's
                        // a user callback
                        if (cb) setupTransitionCb(_.transitionEndEvent)
                    } else if (transitionType === 2) {
                        // animations are triggered when class is added
                        // so we just listen for animationend to remove it.
                        setupTransitionCb(_.animationEndEvent, function () {
                            removeClass(el, cls)
                        })
                    } else {
                        // no transition applicable
                        removeClass(el, cls)
                        if (cb) cb()
                    }
                } else { // LEAVE
                    if (transitionType) {
                        // leave transitions/animations are both triggered
                        // by adding the class, just remove it on end event.
                        var event = transitionType === 1
                            ? _.transitionEndEvent
                            : _.animationEndEvent
                        setupTransitionCb(event, function () {
                            op()
                            removeClass(el, cls)
                        })
                    } else {
                        op()
                        removeClass(el, cls)
                        if (cb) cb()
                    }
                }

                /**
                 * Set up a transition end callback, store the callback
                 * on the element's __v_trans data object, so we can
                 * clean it up if another transition is triggered before
                 * the callback is fired.
                 *
                 * @param {String} event
                 * @param {Function} [cleanupFn]
                 */

                function setupTransitionCb (event, cleanupFn) {
                    data.event = event
                    var onEnd = data.callback = function transitionCb (e) {
                        if (e.target === el) {
                            _.off(el, event, onEnd)
                            data.event = data.callback = null
                            if (cleanupFn) cleanupFn()
                            if (cb) cb()
                        }
                    }
                    _.on(el, event, onEnd)
                }
            }

            /**
             * Get an element's transition type based on the
             * calculated styles
             *
             * @param {Element} el
             * @param {Object} data
             * @param {String} className
             * @return {Number}
             *         1 - transition
             *         2 - animation
             */

            function getTransitionType (el, data, className) {
                var type = data.cache && data.cache[className]
                if (type) return type
                var inlineStyles = el.style
                var computedStyles = window.getComputedStyle(el)
                var transDuration =
                    inlineStyles[transDurationProp] ||
                    computedStyles[transDurationProp]
                if (transDuration && transDuration !== '0s') {
                    type = 1
                } else {
                    var animDuration =
                        inlineStyles[animDurationProp] ||
                        computedStyles[animDurationProp]
                    if (animDuration && animDuration !== '0s') {
                        type = 2
                    }
                }
                if (type) {
                    if (!data.cache) data.cache = {}
                    data.cache[className] = type
                }
                return type
            }

            /**
             * Apply CSS transition to an element.
             *
             * @param {Element} el
             * @param {Number} direction - 1: enter, -1: leave
             * @param {Function} op - the actual DOM operation
             * @param {Object} data - target element's transition data
             */

            module.exports = function (el, direction, op, data, cb) {
                var prefix = data.id || 'v'
                var enterClass = prefix + '-enter'
                var leaveClass = prefix + '-leave'
                // clean up potential previous unfinished transition
                if (data.callback) {
                    _.off(el, data.event, data.callback)
                    removeClass(el, enterClass)
                    removeClass(el, leaveClass)
                    data.event = data.callback = null
                }
                if (direction > 0) { // enter
                    addClass(el, enterClass)
                    op()
                    push(el, direction, null, enterClass, cb)
                } else { // leave
                    addClass(el, leaveClass)
                    push(el, direction, op, leaveClass, cb)
                }
            }

            /***/ },
        /* 57 */
        /***/ function(module, exports, __webpack_require__) {

            /**
             * Apply JavaScript enter/leave functions.
             *
             * @param {Element} el
             * @param {Number} direction - 1: enter, -1: leave
             * @param {Function} op - the actual DOM operation
             * @param {Object} data - target element's transition data
             * @param {Object} def - transition definition object
             * @param {Vue} vm - the owner vm of the element
             * @param {Function} [cb]
             */

            module.exports = function (el, direction, op, data, def, vm, cb) {
                // if the element is the root of an instance,
                // use that instance as the transition function context
                vm = el.__vue__ || vm
                if (data.cancel) {
                    data.cancel()
                    data.cancel = null
                }
                if (direction > 0) { // enter
                    if (def.beforeEnter) {
                        def.beforeEnter.call(vm, el)
                    }
                    op()
                    if (def.enter) {
                        data.cancel = def.enter.call(vm, el, function () {
                            data.cancel = null
                            if (cb) cb()
                        })
                    } else if (cb) {
                        cb()
                    }
                } else { // leave
                    if (def.leave) {
                        data.cancel = def.leave.call(vm, el, function () {
                            data.cancel = null
                            op()
                            if (cb) cb()
                        })
                    } else {
                        op()
                        if (cb) cb()
                    }
                }
            }

            /***/ },
        /* 58 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)

            module.exports = {

                bind: function () {
                    var self = this
                    var el = this.el

                    // check params
                    // - lazy: update model on "change" instead of "input"
                    var lazy = this._checkParam('lazy') != null
                    // - number: cast value into number when updating model.
                    var number = this._checkParam('number') != null
                    // - debounce: debounce the input listener
                    var debounce = parseInt(this._checkParam('debounce'), 10)

                    // handle composition events.
                    // http://blog.evanyou.me/2014/01/03/composition-event/
                    var cpLocked = false
                    this.cpLock = function () {
                        cpLocked = true
                    }
                    this.cpUnlock = function () {
                        cpLocked = false
                        // in IE11 the "compositionend" event fires AFTER
                        // the "input" event, so the input handler is blocked
                        // at the end... have to call it here.
                        set()
                    }
                    _.on(el,'compositionstart', this.cpLock)
                    _.on(el,'compositionend', this.cpUnlock)

                    // shared setter
                    function set () {
                        self.set(
                            number ? _.toNumber(el.value) : el.value,
                            true
                        )
                    }

                    // if the directive has filters, we need to
                    // record cursor position and restore it after updating
                    // the input with the filtered value.
                    // also force update for type="range" inputs to enable
                    // "lock in range" (see #506)
                    var hasReadFilter = this.filters && this.filters.read
                    this.listener = hasReadFilter || el.type === 'range'
                        ? function textInputListener () {
                        if (cpLocked) return
                        var charsOffset
                        // some HTML5 input types throw error here
                        try {
                            // record how many chars from the end of input
                            // the cursor was at
                            charsOffset = el.value.length - el.selectionStart
                        } catch (e) {}
                        // Fix IE10/11 infinite update cycle
                        // https://github.com/yyx990803/vue/issues/592
                        /* istanbul ignore if */
                        if (charsOffset < 0) {
                            return
                        }
                        set()
                        _.nextTick(function () {
                            // force a value update, because in
                            // certain cases the write filters output the
                            // same result for different input values, and
                            // the Observer set events won't be triggered.
                            var newVal = self._watcher.value
                            self.update(newVal)
                            if (charsOffset != null) {
                                var cursorPos =
                                    _.toString(newVal).length - charsOffset
                                el.setSelectionRange(cursorPos, cursorPos)
                            }
                        })
                    }
                        : function textInputListener () {
                        if (cpLocked) return
                        set()
                    }

                    if (debounce) {
                        this.listener = _.debounce(this.listener, debounce)
                    }
                    this.event = lazy ? 'change' : 'input'
                    // Support jQuery events, since jQuery.trigger() doesn't
                    // trigger native events in some cases and some plugins
                    // rely on $.trigger()
                    // 
                    // We want to make sure if a listener is attached using
                    // jQuery, it is also removed with jQuery, that's why
                    // we do the check for each directive instance and
                    // store that check result on itself. This also allows
                    // easier test coverage control by unsetting the global
                    // jQuery variable in tests.
                    this.hasjQuery = typeof jQuery === 'function'
                    if (this.hasjQuery) {
                        jQuery(el).on(this.event, this.listener)
                    } else {
                        _.on(el, this.event, this.listener)
                    }

                    // IE9 doesn't fire input event on backspace/del/cut
                    if (!lazy && _.isIE9) {
                        this.onCut = function () {
                            _.nextTick(self.listener)
                        }
                        this.onDel = function (e) {
                            if (e.keyCode === 46 || e.keyCode === 8) {
                                self.listener()
                            }
                        }
                        _.on(el, 'cut', this.onCut)
                        _.on(el, 'keyup', this.onDel)
                    }

                    // set initial value if present
                    if (
                        el.hasAttribute('value') ||
                        (el.tagName === 'TEXTAREA' && el.value.trim())
                    ) {
                        this._initValue = number
                            ? _.toNumber(el.value)
                            : el.value
                    }
                },

                update: function (value) {
                    this.el.value = _.toString(value)
                },

                unbind: function () {
                    var el = this.el
                    if (this.hasjQuery) {
                        jQuery(el).off(this.event, this.listener)
                    } else {
                        _.off(el, this.event, this.listener)
                    }
                    _.off(el,'compositionstart', this.cpLock)
                    _.off(el,'compositionend', this.cpUnlock)
                    if (this.onCut) {
                        _.off(el,'cut', this.onCut)
                        _.off(el,'keyup', this.onDel)
                    }
                }

            }

            /***/ },
        /* 59 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)

            module.exports = {

                bind: function () {
                    var self = this
                    var el = this.el
                    this.listener = function () {
                        self.set(el.value, true)
                    }
                    _.on(el, 'change', this.listener)
                    if (el.checked) {
                        this._initValue = el.value
                    }
                },

                update: function (value) {
                    /* jshint eqeqeq: false */
                    this.el.checked = value == this.el.value
                },

                unbind: function () {
                    _.off(this.el, 'change', this.listener)
                }

            }

            /***/ },
        /* 60 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)
            var Watcher = __webpack_require__(25)
            var dirParser = __webpack_require__(21)

            module.exports = {

                bind: function () {
                    var self = this
                    var el = this.el
                    // check options param
                    var optionsParam = this._checkParam('options')
                    if (optionsParam) {
                        initOptions.call(this, optionsParam)
                    }
                    this.number = this._checkParam('number') != null
                    this.multiple = el.hasAttribute('multiple')
                    this.listener = function () {
                        var value = self.multiple
                            ? getMultiValue(el)
                            : el.value
                        value = self.number
                            ? _.isArray(value)
                            ? value.map(_.toNumber)
                            : _.toNumber(value)
                            : value
                        self.set(value, true)
                    }
                    _.on(el, 'change', this.listener)
                    checkInitialValue.call(this)
                },

                update: function (value) {
                    /* jshint eqeqeq: false */
                    var el = this.el
                    el.selectedIndex = -1
                    var multi = this.multiple && _.isArray(value)
                    var options = el.options
                    var i = options.length
                    var option
                    while (i--) {
                        option = options[i]
                        option.selected = multi
                            ? indexOf(value, option.value) > -1
                            : value == option.value
                    }
                },

                unbind: function () {
                    _.off(this.el, 'change', this.listener)
                    if (this.optionWatcher) {
                        this.optionWatcher.teardown()
                    }
                }

            }

            /**
             * Initialize the option list from the param.
             *
             * @param {String} expression
             */

            function initOptions (expression) {
                var self = this
                var descriptor = dirParser.parse(expression)[0]
                function optionUpdateWatcher (value) {
                    if (_.isArray(value)) {
                        self.el.innerHTML = ''
                        buildOptions(self.el, value)
                        if (self._watcher) {
                            self.update(self._watcher.value)
                        }
                    } else {
                        _.warn('Invalid options value for v-model: ' + value)
                    }
                }
                this.optionWatcher = new Watcher(
                    this.vm,
                    descriptor.expression,
                    optionUpdateWatcher,
                    {
                        deep: true,
                        filters: _.resolveFilters(this.vm, descriptor.filters)
                    }
                )
                // update with initial value
                optionUpdateWatcher(this.optionWatcher.value)
            }

            /**
             * Build up option elements. IE9 doesn't create options
             * when setting innerHTML on <select> elements, so we have
             * to use DOM API here.
             *
             * @param {Element} parent - a <select> or an <optgroup>
             * @param {Array} options
             */

            function buildOptions (parent, options) {
                var op, el
                for (var i = 0, l = options.length; i < l; i++) {
                    op = options[i]
                    if (!op.options) {
                        el = document.createElement('option')
                        if (typeof op === 'string') {
                            el.text = el.value = op
                        } else {
                            el.text = op.text
                            el.value = op.value
                        }
                    } else {
                        el = document.createElement('optgroup')
                        el.label = op.label
                        buildOptions(el, op.options)
                    }
                    parent.appendChild(el)
                }
            }

            /**
             * Check the initial value for selected options.
             */

            function checkInitialValue () {
                var initValue
                var options = this.el.options
                for (var i = 0, l = options.length; i < l; i++) {
                    if (options[i].hasAttribute('selected')) {
                        if (this.multiple) {
                            (initValue || (initValue = []))
                                .push(options[i].value)
                        } else {
                            initValue = options[i].value
                        }
                    }
                }
                if (typeof initValue !== 'undefined') {
                    this._initValue = this.number
                        ? _.toNumber(initValue)
                        : initValue
                }
            }

            /**
             * Helper to extract a value array for select[multiple]
             *
             * @param {SelectElement} el
             * @return {Array}
             */

            function getMultiValue (el) {
                return Array.prototype.filter
                    .call(el.options, filterSelected)
                    .map(getOptionValue)
            }

            function filterSelected (op) {
                return op.selected
            }

            function getOptionValue (op) {
                return op.value || op.text
            }

            /**
             * Native Array.indexOf uses strict equal, but in this
             * case we need to match string/numbers with soft equal.
             *
             * @param {Array} arr
             * @param {*} val
             */

            function indexOf (arr, val) {
                /* jshint eqeqeq: false */
                var i = arr.length
                while (i--) {
                    if (arr[i] == val) return i
                }
                return -1
            }

            /***/ },
        /* 61 */
        /***/ function(module, exports, __webpack_require__) {

            var _ = __webpack_require__(11)

            module.exports = {

                bind: function () {
                    var self = this
                    var el = this.el
                    this.listener = function () {
                        self.set(el.checked, true)
                    }
                    _.on(el, 'change', this.listener)
                    if (el.checked) {
                        this._initValue = el.checked
                    }
                },

                update: function (value) {
                    this.el.checked = !!value
                },

                unbind: function () {
                    _.off(this.el, 'change', this.listener)
                }

            }

            /***/ }
        /******/ ])
});
;
/**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 */
(function() {
    var block = {
        newline: /^\n+/,
        code: /^( {4}[^\n]+\n*)+/,
        fences: noop,
        hr: /^( *[-*_]){3,} *(?:\n+|$)/,
        heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
        nptable: noop,
        lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
        blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
        list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
        html: /^ *(?:comment|closed|closing) *(?:\n{2,}|\s*$)/,
        def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
        table: noop,
        paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
        text: /^[^\n]+/
    };
    block.bullet = /(?:[*+-]|\d+\.)/;
    block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
    block.item = replace(block.item, "gm")(/bull/g, block.bullet)();
    block.list = replace(block.list)(/bull/g, block.bullet)("hr", "\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def", "\\n+(?=" + block.def.source + ")")();
    block.blockquote = replace(block.blockquote)("def", block.def)();
    block._tag = "(?!(?:" + "a|em|strong|small|s|cite|q|dfn|abbr|data|time|code" + "|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo" + "|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b";
    block.html = replace(block.html)("comment", /<!--[\s\S]*?-->/)("closed", /<(tag)[\s\S]+?<\/\1>/)("closing", /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g, block._tag)();
    block.paragraph = replace(block.paragraph)("hr", block.hr)("heading", block.heading)("lheading", block.lheading)("blockquote", block.blockquote)("tag", "<" + block._tag)("def", block.def)();
    block.normal = merge({}, block);
    block.gfm = merge({}, block.normal, {
        fences: /^ *(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n+|$)/,
        paragraph: /^/
    });
    block.gfm.paragraph = replace(block.paragraph)("(?!", "(?!" + block.gfm.fences.source.replace("\\1", "\\2") + "|" + block.list.source.replace("\\1", "\\3") + "|")();
    block.tables = merge({}, block.gfm, {
        nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
        table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
    });

    function Lexer(options) {
        this.tokens = [];
        this.tokens.links = {};
        this.options = options || marked.defaults;
        this.rules = block.normal;
        if (this.options.gfm) {
            if (this.options.tables) {
                this.rules = block.tables
            } else {
                this.rules = block.gfm
            }
        }
    }
    Lexer.rules = block;
    Lexer.lex = function(src, options) {
        var lexer = new Lexer(options);
        return lexer.lex(src)
    };
    Lexer.prototype.lex = function(src) {
        src = src.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    ").replace(/\u00a0/g, " ").replace(/\u2424/g, "\n");
        return this.token(src, true)
    };
    Lexer.prototype.token = function(src, top, bq) {
        var src = src.replace(/^ +$/gm, ""),
            next, loose, cap, bull, b, item, space, i, l;
        while (src) {
            if (cap = this.rules.newline.exec(src)) {
                src = src.substring(cap[0].length);
                if (cap[0].length > 1) {
                    this.tokens.push({
                        type: "space"
                    })
                }
            }
            if (cap = this.rules.code.exec(src)) {
                src = src.substring(cap[0].length);
                cap = cap[0].replace(/^ {4}/gm, "");
                this.tokens.push({
                    type: "code",
                    text: !this.options.pedantic ? cap.replace(/\n+$/, "") : cap
                });
                continue
            }
            if (cap = this.rules.fences.exec(src)) {
                src = src.substring(cap[0].length);
                this.tokens.push({
                    type: "code",
                    lang: cap[2],
                    text: cap[3]
                });
                continue
            }
            if (cap = this.rules.heading.exec(src)) {
                src = src.substring(cap[0].length);
                this.tokens.push({
                    type: "heading",
                    depth: cap[1].length,
                    text: cap[2]
                });
                continue
            }
            if (top && (cap = this.rules.nptable.exec(src))) {
                src = src.substring(cap[0].length);
                item = {
                    type: "table",
                    header: cap[1].replace(/^ *| *\| *$/g, "").split(/ *\| */),
                    align: cap[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                    cells: cap[3].replace(/\n$/, "").split("\n")
                };
                for (i = 0; i < item.align.length; i++) {
                    if (/^ *-+: *$/.test(item.align[i])) {
                        item.align[i] = "right"
                    } else if (/^ *:-+: *$/.test(item.align[i])) {
                        item.align[i] = "center"
                    } else if (/^ *:-+ *$/.test(item.align[i])) {
                        item.align[i] = "left"
                    } else {
                        item.align[i] = null
                    }
                }
                for (i = 0; i < item.cells.length; i++) {
                    item.cells[i] = item.cells[i].split(/ *\| */)
                }
                this.tokens.push(item);
                continue
            }
            if (cap = this.rules.lheading.exec(src)) {
                src = src.substring(cap[0].length);
                this.tokens.push({
                    type: "heading",
                    depth: cap[2] === "=" ? 1 : 2,
                    text: cap[1]
                });
                continue
            }
            if (cap = this.rules.hr.exec(src)) {
                src = src.substring(cap[0].length);
                this.tokens.push({
                    type: "hr"
                });
                continue
            }
            if (cap = this.rules.blockquote.exec(src)) {
                src = src.substring(cap[0].length);
                this.tokens.push({
                    type: "blockquote_start"
                });
                cap = cap[0].replace(/^ *> ?/gm, "");
                this.token(cap, top, true);
                this.tokens.push({
                    type: "blockquote_end"
                });
                continue
            }
            if (cap = this.rules.list.exec(src)) {
                src = src.substring(cap[0].length);
                bull = cap[2];
                this.tokens.push({
                    type: "list_start",
                    ordered: bull.length > 1
                });
                cap = cap[0].match(this.rules.item);
                next = false;
                l = cap.length;
                i = 0;
                for (; i < l; i++) {
                    item = cap[i];
                    space = item.length;
                    item = item.replace(/^ *([*+-]|\d+\.) +/, "");
                    if (~item.indexOf("\n ")) {
                        space -= item.length;
                        item = !this.options.pedantic ? item.replace(new RegExp("^ {1," + space + "}", "gm"), "") : item.replace(/^ {1,4}/gm, "")
                    }
                    if (this.options.smartLists && i !== l - 1) {
                        b = block.bullet.exec(cap[i + 1])[0];
                        if (bull !== b && !(bull.length > 1 && b.length > 1)) {
                            src = cap.slice(i + 1).join("\n") + src;
                            i = l - 1
                        }
                    }
                    loose = next || /\n\n(?!\s*$)/.test(item);
                    if (i !== l - 1) {
                        next = item.charAt(item.length - 1) === "\n";
                        if (!loose) loose = next
                    }
                    this.tokens.push({
                        type: loose ? "loose_item_start" : "list_item_start"
                    });
                    this.token(item, false, bq);
                    this.tokens.push({
                        type: "list_item_end"
                    })
                }
                this.tokens.push({
                    type: "list_end"
                });
                continue
            }
            if (cap = this.rules.html.exec(src)) {
                src = src.substring(cap[0].length);
                this.tokens.push({
                    type: this.options.sanitize ? "paragraph" : "html",
                    pre: cap[1] === "pre" || cap[1] === "script" || cap[1] === "style",
                    text: cap[0]
                });
                continue
            }
            if (!bq && top && (cap = this.rules.def.exec(src))) {
                src = src.substring(cap[0].length);
                this.tokens.links[cap[1].toLowerCase()] = {
                    href: cap[2],
                    title: cap[3]
                };
                continue
            }
            if (top && (cap = this.rules.table.exec(src))) {
                src = src.substring(cap[0].length);
                item = {
                    type: "table",
                    header: cap[1].replace(/^ *| *\| *$/g, "").split(/ *\| */),
                    align: cap[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                    cells: cap[3].replace(/(?: *\| *)?\n$/, "").split("\n")
                };
                for (i = 0; i < item.align.length; i++) {
                    if (/^ *-+: *$/.test(item.align[i])) {
                        item.align[i] = "right"
                    } else if (/^ *:-+: *$/.test(item.align[i])) {
                        item.align[i] = "center"
                    } else if (/^ *:-+ *$/.test(item.align[i])) {
                        item.align[i] = "left"
                    } else {
                        item.align[i] = null
                    }
                }
                for (i = 0; i < item.cells.length; i++) {
                    item.cells[i] = item.cells[i].replace(/^ *\| *| *\| *$/g, "").split(/ *\| */)
                }
                this.tokens.push(item);
                continue
            }
            if (top && (cap = this.rules.paragraph.exec(src))) {
                src = src.substring(cap[0].length);
                this.tokens.push({
                    type: "paragraph",
                    text: cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1]
                });
                continue
            }
            if (cap = this.rules.text.exec(src)) {
                src = src.substring(cap[0].length);
                this.tokens.push({
                    type: "text",
                    text: cap[0]
                });
                continue
            }
            if (src) {
                throw new Error("Infinite loop on byte: " + src.charCodeAt(0))
            }
        }
        return this.tokens
    };
    var inline = {
        escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
        autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
        url: noop,
        tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
        link: /^!?\[(inside)\]\(href\)/,
        reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
        nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
        strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
        em: /^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
        code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
        br: /^ {2,}\n(?!\s*$)/,
        del: noop,
        text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
    };
    inline._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;
    inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;
    inline.link = replace(inline.link)("inside", inline._inside)("href", inline._href)();
    inline.reflink = replace(inline.reflink)("inside", inline._inside)();
    inline.normal = merge({}, inline);
    inline.pedantic = merge({}, inline.normal, {
        strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
        em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
    });
    inline.gfm = merge({}, inline.normal, {
        escape: replace(inline.escape)("])", "~|])")(),
        url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
        del: /^~~(?=\S)([\s\S]*?\S)~~/,
        text: replace(inline.text)("]|", "~]|")("|", "|https?://|")()
    });
    inline.breaks = merge({}, inline.gfm, {
        br: replace(inline.br)("{2,}", "*")(),
        text: replace(inline.gfm.text)("{2,}", "*")()
    });

    function InlineLexer(links, options) {
        this.options = options || marked.defaults;
        this.links = links;
        this.rules = inline.normal;
        this.renderer = this.options.renderer || new Renderer;
        this.renderer.options = this.options;
        if (!this.links) {
            throw new Error("Tokens array requires a `links` property.")
        }
        if (this.options.gfm) {
            if (this.options.breaks) {
                this.rules = inline.breaks
            } else {
                this.rules = inline.gfm
            }
        } else if (this.options.pedantic) {
            this.rules = inline.pedantic
        }
    }
    InlineLexer.rules = inline;
    InlineLexer.output = function(src, links, options) {
        var inline = new InlineLexer(links, options);
        return inline.output(src)
    };
    InlineLexer.prototype.output = function(src) {
        var out = "",
            link, text, href, cap;
        while (src) {
            if (cap = this.rules.escape.exec(src)) {
                src = src.substring(cap[0].length);
                out += cap[1];
                continue
            }
            if (cap = this.rules.autolink.exec(src)) {
                src = src.substring(cap[0].length);
                if (cap[2] === "@") {
                    text = cap[1].charAt(6) === ":" ? this.mangle(cap[1].substring(7)) : this.mangle(cap[1]);
                    href = this.mangle("mailto:") + text
                } else {
                    text = escape(cap[1]);
                    href = text
                }
                out += this.renderer.link(href, null, text);
                continue
            }
            if (!this.inLink && (cap = this.rules.url.exec(src))) {
                src = src.substring(cap[0].length);
                text = escape(cap[1]);
                href = text;
                out += this.renderer.link(href, null, text);
                continue
            }
            if (cap = this.rules.tag.exec(src)) {
                if (!this.inLink && /^<a /i.test(cap[0])) {
                    this.inLink = true
                } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
                    this.inLink = false
                }
                src = src.substring(cap[0].length);
                out += this.options.sanitize ? escape(cap[0]) : cap[0];
                continue
            }
            if (cap = this.rules.link.exec(src)) {
                src = src.substring(cap[0].length);
                this.inLink = true;
                out += this.outputLink(cap, {
                    href: cap[2],
                    title: cap[3]
                });
                this.inLink = false;
                continue
            }
            if ((cap = this.rules.reflink.exec(src)) || (cap = this.rules.nolink.exec(src))) {
                src = src.substring(cap[0].length);
                link = (cap[2] || cap[1]).replace(/\s+/g, " ");
                link = this.links[link.toLowerCase()];
                if (!link || !link.href) {
                    out += cap[0].charAt(0);
                    src = cap[0].substring(1) + src;
                    continue
                }
                this.inLink = true;
                out += this.outputLink(cap, link);
                this.inLink = false;
                continue
            }
            if (cap = this.rules.strong.exec(src)) {
                src = src.substring(cap[0].length);
                out += this.renderer.strong(this.output(cap[2] || cap[1]));
                continue
            }
            if (cap = this.rules.em.exec(src)) {
                src = src.substring(cap[0].length);
                out += this.renderer.em(this.output(cap[2] || cap[1]));
                continue
            }
            if (cap = this.rules.code.exec(src)) {
                src = src.substring(cap[0].length);
                out += this.renderer.codespan(escape(cap[2], true));
                continue
            }
            if (cap = this.rules.br.exec(src)) {
                src = src.substring(cap[0].length);
                out += this.renderer.br();
                continue
            }
            if (cap = this.rules.del.exec(src)) {
                src = src.substring(cap[0].length);
                out += this.renderer.del(this.output(cap[1]));
                continue
            }
            if (cap = this.rules.text.exec(src)) {
                src = src.substring(cap[0].length);
                out += escape(this.smartypants(cap[0]));
                continue
            }
            if (src) {
                throw new Error("Infinite loop on byte: " + src.charCodeAt(0))
            }
        }
        return out
    };
    InlineLexer.prototype.outputLink = function(cap, link) {
        var href = escape(link.href),
            title = link.title ? escape(link.title) : null;
        return cap[0].charAt(0) !== "!" ? this.renderer.link(href, title, this.output(cap[1])) : this.renderer.image(href, title, escape(cap[1]))
    };
    InlineLexer.prototype.smartypants = function(text) {
        if (!this.options.smartypants) return text;
        return text.replace(/--/g, "—").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1‘").replace(/'/g, "’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1“").replace(/"/g, "”").replace(/\.{3}/g, "…")
    };
    InlineLexer.prototype.mangle = function(text) {
        var out = "",
            l = text.length,
            i = 0,
            ch;
        for (; i < l; i++) {
            ch = text.charCodeAt(i);
            if (Math.random() > .5) {
                ch = "x" + ch.toString(16)
            }
            out += "&#" + ch + ";"
        }
        return out
    };

    function Renderer(options) {
        this.options = options || {}
    }
    Renderer.prototype.code = function(code, lang, escaped) {
        if (this.options.highlight) {
            var out = this.options.highlight(code, lang);
            if (out != null && out !== code) {
                escaped = true;
                code = out
            }
        }
        if (!lang) {
            return "<pre><code>" + (escaped ? code : escape(code, true)) + "\n</code></pre>"
        }
        return '<pre><code class="' + this.options.langPrefix + escape(lang, true) + '">' + (escaped ? code : escape(code, true)) + "\n</code></pre>\n"
    };
    Renderer.prototype.blockquote = function(quote) {
        return "<blockquote>\n" + quote + "</blockquote>\n"
    };
    Renderer.prototype.html = function(html) {
        return html
    };
    Renderer.prototype.heading = function(text, level, raw) {
        return "<h" + level + ' id="' + this.options.headerPrefix + raw.toLowerCase().replace(/[^\w]+/g, "-") + '">' + text + "</h" + level + ">\n"
    };
    Renderer.prototype.hr = function() {
        return this.options.xhtml ? "<hr/>\n" : "<hr>\n"
    };
    Renderer.prototype.list = function(body, ordered) {
        var type = ordered ? "ol" : "ul";
        return "<" + type + ">\n" + body + "</" + type + ">\n"
    };
    Renderer.prototype.listitem = function(text) {
        return "<li>" + text + "</li>\n"
    };
    Renderer.prototype.paragraph = function(text) {
        return "<p>" + text + "</p>\n"
    };
    Renderer.prototype.table = function(header, body) {
        return "<table>\n" + "<thead>\n" + header + "</thead>\n" + "<tbody>\n" + body + "</tbody>\n" + "</table>\n"
    };
    Renderer.prototype.tablerow = function(content) {
        return "<tr>\n" + content + "</tr>\n"
    };
    Renderer.prototype.tablecell = function(content, flags) {
        var type = flags.header ? "th" : "td";
        var tag = flags.align ? "<" + type + ' style="text-align:' + flags.align + '">' : "<" + type + ">";
        return tag + content + "</" + type + ">\n"
    };
    Renderer.prototype.strong = function(text) {
        return "<strong>" + text + "</strong>"
    };
    Renderer.prototype.em = function(text) {
        return "<em>" + text + "</em>"
    };
    Renderer.prototype.codespan = function(text) {
        return "<code>" + text + "</code>"
    };
    Renderer.prototype.br = function() {
        return this.options.xhtml ? "<br/>" : "<br>"
    };
    Renderer.prototype.del = function(text) {
        return "<del>" + text + "</del>"
    };
    Renderer.prototype.link = function(href, title, text) {
        if (this.options.sanitize) {
            try {
                var prot = decodeURIComponent(unescape(href)).replace(/[^\w:]/g, "").toLowerCase()
            } catch (e) {
                return ""
            }
            if (prot.indexOf("javascript:") === 0) {
                return ""
            }
        }
        var out = '<a href="' + href + '"';
        if (title) {
            out += ' title="' + title + '"'
        }
        out += ">" + text + "</a>";
        return out
    };
    Renderer.prototype.image = function(href, title, text) {
        var out = '<img src="' + href + '" alt="' + text + '"';
        if (title) {
            out += ' title="' + title + '"'
        }
        out += this.options.xhtml ? "/>" : ">";
        return out
    };

    function Parser(options) {
        this.tokens = [];
        this.token = null;
        this.options = options || marked.defaults;
        this.options.renderer = this.options.renderer || new Renderer;
        this.renderer = this.options.renderer;
        this.renderer.options = this.options
    }
    Parser.parse = function(src, options, renderer) {
        var parser = new Parser(options, renderer);
        return parser.parse(src)
    };
    Parser.prototype.parse = function(src) {
        this.inline = new InlineLexer(src.links, this.options, this.renderer);
        this.tokens = src.reverse();
        var out = "";
        while (this.next()) {
            out += this.tok()
        }
        return out
    };
    Parser.prototype.next = function() {
        return this.token = this.tokens.pop()
    };
    Parser.prototype.peek = function() {
        return this.tokens[this.tokens.length - 1] || 0
    };
    Parser.prototype.parseText = function() {
        var body = this.token.text;
        while (this.peek().type === "text") {
            body += "\n" + this.next().text
        }
        return this.inline.output(body)
    };
    Parser.prototype.tok = function() {
        switch (this.token.type) {
            case "space":
            {
                return ""
            }
            case "hr":
            {
                return this.renderer.hr()
            }
            case "heading":
            {
                return this.renderer.heading(this.inline.output(this.token.text), this.token.depth, this.token.text)
            }
            case "code":
            {
                return this.renderer.code(this.token.text, this.token.lang, this.token.escaped)
            }
            case "table":
            {
                var header = "",
                    body = "",
                    i, row, cell, flags, j;
                cell = "";
                for (i = 0; i < this.token.header.length; i++) {
                    flags = {
                        header: true,
                        align: this.token.align[i]
                    };
                    cell += this.renderer.tablecell(this.inline.output(this.token.header[i]), {
                        header: true,
                        align: this.token.align[i]
                    })
                }
                header += this.renderer.tablerow(cell);
                for (i = 0; i < this.token.cells.length; i++) {
                    row = this.token.cells[i];
                    cell = "";
                    for (j = 0; j < row.length; j++) {
                        cell += this.renderer.tablecell(this.inline.output(row[j]), {
                            header: false,
                            align: this.token.align[j]
                        })
                    }
                    body += this.renderer.tablerow(cell)
                }
                return this.renderer.table(header, body)
            }
            case "blockquote_start":
            {
                var body = "";
                while (this.next().type !== "blockquote_end") {
                    body += this.tok()
                }
                return this.renderer.blockquote(body)
            }
            case "list_start":
            {
                var body = "",
                    ordered = this.token.ordered;
                while (this.next().type !== "list_end") {
                    body += this.tok()
                }
                return this.renderer.list(body, ordered)
            }
            case "list_item_start":
            {
                var body = "";
                while (this.next().type !== "list_item_end") {
                    body += this.token.type === "text" ? this.parseText() : this.tok()
                }
                return this.renderer.listitem(body)
            }
            case "loose_item_start":
            {
                var body = "";
                while (this.next().type !== "list_item_end") {
                    body += this.tok()
                }
                return this.renderer.listitem(body)
            }
            case "html":
            {
                var html = !this.token.pre && !this.options.pedantic ? this.inline.output(this.token.text) : this.token.text;
                return this.renderer.html(html)
            }
            case "paragraph":
            {
                return this.renderer.paragraph(this.inline.output(this.token.text))
            }
            case "text":
            {
                return this.renderer.paragraph(this.parseText())
            }
        }
    };

    function escape(html, encode) {
        return html.replace(!encode ? /&(?!#?\w+;)/g : /&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
    }

    function unescape(html) {
        return html.replace(/&([#\w]+);/g, function(_, n) {
            n = n.toLowerCase();
            if (n === "colon") return ":";
            if (n.charAt(0) === "#") {
                return n.charAt(1) === "x" ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1))
            }
            return ""
        })
    }

    function replace(regex, opt) {
        regex = regex.source;
        opt = opt || "";
        return function self(name, val) {
            if (!name) return new RegExp(regex, opt);
            val = val.source || val;
            val = val.replace(/(^|[^\[])\^/g, "$1");
            regex = regex.replace(name, val);
            return self
        }
    }

    function noop() {}
    noop.exec = noop;

    function merge(obj) {
        var i = 1,
            target, key;
        for (; i < arguments.length; i++) {
            target = arguments[i];
            for (key in target) {
                if (Object.prototype.hasOwnProperty.call(target, key)) {
                    obj[key] = target[key]
                }
            }
        }
        return obj
    }

    function marked(src, opt, callback) {
        if (callback || typeof opt === "function") {
            if (!callback) {
                callback = opt;
                opt = null
            }
            opt = merge({}, marked.defaults, opt || {});
            var highlight = opt.highlight,
                tokens, pending, i = 0;
            try {
                tokens = Lexer.lex(src, opt)
            } catch (e) {
                return callback(e)
            }
            pending = tokens.length;
            var done = function() {
                var out, err;
                try {
                    out = Parser.parse(tokens, opt)
                } catch (e) {
                    err = e
                }
                opt.highlight = highlight;
                return err ? callback(err) : callback(null, out)
            };
            if (!highlight || highlight.length < 3) {
                return done()
            }
            delete opt.highlight;
            if (!pending) return done();
            for (; i < tokens.length; i++) {
                (function(token) {
                    if (token.type !== "code") {
                        return --pending || done()
                    }
                    return highlight(token.text, token.lang, function(err, code) {
                        if (code == null || code === token.text) {
                            return --pending || done()
                        }
                        token.text = code;
                        token.escaped = true;
                        --pending || done()
                    })
                })(tokens[i])
            }
            return
        }
        try {
            if (opt) opt = merge({}, marked.defaults, opt);
            return Parser.parse(Lexer.lex(src, opt), opt)
        } catch (e) {
            e.message += "\nPlease report this to https://github.com/chjj/marked.";
            if ((opt || marked.defaults).silent) {
                return "<p>An error occured:</p><pre>" + escape(e.message + "", true) + "</pre>"
            }
            throw e
        }
    }
    marked.options = marked.setOptions = function(opt) {
        merge(marked.defaults, opt);
        return marked
    };
    marked.defaults = {
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: false,
        silent: false,
        highlight: null,
        langPrefix: "lang-",
        smartypants: false,
        headerPrefix: "",
        renderer: new Renderer,
        xhtml: false
    };
    marked.Parser = Parser;
    marked.parser = Parser.parse;
    marked.Renderer = Renderer;
    marked.Lexer = Lexer;
    marked.lexer = Lexer.lex;
    marked.InlineLexer = InlineLexer;
    marked.inlineLexer = InlineLexer.output;
    marked.parse = marked;
    if (typeof exports === "object") {
        module.exports = marked
    } else if (typeof define === "function" && define.amd) {
        define(function() {
            return marked
        })
    } else {
        this.marked = marked
    }
}).call(function() {
    return this || (typeof window !== "undefined" ? window : global)
}());
/******/ (function(modules) { // webpackBootstrap
    /******/ 	// The module cache
    /******/ 	var installedModules = {};

    /******/ 	// The require function
    /******/ 	function __webpack_require__(moduleId) {

        /******/ 		// Check if module is in cache
        /******/ 		if(installedModules[moduleId])
        /******/ 			return installedModules[moduleId].exports;

        /******/ 		// Create a new module (and put it into the cache)
        /******/ 		var module = installedModules[moduleId] = {
            /******/ 			exports: {},
            /******/ 			id: moduleId,
            /******/ 			loaded: false
            /******/ 		};

        /******/ 		// Execute the module function
        /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

        /******/ 		// Flag the module as loaded
        /******/ 		module.loaded = true;

        /******/ 		// Return the exports of the module
        /******/ 		return module.exports;
        /******/ 	}


    /******/ 	// expose the modules object (__webpack_modules__)
    /******/ 	__webpack_require__.m = modules;

    /******/ 	// expose the module cache
    /******/ 	__webpack_require__.c = installedModules;

    /******/ 	// __webpack_public_path__
    /******/ 	__webpack_require__.p = "";

    /******/ 	// Load entry module and return exports
    /******/ 	return __webpack_require__(0);
    /******/ })
    /************************************************************************/
    /******/ ([
    /* 0 */
    /***/ function(module, exports, __webpack_require__) {

        /**
         * Install plugin.
         */

        function install (Vue) {
            Vue.url = __webpack_require__(1)(Vue);
            Vue.http = __webpack_require__(3)(Vue);
            Vue.resource = __webpack_require__(4)(Vue);
        }

        if (window.Vue) {
            Vue.use(install);
        }

        module.exports = install;


        /***/ },
    /* 1 */
    /***/ function(module, exports, __webpack_require__) {

        module.exports = function (Vue) {

            var _ = __webpack_require__(2)(Vue);

            /**
             * Url provides URL templating.
             *
             * @param {String} url
             * @param {Object} params
             */

            function Url (url, params) {

                var urlParams = {}, queryParams = {}, options = url, query;

                if (!_.isPlainObject(options)) {
                    options = {url: url, params: params};
                }

                options = _.extend({}, Url.options, _.options('url', this, options));

                url = options.url.replace(/:([a-z]\w*)/gi, function (match, name) {

                    if (options.params[name]) {
                        urlParams[name] = true;
                        return encodeUriSegment(options.params[name]);
                    }

                    return '';
                });

                if (!url.match(/^(https?:)?\//) && options.root) {
                    url = options.root + '/' + url;
                }

                url = url.replace(/([^:])[\/]{2,}/g, '$1/');
                url = url.replace(/(\w+)\/+$/, '$1');

                _.each(options.params, function (value, key) {
                    if (!urlParams[key]) {
                        queryParams[key] = value;
                    }
                });

                query = Url.params(queryParams);

                if (query) {
                    url += (url.indexOf('?') == -1 ? '?' : '&') + query;
                }

                return url;
            }

            /**
             * Url options.
             */

            Url.options = {
                url: '',
                root: '',
                params: {}
            };

            /**
             * Encodes a Url parameter string.
             *
             * @param {Object} obj
             */

            Url.params = function (obj) {

                var params = [];

                params.add = function (key, value) {

                    if (_.isFunction (value)) {
                        value = value();
                    }

                    if (value === null) {
                        value = '';
                    }

                    this.push(encodeUriSegment(key) + '=' + encodeUriSegment(value));
                };

                serialize(params, obj);

                return params.join('&');
            };

            /**
             * Parse a URL and return its components.
             *
             * @param {String} url
             */

            Url.parse = function (url) {

                var pattern = new RegExp("^(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*)(?:\\?([^#]*))?(?:#(.*))?"),
                    matches = url.match(pattern);

                return {
                    url: url,
                    scheme: matches[1] || '',
                    host: matches[2] || '',
                    path: matches[3] || '',
                    query: matches[4] || '',
                    fragment: matches[5] || ''
                };
            };

            function serialize (params, obj, scope) {

                var array = _.isArray(obj), plain = _.isPlainObject(obj), hash;

                _.each(obj, function (value, key) {

                    hash = _.isObject(value) || _.isArray(value);

                    if (scope) {
                        key = scope + '[' + (plain || hash ? key : '') + ']';
                    }

                    if (!scope && array) {
                        params.add(value.name, value.value);
                    } else if (hash) {
                        serialize(params, value, key);
                    } else {
                        params.add(key, value);
                    }
                });
            }

            function encodeUriSegment (value) {

                return encodeUriQuery(value, true).
                    replace(/%26/gi, '&').
                    replace(/%3D/gi, '=').
                    replace(/%2B/gi, '+');
            }

            function encodeUriQuery (value, spaces) {

                return encodeURIComponent(value).
                    replace(/%40/gi, '@').
                    replace(/%3A/gi, ':').
                    replace(/%24/g, '$').
                    replace(/%2C/gi, ',').
                    replace(/%20/g, (spaces ? '%20' : '+'));
            }

            Object.defineProperty(Vue.prototype, '$url', {

                get: function () {
                    return _.extend(Url.bind(this), Url);
                }

            });

            return Url;
        };


        /***/ },
    /* 2 */
    /***/ function(module, exports, __webpack_require__) {

        /**
         * Utility functions.
         */

        module.exports = function (Vue) {

            var _ = Vue.util.extend({}, Vue.util);

            _.options = function (key, obj, options) {

                var opts = obj.$options || {};

                return _.extend({},
                    opts[key],
                    options
                );
            };

            _.each = function (obj, iterator) {

                var i, key;

                if (typeof obj.length == 'number') {
                    for (i = 0; i < obj.length; i++) {
                        iterator.call(obj[i], obj[i], i);
                    }
                } else if (_.isObject(obj)) {
                    for (key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            iterator.call(obj[key], obj[key], key);
                        }
                    }
                }

                return obj;
            };

            _.extend = function (target) {

                var array = [], args = array.slice.call(arguments, 1), deep;

                if (typeof target == 'boolean') {
                    deep = target;
                    target = args.shift();
                }

                args.forEach(function (arg) {
                    extend(target, arg, deep);
                });

                return target;
            };

            function extend (target, source, deep) {
                for (var key in source) {
                    if (deep && (_.isPlainObject(source[key]) || _.isArray(source[key]))) {
                        if (_.isPlainObject(source[key]) && !_.isPlainObject(target[key])) {
                            target[key] = {};
                        }
                        if (_.isArray(source[key]) && !_.isArray(target[key])) {
                            target[key] = [];
                        }
                        extend(target[key], source[key], deep);
                    } else if (source[key] !== undefined) {
                        target[key] = source[key];
                    }
                }
            }

            _.isFunction = function (obj) {
                return obj && typeof obj === 'function';
            };

            /**
             * Promise polyfill (https://gist.github.com/briancavalier/814313)
             */

            _.Promise = window.Promise;

            if (!_.Promise) {

                _.Promise = function (executor) {
                    executor(this.resolve.bind(this), this.reject.bind(this));
                    this._thens = [];
                };

                _.Promise.prototype = {

                    then: function (onResolve, onReject, onProgress) {
                        this._thens.push({resolve: onResolve, reject: onReject, progress: onProgress});
                    },

                    'catch': function (onReject) {
                        this._thens.push({reject: onReject});
                    },

                    resolve: function (value) {
                        this._complete('resolve', value);
                    },

                    reject: function (reason) {
                        this._complete('reject', reason);
                    },

                    progress: function (status) {

                        var i = 0, aThen;

                        while (aThen = this._thens[i++]) {
                            aThen.progress && aThen.progress(status);
                        }
                    },

                    _complete: function (which, arg) {

                        this.then = which === 'resolve' ?
                            function (resolve, reject) { resolve && resolve(arg); } :
                            function (resolve, reject) { reject && reject(arg); };

                        this.resolve = this.reject = this.progress =
                            function () { throw new Error('Promise already completed.'); };

                        var aThen, i = 0;

                        while (aThen = this._thens[i++]) {
                            aThen[which] && aThen[which](arg);
                        }

                        delete this._thens;
                    }
                };
            }

            return _;
        };


        /***/ },
    /* 3 */
    /***/ function(module, exports, __webpack_require__) {

        module.exports = function (Vue) {

            var _ = __webpack_require__(2)(Vue);
            var jsonType = { 'Content-Type': 'application/json;charset=utf-8' };

            /**
             * Http provides a service for sending XMLHttpRequests.
             */

            function Http (url, options) {

                var self = this, headers, promise;

                options = options || {};

                if (_.isPlainObject(url)) {
                    options = url;
                    url = '';
                }

                headers = _.extend({},
                    Http.headers.common,
                    Http.headers[options.method.toLowerCase()]
                );

                options = _.extend(true, {url: url, headers: headers},
                    Http.options, _.options('http', this, options)
                );

                if (_.isObject(options.data) && /FormData/i.test(options.data.toString())) {
                    delete options.headers['Content-Type'];
                }

                promise = new _.Promise((options.method.toLowerCase() == 'jsonp' ? jsonp : xhr).bind(this, (this.$url || Vue.url), options));

                _.extend(promise, {

                    success: function (onSuccess) {

                        this.then(function (request) {
                            onSuccess.apply(self, parseReq(request));
                        }, function () {});

                        return this;
                    },

                    error: function (onError) {

                        this.catch(function (request) {
                            onError.apply(self, parseReq(request));
                        });

                        return this;
                    },

                    always: function (onAlways) {

                        var cb = function (request) {
                            onAlways.apply(self, parseReq(request));
                        };

                        this.then(cb, cb);

                        return this;
                    }

                });

                if (options.success) {
                    promise.success(options.success);
                }

                if (options.error) {
                    promise.error(options.error);
                }

                return promise;
            }

            function xhr(url, options, resolve, reject) {

                var request = new XMLHttpRequest();

                if (_.isFunction(options.beforeSend)) {
                    options.beforeSend(request, options);
                }

                if (options.emulateHTTP && /^(PUT|PATCH|DELETE)$/i.test(options.method)) {
                    options.headers['X-HTTP-Method-Override'] = options.method;
                    options.method = 'POST';
                }

                if (options.emulateJSON && _.isPlainObject(options.data)) {
                    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                    options.data = Vue.url.params(options.data);
                }

                if (_.isPlainObject(options.data)) {
                    options.data = JSON.stringify(options.data);
                }

                request.open(options.method, url(options), true);

                _.each(options.headers, function (value, header) {
                    request.setRequestHeader(header, value);
                });

                request.onreadystatechange = function () {

                    if (this.readyState === 4) {

                        if (this.status >= 200 && this.status < 300) {
                            resolve(this);
                        } else {
                            reject(this);
                        }
                    }
                };

                request.send(options.data);
            }

            function jsonp(url, options, resolve, reject) {

                var callback = '_jsonp' + Math.random().toString(36).substr(2), script, result;

                _.extend(options.params, options.data);
                options.params[options.jsonp] = callback;

                if (_.isFunction(options.beforeSend)) {
                    options.beforeSend({}, options);
                }

                script = document.createElement('script');
                script.src = url(options.url, options.params);
                script.type = 'text/javascript';
                script.async = true;

                window[callback] = function (data) {
                    result = data;
                };

                var handler = function (event) {

                    delete window[callback];
                    document.body.removeChild(script);

                    if (event.type === 'load' && !result) {
                        event.type = 'error';
                    }

                    var text = result ? result : event.type, status = event.type === 'error' ? 404 : 200;

                    (status === 200 ? resolve : reject)({ responseText: text, status: status });
                };

                script.onload = handler;
                script.onerror = handler;

                document.body.appendChild(script);
            }

            function parseReq(request) {

                var result;

                try {
                    result = JSON.parse(request.responseText);
                } catch (e) {
                    result = request.responseText;
                }

                return [result, request.status, request];
            }

            Http.options = {
                method: 'GET',
                params: {},
                data: '',
                jsonp: 'callback',
                beforeSend: null,
                emulateHTTP: false,
                emulateJSON: false,
            };

            Http.headers = {
                put: jsonType,
                post: jsonType,
                patch: jsonType,
                delete: jsonType,
                common: { 'Accept': 'application/json, text/plain, */*' }
            };

            ['get', 'put', 'post', 'patch', 'delete', 'jsonp'].forEach(function (method) {

                Http[method] = function (url, data, success, options) {

                    if (_.isFunction(data)) {
                        options = success;
                        success = data;
                        data = undefined;
                    }

                    return this(url, _.extend({method: method, data: data, success: success}, options));
                };
            });

            Object.defineProperty(Vue.prototype, '$http', {

                get: function () {
                    return _.extend(Http.bind(this), Http);
                }

            });

            return Http;
        };


        /***/ },
    /* 4 */
    /***/ function(module, exports, __webpack_require__) {

        module.exports = function (Vue) {

            var _ = __webpack_require__(2)(Vue);

            /**
             * Resource provides interaction support with RESTful services.
             */

            function Resource (url, params, actions) {

                var self = this, resource = {};

                actions = _.extend({},
                    Resource.actions,
                    actions
                );

                _.each(actions, function (action, name) {

                    action = _.extend(true, {url: url, params: params || {}}, action);

                    resource[name] = function () {
                        return (self.$http || Vue.http)(opts(action, arguments));
                    };
                });

                return resource;
            }

            function opts (action, args) {

                var options = _.extend({}, action), params = {}, data, success, error;

                switch (args.length) {

                    case 4:

                        error = args[3];
                        success = args[2];

                    case 3:
                    case 2:

                        if (_.isFunction (args[1])) {

                            if (_.isFunction (args[0])) {

                                success = args[0];
                                error = args[1];

                                break;
                            }

                            success = args[1];
                            error = args[2];

                        } else {

                            params = args[0];
                            data = args[1];
                            success = args[2];

                            break;
                        }

                    case 1:

                        if (_.isFunction (args[0])) {
                            success = args[0];
                        } else if (/^(POST|PUT|PATCH)$/i.test(options.method)) {
                            data = args[0];
                        } else {
                            params = args[0];
                        }

                        break;

                    case 0:

                        break;

                    default:

                        throw 'Expected up to 4 arguments [params, data, success, error], got ' + args.length + ' arguments';
                }

                options.url = action.url;
                options.data = data;
                options.params = _.extend({}, action.params, params);

                if (success) {
                    options.success = success;
                }

                if (error) {
                    options.error = error;
                }

                return options;
            }

            Resource.actions = {

                get: {method: 'GET'},
                save: {method: 'POST'},
                query: {method: 'GET'},
                remove: {method: 'DELETE'},
                delete: {method: 'DELETE'}

            };

            Object.defineProperty(Vue.prototype, '$resource', {

                get: function () {
                    return Resource.bind(this);
                }

            });

            return Resource;
        };


        /***/ }
    /******/ ]);
// Nothing here! Edit the JavaScript within the view itself.
//# sourceMappingURL=all.js.map

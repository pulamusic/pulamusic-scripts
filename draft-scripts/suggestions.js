// acme.suggestions.js - popup suggestions menu
//
// To create a suggestions menu:
//   acme.suggestions.Make( element, strs, callback );
//
// Element is the HTML element that you want the menu attached to.
// Strs is is array of strings to display as the suggestions. Callback
// is a routine that gets called when the user clicks on a suggestion.
// It gets passed the selected string.
//
//
// The current version of this code is always available at:
// http://acme.com/javascript/
//
//
// Copyright \xa9 2019 by Jef Poskanzer <jef@mail.acme.com>.
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions
// are met:
// 1. Redistributions of source code must retain the above copyright
//    notice, this list of conditions and the following disclaimer.
// 2. Redistributions in binary form must reproduce the above copyright
//    notice, this list of conditions and the following disclaimer in the
//    documentation and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE AUTHOR AND CONTRIBUTORS ``AS IS'' AND
// ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED.  IN NO EVENT SHALL THE AUTHOR OR CONTRIBUTORS BE LIABLE
// FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
// DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS
// OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
// HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
// LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
// OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
// SUCH DAMAGE.
//
// For commentary on this license please see http://acme.com/license.html


'use strict';

acme.namespace( 'acme.suggestions' );


acme.suggestions.Make = function ( element, strs, callback )
    {
    var parent = element.parentNode;
    parent.style.position = 'relative';
    acme.suggestions.Clear( element );
    var containerElement = acme.utils.AppendElement( parent, 'div', { id: 'suggestions', style: { border: '1px solid black', padding: '5px', backgroundColor: '#ffffff', text: '#000000', position: 'absolute', left: '0', top: ( element.clientHeight + 2 ) + 'px', zIndex: '10000', maxWidth: '3in', maxHeight: '5in', overflow: 'auto' } } );
    for ( var i in strs )
	{
	var mi = acme.utils.AppendElement( containerElement, 'div', { textContent: strs[i], style: { cursor: 'pointer' } } );
	var cb = acme.utils.Partial( callback, strs[i] );
	mi.onclick = cb;
	mi.onfocus = cb;
	mi.onmouseover = acme.utils.Partial( acme.suggestions.Highlight, mi );
	mi.onmouseout = acme.utils.Partial( acme.suggestions.DeHighlight, mi );
	}
    element.onblur = acme.utils.Partial( acme.suggestions.ClearLater, element );
    };


acme.suggestions.Highlight = function ( element )
    {
    element.style.backgroundColor = '#eeeeee';
    };


acme.suggestions.DeHighlight = function ( element )
    {
    element.style.backgroundColor = '';
    };


acme.suggestions.ClearLater = function ( element )
    {
    window.setTimeout( acme.utils.Partial( acme.suggestions.Clear, element ), 1000 );
    };


acme.suggestions.Clear = function ( element )
    {
    var parent = element.parentNode;
    var suggestionsElement = acme.utils.getElementById( parent, 'suggestions' );
    if ( suggestionsElement )
	acme.utils.DestroyElement( suggestionsElement );
    };

// acme.colorpicker.js - simple color-picker widget
//
// To create a color-picker widget:
//   acme.colorpicker.MakeColorPicker( element, callback );
//
// Element is the HTML element where you want the color-picker built.
// Callback is a routine that gets called when the user chooses a color.
//
//
// The current version of this code is always available at:
// http://acme.com/javascript/
//
//
// Copyright \xa9 2020 by Jef Poskanzer <jef@mail.acme.com>.
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

acme.namespace( 'acme.colorpicker' );

acme.colorpicker.tables = [];

acme.colorpicker.MakeColorPicker = function ( element, callback )
    {
    // Make sure the element starts empty.
    acme.utils.ClearElement( element );
    var img = acme.utils.AppendElement(
	element, 'img',
	{
	    src: 'http://acme.com/javascript/acme.colorpicker.icon.png',
	    alt: 'color picker icon', title: 'click to open color picker',
	    style: { width: '1em', height: '1em', cursor: 'pointer', border: 'solid 1px blue' },
	    onclick: acme.utils.Partial( acme.colorpicker.OpenTable, element, callback )
	} );
    acme.keynav.KeyDown( acme.keynav.escKeyCode, acme.colorpicker.CloseTables );
    };

acme.colorpicker.OpenTable = function ( element, callback )
    {
    if ( element.style.position === null || element.style.position === undefined || element.style.position == '' )
	element.style.position = 'relative';
    var table = acme.utils.AppendElement( element, 'table', { cellPadding: 0, cellSpacing: 0, style: { position: 'absolute', left: '0px', top: '-3px', margin: '0px', border: 'outset black 4px' } } );
    var tbody = acme.utils.AppendElement( table, 'tbody', { } );
    var maxval = 255;
    var colorInc = 51;
    var row = -1;
    var col;
    var cols = 12;
    var swatchMultiplier = 6;
    var swatchWidth = 3 * swatchMultiplier;
    var swatchHeight = 2 * swatchMultiplier;
    var tr = null;
    for ( var r = 0; r <= maxval; r += colorInc )
	for ( var g = 0; g <= maxval; g += colorInc )
	    for ( var b = 0; b <= maxval; b += colorInc )
		{
		if ( tr == null || col >= cols )
		    {
		    var tr = acme.utils.AppendElement( tbody, 'tr', { } );
		    ++row;
		    col = 0;
		    }
		var color = acme.colorpicker.MakeColor( r, g, b );
		var td = acme.utils.AppendElement( tr, 'td', { } );
		var div = acme.utils.AppendElement( td, 'div', { title: color, style: { width: swatchWidth + 'px', height: swatchHeight + 'px', backgroundColor: color, cursor: 'pointer' }, onclick: acme.utils.Partial( acme.colorpicker.ChooseColor, table, callback, color ) } );
		++col;
		}
    acme.colorpicker.tables.push( table );
    };

acme.colorpicker.ChooseColor = function ( table, callback, color )
    {
    var i = acme.colorpicker.tables.indexOf( table )
    if ( i != -1 )
	{
	acme.utils.DestroyElement( acme.colorpicker.tables[i] );
	acme.colorpicker.tables.splice( i, 1 );
	callback( color );
	}
    }

acme.colorpicker.CloseTables = function ( )
    {
    for ( var i in acme.colorpicker.tables )
	acme.utils.DestroyElement( acme.colorpicker.tables[i] );
    acme.colorpicker.tables = [];
    }

acme.colorpicker.MakeColor = function ( r, g, b )
    {
    var r = acme.utils.ZeroPad( r.toString( 16 ).toUpperCase(), 2 );
    var g = acme.utils.ZeroPad( g.toString( 16 ).toUpperCase(), 2 );
    var b = acme.utils.ZeroPad( b.toString( 16 ).toUpperCase(), 2 );
    return '#' + r + g + b;
    };

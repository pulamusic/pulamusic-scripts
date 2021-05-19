// acme.editinplace.js - enable editing a text field right on the page
//
// Using this object is very easy.
//
// 1) In your HTML, put the text you want to make editable into an
//    identifiable HTML element.  You can use an id, a name, or
//    whatever identification method you like.  For example:
//
//        <div id="text">Here is the text.</div>
//
//    The element should have only text inside it, not other HTML elements.
//
// 2) Load the routines into your code:
//
//        <script src="//acme.com/javascript/acme.namespace.jsm" type="text/javascript"></script>
//        <script src="//acme.com/javascript/acme.editinplace.js" type="text/javascript"></script>
//
// 3) Find the element you want to edit.  For example, if you specified an
//    id in the HTML then you could say:
//
//      var element = document.getElementById( 'text' );
//
// 4) Create an EditInPlace object, passing it the HTML element, the number
//    of lines you want in the editable field, and a callback function:
//
//      var eip = new acme.editinplace.EditInPlace( element, lines, callback );
//
//    If lines is one you get a text input field for editing; if lines is
//    greater than one you get a textarea.
//
// 5) The callback will probably be a closure that you create, that knows
//    which element it is getting called on.  For example you might say:
//
//      function () { RealCallback( element ); }
//
//    That creates a closure that calls the real callback with the text
//    element as argument.
//
//    When the callback is called, the contents of the text element have
//    already been changed to the new value.  If you don't need to do
//    anything else, feel free to pass null as the callback.
//
// That's it!  Everything else happens automatically.
//
//
// The current version of this code is always available at:
// http://acme.com/javascript/
//
//
// Copyright © 2006 by Jef Poskanzer <jef@mail.acme.com>.
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


acme.namespace( 'acme.editinplace' );


acme.editinplace.EditInPlace = function ( element, lines, callback )
    {
    this.element = element;
    this.lines = lines;
    this.callback = callback;

    this.savedBackgroundColor = element.style.backgroundColor;
    if ( element.title === null || element.title === undefined || element.title == '' )
	element.title = 'Click to edit';
    else
	element.title += ' - click to edit';

    element.onmouseover = acme.editinplace.Partial( acme.editinplace.Yellowfy, this );
    element.onmouseout = acme.editinplace.Partial( acme.editinplace.DeYellowfy, this );
    element.onclick = acme.editinplace.Partial( acme.editinplace.Edit, this );
    };


acme.editinplace.yellow = '#ffffcc';


acme.editinplace.Yellowfy = function ( eip )
    {
    eip.element.style.backgroundColor = acme.editinplace.yellow;
    };


acme.editinplace.DeYellowfy = function ( eip )
    {
    eip.element.style.backgroundColor = eip.savedBackgroundColor;
    };


acme.editinplace.Edit = function ( eip )
    {
    if ( eip.editElement === null || eip.editElement === undefined )
	{
	// Create editElement.  Structure is as follows:
	// <form>
	//   <table border="0">
	//     <tbody>
	//       <tr>
	//         <td>
	//           <input type="text">
	//         </td>
	//       </tr>
	//       <tr>
	//         <td align="right">
	//           <input type="submit" value="Save">
	//           <span>&nbsp;</span>
	//           <input type="submit" value="Cancel">
	//         </td>
	//       </tr>
	//     </tbody>
	//   </table>
	// </form>

	eip.editElement = document.createElement( 'form' );
	eip.editElement.method = 'get';
	eip.editElement.action = 'javascript:void(0);';
	eip.editElement.style.marginTop = '0';
	eip.editElement.style.marginBottom = '0';
	eip.element.parentNode.insertBefore( eip.editElement, eip.element );

	var tableElement = document.createElement( 'table' );
	tableElement.border = 0;
	eip.editElement.appendChild( tableElement );

	var tbodyElement = document.createElement( 'tbody' );
	tableElement.appendChild( tbodyElement );

	var tr1Element = document.createElement( 'tr' );
	tbodyElement.appendChild( tr1Element );

	var td1Element = document.createElement( 'td' );
	tr1Element.appendChild( td1Element );

	if ( eip.lines == 1 )
	    {
	    eip.inputElement = document.createElement( 'input' );
	    eip.inputElement.type = 'text';
	    eip.inputElement.value = eip.element.innerHTML;
	    }
	else
	    {
	    eip.inputElement = document.createElement( 'textarea' );
	    eip.inputElement.value = eip.element.innerHTML;
	    }
	//eip.inputElement.style.cssText = eip.element.style.cssText;
	eip.inputElement.style.width = eip.element.style.width;
	eip.inputElement.style.height = ( eip.lines * 1.6 ).toFixed(1) + 'em';
	eip.inputElement.style.backgroundColor = acme.editinplace.yellow;
	eip.inputElement.onkeypress = acme.editinplace.Partial( acme.editinplace.KeyPress, eip );
	td1Element.appendChild( eip.inputElement );

	var tr2Element = document.createElement( 'tr' );
	tbodyElement.appendChild( tr2Element );

	var td2Element = document.createElement( 'td' );
	td2Element.align = "right";
	tr2Element.appendChild( td2Element );

	var saveElement = document.createElement( 'input' );
	saveElement.type = 'submit';
	saveElement.value = 'Save';
	saveElement.onclick = acme.editinplace.Partial( acme.editinplace.Save, eip );
	td2Element.appendChild( saveElement );

	var spanElement = document.createElement( 'span' );
	spanElement.innerHTML = '&nbsp;';
	td2Element.appendChild( spanElement );

	var cancelElement = document.createElement( 'input' );
	cancelElement.type = 'submit';
	cancelElement.value = 'Cancel';
	cancelElement.onclick = acme.editinplace.Partial( acme.editinplace.Cancel, eip );
	td2Element.appendChild( cancelElement );
	}
    eip.element.style.display = 'none';
    eip.editElement.style.display = '';
    eip.inputElement.select();
    };


acme.editinplace.KeyPress = function ( eip )
    {
    // This only works in MSIE, but it's also only needed in MSIE.
    // In Firefox, hitting Enter in the input field automatically
    // triggers the onsubmit action of the first button.
    if ( window.event && window.event.keyCode == 13 )
        acme.editinplace.Save( eip );
    };


acme.editinplace.Save = function ( eip )
    {
    eip.element.innerHTML = eip.inputElement.value;
    eip.editElement.style.display = 'none';
    eip.element.style.display = '';
    acme.editinplace.DeYellowfy( eip );
    if ( eip.callback !== null && eip.callback !== undefined )
	eip.callback();
    };

acme.editinplace.Cancel = function ( eip )
    {
    eip.editElement.style.display = 'none';
    eip.element.style.display = '';
    acme.editinplace.DeYellowfy( eip );
    };


// This returns a function closure that calls the given routine with the
// specified args.
acme.editinplace.Partial = function ()
    {
    var partialArgs = arguments;
    var func = partialArgs[0];
    return function ()
	{
	var funcArgs = [];
	for ( var i = 1, j = 0; i < partialArgs.length || j < arguments.length; ++i )
	    if ( partialArgs[i] === undefined )
		funcArgs.push( arguments[j++] );
	    else
		funcArgs.push( partialArgs[i] );
	return func.apply( func, funcArgs );
	};
    };

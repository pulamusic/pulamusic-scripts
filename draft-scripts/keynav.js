// acme.keynav.js - keyboard navigation
//
// Using this is very easy.
//
// 1) Load the code into your HTML file:
//    <script src="//acme.com/javascript/acme.namespace.jsm" type="text/javascript"></script>
//    <script src="//acme.com/javascript/acme.keynav.jsm" type="text/javascript"></script>
//
// 2) Add handlers:
//    acme.keynav.KeyDown( keyCode, callback );
//    acme.keynav.KeyUp( keyCode, callback );
//
// 3) The package defines some keyCodes you can use, or you can figure them
//    out for yourself using e.g. http://acme.com/javascript/events.html
//
// That's all there is to it.
//
//
// The current version of this code is always available at:
// http://acme.com/javascript/
//
//
// Copyright © 2018 by Jef Poskanzer <jef@mail.acme.com>.
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

acme.namespace( 'acme.keynav' );

acme.keynav.escKeyCode = 27;
acme.keynav.leftArrowKeyCode = 37;
acme.keynav.upArrowKeyCode = 38;
acme.keynav.rightArrowKeyCode = 39;

acme.keynav.keyDownCallbacks = [];
acme.keynav.keyUpCallbacks = [];

acme.keynav.KeyDown = function ( keyCode, callback )
    {
    document.documentElement.onkeydown = acme.keynav.KeyHandler;
    acme.keynav.keyDownCallbacks[keyCode] = callback;
    };


acme.keynav.KeyUp = function ( keyCode, callback )
    {
    document.documentElement.onkeyup = acme.keynav.KeyHandler;
    acme.keynav.keyUpCallbacks[keyCode] = callback;
    };


acme.keynav.KeyHandler = function ( event )
    {
    if ( ! event )
	event = window.event;
    var eventType = event.type;
    var keyCode = event.keyCode;
    var callback = null;
    if ( eventType == 'keydown' )
	callback = acme.keynav.keyDownCallbacks[keyCode];
    else if ( eventType == 'keyup' )
	callback = acme.keynav.keyUpCallbacks[keyCode];
    if ( callback )
	callback();
    };

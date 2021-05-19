// acme.menu.js - simple HTML menu
//
//
// The current version of this code is always available at:
// http://acme.com/javascript/
//
//
// Copyright © 2009 by Jef Poskanzer <jef@mail.acme.com>.
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


acme.namespace( 'acme.menu' );


acme.utils.AddCSSRule( '._menuItem:hover', 'color: white; background-color: black' );

acme.menu.menuBlock = null;


acme.menu.AppendMenu = function ( parent, properties )
    {
    if ( acme.menu.menuBlock === null || acme.menu.menuBlock === undefined )
	acme.menu.menuBlock = acme.utils.AppendElement( document.body, 'div', { style: { position: 'absolute', left: '0', right: '0', top: '0', bottom: '0', zIndex: '9999', backgroundColor: 'white', opacity: '.01', filter: 'alpha(opacity=01)', display: 'none' } } );
    var defaultProperties = { src: '//acme.com/resources/images/menu.gif', style: { position: 'absolute', top: '2px', right: '2px', width: '12px', height: '16px', cursor: 'pointer' } };
    var mergedProperties = acme.utils.MergeObjects( defaultProperties, properties );
    if ( parent.style.position === null || parent.style.position === undefined || parent.style.position == '' )
	parent.style.position = 'relative';
    var menu = acme.utils.AppendElement( parent, 'img', mergedProperties );
    menu._popup = acme.utils.AppendElement( document.body, 'div', { style: { position: 'absolute', border: '1px solid black', backgroundColor: 'white', padding: '2px', zIndex: '10000', display: 'none' } } );
    menu.onclick = acme.utils.Partial( acme.menu.MenuClicked, menu );
    acme.menu.menuBlock.onclick = acme.utils.Partial( acme.menu.MenuBlockClicked, menu );
    return menu;
    };


acme.menu.AppendMenuItem = function ( menu, callback, properties )
    {
    var defaultProperties = { className: '_menuItem', style: { cursor: 'pointer' } };
    var mergedProperties = acme.utils.MergeObjects( defaultProperties, properties );
    var item = acme.utils.AppendElement( menu._popup, 'div', mergedProperties );
    item._menu = menu;
    item._callback = callback;
    item.onclick = acme.utils.Partial( acme.menu.MenuItemClicked, item );
    return item;
    };


acme.menu.MenuClicked = function ( menu, e )
    {
    acme.utils.NoBubble( e );
    acme.menu.menuBlock.style.display = '';
    var menuXY = acme.utils.GetElementXY( menu );
    var pageWH = acme.utils.GetPageWH();
    menu._popup.style.top = ( menuXY.y + menu.clientHeight ) + 'px';
    menu._popup.style.right = ( pageWH.w - menuXY.x - menu.clientWidth ) + 'px';
    menu._popup.style.display = '';
    };


acme.menu.MenuBlockClicked = function ( menu, e )
    {
    acme.utils.NoBubble( e );
    menu._popup.style.display = 'none';
    acme.menu.menuBlock.style.display = 'none';
    };


acme.menu.MenuItemClicked = function ( item, e )
    {
    acme.utils.NoBubble( e );
    item._menu._popup.style.display = 'none';
    acme.menu.menuBlock.style.display = 'none';
    item._callback( item );
    };

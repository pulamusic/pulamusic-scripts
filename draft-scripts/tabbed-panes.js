// acme.tabs.js - simple HTML tabbed panes
//
// Using these routines is very easy.
//
// 1) In your HTML, make an element for the tabs to appear in:
//
//    <div id="tabs"></div>
//
// 2) Load the routines into your code:
//
//    <script src="//acme.com/javascript/acme.namespace.jsm" type="text/javascript"></script>
//    <script src="//acme.com/javascript/acme.tabs.js" type="text/javascript"></script>
//
// 3) Create a Tabs object, passing it the HTML element:
//
//    var tabs = new acme.tabs.Tabs( document.getElementById( 'tabs' ) );
//
// 4) Call the Add method for each pane you want to add.  The arguments are
//    the name of the tab, and a routine to call when the tab gets activated:
//
//    tabs.Add( 'Tab One', TabOneActivate );
//
// 5) Declare the tab activation routines.  They get passed the HTML element
//    where the pane should go.  The first time each routine is called,
//    it should create the pane's contents:
//
//    function TabOneActivate( paneElement )
//        {
//        if ( paneElement.innerHTML == '' )
//            paneElement.innerHTML = 'This is tab one.'
//        }
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


acme.namespace( 'acme.tabs' );


acme.tabs.Tabs = function ( element )
    {
    this.element = element;

    // We create the following structure inside the supplied element:
    // <table border="0" cellpadding="0" cellspacing="0">
    //   <tbody>
    //     <tr>
    //       <td align="left">
    //         <table border="0" cellpadding="5" cellspacing="0">
    //           <tbody>
    //             <tr>
    //               <td>&nbsp;</td>
    //               (tabs go here)
    //               <td>&nbsp;</td>
    //             </tr>
    //           </tbody>
    //         </table>
    //       </td>
    //     </tr>
    //     <tr>
    //       <td>
    //         (panels go here)
    //       </td>
    //     </tr>
    //   </tbody>
    // </table>

    var table1Element = document.createElement( 'table' );
    table1Element.border = '0';
    table1Element.cellPadding = '0';
    table1Element.cellSpacing = '0';
    element.appendChild( table1Element );

    var tbody1Element = document.createElement( 'tbody' );
    table1Element.appendChild( tbody1Element );

    var tr1Element = document.createElement( 'tr' );
    tbody1Element.appendChild( tr1Element );

    var td1Element = document.createElement( 'td' );
    td1Element.align = 'left';
    tr1Element.appendChild( td1Element );

    var table2Element = document.createElement( 'table' );
    table2Element.border = '0';
    table2Element.width = '100%';
    table2Element.cellPadding = '5';
    table2Element.cellSpacing = '0';
    td1Element.appendChild( table2Element );

    var tbody2Element = document.createElement( 'tbody' );
    table2Element.appendChild( tbody2Element );

    var tr2Element = document.createElement( 'tr' );
    tbody2Element.appendChild( tr2Element );

    var td2Element = document.createElement( 'td' );
    td2Element.style.cssText = acme.tabs.paddingStyle;
    td2Element.width = "100%";
    td2Element.innerHTML = acme.tabs.paddingStr;
    tr2Element.appendChild( td2Element );

    var tr3Element = document.createElement( 'tr' );
    tbody1Element.appendChild( tr3Element );

    var td4Element = document.createElement( 'td' );
    td4Element.style.cssText = acme.tabs.panesStyle;
    tr3Element.appendChild( td4Element );

    this.tabsElement = tr2Element;
    this.paddingElement = td2Element;
    this.panesElement = td4Element;

    this.items = [];
    this.activeItem = null;
    };


acme.tabs.activeTabStyle = 'white-space: nowrap; margin: 0; border: 1px solid #000000; border-bottom-width: 0;';
acme.tabs.inactiveTabStyle = 'white-space: nowrap; margin: 0; border: 1px solid #000000;';
acme.tabs.paddingStyle = 'margin: 0; border: 0 solid #000000; border-bottom-width: 1px;';
acme.tabs.panesStyle = 'margin: 0; border: 1px solid #000000; border-top-width: 0; padding: 1em';
acme.tabs.paddingStr = '&nbsp;';

acme.tabs.globalItems = [];


acme.tabs.Tabs.prototype.Add = function ( name, activateCallback )
    {
    var globalItemId = acme.tabs.globalItems.length;

    var padElement = document.createElement( 'td' );
    padElement.style.cssText = acme.tabs.paddingStyle;
    padElement.innerHTML = acme.tabs.paddingStr;
    this.tabsElement.insertBefore( padElement, this.paddingElement );

    var tabElement = document.createElement( 'td' );
    tabElement.style.cssText = acme.tabs.inactiveTabStyle;
    tabElement.innerHTML = '<a href="javascript:acme.tabs.Switch(' + globalItemId + ')">' + name + '</a>';
    this.tabsElement.insertBefore( tabElement, this.paddingElement );

    var paneElement = document.createElement( 'div' );

    var item = new acme.tabs.Item( this, name, activateCallback, tabElement, paneElement );
    this.items.push( item );
    acme.tabs.globalItems.push( item );
    if ( this.items.length == 1 )
	item.Activate();
    };


acme.tabs.Item = function ( parent, name, activateCallback, tabElement, paneElement )
    {
    this.parent = parent;
    this.name = name;
    this.activateCallback = activateCallback;
    this.tabElement = tabElement;
    this.paneElement = paneElement;
    };


acme.tabs.Item.prototype.Activate = function ()
    {
    if ( this.parent.activeItem !== null &&
	 this.parent.activeItem !== undefined )
	{
	this.parent.activeItem.tabElement.style.cssText = acme.tabs.inactiveTabStyle;
	this.parent.panesElement.removeChild( this.parent.activeItem.paneElement );
	}
    this.parent.activeItem = this;
    this.tabElement.style.cssText = acme.tabs.activeTabStyle;
    this.parent.panesElement.appendChild( this.paneElement );
    this.activateCallback( this.paneElement );
    };


acme.tabs.Switch = function ( globalItemId )
    {
    acme.tabs.globalItems[globalItemId].Activate();
    };

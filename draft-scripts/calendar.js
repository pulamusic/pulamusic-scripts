// acme.calendar.js - simple calendar widget
//
// To create a calendar widget for the current date:
//   acme.calendar.MakeCalendarCurrent( element, callback );
// To create a calendar widget for some other date:
//   acme.calendar.MakeCalendarDMY( element, day, month, year, callback );
//
// Element is the HTML element where you want the calendar built.
// Day is 1-31, month is 1-12, and year is four digits.  Callback
// is a routine that gets called when the user clicks on a date.
// It gets passed the day, month, and year that was selected.
//
// The Calendar widget exposes the following CSS classes, in case you want
// to change the default colors or something:
//   calendar: the outermost element of the widget
//   calendarCorner: the upper left and upper right corner areas
//   calendarHover: when the mouse moves over an active item
//   calendarToday: special styling for the current day
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

acme.namespace( 'acme.calendar' );

acme.calendar.MakeCalendarCurrent = function ( element, callback )
    {
    var d = new Date();
    return acme.calendar.MakeCalendarDMY( element, d.getDate(), d.getMonth() + 1, d.getFullYear(), callback );
    };

// day: 1-31  month: 1-12  year: 4 digits
acme.calendar.MakeCalendarDMY = function ( element, day, month, year, callback )
    {
    acme.calendar.MakeCalendarDMYInternal( element, day, month, year, day, month, year, callback );
    };

acme.calendar.MakeCalendarDMYInternal = function ( element, day, month, year, initialDay, initialMonth, initialYear, callback )
    {
    // Make sure the element starts empty.
    acme.utils.ClearElement( element );

    // Outer table and headers.
    var tableOuter = acme.utils.AppendElement( element, 'table', { border: 0, cellSpacing: 0, cellPadding: 4, className: 'calendar' } );
    var tbodyOuter = acme.utils.AppendElement( tableOuter, 'tbody', { } );
    var trOuter_1 = acme.utils.AppendElement( tbodyOuter, 'tr', { } );
    // Upper left corner.
    var tdOuter_1_1 = acme.utils.AppendElement( trOuter_1, 'td', { className: 'calendarCorner', style: { width: '33.333%' } } );
    var tableUL = acme.utils.AppendElement( tdOuter_1_1, 'table', { border: 0, cellSpacing: 0, cellPadding: 1, width: '100%' } );
    var tbodyUL = acme.utils.AppendElement( tableUL, 'tbody', { } );
    var trUL_1 = acme.utils.AppendElement( tbodyUL, 'tr', { } );
    var tdUL_1_1 = acme.utils.AppendElement( trUL_1, 'td', { style: { textAlign: 'left' } } );
    var prevMonth = month - 1;
    if ( prevMonth == 0 ) prevMonth = 12;
    tdUL_1_1.innerHTML = '&lt; ' + acme.utils.MonthShorter( prevMonth );
    tdUL_1_1.onmouseover = acme.utils.Partial( acme.calendar.CalendarHoverOn, tdUL_1_1 );
    tdUL_1_1.onmouseout = acme.utils.Partial( acme.calendar.CalendarHoverOff, tdUL_1_1 );
    tdUL_1_1.onclick = acme.utils.Partial( acme.calendar.MakeCalendarDMYInternal, element, 0, prevMonth, year, initialDay, initialMonth, initialYear, callback );
    var trUL_2 = acme.utils.AppendElement( tbodyUL, 'tr', { } );
    var tdUL_2_1 = acme.utils.AppendElement( trUL_2, 'td', { style: { textAlign: 'left' } } );
    var prevYear = year - 1;
    tdUL_2_1.innerHTML = '&lt;' + prevYear;
    tdUL_2_1.onmouseover = acme.utils.Partial( acme.calendar.CalendarHoverOn, tdUL_2_1 );
    tdUL_2_1.onmouseout = acme.utils.Partial( acme.calendar.CalendarHoverOff, tdUL_2_1 );
    tdUL_2_1.onclick = acme.utils.Partial( acme.calendar.MakeCalendarDMYInternal, element, 0, month, prevYear, initialDay, initialMonth, initialYear, callback );
    // Middle header.
    var tdOuter_1_2 = acme.utils.AppendElement( trOuter_1, 'td', { style: { width: '33.333%', textAlign: 'center' } } );
    tdOuter_1_2.innerHTML = acme.utils.MonthShorter( month )+ '<br />' + year;
    // Upper right corner.
    var tdOuter_1_3 = acme.utils.AppendElement( trOuter_1, 'td', { className: 'calendarCorner', style: { width: '33.333%' } } );
    var tableUR = acme.utils.AppendElement( tdOuter_1_3, 'table', { border: 0, cellSpacing: 0, cellPadding: 1, width: '100%' } );
    var tbodyUR = acme.utils.AppendElement( tableUR, 'tbody', { } );
    var trUR_1 = acme.utils.AppendElement( tbodyUR, 'tr', { } );
    var tdUR_1_1 = acme.utils.AppendElement( trUR_1, 'td', { style: { textAlign: 'right' } } );
    var nextMonth = month + 1;
    if ( nextMonth == 13 ) nextMonth = 1;
    tdUR_1_1.innerHTML = acme.utils.MonthShorter( nextMonth ) + ' &gt;';
    tdUR_1_1.onmouseover = acme.utils.Partial( acme.calendar.CalendarHoverOn, tdUR_1_1 );
    tdUR_1_1.onmouseout = acme.utils.Partial( acme.calendar.CalendarHoverOff, tdUR_1_1 );
    tdUR_1_1.onclick = acme.utils.Partial( acme.calendar.MakeCalendarDMYInternal, element, 0, nextMonth, year, initialDay, initialMonth, initialYear, callback );
    var trUR_2 = acme.utils.AppendElement( tbodyUR, 'tr', { } );
    var tdUR_2_1 = acme.utils.AppendElement( trUR_2, 'td', { style: { textAlign: 'right' } } );
    var nextYear = year + 1;
    tdUR_2_1.innerHTML = nextYear + '&gt;';
    tdUR_2_1.onmouseover = acme.utils.Partial( acme.calendar.CalendarHoverOn, tdUR_2_1 );
    tdUR_2_1.onmouseout = acme.utils.Partial( acme.calendar.CalendarHoverOff, tdUR_2_1 );
    tdUR_2_1.onclick = acme.utils.Partial( acme.calendar.MakeCalendarDMYInternal, element, 0, month, nextYear, initialDay, initialMonth, initialYear, callback );
    // Inner table for the days.
    var trOuter_2 = acme.utils.AppendElement( tbodyOuter, 'tr', { } );
    var tdOuter_2_1 = acme.utils.AppendElement( trOuter_2, 'td', { colSpan: 3 } );
    var tableLower = acme.utils.AppendElement( tdOuter_2_1, 'table', { border: 0, cellSpacing: 0, cellPadding: 1, style: { textAlign: 'center' } } );
    var tbodyLower = acme.utils.AppendElement( tableLower, 'tbody', { } );
    var trLower_1 = acme.utils.AppendElement( tbodyLower, 'tr', { } );
    // Day of the week header.
    for ( var dow = 0; dow < 7; ++dow )
	{
	var td_dow = acme.utils.AppendElement( trLower_1, 'td', { } );
	td_dow.innerHTML = acme.utils.WeekdayShorter( dow );
	}

    // And here are the actual days.
    var firstDow = acme.utils.DayOfWeek( year, month, 1 );
    var daysInMonth = acme.utils.MonthDays( year, month );
    var tr = null;
    var column;
    var td;
    for ( var aDay = 0; aDay <= daysInMonth; )
	{
	if ( tr === null || tr === undefined || column == 7 )
	    {
	    tr = acme.utils.AppendElement( tbodyLower, 'tr', { } );
	    column = 0;
	    }
	if ( aDay == 0 )
	    {
	    if ( column < firstDow )
		{
		td = acme.utils.AppendElement( tr, 'td', { } );
		++column;
		continue;
		}
	    aDay = 1;
	    }
	td = acme.utils.AppendElement( tr, 'td', { className: 'calendarDay' } );
	td.innerHTML = aDay;
	if ( aDay == initialDay && month == initialMonth && year == initialYear )
	    td.className = 'calendarToday';
	else
	    {
	    td.onmouseover = acme.utils.Partial( acme.calendar.CalendarHoverOn, td );
	    td.onmouseout = acme.utils.Partial( acme.calendar.CalendarHoverOff, td );
	    td.onclick = acme.utils.Partial( acme.calendar.CalendarSelect, td, callback, aDay, month, year )
	    }
	td.calendar = element;
	++column;
	++aDay
	}
    };

acme.calendar.CalendarHoverOn = function ( element )
    {
    element.oldId = element.id;
    element.id = 'calendarHover';
    };

acme.calendar.CalendarHoverOff = function ( element )
    {
    element.id = element.oldId;
    };

acme.calendar.CalendarSelect = function ( element, callback, day, month, year )
    {
    var prevSelected = element.calendar.selected;
    if ( prevSelected !== null && prevSelected !== undefined )
	prevSelected.className = prevSelected.oldClass;

    element.oldClass = element.className;
    element.className = 'calendarSelected';
    element.calendar.selected = element;

    callback( day, month, year );
    };

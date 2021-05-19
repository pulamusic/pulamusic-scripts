%{

#include <stdlib.h>
#include <unistd.h>
#include <stdio.h>

static void makelink( char* str );
static void makelink2( char* str1, char* str2 );

%}

%%

"http://"[^>)}\] \t\r\n]+			makelink( yytext );
"https://"[^>)}\] \t\r\n]+			makelink( yytext );
"www."[a-zA-Z0-9.\-]+"."(com|org|net|gov)("/"[^>)}\] \t\r\n]*|"")	makelink2( "http://", yytext );
"ftp://"[^>)}\] \t\r\n]+			makelink( yytext );
"gopher://"[^>)}\] \t\r\n]+			makelink( yytext );
"mailto:"[a-zA-Z0-9+._\-]+"@"[a-zA-Z0-9+.\-]+	makelink( yytext );
[a-zA-Z0-9+._\-]+"@"[a-zA-Z0-9+.\-]+		makelink2( "mailto:", yytext );
"telnet:"[a-zA-Z0-9+.:@\-]+			makelink( yytext );
"<"						printf( "&lt;" );
">"						printf( "&gt;" );
"&"						printf( "&amp;" );
\n\n\n*						ECHO; printf( "<p>" );
\r\r\r*						ECHO; printf( "<p>" );
\r\n\r\n[\r\n]*					ECHO; printf( "<p>" );
.|\n						ECHO;

%%

static void
makelink( char* str )
    {
    (void) printf( "<a href=\"%s\">%s</a>", str, str );
    }

static void
makelink2( char* str1, char* str2 )
    {
    (void) printf( "<a href=\"%s%s\">%s</a>", str1, str2, str2 );
    }

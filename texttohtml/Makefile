CC =		cc
CFLAGS =	-O -ansi -pedantic -U__STRICT_ANSI__ -Wall -Wpointer-arith -Wshadow -Wcast-qual -Wcast-align -Wstrict-prototypes -Wmissing-prototypes -Wmissing-declarations -Wredundant-decls -Wno-long-long
LDFLAGS =	-s
#LEX =		lex
LEX =		flex -i -Cfre -8
#LEXLIB =	-ll
LEXLIB =	-lfl
BINDIR =	/usr/local/bin
MANDIR =	/usr/local/man/man1

.l.c:
	${LEX} $*.l ; rm -f $@ ; mv lex.yy.c $@

all:		texttohtml

texttohtml:	texttohtml.c
	${CC} ${CFLAGS} texttohtml.c -o texttohtml ${LDFLAGS} ${LEXLIB}

install:	all
	rm -f ${BINDIR}/texttohtml
	cp texttohtml ${BINDIR}
	rm -f ${MANDIR}/texttohtml.1
	cp texttohtml.1 ${MANDIR}

clean:
	rm -f *.o texttohtml texttohtml.c a.out lex.yy.c lex.backtrack

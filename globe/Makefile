# CONFIGURE: the directory where you want the executables installed.
BINDIR =	/usr/local/bin

# CONFIGURE: the directory tree where you want the man pages installed.
MANDIR =	/usr/local/man

# CONFIGURE: your favorite C compiler.
CC =		cc

# CONFIGURE: your favorite C flags.
CFLAGS =	-O -ansi -pedantic -U__STRICT_ANSI__ -Wall -Wpointer-arith -Wshadow -Wcast-qual -Wcast-align -Wstrict-prototypes -Wmissing-prototypes -Wmissing-declarations -Wredundant-decls -Wno-long-long

# CONFIGURE: your favorite linker flags.
LDFLAGS =	-s

all:		globe

globe:		globe.c
	$(CC) $(CFLAGS) globe.c $(LDFLAGS) -o globe

install:	all
	rm -f $(BINDIR)/globe
	cp globe $(BINDIR)
	rm -f $(MANDIR)/man1/globe.1
	cp globe.1 $(MANDIR)/man1

clean:
	rm -f globe a.out core

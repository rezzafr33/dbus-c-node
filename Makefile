CFLAGS_GIO  = $(shell pkg-config --cflags --libs gio-2.0)

CFLAGS = -g -Wall -Werror


all: ping

ping: ping.c
	gcc $< -o $@ $(CFLAGS) $(CFLAGS_GIO)

clean:
	rm -f ping

.PHONY: all clean

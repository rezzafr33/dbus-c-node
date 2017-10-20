/*
C DBus Client example.
Copyright © 2017 Mochamad Rezzafri <rezzafri@gmail.com>

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, see <http://www.gnu.org/licenses/>.
*/
#include <gio/gio.h>
#include <glib/gprintf.h>
#include <stdio.h>

void
call_method(GDBusProxy* proxy, const gchar* method)
{
  GVariant* result;
  GError* error = NULL;
  const gchar* str;

  result = g_dbus_proxy_call_sync(proxy, method, NULL, G_DBUS_CALL_FLAGS_NONE,
                                  -1, NULL, &error);

  g_assert_no_error(error);
  g_variant_get(result, "(&s)", &str);
  g_printf("Server say: %s\n", str);
  g_variant_unref(result);
}

int
main(int argc, char* argv[])
{
  GDBusProxy* proxy;
  GDBusConnection* conn;
  GError* error = NULL;

  conn = g_bus_get_sync(G_BUS_TYPE_SESSION, NULL, &error);

  g_assert_no_error(error);

  proxy = g_dbus_proxy_new_sync(conn, G_DBUS_PROXY_FLAGS_NONE, NULL,
                                "nodejs.dbus.ExampleService",
                                "/nodejs/dbus/ExampleService",
                                "nodejs.dbus.ExampleService.Interface1", NULL,
                                &error);

  g_assert_no_error(error);

  call_method(proxy, "Hello");
  call_method(proxy, "Ping");

  g_object_unref(proxy);
  g_object_unref(conn);

  return 0;
}

/*
Node DBus Client
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
/* eslint-disable no-console */
const DBus = require('dbus');

const bus = DBus.getBus('session');

bus.getInterface('nodejs.dbus.ExampleService', '/nodejs/dbus/ExampleService', 'nodejs.dbus.ExampleService.Interface1', (err, iface) => {
  iface.MakeError(error => console.log(error));

  iface.Ping((error, result) => {
    if (error) {
      return console.log(error);
    }
    console.log(result);
    return process.exit();
  });
});

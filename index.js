/*
Node DBus service
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
const DBus = require('dbus');

const service = DBus.registerService('session', 'nodejs.dbus.ExampleService');

const obj = service.createObject('/nodejs/dbus/ExampleService');

const iface1 = obj.createInterface('nodejs.dbus.ExampleService.Interface1');

iface1.addMethod('Dummy', {}, (callback) => {
  setTimeout(() => {
    callback();
  }, 1000);
});

iface1.addMethod('MakeError', { out: DBus.Define(String) }, (callback) => {
  callback(new DBus.Error('nodejs.dbus.ExampleService.ErrorTest', 'Some error'));
});

iface1.addMethod('Hello', { out: DBus.Define(String) }, (callback) => {
  callback(null, 'Hello There');
});

iface1.addMethod('Ping', { out: DBus.Define(String) }, (callback) => {
  callback(null, 'Pong!');
});

iface1.update();

Serverhome
==========

------------
`DEPRECATION NOTICE`
Development is stopped in order to contribute to a more promising project: https://github.com/linuxserver/Heimdall

------------

Serverhome is a small web server / web service that reads a YAML configuration file and starts on TCP port 3000 by default. It displays a Navbar designed with Bootstrap 3 and displays the health-checked services within the Navbar.

![Example Image](https://github.com/gersilex/serverhome/raw/master/image.png)

This package contains the backend and the frontend which is served by the backend's web server. When the frontend calls the API for services and their states, the backend immediately returns all of the services and their last known states. It also queries all the services for their new states and saves them in-memory, to be served on the next query by a frontend.

This means the service is always one check behind reality to increase responsiveness and should be asked regularily. The frontend sends a query every 2 seconds and increases the interval by 1 % per query up to **two minutes** to mitigate accidental DoS'es (I have done this way too often).

Installation
------------

Clone the repository and install the dependencies:

```sh
git clone https://github.com/gersilex/serverhome.git
cd serverhome
npm install
```

Configuration
-------------

Create a `config.yml` in the root directory. Have a look at the `config.yml.spec` for a working example. Here is the format and what is what:

```yaml
default:            # This is the default scope and everything must be contained within here. The order is preserved.
  MyWebService:     # This is the name of your first service. The key name will be displayed in the navbar.
    uri: (String)   # Here comes the URL to your service. If it returns a code of >200 and <400 the service will turn green.
    healthcheck: (String) # Here comes the URL which will be checked instead of the uri value. 
  AnotherService:   # Next service
      uri: (String)   # The URI of AnotherService
    ...
```

A working `config.yml` looks like this:

```yaml
default:
  Router:
    uri: http://router
  NAS:
    uri: http://nas
    healthcheck: http://nas/manage/health
  Kodi:
    uri: http://media:8080
  Drucker:
    uri: http://drucker
```

You can create a file `public/logo.png` and it will be displayed centered if no service was clicked, yet or there were errors. This can be changed in `public/index.html`.

Run it
------

```sh
npm start
```

Docker
------

Build the image with the bundled Dockerfile:

```sh
docker build -t serverhome:latest .
```

Run it:

```sh
docker run -it -v /tmp/config.yml:/app/config.yml -p3000:3000 serverhome:latest
```

Caveats
-------

- Twitter Bootstrap 3 is included from MaxCDN. This means you need to have internet access to have a working CSS design. This is because I was lazy.
- If a services denies CORS, then we cannot open it in the main iframe. Nothing will happen and the user has to middle-click/ open in new tab.
- If the service in the iframe displays an error, it is likely that there will be black text on the grey background. This will be hard to read.

Contribution
------------

You are welcome to open issues, fork and improve the code, design and documenation.

Thanks to
---------

- Marvyn Zalewski (github.com/hExPY / keyboardinterrupt.org) for forcing me to look into new technologies like NodeJS and skip Python for this project.
- Immonet GmbH & Immowelt Hamburg GmbH for the *Immovation Day*, a day to have fun and improve personal and technical skills on a regular basis.

MIT License
-----------

Copyright 2017 Leroy Förster

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

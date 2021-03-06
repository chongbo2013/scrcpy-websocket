# ws scrcpy

Web client for [scrcpy](https://github.com/Genymobile/scrcpy) and more.

## Requirements

Browser must support the following technologies:
* WebSockets
* Media Source Extensions and h264 decoding
([MseDecoder](/src/app/decoder/MseDecoder.ts))
* WebWorkers ([tinyh264](/src/app/decoder/Tinyh264Decoder.ts))
* WebAssembly  ([Broadway.js](/src/app/decoder/BroadwayDecoder.ts) and
[tinyh264](/src/app/decoder/Tinyh264Decoder.ts))

Server:
* Node.js v10+
* node-gyp (on Window: `npm install --global windows-build-tools node-gyp`)
* `adb` executable must be available in the PATH environment variable

Device:
* Android 5.0+ (API 21+)
* Enabled [debugging](https://developer.android.com/studio/command-line/adb.html#Enabling)
* On some devices, you also need to enable
[an additional option](https://github.com/Genymobile/scrcpy/issues/70#issuecomment-373286323)
to control it using keyboard and mouse.

## Build and Start

```shell
git clone https://github.com/NetrisTV/ws-scrcpy.git
cd ws-scrcpy
npm install
npm start
```

## Supported features

### Screen casting
The modified [version](https://github.com/NetrisTV/scrcpy/tree/feature/websocket-v1.16.x)
of [Genymobile/scrcpy](https://github.com/Genymobile/scrcpy) used to stream
H264 video, which then decoded by one of included decoders.

### Remote control
* Touch events (including multi-touch)
* Multi-touch emulation: <kbd>CTRL</kbd> to start with center at the center of
the screen, <kbd>SHIFT</kbd> + <kbd>CTRL</kbd> to start with center at the
current point
* Capturing keyboard events
* Injecting text (ASCII only)
* Copy to/from device clipboard
* Device "rotation"

### File push
Drag & drop an APK file to push it to the `/data/local/tmp` directory. You can
install it manually from the included
[xterm.js](https://github.com/xtermjs/xterm.js) terminal emulator (see below).

### Remote shell
Control your device from `adb shell` in your browser.

### Debug WebPages/WebView
[/docs/Devtools.md](/docs/Devtools.md)

## Known issues

* New versions are most likely not incompatible with previous ones. If you do
upgrade, then manually stop `app_process` or just reboot the device.
* The server on the Android Emulator listens on the internal interface and not
available from the outside (select `proxy over adb` in interfaces list)
* Tinyh264Decoder may fail to start, try to reload the page.
* MseDecoder reports too many dropped frames in quality statistics: needs
further investigation.

## Security warning
Be advised and keep in mind:
* There is no encryption between browser and node.js server (plain HTTP).
* There is no encryption between browser and WebSocket server (plain WS).
* There is no authorization on any level.
* The modified version of scrcpy with integrated WebSocket server is listening
for connections on all network interfaces.
* The modified version of scrcpy will keep running after the last client
disconnected.

## WS QVH
This project also contains front-end for
[NetrisTV/ws-qvh](https://github.com/NetrisTV/ws-qvh) - application for screen
streaming and control of iOS devices in a browser.

Run this to build it:

```shell script
npm install
npm run dist:qvhack:frontend
```

## Related projects
* [Genymobile/scrcpy](https://github.com/Genymobile/scrcpy)
* [xevokk/h264-converter](https://github.com/xevokk/h264-converter)
* [131/h264-live-player](https://github.com/131/h264-live-player)
* [mbebenita/Broadway](https://github.com/mbebenita/Broadway)
* [openstf/adbkit](https://github.com/openstf/adbkit)
* [xtermjs/xterm.js](https://github.com/xtermjs/xterm.js)
* [udevbe/tinyh264](https://github.com/udevbe/tinyh264)

## scrcpy websocket fork

Currently, support of WebSocket protocol added to v1.16 of scrcpy
* [Prebuilt package](/vendor/Genymobile/scrcpy/scrcpy-server.jar)
* [Source code](https://github.com/NetrisTV/scrcpy/tree/feature/websocket-v1.16.x)

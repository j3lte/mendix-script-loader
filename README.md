# Script Loader

![AppStoreIcon](/assets/MarketPlaceIcon.png)

Load scripts in your Mendix page/layout

## Features

- Load javascript files from an external source
- Execute action on load/error
- Execute action when all are loaded
- Load scripts in parallel or sequential order

## Important note

> While you can load external scripts (like we do in out demo), you should be aware that the script might not work, or more importantly: mess with the Mendix runtime in your page.

For example:
- Loading jQuery works fine
- Loading Lodash seems to not work properly. The script loads fine, but when the page tries to load Javascript Actions, it breaks

So, if you have issues with your Mendix application when you are using the Script Loader widget, check if any of the loaded scripts interfere with the app itself.

## Usage

Import the Script Loader widget in your page (or preferably, your layout), set the different options (should be intuitive) and let it run.

![screenshot](/assets/screenshot_general.png)
![screenshot](/assets/screenshot_script.png)
![screenshot](/assets/screenshot_actions.png)

## Demo project

[Click here](https://caffcodecontenttestapp-sandbox.mxapps.io/p/script-loader-home)

## Issues, suggestions and feature requests

You can find all the information on [Github](https://github.com/j3lte/mendix-script-loader)

## License

The MIT License (MIT)

Copyright © CaffCode 2022. All Rights Reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

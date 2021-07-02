## pugh-chart

This is a pugh chart web component created with the purpose
of allow users to easily implement a pugh chart into their website
no matter the framework.

## Benefits
 - Easy to implement
 - Easy to use
 - Works in React, Angular, Vue
 - Will work in any framework at all

## Dependencies
 -  Built using lit

## Features
 - Can be created straight in the HTML tag
 - Can have minor styling on top of the base Bootstrap styling 
 or can completely overhaul the styling with the importation of
 self-made CSS classes
 - Using a settings button in the bottom left, the user can edit
 the pugh chart and play around with it so as to really capture
 the full benefits of a pugh chart
 - Base styling is reactive
 - Because this pugh chart is built with web components, the pugh-chart
 is abstracted from the rest of your HTML and will not interefere with your
 other code.

## Installation
<!-- prettier-ignore -->
```bash
$ npm install pugh-chart
```

## Importing
After installing the web component, it must also be imported.

This can be done in one of three ways.

Javascript module:
<!-- prettier-ignore -->
```js
import 'pugh-chart';
```

Or through HTML as follows:

<!-- prettier-ignore -->
```html
<script type="module">
import 'pugh-chart';
</script>
```
or
<!-- prettier-ignore -->
```html
<script type="module" src="pugh-chart"></script>
```

## Usage
After importing simply using the tag will add the web component to the application.
```html 
<pugh-chart></pugh-chart>
```

But this will not include any information and all editing of the pugh
chart will have to be done via the website on which the component is hosted.
If you wish to have persistent data inputted. This must be passed as an 
HTML property as seen in the following example.
```html
 <pugh-chart darkMode="true" inputCategories="Price,Fun,Complexity" inputWeights = "1,2,3" inputOptions="Car,1,1,1/Bike,2,2,2"></pugh-chart>
 ```

The data is passed to the HTML properties as a string (this was done because arrays
had a tendency to sometimes break and in order to have a better overall solution, strings
were used). Categories are the metrics by which options will be judged. Weights are the
relative weights for each of the categories and correspond by placement in the string. Then
options are the options with their scores. To separate each complete option and score grouping
from each other, a slash with no spaces around it must be used. Otherwise, to separate different 
inputs within each string, a comma is always used. Dark mode is set to true (using a string
for testing purposes with Storybook but this may be changed in the future). Dark mode is off 
by default. 

## Properties

| Property          | Type      | Default                                          | Description                                    |
|-------------------|-----------|--------------------------------------------------|--------------------------------------------------|
| `darkMode`        | `String`  | "false"                                          | Choose whether to have the default table styling to be dark mode or not. Done as a string for testing purposes in Storybook. May be changed later. |
| `editBool`        | `Boolean` | false                                            | Choose whether to have table editable as soon as it opens or not. |
| `href`            | `string`  | Bootstrap CDN | This is the href used to style the component. By default it is the bootstrap CDN but it can be manually inputted by the user. |
| `inputCategories` | `string`  | ""                                               | These are the categories for the chart that must be inputted as a string with commas separating categories. |
| `inputOptions`    | `string`  | ""                                               | These are the options for the chart that must be inputted as a string with commas sepearting score from header but a / separating groupings of entire options. |
| `inputWeights`    | `string`  | ""                                               | These are the weights for the chart that must be inputted as a string with commas separating weights. |
| `tBodyClass`      | `string`  | ""                                               | tbody class that is left blank but can be inputted by the user. |
| `tableClass`      | `string`  | "table table-striped"                            | This is the table class that is by default table table-striped (from Bootstrap). Can be manually inputted by the user. |
| `tdClass`         | `string`  | ""                                               | td class that is left blank but can be inputted by the user. |
| `thClass`         | `string`  | ""                                               | th class that is left blank but can be inputted by the user. |
| `theadClass`      | `string`  | ""                                               | thead class that is left blank but can be inputted by the user. |
| `trClass`         | `string`  | ""                                               | tr class that is left blank but can be inputted by the user. |

## Methods

| Method           | Type                 |
|------------------|----------------------|
| `addCriteria`    | `(): void`           |
| `addOption`      | `(): void`           |
| `deleteCriteria` | `(index: any): void` |
| `deleteOption`   | `(index: any): void` |
| `fillArray`      | `(): void`           |
(These methods do not need to be used by the user and are only here for reference)
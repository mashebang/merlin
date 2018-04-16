# <p align="center">_/\\\_ MERLIN-ENGINE _/\\\_</p>
<p align="center">
<img src="https://cdn.shopify.com/s/files/1/1114/2810/products/craftspring-merlin-wizard-decoration-doll-figure-puppet_1024x1024.jpg?v=1479263058" width="200"/>
</p>
Merlin is a generical file creator that uses templates and JSON data to generate dynamic files. It can be used to build scafolding tools and mock data based on templates.

## Installation
`npm install -g merlin-engine`

## Usage

A full command example:
`merlin create --values '{ "name": "Header" }' --template ./example/classComponentTemplate.js --output './example/Header.js`

 - `values`: a JSON like string with values to fill the template
- `template`: a template file that `merlin` uses to generate the final file. The template file must be written using the [JavaScript Template String](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/template_strings) specs. But `merlin` doesn't care about the extension files that you will generate. Just write the templates and use the right extensions and you will be able to generate python, ruby or whatever you want to.
- `output`: the relative path that `merlin` will write the output file.  

## License
merlin-engine is released under the [MIT License](https://github.com/netoguimaraes/merlin-engine/blob/master/LICENSE)



#! /usr/bin/env node
const path = require('path');
const fs = require("fs");

function create(cmd) {
  const values = cmd.values || {};
  const output = cmd.output || 'output';
  const templatePath = cmd.template || '';
  const file = fs.readFile(templatePath, "utf8", function (err, data) {
    if (err) {
      console.log(`Error reading ${templatePath}. check the file`);
      return;
    }
    const contentArray = data.split('\n');
    const replacedTemplate = replaceTemplate(contentArray, JSON.parse(values));

    replacedTemplate.forEach(line => {
      fs.appendFileSync(output, line.concat('\n'), (err, data) => console.log(err, data));
    });
  });
}

function evaluateGuard(content, keys) {
  const slotNames = content.reduce((acc, line) => {
      const allSlots = line.match(/\$\{[a-zA-Z0-9]*\}/g);
    
      if (allSlots) {
        allSlots.forEach(slot => {
          if (acc.includes(slot))
            return;

          const slotName = slot.substring(2, slot.length - 1);
          acc.push(slotName);
        });
      }

      return acc;
  }, [])
  
  const isSafe = slotNames.filter(name => !keys.includes(name));

  return isSafe.length == 0; 
}

function replaceTemplate(file, templateValues) {
  let content = file;
  const keys = Object.keys(templateValues);
  const shouldEvaluate = evaluateGuard(content, keys);
  if (shouldEvaluate) {
    keys.forEach(key => {
      content = content.map(line => {
        const template = '`' + line + '`';
        with(templateValues) {
          return eval(template);
        }
      });
    });
  } else {
    console.error("Missing values to fill the template. Check the values and what the template is asking for.")
  }

  return content;
}

const program = require('commander');
// merlin component Header --type 'login, logout'
program
  .version('1.0')
  .command('create')
  .description('creates a new component')
  .option('--values <values>', 'values to fill the template')
  .option('--output <template>', 'path to the output file')
  .option('--template <template>', 'path to the template file')
  .action(create);

program.parse(process.argv);

exports.create = create;

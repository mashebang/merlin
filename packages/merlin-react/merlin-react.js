const generateTemplate = require('merlin-engine').create;
const program = require('commander');
const STATELESS = 'stateless'; 
const CLASS = 'class'; 
const PURE = 'pure'; 

// merlin component Header --type class --state '{ neto: '', bora: false }'

export function componentCreate(cmd, options) {
  const componentName = cmd;
  const type = options.type || STATELESS;
  const state = options.state || null;
  const output = options.output || './components/';
  const finalPath = `${output}/${componentName}.js`;
  const templates = {
    [STATELESS]: './templates/stateless.template',
    [CLASS]: './templates/class.template',
    [PURE]: './templates/pure.template'
  };

  const template = templates[type];
  const values = JSON.stringify({
    name: componentName,
    state: createState(type, state)
  });
  console.log(values)
  generateTemplate({ values, output: finalPath, template });
}

function createState(type, state) {
  if (type = STATELESS && !state)
    return '';

  const stateStringified = JSON.stringify(state, null, '\t');
  const stateToRender = stateStringified.substr(1, stateStringified.length - 2)
  return `
  constructor(props) {
    super(props);
    this.state = ${stateToRender}
  }
  `  
};

program
  .version('1.0')
  .command('component [name]')
  .description('creates a new component')
  .option('--type <type>', 'component type (stateless|class|pure). default: stateless')
  .option('--state <state>', 'if the component is not stateless, it can receive inital state from cli using JSON like values')
  .option('--output <output>', 'output path')
  .action(componentCreate);

program.parse(process.argv);

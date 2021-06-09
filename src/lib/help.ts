export default [
  {
    header: 'Description',
    content: 'Convert fun configuration to s configuration',
  },
  {
    header: 'Usage',
    content: '$ s cli fc-transform fc [options]',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'fun-path',
        description: 'Specify fun configuration path(default: template.[yaml|yml] of the current folder).',
        alias: 'fun',
        type: Boolean,
      },
      {
        name: 'force',
        description: 'Mandatory overwrite s file',
        alias: 'f',
        type: Boolean,
      },
      {
        name: 'region',
        description: 'Pass in region in cli mode',
        type: String,
      },
    ],
  },
  {
    header: 'Global Options',
    optionList: [
      {
        name: 'access',
        description: 'Specify key alias.',
        alias: 'a',
        type: Boolean,
      },
      {
        name: 'help',
        description: 'fc-sync help for command.',
        alias: 'h',
        type: Boolean,
      },
    ],
  },
  {
    header: 'Examples with CLI',
    content: [
      '$ s cli fc-transform fc',
    ],
  },
];
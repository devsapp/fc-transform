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
        name: 'source',
        description: 'Specify fun configuration path(default: template.[yaml|yml]).',
        type: Boolean,
      },
      {
        name: 'target',
        description: 'Specify serverless devs configuration path(default: s.yaml).',
        type: Boolean,
      },
      {
        name: 'force',
        description: 'Mandatory overwrite s file',
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
      '$ s cli fc-transform fun2fc',
    ],
  },
];
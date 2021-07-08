"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
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
            '$ s cli fc-transform fun2ros',
        ],
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvaGVscC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtCQUFlO0lBQ2I7UUFDRSxNQUFNLEVBQUUsYUFBYTtRQUNyQixPQUFPLEVBQUUsOENBQThDO0tBQ3hEO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsT0FBTztRQUNmLE9BQU8sRUFBRSxtQ0FBbUM7S0FDN0M7SUFDRDtRQUNFLE1BQU0sRUFBRSxTQUFTO1FBQ2pCLFVBQVUsRUFBRTtZQUNWO2dCQUNFLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSwrREFBK0Q7Z0JBQzVFLElBQUksRUFBRSxPQUFPO2FBQ2Q7WUFDRDtnQkFDRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsOERBQThEO2dCQUMzRSxJQUFJLEVBQUUsT0FBTzthQUNkO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsV0FBVyxFQUFFLDRCQUE0QjtnQkFDekMsSUFBSSxFQUFFLE9BQU87YUFDZDtZQUNEO2dCQUNFLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSw0QkFBNEI7Z0JBQ3pDLElBQUksRUFBRSxNQUFNO2FBQ2I7U0FDRjtLQUNGO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsZ0JBQWdCO1FBQ3hCLFVBQVUsRUFBRTtZQUNWO2dCQUNFLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSxvQkFBb0I7Z0JBQ2pDLEtBQUssRUFBRSxHQUFHO2dCQUNWLElBQUksRUFBRSxPQUFPO2FBQ2Q7WUFDRDtnQkFDRSxJQUFJLEVBQUUsTUFBTTtnQkFDWixXQUFXLEVBQUUsMkJBQTJCO2dCQUN4QyxLQUFLLEVBQUUsR0FBRztnQkFDVixJQUFJLEVBQUUsT0FBTzthQUNkO1NBQ0Y7S0FDRjtJQUNEO1FBQ0UsTUFBTSxFQUFFLG1CQUFtQjtRQUMzQixPQUFPLEVBQUU7WUFDUCw2QkFBNkI7WUFDN0IsOEJBQThCO1NBQy9CO0tBQ0Y7Q0FDRixDQUFDIn0=
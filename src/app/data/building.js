export const buildings = [

    // for the picture hotspot
    //0<x<100
    //0<y<75

    {
        id: 'red-building',
        name: 'Red Building',
        description: 'Workshop Building',
        x: 62.7,
        y: 61.25, 
        link: '/map/red-building',
        roomStart: '6',
        examples: ['6557', '6450'],
        images: ['/Red_building_1.jpeg'],
        latitude: 13.79578,
        longitude: 100.3261594
    },
    {
        id: 'sc2-building',
        name: 'SC2 Building',
        description: 'Main Building',
        x: 41.5,
        y: 60,
        link: '/map/sc2-building',
        roomStart: 'SC2-',
        examples: ['SC2-152', 'SC2-323'],
        images: ['/SC2_building_1.jpeg'],
        latitude: 13.792323,
        longitude: 100.323404
    },
    {
        id: 'white-building',
        name: 'White Building',
        description: 'First Engineer building, room start with R',
        x: 41.5,
        y: 60,
        link: '/map/white-building',
        roomStart: 'R-',
        examples: ['R-235', 'R-324'],
        images: ['/White_building_1.jpeg'],
        latitude: 13.7960384,
        longitude: 100.3249266
    },
    // Add more buildings as needed
];
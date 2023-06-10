import { Component, OnInit } from '@angular/core';
import { Color } from '@swimlane/ngx-charts';

@Component({
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

  players: any[] = [
    { name: "Player", xp: 6200, won: 72 },
    { name: "Player", xp: 5800, won: 70 },
    { name: "Player", xp: 5700, won: 63 },
    { name: "Player", xp: 5200, won: 51 },
    { name: "Player", xp: 4900, won: 48 },
  ]

  view: [number, number] = [700, 400];

  colorScheme: Color = {
    domain: ['#4CAF50', '#F44336', '#FFC107', '#03A9F4', '#9C27B0', '#009688', '#E91E63', '#FF5722', '#2196F3', '#673AB7', '#8BC34A', '#FFEB3B', '#00BCD4', '#3F51B5', '#795548']
  } as any;

  multi: any[] = [
    {
      "name": "Stat1",
      "series": [
        {
          "name": "Group1",
          "value": 73000
        },
        {
          "name": "Group2",
          "value": 89400
        }
      ]
    },
    {
      "name": "Stat2",
      "series": [
        {
          "name": "Group1",
          "value": 78700
        },
        {
          "name": "Group2",
          "value": 82700
        },
        {
          "name": "Group3",
          "value": 12700
        }
      ]
    },
    {
      "name": "Stat3",
      "series": [
        {
          "name": "Group1",
          "value": 50000
        },
        {
          "name": "Group2",
          "value": 58000
        }
      ]
    },
    {
      "name": "Stat4",
      "series": [
        {
          "name": "Group1",
          "value": 50000
        },
        {
          "name": "Group2",
          "value": 28000
        },
        {
          "name": "Group3",
          "value": 58000
        }
      ]
    }
  ];

  multi2 = [
    {
      "name": "Stat1",
      "series": [
        {
          "name": "1990",
          "value": 62000000
        },
        {
          "name": "2010",
          "value": 73000000
        },
        {
          "name": "2011",
          "value": 89400000
        },
        {
          "name": "2012",
          "value": 89400000
        }
      ]
    },
  
    {
      "name": "Stat2",
      "series": [
        {
          "name": "1990",
          "value": 25000000
        },
        {
          "name": "2010",
          "value": 30900000
        },
        {
          "name": "2011",
          "value": 31100000
        },
        {
          "name": "2012",
          "value": 28940000
        }
      ]
    },
  
    {
      "name": "Stat3",
      "series": [
        {
          "name": "1990",
          "value": 58000000
        },
        {
          "name": "2010",
          "value": 50000020
        },
        {
          "name": "2011",
          "value": 58000000
        },
        {
          "name": "2012",
          "value": 69400000
        }
      ]
    },
    {
      "name": "Stat4",
      "series": [
        {
          "name": "1990",
          "value": 57000000
        },
        {
          "name": "2010",
          "value": 62000000
        },
        {
          "name": "2011",
          "value": 60000000
        },
        {
          "name": "2012",
          "value": 62400000
        }
      ]
    }
  ];

  single = [
    {
      "name": "Stat1",
      "value": 8940000
    },
    {
      "name": "Stat2",
      "value": 5000000
    },
    {
      "name": "Stat3",
      "value": 7200000
    },
      {
      "name": "Stat4",
      "value": 6200000
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CoronaCountServicesService} from '../../../services/corona-count-services.service';
import {environment as env} from '../../../../environments/environment';


// import * as d3 from './d3.min.js';
import * as Chart from './chart.js';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  clusterCountList: any[];
  clusterTotal = -1;
  lastUpdatedTime = '';

  fieldsort = { cluster_name : 'fa-sort', infected_count : 'fa-sort-down',
  death_count: 'fa-sort', test_count: 'fa-sort', foreigners_count: 'fa-sort' };
  currentEnv = env[env.current_env];
  chartEnabled = env.chart_enabled_envs.indexOf(env.current_env) !== -1;
  // Active cluster details
  clusterdetails: any = this.currentEnv.clusterdetails;
  // Keep track of initialized clusters. Calc percentage
  initializedClusters = [];

  clusterValues = [{ cluster_name: this.currentEnv.top_cluster ,
    data : [{date: '3/15', infected_count: 300, bar_percentage: 60, dayToDayPercentage: 0,
      doubled: false}], displayStart: 0, displayEnd: -1}];

  constructor( private coronaCountService: CoronaCountServicesService ) { }

  setSliderValue(event, cluster) {
    const curcl = this.getCluster(cluster);
    console.log( event.target.value  , curcl.displayEnd);
    curcl.displayDaysCount =  +event.target.value;
  }
  getSliderValue( cluster, displayDaysCount ) {
    // const curcl = this.getCluster(cluster);
    const clusterHistoryRet = this.initClusterValues(cluster);
    // console.log( cluster );

    if (clusterHistoryRet.length > 0) {
      const clusterHistory = clusterHistoryRet[0].data;
      if ( displayDaysCount === 0 ) {
        return clusterHistory[0].date;
      } else {
        return clusterHistory[clusterHistory.length - displayDaysCount - 1].date;
      }
    }
    return '';
  }

  chartTotals(): void {
    // console.log ( this.clusterValues );
    const textColor = 'black';
    const cl = this.currentEnv.chart.cluster;
    const visibleList = this.currentEnv.chart.visibleList;
    const stateab = this.currentEnv.chart.stateAbrev;
    cl.forEach(l => this.initClusterValues( l ) );

    const colorss = [ '#EC7063', '#C0392B', '#5DADE2', '#E67E22', '#EC7063', 'orange', 'orange', 'orange', 'orange', 'orange'];
    const colorsd = ['IndianRed', 'Crimson', 'DeepPink', 'MediumVioletRed', 'DarkOrange', 'Gold', 'Violet',
      'BlueViolet', 'Indigo', 'Blue', 'DeepSkyBlue', 'DarkTurquoise', 'Purple'];
    const colors = ['Steelblue', 'DarkTurquoise', 'LightSeaGreen', '#D8E622',  'DarkOrchid', 'Aqua', 'SeaGreen',
      'RosyBrown', 'Crimson', 'Orange'];

    const drawClusters = this.clusterValues.filter( l =>
      cl.indexOf( l.cluster_name.replace('US-', '')) >= 0);

    const labelList = drawClusters[0].data.map(l => l.date.replace('/2020', '') ).reverse();
    const dataSets = drawClusters.map ( (l, i) => {
      let stName = l.cluster_name.replace('US-', '');
      const res = stateab.filter( s => s.state === stName );
      if ( res.length > 0 ) {
        stName = res[0].abbrev;
      }
      // console.log ( stateab.filter( s => s.state === stName ) );
      return {
        label: stName ,
        // label: stateab[i],
        borderColor: colors[i],
        fill: false,
        hidden: visibleList.indexOf(l.cluster_name.replace(this.currentEnv.prefix, '')) === -1,
        data: l.data.map(d => +d.infected_count ).reverse()
      };
    });
    // console.log( "ASASASSASAS" );
    // console.log( dataSets );

    const v = new Chart(document.getElementById('line-chart'), {
      type: 'line',
      data: {
        labels: labelList,
        datasets: dataSets
      },
      options: {
        legend: {
          labels: {
            fontColor: textColor,
            fontSize: 12
            , fontFamily: 'Poppins-Regular, intersBold, sans-serif'
          }
          , position: 'bottom'
        },
        title: {
          display: false,
          text: 'Interactive - Click on legend to toggle'
          , fontColor: textColor
          , fontFamily: 'Poppins-Regular, intersBold, sans-serif'
          , fontSize: 8
          , position: 'bottom'
        },
        scales: {
          xAxes: [{
            ticks: {
              fontColor: textColor,
            }
          }],
          yAxes: [{
            ticks: {
              fontColor: textColor,
            }
          }]
        }
      }
    });
  }

  ngOnInit() {


    this.coronaCountService.getCount(this.currentEnv.corona_count.serviceURI).subscribe(resp => {
      this.clusterCountList =  resp.results;

      // shift() returns first element from the list
      this.lastUpdatedTime = this.clusterCountList.filter( n => n.cluster_name === 'last_updated').shift().infected_count;

      const ustotal = {cluster_name: this.currentEnv.fullName, infected_count: 0, death_count: 0, test_count: 0,
          foreigners_count: 0, bar_percentage: 0, recovered_count: 0};
      // Convert string to number and us total
      this.clusterCountList = this.clusterCountList.filter( n => n.cluster_name !== 'last_updated')
        .map( x => {
              x.infected_count = +x.infected_count;
              x.death_count = +x.death_count;
              x.test_count = +x.test_count;
              x.foreigners_count = +x.foreigners_count;
              x.recovered_count = +x.recovered_count;

              // Country Totals
              ustotal.infected_count += x.infected_count;
              ustotal.death_count += x.death_count;
              ustotal.test_count  += x.test_count;
              ustotal.foreigners_count += x.foreigners_count;
              ustotal.recovered_count += x.recovered_count;

              return x; });

      // Sum of infected count.
      // +n.infected_count - convert string to number
      this.clusterTotal = this.clusterCountList.map( n => +n.infected_count).reduce((a, b) =>  a + b, 0);

      // Push Country total and sort the list
      this.clusterCountList.push(ustotal);
      this.clusterCountList = this.clusterCountList.sort((n1, n2) => {
            if ( n1.infected_count < n2.infected_count) { return 1; }
            if ( n1.infected_count > n2.infected_count) { return -1; }
            return 0;
      });

    });

    if ( env.chart_enabled_envs.indexOf(env.current_env ) !== -1) {
      // Load history
      this.coronaCountService.getClusterHistoryCount(this.currentEnv.corona_count.serviceHistoryURI,
        this.currentEnv.historyResource).subscribe(resp => {
          this.clusterValues = JSON.parse(resp.results[0].cluster_value).result;

          const clValid = this.clusterValues.map(l => {
            return l.data;
          });
          // Add history totals by date cumulative.
          const t1 = [].concat(...clValid);
          const dateMap = new Map();
          t1.forEach(x => {
            if (!dateMap.has(x.date)) {
              dateMap.set(x.date, 0);
            }
            dateMap.set(x.date, dateMap.get(x.date) + +x.infected_count);
          });
          const dtList = [];
          dateMap.forEach((v, k) => {
            dtList.push({date: k.replace('/2020', ''), infected_count: v, bar_percentage: 50});
          });

          const uscl = {cluster_name: this.currentEnv.fullName, data: dtList, displayStart:  10,
                displayEnd:  30};

          this.clusterValues.push(uscl);
          this.toggleDetail(this.currentEnv.top_cluster_name);
          // setTimeout(() => this.chartTotals(), 50);
      });
    }

  }

  sort( col ) {
      let sortret = 0;
      if ( this.fieldsort[col] === 'fa-sort' ) {
        this.resetSort();
        this.fieldsort[col] = 'fa-sort-up';
        sortret = -1;
      } else {
        if ( this.fieldsort[col] === 'fa-sort-up' ) {
          this.resetSort();
          this.fieldsort[col] = 'fa-sort-down';
          sortret = 1;
        } else {
          this.resetSort();
          this.fieldsort[col] = 'fa-sort-up';
          sortret = -1;
        }
      }
      this.clusterCountList = this.clusterCountList.sort((n1, n2) => {
        if ( n1[col] < n2[col]) { return sortret; }
        if (n1[col] > n2[col]) { return -sortret; }
        return 0;
      });
  }

  initClusterValues(cluster: string) {

    // console.log (cluster);
    if ( env.chart_enabled_envs.indexOf(env.current_env ) === -1) {
      return [];
    }
    const r = this.clusterValues.filter ( x => x.cluster_name === this.currentEnv.prefix + cluster || x.cluster_name === cluster);
    // console.log( r ) ;
    if ( r.length > 0) {


      // Initialize if not
      if (this.initializedClusters.indexOf(cluster) === -1) {
        // Add current cluster to list
        const curcl = this.getCluster( cluster);

        // Copy initial history based display start and end  from history list
        curcl.displayStart = 0;
        curcl.historySize = r[0].data.length;
        curcl.displayDaysCount = r[0].data.length - 10;
        curcl.displayStart = r[0].data.length - 10;
        curcl.displayEnd = r[0].data.length;
        // console.log( curcl );
        const d = new Date();
        curcl.date = (d).getMonth() + 1 + '/' + d.getDate();
        r[0].data = r[0].data.filter(x => x.date !== curcl.date + '/2020');
        r[0].data.push(curcl);
        const maxCount = Math.max.apply(this, r[0].data.map(x => +x.infected_count));
        let lstDblCnt = +r[0].data[0].infected_count;
        let lastCnt = +r[0].data[0].infected_count;
        r[0].data.forEach(x => {
          x.date = x.date.replace('/2020', '');
          x.bar_percentage = (+x.infected_count / maxCount) * 100;
          if (+x.infected_count / lstDblCnt > 2) {
            lstDblCnt = +x.infected_count;
            x.doubled = true;
          }
          x.dayToDayPercentage = Math.round((x.infected_count - lastCnt) * 100 / lastCnt);
          lastCnt = +x.infected_count;
          // console.log( x );
        });
        r[0].data = r[0].data.reverse();

        this.initializedClusters.push(cluster);
      }
      return r;
    }
    return [];
  }

  getCluster( cluster: string ) {
    return this.clusterCountList.filter(f => f.cluster_name === cluster) [0];
  }


  getClusterValues(cluster: string) {

    const clusterVal = this.getCluster( cluster );
    const clusterHistoryRet = this.initClusterValues(cluster);
    // console.log( cluster );

    if ( clusterHistoryRet.length > 0 ) {
      const clusterHistory = clusterHistoryRet[0];
      const st = clusterHistory.data.length - clusterVal.displayEnd - 1;
      const sz = clusterHistory.data.length - clusterVal.displayStart;
      // console.log( clusterVal.displayStart, clusterVal.displayEnd, sz);
      return clusterHistory.data.slice(st, sz );
    } else {
      return [];
    }

  }

  resetSort() {
    this.fieldsort.cluster_name = 'fa-sort';
    this.fieldsort.infected_count = 'fa-sort';
    this.fieldsort.death_count = 'fa-sort';
  }

  toggleDetail( cluster ) {
    // console.log ( cluster );
    if ( this.clusterdetails.indexOf(cluster) !== -1 ) {
      const elem = document.getElementById(cluster);
      if (elem !== null) {
        elem.classList.add('fade-out');
      }
      // Remove is entry exists
      setTimeout( () => this.clusterdetails.splice(this.clusterdetails.indexOf(cluster), 1), 500 );
    } else {
      this.clusterdetails.push(cluster);
    }
  }

  checkDetailDisplay( cluster ) {
    return this.clusterdetails.indexOf(cluster) !== -1;
  }
}

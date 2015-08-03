/* Copyright (c) Richard Wall
 * See LICENSE for details.
 *
 * Some example recipes for Collectd RRD data - you *will* need to modify this
 * based on the RRD data available on your system.
 */

if(typeof(jarmon) === 'undefined') {
    var jarmon = {};
}

jarmon.TAB_RECIPES_STANDARD = [
    ['System',               ['cpu', 'memory','load','swap']],
    ['Network',              ['eth0','eth1','lo','data']],
    ['Disks',                ['sda5_time', 'sda5_merged', 'sda5_ops', 'sda5_data' ,'lvm' ]],
    ['All Processes',        ['all_process']],
    ['Asterisk CPU and Mem', [ 'asterisk_all', 'asterisk_counts' , 'asterisk_procs' ]],
    ['Asterisk Disk',        ['asterisk_disk_ops', 'asterisk_disk_throughput']],
];

jarmon.CHART_RECIPES_COLLECTD = {
    'cpu': {
        title: 'CPU Usage',
        data: [
            ['data/cpu-0/cpu-wait.rrd', 0, 'CPU-0 Wait', '%'],
            ['data/cpu-1/cpu-wait.rrd', 0, 'CPU-1 Wait', '%'],
            ['data/cpu-0/cpu-system.rrd', 0, 'CPU-0 System', '%'],
            ['data/cpu-1/cpu-system.rrd', 0, 'CPU-1 System', '%'],
            ['data/cpu-0/cpu-user.rrd', 0, 'CPU-0 User', '%'],
            ['data/cpu-1/cpu-user.rrd', 0, 'CPU-1 User', '%']
        ],
        options: jQuery.extend(true, {}, jarmon.Chart.BASE_OPTIONS,
                                         jarmon.Chart.STACKED_OPTIONS)
    },
    'memory': {
        title: 'Memory',
        data: [
            ['data/memory/memory-buffered.rrd', 0, 'Buffered', 'B'],
            ['data/memory/memory-used.rrd', 0, 'Used', 'B'],
            ['data/memory/memory-cached.rrd', 0, 'Cached', 'B'],
            ['data/memory/memory-free.rrd', 0, 'Free', 'B']
        ],
        options: jQuery.extend(true, {}, jarmon.Chart.BASE_OPTIONS,
                                         jarmon.Chart.STACKED_OPTIONS)
    },
    'load': {
        title: 'Load Average',
        data: [
            ['data/load/load.rrd', 'shortterm', 'Short Term', ''],
            ['data/load/load.rrd', 'midterm', 'Medium Term', ''],
            ['data/load/load.rrd', 'longterm', 'Long Term', '']
        ],
        options: jQuery.extend(true, {}, jarmon.Chart.BASE_OPTIONS)
    },
    'swap': {
        title: 'swap',
        data: [
            ['data/swap/swap-free.rrd', 'value', 'free', ''],
            ['data/swap/swap-used.rrd', 'value', 'used', '']
        ],
        options: jQuery.extend(true, {}, jarmon.Chart.BASE_OPTIONS)
    },
    'sda5_time': {
        title: 'sda5 time',
        data: [
            ['data/disk-sda5/disk_time.rrd','read','time(r)'      ],
            ['data/disk-sda5/disk_time.rrd','write','time(w)'     ],
        ],
        options: jQuery.extend(true, {}, jarmon.Chart.BASE_OPTIONS)
    },
    'sda5_merged': {
        title: 'sda5 merged',
        data: [
            ['data/disk-sda5/disk_merged.rrd','read','merged(r)'  ],
            ['data/disk-sda5/disk_merged.rrd','write','merged(w)' ],
        ],
        options: jQuery.extend(true, {}, jarmon.Chart.BASE_OPTIONS)
    },
    'sda5_ops': {
        title: 'sda5 ops',
        data: [
            ['data/disk-sda5/disk_ops.rrd','read','ops(read)'     ],
            ['data/disk-sda5/disk_ops.rrd','write','ops(write)'   ],
        ],
        options: jQuery.extend(true, {}, jarmon.Chart.BASE_OPTIONS)
    },
    'sda5_data': {
        title: 'sda5 data',
        data: [
            ['data/disk-sda5/disk_octets.rrd','read' ,'read','bit/s', function (v) { return v*8; }    ],
            ['data/disk-sda5/disk_octets.rrd','write','write','bit/s', function (v) { return v*8; }    ],
        ],
        options: jQuery.extend(true, {}, jarmon.Chart.BASE_OPTIONS)
    },
    'lvm': {
        title: 'lvm',
        data: [
            ['data/lvm-dave-vg/df_complex-root.rrd','value','root',],
            ['data/lvm-dave-vg/df_complex-free.rrd','value','free',],
            ['data/lvm-dave-vg/df_complex-swap_1.rrd','value','swap']
        ],
        options: jQuery.extend(true, {}, jarmon.Chart.BASE_OPTIONS)
    },
    'eth0': {
        title: 'eth0 Throughput',
        data: [
            ['data/interface-eth0/if_errors.rrd', 'tx', 'Err (tx)', ''],
            ['data/interface-eth0/if_errors.rrd', 'rx', 'Err (rx)', ''],
            ['data/interface-eth0/if_packets.rrd', 'rx', 'Receive', 'pkt/s'],
            ['data/interface-eth0/if_packets.rrd', 'tx', 'Transmit', 'pkt/s']
        ],
        options: jQuery.extend(true, {}, jarmon.Chart.BASE_OPTIONS)
    },
    'eth1': {
        title: 'eth1 Throughput',
        data: [
            ['data/interface-eth1/if_errors.rrd', 'tx', 'Err (tx)', ''],
            ['data/interface-eth1/if_errors.rrd', 'rx', 'Err (rx)', ''],
            ['data/interface-eth1/if_packets.rrd', 'rx', 'Receive', 'pkt/s'],
            ['data/interface-eth1/if_packets.rrd', 'tx', 'Transmit', 'pkt/s']
        ],
        options: jQuery.extend(true, {}, jarmon.Chart.BASE_OPTIONS)
    },
    'lo': {
        title: 'lo Throughput',
        data: [
            ['data/interface-lo/if_errors.rrd', 'tx', 'Err (tx)', ''],
            ['data/interface-lo/if_errors.rrd', 'rx', 'Err (rx)', ''],
            ['data/interface-lo/if_packets.rrd', 'rx', 'Receive', 'pkt/s'],
            ['data/interface-lo/if_packets.rrd', 'tx', 'Transmit', 'pkt/s'],
            ['data/interface-lo/if_octets.rrd', 'tx', 'lo tx', 'bit/s', function (v) { return v*8; }],
            ['data/interface-lo/if_octets.rrd', 'rx', 'lo rx', 'bit/s', function (v) { return v*8; }]
        ],
        options: jQuery.extend(true, {}, jarmon.Chart.BASE_OPTIONS)
    },
    'data': {
        title: 'Data Throughput',
        data: [
            ['data/interface-eth0/if_octets.rrd', 'tx', 'eth0 tx', 'bit/s', function (v) { return v*8; }],
            ['data/interface-eth0/if_octets.rrd', 'rx', 'eth0 rx', 'bit/s', function (v) { return v*8; }],
            ['data/interface-eth1/if_octets.rrd', 'tx', 'eth1 tx', 'bit/s', function (v) { return v*8; }],
            ['data/interface-eth1/if_octets.rrd', 'rx', 'eth1 rx', 'bit/s', function (v) { return v*8; }]
        ],
        options: jQuery.extend(true, {}, jarmon.Chart.BASE_OPTIONS)
    },
    'all_process': {
        title: 'All process',
        data: [
            ['data/processes-name/ps_code.rrd','value','code',''],
            ['data/processes-name/ps_stacksize.rrd', 'value','stack',''],
            ['data/processes-name/ps_pagefaults.rrd','minflt','faults',''],
            ['data/processes-name/ps_pagefaults.rrd','majflt','faults',''],
            ['data/processes-name/ps_data.rrd'     , 'value','data'],
            ['data/processes-name/ps_rss.rrd'      , 'value','rss'],
            ['data/processes-name/ps_vm.rrd'       , 'value','vm'],
            ['data/processes-name/ps_cputime.rrd', 'user' ,'user'],          
            ['data/processes-name/ps_cputime.rrd', 'syst' ,'syst']        
        ],
        options: jQuery.extend(true, {}, jarmon.Chart.BASE_OPTIONS)
    },
    'asterisk_all': {
        title: 'Asterisk All',
        data: [
            ['data/processes-asterisk/ps_code.rrd','value','code',''],
            ['data/processes-asterisk/ps_stacksize.rrd', 'value','stack',''],
            ['data/processes-asterisk/ps_pagefaults.rrd','minflt','faults',''],
            ['data/processes-asterisk/ps_pagefaults.rrd','majflt','faults',''],
            ['data/processes-asterisk/ps_data.rrd'     , 'value','data'],
            ['data/processes-asterisk/ps_rss.rrd'      , 'value','rss'],
            ['data/processes-asterisk/ps_vm.rrd'       , 'value','vm'],
            ['data/processes-asterisk/ps_cputime.rrd', 'user' ,'user'],          
            ['data/processes-asterisk/ps_cputime.rrd', 'syst' ,'syst']        
        ],
        options: jQuery.extend(true, {}, jarmon.Chart.BASE_OPTIONS)
    },
    'asterisk_counts': {
        title: 'Asterisk CPU',
        data: [
             ['data/processes-asterisk/ps_code.rrd','value','code',''],
             ['data/processes-asterisk/ps_stacksize.rrd', 'value','stack',''],
             ['data/processes-asterisk/ps_pagefaults.rrd','minflt','faults',''],
             ['data/processes-asterisk/ps_pagefaults.rrd','majflt','faults',''],
             ['data/processes-asterisk/ps_data.rrd'     , 'value','data'],
             ['data/processes-asterisk/ps_rss.rrd'      , 'value','rss'],
             ['data/processes-asterisk/ps_vm.rrd'       , 'value','vm'],
             ['data/processes-asterisk/ps_cputime.rrd', 'user' ,'user'],          
             ['data/processes-asterisk/ps_cputime.rrd', 'syst' ,'syst']        
        ],
        options: jQuery.extend(true, {}, jarmon.Chart.BASE_OPTIONS)
    },
    'asterisk_procs': {
        title: 'Asterisk Processes',
        data: [
             ['data/processes-asterisk/ps_count.rrd', 'processes' ,'procs'], 
             ['data/processes-asterisk/ps_count.rrd', 'threads', 'threads'],
        ],
        options: jQuery.extend(true, {}, jarmon.Chart.BASE_OPTIONS)
    },
    'asterisk_disk_ops': {
        title: 'Asterisk Disk Operations',
        data: [
             ['data/processes-asterisk/ps_disk_ops.rrd','read' , 'disk ops(r)',''],
             ['data/processes-asterisk/ps_disk_ops.rrd','write', 'disk ops(w)',''],
        ],
        options: jQuery.extend(true, {}, jarmon.Chart.BASE_OPTIONS)
    },
    'asterisk_disk_throughput': {
        title: 'Asterisk Disk Throughput',
        data: [
             ['data/processes-asterisk/ps_disk_octets.rrd', 'read' ,'read' , 'bit/s', function (v) { return v*8; }],
             ['data/processes-asterisk/ps_disk_octets.rrd', 'write','write', 'bit/s', function (v) { return v*8; }],
        ],
        options: jQuery.extend(true, {}, jarmon.Chart.BASE_OPTIONS)
    },
    'droprate': {
        title: 'Ping Droprate',
        data: [
            ['data/ping/ping_droprate-google.com.rrd', 0,
             'google.com', '%', function (v) { return v*100; }],
            ['data/ping/ping_droprate-softlayer.com.rrd', 0,
             'softlayer.com', '%', function (v) { return v*100; }]
        ],
        options: jQuery.extend(true, {}, jarmon.Chart.BASE_OPTIONS)
    }
};

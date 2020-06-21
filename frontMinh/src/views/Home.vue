<template>
    <div class="container" v-if="!loading">
        <div>
            <input type="radio" id="one" :value="true" v-model="isChart1">
            <label for="one">Device 1</label>
            <br>
            <input type="radio" id="two" :value="false" v-model="isChart1">
            <label for="two">Device 2</label>
            <br>
            <div v-if="isChart1">
                <line-chart
                        :width="500"
                        :height="300"
                        :labels="labelChartData"
                        :datasets="displayedDatasets"
                />
            </div>
            <div v-else>
                <line-chart
                        :width="500"
                        :height="300"
                        :labels="labelChartData2"
                        :datasets="displayedDatasets2"
                />
            </div>
        </div>
        <Dashboard />
    </div>

</template>

<script>
    import LineChart from './LineChart';
    import Dashboard from "./Dashboard.vue";

    export default {
        components: {
            LineChart,
            Dashboard

        },
        name: 'Home',
        data() {
            return {
                isChart1: true,
                listWeatherData: null,
                chartInfo: null,
                loading: true,
                selectedDevs: ['dev01_temp', 'dev01_humi'],
                labelChartData: [],
                datasets: {
                    'dev01_temp': {
                        label: 'dev01_temp',
                        borderColor: 'rgba(50, 115, 220, 0.5)',
                        backgroundColor: 'rgba(50, 115, 220, 0.1)',
                        data: []
                    },
                    'dev01_humi': {
                        label: 'dev01_humi',
                        borderColor: 'rgba(255, 56, 96, 0.5)',
                        backgroundColor: 'rgba(255, 56, 96, 0.1)',
                        data: []
                    }
                },
                selectedDevs2: ['dev02_temp', 'dev02_humi'],
                labelChartData2: [],
                datasets2: {
                    'dev02_temp': {
                        label: 'dev02_temp',
                        borderColor: 'rgba(244, 160, 0, 0.5)',
                        backgroundColor: 'rgba(244, 160, 0, 0.1)',
                        data: []
                    },
                    'dev02_humi': {
                        label: 'dev02_humi',
                        borderColor: 'rgba(0, 56, 96, 0.5)',
                        backgroundColor: 'rgba(0, 56, 96, 0.1)',
                        data: []
                    }
                }
            };
        },
        async created() {
            // const result = await this.$axios.get(
            //     this.$apiURL + "/get_init_weather_data",
            // );
            // if (result.data) {
            //     this.listWeatherData = result.data;
            //     console.log(result.data);
            // }
            const resultChartInfo = await this.$axios.get(
                this.$apiURL + "/get_chart_info",
            );
            if (resultChartInfo.data) {
                this.chartInfo = resultChartInfo.data;
            }
            this.fetchChartData(this.chartInfo);
            this.loading = false;
        },
        methods: {
            fetchChartData: function (chartInfo) {
                for (let i = 0; i < chartInfo.length; i++) {
                    if (chartInfo[i].dev_id === "device01") {
                        this.datasets.dev01_temp.data.push(chartInfo[i].temp_avg);
                        this.datasets.dev01_humi.data.push(chartInfo[i].humidity_avg);
                        this.labelChartData.push(this.$moment(chartInfo[i].date_x).format('YYYY-MM-DD'));
                    }
                    if (chartInfo[i].dev_id === "device02") {
                        this.datasets2.dev02_temp.data.push(chartInfo[i].temp_avg);
                        this.datasets2.dev02_humi.data.push(chartInfo[i].humidity_avg);
                        this.labelChartData2.push(this.$moment(chartInfo[i].date_x).format('YYYY-MM-DD'));
                    }
                }
            }
        },
        sockets: {
            connect: function () {
                console.log('socket connected')
            },
            customEmit: function (data) {
                console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)' + data)
            }

        },
        computed: {
            displayedDatasets() {
                return this.selectedDevs.map(dev => this.datasets[dev]);
            },
            displayedDatasets2() {
                return this.selectedDevs2.map(dev => this.datasets2[dev]);
            }
        }
    }
</script>
<style>
    h4 {
        font-family: "Roboto";
        font-weight: 500;
        font-size: 14px;
        color: #aeaeae;
        text-transform: uppercase;
        margin: 0;
    }

    hr {
        margin-bottom: 16px;
        border: 1px solid #eaeaea;
    }

    .border-card {
        background: #fff;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        font-family: "Roboto",serif;
        font-size: 14px;
        padding: 12px 16px;
        cursor: pointer;
        border-radius: 4px;
        border: 1px solid #eaeaea;
        box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.1);
        transition: all 0.25s ease;
    }

    .border-card:hover {
        -webkit-transform: translateY(-1px);
        transform: translateY(-1px);
        box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1), 0 5px 10px 0 rgba(0, 0, 0, 0.1);
    }

    .border-card.over {
        background: rgba(70, 222, 151, 0.15);
        padding-top: 24px;
        padding-bottom: 24px;
        border: 2px solid #47DE97;
        box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0), 0 5px 10px 0 rgba(0, 0, 0, 0);
    }

    .border-card.over .card-type-icon {
        color: #47DE97 !important;
    }

    .border-card.over p {
        color: #47DE97 !important;
    }

    .content-wrapper {
        display: flex;
        justify-content: flex-start;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        transition: all 0.25s ease;
    }

    .min-gap {
        flex: 0 0 40px;
    }

    .card-type-icon {
        flex-grow: 0;
        flex-shrink: 0;
        margin-right: 16px;
        font-weight: 400;
        color: #323232;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 14px;
        transition: all 0.25s ease;
    }

    .card-type-icon.with-border {
        color: #aeaeae;
        border: 1px solid #eaeaea;
    }

    .card-type-icon i {
        line-height: 40px;
    }

    .label-group {
        white-space: nowrap;
        overflow: hidden;
    }

    .label-group.fixed {
        flex-shrink: 0;
    }

    .label-group p {
        margin: 0px;
        line-height: 21px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .label-group p.title {
        color: #323232;
        font-weight: 500;
    }

    .label-group p.title.cta {
        text-transform: uppercase;
    }

    .label-group p.caption {
        font-weight: 400;
        color: #aeaeae;
    }

    .end-icon {
        margin-left: 16px;
    }
</style>

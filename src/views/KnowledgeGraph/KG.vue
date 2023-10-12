<template>
    <div class="vis_container">
        <div id="map" class="map_container"></div>
        <div class="float_container">
            <svg id="KG"></svg>
        </div>
        <nodeInfo_siderBar :nodeInfo="nodeInfo" @childFun="childResFun"></nodeInfo_siderBar>
    </div>
</template>

<script lang="ts" setup>
import $, { map } from 'jquery'
import * as d3 from 'd3'
import 'ol/ol.css'
import axios from 'axios'
import { reactive, nextTick, ref, onMounted } from 'vue'
import { Map, View, Overlay } from 'ol'
import { Tile, Image } from 'ol/layer'
import { BingMaps, ImageCanvas } from 'ol/source'
import { defaults } from 'ol/control'
import AmapLoader from '@amap/amap-jsapi-loader'
import { shallowRef } from '@vue/reactivity'
import nodeInfo_siderBar from './nodeInfo_sideBar.vue'

const nodeInfo: any = ref(null);
const path = ref([]);
const current_position = ref([]);
const childResFun = (val: any) => {
    console.log(val);
};

function init_GDmap() {
    AmapLoader.load({
        key:"a4d64ee73568c1885a77e32d91d2e89b",
        version:"",
        plugins:[''],
    }).then((AMap)=>{
        const map = new AMap.Map("map", {
            viewMode: "3D",
            zoom: 6,
            center: [117.3, 34.3]
        });

        // 单击
        map.on('click',(e) => {
            // lng ==> 经度值  lat => 维度值
            current_position.value = [e.lnglat.lng,e.lnglat.lat];
            path.value.push([e.lnglat.lng,e.lnglat.lat]);
            console.log(path.value);
        });

        // 缩放
        map.on('zoomstart', () => {
            KGclear();
        })
        map.on('zoomend', () => {
            KGRender(map, AMap);
        })

        // 平移
        map.on('movestart', () => {
            KGclear();
        })
        map.on('moveend', () => {
            KGRender(map, AMap);
        })

        addCustomlayer(map, AMap);
        KGRender(map, AMap);
    }).catch(e=>{
        console.log(e);
    });
};

function addCustomlayer(map, AMap) {
    // 获取 canvas 实例
    var svg0: any = document.createElement('svg');
    // 将 canvas 宽高设置为地图实例的宽高
    svg0.style.width = map.getSize().width + 'px';
    svg0.style.height = map.getSize().height + 'px';
    svg0.id = "layer_knowledge_graph";
    // 创建一个自定义图层
    var customLayer = new AMap.CustomLayer(svg0, {
        zIndex: 100,
        zooms: [3, 18] // 设置可见级别，[最小级别，最大级别]
    });
    map.add(customLayer);
    // customLayer.render = KGRender(map, svg0);
};

function KGclear() {
    var svg:any = document.getElementById('KG');
    svg = d3.select(svg);
    d3.selectAll('g').remove();
};

function KGRender(map, AMap) {
    const zoom = map.getZoom();
    const extent = [map.getBounds().path[0], map.getBounds().path[2]];

    var svg:any = document.getElementById('KG');
    const width = document.getElementById('KG').clientWidth;
    const height = document.getElementById('KG').clientHeight;
    // svg.style.width = map.getSize().width + 'px';
    // svg.style.height = map.getSize().height + 'px';
    // const width = map.getSize().width, height = map.getSize().height;

    const strokeWidth = 1.5;
    // const colors = d3.scaleOrdinal(d3.schemeCategory10);
    const colors = {
        'user': '#d62728',
        'mblog': '#2ca02c',
        'location': '#ff7f0e',
        'Upload': '#9467bd',
        'Post In': '#1f77b4',
        'Include': '#8c564b'
    };
    // const label = ['餐饮企业', '行业类型_小类', '行业类型_中类', '行业类型_大类', '所属区'];
    // const sizes = [7, 14, 17, 20, 23];
    
    var svg = d3.select(svg);
    axios.post('/api/get_KG_data/', {
        zoom: zoom,
        extent: extent,
        // onDownloadProgress(progressEvent) {
        //     // 监听下载进度
        //     if (progressEvent.lengthComputable) {   //是否存在进度
        //         var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );                console.log('进度：',percentCompleted);
        //         this.$forceUpdate();
        //     }
        // }
    }).then(function(ret){      //通过后端服务器获取json字典数据，url为请求地址
    // d3.json("public/graph.json").then(function(data) {      //通过本地json文件获取数据，path为文件路径
        console.log('zoom: ' + map.getZoom())
        console.log('center: ' + map.getCenter())
        console.log('status: ' + ret.data['status'])
        console.log('mblog_count: ' + ret.data['mblog_count'])
        let graph = ret.data['KG_json'];
        const simulation = d3.forceSimulation(graph.nodes)
            // .force("x", d3.forceX(width / 2).strength(1))
            // .force("y", d3.forceY(height / 2).strength(1))
            .force("collide", d3.forceCollide(d => d.radius * 1.2).strength(1))
            .force("charge", d3.forceManyBody().strength(-30))
            .force("link", d3.forceLink(graph.links).id(function(d) {return d.id; }).distance(50).strength(1))
            .force("radial", d3.forceRadial().radius(200).x(width / 2).y(height / 2))
            .on("tick", ticked);

        const link = svg.append("g")
            .selectAll("g")
            .data(graph.links)
            .enter()
            .append("line")
            .attr("stroke", d => colors[d.relation])
            .attr("stroke-width", strokeWidth)

        const node = svg.append("g")
            .selectAll("g")
            .data(graph.nodes)
            .enter()
            .append("circle")
            .attr("id", function(d) { return d.id; })
            .attr("r", 5)
            .attr("fill", function(d) { return colors[d.label]; })
            .attr("pointer-events", "all")
            .on('click', function(circle, node) {
                console.log(node);
                nodeInfo.value = Object.entries(node).map(([key, value]) => ({'key': [key], 'value': value}));;
            });

        node.call(
            d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended)
        );
        // node.append("text")
        //     .text(function(d) {
        //     return d.id;
        //     })
        //     .attr('x', 6)
        //     .attr('y', 3).style('fill', 'white');

        // node.append("title")
        //     .text(function(d) { return d.label; });

        function ticked() {
            node.call(updateNode);
            link.call(updateLink);
        }

        function fixna(x) {
            if (isFinite(x)) return x;
            return 0;
        }

        function updateLink(link) {
            link.attr("x1", function(d) { return fixna(d.source.x); })
                .attr("y1", function(d) { return fixna(d.source.y); })
                .attr("x2", function(d) { return fixna(d.target.x); })
                .attr("y2", function(d) { return fixna(d.target.y); });
        }

        function updateNode(node) {
            // node.attr("transform", function(d) {
            //     return "translate(" + fixna(d.x) + "," + fixna(d.y) + ")";
            // })
            node.attr("cx", function(d) {
                    if(d.label == "location"){
                        var lnglat = new AMap.LngLat(d.lon, d.lat);
                        var pixel = map.lngLatToContainer(lnglat);
                        d.fx = pixel.x;
                        //d.fx = d.经度;
                        //console.log(d.fx);
                    }
                    return d.x;
                })
                .attr("cy", function(d) {
                    if(d.label == "location"){
                        var lnglat = new AMap.LngLat(d.lon, d.lat);
                        var pixel = map.lngLatToContainer(lnglat);
                        d.fy = pixel.y;
                        //d.fy = d.纬度;
                        //console.log(d.fy);
                    }
                    return d.y;
                });
        }

        function dragstarted(event, d) {
            event.sourceEvent.stopPropagation();
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }
    });
}

onMounted(() => {
    init_GDmap();
})
</script>

<style lang="scss" scoped>
.vis_container {
 margin: 0;
 padding: 0;
 overflow: hidden;
}

.map_container {
    position: absolute;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
    // border: 1px solid #eee
}
.float_container {
    position: absolute;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
    pointer-events:none;
    // z-index: 12;
}

#KG {
    width: 100%;
    height: 100vh;
}

circle {
    pointer-events: all;
}
</style>
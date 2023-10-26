<template>
    <div class="vis_container">
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
const childResFun = (val: any) => {
    console.log(val);
};

function KGclear() {
    var svg:any = document.getElementById('KG');
    svg = d3.select(svg);
    d3.selectAll('g').remove();
};

function KGRender() {
    var svg:any = document.getElementById('KG');
    const width = document.getElementById('KG').clientWidth;
    const height = document.getElementById('KG').clientHeight;

    const strokeWidth = 1.5
    // const colors = d3.scaleOrdinal(d3.schemeCategory10);
    const colors = {
        'user': '#d62728',
        'mblog': '#2ca02c',
        'location': '#ff7f0e',
        'Upload': '#9467bd',
        'Post In': '#1f77b4',
        'Include': '#8c564b'
    };
    
    var svg = d3.select(svg);
    axios.get('/api/get_KG_data/').then(function(ret){      //通过后端服务器获取json字典数据，url为请求地址
    // d3.json("public/graph.json").then(function(data) {      //通过本地json文件获取数据，path为文件路径
        let graph = ret.data['KG_json'];
        const simulation = d3.forceSimulation(graph.nodes)
            // .force("x", d3.forceX(width / 2).strength(1))
            // .force("y", d3.forceY(height / 2).strength(1))
            .force("collide", d3.forceCollide(d => d.radius * 1.5).strength(1))
            .force("charge", d3.forceManyBody().strength(-20))
            .force("link", d3.forceLink(graph.links).id(function(d) {return d.id; }).distance(50).strength(1))
            .force("radial", d3.forceRadial().radius(100).x(width / 2).y(height / 2))
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
                nodeInfo.value = Object.entries(node).map(([key, value]) => ({'key': [key], 'value': value}));
            });

        node.call(
            d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended)
        );

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
            node.attr("cx", function(d) {
                    return d.x;
                })
                .attr("cy", function(d) {
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
    KGclear();
    KGRender();
})
</script>

<style lang="scss" scoped>
.vis_container {
 margin: 0;
 padding: 0;
 overflow: hidden;
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
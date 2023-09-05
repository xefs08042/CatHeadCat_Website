<template>
    <div id="map" class="map_container">
    </div>
</template>

<script lang="ts" setup>
import $ from 'jquery'
import * as d3 from 'd3'
import 'ol/ol.css'
import { reactive, nextTick, ref, onMounted } from 'vue'
import { Map, View, Overlay } from 'ol'
import { Tile, Image } from 'ol/layer'
import { BingMaps, ImageCanvas } from 'ol/source'
import { defaults } from 'ol/control'

import AmapLoader from '@amap/amap-jsapi-loader'
import { shallowRef } from '@vue/reactivity'

let map = ref(null)
// const map = shallowRef(null);
const path = ref([]);
const current_position = ref([]);

function initMap() {
    // 地图实例
    map.value = new Map({
        target: 'map',
        layers: [
            new Tile({
                source: new BingMaps({
                    key: 'AhInAsi2LTv3c9rDMPP211xvhR0-ydMxPu2vLt5HFtOIx5JlPbdqg58b3JmTwZwQ',    // 可以自行到Bing Map官网申请key
                    imagerySet: 'RoadOnDemand',  // Aerial, Road, AerialWithLabels
                    placeholderTiles: false
                })
            })
        ],
        view: new View({
            projection: 'EPSG:4326',
            center: [114, 22],
            zoom: 12
        }),
        controls: defaults({
            zoom: false,
            rotate: false,
            attribution: false
        })
    }); 
    console.log(map.value.getView().getCenter());
};

function mapAddImageCanvas() {
    //为ImageCanvasLayer创建数据源  
    var imageCanvas = new ImageCanvas({
        //ImageCanvas有一个canvasFunction属性，该属性其实是一个回调函数，需要对该函数进行实现，从而创建一个canvas
        canvasFunction: (extent, resolution, pixelRatio, size, projection) => {
            var canvas = document.createElement('canvas');
            console.log(typeof(canvas));
            //size是ImageCanvas的size，单位是px
            canvas.width = size[0];
            canvas.height = size[1];
            // var context = canvas.getContext('2d');
            // context.fillStyle = "blue";
            // context.fillRect(canvas.width/2, canvas.height/2, 300, 300);
            return canvas;
        },
    });
    var imageCanvasLayer = new Image({
        source: imageCanvas
    });
    map.value.addLayer(imageCanvasLayer);   

};

function mapAddImageCanvas2() {
    //1.创建一个canvas对象
    var canvasOption: any = new Object();
    canvasOption.ratio = 1;//参考api，ratio设置为1时，canvas的画布整体大小为初始化时map所对应的窗口。
    var isFirst = true;
    var multipolygon;//这里是你的multipolygon对象，也就是要切割的行政区划边界
    canvasOption.canvasFunction = function (extent, resolution, pixelRatio, size, projection) {
        if (isFirst)//这里必须要做一个判断，每次的范围变动都会引起重绘，从而触发该回调函数，不判断的话，将会导致canvas无法被绘制到地图上，出现闪现的情况
        {
            isFirst = false;
            var canvas = document.createElement('canvas');
            canvas.width = size[0];
            canvas.height = size[1];
            var context = canvas.getContext('2d');
            context.fillStyle = "blue";
            context.fillRect(0,0,1000,1000);

            var data = {
                nodes: [
                    {id: 1, name: 'javascript', color: 'pink'},
                    {id: 2, name: 'java', color: 'green'},
                    {id: 3, name: 'c++', color: 'blue'},
                    {id: 4, name: 'python', color: 'grey'},
                    {id: 5, name: 'php', color: 'red'}
                ],
                edges: [
                    {source: 1, target: 3},
                    {source: 2, target: 4},
                    {source: 3, target: 5},
                    {source: 4, target: 5}
                ],
                graph: null,
                width: 1300,
                height: 600,
                strength: -20,
                link_distance: 30,
                canvas: canvas,
                e: null
            }
            return canvas;
        }
    };
    //为ImageCanvasLayer创建数据源
    var imageCanvas = new ImageCanvas(canvasOption);
    //创建一个ImageCanvasLayer图层
    var imageCanvasLayer = new Image({
        source: imageCanvas
    });
    map.value.addLayer(imageCanvasLayer);
}

function mapAddOverlay() {
    var elementDiv = document.createElement("div");
    elementDiv.className = "layer_knowledge_graph";
    elementDiv.innerHTML = `
        <div id='layer_knowledge_graph'></div>
    `;
    console.log(map.value.getSize());
    // elementDiv.style.height = map.value.getSize()[1] + 'px';
    // elementDiv.style.width = map.value.getSize()[0] + 'px';
    elementDiv.style.height = '200px';
    elementDiv.style.width = '200px';
    const overlay = new Overlay({
        position: map.value.getView().getCenter(),
        positioning: 'center-center',
        element: elementDiv,
    });
    map.value.addOverlay(overlay);
    map.value.on('moveend', function (event) {
        overlay.setPosition(map.value.getView().getCenter());
        console.log(map.value.getView().getCenter());
    });
}

function init_GDmap() {
    AmapLoader.load({
        key:"a4d64ee73568c1885a77e32d91d2e89b",
        version:"",
        plugins:[''],
    }).then((AMap)=>{
        const map = new AMap.Map("map", {
            viewMode:"2D",
            zoom:5,
            center:[105, 37]
        });
        // 添加插件
        AMap.plugin(["AMap.ToolBar", "AMap.Scale", "AMap.HawkEye","AMap.Geolocation","AMap.MapType","AMap.MouseTool"], function () {
            //异步同时加载多个插件
            // 添加地图插件
            map.addControl(new AMap.ToolBar()); // 工具条控件;范围选择控件
            map.addControl(new AMap.Scale()); // 显示当前地图中心的比例尺
            map.addControl(new AMap.HawkEye()); // 显示缩略图
            map.addControl(new AMap.Geolocation()); // 定位当前位置
            map.addControl(new AMap.MapType()); // 实现默认图层与卫星图,实时交通图层之间切换
 
            // 以下是鼠标工具插件
            const mouseTool = new AMap.MouseTool(map);
            // mouseTool.rule();// 用户手动绘制折线图,测量距离
            mouseTool.measureArea(); // 测量面积
        });
        // 单击
        map.on('click',(e) => {
            // lng ==> 经度值  lat => 维度值
            current_position.value = [e.lnglat.lng,e.lnglat.lat];
            path.value.push([e.lnglat.lng,e.lnglat.lat]);
            // addMarker();
            // addPolyLine();
            // KGrender();
        })

        // 获取 canvas 实例
        var svg0: any = document.createElement('svg');
        // 将 canvas 宽高设置为地图实例的宽高
        svg0.style.width = map.getSize().width + 'px';
        svg0.style.height = map.getSize().height + 'px';
        svg0.id = "layer_knowledge_graph";
    
        // 创建一个自定义图层
        var customLayer = new AMap.CustomLayer(svg0, {
            zIndex: 12,
            zooms: [3, 18] // 设置可见级别，[最小级别，最大级别]
        });
        map.add(customLayer);
        // customLayer.render = KGrender;

        // 将d3.js力导向图渲染至customLayer
        function KGrender() {
            svg0.style.width = map.getSize().width + 'px';
            svg0.style.height = map.getSize().height + 'px';
            console.log(svg0.width);

            var g = d3.selectAll('g');
            g.remove();
    
            var svg = d3.select(svg0),
                width = map.getSize().width,
                height = map.getSize().height;
            
            var names = ['餐饮企业', '行业类型_小类', '行业类型_中类', '行业类型_大类', '所属区']
            var colors = ['#00d2d3', '#f1c40f', '#e67e22', '#e74c3c', '#3498db'];
            var sizes = [7, 14, 17, 20, 23];

            //var zoom = map.getZoom();
            var ll = new AMap.LngLat(117.3, 34.3);
                // if (zoom >= 10){
                //     ll = map.getCenter();
                // }
            var pix = map.lngLatToContainer(ll);

            // 存之后生成的关系图数据
            var graph;
            d3.json("public/graph.json", function(error, data) {
                if (error) throw error;
    
                graph = data;
                // console.log(graph)

                // 定义D3的simulation是如何展示出来的
                var simulation = d3.forceSimulation(graph.nodes)
                    .force('link', d3.forceLink().id(d => d.id).distance(-300).strength(10).iterations(50))
                    .force("charge", d3.forceManyBody().strength(0.9).distanceMin(30).distanceMax(3))
                    .force("center", d3.forceCenter(pix.x, pix.y)
                );
                simulation.alphaDecay(0.25);
    
                // D3数据驱动文档
                // 用links去驱动line的线宽
                var link = svg.append('g')
                    .attr("class", "links")
                    .selectAll("line")
                    .attr("class", "active")
                    .data(graph.links)
                    .enter().append("line")
                    .style('stroke', '#3498db')
                    .attr('stroke-width', function(d){
                    return 1;
                    // return sizes[d.group-1];
                    });
    
                //边上的文字（实体之间的关系）
                // var linktext = svg.append('g')
                //     .attr("class", "linetexts")
                //     .selectAll("text")
                //     .attr("class", "")
                //     .data(graph.links)
                //     .enter()
                //     .append("text")
                //     .style("display","block")
                //     .style("color","red")
                //     .text(function(d){
                //         return d.relation;
                //     });
    
                // 添加所有的node
                var node = svg.append('g')
                    .attr('class', 'nodes')
                    .selectAll('circle')
                    .attr("class", "")
                    .data(graph.nodes)
                    .enter().append('circle')
                    .attr("r", function(d) {
                        return sizes[d.group-1]
                    })
                    .attr('fill', function(d){ // 填充的颜色
                        return colors[d.group-1];
                    })
                    .attr('stroke', 'none')    // 没有描边
                    .attr('id', function(d){
                        return d.id
                    })
                    .attr('name', function(d){
                        if (d.名称)
                            return d.名称;
                        else if (d.行业类型_小类)
                            return d.行业类型_小类;
                        else if (d.行业类型_中类)
                            return d.行业类型_中类;
                        else if (d.行业类型_大类)
                            return d.行业类型_大类;
                        else if (d.所属区)
                            return d.所属区;
                        else
                            return d.id
                    })
                    .call(d3.drag()             // 绑定d3的拖动函数
                        .on("start", dragstarted) // 拖动开始
                        .on("drag", dragged)      // 拖动进行
                        .on("end", dragended));   // 拖动结束
    
                // 文本
                // 两种显示模式，每个结点可以用一个圆或者文本表示
                // var text = svg.append('g')
                //     .attr("class", "texts")
                //     .selectAll("text")
                //     .attr("class", "")
                //     .data(graph.nodes)
                //     .enter().append("text")
                //     .attr("font-size", function(d) {
                //         return sizes[d.group-1]*1.5
                //     })
                //     .attr("fill", function(d) {
                //         return colors[d.group-1];
                //     })
                //     .attr('id', function(d){
                //         return d.id
                //     })
                //     .attr('name', function(d) {
                //         if (d.名称)
                //             return d.名称;
                //         else if (d.行业类型_小类)
                //             return d.行业类型_小类;
                //         else if (d.行业类型_中类)
                //             return d.行业类型_中类;
                //         else if (d.行业类型_大类)
                //             return d.行业类型_大类;
                //         else if (d.所属区)
                //             return d.所属区;
                //         else
                //             return d.id
                //     })
                //     .text(function(d) {
                //         if (d.名称)
                //             return d.名称;
                //         else if (d.行业类型_小类)
                //             return d.行业类型_小类;
                //         else if (d.行业类型_中类)
                //             return d.行业类型_中类;
                //         else if (d.行业类型_大类)
                //             return d.行业类型_大类;
                //         else if (d.所属区)
                //             return d.所属区;
                //         else
                //             return d.id
                //     })
                //     .attr('text-anchor', 'middle')
                //     .call(d3.drag()
                //         .on("start", dragstarted)
                //         .on("drag", dragged)
                //         .on("end", dragended));
    
                // 给node加title, 当鼠标悬浮在圆圈上的时候
                node.append('title').text(function(d){
                    if (d.名称)
                        return d.名称;
                    else if (d.行业类型_小类)
                        return d.行业类型_小类;
                    else if (d.行业类型_中类)
                        return d.行业类型_中类;
                    else if (d.行业类型_大类)
                        return d.行业类型_大类;
                    else if (d.所属区)
                        return d.所属区;
                    else
                        return d.id
                });

                simulation
                    .nodes(graph.nodes)
                    .on("tick", ticked);
    
                simulation.force("link")
                    .links(graph.links);
    
                function ticked() {
                    link
                        .attr("x1", function(d) {
                            return d.source.x;
                        })
                        .attr("y1", function(d) {
                            return d.source.y;
                        })
                        .attr("x2", function(d) {
                            return d.target.x;
                        })
                        .attr("y2", function(d) {
                            return d.target.y;
                        });
    
                    // linktext.attr("dx",function(d){ return (d.source.x + d.target.x) / 2 ; });
                    // linktext.attr("dy",function(d){ return (d.source.y + d.target.y) / 2 ; });
    
                    node
                        .attr("cx", function(d) {
                            if(d.label == "餐饮企业"){
                                var lnglat = new AMap.LngLat(d.经度, d.纬度);
                                var pixel = map.lngLatToContainer(lnglat);
                                d.fx = pixel.x;
                            }
                            return d.x;
                        })
                        .attr("cy", function(d) {
                            if(d.label == "餐饮企业"){
                                var lnglat = new AMap.LngLat(d.经度, d.纬度);
                                var pixel = map.lngLatToContainer(lnglat);
                                d.fy = pixel.y;
                            }
                            return d.y;
                        });
    
                    // text
                    //     .attr("dx", function(d) {
                    //         return d.x;
                    //     })
                    //     .attr("dy", function(d) {
                    //         return d.y;
                    //     });
                }    
                            // 拖动事件函数
                var dragging = false;
        
                function dragstarted(d) {
                    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
                    d.fx = d.x;
                    d.fy = d.y;
                    dragging = true;
                };

                function dragged(d) {
                    d.fx = d3.event.x;
                    d.fy = d3.event.y;
                };

                function dragended(d) {
                    if (!d3.event.active) simulation.alphaTarget(0);
                    d.fx = null;
                    d.fy = null;
                    dragging = false;
                };               
            });

        }
    }).catch(e=>{
        console.log(e);
    });
}

onMounted(() => {
    // initMap();
    // mapAddImageCanvas();
    // mapAddImageCanvas2();
    init_GDmap();
})
</script>

<style lang="scss" scoped>
.map_container {
    width: 100%;
    height: 100vh;
    border: 1px solid #eee
}
</style>
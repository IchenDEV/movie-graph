<template>
  <div class="simple-pack-chart">
    <svg ref="chartRef"/>
  </div>
</template>

<script>
import * as d3  from 'd3'
export default {
  name: "CommunityGraph",
  props: ['data'],
  watch: {
    data(newone,oldone){
      if(newone!==null){
        this.draw();
      }
    }
  },
  mounted() {
   if(this.data!==null||this.data==={}){
     this.draw();
   }
  },
  methods:{
    draw(){
      const containerWidth = this.$refs.chartRef.parentElement.offsetWidth;

      const margin = {top: 10, right: 10, bottom: 10, left: 10};
      const width = containerWidth - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;

      const chart = d3
          .select(this.$refs.chartRef)
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom);

      const g = chart
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); // 设最外包层在总图上的相对位置

      const z = d3.scaleOrdinal(d3.schemeCategory10); // 通用线条的颜色

      const root = d3
          .hierarchy(this.data) //数据分层
          .sum(function (d) {
            return d.value;
          })
          .sort(function (a, b) {
            return b.value - a.value;
          });

      const pack = d3
          .pack() // 构建打包图
          .size([width - 2, height - 2])
          .padding(3);

      pack(root);

      const node = g
          .selectAll("g") // 定位到所有圆的中点，画g
          .data(root.descendants())
          .enter()
          .append("g")
          .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
          })
          .attr("class", function (d) {
            return (
                "node" + (!d.children ? " node--leaf" : d.depth ? "" : " node--root")
            );
          })
          .style("cursor", "pointer")
          .style("fill-opacity", "0.8")
          .each(function (d) {
            d.node = this;
          })
          .on("mouseover", hovered(true))
          .on("mouseout", hovered(false));

      node
          .append("circle") // 画圈圈
          .attr("id", function (d) {
            return (
                "r" +
                Math.floor(d.r) +
                "-x" +
                Math.floor(d.x) +
                "-y" +
                Math.floor(d.y)
            ); // 用r+x+y生成唯一id，原创思路
          })
          .style("fill", function (d) {
            return z(d.depth);
          })
          .attr("r", 0)
          .transition()
          .duration(50)
          .delay(function (d, i) {
            return i * 50;
          })
          .attr("r", function (d) {
            return d.r;
          });

      const leaf = node.filter(function (d) {
        return !d.children;
      }); // 筛选出叶子节点

      leaf
          .append("clipPath") // 增加遮罩防止文字超出圆圈
          .attr("id", function (d) {
            return (
                "clip-r" +
                Math.floor(d.r) +
                "-x" +
                Math.floor(d.x) +
                "-y" +
                Math.floor(d.y)
            );
          })
          .append("use") // 大小引用圈圈的大小
          .attr("xlink:href", function (d) {
            return (
                "#r" +
                Math.floor(d.r) +
                "-x" +
                Math.floor(d.x) +
                "-y" +
                Math.floor(d.y)
            );
          });

      leaf
          .append("text") // 输出叶子文字
          .attr("clip-path", function (d) {
            return (
                "url(#clip-r" +
                Math.floor(d.r) +
                "-x" +
                Math.floor(d.x) +
                "-y" +
                Math.floor(d.y) +
                ")"
            );
          })
          .selectAll("tspan")
          .data(function (d) {
            return d.data.name;
          })
          .enter()
          .append("tspan")
          .attr("x", 0)
          .attr("y", function (d, i, nodes) {
            return 13 + (i - nodes.length / 2 - 0.5) * 12;
          })
          .text(function (d) {
            return d;
          });

      node
          .append("title") // 输出Title，mouseover显示
          .text(function (d) {
            return d.data.name + "\n" + d.value + "平方千米";
          });

      const notLeaf = node.filter(function (d) {
        return d.depth === 1;
      }); // 筛选出四大一线城市节点

      notLeaf
          .append("text") // 输出四大一线城市的名字
          .selectAll("tspan")
          .data(function (d) {
            return d.data.name;
          })
          .enter()
          .append("tspan")
          .style("fill", "#fff")
          .style("font-size", "42px")
          .attr("x", 0)
          .attr("y", function (d, i, nodes) {
            return 70 + (i - nodes.length / 2 - 0.5) * 70;
          })
          .text(function (d) {
            return d;
          });

      function hovered(hover) {
        // mouseover把所有老祖宗都圈线
        return function (d, c) {
          d3.selectAll(
              c.ancestors().map(function (d) {
                return d.node;
              })
          ).classed("node--hover", hover);
        };
      }
    }
  }
}
</script>

<style>
.simple-pack-chart .node--hover circle {
  opacity: 0.9;
}

.simple-pack-chart text {
  font: 1rem sans-serif;
  text-anchor: middle;
  fill: #ffffff;
}

</style>

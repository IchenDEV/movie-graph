<template>
  <div>
    <svg ref="chartRef"/>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  data() {
    return {
      forceSimulation: null,
      links: null,
      linksText: null,
      gs: null,
      svg: null

    }
  },
  props: ['data'],
  watch: {
    data(newone, oldone) {
      if (newone !== null && newone !== oldone)
        this.draw();

    }
  },
  mounted() {
    if (this.data)
      this.draw();

  },
  methods: {
    draw() {
      const nodes = this.data.nodes;
      const edges = this.data.relationships;
      if (this.svg) {
        this.$refs.chartRef.childNodes.forEach(i=>i.remove())
      }

      const containerWidth = this.$refs.chartRef.parentElement.offsetWidth;
      const containerHeight = this.$refs.chartRef.parentElement.offsetHeight;
      const margin = {top: 10, right: 10, bottom: 10, left: 10};
      const width = containerWidth - margin.left - margin.right;
      const height = containerHeight - margin.top - margin.bottom;
      this.svg = d3.select(this.$refs.chartRef)
          .attr("width", width)
          .attr("height", height);

      var marge = {top: 10, bottom: 10, left: 10, right: 10}
      var g = this.svg.append("g")
          .attr("transform", "translate(" + marge.top + "," + marge.left + ")");


      this.forceSimulation = d3.forceSimulation()
          .force("link", d3.forceLink().id((d) => {
            return d.id;
          }))
          .force("charge", d3.forceManyBody())
          .force("center", d3.forceCenter());

      this.forceSimulation.nodes(nodes).on("tick", this.ticked);

      this.forceSimulation.force("link").links(edges).distance((d) => {
        return 150;
      })

      this.forceSimulation.force("center")
          .x(width / 2)
          .y(height / 2);

      this.links = g.append("g")
          .selectAll("line")
          .data(edges)
          .enter()
          .append("line")
          .attr("marker-end", (d, i) => {
            return this.getMarkerArrow(i);
          })//根据箭头标记的id号标记箭头
          .style("stroke", '#9aaabf')
          .style("stroke-width", 1)//线条粗细
          .style("fill-opacity", 0)
          .attr("id", function (d, i) {
            return 'line' + i;
          })
          .style("cursor", "pointer")

      this.linksText = g.append("g")
          .selectAll("text")
          .data(edges)
          .enter()
          .append("text")
          .style("pointer-events", "none")
          .attr("class", "line-text")
          .attr('text-anchor', "middle")
          .attr("fill-opacity", 1)
          .style("cursor", "pointer")
          .attr("pointer-events", "none").attr("font-size", 9)
          .attr('xlink:href', function (d, i) {
            return '#line' + i
          })
          .text((d) => {
            return d.type;
          })


      this.gs = g.selectAll(".circleText")
          .data(nodes)
          .enter()
          .append("g")
          .attr("transform", (d, i) => {
            return "translate(" + d.x + "," + d.y + ")";
          })
          .call(d3.drag()
              .on('start', this.dragstarted)
              .on('drag', this.dragged)
              .on('end', this.dragended)
          )
          .on("click", (e, g) => {
            this.$emit("nodeClicked", g);
          })
          .attr("class", function (node, i) {
            return "g_circle_" + i;
          })//标记circle的父节点
          .style("cursor", "pointer");

      this.gs.append("circle")
          .style("stroke-width", "2px")
          .attr("class", "circle")
          .attr("r", 25)
          .attr("fill", (d, i) => {
            return this.colorScale(d.labels[0]);
          })


      this.gs.append("text")
          .attr("dy", ".35em")
          .attr("text-anchor", "middle")//在圆圈中加上数据
          .style('fill', "#FFFFFF")
          .attr("font-size", 12)
          .text((d) => {
            return d.properties.name.substr(0, 3);
          }).attr("color", "white")

    },
    colorScale(type) {
      switch (type) {
        case "have":
          return "#a3f364";
        case "role":
          return "#ffa1a1"
        case "director":
          return "#a059f3"
        case "movie":
          return "#14ffc9"
        default:
          return "#ffa306"
      }
    },
    getMarkerArrow(i) {
      this.svg.append("defs").append("marker")   //箭头
          .attr("id", "arrow" + i)
          .attr("markerUnits", "strokeWidth")//设置为strokeWidth箭头会随着线的粗细发生变化
          .attr("markerUnits", "userSpaceOnUse")
          .attr("markerWidth", 10)//标识的大小
          .attr("markerHeight", 10)
          .attr("viewBox", "0 -4 12 15")//坐标系的区域
          .attr("refX", 0)//箭头坐标
          .attr("refY", 0)
          .attr("orient", 'auto')//绘制方向，可设定为：auto（自动确认方向）和 角度值
          .append("svg:path")
          .attr("stroke-width", 1)//箭头宽度
          .attr("d", "M0,-5L10,0L0,5")//箭头的路径
          .attr('fill', 'rgba(0,0,0, 0.4)');//箭头颜色
      return "url(#arrow" + i + ")";
    },
    dragstarted(event) {
      if (!event.active) this.forceSimulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    },
    dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    },
    dragended(event) {
      if (!event.active) this.forceSimulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    },

    ticked() {
      this.links.attr("x1", (d) => {
        return d.source.x;
      })
          .attr("y1", (d) => {
            return d.source.y;
          })
          .attr("x2", (d) => {
            return d.target.x;
          })
          .attr("y2", (d) => {
            return d.target.y;
          });

      this.linksText.attr("x", (d) => {
        return (d.source.x + d.target.x) / 2;
      })
          .attr("y", (d) => {
            return (d.source.y + d.target.y) / 2;
          });

      this.gs.attr("transform", (d) => {
        return "translate(" + d.x + "," + d.y + ")";
      });
    }

  }
}
</script>
<style>
.line-text {;
  font-size: 0.6rem;
  font-weight: bold;
  fill: #9a9aa2;
}

.circle {
  outline-color: orange;
  outline-width: 1rem;
}
</style>

<template>
  <div class="simple-pack-chart">
    <svg ref="chartRef"/>
  </div>
</template>

<script>
import * as d3 from 'd3'
import d3cloud from 'd3-cloud'

export default {
  name: "CloudGraph",
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
  methods: {
    draw() {
      const containerWidth = this.$refs.chartRef.parentElement.offsetWidth
      let chart = d3.select(this.$refs.chartRef)

      let fill = d3.scaleOrdinal(d3.schemeCategory10) // 定义颜色

      let words = this.data.map(item => {
        // 处理原始数据
        return {
          text: item.name,
          size: 10 + item.value * 8,
          href: item.href
        }
      })

      let layout = d3cloud() // 构建云图
          .size([500, 500])
          .words(words)
          .padding(5)
          .rotate(function () {
            return ~~(Math.random() * 2) * 90
          })
          .font('Impact')
          .fontSize(function (d) {
            return d.size
          })
          .on('end', draw)

      layout.start()

      function draw(words) {
        // 输出所有标签
        let g = chart
            .attr('width', containerWidth)
            .attr('height', layout.size()[1])
            .append('g')
            .attr(
                'transform',
                'translate(' + containerWidth / 2 + ',' + layout.size()[1] / 2 + ')'
            )

        g.selectAll('text')
            .data(words)
            .enter()
            .append('text')
            .on('click', function (d) {
              window.open(d.href)
            })
            .style('font-family', 'Impact')
            .style('cursor', 'pointer')
            .style('fill', function (d, i) {
              return fill(i)
            })
            .attr('text-anchor', 'middle')
            .attr('transform', function (d) {
              return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')'
            })
            .style('font-size', function (d) {
              return d.size + 'px'
            })
            .text(function (d) {
              return d.text
            })
            .append('title')
            .text(function (d) {
              return d.href
            })

        g.selectAll('text') // 创建动画
            .style('fill-opacity', 0)
            .transition()
            .duration(200)
            .delay(function (d, i) {
              return i * 200
            })
            .style('fill-opacity', 1)
      }
    }
  }
}
</script>

<style scoped>

</style>
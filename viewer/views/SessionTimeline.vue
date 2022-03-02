<script>
import { useOTLPData } from '../use/otlp-local-storage';
import { DataSet, Timeline } from "vis-timeline/standalone";

export default {
  props: {
    sessionId: String
  },
  mounted() {
    const storedData = useOTLPData(this.sessionId);

    var data = storedData.spans.map( (s, index) => {
      return {
        id: s.spanId,
        className: s.name,
        content: s.name,
        start: s.startTimeUnixNano / 1e6,
        end: s.endTimeUnixNano / 1e6,
        title: `${s.name} - ${(s.startTimeUnixNano / 1e6).toFixed(1)} - ${(s.endTimeUnixNano / 1e6 - s.startTimeUnixNano / 1e6).toFixed(1)}ms`,
      }
    });

    let logId = 0
    data = data.concat(storedData.logs.map(log => {
        return {
            id: logId++,
            content: log.attributes.find(a => a.key === 'event.name').value.stringValue,
            start: log.timeUnixNano / 1e6,
            type: 'point'
      }
    }))
  
    data.sort( (a, b) => {
      return a.start - b.start;
    })

    data.forEach( (item, index) => {
      item.group = index
    })

    function findLastEvent() {
      const arr = JSON.parse(JSON.stringify(data));
      arr.sort( (a, b) => {
        return b.end - a.end
      })
      return arr[0];
    }

    // Configuration for the Timeline
    var options = {
      verticalScroll: true,
      start: data[0].start,
      end: findLastEvent().end,
      zoomKey: 'shiftKey',
      groupOrder: function (a, b) {
        return a.id - b.id;
      },
    };

    var groups = new DataSet();
    data.forEach( (span, index) => {  
      groups.add({
        id: index, 
        content: span.content
      });
    });

    // Create a Timeline
    var timeline = new Timeline(this.$refs.container);
    timeline.setOptions(options);
    timeline.setGroups(groups);
    timeline.setItems(new DataSet(data));
  }
}
</script>

<template>
  Hold SHIFT to zoom
  <div ref="container"></div>
</template>

<style>
  .documentFetch, .documentLoad {
    color: white;
    background-color: blue;
    border-color: blue;
  }
  .resourceFetch {
    color: white;
    background-color: green;
    border-color: green;
  }
</style>
<script>
import { useOTLPData } from '../use/otlp-local-storage';
import { DataSet, Timeline } from "vis-timeline/standalone";

let timeline;
let sessionStart, sessionEnd;

export default {
  props: {
    sessionId: String
  },
  data() {
    return {
      spans: true,
      logs: true
    }
  },
  mounted() {
    timeline = new Timeline(this.$refs.container);
    var options = {
      verticalScroll: true,
      zoomKey: 'shiftKey',
      groupOrder: function (a, b) {
        return a.id - b.id;
      },
    };
    timeline.setOptions(options);
    refreshTimeline(this.sessionId, this.spans, this.logs);
    // timeline.setWindow(sessionStart, sessionEnd);
  },
  methods: {
    toggleSpans() {
      this.spans = !this.spans;
      refreshTimeline(this.sessionId, this.spans, this.logs);
    },
    toggleLogs() {
      this.logs = !this.logs
      refreshTimeline(this.sessionId, this.spans, this.logs);
    },
    resetZoom() {
      timeline.setWindow(sessionStart, sessionEnd);
    }
  }
}

function refreshTimeline(sessionId, showSpans, showLogs) {
  const storedData = useOTLPData(sessionId);
  let data = []

  if (showSpans) {
    var spans = storedData.spans.map( (s, index) => {
      return {
        id: s.spanId,
        className: s.name,
        content: s.name,
        start: s.startTimeUnixNano / 1e6,
        end: s.endTimeUnixNano / 1e6,
        title: `${s.name} - ${(s.startTimeUnixNano / 1e6).toFixed(1)} - ${(s.endTimeUnixNano / 1e6 - s.startTimeUnixNano / 1e6).toFixed(1)}ms`,
      }
    });
    data = data.concat(spans)
  }

  if (showLogs) {
    let logId = 0
    const logs = storedData.logs.map(log => {
        return {
            id: logId++,
            content: log.attributes.find(a => a.key === 'event.name').value.stringValue,
            start: log.timeUnixNano / 1e6,
            type: 'point'
      }
    });
    data = data.concat(logs)
  }

  data.sort( (a, b) => {
    return a.start - b.start;
  })

  data.forEach( (item, index) => {
    item.group = index
  })

  function findLastEvent() {
    const arr = JSON.parse(JSON.stringify(data));
    arr.sort( (a, b) => {
      return (b.end || b.start) - (a.end || a.start)
    })
    return arr[0];
  }

  var groups = new DataSet();
  data.forEach( (span, index) => {  
    groups.add({
      id: index, 
      content: span.content
    });
  });

  // Create a Timeline
  timeline.setGroups(groups);
  timeline.setItems(new DataSet(data));

  if (data.length > 0) {
    const lastEvent = findLastEvent()
    const endOfSession = lastEvent.end || lastEvent.start
    const sessionDuration = (lastEvent.end || lastEvent.start) - data[0].start;
    sessionStart = data[0].start;
    sessionEnd = endOfSession + sessionDuration * 0.1;
  }
}

</script>

<template>
  <input type="checkbox" name="spans" v-model="spans" @click="toggleSpans()" />spans
  <input type="checkbox" name="logs" v-model="logs" @click="toggleLogs()" />logs
  <button @click="resetZoom()">reset zoom</button>
  <br/>
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
  button {
    background-color: gray;
    border: none;
    color: white;
    padding: 0 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
  } 
</style>
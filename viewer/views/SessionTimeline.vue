<script>
import { useOTLPData } from '../use/otlp-local-storage';
import { DataSet, Timeline } from "vis-timeline/standalone";

export default {
  props: {
    sessionId: String
  },
  mounted() {
    const storedData = useOTLPData(this.sessionId);

    var data = storedData.spans.map(s => {
      return {
        id: s.spanId,
        content: s.name,
        start: s.startTimeUnixNano / 1e6,
        end: s.endTimeUnixNano / 1e6,
        group: 1
      }
    });

    let logId = 0
    data = data.concat(storedData.logs.map(log => {
      return {
        id: logId++,
        content: log.attributes.find(a => a.key === 'event.name').value.stringValue,
        start: log.timeUnixNano / 1e6,
        group: 2
      }
    }))

    // Configuration for the Timeline
    var options = {
      verticalScroll: true,
      zoomKey: 'shiftKey'
    };

    var groups = new DataSet();
    groups.add({id: 1, content: 'spans'});
    groups.add({id: 2, content: 'events'});

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
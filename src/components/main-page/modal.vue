<template>
  <Modal v-model="modal1" title="Common Modal dialog box title" @on-ok="ok" @on-cancel="cancel">
    <p>{{msg}}</p>
    <p>Content of dialog</p>
    <p>Content of dialog</p>
  </Modal>
</template>
<script>
export default {
  data() {
    return {
      modal1: true
    }
  },
  created() {},
  mounted() {},
  props: ['msg'],
  methods: {
    ok() {
      this.$Message.info('Clicked ok')
    },
    cancel() {
      this.$Message.info('Clicked cancel')
    }
  }
}
</script>

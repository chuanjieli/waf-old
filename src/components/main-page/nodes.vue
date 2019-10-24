<template>
  <div style="padding: 10px;background: #f8f8f9">
    <Card title="节点管理" :padding="0" shadow style>
      <div class="node-key">请将以下node_key复制到所有从属节点的config.json中</div>
      <div class="node-key">
        <Icon type="md-key" size="24" />
        <span>10fd580558efafae957c763db35386da2daaac0cdf8f01550939c2fd34a718b399772de1db7bbd6a9e186e019b987d96c65a66cb1084c273a9018552</span>
      </div>
      <CellGroup>
        <Cell title=" 10.1.4.17     ( version: 0.9.4 ) " to="/nodes/1">
          <Icon type="md-git-network" slot="icon" size="24" />
        </Cell>
        <Cell title=" 10.1.4.18     ( version: 0.9.4 ) " to="/nodes/2">
          <Icon type="md-git-network" slot="icon" size="24" />
        </Cell>
        <Cell title=" 10.1.4.19     ( version: 0.9.4 ) " to="/nodes/3">
          <Icon type="md-git-network" slot="icon" size="24" />
        </Cell>
      </CellGroup>
    </Card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      switchValue: true
    };
  }
};
</script>
<style scoped>
.node-key {
  padding: 5px 15px;
  font-size: 16px;
}
</style>

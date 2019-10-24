<template>
  <div style="padding: 10px;background: #f8f8f9">
    <Card title="证书管理" :padding="0" shadow style>
      <CellGroup>
        <Cell title="添加证书" to="/certificate/0">
          <Icon type="ios-add-circle-outline" slot="icon" size="24" />
          <span slot="arrow" />
        </Cell>
        <Cell title="you.domain.com (New certificate)" label="过期时间:2029-06-06" to="/certificate/1">
          <Icon type="md-book" slot="icon" size="24" />
          <span slot="arrow" />
        </Cell>
        <Cell title="www.10086.cn  (New certificate)" label="过期时间:2029-04-06" to="/certificate/2">
          <Icon type="md-book" slot="icon" size="24" />
          <span slot="arrow" />
        </Cell>
        <Cell
          title="www.heimeixifu.com  (New certificate)"
          label="过期时间:2029-05-06"
          to="/certificate/3"
        >
          <span slot="arrow" />
          <Icon type="md-book" slot="icon" size="24" />
        </Cell>
        <Cell title="your.test.cn  (New certificate)" label="过期时间:2029-06-08" to="/certificate/4">
          <span slot="arrow" />
          <Icon type="md-book" slot="icon" size="24" />
        </Cell>
        <Cell title="test1.com  (New certificate)" label="过期时间:2029-06-07" to="/certificate/5">
          <span slot="arrow" />
          <Icon type="md-book" slot="icon" size="24" />
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
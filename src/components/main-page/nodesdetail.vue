<template>
  <div style="padding: 10px;background: #f8f8f9">
    <Card title="节点详情" shadow style>
      <div>
        <Form
          ref="form"
          :model="form"
          label-position="right"
          :rules="ruleValidate"
          :label-width="100"
        >
          <FormItem label="节点IP" prop="nodesIp">
            <Input :disabled="disabled" type="text" v-model="form.nodesIp" placeholder="节点IP"></Input>
          </FormItem>
          <FormItem label="节点版本" prop="nodesVersion">
            <Input :disabled="disabled" type="text" v-model="form.nodesVersion" placeholder="节点版本"></Input>
          </FormItem>
          <FormItem label="最后同步时间" prop="syncTime">
            <Input :disabled="disabled" type="text" v-model="form.syncTime" placeholder="最后同步时间"></Input>
          </FormItem>

          <FormItem>
            <Button @click="disabled = !disabled" type="primary">编辑</Button>
            <Button :disabled="disabled" @click="handleSubmit" type="primary">保存</Button>
            <Button :disabled="disabled" @click="del" type="primary">删除</Button>
          </FormItem>
        </Form>
      </div>
    </Card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      disabled: true,
      form: {
        nodesIp: '',
        nodesVersion: '',
        syncTime: ''
      },
      ruleValidate: {
        nodesIp: [
          {
            required: true,
            message: '请填写节点名称',
            trigger: 'blur'
          }
        ],
        nodesVersion: [
          {
            required: true,
            message: '请填写节点版本',
            trigger: 'blur'
          }
        ],
        syncTime: [
          {
            required: true,
            message: '请填写时间',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    handleSubmit() {
      console.log(this.form)
    },
    del() {}
  },
  watch: {}
}
</script>

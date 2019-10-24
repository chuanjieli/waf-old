<template>
  <div style="padding: 10px;background: #f8f8f9">
    <Card title="证书详情" shadow style>
      <div>
        <Form
          ref="form"
          :model="form"
          label-position="right"
          :rules="ruleValidate"
          :label-width="100"
        >
          <FormItem label="公用名" prop="certificateName">
            <Input
              :disabled="disabled"
              type="text"
              v-model="form.certificateName"
              placeholder="公用名或者主体别名"
            ></Input>
          </FormItem>

          <FormItem label="公钥内容">
            <Input
              :disabled="disabled"
              type="textarea"
              :rows="4"
              placeholder="(以:----- BEGIN CERTIFICATE -----开头)"
            ></Input>
          </FormItem>
          <FormItem label="私钥内容">
            <Input
              :disabled="disabled"
              type="textarea"
              :rows="4"
              placeholder="(以:----- BEGIN PRIVATE KEY -----开头)"
            ></Input>
          </FormItem>
          <FormItem v-if="id!=0" label="到期时间">
            <Input :disabled="disabled" type="text" placeholder="2020-10-10"></Input>
          </FormItem>
          <FormItem label="描述">
            <Input :disabled="disabled" type="text" placeholder="New certificate"></Input>
          </FormItem>

          <FormItem>
            <Button @click="disabled = !disabled" type="primary">编辑</Button>
            <Button :disabled="disabled" @click="handleSubmit" type="primary">保存</Button>
            <Button v-if="id!=0" :disabled="disabled" @click="handleSubmit1" type="primary">删除</Button>
            <Button v-if="id==0" :disabled="disabled" @click="handleSubmit1" type="primary">自签发证书</Button>
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
      id: this.$route.params.id,
      form: {
        certificateName: ''
      },
      ruleValidate: {
        certificateName: [
          {
            required: true,
            message: '请填写公用名或者主体别名',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {},
  methods: {
    handleSubmit() {
      console.log(this.form)
    },
    handleSubmit1() {}
  },
  watch: {}
}
</script>

<template>
  <div style="padding: 10px;background: #f8f8f9">
    <Card title="应用详情" shadow style>
      <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
        <FormItem prop="appName">
          <Input :disabled="disabled" type="text" v-model="form.appName" placeholder="应用名称">
            <span slot="prepend">应用名称</span>
          </Input>
        </FormItem>
        <FormItem>
          <Select :disabled="disabled" v-model="form.a" placeholder="后端及协议类型">
            <Option value="http">http</Option>
            <Option value="http">https</Option>
          </Select>
        </FormItem>
        <!-- <FormItem>
          <span style="dispaly:inline-block;height:32px;line-height:32px;">后端及协议类型</span>
          <Select :disabled="disabled" value="http" style="width: calc(100% - 88px)">
            <Option value="http">http</Option>
            <Option value="http">https</Option>
          </Select>
        </FormItem>-->

        <FormItem prop="appSite" v-for="n in siteNum" :key="n">
          <!-- <span>目的地址( 例如 IPv4:10.10.10.10:80 , IPv6:[::1%lo]:8080 )</span> -->
          <Input
            :disabled="disabled"
            type="text"
            placeholder="例如 IPv4:10.10.10.10:80 , IPv6:[::1%lo]:8080"
          >
            <Icon type="md-add" slot="append" @click="addSite" />
            <Icon v-if="delSite" type="md-close" slot="append" @click="delSite1" />
            <span slot="prepend">目的地址{{n}}</span>
          </Input>
        </FormItem>
        <FormItem prop="appDomain">
          <!-- <span>域名(可编辑)</span> -->
          <Input :disabled="disabled" type="text" v-model="form.appDomain" placeholder="请输入域名">
            <span slot="prepend">域名</span>
          </Input>
        </FormItem>
        <FormItem prop="appCertificate">
          <!-- <span>证书</span> -->
          <Input
            :disabled="disabled"
            type="text"
            v-model="form.appCertificate"
            placeholder="No Certificate (HTTP Only)"
          >
            <span slot="prepend">证书</span>
          </Input>
        </FormItem>
        <FormItem>
          <Select :disabled="disabled" placeholder="WAF获取客户端IP地址途径">
            <Option value="http">http</Option>
            <Option value="http">https</Option>
          </Select>
        </FormItem>
        <!-- <FormItem>
          <Input :disabled="disabled"  type="text" placeholder="请输入WAF获取客户端IP地址途径">
            <span slot="prepend">WAF获取客户端IP地址途径</span>
          </Input>
        </FormItem>-->
        <!-- <FormItem>
          <CheckboxGroup v-model="fruit" size="large">
            <Checkbox label="1" :disabled="disabled">将HTTP重定向到HTTPS(301)</Checkbox>
            <br>
            <Checkbox label="2" :disabled="disabled">https启用hsts(添加响应头:严格传输安全)</Checkbox>
            <br>
            <Checkbox label="3" :disabled="disabled">启用WAF(Web应用程序防火墙)</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem>
          <Input :disabled="disabled" type="text" v-model="form.userName" placeholder="请输入用户名">
            <span slot="prepend">用户名</span>
          </Input>
        </FormItem>
        <FormItem>
          <Button @click="disabled = !disabled" type="primary">编辑</Button>
          <Button @click="handleSubmit" type="primary">保存</Button>
          <Button @click="handleSubmit1" type="primary">删除</Button>
        </FormItem>-->
      </Form>
    </Card>
  </div>
</template>
<script>
export default {
  name: 'LoginForm',
  props: {
    appNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '应用名称不能为空', trigger: 'blur' }
        ]
      }
    },
    appSiteRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '目的地址不能为空', trigger: 'blur' }
        ]
      }
    },
    appDomainRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: '域名不能为空', trigger: 'blur' }]
      }
    },
    appCertificateRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: '证书不能为空', trigger: 'blur' }]
      }
    }
  },
  data() {
    return {
      form: {
        appName: '',
        appSite: '',
        appDomain: '',
        appCertificate: '',
        userName: '',
        a: ''
      },
      logMsg: false,
      fruit: ['1', '2', '3'],
      id: this.$route.params.id,
      disabled: false,
      siteNum: 1,
      delSite: false
    }
  },
  created() {
    if (this.id == 0) {
      this.fruit = ['1', '2', '3']
    } else {
      this.fruit = ['1', '2']
    }
  },
  mounted() {},
  computed: {
    rules() {
      return {
        appName: this.appNameRules,
        appSite: this.appSiteRules,
        appDomain: this.appDomainRules,
        appCertificate: this.appCertificateRules
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          console.log(this.form)
        }
      })
    },
    handleSubmit1() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (this.form.userName == 'hedun' && this.form.password == '1q2w3e') {
            localStorage.setItem('access-user', JSON.stringify('loginok'))
            this.$router.push({ path: '/' })
          } else {
            this.logMsg = true
          }
        }
      })
    },
    addSite() {
      this.siteNum++
      this.delSite = true
    },
    delSite1() {
      if (this.siteNum == 1) {
        this.delSite = false
      } else {
        this.siteNum = this.siteNum - 1
      }
    }
  }
}
</script>

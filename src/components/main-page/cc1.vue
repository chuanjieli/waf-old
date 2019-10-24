<template>
  <div style="padding: 10px;background: #f8f8f9;height:100%">
    <Card title="全局CC策略(对于具有自定义CC策略的应用程序无效)" shadow style>
      <div>
        <Form ref="form" label-position="right" :label-width="90" inline>
          <FormItem label="统计周期(秒)">
            <InputNumber :min="1" v-model="form.interval_seconds" style="width: 130px"></InputNumber>
          </FormItem>
          <FormItem label="最大请求个数">
            <InputNumber :min="1" v-model="form.max_count" style="width: 130px"></InputNumber>
          </FormItem>
          <FormItem label="阻隔秒数">
            <InputNumber :min="1" v-model="form.block_seconds" style="width: 130px"></InputNumber>
          </FormItem>

          <FormItem label="防御动作">
            <Select v-model="form.action" style="width: 130px">
              <Option value="100">阻隔并记录</Option>
              <Option value="200">放行并记录</Option>
              <Option value="300">验证码阻隔</Option>
              <Option value="400">放行不记录</Option>
            </Select>
          </FormItem>
          <br />
          <FormItem :label-width="0">
            <Checkbox v-model="form.stat_by_url">分别统计不同URL个数</Checkbox>
            <br />
            <Checkbox v-model="form.stat_by_ua">分别统计不同User-Agent个数</Checkbox>
            <br />
            <Checkbox v-model="form.stat_by_cookie">分别统计不同Cookies个数</Checkbox>
            <br />
            <Checkbox v-model="form.is_enabled">启用此CC阻止策略</Checkbox>
          </FormItem>
          <br />
          <Button type="primary" @click="globalSave">保存</Button>
        </Form>
      </div>
    </Card>
    <Collapse style="margin-top:20px">
      <Panel name="1">
        自定义应用程序CC策略
        <Col slot="content">
          <div style="display:flex;">
            <Cascader :data="selData" v-model="value1" transfer style="flex:1;margin-right:10px"></Cascader>
            <!-- <Select v-model="model1" placement="top" style="flex:1;margin-right:10px">
              <Option
                v-for="item in cityList"
                :value="item.value"
                :key="item.value"
              >{{ item.value }}</Option>
            </Select>-->
            <Button type="primary" @click.prevent="addCc">添加自定义策略</Button>
          </div>
          <Form
            v-if="custom"
            ref="form1"
            label-position="right"
            :label-width="90"
            inline
            style="margin-top:20px"
          >
            <FormItem label="统计周期(秒)">
              <InputNumber :min="1" v-model="form1.interval_seconds" style="width: 130px"></InputNumber>
            </FormItem>
            <FormItem label="最大请求个数">
              <InputNumber :min="1" v-model="form1.max_count" style="width: 130px"></InputNumber>
            </FormItem>
            <FormItem label="阻隔秒数">
              <InputNumber :min="1" v-model="form1.block_seconds" style="width: 130px"></InputNumber>
            </FormItem>

            <FormItem label="防御动作">
              <Select v-model="form1.action" style="width: 130px">
                <Option value="100">阻隔并记录</Option>
                <Option value="200">放行并记录</Option>
                <Option value="300">验证码阻隔</Option>
                <Option value="400">放行不记录</Option>
              </Select>
            </FormItem>
            <br />
            <FormItem :label-width="0">
              <Checkbox v-model="form1.stat_by_url">分别统计不同URL个数</Checkbox>
              <br />
              <Checkbox v-model="form1.stat_by_ua">分别统计不同User-Agent个数</Checkbox>
              <br />
              <Checkbox v-model="form1.stat_by_cookie">分别统计不同Cookies个数</Checkbox>
              <br />
              <Checkbox v-model="form1.is_enabled">启用此CC阻止策略</Checkbox>
            </FormItem>
            <br />
            <Button type="primary" @click="singleSave">保存</Button>
            <Button type="primary" @click="cancel">取消</Button>
          </Form>
        </Col>
      </Panel>
    </Collapse>
  </div>
</template>

<script>
import Qs from 'qs'
export default {
  data() {
    return {
      custom: false,
      form: {
        interval_seconds: 12,
        max_count: 3,
        block_seconds: 23,
        action: '100',
        is_enabled: false,
        stat_by_url: false,
        stat_by_cookie: false,
        stat_by_ua: false
      },
      form1: {
        interval_seconds: 12,
        max_count: 3,
        block_seconds: 23,
        action: '100',
        is_enabled: false,
        stat_by_url: false,
        stat_by_cookie: false,
        stat_by_ua: false
      },
      data: '',
      selData: [],
      value1: [],
      cityList: [
        {
          value: 'New York',
          label: 'New York'
        },
        {
          value: 'London',
          label: 'London'
        },
        {
          value: 'Sydney',
          label: 'Sydney'
        },
        {
          value: 'Ottawa',
          label: 'Ottawa'
        },
        {
          value: 'Paris',
          label: 'Paris'
        },
        {
          value: 'Canberra',
          label: 'Canberra'
        }
      ],
      model1: ''
    }
  },
  created() {
    let url = '/cc_policy_manage/?action=getccpolicys'
    this.request('get', url)
  },
  methods: {
    request(type, url, data) {
      this.$http({
        method: type,
        url: url,
        data: data
      }).then(res => {
        console.log(res.data)

        if (res.data.msg === 'success!') {
          if (type == 'get') {
            let data = res.data.data.cc_policy_info.cc_global_policy
            if (!data) {
              let data1 = res.data.data.cc_policy_info
              data1.interval_seconds = Number(data1.interval_seconds)
              data1.block_seconds = Number(data1.block_seconds)
              data1.max_count = Number(data1.max_count)
              this.form1 = data1
              this.custom = true
            } else {
              this.form = data
              this.data = res.data.data.cc_policy_info.all_app_info_list[0]
              this.regroup(this.data)
            }
          } else if (type == 'post') {
            if (res.data.data.add_policy) {
              this.$Message.info('添加成功')
            }
          } else {
            if (res.data.data.update_cc_policy) {
              this.$Message.info('更新成功')
            }
          }
        } else if (
          res.data.msg == 'You are not logged in, please login first!'
        ) {
          this.$Message.error(res.data.msg)
          this.$router.push('/login')
        } else {
          this.$Message.error({
            content: res.data.msg,
            duration: 10,
            closable: true
          })
        }
      })
    },
    regroup(data) {
      console.log(data)

      let selData = []
      for (let key in data) {
        let obj = {}
        obj.value = key
        obj.label = key
        obj.children = []
        for (let i = 0; i < data[key].length; i++) {
          obj.children.push({
            value: data[key][i].app_id,
            label: data[key][i].name
          })
        }
        selData.push(obj)
      }
      this.selData = selData
      console.log(selData)
    },
    globalSave() {
      // let obj = this.form
      // obj.cc_policy_id = '0'
      // console.log(obj)

      let form = JSON.stringify(this.form)
      let data = Qs.stringify({ data: form })
      this.request('put', '/cc_policy_manage/', data)
    },
    singleSave() {
      if (this.form1.app_id === '0') {
        this.form1.app_id = this.value1[1]
        let form = JSON.stringify(this.form1)
        let data = Qs.stringify({ data: form })
        this.request('post', '/cc_policy_manage/', data)
      } else {
        this.form1.app_id = this.value1[1]
        let form = JSON.stringify(this.form1)
        let data = Qs.stringify({ data: form })
        this.request('put', '/cc_policy_manage/', data)
      }
    },
    cancel() {
      this.custom = false
      this.value1 = []
    },
    addCc() {
      console.log(this.value1)
      if (this.value1[1]) {
        let url =
          '/cc_policy_manage/?action=getccpolicy&cc_app_id=' + this.value1[1]
        this.request('get', url)
      } else {
        this.custom = false
        this.$Message.info('请选择一个应用')
      }
    }
  }
}
</script>

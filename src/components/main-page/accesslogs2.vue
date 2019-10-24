<template>
  <div style="padding: 10px;background: #f8f8f9">
    <Card title="访问日志" :padding="0" shadow>
      <Form ref="form" :model="form" inline label-position="right" style="margin-top:20px">
        <FormItem label="应用" :label-width="50">
          <Select v-model="form.list[0]" style="width:180px">
            <Option v-for="item in form.list" :value="item" :key="item">{{item}}</Option>
          </Select>
        </FormItem>
        <FormItem label="开始时间(00:00:00)" :label-width="115">
          <Date-picker
            type="date"
            format="yyyy/MM/dd"
            :value="new Date()"
            :options="options"
            :editable="false"
            @on-change="handleChange"
          ></Date-picker>
        </FormItem>
        <FormItem label="结束时间(23:59:59)" :label-width="115">
          <Date-picker
            type="date"
            format="yyyy/MM/dd"
            :value="new Date()"
            :options="options"
            :editable="false"
            @on-change="handleChange1"
          ></Date-picker>
        </FormItem>
        <FormItem :label-width="10">
          <Button type="primary">查询访问日志</Button>
        </FormItem>
      </Form>
      <Table
        stripe
        @on-row-click="showdetail"
        :columns="column"
        :data="data"
        style="margin:0 10px;"
      ></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;margin-bottom:20px">
          <Page :total="100" :current="1" @on-change="changePage"></Page>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now()
        }
      },
      form: {
        list: ['guamgmu', 'hedun', 'pogou']
      },
      column: [
        {
          title: 'ID编号',
          key: 'id'
        },
        {
          title: '访问时间',
          key: 'time'
        },
        {
          title: '访问IP地址',
          key: 'ip'
        },
        {
          title: '访问方式',
          key: 'type'
        },
        {
          title: '访问网站',
          key: 'host'
        },
        {
          title: 'URL路径',
          key: 'url'
        },
        {
          title: '协议类型',
          key: 'defense'
        }
      ],
      data: [
        {
          id: '1',
          time: '2019-07-30',
          ip: '10.1.4.51',
          type: 'post',
          host: 'www.hedun.com',
          url: 'index.html',
          defense: 'http'
        },
        {
          id: '2',
          time: '2019-07-30',
          ip: '10.1.4.52',
          type: 'get',
          host: 'www.guangmu.com',
          url: 'index.php',
          defense: 'https'
        },
        {
          id: '3',
          time: '2019-07-30',
          ip: '10.1.4.53',
          type: 'get',
          host: 'www.pogou.com',
          url: 'home/index.html',
          defense: 'https'
        },
        {
          id: '4',
          time: '2019-07-30',
          ip: '10.1.4.54',
          type: 'post',
          host: 'www.guangmu.com',
          url: 'hedun.py',
          defense: 'http'
        },
        {
          id: '5',
          time: '2019-07-30',
          ip: '10.1.4.55',
          type: 'get',
          host: 'www.pogou.com',
          url: 'app/detail.html',
          defense: 'https'
        },
        {
          id: '6',
          time: '2019-07-30',
          ip: '10.1.4.56',
          type: 'post',
          host: 'www.gm.com',
          url: 'src/assets/sffdg.png',
          defense: 'https'
        },
        {
          id: '7',
          time: '2019-07-30',
          ip: '10.1.4.57',
          type: 'get',
          host: 'www.hedun.com',
          url: 'waf/screen.html',
          defense: 'http'
        },
        {
          id: '8',
          time: '2019-07-30',
          ip: '10.1.4.97',
          type: 'get',
          host: 'www.hd.com',
          url: 'hedun.html',
          defense: 'http'
        },
        {
          id: '9',
          time: '2019-07-30',
          ip: '10.1.4.91',
          type: 'get',
          host: 'www.gm.com',
          url: 'index.html',
          defense: 'http'
        },
        {
          id: '10',
          time: '2019-07-30',
          ip: '10.1.4.98',
          type: 'post',
          host: 'www.hedun.com',
          url: 'waf.html',
          defense: 'https'
        }
      ]
    }
  },
  methods: {
    handleChange(date) {
      console.log(date)
    },
    handleChange1(date) {
      console.log(date)
    },
    showdetail(params) {
      let url = 'logsdetail/access/' + params.id
      this.$router.push(url)
    },
    changePage() {}
  }
}
</script>